import { NextFunction, Response } from "express"

export function catchAsync<T>(fn: (req: T, res: Response) => Promise<void>) {
  return (req: T, res: Response, next: NextFunction) => {
    fn(req, res).catch(err => next(err))
  }
}
