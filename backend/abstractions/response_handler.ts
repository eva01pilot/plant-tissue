import type {Response} from 'express'
enum statusCodes {
 CREATED = 201,
 CLIENT_ERROR = 400,
 UNAUTHORIZED = 401,
 FORBIDDEN = 403,
 NOT_FOUND = 404,
}
export default class ResponseHandler {
  public static ok<T> (res: Response, dto?: T) {
    if (!!dto) {
      return dto;
    } else {
      return res;
    }
  }
  public static jsonResponse(res: Response, status:statusCodes, message: string){
    res.status(status).json({message})
  }
  public static clientError(res: Response, message?:string) {
    return ResponseHandler.jsonResponse(res, statusCodes.CLIENT_ERROR, message ?? 'Client error')
  }
  public static created(res: Response) { 
    return res.sendStatus(statusCodes.CREATED)
  }
  public static unauthorized(res: Response, message?:string) {
    return ResponseHandler.jsonResponse(res, statusCodes.UNAUTHORIZED, message ?? 'Unauthorized')
  }
  public static notFound(res: Response, message?:string) {
    return ResponseHandler.jsonResponse(res, statusCodes.NOT_FOUND, message ?? 'Not found')
  }
  
  public static forbidden(res: Response, message?: string) {
    return ResponseHandler.jsonResponse(res, statusCodes.FORBIDDEN, message ?? 'forbidden')
  }
}


