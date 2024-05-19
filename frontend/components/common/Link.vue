<template>
  <NuxtLink :to class="relative group hover:underline decoration-dotted
  underline-offset-8 text-fuchsia-950">
    <slot />
  </NuxtLink>
</template>
<script setup lang="ts">
  defineProps<{
    to: string
  }>()
</script>
