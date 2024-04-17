<template>
  <Menubar :model>
    <template #item="{ item, label, props }">
      <div class="p-2 flex flex-row items-center gap-2">
        <NuxtLink :to="item.route">
          {{ item.label }}
        </NuxtLink>
        <span :class="item.icon" />
      </div>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
import Menubar from 'primevue/menubar';
import type { MenuItem } from 'primevue/menuitem';
import { PrimeIcons } from 'primevue/api';
interface MenuItemRouter extends MenuItem {
  route: string
}
const model: MenuItemRouter[] = [{
  route: '/',
  icon: PrimeIcons.CHART_BAR,
  label: 'Калькулятор',
}, {
  route: '/mediums',
  icon: PrimeIcons.TABLE,
  label: 'Питательные среды',
}, {
  route: '/admin',
  icon: PrimeIcons.WRENCH,
  label: 'Панель администратора'
}]
</script>
