<script lang="ts" setup>
import type CardData from "~/type/CardData";
definePageMeta({ layout: "admin" });
useHead({ title: "Admin - Cards" });

const { data, refresh, pending } = await useFetch<{ items: CardData[] }>("/api/admin/cards");

async function remove(id: string) {
  if (!confirm(`Delete card ${id}?`)) return;
  await $fetch(`/api/admin/cards/${id}`, { method: "DELETE" });
  await refresh();
}
</script>

<template>
  <div>
    <div class="head">
      <h1>Cards</h1>
      <NuxtLink to="/admin/cards/new" class="admin-button">+ New Card</NuxtLink>
    </div>
    <p v-if="pending">Loading…</p>
    <table v-else-if="data && data.items.length" class="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Recipient</th>
          <th>Version</th>
          <th>Exchange Date</th>
          <th>Event ID</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in data.items" :key="c.id">
          <td>{{ c.id }}</td>
          <td>{{ c.recipient || "—" }}</td>
          <td>{{ c.version }}</td>
          <td>{{ c.exchangeDate || "—" }}</td>
          <td>{{ c.eventID || "—" }}</td>
          <td class="actions">
            <NuxtLink :to="`/admin/cards/${c.id}`" class="admin-button secondary">Edit</NuxtLink>
            <button class="admin-button danger" @click="remove(c.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>カードがありません。</p>
  </div>
</template>

<style scoped>
.head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
h1 { margin: 0; font-size: 1.4rem; }
</style>
