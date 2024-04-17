<template>
  <AutoComplete :pt="{input:{class:'w-full'}}" @complete="(e) => data = e.query" :model-value="item"
    @update:model-value="(e: any) =>item=e" :suggestions="items"
    optionLabel="name" />
</template>

<script setup lang="ts" generic="T extends DropItem">
export interface DropItem { id?: number | undefined; name: string; }
import { useVModel } from '@vueuse/core';
import AutoComplete from 'primevue/autocomplete';
const props = defineProps<{
  items: T[];
  query: string;
}>()
const item = defineModel<T>()
const emit = defineEmits(['update:query'])
const data = useVModel(props, 'query', emit)
</script>
