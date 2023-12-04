export default defineNuxtRouteMiddleware((to) => {
  if (process.server) return
  if (to.path === '/') {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", user => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
  }
})