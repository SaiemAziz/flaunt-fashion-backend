import userSchema from "../schemas/user_schema.js"
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { insertUser, singleUserbyEmail } from "./common/userFunctions.js";
dotenv.config()

// sign up endpoint
const signUp = async (req, res) => {
    try {
        const user = req.body
        console.log(process.env.SALT);
        if(user.password)
            user.password = await bcrypt.hash(user.password, parseInt(process.env.SALT));
        const result = await insertUser(user)
        if(result?.email)
            res.status(201).send(await singleUserbyEmail(result?.email, result?.role))
        else throw new Error("User could not be added. Please try again.")
    } catch (err) {
        res.status(500).send(err)
    }
}
// sign in endpoint
const signIn = async (req, res) => {
    try {
        const user = await singleUserbyEmail(req.body.email)
        if(!user) return res.status(404).send({message: "Email does not exist."})
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(isMatch){
            const token = jwt.sign({role: user.role, email: user.email, _id: user._id}, process.env.JWT_SECRET)
            const cookieOptions = { 
                maxAge: 1000 * 60 * 60 * 24 * 7, 
                secure: true, 
                signed: true,
            };
            res.cookie('accessToken', token, cookieOptions);
            res.status(200).send(await singleUserbyEmail(user?.email, user?.role))
        }
        else res.status(401).send({message: "Invalid password."})
    } catch (err) {
        res.status(500).send(err)
    }
}
const getMyInfo = async (req, res) => {
    try {
        const user = await singleUserbyEmail(req.tokenData.email, req.tokenData.role)
        if(!user) 
            res.status(404).send({message: "Email does not exist."})
        else res.status(200).send(user)
    } catch (err) {
        res.status(500).send(err)
    }
}


export { signUp, signIn, getMyInfo }