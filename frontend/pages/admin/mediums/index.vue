<template>
  <div class="pt-8 grid 2xl:grid-cols-2 gap-16">
    <div>
      <h1 class="scroll-m-20 text-lg font-extrabold tracking-tight lg:text-xl
        mb-4">
        Создать питательную среду
      </h1>
      <AdminCreateMediumForm />
    </div>
    <div v-if="medium?.name">
      <h1 class="scroll-m-20 text-lg font-extrabold tracking-tight lg:text-xl
        mb-4">
        Превью
      </h1>
      <div class="flex justify-center items-center">
        <DisplayMediumCard class="h-fit"  :medium />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import { useMediumFormStore } from "~/store/mediums";

const mediumFormStore = useMediumFormStore();
const { medium } = storeToRefs(mediumFormStore);
definePageMeta({
  layout: "lk-layout",
});
</script>
