import userSchema from "../../schemas/user_schema.js"
import { genOTP } from "../../utils/functions.js"

const allUsers = async () => {
    try {
        const results = await userSchema.findAll({
            order: [['full_name','ASC']],
        })
        return results
    } catch (err) {
        throw err
    }
}  
const singleUserById = async (id, role) => {
    try {
        const result = await userSchema.findOne({
            where: {_id: id},
            attributes: { 
                exclude: role === 'contestant' ? ['banned', 'role', 'password', 'resetToken'] : role === "admin" ?['password', 'resetToken'] : [],
            },
        })
        return result.dataValues
    } catch (err) {
        throw err
    }
}  
const singleUserbyEmail = async (email, role) => {
    try {
        const result = await userSchema.findOne({
            where: {email: email},
            attributes: { 
                exclude: role === 'contestant' ? ['banned', 'role', 'password', 'resetToken'] : role === "admin" ?['password', 'resetToken'] : [],
            },
        })
        return result.dataValues
    } catch (err) {
        throw err
    }
}  

const insertUser = async (user) => {
    try {
        user.resetToken = genOTP()
        const result = await userSchema.create(user)
        return result
    } catch (err) {
        throw err
        // console.log(err);
        // return null
    }
}  

export {allUsers, singleUserById, singleUserbyEmail, insertUser}