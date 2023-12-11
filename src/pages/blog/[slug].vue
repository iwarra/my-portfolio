<template>
  <Layout navBackgroundColor="pink">
    <template #navLinks>
      <ul class="header-links">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/blog">Blog</NuxtLink></li>
      </ul>
    </template>

    <div>
      <h1>{{ post.title }}</h1>
      <div v-html="body" class="post-wrapper"></div>
    </div>

  </Layout>
</template>

<script setup>

import Markdown from 'markdown-it'

const markdown = Markdown({
  html: true,
  xhtmlOut: true,
  breaks: true,
})

const route = useRoute()
const { data: post } = await useAsyncData('post', () => queryContent('/')
  .where({_path: `/${route.params.slug}`})
  .findOne())

const body = markdown.render(post._value.body)

</script>

<style lang="scss" scoped>
.post-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 6rem;
}

:global(code) {
  background-color: rgb(216, 215, 215);
  padding: .8rem 1rem;
  border: 1px solid rgb(196, 195, 195);
  border-radius: var(--borderRadius-small);
}
</style>