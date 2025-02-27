import { Request, Response } from "express";
import { catchAsync } from "../common/catchAsync";
import { AuthService } from "./auth.service";
const service = new AuthService();

export const registerUser = catchAsync(async (req: Request, res: Response) => {
  const authUser = await service.registerUser(req.body)
  res.json(authUser)
})

export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const authUser = await service.loginUser(req.body);
  res.json(authUser);
})
