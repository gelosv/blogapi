import { Boom } from "@hapi/boom";
import {  NextFunction, Request, Response } from "express";

export const errorHandler = (err: Boom, req: Request, res: Response, next: NextFunction) => {
  const payload = err.isBoom ? err.output.payload : {statusCode: 500, error: 'Server error', message: 'Failed'}
  res.status(payload.statusCode).json(payload)
  next()
}