import {Router} from 'express'
import {  banUser, getAllUsers, getUser,  putUser } from '../controllers/user_controllers.js'
import { adminCheck, contestantCheck } from '../utils/middlewares.js'

const router = Router()


// user routes
/** 
* @swagger
 * tags:
 *   name: Users
 *   description: Users managing API
 * /api/v1/users:
 *   get:
 *     summary: Get all users (Admin)
 *     tags: [Users]
 *     responses:
 *          default: 
 *             description: Response
 * 
 *   put:
 *     summary: Update own information (Admin/Users)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                full_name:
 *                   type: String
 *                   example: Master Po
 *                user_name:
 *                   type: String
 *                   example: sayemaziz
 *                gender:
 *                   type: String
 *                   example: male
 *                birthdate:
 *                   type: datetime
 *                   example: 2024-11-11T17:28:34.000Z
 *                img:
 *                   type: String
 *                   example: img link
 *                thumb_img:
 *                   type: String
 *                   example: thumb img link
 *     responses:
 *          default: 
 *             description: Response
 * 
 * 
 * 
 * 
 * 
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a single user (Admin)
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: number
 *         required: true
 *         description: The user id
 *     responses:
 *         default: 
 *             description: Response
 * 
 * /api/v1/users/ban/{id}:
 *   put:
 *     summary: Ban/Unban an user (Admin)
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: number
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                banned:
 *                   type: boolean
 *                   example: true
 *     responses:
 *          default: 
 *             description: Response
 */
router.get('/', adminCheck, getAllUsers)
router.get('/:id', adminCheck, getUser)
router.put('/', contestantCheck, putUser)
router.put('/ban/:id', adminCheck, banUser)


export default router;