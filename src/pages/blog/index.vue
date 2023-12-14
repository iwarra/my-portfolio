<template>
  <Layout navBackgroundColor="pink">
    <template #navLinks>
      <ul class="header-links">
        <li><NuxtLink to="/">Home</NuxtLink></li>
      </ul>
    </template>

    <main class="posts-wrapper">
      <h1 class="posts-title">My Blog</h1>
      <div class="search-wrap">
        <div role="search">
          <form>
            <input name="search" type="search" placeholder="Search posts" v-model="inputValue">
            <button @click.prevent="() => usePosts({search: inputValue})">Search</button>
          </form>
        </div>
        <form>
          <label for="category">Filter by category:</label>
          <select name="category" id="category" v-model="categoryValue">
            <option disabled value="">Please choose a category</option>
            <option v-for="category in categories" 
              :key="category"
              :value="category"
            > {{ category }} </option>
          </select> 
          <button @click.prevent="() => usePosts({filter: categoryValue})">Filter</button>
          <button @click.prevent="() => usePosts({ reset: true})">Reset All</button>
        </form>
      </div>
      <ul class="posts-list">
        <li v-for="post in posts" :key="post._path" class="post-card">
          <h2>{{ post.title }}</h2>
          <p> {{ post.summary }}</p>
          <div class="post-extraInfo">
            <small>{{ post.date.substring(0,10) }}</small>
            <NuxtLink :to="'/blog' + post._path">Read more</NuxtLink>
          </div>
        </li>
      </ul>
      <button style="align-self: center; padding: .6rem;" @click="() => usePosts({loadMore: true})">load more</button>
    </main>
  </Layout>
</template>

<script setup>
const categoryValue = ref('')
const inputValue = ref('');
const postsPerView = ref(3)
const posts = ref(await usePosts())

async function usePosts(obj = {}) {
  // destructuring

  if (obj.loadMore) {
    posts.value = await queryContent("/")
    .limit(postsPerView.value += 3)
    .sort({date: -1, $numeric: true})
    .without("body")
    .find()
    return
  }

  if (obj.search) {
    const { data: source } = await useAsyncData('allPosts', () => queryContent('/').find()) 
    posts.value = useSearch(obj.search, source.value)
    return
  }

  if (obj.filter) {
    // try idempotency?
    posts.value = await queryContent('/').where({ 'category': { $contains: obj.filter } }).find()

    // reset search-input to blank, as not to confuse
    if (inputValue.value) inputValue.value = '';
    return
  }

  if (obj.reset) {
    inputValue.value = ''
    categoryValue.value = ''
  }

  return useAsyncData('posts', () => queryContent("/")
  .limit(postsPerView.value)
  .sort({date: -1, $numeric: true})
  .without("body")
  .find())
  .data
}

// categories
const { data: categories } = await useAsyncData('categories', async () => {
  const list = new Set()
  const result = await queryContent('/').only('category').find()

  result.forEach(obj => {
    obj.category.forEach(el => list.add(el))
  })

  return list
}) 

</script>


<style lang="scss">
.search-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
   
  * {
    margin-right: .6rem
  }

  input, select, button {
    padding: .4rem;
    border: 1px solid gray;
    border-radius: .5rem;
  }
}

.posts-title {
  margin-top: 5rem;
}

.posts-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  margin-bottom: 6rem;
}

.posts-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.post-card {
  border-radius: var(--borderRadius-large);
  border: solid var(--primary-accent) 2px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
}

.post-extraInfo {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}


</style>