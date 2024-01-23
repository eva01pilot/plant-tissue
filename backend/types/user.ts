import {Prisma} from '@prisma/client'
import UserController from '../controllers/user'
import { inferAsyncReturnType } from '@trpc/server'
export type User = inferAsyncReturnType<typeof UserController.getMe> 

