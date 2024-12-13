const checkId = (req, res) => {
    const id = parseInt(req.params.id)
    console.log(id);
    if(isNaN(id))
        return invalidDataError(res, "Invalid id.")
    else return id
}

const notFoundError = (res, msg) => {
    return res.status(404).send({message: msg})
}
const unauthorizedError = (res, msg) => {
    return res.status(403).send({message: msg})
}
const unauthenticateError = (res, msg) => {
    return res.status(401).send({message: msg})
}
const invalidDataError = (res, msg) => {
    return res.status(400).send({message: msg})
}
const serverError = (res, err) => {
    return res.status(500).send(err)
}

const responseSuccess = (res, data) => {
    return res.status(200).send(data)
}

export {
    checkId,
    unauthorizedError,
    unauthenticateError,
    invalidDataError,
    serverError,
    responseSuccess,
    notFoundError
}