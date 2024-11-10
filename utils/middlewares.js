import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

// contestant check
const contestantCheck = async (req, res, next) => {
    const { accessToken } = req.signedCookies;
    if(!accessToken) 
        return res.status(401).send({message: "Invalid access token"})
    try {
        const verify = jwt.verify(accessToken, process.env.JWT_SECRET)
        if(verify.role === 'contestant') {
            req.tokenData = verify
            next();
        } else res.status(403).send({message: "You are not Authorized."})
    } catch (err) {
        res.status(401).send({message: "Invalid access token"})
    }
}
// admin check
const adminCheck = async (req, res, next) => {
    const { accessToken } = req.signedCookies;
    if(!accessToken) 
        return res.status(401).send({message: "Invalid access token"})
    try {
        const verify = jwt.verify(accessToken, process.env.JWT_SECRET)
        if(verify.role === 'admin') {
            req.tokenData = verify
            next();
        } else res.status(403).send({message: "You are not Authorized."})
    } catch (err) {
        res.status(401).send({message: "Invalid access token"})
    }
}
// user exist check
const sessionCheck = async (req, res, next) => {
    const { accessToken } = req.signedCookies;
    if(!accessToken) 
        return res.status(401).send({message: "Invalid access token"})
    try {
        const verify = jwt.verify(accessToken, process.env.JWT_SECRET)
        req.tokenData = verify
        next();
    } catch (err) {
        res.status(401).send({message: "Invalid access token"})
    }
}

// any kind of role
const anyRoleCheck = async (req, res, next) => {
    const { accessToken } = req.signedCookies;
    try {
        const verify = jwt.verify(accessToken, process.env.JWT_SECRET)
        req.tokenData = verify
    } catch (err) {
    } finally {
        next();
    }
}


export {
    contestantCheck,
    adminCheck,
    sessionCheck,
    anyRoleCheck
}