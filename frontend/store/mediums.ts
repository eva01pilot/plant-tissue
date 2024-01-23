import { useNuxtApp } from "nuxt/app";
import type { AppRouter } from "../../backend";
import type { inferRouterOutputs } from "@trpc/server";
import * as z from "zod";
type RouterOutput = inferRouterOutputs<AppRouter>;
export interface Component {
  mg_per_liter: number;
  concentration: number;
  element_id: number;
}

export type Medium = RouterOutput["medium"]["getAllMediums"][number];
export const schema = z.object({
  name: z.string(),
  description: z.string(),
  components: z.array(
    z.object({
      mg_per_liter: z.number(),
      concentration: z.number(),
      element_id: z.string(),
    }),
  ),
});
export const mediumsStore = defineStore("mediums", () => {
  const mediums = ref<Medium[]>([]);
  const { $trpc } = useNuxtApp();
  const getMediums = computed(() => mediums.value);
  async function getAllMediums() {
    const res = await $trpc.medium.getAllMediums.query({
      page: 1,
      limit: 10000,
    });
    mediums.value = res;
  }

  async function addMedium(medium: z.infer<typeof schema>) {
    await $trpc.medium.createMedium.mutate({
      ...medium,
      components: medium.components.map((comp) => ({
        ...comp,
        element_id: parseInt(comp.element_id),
      })),
    });

    await getAllMediums();
  }

  async function deleteMedium(medium: Medium) {
    if (!medium.id) return;
    await $trpc.medium.deleteMedium.mutate({ medium_id: medium.id });
    await getAllMediums();
  }
  return { mediums, getAllMediums, addMedium, getMediums, deleteMedium };
});
