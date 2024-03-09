import {adminProtectedProcedure, userProtectedProcedure} from '../trpc'
import {createElementSchema, deleteElementSchema, updateElementSchema} from '../validation-schemas/element-validation'
import ElementsController from '../controllers/elements'
import { getAllSchema, searchElementsSchema } from '../validation-schemas/common'
import { t } from '../trpc'

export const elementsRouter = t.router({
  createElement: adminProtectedProcedure
    .input(createElementSchema)
    .mutation(({input})=> ElementsController.createElement(input)),
  getAllElements: userProtectedProcedure
    .input(getAllSchema)
    .query(({input})=>ElementsController.getAllElements(input)),
  deleteElement:  adminProtectedProcedure
    .input(deleteElementSchema)
    .mutation(({input})=>ElementsController.deleteElement(input)),
  updateElement: adminProtectedProcedure
    .input(updateElementSchema)
    .mutation(({input})=>ElementsController.updateElement(input)),
  searchElement: userProtectedProcedure
    .input(searchElementsSchema)
    .query(({input})=>ElementsController.searchElements(input))
})
