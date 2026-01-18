<script lang="ts" setup>
import { SNS_ORDER } from "~/type/sns";
</script>

<template>
  <div class="page-root">
    <Profile />
    <div class="sns-area">
      <SNSItem v-for="type in SNS_ORDER" :key="type" :sns-type="type" />
    </div>
  </div>
</template>

<style scoped>
.page-root {
  display: flex;
  flex-direction: column;
  padding-bottom: 4em;
}

.sns-area {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 40rem;
  margin: 0 auto;
  gap: 0.5rem;
}
</style>
