import {Router} from 'express'
import { sessionCheck } from '../utils/middlewares.js'
import { forgotPassword, getMyInfo, resetPassword, signIn, signUp } from '../controllers/auth_controller.js'

const router = Router()


// user routes
/** 
* @swagger
 * tags:
 *   name: Auth
 *   description: Authentication managing API
 * /api/v1/auth/sign-up:
 *   post:
 *     summary: Create a new User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                full_name:
 *                   required: true
 *                   type: String
 *                   example: Master Po
 *                user_name:
 *                   required: true
 *                   type: String
 *                   example: sayemaziz
 *                gender:
 *                   required: true
 *                   type: String
 *                   example: male
 *                birthdate:
 *                   type: datetime
 *                   example: 2024-11-11T17:28:34.000Z
 *                img:
 *                   required: true
 *                   type: String
 *                   example: img link
 *                thumb_img:
 *                   required: true
 *                   type: String
 *                   example: thumb img link
 *                email:
 *                   required: true
 *                   format: email
 *                   type: String
 *                   example: sayemazizchy@gmail.com
 *                password:
 *                   required: true
 *                   type: String
 *                   example: zxcvbnm
 *     responses:
 *          default: 
 *             description: Response
 * 
 * 
 * 
 * 
 * 
 * /api/v1/auth/sign-in:
 *   post:
 *     summary: Login a User (Admin/User)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                email:
 *                   required: true
 *                   type: String
 *                   format: email
 *                   example: sayemazizchy@gmail.com
 *                password:
 *                   required: true
 *                   type: String
 *                   example: zxcvbnm
 *     responses:
 *          default: 
 *             description: Response
 * 
 * 
 * 
 * 
 * /api/v1/auth/my-info:
 *   get:
 *     summary: Get own information (Admin/User)
 *     tags: [Auth]
 *     responses:
 *          default: 
 *             description: Response
 * 
 * 
 * 
 * 
 * 
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Forget password send OTP to email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                email:
 *                   required: true
 *                   type: String
 *                   format: email
 *                   example: sayemazizchy@gmail.com
 *     responses:
 *          default: 
 *             description: Response
 * 
 * 
 * 
 * 
 * 
 * /api/v1/auth/reset-password:
 *   post:
 *     summary: Reset password using OTP from email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                resetToken:
 *                   required: true
 *                   type: String
 *                   format: email
 *                   example: S9sweK$1
 *                password:
 *                   required: true
 *                   type: String
 *                   example: newPassword
 *     responses:
 *          default: 
 *             description: Response
*/
router.get('/my-info', sessionCheck, getMyInfo)
router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.post('/reset-password', resetPassword)
router.post('/forgot-password', forgotPassword)


export default router;