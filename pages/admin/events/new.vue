<script lang="ts" setup>
definePageMeta({ layout: "admin" });
useHead({ title: "Admin - New Event" });

const router = useRouter();
const form = reactive({
  id: "",
  name: "",
  description: "",
  place: "",
  date: "",
  time: "",
});
const error = ref<string | null>(null);
const saving = ref(false);

async function save() {
  error.value = null;
  saving.value = true;
  try {
    await $fetch("/api/admin/events", { method: "POST", body: { ...form } });
    router.push("/admin/events");
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
    <h1>New Event</h1>
    <div v-if="error" class="admin-error">{{ error }}</div>
    <form class="admin-form" @submit.prevent="save">
      <div class="admin-field">
        <label>ID (任意)</label>
        <input v-model="form.id" type="text" placeholder="auto" />
      </div>
      <div class="admin-field">
        <label>Name *</label>
        <input v-model="form.name" type="text" required />
      </div>
      <div class="admin-field">
        <label>Description</label>
        <textarea v-model="form.description" rows="3" />
      </div>
      <div class="admin-field">
        <label>Place</label>
        <input v-model="form.place" type="text" />
      </div>
      <div class="admin-field">
        <label>Date</label>
        <input v-model="form.date" type="text" placeholder="2026-05-22" />
      </div>
      <div class="admin-field">
        <label>Time</label>
        <input v-model="form.time" type="text" placeholder="18:00" />
      </div>
      <div class="admin-actions">
        <button type="submit" class="admin-button" :disabled="saving">{{ saving ? "Saving…" : "Create" }}</button>
        <NuxtLink to="/admin/events" class="admin-button secondary">Cancel</NuxtLink>
      </div>
    </form>
  </div>
</template>

<style scoped>
h1 { margin: 0 0 1rem; font-size: 1.4rem; }
</style>
