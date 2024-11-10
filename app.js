import {Router} from 'express'
import userRoute from './routes/user_routes.js'
import authRoute from './routes/auth_routes.js'
import contestRoute from './routes/contest_routes.js'
import voteRoute from './routes/vote_routes.js'
import postRoute from './routes/post_routes.js'
const app = Router()
app.get("/v1", (req, res) => res.send("Flaunt Fashion backend root API version: 1"));
app.use('/v1/users', userRoute)
app.use('/v1/auth', authRoute)
app.use('/v1/contests', contestRoute)
app.use('/v1/votes', voteRoute)
app.use('/v1/posts', postRoute)

export default app