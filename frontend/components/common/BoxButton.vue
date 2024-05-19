<template>
  <button :type :disabled :class="clsx(`font-body border-2 border-black shadow-blackMd h-12
    p-2 font-medium duration-300 rounded-md hover:shadow-blackSm inline-flex
    justify-center items-center `, variants[variant])">
    <slot />
  </button>
</template>

<script setup lang="ts">
import clsx from "clsx"
import type { ButtonHTMLAttributes } from "vue";
const variants = {
  main: clsx(`bg-lime-200 text-lime-900 hover:bg-lime-400 hover:text-lime-950 disabled:bg-lime-50`),
  secondary: clsx(`bg-rose-200 text-rose-900 hover:bg-rose-400
  hover:text-rose-100 disabled:bg-rose-50`)
} as const

defineProps<{
  variant: keyof typeof variants
  type: ButtonHTMLAttributes["type"]
  disabled?: boolean
}>()
</script>
