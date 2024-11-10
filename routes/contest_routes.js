import {Router} from 'express'
import { adminCheck, anyRoleCheck } from '../utils/middlewares.js'
import { deleteContest, getAllContests, getContest, postContest, putContest } from '../controllers/contest_controller.js'

const router = Router()


// contest routes
router.get('/', anyRoleCheck, getAllContests)
router.get('/:id', anyRoleCheck, getContest)
router.put('/:id', adminCheck, putContest)
router.post('/', adminCheck, postContest)
router.delete('/:id', adminCheck, deleteContest)


export default router;