<template>
  <Card>
    <template #header>
      <img alt="user header" class="rounded-xl" src="/assets/img/growth_medium.jpg" />
    </template>
    <template #title>{{medium.name}}</template>
    <template #content>
      <p class="m-0">
        {{medium.description}}
      </p>
    </template>
    <template #footer v-if="!readonly">
      <Button severity="danger" label="Удалить" @click="emit('delete', medium)"/>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import type { Medium } from '~/store/mediums'
const props = defineProps<{ medium: Medium, readonly?: boolean }>()
const emit = defineEmits<{delete:[Medium]}>()

</script>
