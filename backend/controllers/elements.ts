import { createElementInput, deleteElementInput, updateElementInput } from "../validation-schemas/element-validation";
import { createElementHandler, deleteElement, getAllElementsHandler, getElementsHandler, updateElement } from "../services/element";
import { getAllInput, searchElementsInput } from "../validation-schemas/common";
export default class ElementsController {

  static async createElement(input: createElementInput) {
    if (input.type === 'VITAMIN') {
      const metaData = {}
      const res = await createElementHandler({ ...input, meta_data: metaData })
      return res
    }
    const pyRes = await fetch(`https://chemapi.ilyadev.com/get_formula_meta/${input.formula}`)
    const meta_data = await pyRes.json() as JSON
    const res = await createElementHandler({ ...input, meta_data })
    return res
  }

  static async getAllElements(input: getAllInput) {
    const { page, limit } = input
    const res = await getAllElementsHandler(page, limit)

    return res
  }

  static async searchElements(input: searchElementsInput) {
    const res = await getElementsHandler(
      { OR: [{ formula: { contains: input.search } }, { name: {contains: input.search} }] },
      { formula: true, id: true, name: true, component: true })
    return res
  }

  static async deleteElement(input: deleteElementInput) {
    const res = await deleteElement(input)
    return res
  }

  static async updateElement(input: updateElementInput) {
    const res = await updateElement({ id: input.id }, input, { id: true, component: true, name: true, formula: true })
    return res
  }
}
