<template>
  <NuxtLink to="/admin" class="h-fit block mb-5">
    <Button label="Назад" icon="pi pi-arrow-left" />
  </NuxtLink>
  <Panel class="h-full p-4" :pt="{
    toggleableContent: { class: 'h-full' }, content: {
      class: `h-full flex
    flex-col gap-4` }, header:
      { class: 'hidden' }
  }">
    <TabMenu v-model:activeIndex="active" :model="items" class="h-full
    flex-grow flex-shrink-0 flex-[fit-content]" />
    <div class="flex flex-grow overflow-hidden">
      <AdminCreateMediumForm v-show="active === 0" class="overflow-auto p-4" />
      <ScrollPanel v-show="active === 1" class="flex-grow">
        <div class="flex flex-row flex-wrap gap-4 flex-grow justify-center
          md:justify-start">
          <DisplayMediumCard @delete="medStore.deleteMedium" class="w-80 md:w-96" v-for="medium in mediums"
            :medium="medium" />
        </div>
      </ScrollPanel>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import { PrimeIcons } from 'primevue/api';
import type { MenuItem } from 'primevue/menuitem';
import TabMenu from 'primevue/tabmenu';
import Panel from 'primevue/panel';
import { mediumsStore } from '~/store/mediums';
const medStore = mediumsStore()
const { mediums } = storeToRefs(medStore)
onMounted(async () => {
  await medStore.getAllMediums()
})

definePageMeta({
  layout: 'app-layout'
})

const active = ref(0)
const items: MenuItem[] = [{
  label: 'Форма',
}, {
  label: 'Список'
}]
</script>
