import { Router } from "express";
import { getCommentsPost, getPostById, getPosts, getPostUser } from "./posts.controller";
import { PostService } from './posts.service';
import { Post } from "./interfaces/post-create.interface";
import { validatorSchema } from "./../middleware/validator.middle";
import { createPostSchema, PaginationDto, paginationPostSchema, postIdDto, postIdSchema, writerIdSchema } from "./schemas/post.validator";
import passport from "passport";
import { authorizationMiddle } from "../middleware/authorization.middle";

const service = new PostService();
export const router = Router();

/**
 * @swagger
 * /api/posts:
 *   post:
 *     tags: [Posts]
 *     consumes:
 *       - application/json
 *     summary: Crear un post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        description: Datos del post
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                image:
 *                  type: string
 *                content:
 *                  type: string
 *                categorieId:
 *                  type: number
 *     responses:
 *        200:
 *          description: Post creado
 *        400:
 *          description: Error de validacion
 *        401:
 *          description: No autorizado
 *        404:
 *          description: Categoria no encontrada
 */
router.post('/', validatorSchema<unknown, Post, unknown>('body', createPostSchema), passport.authenticate('jwt', { session: false }), authorizationMiddle('WRITER'), async (req, res, next) => {
  try {
    console.log(req.user, 'user')
    const userId = req.user.sub ?? null
    const postData: Post = {
      ...req.body,
      writerId: userId
    }
    const post = await service.createPost(postData);
    res.json(post);
  } catch (error) {
    next(error)
  }
})

/**
 * @swagger
 * /api/posts/comments/{id}:
 *   get:
 *     tags: [Posts]
 *     produces:
 *       - application/json
 *     summary: Obtener los comentarios de un post
 *     parameters:
 *     - in: path
 *       name: id
 *       type: number
 *       required: true
 *     responses:
 *       200:
 *         description: Lista de comentarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   content:
 *                     type: string
 *                     example: Contenido del comentario
 *                   userId:
 *                     type: number
 *                     example: 1
 *                   postId:
 *                     type: number
 *                     example: 1
 *       400:
 *          description: Error de validacion
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: number
 *                    example: 400
 *                  error:
 *                    type: string
 *                    example: Bad Request
 *                  message:
 *                    type: string
 *                    example: [Id must be a number]
 *       404:
 *           description: Post no encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   statusCode:
 *                     type: number
 *                     example: 404
 *                   error:
 *                     type: string
 *                     example: Not Found
 *                   message:
 *                     type: string 
 *                     example: Post inexistente
 */
router.get('/comments/:id', validatorSchema('params', postIdSchema), getCommentsPost)

/**
 * @swagger
 * /api/posts:
 *   get:
 *     tags: [Posts]
 *     produces:
 *       - application/json
 *     summary: Obtener todos los posts
 *     description: Retorna una lista de todos los posts
 *     parameters:
 *       - in: query
 *         name: page
 *         type: number
 *         description: Numero de pagina
 *         required: false
 *       - in: query
 *         name: limit
 *         type: string
 *         description: Numero de elementos por pagina
 *         required: false
 *     responses:
 *       200:
 *         description: Lista de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *         description: Error de validacion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *                 error:
 *                   type: string
 *                   example: Bad Request
 *                 message:
 *                   type: string
 *                   example: [Page must be a number, Limit must be a number]
 */
router.get('/', validatorSchema<PaginationDto, unknown, unknown>('query', paginationPostSchema), getPosts)

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     tags: [Posts]
 *     produces:
 *       - application/json
 *     summary: Obtener un post
 *     description: Retorna un post por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         type: number
 *         required: true
 *     responses:
 *       200:
 *         description: Post por el ID buscado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: Título del post
 *                 content:
 *                   type: string
 *                   example: Contenido del post
 *                 writerId:
 *                   type: number
 *                   example: 1
 *                 categorieId:
 *                   type: number
 *                   example: 1
 *                 writer:
 *                   type: object
 *                 qtyLikes:
 *                   type: number
 *                   example: 1
 *       400:
 *         description: Error de validacion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *                 error:
 *                   type: string
 *                   example: Bad Request
 *                 message:
 *                   type: string
 *                   example: [Id must be a number]
 *       404:
 *          description: Post no encontrado
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: number
 *                    example: 404
 *                  error:
 *                    type: string
 *                    example: Not Found
 *                  message:
 *                    type: string
 *                    example: Post inexistente
 */
router.get('/:id', validatorSchema<unknown, unknown, postIdDto>('params', postIdSchema), getPostById)

/**
 * @swagger
 * /api/posts/user/{writerId}:
 *   get:
 *     tags: [Posts]
 *     produces:
 *       - application/json
 *     summary: Obtener los posts escritos por un usuario
 *     description: Retorna una lista de todos los posts escritos por un usuario
 *     parameters:
 *       - in: path
 *         name: writerId
 *         type: number
 *         required: true
 *     responses:
 *       200:
 *         description: Lista de posts escritos por el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: Título del post
 *                   content:
 *                     type: string
 *                     example: Contenido del post
 *                   image: 
 *                     type: string
 *                     example: https://example.com/image.jpg
 *                   categorieId:
 *                     type: number
 *                     example: 1
 *       400:
 *          description: Error de validacion
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  statusCode:
 *                    type: number
 *                    example: 400
 *                  error:
 *                    type: string
 *                    example: Bad Request
 *                  message:
 *                    type: string
 *                    example: [WriterId must be a number]
 *       404:
 *           description: Usuario no encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   statusCode:
 *                     type: number
 *                     example: 404
 *                   error:
 *                     type: string
 *                     example: Not Found
 *                   message:
 *                     type: string
 *                     example: Usuario inexistente
 */
router.get('/user/:writerId', validatorSchema('params', writerIdSchema), getPostUser)
