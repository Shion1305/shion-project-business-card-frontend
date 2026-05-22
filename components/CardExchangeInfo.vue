<script lang="ts" setup>
import type { CardInfo } from "~/schema/CardInfo";

defineProps<{ cardInfo: CardInfo }>();
</script>

<template>
  <section class="card">
    <div v-if="cardInfo.event" class="event">
      <h3 class="event-heading">この名刺を交換したイベント</h3>
      <p class="event-name">{{ cardInfo.event.name }}</p>
      <p v-if="cardInfo.event.description" class="event-desc">
        {{ cardInfo.event.description }}
      </p>
      <dl class="meta event-meta">
        <div v-if="cardInfo.event.place" class="row">
          <dt>会場</dt>
          <dd>{{ cardInfo.event.place }}</dd>
        </div>
        <div v-if="cardInfo.event.date" class="row">
          <dt>開催日</dt>
          <dd>{{ cardInfo.event.date }}</dd>
        </div>
        <div v-if="cardInfo.event.time" class="row">
          <dt>時間</dt>
          <dd>{{ cardInfo.event.time }}</dd>
        </div>
      </dl>
    </div>

    <dl class="meta" :class="{ 'with-divider': !!cardInfo.event }">
      <div v-if="cardInfo.recipient" class="row">
        <dt>To</dt>
        <dd class="recipient">{{ cardInfo.recipient }}</dd>
      </div>
      <div class="row">
        <dt>交換日</dt>
        <dd>{{ cardInfo.exchangeDate || "—" }}</dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.card {
  width: min(85vw, 15.5em);
  margin: 0.9em auto 0;
  padding: 0.55em 0.85em 0.6em;
  border: 1px solid rgba(255, 255, 255, 0.85);
  border-radius: 1em;
  color: #ffffff;
  font-size: 0.92em;
}

.meta {
  margin: 0;
  display: grid;
  gap: 0.15em;
}
.meta.with-divider {
  margin-top: 0.4em;
  padding-top: 0.35em;
  border-top: 1px solid rgba(255, 255, 255, 0.22);
}

.row {
  display: grid;
  grid-template-columns: 3.4em 1fr;
  align-items: baseline;
  column-gap: 0.5em;
}
.row dt {
  margin: 0;
  font-size: 0.66em;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.02em;
}
.row dd {
  margin: 0;
  font-size: 0.86em;
  font-weight: 500;
  line-height: 1.35;
  word-break: keep-all;
  overflow-wrap: anywhere;
  line-break: strict;
}
.row dd.recipient {
  font-size: 0.92em;
  font-weight: 600;
}

.event-heading {
  margin: 0 0 0.18em;
  font-size: 0.7em;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.04em;
}
.event-name {
  margin: 0 0 0.15em;
  font-size: 0.96em;
  font-weight: 600;
  line-height: 1.3;
  word-break: keep-all;
  overflow-wrap: anywhere;
  line-break: strict;
}
.event-desc {
  margin: 0 0 0.35em;
  font-size: 0.74em;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.78);
}
.event-meta {
  margin-top: 0.25em;
}
</style>
