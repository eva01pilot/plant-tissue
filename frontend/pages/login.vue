<template>
  <CommonCard>
    <template #title> Вход </template>
    <template #content>
      <LoginForm />
    </template>
    <template #footer>
      <UiButton variant="link">
        <NuxtLink to="/register">Зарегистрироваться</NuxtLink>
      </UiButton>
    </template>
  </CommonCard>
</template>

<script setup lang="ts">
import LoginForm from "~/components/login/login-form.vue";

definePageMeta({
  layout: "auth-layout",
});
</script>
