import {
  createMediumInput,
  deleteMediumInput,
  getMediumInput,
  updateMediumInput,
} from "../validation-schemas/medium-validation";
import {
  createMediumHandler,
  deleteGrowthMedium,
  getAllMediumsHandler,
  getMediumsHandler,
  updateGrowthMedium,
} from "../services/medium";
import { getAllInput } from "../validation-schemas/common";
import ElementsController from "./elements";

export default class MediumController {
  static async createMedium(input: createMediumInput) {
    const res = await createMediumHandler(input);
    return res;
  }

  static async getMedium(input: getMediumInput) {
    const mediums = await getMediumsHandler(
      { id: input.medium_id },
      { id: true, name: true, components: true, description: true },
    );
    return mediums;
  }

  static async updateMedium(input: updateMediumInput) {
    const response = await updateGrowthMedium(
      { id: input.id },
      {
        ...input,
        components: {
          connectOrCreate: input.components.map(
            ({ id, element_id, mg_per_liter, concentration }) => {
              return {
                create: {
                  mg_per_liter,
                  concentration,
                  element_id,
                },
                where: {
                  id: id,
                },
              };
            },
          ),
        },
      },
      { components: true, id: true, description: true, name: true },
    );

    return response;
  }

  static async deleteMedium(input: deleteMediumInput) {
    const response = await deleteGrowthMedium({ id: input.medium_id });
    return response;
  }

  static async getAllMediums(input: getAllInput) {
    const response = await getAllMediumsHandler(input.page, input.limit);
    const elements = await ElementsController.getAllElements({
      page: 1,
      limit: 10000,
    });
    console.log(elements)
    const res = response.map((medium) => ({
      ...medium,
      components: medium.components.map((comp) => ({
        ...comp,
        element: elements.find((el) => el.id === comp.element_id),
      })),
    }));
    return res;
  }
}
