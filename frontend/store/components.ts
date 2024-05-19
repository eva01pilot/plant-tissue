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

export const useCreateComponentForm = defineStore("components-form", ()=>{
  const {$api, $notify} = useNuxtApp()
  const formValues = reactive<ComponentRowFull>({
    id:0,
    name: '',
    formula: '',
    type: null,
  })

  const componentTypes = ref<ComponentType[]>([])

  const fetchComponentTypes = async()=>{
    componentTypes.value = (await $api.component.getComponentTypes()).data
  }

  const createComponent = async() => {
    try {
      await $api.component.createComponent({
        name: formValues.name,
        formula: formValues.formula,
        type_id: formValues.type?.id ?? 1
      })

    } catch(e) {
      $notify("Произошла ошибка")
    }
  }

  return {formValues, fetchComponentTypes, componentTypes, createComponent}

})

