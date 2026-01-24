export default defineNuxtPlugin(() => {
  if (process.env.NODE_ENV !== 'production') return
  const router = useRouter()

  router.afterEach(to => {
      window.goatcounter?.count({
        path: to.fullPath,
        title: document.title,
      })
  })
})
