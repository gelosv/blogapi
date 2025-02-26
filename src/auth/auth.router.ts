import { Router } from "express";
import { AuthService } from "./auth.service";
import passport from "passport";

export const router = Router()
const service = new AuthService();

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});

router.post('/register', async (req, res, next) => {
  try {
    const authUser = await service.registerUser(req.body)
    res.json(authUser)
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const authUser = await service.loginUser(req.body);
    res.json(authUser);
  } catch (error) {
    next(error)
  }
})
