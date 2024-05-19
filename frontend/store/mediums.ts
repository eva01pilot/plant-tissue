import type { ComponentRow } from "~/api/component";
import type { CreateMediumInput, MediumFull } from "~/api/medium";


export const useMediumStore = defineStore("mediums", ()=>{
  const {$api, $notify} = useNuxtApp()
  const mediums = ref<MediumFull[]>([])

  const fetchMediums = async()=>{
    mediums.value = (await $api.medium.getMediums()).data
  }

  return {mediums, fetchMediums}
})

export const useMediumFormStore = defineStore("medium-form", () => {
  const formValues = reactive<CreateMediumInput>({
    name: "",
    description: "",
    thumbnail: null,
    components: [{mass:"0",component: {id: null, name: ""}}],
  });

  const {$api, $notify} = useNuxtApp()


  const components = ref<ComponentRow[]>([])
  const searchComponents = async(search: string) => {
    console.log((await $api.component.searchComponents(search)).data)
    components.value = (await $api.component.searchComponents(search)).data
  }

  const createMedium = async() => {
    try {
      await $api.medium.createMedium({
        ...formValues,
        components: formValues.components.map((el)=>({component_id: el.component.id, mass:el.mass}))
      })

    } catch(e) {
      $notify('Не удалось создать среду')
    }

  }


  return { formValues, components, searchComponents, createMedium };
});
