<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'

defineSlots<{trigger():any;content():any}>()
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <slot name="content" />
    </DialogContent>
  </Dialog>
</template>
