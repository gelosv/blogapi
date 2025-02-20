import express from 'express'
import { Router } from 'express';
import { router as routerPost } from './posts/posts.router'

export function main() {
  const app = express();
  const router = Router();

  app.set('port', process.env.PORT || 3000);

  app.use(express.json())
  app.use(express.urlencoded({extended: false}));

  const routerBase = app.use('/api', router)
  routerBase.use('/api/posts', routerPost)

  app.get('/', (req, res) => {
    res.json('SIUUUU');
  })

  app.listen(app.get('port'), () => {
    console.log('Server iniciado');
  })
}

