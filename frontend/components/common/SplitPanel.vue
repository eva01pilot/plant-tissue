<template>
  <SplitterPanel
    ref="panelRef"
    class="p-16 bg-rose-50 rounded-xl relative @container flex justify-center
    items-center"
    :id
    :min-size="20"
    :collapsed-size="5"
    collapsible
  >
    <div class="@xs:flex hidden">
      <slot name="content" />
    </div>
    <button class="@xs:hidden flex" @click="panelRef?.expand()">
      Раскрыть панель
    </button>
  </SplitterPanel>
</template>

<script setup lang="ts">
import { IconsClose } from "#components";
import { SplitterPanel } from "radix-vue";

defineProps<{ id: string }>();
const emit = defineEmits<{ close: [] }>();

const panelRef = ref<InstanceType<typeof SplitterPanel>>()
defineExpose({
  expand: panelRef.value?.expand,
  collapse: panelRef.value?.collapse
})
</script>
