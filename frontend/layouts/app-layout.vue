<template>
  <LayoutNavbar
    class="w-full flex justify-between  py-4 px-4 md:px-20 border-b border-slate-200"
    v-if="store.user"
    :user="store.user"
    :nav-items="items"
    :user-items="userDropdownItems"
    @click="store.logOut"
  />
  <main class="flex flex-col w-full h-full-section px-4 md:px-20 py-10">
    <slot />
  </main>
</template>

<script setup lang="ts">
import { userStore } from "~/store/user";
const store = userStore();
import { BarChartIcon, ContainerIcon, Pencil1Icon } from "@radix-icons/vue";
import type { Component } from "nuxt/schema";
import type { FunctionalComponent } from "vue";
interface MenuItem {
  title: string;
  href: string;
  icon: FunctionalComponent
}

const items = ref<MenuItem[]>([]);
const userItems: MenuItem[] = [
  {
    href: "/calculator",
    title: "Калькулятор",
    icon: BarChartIcon 
  },
  {
    href: "/mediums",
    title: "Питательные среды",
    icon: ContainerIcon
  },
];

const adminItems: MenuItem[] = [
  {
    href: "/admin",
    title: "Панель администратора",
    icon: Pencil1Icon
  },
];
items.value = userItems;
if (store.user?.role === "ADMIN") {
  items.value = [...items.value, ...adminItems];
}


const userDropdownItems = ref<MenuItem[]>([]);
userDropdownItems.value = [{href: '/settings', title: 'Настройки профиля'}]
</script>
