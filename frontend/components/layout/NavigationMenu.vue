<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NuxtLink to="/calculator" :class="navigationMenuTriggerStyle()">
          <NavigationMenuLink>Калькулятор</NavigationMenuLink>
        </NuxtLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NuxtLink to="/mediums" :class="navigationMenuTriggerStyle()">
          <NavigationMenuLink>Питательные среды</NavigationMenuLink>
        </NuxtLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NuxtLink to="/components" :class="navigationMenuTriggerStyle()">
          <NavigationMenuLink>Компоненты питательных сред</NavigationMenuLink>
        </NuxtLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger :class="navigationMenuTriggerStyle()">
            Панель администратора
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Разделы</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <NuxtLink to="/admin/mediums">
                <NavigationMenuLink>Питательные среды</NavigationMenuLink>
              </NuxtLink>
            </DropdownMenuItem>
            <DropdownMenuItem >
              <NuxtLink to="/admin/components" >
                <NavigationMenuLink>Компоненты питательных сред</NavigationMenuLink>
              </NuxtLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>

<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
</script>
