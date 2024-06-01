<template>
  <h1
    class="scroll-m-20 mb-10 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
  >
  Питательные среды
  </h1>
  <div class="flex flex-wrap gap-4">
    <DisplayMediumCard v-for="medium in mediums" :medium/>
  </div>
</template>

<script setup lang="ts">
import { useMediumStore } from '~/store/mediums';

const mediumStore = useMediumStore()
const { mediums } = storeToRefs(mediumStore)

onMounted(()=>{
  mediumStore.fetchMediums()
})
definePageMeta({
  layout: "lk-layout"
})
</script>
