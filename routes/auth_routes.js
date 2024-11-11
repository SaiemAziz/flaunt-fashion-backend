import {Router} from 'express'
import { sessionCheck } from '../utils/middlewares.js'
import { forgotPassword, getMyInfo, resetPassword, signIn, signUp } from '../controllers/auth_controller.js'

const router = Router()


// user routes
router.get('/my-info', sessionCheck, getMyInfo)
router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.post('/reset-password', resetPassword)
router.post('/forgot-password', forgotPassword)


export default router;