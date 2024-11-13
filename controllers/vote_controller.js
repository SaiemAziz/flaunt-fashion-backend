import voteSchema from "../schemas/vote_schema.js";
import { responseSuccess, serverError } from "./common/commonFunction.js";

const postVote = async (req, res) => {
    try {
        const vote = await voteSchema.findOne({
            where: {
                user_id: req.body.user_id,
                post_id: req.body.post_id
            }
        })
        if(vote) {
            const result = await vote.destroy()
            responseSuccess(res, {message: "Unliked successfully."})
        } else {
            const result = await voteSchema.create(req.body)
            responseSuccess(res, {message: "Liked successfully."})
        } 
    } catch (err) {
        serverError(res, err)
    }
}

export { postVote }