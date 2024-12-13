import {Router} from 'express'
import { adminCheck, anyRoleCheck } from '../utils/middlewares.js'
import { deleteBlog, getAllBlogs, getBlog, postBlog, putBlog } from '../controllers/blog_controller.js';
const router = Router()


// contest routes
/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blogs managing API
 * /api/v1/blogs:
 *   post:
 *     summary: Create a new blog (Admin)
 *     tags: [Blogs]
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
 *                   required: true
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
 *                link:
 *                   type: String
 *                   example: reference link
 *     responses:
 *          default: 
 *             description: Response
 *   
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     responses:
 *          default: 
 *             description: Response
 * 
 * /api/v1/blogs/{id}:
 *   parameters:
 *         - name: id
 *           in: path
 *           schema:
 *             type: number
 *           required: true
 *           description: The blog id
 *   get:
 *     summary: Get single blog by id
 *     tags: [Blogs]
 *     responses:
 *          default: 
 *             description: Response
 *   delete:
 *     summary: Delete single blog by id (Admin)
 *     tags: [Blogs]
 *     responses:
 *          default: 
 *             description: Response
 *   put:
 *     summary: Update single blog by id (Admin)
 *     tags: [Blogs]
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
 *                link:
 *                   type: String
 *                   example: reference link
 *     responses:
 *          default: 
 *             description: Response
 * 
 */
router.get('/', anyRoleCheck, getAllBlogs)
router.get('/:id', anyRoleCheck, getBlog)
router.post('/', adminCheck, postBlog)
router.put('/:id', adminCheck, putBlog)
router.delete('/:id', adminCheck, deleteBlog)


export default router;