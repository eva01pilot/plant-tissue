<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { MediumFull } from '~/api/medium';

const props = defineProps<{
  medium: MediumFull
}>()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-lg">{{medium.name}}</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-2 gap-4">
        <img :src="medium.thumbnail" class="w-full h-full object-cover border
        shadow-inner" />
        <div>
          <CardTitle class="mb-2">Описание</CardTitle>
          <CardDescription>{{medium.description}}</CardDescription>
        </div>
      </div>
    </CardContent>
    <CardFooter>
    <MiscPopup>
      <template #trigger>
        <UIButton>
          Открыть таблицу компонентов
        </UIButton>
      </template>
      <template #content>
        hello hi hello
      </template>
    </MiscPopup>
    </CardFooter>
  </Card>
</template>
