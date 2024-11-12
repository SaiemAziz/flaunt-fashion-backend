import blogSchema from "../schemas/blog_schema.js"
import { allBlogs, insertBlog, singleBlogById, updateBlog } from "./common/blogFunctions.js"

const getAllBlogs = async (req, res) => {
    try {
        const results = await allBlogs()
        if(results.length > 0)
            res.status(200).send(results)
        else
            res.status(404).send({message: "No blogs found."})
    } catch (err) {
        res.status(500).send(err)
    }
} 
const getBlog = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        if(isNaN(id))
            return res.status(400).send({message: "Invalid blog id."})
        
        const result = await singleBlogById(id)
        
        if(result)
            res.status(200).send(result)
        else
            res.status(404).send({message: "Blog not found."})
    } catch (err) {
        res.status(500).send(err)
    }
} 

const putBlog = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        if(isNaN(id))
            return res.status(400).send({message: "Invalid blog id."})


        
        const result = await updateBlog(req.body, id)
        
        if(result[0] > 0) getBlog(req, res)
        else
            res.status(404).send({message: "Blog not found."})
    } catch (err) {
        res.status(500).send(err)
    }
} 
const postBlog = async (req, res) => {
    try {
        const result = await insertBlog({
            ...req.body,
            user_id: req?.tokenData?._id
        })
        
        if(result) getAllBlogs(req, res)
        else
            res.status(404).send({message: "Couldn't add blog. Please try again."})
    } catch (err) {
        res.status(500).send(err)
    }
} 
const deleteBlog = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        if(isNaN(id))
            return res.status(400).send({message: "Invalid blog id."})


        
        const result = await singleBlogById(id)
        
        if(result) {
            await result.destroy()
            getAllBlogs(req, res)
        } else
            res.status(404).send({message: "Blog not found."})

    } catch (err) {
        res.status(500).send(err)
    }
} 



export {
    getAllBlogs, getBlog, putBlog, deleteBlog, postBlog
}