import {Router} from 'express'
import {  banUser, getAllUsers, getUser,  putUser } from '../controllers/user_controllers.js'
import { adminCheck, contestantCheck } from '../utils/middlewares.js'

const router = Router()


// user routes
router.get('/', adminCheck, getAllUsers)
router.get('/:id', adminCheck, getUser)
router.put('/', contestantCheck, putUser)
router.put('/ban/:id', adminCheck, banUser)


export default router;