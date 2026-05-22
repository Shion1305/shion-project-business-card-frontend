<script lang="ts" setup>
import type { CardInfo } from "~/schema/CardInfo";

defineProps<{ cardInfo: CardInfo }>();
</script>

<template>
  <section
    class="stub"
    :aria-label="cardInfo.event ? `${cardInfo.event.name} で交換された名刺` : '名刺交換記録'"
  >
    <aside class="stub-rail">
      <span class="rail-text">EXCHANGE&nbsp;RECORD</span>
    </aside>

    <span class="stub-perf" aria-hidden="true"></span>

    <div class="stub-body">
      <div class="row">
        <span class="row-label">EXCHANGED</span>
        <span class="row-value mono">{{ cardInfo.exchangeDate || "—" }}</span>
      </div>

      <div v-if="cardInfo.event" class="event">
        <span class="event-flag">EVENT</span>
        <h3 class="event-name">{{ cardInfo.event.name }}</h3>
        <p v-if="cardInfo.event.description" class="event-desc">
          {{ cardInfo.event.description }}
        </p>

        <div class="event-grid">
          <div v-if="cardInfo.event.place" class="row">
            <span class="row-label">VENUE</span>
            <span class="row-value">{{ cardInfo.event.place }}</span>
          </div>
          <div v-if="cardInfo.event.date" class="row">
            <span class="row-label">DATE</span>
            <span class="row-value mono">{{ cardInfo.event.date }}</span>
          </div>
          <div v-if="cardInfo.event.time" class="row">
            <span class="row-label">TIME</span>
            <span class="row-value mono">{{ cardInfo.event.time }}</span>
          </div>
        </div>
      </div>
    </div>

    <span class="stub-shimmer" aria-hidden="true"></span>
  </section>
</template>

<style scoped>
/* Ticket stub: left rail + perforation + body
   Uses CSS mask to punch real notches into the card silhouette so it
   reads as a torn ticket regardless of the page background. */
.stub {
  --notch-r: 0.4rem;
  --rail-w: 1.55rem;
  --perf-w: 0px;
  --gutter: calc(var(--rail-w) + var(--perf-w));

  position: relative;
  width: min(82vw, 19rem);
  margin: 1.25rem auto 0.75rem;
  display: grid;
  grid-template-columns: var(--rail-w) var(--perf-w) 1fr;

  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.06) 0%,
    rgba(255, 255, 255, 0.025) 100%
  );
  color: #ffffff;
  font-size: 13px;
  isolation: isolate;

  /* Real cut-out notches via mask */
  --notch-mask:
    radial-gradient(circle var(--notch-r) at var(--gutter) 0, transparent 99%, #000 100%),
    radial-gradient(circle var(--notch-r) at var(--gutter) 100%, transparent 99%, #000 100%);
  -webkit-mask: var(--notch-mask);
          mask: var(--notch-mask);
  -webkit-mask-composite: source-in;
          mask-composite: intersect;

  border-radius: 0.7rem;

  /* Faux border via inset shadow (real border + mask would look uneven) */
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.13),
    0 14px 32px -20px rgba(0, 0, 0, 0.6);
}

/* left rail */
.stub-rail {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
}
.rail-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  white-space: nowrap;
  font-family: "JetBrains Mono", "SF Mono", ui-monospace, monospace;
  font-size: 0.55rem;
  letter-spacing: 0.32em;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.55);
}

/* perforation strip: thin dashed line between rail and body */
.stub-perf {
  position: relative;
  width: 0;
}
.stub-perf::before {
  content: "";
  position: absolute;
  top: 0.45rem;
  bottom: 0.45rem;
  left: 0;
  width: 1px;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.32) 0 4px,
    transparent 4px 8px
  );
  background-size: 1px 8px;
  background-repeat: repeat-y;
}

/* right body */
.stub-body {
  padding: 0.8rem 0.95rem 0.85rem 1rem;
  display: grid;
  gap: 0.55rem;
}

/* row primitive */
.row {
  display: grid;
  grid-template-columns: 4rem 1fr;
  align-items: baseline;
  column-gap: 0.6rem;
}
.row-label {
  font-family: "JetBrains Mono", "SF Mono", ui-monospace, monospace;
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  color: rgba(255, 255, 255, 0.42);
  font-weight: 500;
}
.row-value {
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.95);
  word-break: keep-all;
  overflow-wrap: anywhere;
  line-break: strict;
}
.row-value.mono {
  font-family: "JetBrains Mono", "SF Mono", ui-monospace, monospace;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
}

/* event block */
.event {
  position: relative;
  margin-top: 0.5rem;
  padding-top: 0.65rem;
}
.event::before {
  content: "";
  position: absolute;
  top: 0;
  left: -1rem;
  right: -0.95rem;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.18) 0 3px,
    transparent 3px 6px
  );
  background-size: 6px 1px;
}
.event-flag {
  display: inline-block;
  font-family: "JetBrains Mono", "SF Mono", ui-monospace, monospace;
  font-size: 0.55rem;
  letter-spacing: 0.22em;
  padding: 0.12rem 0.4rem;
  border: 1px solid #c4ff33;
  color: #c4ff33;
  border-radius: 2px;
  margin-bottom: 0.45rem;
}
.event-name {
  margin: 0 0 0.2rem;
  font-size: 0.98rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.005em;
}
.event-desc {
  margin: 0 0 0.6rem;
  font-size: 0.7rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.65);
}
.event-grid {
  display: grid;
  gap: 0.32rem;
}

/* subtle shimmer on hover */
.stub-shimmer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: linear-gradient(
    115deg,
    transparent 38%,
    rgba(196, 255, 51, 0.08) 50%,
    transparent 62%
  );
  background-size: 220% 100%;
  background-position: 200% 0;
  transition: background-position 1.4s ease;
}
.stub:hover .stub-shimmer {
  background-position: -120% 0;
}

@media (max-width: 360px) {
  .stub { font-size: 12px; }
  .stub-body { padding: 0.7rem 0.8rem 0.75rem 0.85rem; }
  .row { grid-template-columns: 3.6rem 1fr; column-gap: 0.45rem; }
}
</style>
