<script lang="ts" setup></script>

<template>
  <div class="page-root">
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
}

.sns-area {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.sns-item {
  width: 300px;
  height: 50px;
}
</style>
