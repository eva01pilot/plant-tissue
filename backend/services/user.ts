
import { Prisma } from "@prisma/client";
import prisma from "../prisma/prisma-client";
import { signUpInput } from "../validation-schemas/auth-validation";

export const createUserHandler = async(input: Prisma.UserCreateInput) => {
  return (await prisma.user.create({
    data: {
      ...input
    },
  }))
}

export const getUsersHandler = async(
    where: Partial<Prisma.UserWhereInput>,
    select: Partial<Prisma.UserSelect>
) => {
  return (await prisma.user.findMany({
    where, 
    select: {
      ...select,
    }
  }))
}

export const getAllUsersHandler = async(page:number, limit: number) => {
  const take = limit || 10
  const skip = (page-1) * limit
  return (await prisma.user.findMany({
    skip,
    take,
    select: {
      password_hash: false
    }
  }))
}

export const findUniqueUser = async (
    where: Prisma.UserWhereUniqueInput,
    select: Prisma.UserSelect
) => {
  return (await prisma.user.findUnique({
    where, 
    select: {
      ...select,
      password_hash: false
    }
  }))
}

export const updateUser = async (
  where: Prisma.UserWhereUniqueInput,
  data: Prisma.UserUpdateInput,
  select: Prisma.UserSelect
) => {
  return (await prisma.user.update({where,data,select}))
}

export const deleteUser = async (
  where: Prisma.UserWhereUniqueInput,
) => {
  return (await prisma.user.delete({where}))
}
