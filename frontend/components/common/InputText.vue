<template>
  <InputText  v-bind="props" v-model="model" class="h-8 border-primary
  border p-2"/>
</template>

<script setup lang="ts">
import type { InputTextProps } from 'primevue/inputtext';
import type { Nullable } from 'primevue/ts-helpers';
interface Props extends /** @vue-ignore */ InputTextProps {}
const props = defineProps<Props>()
const model = defineModel<Nullable<string>>()
</script>
