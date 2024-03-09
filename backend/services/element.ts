import { Prisma } from "@prisma/client";
import prisma from "../prisma/prisma-client";
import { createElementInput, createElementWithMetaDataInput } from "../validation-schemas/element-validation";

export const createElementHandler = async(input: createElementWithMetaDataInput) => {
  return (await prisma.chem_Element.create({data: input}))
}


export const getElementsHandler = async(
    where: Partial<Prisma.Chem_ElementWhereInput>,
    select: Partial<Prisma.Chem_ElementSelect>
) => {
  return (await prisma.chem_Element.findMany({
    where, select
  }))
}

export const getAllElementsHandler = async(page:number, limit: number) => {
  const take = limit || 10
  const skip = (page-1) * limit
  console.log(take, skip)
  return (await prisma.chem_Element.findMany({
    skip,
    take
  }))
}

export const findUniqueElement = async (
    where: Prisma.Chem_ElementWhereUniqueInput,
    select: Prisma.Chem_ElementSelect
) => {
  return (await prisma.chem_Element.findUnique({
    where,
    select
  }))
}

export const updateElement = async (
  where: Prisma.Chem_ElementWhereUniqueInput,
  data: Prisma.Chem_ElementUpdateInput,
  select: Prisma.Chem_ElementSelect
) => {
  return (await prisma.chem_Element.update({where,data,select}))
}

export const deleteElement = async (
  where: Prisma.Chem_ElementWhereUniqueInput,
) => {
  return (await prisma.chem_Element.delete({where}))
}
