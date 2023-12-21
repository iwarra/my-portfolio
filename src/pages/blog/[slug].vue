<template>
  <Layout navBackgroundColor="pink">
    <template #navLinks>
      <menu class="header-links">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/blog">Blog</NuxtLink></li>
      </menu>
    </template>

    <main class="post-wrapper">
      <h1>{{ post.title }}</h1>
      <ContentRenderer :value="post" class="post-body"/>
      <div class="nav">
        <div class="nav-miniWrap">
          <NuxtLink v-if="prev" class="nav-link" :to="'/blog' + prev._path">
            <img v-if="prev" src="/arrow-left.svg" alt="" class="nav-icon">
            Previous
          </NuxtLink>
          <span v-if="prev"> {{ prev.title }} </span>
        </div>
        <div v-if="next" class="nav-miniWrap">
          <NuxtLink v-if="next" class="nav-link" :to="'/blog' + next._path">
            Next
            <img src="/arrow-right.svg" alt="" class="nav-icon">
          </NuxtLink>
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
  padding: 3rem 3rem 0rem 3rem;
}

.nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.nav-miniWrap {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  color: gray;
}

.nav-link {
  color: var(--primary-accent);
  font-size: 1.4rem;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-weight: 600;
  .nav-icon {
    height: 2.4rem;
  }
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