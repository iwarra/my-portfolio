<script setup>
const categoryValue = ref('');
const searchValue = ref('');
const postsPerView = ref(3);
const posts = ref(await getPosts());
const totalNumOfPosts = ref(await queryContent('/').count());

onMounted(() => {
  const observer = new IntersectionObserver(() => getPosts({loadMore: true}), {
    root: null,
    rootMargin: "0%",
    threshold: 0, // between 0-1; how much of the target to be visible before loading
  });
  observer.observe(document.querySelector("footer"));
})

// //Infinite scroll
// onMounted(() => scroll());
// function scroll () {
//   window.onscroll = () => {
//     let bottomOfWindow = Math.max(window.scrollY, document.documentElement.scrollTop) + window.innerHeight === document.documentElement.offsetHeight

//     if (bottomOfWindow) getPosts({loadMore: true})
//   }
// }

async function getPosts(obj = {}) {
  const { loadMore, search, filter, reset } = obj;

  if (loadMore) {
    posts.value = await queryContent("/")
    .limit(postsPerView.value += 3)
    .sort({date: -1, $numeric: true})
    .without("body")
    .find()
    return 
  }

  if (search) {
    const { data: source } = await useAsyncData('allPosts', () => queryContent('/').find()) 
    posts.value = useSearch(obj.search, source.value)
    return
  }

  if (filter) {
    // try idempotency?
    posts.value = await queryContent('/').where({ 'category': { $contains: obj.filter } }).find()

    if (searchValue.value) searchValue.value = '';
    return
  }

  if (reset) {
    searchValue.value = ''
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

<template>
  <Layout navBackgroundColor="gray" headerBackground="pink">
    <template #navLinks>
      <menu class="header-links">
        <li><NuxtLink to="/">Home</NuxtLink></li>
      </menu>
    </template>

    <main>
      <div class="blog-hero pink">
        <div class="hero-wrapper">
          <form>
            <h1 class="blog-title">My Blog</h1>
            <div class="search-wrapper">
              <div role="search" class="search-group">
                <component class="search-icon" is="IconsSearch" @click.prevent="() => getPosts({search: searchValue})" />
                <input name="search" type="search" placeholder="Search posts..." v-model="searchValue">
              </div>
              <div class="filter-group">
                <component class="filter-icon" is="IconsFilter"  @click.prevent="() => getPosts({filter: categoryValue})"/>
                <select name="category" v-model="categoryValue">
                  <option disabled value="">Pick a category</option>
                  <option v-for="category in categories" 
                    :key="category"
                    :value="category"
                  > {{ category }} </option>
                </select> 
              </div>
              <button class="reset-button" @click.prevent="() => getPosts({ reset: true})">Reset All</button>
            </div>
          </form>
          <img src="/search.svg" alt="" class="hero-img">
        </div>
      </div>
      <Separator styling="pink incline" />
      <div class="posts-wrapper">
        <ul class="posts-list">
          <template v-for="(post, index) in posts" :key="post._path">
            <li class="post-card">
              <div class="post-wrap">
                <h2>{{ post.title }}</h2>
                <p> {{ post.summary }}</p>
                <div class="post-extraInfo">
                  <small>{{ post.date.substring(0,10) }}</small>
                  <NuxtLink :to="'/blog' + post._path">Read more</NuxtLink>
                </div>
              </div>
            </li>
            <Separator :class="index % 2 !== 0 ? 'incline pink' : 'decline gray'" />
          </template>
        </ul>
        <!-- <button v-if="posts.length < totalNumOfPosts" 
          class="more-button" 
          @click="() => getPosts({loadMore: true})"
        >Load more</button> -->
        <span class="message" v-if="posts.length >= totalNumOfPosts">Oops, we're all out of posts.</span>
      </div>
    </main>
  </Layout>
</template>


<style scoped lang="scss">
@import '../../global.scss';

.blog-hero {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.hero-wrapper {
  display: flex;
  align-items: center; 
  justify-content: space-around;
  width: 100%;
  max-width: 1000px;
  padding-top: 4rem;
  padding-bottom: 2rem;
  z-index: 2;
}

.search-wrapper {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column; 
  gap: 1rem;
  
  input, select {
    font-weight: 600;
    font-size: 1.1rem;
    border: none;
    background-color: #fff;
    color: var(--primary-accent);
  }

  input::placeholder {
    color: var(--primary-accent);
    opacity: 1;
  }

  input:focus, select:focus {
    outline: none;
  }

  select {
    width: 100%;
  }

  button {
    @extend %btn;
    padding: 0.6rem 1rem;
    color: var(--primary-accent);
    background-color: #fff;
  }

  .reset-button {
    align-self: start;
  }

  .search-group, .filter-group {
    display: flex;
    background-color: #fff; 
    padding: 0.6rem 1rem; 
    border-radius: 10px;
  }

  .search-icon, .filter-icon {
    font-size: 24px;
    margin-right: .7rem;
  }
}

.hero-img {
  display: none;
}

.posts-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5rem;
  padding-bottom: 5rem;
}

.posts-list {
  list-style: none;
  display: flex;
  flex-direction: column;
}

li.post-card:nth-of-type(2n) {
  background-image: url(/grainy_texture.png), linear-gradient(var(--secondary-light), var(--secondary-light));
}

.post-wrap {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  max-width: 1000px;
  padding: 6rem 2rem 2rem 2rem;
  position: relative;
  z-index: 2;
}

// .more-button {
//   @extend %btn;
//   align-self: center;
//   background-color: #fff;
//   color: var(--primary-accent);
// }

.post-extraInfo {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

.message {
  text-align: center;
  color: var(--primary-accent);
  font-size: 1.3rem;
  font-weight: 500;
}

@media (min-width: 800px) {
  .hero-img {
    display: unset;
    height: 280px;
  }
}

</style>