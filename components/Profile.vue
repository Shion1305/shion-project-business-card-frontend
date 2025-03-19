<script lang="ts" setup>
import ProfileImage from "~/components/ProfileImage.vue";
</script>

<template>
  <div class="profile">
    <ProfileImage/>
    <div class="name">
      <h2 class="jp">市川 詩恩</h2>
      <p class="en">Shion Ichikawa</p>
    </div>
    <div class="status">
      <div class="main">
        <p>横浜国立大学 大学院</p>
        <p>環境情報学府 修士1年</p>
      </div>
      <hr/>
      <ul>
        <li>
          <span>Software Engineer Intern</span>
          <span>&nbsp;@Apple</span>
        </li>
        <li>
          <span>Google Developer Groups on Campus</span>
          <span>YNU支部Lead</span>
        </li>
        <li>
          <span>金融チーム</span>
          <span>&nbsp;@東京大学松尾研究室</span>
        </li>
        <li>Lumos&nbsp;<sub>(プログラミングサークル)</sub></li>
        <li><sub>情報安全確保支援士</sub></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.profile-image {
  margin: 10px;
}

.name {
  text-align: center;

  * {
    margin: 0;
  }

  .jp {
    font-family: "Klee One", sans-serif;
    font-size: 2em;
  }

  .en {
    font-size: 1.3em;
  }
}

.status {
  width: min(90vw, 17em);
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  margin: 1em 0;
  border: 1px solid white;
  border-radius: 1em;
  padding: 0.75em;

  .main {
    font-size: 1.2em;
    text-align: center;

    > p {
      margin: 0;
    }

    > span,
    > sub {
      display: inline-block;
    }
  }

  > hr {
    margin: 0.5em 0;
  }

  > ul {
    font-size: 0.8em;
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.65em;
    text-align: center;

    > li {
      > span {
        display: inline-block;
        width: fit-content;
        border-radius: 0.5em;
      }
    }
  }
}

.profile {
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
}
</style>
