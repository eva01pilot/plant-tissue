import { createElementInput,  deleteElementInput,  updateElementInput  } from "../validation-schemas/element-validation";
import { createElementHandler, deleteElement, getAllElementsHandler, updateElement } from "../services/element";
import { getAllInput } from "../validation-schemas/common";

export default class ElementsController {
  
  static async createElement(input: createElementInput) {  
    const res = await createElementHandler(input)
    return res 
  }

  static async getAllElements(input: getAllInput) {
    const {page, limit} = input
    const res = await getAllElementsHandler(page, limit)
    return res
  }

  static async deleteElement(input: deleteElementInput) {
    const res = await deleteElement(input)
    return res
  }

  static async updateElement(input: updateElementInput) {
    const res = await updateElement({id: input.id}, input,{id:true,component:true,name:true,formula:true})
    return res
  }
}
