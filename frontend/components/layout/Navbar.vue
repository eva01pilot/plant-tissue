<template>
  <div
    class="flex flex-col items-center justify-center @2xs:items-start p-2
    rounded-xl gap-4 @container !bg-lime-50
    @2xs:pl-4 pt-4 bg-transparent h-full @2xs:justify-start">
    <NuxtLink
      :to="item.link"
      v-for="item in items"
      class="@2xs:grid @2xs:grid-cols-[24px_1fr] flex justify-center items-center gap-2 hover:text-lime-800
      text-rose-500 @2xs:rounded-none
      rounded-full bg-lime-300 hover:bg-lime-400 @2xs:duration-0 duration-200 ease-in @2xs:!bg-transparent
      @2xs:h-auto @2xs:w-auto w-12 h-12 shadow-blackMd border-black border-2
      @2xs:!shadow-none @2xs:border-none hover:shadow-blackSm"
    >
      <component :is="item.icon" class="@2xs:!w-6 @2xs:!h-6 !w-6 !h-6" />
      <span class="hidden @2xs:block">{{ item.label }}</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import {
  IconsBeaker,
  IconsCalculator,
  IconsCliAdmin,
  IconsMedium,
  IconsUser,
} from "#components";

const items = [
  {
    name: "calculator",
    label: "Калькулятор",
    icon: IconsCalculator,
    link: "/calculator",
  },
  {
    name: "components",
    label: "Компоненты",
    icon: IconsBeaker,
    link: "/components",
  },
  {
    name: "mediums",
    label: "Питательные среды",
    icon: IconsMedium,
    link: "/mediums",
  },
  {
    name: "admin",
    label: "Панель администратора",
    icon: IconsCliAdmin,
    link: "/admin",
  },
  {
    name: "user",
    label: "Профиль",
    icon: IconsUser,
    link: "/user",
  },
] as const;
</script>
