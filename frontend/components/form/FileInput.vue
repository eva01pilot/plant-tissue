<template>
  <div class="relative flex flex-col gap-[2px]">
    <FormLabel :for="id" :label v-if="label"/>
    <div class="p-2 rounded-md bg-lime-50 text-lime-900 border-2 border-black
      flex justify-between flex-row gap-4">
      <div class="overflow-hidden text-ellipsis shrink cursor-pointer font-body">
        {{model?.name ?? "нет файла"}}
      </div>
      <CommonBoxButton variant="secondary" type="button"
      @click="fileInput.click()" class="h-8 !shadow-none fit-content
      whitespace-nowrap grow max-w-64">
        Загрузить файл
      </CommonBoxButton>
    </div>
    <input
      accept=".jpg,.png"
      type="file"
      @change="upload"
      ref="fileInput"
      :autocomplete
      :data-error="!!error"
      class="hidden"
    />
  </div>
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from "vue";
import { targetIsFileInput } from "~/lib/types/guards";

const model = defineModel<File|null>({ required: true });
const fileInput = ref<HTMLInputElement>(null!)

const upload = (e:Event) => {
  if(!targetIsFileInput<HTMLInputElement>(e)){
    return
  }
  if(!e.target.files) return
  const file = Array.from(e.target.files)[0]
  model.value = file
}



const props = defineProps<{
  autocomplete?: InputHTMLAttributes["autocomplete"]
  error?: string;
  id: string;
  label?:string;
}>();

</script>
