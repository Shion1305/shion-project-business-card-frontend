<script lang="ts" setup></script>

<template>
  <div class="page-root">
    <Profile/>
    <div class="sns-area">
      <SNSItem snsType="github"/>
      <SNSItem snsType="x"/>
      <SNSItem snsType="linkedin"/>
      <SNSItem snsType="discord"/>
      <SNSItem snsType="wantedly"/>
      <SNSItem snsType="line"/>
      <SNSItem snsType="gmail"/>
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
