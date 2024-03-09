<script lang="ts" setup generic="T extends DropItem">
import { ComboboxContent, ComboboxInput, ComboboxItem, ComboboxPortal, ComboboxRoot } from 'radix-vue';
import { cn } from '~/lib/utils';

export interface DropItem {
  id?: number | undefined,
  name: string,
}
const props = defineProps<{
  items: T[]
}>()
const selectedItem = defineModel<T>()
const searchTerm = defineModel<string>('search', {})

</script>

<template>
  <ComboboxRoot :model-value="selectedItem" :search-term="searchTerm"
  @update:search-term="(e)=>searchTerm = e"
    @update:model-value="(e) => selectedItem = e" class="relative" :displayValue="(val) => val.name">
    <ComboboxInput
      :class="cn('flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50', $attrs.class ?? '')" />
    <ComboboxContent class="absolute top-10 left-0 bg-white w-full z-50">
      <ComboboxItem class="bg-white rounded-md text-sm
        data-[highlighted]:bg-accent z-50 w-full h-9
        flex justify-center items-center select-none pointer-events-auto " :text-value="item.name" role="button"
        v-for="item in items" :key="item.id" :value="item">
        {{ item.name }}
      </ComboboxItem>
    </ComboboxContent>
  </ComboboxRoot>
</template>
