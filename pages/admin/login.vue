<script lang="ts" setup>
definePageMeta({ layout: "admin" });
useHead({ title: "Admin Login" });
</script>

<template>
  <div class="login-wrap">
    <div class="admin-card">
      <h1>Admin Login</h1>
      <p>LINE アカウントでログインしてください。</p>
      <a class="line-button" href="/api/admin/auth/login">
        <span>LINE でログイン</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.login-wrap {
  display: flex;
  justify-content: center;
  padding-top: 4rem;
}
h1 {
  margin: 0 0 0.5rem;
  font-size: 1.4rem;
}
p {
  margin: 0 0 1.25rem;
  color: #4b5563;
  font-size: 0.95rem;
}
.line-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #06c755;
  color: #ffffff;
  font-weight: 600;
  padding: 0.65rem 1.25rem;
  border-radius: 6px;
  text-decoration: none;
}
.line-button:hover { background: #05a847; }
</style>
