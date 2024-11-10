import voteSchema from "../schemas/vote_schema.js";

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
            res.status(200).send({message: "Unvote successful."})
        } else {
            const result = await voteSchema.create(req.body)
            res.status(200).send(result)
        } 
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

export { postVote }