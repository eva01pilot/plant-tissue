<template>
  <Cropper :src />

</template>

<script setup lang="ts">
import { Cropper } from 'vue-advanced-cropper'
defineProps<{
  src:string
}>()
</script>
