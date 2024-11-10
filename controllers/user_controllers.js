import userSchema from "../schemas/user_schema.js"
import { allUsers, singleUserById } from "./common/userFunctions.js"
import bcrypt from 'bcrypt';

// API functions for User
const getAllUsers = async (req, res) => {
    try {
        const results = await allUsers()
        if(results.length > 0) 
            res.status(200).send(results)
        else 
            res.status(404).send({message: "No users found."})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}
const getUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        if(isNaN(id))
            return res.status(400).send({message: "Invalid user id."})
        const result = await singleUserById(id, req.tokenData.role)
        if(result) {
            res.status(200).send(result)
        }
        else 
            res.status(404).send({message: "User not found."})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}
const putUser = async (req, res) =>  {
    try {
        const user = req.body
        if(user.password)
            user.password = await bcrypt.hash(user.password, parseInt(process.env.SALT));
        if(user.banned) delete user.banned
        if(user.role) delete user.role
        if(user.email) delete user.email
        const results = await userSchema.update(req.body,
            {
                where: {_id: req.tokenData._id}
            })
        if(results[0] > 0) 
            res.status(200)
            .send(await singleUserById(req.tokenData._id, req.tokenData.role))
        else 
            res.status(404).send({message: "User couldn't update."})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}
const banUser = async (req, res) =>  {
    try {
        const id = parseInt(req.params.id)
        if(isNaN(id))
            return res.status(400).send({message: "Invalid user id."})
        
        const results = await userSchema.update(
            req.body,
            {
                where: {_id: id}
            })
        console.log(results);
        if(results[0] > 0) 
            res.status(200).send(await singleUserById(id, req.tokenData.role))
        else 
            res.status(404).send({message: "User couldn't update."})
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}



export { getAllUsers, getUser, putUser, banUser }