<template>
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
