import type { AppRouter } from "../../backend";
import type { inferRouterOutputs } from "@trpc/server";


type RouterOutput = inferRouterOutputs<AppRouter>;

export type MediumTable = RouterOutput['medium']['getAllMediums'][number]

export type MediumComponentTable = RouterOutput['medium']['getAllMediums'][number]['components'][number]

