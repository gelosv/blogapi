import { Router } from "express";
import { createComment, getLikedPosts, likePost } from "./user.controller";
import passport from "passport";
import { validatorSchema } from "../middleware/validator.middle";
import { createCommentSchema } from "./validators/user.validator";
import { postIdSchema } from "../posts/schemas/post.validator";

export const router = Router();

router.use(passport.authenticate('jwt', { session: false }))

/**
 * @swagger
 * /api/users/like/{id}:
 *   post:
 *     tags: [Users]
 *     summary: Dar like a un post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *     - in: path
 *       name: id
 *       type: number
 *       required: true
 *     responses:
 *       200:
 *         description: Post likeado
 *       400:
 *         description: Error de validacion
 */
router.post('/like/:id', validatorSchema('params', postIdSchema), likePost)

/**
 * @swagger
 * /api/users/comment:
 *   post:
 *     tags: [Users]
 *     consumes:
 *       - application/json
 *     summary: Crear un comentario
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         description: Datos del comentario
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: string
 *                 postId:
 *                   type: number
 *     responses:
 *        200:
 *          description: Comentario creado
 *        401:
 *          description: Sin autorización
 *        400:
 *          description: Error de validación
 */
router.post('/comment', validatorSchema('body', createCommentSchema), createComment)

/**
 * @swagger
 * /api/users/like/posts:
 *   get:
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     summary: Obtener los posts que un usuario ha dado like
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de posts
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
 *       401:
 *         description: Sin autorización
 */
router.get('/like/posts', getLikedPosts)
