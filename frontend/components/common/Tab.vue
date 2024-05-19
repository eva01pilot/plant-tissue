<template>
  <TabsRoot v-model="model">
    <TabsList class="flex flex-row gap-2 mb-10">
      <TabsTrigger v-for="tab in tabs" :value="(tab as Tab).name">
        <CommonBoxButton
          :variant="model === tab.name ? 'main' : 'secondary'"
          type="button"
          class="!shadow-none"
        >
          {{ (tab as Tab).title }}
        </CommonBoxButton>
      </TabsTrigger>
    </TabsList>
    <TabsContent v-for="tab in tabs" :value="(tab as Tab).name" class="h-full">
      <slot :name="tab.name as T['name']" />
    </TabsContent>
  </TabsRoot>
</template>

<script setup lang="ts" generic="T extends Tab">
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "radix-vue";

export interface Tab {
  name: string;
  title: string;
}

const props = defineProps<{ tabs: T[] }>();
const model = defineModel<T["name"]>({ required: true });

defineSlots<{
  [K in T["name"]]: undefined;
}>();
</script>
