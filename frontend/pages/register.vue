<template>
  <CommonCard>
  <template #title>
    Регистрация
  </template>
    <template #content>
      <RegisterSignupForm />
    </template>
    <template #footer>
      <UiButton variant="link">
        <NuxtLink to="/login">Войти</NuxtLink>
      </UiButton>
    </template>
  </CommonCard>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth-layout'
})


</script>
