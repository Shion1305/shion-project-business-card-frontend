<script lang="ts" setup>
import { SNS_DATA, type SNSType } from "~/type/sns";

const props = defineProps<{
  snsType: SNSType;
}>();

const snsData = computed(() => SNS_DATA[props.snsType]);

const parentStyle = computed(() => {
  return {
    background: snsData.value.backgroundColor,
  };
});

const iconStyle = computed(() => {
  if (snsData.value.iconBackground) {
    return {
      background: snsData.value.iconBackground,
      "border-radius": "10%",
    };
  }
  return {};
});
</script>

<template>
  <a
    v-if="snsData.snsUrl"
    :href="snsData.snsUrl"
    :style="parentStyle"
    class="sns-item"
  >
    <img
      :src="snsData.icon"
      :style="iconStyle"
      :alt="`${props.snsType} logo`"
    />
    <div rel="noopener noreferrer" target="_blank">
      {{ snsData.snsID }}
    </div>
  </a>
  <div v-else :style="parentStyle" class="sns-item">
    <img
      :src="snsData.icon"
      :style="iconStyle"
      :alt="`${props.snsType} logo`"
    />
    <div>
      {{ snsData.snsID }}
    </div>
  </div>
</template>

<style scoped>
.sns-item {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  padding: 0.5rem;
  color: white;
  gap: 0.3em;
  font-size: 1.15rem;
  text-decoration: none;
  width: 300px;
  height: 50px;

  > img {
    width: 40px;
    aspect-ratio: 1;
    object-fit: contain;
  }

  > div {
    margin-left: 0.3rem;
    color: white;
  }
}
</style>
