<template>
  <SplitterGroup id="splitter-group-1" direction="horizontal" >
    <SplitterPanel
      id="splitter-group-1-panel-1"
      :min-size="5"
      :max-size="5"
      :collapsed-size="5"
      collapsible
      class="@container bg-rose-900  h-screen py-2 pl-2"
    >
    <LayoutNavbar />
    </SplitterPanel>
    <SplitterResizeHandle id="splitter-group-1-resize-handle-1"
    class="bg-transparent hidden" />
    <SplitterPanel id="splitter-group-1-panel-2">
      <SplitterGroup id="splitter-group-2" direction="vertical">
        <SplitterPanel id="splitter-group-2-panel-1" class="bg-rose-900 p-2">
        <div class="bg-lime-300 h-full rounded-xl p-8 overflow-scroll">
          <slot />
        </div>
        </SplitterPanel>
      </SplitterGroup>
    </SplitterPanel>
  </SplitterGroup>
</template>

<script setup lang="ts">
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from "radix-vue";
</script>
