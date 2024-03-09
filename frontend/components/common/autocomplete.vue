<template>
  <AutoComplete @complete="(e)=>data = e.query" :model-value="item"
  class="h-8 border border-primary rounded-md"
  :pt="{
      input: {class: 'h-full p-2'}
    }"
  @update:model-value="(e:any)=>{console.log(e);item = e;console.log(item)}" :suggestions="items" optionLabel="name" />
</template>

<script setup lang="ts" generic="T extends DropItem">
  export interface DropItem {id?: number|undefined; name:string;}
import { useVModel } from '@vueuse/core';
  import AutoComplete from 'primevue/autocomplete';
  const item = defineModel<T>()
  const props = defineProps<{
    items: T[];
    query: string;
  }>()
  const emit = defineEmits(['update:query'])
  const data = useVModel(props, 'query', emit)
</script>
