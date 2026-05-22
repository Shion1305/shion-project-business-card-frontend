<script lang="ts" setup>
const route = useRoute();
const router = useRouter();

const { data: me, refresh } = await useFetch("/api/admin/auth/me", { server: true });

async function logout() {
  await $fetch("/api/admin/auth/logout", { method: "POST" });
  await refresh();
  router.push("/admin/login");
}

const isLoginPage = computed(() => route.path === "/admin/login");
</script>

<template>
  <div class="admin-root">
    <header class="admin-header">
      <NuxtLink to="/admin" class="brand">Admin</NuxtLink>
      <nav v-if="me?.authenticated && !isLoginPage" class="nav">
        <NuxtLink to="/admin/cards">Cards</NuxtLink>
        <NuxtLink to="/admin/events">Events</NuxtLink>
      </nav>
      <div class="spacer" />
      <div v-if="me?.authenticated" class="user">
        <span class="user-name">{{ me.name || me.sub }}</span>
        <button type="button" class="logout" @click="logout">Logout</button>
      </div>
    </header>
    <main class="admin-main">
      <slot />
    </main>
  </div>
</template>

<style>
.admin-root {
  min-height: 100vh;
  background: #f7f8fa;
  color: #1a1a1a;
  font-family: system-ui, -apple-system, "Noto Sans JP", sans-serif;
  font-size: 16px;
}
.admin-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}
.admin-header .brand {
  font-weight: 700;
  font-size: 1.1rem;
  color: #111827;
  text-decoration: none;
}
.admin-header .nav {
  display: flex;
  gap: 1rem;
}
.admin-header .nav a {
  color: #374151;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}
.admin-header .nav a.router-link-active {
  background: #eef2ff;
  color: #4338ca;
}
.admin-header .spacer { flex: 1; }
.admin-header .user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.admin-header .user-name { color: #4b5563; font-size: 0.9rem; }
.admin-header .logout {
  border: 1px solid #d1d5db;
  background: #ffffff;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
}
.admin-header .logout:hover { background: #f3f4f6; }
.admin-main {
  max-width: 960px;
  margin: 0 auto;
  padding: 1.5rem;
}
.admin-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.25rem;
}
.admin-button {
  display: inline-block;
  background: #4338ca;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.95rem;
}
.admin-button:hover { background: #3730a3; }
.admin-button.secondary {
  background: #ffffff;
  color: #374151;
  border: 1px solid #d1d5db;
}
.admin-button.danger { background: #dc2626; }
.admin-button.danger:hover { background: #b91c1c; }
.admin-table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}
.admin-table th, .admin-table td {
  padding: 0.6rem 0.75rem;
  border-bottom: 1px solid #f3f4f6;
  text-align: left;
  font-size: 0.9rem;
}
.admin-table th { background: #f9fafb; color: #4b5563; font-weight: 600; }
.admin-table tr:last-child td { border-bottom: none; }
.admin-table .actions { display: flex; gap: 0.5rem; }
.admin-form {
  display: grid;
  gap: 0.85rem;
  max-width: 520px;
}
.admin-field { display: grid; gap: 0.3rem; }
.admin-field label { font-size: 0.85rem; color: #4b5563; }
.admin-field input, .admin-field select, .admin-field textarea {
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 0.5rem 0.6rem;
  font-size: 0.95rem;
  font-family: inherit;
}
.admin-actions { display: flex; gap: 0.5rem; }
.admin-error {
  background: #fee2e2;
  border: 1px solid #fca5a5;
  color: #991b1b;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}
</style>
