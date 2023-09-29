<script lang="ts" setup></script>

<template>
  <div>
    <slot/>
  </div>
</template>

<style>
body {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(45deg,  #05273c, #4f1344),
        linear-gradient(rgba(17, 22, 105, 0.07), rgba(8, 9, 70, 0.5));
  background-blend-mode: screen;
}
</style>
