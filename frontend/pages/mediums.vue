<template>
  <h1 class="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight ">Питательные среды</h1>
  <div class="grid gap-4 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
    <CommonMediumCard
      v-for="medium in getMediums"
      :medium="medium"
      :deletable="false"
      :component-data="medium.components"
    />
  </div>
</template>

<script setup lang="ts">
import { mediumsStore } from "~/store/mediums";
const medStore = mediumsStore();
const fetchMediums = medStore.getAllMediums;
await fetchMediums();
const getMediums = medStore.getMediums;
definePageMeta({
  layout: "app-layout",
});
</script>
