export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith("/admin")) return;
  if (to.path === "/admin/login") return;
  const me = await $fetch<{ authenticated: boolean }>("/api/admin/auth/me");
  if (!me.authenticated) {
    return navigateTo("/admin/login");
  }
});
