import { Router } from "express";
import passport from "passport";
import { loginUser, registerUser } from "./auth.controller";
import { validatorSchema } from "../middleware/validator.middle";
import { userLoginSchema, userRegisterSchema } from "./validators/auth.validator";

export const router = Router()

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});

router.post('/register', validatorSchema('body', userRegisterSchema), registerUser)

router.post('/login', validatorSchema('body', userLoginSchema), loginUser)
