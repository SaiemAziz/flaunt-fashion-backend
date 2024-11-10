import {Router} from 'express'
import { adminCheck, anyRoleCheck, contestantCheck, sessionCheck } from '../utils/middlewares.js'
import { deletePost, getAllPosts, getMyPosts, getPost, postPost, putPost } from '../controllers/post_controller.js';
const router = Router()


// contest routes
router.get('/',anyRoleCheck, getAllPosts)
router.get('/:id',anyRoleCheck, getPost)
router.post('/',contestantCheck, postPost)
router.put('/:id',sessionCheck, putPost)
router.delete('/:id',contestantCheck, deletePost)


export default router;