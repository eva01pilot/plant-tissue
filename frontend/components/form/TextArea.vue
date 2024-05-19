<template>
  <div class="relative flex flex-col gap-[2px]">
    <FormLabel :for="id" :label v-if="label"/>
    <textarea
      :type
      :autocomplete
      v-model="model"
      :data-error="!!error"
      class="border-black border-2 text-lg p-2 shadow-blackMd outline-none
      focus:shadow-blackSm duration-200 ease-in-out transition-shadow bg-lime-50
      text-lime-900 data-[error=true]:bg-red-300 data-[error=true]:text-red-900
      font-body rounded-md min-h-12 max-h-80 resize-y"
    />
    <div class="absolute bottom-0 right-2 h-12 flex justify-center items-center">
      <slot name="icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "nuxt/schema";
import type { InputHTMLAttributes } from "vue";

const model = defineModel<string>({ required: true });

defineSlots<{ icon(): any }>();

const props = defineProps<{
  type: InputHTMLAttributes["type"];
  autocomplete?: InputHTMLAttributes["autocomplete"]
  error?: string;
  id: string;
  label?:string;
}>();

</script>
