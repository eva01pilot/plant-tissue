import { computedAsync } from "@vueuse/core";
import type { Component } from "vue";
import type { ComponentRow } from "~/api/component";
import type { CreateMediumInput, MediumFull } from "~/api/medium";
import { toBase64 } from "~/lib/helpers/dataurl-to-file";

export const useMediumStore = defineStore("mediums", () => {
  const { $api, $notify } = useNuxtApp();
  const mediums = ref<MediumFull[]>([]);

  const fetchMediums = async () => {
    mediums.value = (await $api.medium.getMediums()).data;
  };

  return { mediums, fetchMediums };
});

export const useMediumFormStore = defineStore("medium-form", () => {
  const formValues = reactive<CreateMediumInput>({
    name: "",
    description: "",
    thumbnail: null,
    components: [{ mg_per_liter: "0", component: { id: null, component_formula: "",type_id:0, component_molar_mass: 0 } }],
  });

  const { $api, $notify } = useNuxtApp();

  const components = ref<ComponentRow[]>([]);
  const searchComponents = async (search: string) => {
    console.log((await $api.component.searchComponents()).data);
    components.value = (await $api.component.searchComponents()).data;
  };

  const medium = computedAsync<MediumFull>(async()=>{
    return {
      thumbnail: formValues.thumbnail ? await toBase64(formValues.thumbnail) : "",
      description: formValues.description,
      name: formValues.name,
      components: formValues.components,
      id: 0
    }
  })

  const createMedium = async () => {
    try {
      await $api.medium.createMedium({
        ...formValues,
        components: formValues.components.map((el) => ({
          component_id: el.component.id,
          mg_per_liter: el.mg_per_liter,
        })),
      });
      formValues.name = ""
      formValues.description = ""
      formValues.thumbnail = null
      formValues.components = [{mg_per_liter: "0", component: {id:null, component_formula: "", type_id: 0, component_molar_mass: 0}}]
    } catch (e) {
      $notify("Не удалось создать среду");
    }
  };

  return { formValues, components, searchComponents, createMedium, medium };
});
