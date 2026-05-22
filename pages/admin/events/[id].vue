<script lang="ts" setup>
import type EventData from "~/type/EventData";

definePageMeta({ layout: "admin" });
useHead({ title: "Admin - Edit Event" });

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const { data } = await useFetch<{ items: EventData[] }>("/api/admin/events");
const current = computed(() => data.value?.items.find((e) => e.id === id));

const form = reactive({
  name: "",
  description: "",
  place: "",
  date: "",
  time: "",
});
watch(current, (c) => {
  if (!c) return;
  form.name = c.name || "";
  form.description = c.description || "";
  form.place = c.place || "";
  form.date = c.date || "";
  form.time = c.time || "";
}, { immediate: true });

const error = ref<string | null>(null);
const saving = ref(false);

async function save() {
  error.value = null;
  saving.value = true;
  try {
    await $fetch(`/api/admin/events/${id}`, { method: "PUT", body: { ...form } });
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
    <h1>Edit Event <span class="id">({{ id }})</span></h1>
    <div v-if="!current" class="admin-error">イベントが見つかりません。</div>
    <div v-else>
      <div v-if="error" class="admin-error">{{ error }}</div>
      <form class="admin-form" @submit.prevent="save">
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
          <button type="submit" class="admin-button" :disabled="saving">{{ saving ? "Saving…" : "Save" }}</button>
          <NuxtLink to="/admin/events" class="admin-button secondary">Cancel</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
h1 { margin: 0 0 1rem; font-size: 1.4rem; }
.id { color: #6b7280; font-size: 0.9rem; font-weight: normal; }
</style>
