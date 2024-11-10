import {Router} from 'express'
import { sessionCheck } from '../utils/middlewares.js'
import { postVote } from '../controllers/vote_controller.js';

const router = Router()


// user routes
router.post('/', sessionCheck, postVote)


export default router;