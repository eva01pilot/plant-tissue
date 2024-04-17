<template>
  <div class="flex flex-col w-full">
    <div class="w-full">
      <slot />
    </div>
    <InlineMessage v-if="error" severity="error" class="w-full mt-2">
      {{ error }}
    </InlineMessage>
  </div>
</template>

<script setup lang="ts">
import InlineMessage from 'primevue/inlinemessage';
const props = defineProps<{
  error?: string;

}>()
</script>
