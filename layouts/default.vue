<script lang="ts" setup></script>

<template>
  <div class="layout-root">
    <slot />
  </div>
</template>

<style>
html {
  font-size: min(1.3em, 5vw);
}
body {
  width: 100lvw;
  height: 100lvh;
  background: linear-gradient(45deg, #05273c, #4f1344),
    linear-gradient(rgba(17, 22, 105, 0.07), rgba(8, 9, 70, 0.5));
  background-blend-mode: screen;
  color: white;
  font-family: "Noto Sans JP", sans-serif;
}

.layout-root {
  width: 100lvw;
  height: 100lvh;
  overflow: scroll;
}
</style>
