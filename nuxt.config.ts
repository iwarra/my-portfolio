// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
