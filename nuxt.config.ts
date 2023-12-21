// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Ivona's portfolio",
      link: [{
        rel: "icon",
        href: "/icon.svg",
        type: "image/svg+xml"
      }],
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    rootId: 'portfolio',
  },
  pages: true,
  devtools: { enabled: false },
  srcDir: 'src/',
    components: {
    global: true,
    dirs: ['~/components']
  },
  modules: [
    '@nuxt/content',
    'vue3-carousel-nuxt'
  ],
  carousel: {
    prefix: 'External'
  },
  content: {
    documentDriven: false,
  },
  vite: {
    build: {
      rollupOptions: {
        external: ['illustration.svg', 'arrow-left.svg', 'arrow-right.svg', 'quote-left.png', 'quote-right.png'],
      },
    }
  },
  css: ['~/global.scss'],
})
