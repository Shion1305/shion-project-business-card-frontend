<script lang="ts" setup>
definePageMeta({ layout: "admin" });
useHead({ title: "Admin Dashboard" });
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <div class="grid">
      <NuxtLink to="/admin/cards" class="admin-card tile">
        <h2>Cards</h2>
        <p>名刺カードを管理</p>
      </NuxtLink>
      <NuxtLink to="/admin/events" class="admin-card tile">
        <h2>Events</h2>
        <p>イベント情報を管理</p>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
h1 { margin: 0 0 1rem; font-size: 1.4rem; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}
.tile {
  text-decoration: none;
  color: inherit;
  transition: transform 0.1s;
}
.tile:hover { transform: translateY(-2px); }
.tile h2 { margin: 0 0 0.25rem; font-size: 1.1rem; }
.tile p { margin: 0; color: #6b7280; font-size: 0.9rem; }
</style>
