<template>
  <Tabs :default-value="tabs[0].name" @update:model-value="(e)=>emit('changeTab',e)"
    class="h-full flex flex-col" :model-value="currentTab as string">
    <TabsList>
      <TabsTrigger v-for="tab in tabs" :value="tab.name">{{ tab.title }}</TabsTrigger>
    </TabsList>
    <TabsContent class="flex flex-col overflow-auto"  v-for="tab in tabs" :value="tab.name">
      <slot :name="`content(${tab.name as T['name']})`"/>
    </TabsContent>
  </Tabs>
</template>

<script setup lang="ts" generic="T extends Tab">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export interface Tab {
  name: string;
  title: string;
}
const props = defineProps<{ tabs: T[], currentTab: T['name'] }>();
const emit = defineEmits(['changeTab'])
defineSlots<{
  [K in `content(${T['name']})`]: undefined;
}>();
</script>
