<script lang="ts" setup>
import type CardData from "~/type/CardData";
import type EventData from "~/type/EventData";

definePageMeta({ layout: "admin" });
useHead({ title: "Admin - Edit Card" });

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const { data: cardsData } = await useFetch<{ items: CardData[] }>("/api/admin/cards");
const { data: eventsData } = await useFetch<{ items: EventData[] }>("/api/admin/events");
const current = computed(() => cardsData.value?.items.find((c) => c.id === id));

const form = reactive({
  recipient: "",
  version: "",
  exchangeDate: "",
  eventID: "",
});
watch(current, (c) => {
  if (!c) return;
  form.recipient = c.recipient || "";
  form.version = c.version || "";
  form.exchangeDate = c.exchangeDate || "";
  form.eventID = c.eventID || "";
}, { immediate: true });

const error = ref<string | null>(null);
const saving = ref(false);

async function save() {
  error.value = null;
  saving.value = true;
  try {
    await $fetch(`/api/admin/cards/${id}`, { method: "PUT", body: { ...form } });
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
    <h1>Edit Card <span class="id">({{ id }})</span></h1>
    <div v-if="!current" class="admin-error">カードが見つかりません。</div>
    <div v-else>
      <div v-if="error" class="admin-error">{{ error }}</div>
      <form class="admin-form" @submit.prevent="save">
        <div class="admin-field">
          <label>Recipient</label>
          <input v-model="form.recipient" type="text" />
        </div>
        <div class="admin-field">
          <label>Version *</label>
          <input v-model="form.version" type="text" required />
        </div>
        <div class="admin-field">
          <label>Exchange Date</label>
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
          <button type="submit" class="admin-button" :disabled="saving">{{ saving ? "Saving…" : "Save" }}</button>
          <NuxtLink to="/admin/cards" class="admin-button secondary">Cancel</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
h1 { margin: 0 0 1rem; font-size: 1.4rem; }
.id { color: #6b7280; font-size: 0.9rem; font-weight: normal; }
</style>
