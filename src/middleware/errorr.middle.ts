import {  NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message, 'error :(');
  res.json({
    error: err.message,
    message: 'pipipi'
  })
  next()
}