<template>
  <div v-focustrap>
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import LoginForm from '~/components/login/LoginForm.vue';
definePageMeta({
  layout: 'auth-layout'
})
</script>
