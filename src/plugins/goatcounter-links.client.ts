export default defineNuxtPlugin(() => {
  if (process.env.NODE_ENV !== 'production') return
  const DOWNLOAD_EXTENSIONS = ['pdf', 'png', 'jpg']

  document.addEventListener('click', event => {
    const target = event.target as HTMLElement
    const link = target.closest('a')

     if (!link || !link.href) return

    const url = new URL(link.href)
    const ext = url.pathname.split('.').pop()?.toLowerCase()

    // Download tracking
    if (ext && DOWNLOAD_EXTENSIONS.includes(ext)) {
      window.goatcounter?.count({
        event: true,
        path: `download/${url.pathname}`,
      })
      return
    }

    // Outbound tracking
    if (url.origin !== window.location.origin) {
      window.goatcounter?.count({
        event: true,
        path: `outbound/${url.hostname}`,
      })
    }
  })
})
