// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Ivona Josipovic | Frontend developer",
      link: [{
        rel: "icon",
        href: "/icon.svg",
        type: "image/svg+xml"
      }],
      meta: [
        {
          name: "description",
          content: "Ivona Josipovic is a frontend developer based in Stockholm. She enjoys building things using HTML, CSS, JavaScript, Vue and React."
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
      ]
    },
    rootId: "portfolio",
  },
  pages: true,
  devtools: { enabled: false },
  srcDir: "src/",
    components: {
    global: true,
    dirs: ["~/components"]
  },
  modules: [
    "@nuxt/content",
    "vue3-carousel-nuxt"
  ],
  carousel: {
    prefix: "External"
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
  css: ["~/global.scss"],
})
