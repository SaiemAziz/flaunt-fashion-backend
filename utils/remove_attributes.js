const refineData = (data) => {
    delete data?._id
    delete data?.createdAt
    delete data?.updateAt

    return data
}

const refineUser = (data) => {
    data = refineData(data)
    delete data?.password
    delete data?.resetToken
    delete data?.email
    delete data?.role
    delete data?.banned

    return data
}

const refineContest = (data) => {
    data = refineData(data)

    return data
}

const refinePost = (data) => {
    data = refineData(data)
    delete data?.approved
    delete data?.user_id
    delete data?.contest_id

    return data
}

const refineBlog = (data) => {
    data = refineData(data)
    
    return data
}


export {
    refineData,
    refineUser,
    refineContest,
    refinePost,
    refineBlog,
}