<template>
  <label :for class="font-display text-sm font-semibold">
    {{label }}
  </label>
</template>

<script setup lang="ts">
import  { useSignupStore } from '~/store/sign_up';

const ss = useSignupStore()
const {login} = storeToRefs(ss)
defineProps<{
  for: string;
  label: string;
}>()
</script>
