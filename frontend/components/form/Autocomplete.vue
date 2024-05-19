<template>
    <div class="flex flex-col gap-[2px]">

        <FormLabel :for="id ??''" :label v-if="label"/>
        <AutoComplete :pt v-model="model" :suggestions="items" @input="search"
        optionLabel="name" />
    </div>
</template>

<script setup lang="ts" generic="T extends AutoCompleteItem">
import clsx from 'clsx';
import AutoComplete, { type AutoCompleteCompleteEvent, type AutoCompletePassThroughOptions } from 'primevue/autocomplete';
export interface AutoCompleteItem {
  id: number|null;
  name: string
}

const props = defineProps<{
  id?: string;
  label?: string;
  items: T[]
}>()
const model = defineModel<T>({required:true})
const emit = defineEmits<{search:[string]}>()

const pt: AutoCompletePassThroughOptions = {
  input: {
    class: clsx(`w-full border-black border-2 h-12 text-lg p-2 shadow-blackMd outline-none
      focus:shadow-blackSm duration-200 ease-in-out transition-all bg-lime-50
      text-lime-900 data-[error=true]:bg-red-300 data-[error=true]:text-red-900
      font-body rounded-md`)
  },
  item: {
    class: clsx(`text-lime-900 h-12 w-full border-y border-y-lime-950 text-lg
    flex justify-start items-center pl-2 py-2 hover:bg-lime-300
    data-[p-focus=true]:bg-lime-300`)
  },
  panel: {
    class: clsx(`bg-lime-200 border-2 border-black translate-y-[10px] min-h-14
    rounded-md`)
  },
  loadingIcon: {
    class: clsx(`hidden`)
  },
  list: {
    class: clsx(`h-full min-h-14 flex flex-col  items-center`)
  },
  emptyMessage: {
    class: clsx(`h-full w-full flex justify-center items-center`)
  }
}

const search = (event:Event) => {
  emit('search', (event.target as HTMLInputElement).value)
}
</script>


