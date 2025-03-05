import boom from '@hapi/boom';
import { NextFunction, Request, Response } from "express";

export const authorizationMiddle = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user, 'user')
    if(roles.includes(req.user.rol)) {
      return next()
    }
    throw boom.unauthorized('Usuario no autorizado')
  }
}
