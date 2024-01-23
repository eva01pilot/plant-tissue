import MediumController from '../controllers/mediums'
import {adminProtectedProcedure, userProtectedProcedure} from '../trpc'
import { t } from '../trpc'
import { getAllSchema } from '../validation-schemas/common'
import { createMediumSchema, deleteMediumSchema, updateMediumSchema } from '../validation-schemas/medium-validation'

export const mediumsRouter = t.router({
  createMedium: adminProtectedProcedure
    .input(createMediumSchema)
    .mutation(({input})=> MediumController.createMedium(input)),
  getAllMediums: userProtectedProcedure
    .input(getAllSchema)
    .query(({input})=>MediumController.getAllMediums(input)),
  deleteMedium: adminProtectedProcedure
    .input(deleteMediumSchema)
    .mutation(({input})=>MediumController.deleteMedium(input)),
  updateMedium: adminProtectedProcedure
    .input(updateMediumSchema)
    .mutation(({input})=>MediumController.updateMedium(input)),
})
