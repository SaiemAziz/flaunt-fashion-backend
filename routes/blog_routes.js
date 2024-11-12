import {Router} from 'express'
import { adminCheck, anyRoleCheck } from '../utils/middlewares.js'
import { deleteBlog, getAllBlogs, getBlog, postBlog, putBlog } from '../controllers/blog_controller.js';
const router = Router()


// contest routes
router.get('/', anyRoleCheck, getAllBlogs)
router.get('/:id', anyRoleCheck, getBlog)
router.post('/', anyRoleCheck, postBlog)
router.put('/:id', anyRoleCheck, putBlog)
router.delete('/:id', anyRoleCheck, deleteBlog)


export default router;