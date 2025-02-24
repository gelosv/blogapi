import express from 'express'
import { Router } from 'express';
import { router as routerPost } from './posts/posts.router'
import { router as routerUser } from './users/user.router';
import { errorHandler } from './middleware/errorr.middle'

export function main() {
  const app = express();
  const router = Router();

  app.set('port', process.env.PORT || 3000);

  app.use(express.json())
  app.use(express.urlencoded({extended: false}));

  app.use('/api', router)
  router.use('/posts', routerPost)
  router.use('/users', routerUser)

  app.get('/', (req, res) => {
    res.json('SIUUUU');
  })

  app.use(errorHandler)

  app.listen(app.get('port'), () => {
    console.log('Server iniciado');
  })
}

