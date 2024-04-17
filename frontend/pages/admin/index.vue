<template>
  <div class="h-full w-full grid grid-cols-1 md:grid-cols-2">
    <NuxtLink to="/admin/medium-form" class="flex justify-center
      items-center w-full h-full">
      <Button label="К форме питательных сред" severity="success" class="h-full
        w-full"/>
    </NuxtLink>
    <NuxtLink to="/admin/component-form" class="flex justify-center
      items-center">
      <Button label="К форме компонентов" severity="secondary" class="h-full
        w-full"/>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
definePageMeta({
  layout: 'app-layout'
})
</script>
