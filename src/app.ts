import express from 'express'
import { Router } from 'express';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit'
import { router as routerPost } from './posts/posts.router'
import { router as routerUser } from './users/user.router';
import { router as authRouter } from './auth/auth.router'
import { errorHandler } from './middleware/errorr.middle'
import './auth/strategies'
import { setupSwagger } from './swagger';

export function main() {
  const app = express();
  const router = Router();
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    legacyHeaders: false,
    handler: (_, res) => {
      res.status(429).json({
        statusCode: 429,
        message: 'too many requests'
      })
    }
  })

  app.set('port', process.env.PORT || 3000);

  app.use(express.json())
  app.use(express.urlencoded({extended: false}));
  app.use(helmet())
  app.use(limiter)

  setupSwagger(app)

  app.get('/', (req, res) => {
    res.json({
      'health': 'ok'
    })
  })

  app.use('/api', router)
  router.use('/posts', routerPost)
  router.use('/users', routerUser)
  router.use('/auth', authRouter)

  app.use(errorHandler)

  const server = app.listen(app.get('port'), () => {
    console.log('Server iniciado');
  })

  return { app, server }
}
