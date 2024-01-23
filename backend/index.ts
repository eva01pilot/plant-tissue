import * as trpcExpress from '@trpc/server/adapters/express';
import { t,createContext } from './trpc';
import express from 'express'
import { authRouter } from './routers/auth';
import { userRouter } from './routers/user';
import { mediumsRouter } from './routers/mediums';
import { elementsRouter } from './routers/elements';
import cors from 'cors'
import cookieParser from "cookie-parser";
export const appRouter = t.router({
  auth: authRouter,
  user: userRouter,
  medium: mediumsRouter,
  element: elementsRouter,
});

export type AppRouter = typeof appRouter;

export const router = t.router;
export const publicProcedure = t.procedure;
const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true
}
const app = express();
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);
app.listen(3000);
console.log('server running')
