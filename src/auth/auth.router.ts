import { Router } from "express";
import passport from "passport";
import { loginUser, registerUser } from "./auth.controller";
import { validatorSchema } from "../middleware/validator.middle";
import { userLoginSchema, userRegisterSchema } from "./validators/auth.validator";

export const router = Router()

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /api/auth:
 *   get:
 *     tags: [Auth]
 *     produces:
 *       - application/json
 *     summary: Verificar si el token de autenticacion es valido
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *       401:
 *         description: Token no valido
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     produces:
 *       - application/json
 *     summary: Registrar un usuario
 *     requestBody:
 *         description: Datos del usuario
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                nickname:
 *                   type: string
 *                name:
 *                  type: string
 *                password:
 *                  type: string
 *                rol:
 *                  type: string
 *     responses:
 *       200:
 *         description: Usuario registrado
 *       400:
 *         description: Datos invalidos
 *       404:
 *         description: Usuario ya existente
 */
router.post('/register', validatorSchema('body', userRegisterSchema), registerUser)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     produces:
 *       - application/json
 *     summary: Login de un usuario
 *     requestBody:
 *         description: Datos del usuario
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nickname:
 *                   type: string
 *                 password:
 *                   type: string
 *     responses:
 *       200:
 *         description: Usuario logueado exitosamente
 *       400:
 *         description: Datos invalidos
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', validatorSchema('body', userLoginSchema), loginUser)
