import {Router} from 'express'
import { adminCheck, anyRoleCheck } from '../utils/middlewares.js'
import { deleteContest, getAllContests, getContest, postContest, putContest } from '../controllers/contest_controller.js'

const router = Router()



// contest routes
/**
 * @swagger
 * tags:
 *   name: Contests
 *   description: contests managing API
 * /api/v1/contests:
 *   post:
 *     summary: Create a new contest (Admin)
 *     tags: [Contests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                title:
 *                   required: true
 *                   type: String
 *                   example: test title
 *                description:
 *                   type: String
 *                   example: test description
 *                img:
 *                   required: true
 *                   type: String
 *                   example: img link
 *                thumb_img:
 *                   required: true
 *                   type: String
 *                   example: thumb img link
 *                rules:
 *                   required: true
 *                   type: String
 *                   example: reference link
 *                gender:
 *                   required: true
 *                   type: String
 *                   example: male
 *                category:
 *                   required: true
 *                   type: String
 *                   example: summer
 *                deadline:
 *                   required: true
 *                   type: datetime
 *                   example: 2024-11-11T17:28:34.000Z
 *     responses:
 *          default: 
 *             description: Response
 *   
 *   get:
 *     summary: Get all contests
 *     tags: [Contests]
 *     responses:
 *          default: 
 *             description: Response
 * 
 * /api/v1/contests/{id}:
 *   parameters:
 *         - name: id
 *           in: path
 *           schema:
 *             type: number
 *           required: true
 *           description: The contest id
 *   get:
 *     summary: Get single contest by id
 *     tags: [Contests]
 *     responses:
 *          default: 
 *             description: Response
 *   delete:
 *     summary: Delete single contest by id (Admin)
 *     tags: [Contests]
 *     responses:
 *          default: 
 *             description: Response
 *   put:
 *     summary: Update single contest by id (Admin)
 *     tags: [Contests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                title:
 *                   type: String
 *                   example: test title
 *                description:
 *                   type: String
 *                   example: test description
 *                img:
 *                   type: String
 *                   example: img link
 *                thumb_img:
 *                   type: String
 *                   example: thumb img link
 *                rules:
 *                   type: String
 *                   example: reference link
 *                gender:
 *                   type: String
 *                   example: male
 *                category:
 *                   type: String
 *                   example: summer
 *                deadline:
 *                   type: datetime
 *                   example: 2024-11-11T17:28:34.000Z
 *     responses:
 *          default: 
 *             description: Response
 * 
 */


router.get('/', anyRoleCheck, getAllContests)
router.get('/:id', anyRoleCheck, getContest)
router.put('/:id', adminCheck, putContest)
router.post('/', adminCheck, postContest)
router.delete('/:id', adminCheck, deleteContest)


export default router;