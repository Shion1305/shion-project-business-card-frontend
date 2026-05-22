export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith("/admin")) return;
  if (to.path === "/admin/login") return;

  const headers = import.meta.server ? useRequestHeaders(["cookie"]) : undefined;
  let authenticated = false;
  try {
    const me = await $fetch<{ authenticated: boolean }>("/api/admin/auth/me", { headers });
    authenticated = me.authenticated;
  } catch {
    authenticated = false;
  }
  if (!authenticated) {
    return navigateTo("/admin/login");
  }
});
