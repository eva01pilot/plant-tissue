<template>
  <div class="grid grid-cols-1 md:grid-cols-2 h-full-section">
    <div class="flex justify-center  flex-col">
      <Label for="select-medium">Выберите питательную среду</Label>
      <UiSelect id="select-medium" :default-value="mediums[0]?.name ?? ''">
        <UiSelectTrigger>
          <UiSelectValue />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem v-for="medium in mediums" :value="String(medium.id)">
            {{ medium.name }}
          </UiSelectItem>
        </UiSelectContent>
      </UiSelect>
      <div class="flex flex-row items-center">
        <UiSeparator class="my-5 w-1/2 shrink" orientation="horizontal" />
          <span class="mx-4">И</span>
        <UiSeparator class="my-5 w-1/2 shrink" orientation="horizontal" />
      </div>
      <Label for="select-medium">Выберите объём питательной среды</Label>
      <UiInput type="number" @change="setVolume" :model-value="volume" />
      <UiButton variant="default" class="mt-10 self-end w-1/2">Рассчитать</UiButton>
    </div>
  </div>
  <div>

  </div>
</template>

<script setup lang="ts">
import { mediumsStore } from "~/store/mediums";
import type { VueEvent } from "@/lib/utility_types";
import Label from "~/components/ui/label/Label.vue";
const medStore = mediumsStore();
const fetchMediums = medStore.getAllMediums;
await fetchMediums();
const mediums = medStore.getMediums;

const volume = ref<number>(0);
const setVolume = (e: VueEvent<HTMLInputElement>) => {
  volume.value = +e.target.value;
};
definePageMeta({
  layout: "app-layout",
});
</script>
