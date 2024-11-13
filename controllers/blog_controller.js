import blogSchema from "../schemas/blog_schema.js"
import { refineBlog } from "../utils/remove_attributes.js"
import { allBlogs, insertBlog, singleBlogById, updateBlog } from "./common/blogFunctions.js"
import { checkId, notFoundError, responseSuccess, serverError } from "./common/commonFunction.js"

const getAllBlogs = async (req, res) => {
    try {
        const results = await allBlogs()
        if(results.length > 0)
            responseSuccess(res, results)
        else
            notFoundError(res, "No blogs found.")
    } catch (err) {
        serverError(res, err)
    }
} 
const getBlog = async (req, res) => {
    try {
        const id = checkId(req.params.id)
        
        const result = await singleBlogById(id)
        
        if(result)
            responseSuccess(res, result)
        else
            notFoundError(res, "Blog not found.")
    } catch (err) {
        serverError(res, err)
    }
} 

const putBlog = async (req, res) => {
    try {
        const id = checkId(req.params.id)

        const result = await updateBlog(refineBlog(req.body), id)
        
        if(result[0] > 0) getBlog(req, res)
        else
            notFoundError(res, "Blog not found.")
    } catch (err) {
        serverError(res, err)
    }
} 
const postBlog = async (req, res) => {
    try {
        const result = await insertBlog({
            ...refineBlog(req.body),
            user_id: req?.tokenData?._id
        })
        
        if(result) getAllBlogs(req, res)
        else notFoundError(res, "Couldn't add blog.")
    } catch (err) {
        serverError(res, err)
    }
} 
const deleteBlog = async (req, res) => {
    try {
        const id = checkId(req.params.id)

        const result = await singleBlogById(id)
        
        if(result) {
            await result.destroy()
            getAllBlogs(req, res)
        } else
            notFoundError(res, "Blog not found.")

    } catch (err) {
        serverError(res, err)
    }
} 



export {
    getAllBlogs, getBlog, putBlog, deleteBlog, postBlog
}