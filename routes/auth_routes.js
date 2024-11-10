import {Router} from 'express'
import { sessionCheck } from '../utils/middlewares.js'
import { getMyInfo, signIn, signUp } from '../controllers/auth_controller.js'

const router = Router()


// user routes
router.get('/my-info', sessionCheck, getMyInfo)
router.post('/sign-up', signUp)
router.post('/sign-in', signIn)


export default router;