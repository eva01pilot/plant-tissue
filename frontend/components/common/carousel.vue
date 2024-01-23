<template>
  <Carousel class="flex flex-col">
    <slide v-for="slide in slides" :key="slide.name">
      <slot :name="`slide(${slide.name as T['name']})` " />
    </slide>
     <template #addons>
      <Pagination />
    </template>
  </Carousel> 
</template>

<script setup lang="ts" generic="T extends Slide">
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import 'vue3-carousel/dist/carousel.css'

export interface Slide {
  title: string,
  name: string
}
const props = defineProps<{
  slides: T[],
}>()
defineSlots<{
  [K in `slide(${T['name']})`]: undefined;
}>();
</script>
