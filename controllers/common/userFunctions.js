import userSchema from "../../schemas/user_schema.js"

const allUsers = async () => {
    try {
        const results = await userSchema.findAll({
            order: [['full_name','ASC']],
        })
        return results
    } catch (err) {
        console.log(err);
        return null
    }
}  
const singleUserById = async (id, role) => {
    try {
        const result = await userSchema.findOne({
            where: {_id: id},
            attributes: { 
                exclude: role === 'contestant' ? ['banned', 'role', 'password'] : role === "admin" ?['password'] : [],
            },
        })
        return result.dataValues
    } catch (err) {
        console.log(err);
        return null
    }
}  
const singleUserbyEmail = async (email, role) => {
    try {
        const result = await userSchema.findOne({
            where: {email: email},
            attributes: { 
                exclude: role === 'contestant' ? ['banned', 'role', 'password'] : role === "admin" ?['password'] : [],
            },
        })
        return result.dataValues
    } catch (err) {
        console.log(err);
        return null
    }
}  

const insertUser = async (user) => {
    try {
        const result = await userSchema.create(user)
        return result
    } catch (err) {
        console.log(err);
        return null
    }
}  

export {allUsers, singleUserById, singleUserbyEmail, insertUser}