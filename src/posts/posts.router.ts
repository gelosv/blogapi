import { Router } from "express";

export const router = Router();

router.get('/', async (req, res, next) => {
  try {
    throw new Error('waax');
    res.json('algodonafsda');
    
  } catch (error) {
    next(error)
  }
})
