<script lang="ts" setup>
import type EventData from "~/type/EventData";
definePageMeta({ layout: "admin" });
useHead({ title: "Admin - New Card" });

const router = useRouter();
const { data: eventsData } = await useFetch<{ items: EventData[] }>("/api/admin/events");

const form = reactive({
  id: "",
  recipient: "",
  version: "v1",
  exchangeDate: "",
  eventID: "",
});
const error = ref<string | null>(null);
const saving = ref(false);

async function save() {
  error.value = null;
  saving.value = true;
  try {
    await $fetch("/api/admin/cards", { method: "POST", body: { ...form } });
    router.push("/admin/cards");
  } catch (e: unknown) {
    error.value = (e as { statusMessage?: string; message?: string })?.statusMessage
      || (e as Error)?.message
      || "failed";
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <div>
    <h1>New Card</h1>
    <div v-if="error" class="admin-error">{{ error }}</div>
    <form class="admin-form" @submit.prevent="save">
      <div class="admin-field">
        <label>ID (任意 — 空ならFirestore自動採番)</label>
        <input v-model="form.id" type="text" placeholder="auto" />
      </div>
      <div class="admin-field">
        <label>Recipient</label>
        <input v-model="form.recipient" type="text" />
      </div>
      <div class="admin-field">
        <label>Version *</label>
        <input v-model="form.version" type="text" required />
      </div>
      <div class="admin-field">
        <label>Exchange Date (YYYY-MM-DD)</label>
        <input v-model="form.exchangeDate" type="text" placeholder="2026-05-22" />
      </div>
      <div class="admin-field">
        <label>Event</label>
        <select v-model="form.eventID">
          <option value="">(none)</option>
          <option v-for="e in eventsData?.items || []" :key="e.id" :value="e.id">
            {{ e.name }} ({{ e.id }})
          </option>
        </select>
      </div>
      <div class="admin-actions">
        <button type="submit" class="admin-button" :disabled="saving">{{ saving ? "Saving…" : "Create" }}</button>
        <NuxtLink to="/admin/cards" class="admin-button secondary">Cancel</NuxtLink>
      </div>
    </form>
  </div>
</template>

<style scoped>
h1 { margin: 0 0 1rem; font-size: 1.4rem; }
</style>
