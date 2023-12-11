<template>
  <Layout navBackgroundColor="pink">
    <template #navLinks>
      <ul class="header-links">
        <li><NuxtLink to="/">Home</NuxtLink></li>
      </ul>
    </template>

    <div class="posts-wrapper">
      <h1 class="posts-title">My Blog</h1>
      <search>
         <form>
          <input name="search" type="search" placeholder="Search posts">
          <button type="submit">Search</button>
        </form>
      </search>
      <form>
        <label for="category">Filter by category:</label>
        <select name="category" id="category">
          <option value="CSS">CSS</option>
          <option value="Vue">Vue</option>
          <option value="Accessibility">Accessibility</option>
          <option value="JavaScript">JavaScript</option>
        </select> 
        <button>Filter</button>
      </form>

      <ul class="posts-list">
        <li v-for="post in posts" :key="post._path" class="post-card">
          <h2>{{ post.title }}</h2>
          <p> {{ post.excerpt }}</p>
          <p>{{ post.date }}</p>
          <NuxtLink :to="'/blog' + post._path">Read more</NuxtLink>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script setup>
const { data: posts } = await useAsyncData('posts', () => queryContent("/")
  .sort({date: -1})
  .without("body") // removed body to lower payload-size
  .find())

//Collect all categories
// Add to a Set
// Loop through in the template

</script>


<style lang="scss">

.posts-title {
  margin-top: 5rem;
}

.posts-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 1000px;
  margin: 0 auto;
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
  gap: .5rem;
  padding: 2rem;
}

</style>