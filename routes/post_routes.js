import {Router} from 'express'
import { adminCheck, anyRoleCheck, contestantCheck, sessionCheck } from '../utils/middlewares.js'
import { deletePost, getAllPosts, getMyPosts, getPost, postPost, putPost } from '../controllers/post_controller.js';
const router = Router()


// contest routes
/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Posts managing API
 * /api/v1/posts:
 *   post:
 *     summary: Create a new post (User)
 *     tags: [Posts]
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
 *                img:
 *                   required: true
 *                   type: String
 *                   example: img link
 *                thumb_img:
 *                   required: true
 *                   type: String
 *                   example: thumb img link
 *                contest_id:
 *                   required: true
 *                   type: number
 *                   example: 1
 *     responses:
 *          default: 
 *             description: Response
 *   
 *   get:
 *     summary: Get all Posts
 *     tags: [Posts]
 *     parameters:
 *         - name: myPosts
 *           in: query
 *           schema:
 *             type: boolean
 *           description: Only my all posts
 *         - name: contest_id
 *           in: query
 *           schema:
 *             type: number
 *           description: The contest id
 *     responses:
 *          default: 
 *             description: Response
 * 
 * /api/v1/posts/{id}:
 *   parameters:
 *         - name: id
 *           in: path
 *           schema:
 *             type: number
 *           required: true
 *           description: The contest id
 *   get:
 *     summary: Get single contest by id
 *     tags: [Posts]
 *     responses:
 *          default: 
 *             description: Response
 *   delete:
 *     summary: Delete single post by id (User)
 *     tags: [Posts]
 *     responses:
 *          default: 
 *             description: Response
 *   put:
 *     summary: Update single post by id (Admin/User)
 *     tags: [Posts]
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
 *                img:
 *                   type: String
 *                   example: img link
 *                thumb_img:
 *                   type: String
 *                   example: thumb img link
 *                contest_id:
 *                   type: number
 *                   example: 1
 *     responses:
 *          default: 
 *             description: Response
 * 
 */

router.get('/',anyRoleCheck, getAllPosts)
router.get('/:id',anyRoleCheck, getPost)
router.post('/',contestantCheck, postPost)
router.put('/:id',sessionCheck, putPost)
router.delete('/:id',contestantCheck, deletePost)


export default router;