<template>
  <Layout navBackgroundColor="pink">
    <template #navLinks>
      <ul class="header-links">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/blog">Blog</NuxtLink></li>
      </ul>
    </template>

    <main class="post-wrapper">
      <h1>{{ post.title }}</h1>
      <ContentRenderer :value="post" class="post-body"/>
      <div class="nav-wrap">
        <div class="nav-miniWrap">
          <NuxtLink v-if="prev" class="nav-btn" :to="'/blog' + prev._path">Previous</NuxtLink>
          <span v-if="prev"> {{ prev.title }} </span>
        </div>
        <div class="nav-miniWrap">
          <NuxtLink v-if="next" class="nav-btn" :to="'/blog' + next._path">Next</NuxtLink>
          <span v-if="next"> {{ next.title }} </span>
        </div>
      </div>
    </main>

  </Layout>
</template>

<script setup>
const route = useRoute();

const { data: post } = await useAsyncData('post', () => queryContent('/')
  .where({_path: `/${route.params.slug}`})
  .findOne()
)

const [prev, next] = await queryContent()
  .only(['_path', 'title', 'date'])
  .sort({date: -1})
  .findSurround(`/${route.params.slug}`)

</script>

<style lang="scss" scoped>
@import '../../global.scss';
.post-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  margin-block: 6rem;
}

.nav-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between
}

.nav-miniWrap {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  color: gray;
}

.nav-btn {
  // @extend %btn !optional;
  //text-decoration: none;
  // text-align: center;
  // align-self: self-start;
  color: var(--primary-accent);
  font-size: 1.4rem;
}
.post-body {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 5rem;
}

:global(code) {
  display: block;
  background-image: url(/_nuxt/grainy_texture.png);
  background-color: var(--secondary-light);
  padding: .8rem 1rem;
  border: 1px solid rgb(196, 195, 195);
  border-radius: var(--borderRadius-small);
}
</style>