import contestSchema from "../schemas/contest_schema.js";

const getAllContests = async (req, res) => {
    try {
        const results = await contestSchema.findAll();
        console.log(results);
        if(results.length > 0) 
            res.status(200).send(results)
        else 
            res.status(404).send({message: "No contests found."})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

const getContest = async (req, res) => {
    try {
        const result = await contestSchema.findOne({
            where: {
                _id: req.params.id
            }
        });
        if(result) 
            res.status(200).send(result)
        else 
            res.status(404).send({message: "Contest not found."})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}
const putContest = async (req, res) => {
    try {
        const results = await contestSchema.update(
            {
                ...req.body,
                user_id: req.tokenData._id
            },
            {
                where: {
                    _id: req.params.id
                }
            });
        if(results[0] > 0) 
            getContest(req, res)
        else 
            res.status(404).send({message: "Contest not found."})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}
const postContest = async (req, res) => {
    try {
        const results = await contestSchema.create(
            {
                ...req.body,
                user_id: req.tokenData._id
            });
        console.log(results);
        if(results?.dataValues?._id) 
            getAllContests(req, res)
        else 
            res.status(404).send({message: "Couldn't post contest."})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}
const deleteContest = async (req, res) => {
    try {
        const result = await contestSchema.findOne({
            where: {
                _id: req.params.id
            }
        });
        if(result) {
            await result.destroy();
            getAllContests(req, res)
        } 
        else res.status(404).send({message: "Contest not found."})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}


export { getAllContests, getContest, putContest, postContest, deleteContest }