import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      external: ['illustration.svg', 'arrow-left.svg', 'arrow-right.svg', 'quote-left.png', 'quote-right.png'],
    },
  },
})


