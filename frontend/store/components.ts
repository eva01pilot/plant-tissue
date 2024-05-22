import { useNuxt } from "nuxt/kit"
import type { ComponentFull, ComponentRowFull, ComponentType } from "~/api/component"

export const useComponentsStore = defineStore("components", ()=>{
  const {$api, $notify} = useNuxtApp()

  const componentTypes = ref<ComponentType[]>([])
  const components = ref<ComponentFull[]>([])

  const fetchComponentTypes = async()=>{
    componentTypes.value = (await $api.component.getComponentTypes()).data
  }

  const fetchComponents = async() => {
    components.value = (await $api.component.getComponents()).data
  }

  return {componentTypes, fetchComponentTypes, components, fetchComponents}
})


