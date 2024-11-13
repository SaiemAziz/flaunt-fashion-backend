import userSchema from "../schemas/user_schema.js"
import { refineUser } from "../utils/remove_attributes.js";
import { checkId, notFoundError, responseSuccess, serverError } from "./common/commonFunction.js";
import { allUsers, singleUserById } from "./common/userFunctions.js"
import bcrypt from 'bcrypt';

// API for GET ALL Users 
const getAllUsers = async (req, res) => {
    try {
        const results = await allUsers()
        if(results.length > 0) 
            responseSuccess(res, results)
        else 
            notFoundError(res, "No users found.")
} catch (err) {
    serverError(res, err)
}
}


// API for GET SINGLE User by ID 
const getUser = async (req, res) => {
    try {
        const id = checkId(req, res)
        const result = await singleUserById(id, req.tokenData.role)
        if(result) {
            responseSuccess(res, result)
        }
        else 
            notFoundError(res, "User not found.")
    } catch (err) {
        serverError(res, err)
    }
}

// API for PUT SINGLE User by ID 
const putUser = async (req, res) =>  {
    try {
        const user = refineUser(req.body)
        const results = await userSchema.update(user,
            {where: {_id: req.tokenData._id}})
        if(results[0] > 0) 
            responseSuccess(res, await singleUserById(req.tokenData._id, req.tokenData.role))
        else 
            notFoundError(res, "User couldn't update.")
    } catch (err) {
        serverError(res, err)
    }
}

// API for BAN SINGLE User by ID 
const banUser = async (req, res) =>  {
    try {
        const id = checkId(req, res)
        const results = await userSchema.update(
            {banned: req.body.banned},
            {where: {_id: id}})
        if(results[0] > 0) 
            responseSuccess(res, await singleUserById(id, req.tokenData.role))
        else 
            notFoundError(res, "User couldn't be banned.")
    } catch (err) {
        serverError(res, err)
    }
}



export { getAllUsers, getUser, putUser, banUser }