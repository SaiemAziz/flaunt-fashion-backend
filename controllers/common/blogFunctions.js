import blogSchema from "../../schemas/blog_schema.js";

const allBlogs = async (options) => {
    try {
        const results = await blogSchema.findAll(options);
        return results;
    } catch (err) {
        throw err;
    }
}
const singleBlogById = async (id) => {
    try {
        const results = await blogSchema.findOne({
            where: {
                _id: id
            }
        })
        return results;
    } catch (err) {
        throw err;
    }
}
const insertBlog = async (data) => {
    try {
        const results = await blogSchema.create(data)
        return results;
    } catch (err) {
        throw err;
    }
}
const updateBlog = async (data, id) => {
    try {
        const results = await blogSchema.update(data, {
            where: {
                _id: id
            }
        })
        return results;
    } catch (err) {
        throw err;
    }
}


export {
    allBlogs, singleBlogById, insertBlog, updateBlog
}