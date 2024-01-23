import { Prisma } from "@prisma/client";
import prisma from "../prisma/prisma-client";
import { createMediumInput } from "../validation-schemas/medium-validation";

export const createMediumHandler = async(input: createMediumInput) => {
  return (await prisma.growthMedium.create({
    data: {
      ...input,
      components: {
          createMany:{
            data: input.components.map(({element_id,mg_per_liter,concentration})=>({
              concentration,
              element_id,
              mg_per_liter,
          })) 
          }           
      }
    }
  }))
}

export const getMediumsHandler = async(
    where: Partial<Prisma.GrowthMediumWhereInput>,
    select: Partial<Prisma.GrowthMediumSelect>
) => {
  return (await prisma.growthMedium.findMany({
    where, select
  }))
}

export const getAllMediumsHandler = async(page:number, limit: number) => {
  const take = limit || 10
  const skip = (page-1) * limit
  return (await prisma.growthMedium.findMany({
    include: {
      components:true,
    },
    skip,
    take
  }))
}

export const findUniqueMedium = async (
    where: Prisma.GrowthMediumWhereUniqueInput,
    select: Prisma.GrowthMediumSelect
) => {
  return (await prisma.growthMedium.findUnique({
    where, 
    select
  }))
}

export const updateGrowthMedium = async (
  where: Prisma.GrowthMediumWhereUniqueInput,
  data: Prisma.GrowthMediumUpdateInput,
  select: Prisma.GrowthMediumSelect
) => {
  return (await prisma.growthMedium.update({where,data,select}))
}

export const deleteGrowthMedium = async (
  where: Prisma.GrowthMediumWhereUniqueInput,
) => {
  return (await prisma.growthMedium.delete({where}))
}
