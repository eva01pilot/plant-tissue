import { Schema, z } from "zod";
import { response, type Request, type Response } from "express";
import jsonWebToken from "./jwt-helper.js";
import ResponseHandler from "../abstractions/response_handler.js";

export const makeGetEndpoint = (cb: (req: Request, res: Response) => void, schema?: z.Schema) =>
  (req: Request, res: Response) => {
    if (schema) {
      const paramsResult = schema.safeParse(req.params)
      if (!paramsResult.success) {
        ResponseHandler.clientError(res, `Ошибка валидации запроса:${paramsResult.error.message}`,  )
      }
    }
    cb(req, res)
}

export const makePostEndpoint = (cb: (req: Request, res: Response) => void, schema?: z.Schema) =>
  (req: Request, res: Response) => {
    if (schema) {
      console.log(req.path)
      const paramsResult = schema.safeParse(req.body)
      if (!paramsResult.success) {
        ResponseHandler.clientError(res, `Ошибка валидации запроса:${paramsResult.error.message}`,  )
      }
    }
    cb(req, res)
}
