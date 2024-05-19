<template>
  <Dropdown
    v-model="model"
    :options="items"
    optionLabel="name"
    placeholder="Выберите тип"
    :pt
  />
</template>

<script setup lang="ts" generic="T extends DropdownItem">
import clsx from "clsx";
import Dropdown, { type DropdownPassThroughOptions } from "primevue/dropdown";

export interface DropdownItem {
  id: number;
  name: string;
}

defineProps<{items:T[]}>();
const model = defineModel<T|null>({required:true})

const pt: DropdownPassThroughOptions = {
  root: {
    class:clsx(`flex flex-row items-center gap-2 w-fit border-black border-2 h-12 text-lg p-2 shadow-blackMd outline-none
      focus:shadow-blackSm duration-200 ease-in-out transition-all bg-lime-50
      text-lime-900 data-[error=true]:bg-red-300 data-[error=true]:text-red-900
      font-body rounded-md cursor-pointer`)
  },
  input: {
    class: clsx(``)
  },
  item: {
    class: clsx(`text-lime-900 h-12 w-full border-y border-y-lime-950 text-lg
    flex justify-start items-center pl-2 py-2 hover:bg-lime-300 cursor-pointer
    px-2`)
  },
  panel: {
    class: clsx(`bg-lime-200 border-2 border-black translate-y-[10px] min-h-14
    rounded-md`)
  },
  loadingIcon: {
    class: clsx(`hidden`)
  },
  list: {
    class: clsx(`h-full min-h-14 flex flex-col justify-center items-center`)
  },
  emptyMessage: {
    class: clsx(`h-full w-full flex justify-center items-center`)
  }

}
</script>
