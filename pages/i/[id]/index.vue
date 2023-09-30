<script lang="ts" setup>
import { CardInfo } from "~/schema/CardInfo";

const id = useRoute().params.id;
const cardInfo: CardInfo | null = await useFetch(`/api/card-data?id=${id}`)
  .then((res) => {
    return res.data.value as CardInfo;
  })
  .catch(() => {
    return null;
  });
</script>

<template>
  <div class="page-root">
    <div class="exchange-info">
      <div v-if="!cardInfo">名刺情報の読み取りに失敗しました</div>
      <div v-else>
        この名刺の交換日は
        <p class="exchange-date">
          {{ cardInfo.exchangeDate }}
        </p>
        <div class="event-area" v-if="cardInfo.event">
          <hr />
          <p class="name">{{ cardInfo.event.name }}</p>
          <p class="desc" v-show="cardInfo.event.description">
            {{ cardInfo.event.description }}
          </p>
          <p class="place" v-show="cardInfo.event.place">
            {{ cardInfo.event.place }}
          </p>
          <p class="date" v-show="cardInfo.event.date">
            {{ cardInfo.event.date }}
          </p>
          <p class="time" v-show="cardInfo.event.time">
            {{ cardInfo.event.time }}
          </p>
        </div>
      </div>
    </div>
    <Profile />
    <div class="sns-area">
      <SNSItem snsType="github" />
      <SNSItem snsType="gmail" />
      <SNSItem snsType="x" />
      <SNSItem snsType="discord" />
      <SNSItem snsType="line" />
      <SNSItem snsType="wantedly" />
      <SNSItem snsType="linkedin" />
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
  margin: 0 auto;
  max-width: 40rem;
}

.sns-item {
  width: min(300px, 90vw);
  height: 50px;
}

.exchange-info {
  width: min(85vw, 17rem);
  border: 1px solid white;
  padding: 0.75em;
  border-radius: 1em;
  text-align: center;
  margin: 2em auto 0;

  .exchange-date {
    font-size: 1.5em;
    font-weight: bold;
    margin: 0.4em 1em;
  }

  .event-area {
    .name {
      margin: 1em 0 0.5em;
    }
    .desc {
      font-size: 0.8em;
      margin: 0 0 0.4em 0;
    }
    .place {
      margin: 1em 0;
    }
    .date {
      margin: 1em 0 0.2em 0;
      font-size: 1.2em;
    }
    .time {
      margin: 0 0 0.4em 0;
      font-size: 1.2em;
    }
  }
}
</style>
