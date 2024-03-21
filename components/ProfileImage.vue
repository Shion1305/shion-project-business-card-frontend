<script setup lang="ts"></script>

<template>
  <img
    src="@/assets/img/shion-202402.webp"
    alt="Shion's Ski Profile Image"
    class="profile-image"
  />
</template>

<style scoped>
.profile-image {
  width: min(150px, 40vw);
  border-radius: 50%;
  border: 1px solid white;
  aspect-ratio: 1;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.9)
  );
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}
</style>
