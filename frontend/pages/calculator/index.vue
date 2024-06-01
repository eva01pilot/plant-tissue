<template>
  <div class="grid grid-cols-2 gap-4">
  <Calculator />
  </div>
</template>

<script setup lang="ts">
import Calculator from "@/components/calculator/Calculator.vue"
definePageMeta({
  layout: "lk-layout"
})
</script>
