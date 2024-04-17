<template>
  <NuxtLink to="/admin" class="h-fit block mb-5">
    <Button label="Назад" icon="pi pi-arrow-left" />
  </NuxtLink>
  <Panel
    class="h-full p-4"
    :pt="{
      toggleableContent: { class: 'h-full' },
      content: {
        class: `h-full flex
    flex-col gap-4`,
      },
      header: { class: 'hidden' },
    }"
  >
    <div class="grid grid-cols-2 h-full">
      <div class="flex justify-center items-center">
        <AdminCreateComponentForm class="overflow-auto p-4" />
      </div>
      <DisplayComponentTable :components="elements" class="h-full" />
    </div>
  </Panel>
</template>

<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";
import { elementsStore } from "~/store/elements";

const { elements } = storeToRefs(elementsStore());

const items: MenuItem[] = [
  {
    label: "Форма",
  },
  {
    label: "Список",
  },
];
definePageMeta({
  layout: "app-layout",
});
</script>
