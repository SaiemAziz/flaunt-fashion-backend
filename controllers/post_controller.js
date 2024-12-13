import postSchema from "../schemas/post_schema.js";
import { refinePost } from "../utils/remove_attributes.js";
import { notFoundError, responseSuccess, serverError, unauthorizedError } from "./common/commonFunction.js";
import {
  allPosts,
  insertPost,
  myGivenVotes,
  singlePostById,
  updatePost,
} from "./common/postFunctions.js";

// API for GET ALL Posts
const getAllPosts = async (req, res) => {
  try {
    if (req?.query?.myPosts) {
      getMyPosts(req, res);
      return;
    } else if (!req?.query?.contest_id)
        return notFoundError(res, "Please provide contest_id");

    let options = {
      where: { approved: true },
    };

    if (req?.query?.contest_id)
      options.where.contest_id = req?.query?.contest_id;

    if (req?.tokenData?.role === "admin") delete options.where.approved;
    const results = await allPosts(options);
    if (results.length) 
      responseSuccess(res, await myGivenVotes(results, req?.tokenData?._id))
    else notFoundError(res, "No posts found.");
  } catch (err) {
    serverError(res, err)
  }
};


// API for GET ALL My Posts
const getMyPosts = async (req, res) => {
  try {
    let options = {};
    if (req?.tokenData?._id)
      options = {
    where: { user_id: req?.tokenData?._id },
  };
    const results = await allPosts(options);
    if (results.length)
      responseSuccess(res, await myGivenVotes(results, req?.tokenData?._id))
    else notFoundError(res, "No posts found.");
  } catch (err) {
    serverError(res, err)
  }
};

// API for GET Single Post
const getPost = async (req, res) => {
  try {
    const result = await singlePostById(req.params.id, req?.tokenData?._id);
    if (result) responseSuccess(res, result);
    else notFoundError(res, "Post not found.");
  } catch (err) {
    serverError(res, err)
  }
};

// API for POST Single Post
const postPost = async (req, res) => {
  try {
    const result = await insertPost(
      {
        ...refinePost(req.body),
        user_id: req?.tokenData?._id,
      }
    );
    if (result) getAllPosts(req, res);
    else notFoundError(res, "Post couldn't be inserted.");
  } catch (err) {
    serverError(res, err)
  }
};


// API for PUT Single Post
const putPost = async (req, res) => {
  try {
    const post = await singlePostById(req.params.id);
    if (req.tokenData.role === "contestant")
      if (post?.user_id !== req.tokenData._id || post.approved)
        return unauthorizedError(res, "You can't update this post.")

    const result = await updatePost(refinePost(req.body), req.params.id);

    if (result[0] > 0) getPost(req, res);
    else notFoundError(res, "Post couldn't be updated.")
  } catch (err) {
    serverError(res, err)
  }
};

// API for DELETE Single Post
const deletePost = async (req, res) => {
  try {
    const post = await postSchema.findOne({
      where: {
        _id: req.params.id,
      },
    });
    if (
      req.tokenData.role === "contestant" &&
      post?.user_id !== req.tokenData._id
    )
      return unauthorizedError(res, "You can't delete this post.")
    if (post) {
      await post.destroy();
      getAllPosts(req, res);
    } else notFoundError(res, "Post not found.");
  } catch (err) {
    serverError(res, err)
  }
};

export { getAllPosts, getMyPosts, getPost, postPost, putPost, deletePost };
