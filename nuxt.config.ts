import { icon } from "@fortawesome/fontawesome-svg-core";

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
    }
  },
  pages: true,
  devtools: { enabled: true },
  srcDir: 'src/',
  vite: {
    build: {
      rollupOptions: {
        external: ['illustration.svg', 'arrow-left.svg', 'arrow-right.svg', 'quote-left.png', 'quote-right.png'],
      },
    }
  },
  css: ['~/global.scss', '@fortawesome/fontawesome-svg-core/styles.css'],
  plugins: ['~/plugins/fontawesome.mjs']
})