<script lang="ts" setup>
import type { CardInfo } from "~/schema/CardInfo";
import { SNS_ORDER } from "~/type/sns";

const id = useRoute().params.id;
const cardInfo: CardInfo | null = await useFetch(`/api/card-data?id=${id}`)
  .then((res) => res.data.value as CardInfo)
  .catch(() => null);
</script>

<template>
  <div class="page-root">
    <Profile />
    <CardExchangeInfo v-if="cardInfo" :card-info="cardInfo" />
    <p v-else class="load-error">名刺情報の読み取りに失敗しました</p>
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
.load-error {
  margin: 1.25rem auto 0.75rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}
</style>
