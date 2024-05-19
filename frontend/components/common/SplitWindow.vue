<template>
  <SplitterGroup
    v-if="windows.length <= 2"
    id="splitter-group-1"
    direction="horizontal"
    class="relative"
  >
    <template v-for="(win, idx) in windows">
      <CommonSplitPanel
        :ref="idx===0 ? 'leftPanel' : 'rightPanel'"
        :id="`splitter-group-1-panel-${idx}`"
        @close="emit('close', win.name)"
      >
      <template #content>
        <slot :name="`window(${win.name as T['name']})`" />
      </template>
      </CommonSplitPanel>
      <SplitterResizeHandle
        :id="`splitter-group-1-resize-handle-${idx}`"
        v-if="idx === 0"
        class="w-1 bg-transparent"
      />
    </template>
  </SplitterGroup>
  <SplitterGroup
    v-else
    id="splitter-group-1"
    direction="horizontal"
    class="gap-1"
  >
    <SplitterPanel
      :min-size="20"
      :id="`splitter-group-1-panel-0`"
      ref="leftPanel"
      class="flex items-center justify-center bg-transparent rounded-xl"
    >
      <SplitterGroup class="gap-1" id="splitter-group-11" direction="vertical">
        <CommonSplitPanel
          id="splitter-group-11-panel-0"
          @close="emit('close', windows[0].name)"
        >
          <template #content>
            <slot :name="`window(${windows[0].name as T['name']})`" />
          </template>
        </CommonSplitPanel>
        <SplitterResizeHandle
          :id="`splitter-group-11-resize-handle-0`"
          class="bg-transparent"
        />
        <CommonSplitPanel
          id="splitter-group-11-panel-1"
          @close="emit('close', windows[1].name)"
        >
          <template #content>
            <slot :name="`window(${windows[1].name as T['name']})`" />
          </template>
        </CommonSplitPanel>
      </SplitterGroup>
    </SplitterPanel>
    <SplitterResizeHandle :id="`splitter-group-1-resize-handle`" />
    <SplitterPanel
      :id="`splitter-group-1-panel-1`"
      ref="rightPanel"
      :min-size="20"
      class="flex items-center justify-center rounded-xl"
    >
      <SplitterGroup id="splitter-group-12" class="gap-1" direction="vertical">
        <template v-for="(win, idx) in windows.slice(2, 4)">
          <CommonSplitPanel
            :id="`splitter-group-12-panel-${idx}`"
            @close="emit('close', win.name)"
          >
            <template #content>
              <slot :name="`window(${win.name as T['name']})`" />
            </template>
          </CommonSplitPanel>
          <SplitterResizeHandle
            :id="`splitter-group-12-resize-handle`"
            v-if="idx === 0"
          />
        </template>
      </SplitterGroup>
    </SplitterPanel>
  </SplitterGroup>
</template>

<script setup lang="tsx" generic="T extends WindowPanel">
import { CommonSplitPanel } from "#components";
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from "radix-vue";

export interface WindowPanel {
  name: string;
  title: string;
}

const emit = defineEmits<{ close: [T["name"]] }>();
defineProps<{
  windows: T[];
}>();
defineSlots<{
  [K in `window(${T["name"]})`]: undefined;
}>();
</script>
