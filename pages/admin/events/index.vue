<script lang="ts" setup>
import type EventData from "~/type/EventData";
definePageMeta({ layout: "admin" });
useHead({ title: "Admin - Events" });

const { data, refresh, pending } = await useFetch<{ items: EventData[] }>("/api/admin/events");

async function remove(id: string) {
  if (!confirm(`Delete event ${id}?`)) return;
  await $fetch(`/api/admin/events/${id}`, { method: "DELETE" });
  await refresh();
}
</script>

<template>
  <div>
    <div class="head">
      <h1>Events</h1>
      <NuxtLink to="/admin/events/new" class="admin-button">+ New Event</NuxtLink>
    </div>
    <p v-if="pending">Loading…</p>
    <table v-else-if="data && data.items.length" class="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Place</th>
          <th>Date</th>
          <th>Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="e in data.items" :key="e.id">
          <td>{{ e.id }}</td>
          <td>{{ e.name }}</td>
          <td>{{ e.place || "—" }}</td>
          <td>{{ e.date || "—" }}</td>
          <td>{{ e.time || "—" }}</td>
          <td class="actions">
            <NuxtLink :to="`/admin/events/${e.id}`" class="admin-button secondary">Edit</NuxtLink>
            <button class="admin-button danger" @click="remove(e.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>イベントがありません。</p>
  </div>
</template>

<style scoped>
.head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
h1 { margin: 0; font-size: 1.4rem; }
</style>
