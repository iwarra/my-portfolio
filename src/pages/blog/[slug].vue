<template>
  <Layout navBackgroundColor="gray" headerBackground="pink">
    <template #navLinks>
      <menu class="header-links">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/blog">Blog</NuxtLink></li>
      </menu>
    </template>

    <main>
      <div class="post-hero pink">
        <div class="hero-wrap">
          <h1>{{ post.title }}</h1>
          <span>Published on: {{ post.date.substring(0,10) }}</span>
        </div>
      </div>
      <Separator styling="incline pink" />
      <ContentRenderer :value="post" class="post-body" tag="article"/>
      <div class="nav">
        <div class="nav-miniWrap">
          <NuxtLink v-if="prev" class="nav-link" :to="'/blog' + prev._path" >
            <img v-if="prev" src="/arrow-left.svg" alt="" class="nav-icon">
            Previous
          </NuxtLink>
          <span v-if="prev"> {{ prev.title.substring(0, 16) }}... </span>
        </div>
        <div v-if="next" class="nav-miniWrap" >
          <NuxtLink v-if="next" 
            class="nav-link" 
            :to="'/blog' + next._path" 
           >
            Next
            <img src="/arrow-right.svg" alt="" class="nav-icon">
          </NuxtLink>
          <span v-if="next"> {{ next.title.substring(0, 16) }}...</span>
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
.post-hero {
  width: 100%;
  padding-top: 3rem;
  padding-inline: 2rem;
}

.hero-wrap {
  position: relative;
  z-index: 2;
  max-width: 1000px; 
  margin: 0 auto;
}

.nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1000px;
  margin: 0 auto;
  padding-inline: 2rem;
}

.nav-miniWrap {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  color: gray;
  margin-bottom: 5rem;
}

.nav-link {
  color: var(--primary-accent);
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-weight: 600;
  .nav-icon {
    height: 2.3rem;
  }
}

.post-body {
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 0 auto;
  gap: 2rem;
  padding: 2rem 2rem 5rem 2rem;
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