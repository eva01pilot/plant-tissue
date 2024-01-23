<template>
  <div>
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem v-for="item in navItems">
          <NuxtLink :to="item.href" :class="navigationMenuTriggerStyle() + 'flex flex-row gap-2'">
            <component :is="item.icon" class="" />
            <span class="hidden md:inline">
              {{ item.title }}
            </span>
          </NuxtLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            class="border-primary border rounded-full"
            :src="user?.avatar || '/images/girl-with-lab.png'"
            alt="Аватар"
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem v-for="item in userItems">
          <NuxtLink :to="item.href">{{ item.title }} </NuxtLink>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="emit('click')"> Выйти </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import type { User } from "../../../backend/types/user";
import type { FunctionalComponent } from "vue";

interface MenuItem {
  title: string;
  href: string;
  icon: FunctionalComponent;
}

const emit = defineEmits(["click"]);

const props = defineProps<{
  navItems: MenuItem[];
  user: User;
  userItems: MenuItem[];
}>();
</script>
