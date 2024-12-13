import {Router} from 'express'
import { sessionCheck } from '../utils/middlewares.js'
import { postVote } from '../controllers/vote_controller.js';

const router = Router()


// vote routes
/**
 * @swagger
 * tags:
 *   name: Votes
 *   description: Votes managing API
 * /api/v1/votes:
 *   post:
 *     summary: Create a new vote
 *     tags: ['Votes']
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
    *           properties:            
    *              post_id:
    *                  type: number
    *              user_id:
    *                  type: number
    *           example:            
    *              post_id: 1
    *              user_id: 1
    *           required: 
    *              - post_id
    *              - user_id
 *     responses:
 *          default: 
 *             description: response of vote api
 */
router.post('/', sessionCheck, postVote)


export default router;