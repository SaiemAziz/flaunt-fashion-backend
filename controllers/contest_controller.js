import contestSchema from "../schemas/contest_schema.js";
import { refineContest } from "../utils/remove_attributes.js";
import { notFoundError, responseSuccess, serverError } from "./common/commonFunction.js";

const getAllContests = async (req, res) => {
    try {
        const results = await contestSchema.findAll();
        console.log(results);
        if(results.length > 0) 
            responseSuccess(res, results)
        else notFoundError(res, "No contests found.")
    } catch (err) {
        serverError(res, err)
    }
}

const getContest = async (req, res) => {
    try {
        const result = await contestSchema.findOne({
            where: {
                _id: req.params.id
            }
        });
        if(result) responseSuccess(res, result)
        else notFoundError(res, "Contest not found.")
    } catch (err) {
        serverError(res, err)
    }
}
const putContest = async (req, res) => {
    try {
        const results = await contestSchema.update(
            {
                ...refineContest(req.body),
                user_id: req.tokenData._id
            },
            {
                where: {
                    _id: req.params.id
                }
            });
        if(results[0] > 0) 
            getContest(req, res)
        else notFoundError(res, "Contest not found.")
    } catch (err) {
        serverError(res, err)
    }
}
const postContest = async (req, res) => {
    try {
        const results = await contestSchema.create(
            {
                ...refineContest(req.body),
                user_id: req.tokenData._id
            });
        if(results?.dataValues?._id) 
            getAllContests(req, res)
        else 
            notFoundError(res, "Contest couldn't be added.")
    } catch (err) {
        serverError(res, err)
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
        else notFoundError(res, "Contests not found.")
    } catch (err) {
        serverError(res, err)
    }
}


export { getAllContests, getContest, putContest, postContest, deleteContest }