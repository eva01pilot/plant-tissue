<template>
  <Textarea v-bind="props" v-model="model" class="p-2 border border-primary
    rounded-md"/>
</template>

<script setup lang="ts">
import Textarea, { type TextareaProps } from 'primevue/textarea';
import type { Nullable } from 'primevue/ts-helpers';
interface Props extends /** @vue-ignore */ TextareaProps { }
const model = defineModel<Nullable<string>>()
const props = defineProps<Props>()
</script>
