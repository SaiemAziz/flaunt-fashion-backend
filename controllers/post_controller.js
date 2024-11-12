import postSchema from "../schemas/post_schema.js";
import {
  allPosts,
  insertPost,
  myGivenVotes,
  singlePostById,
  updatePost,
} from "./common/postFunctions.js";

const getAllPosts = async (req, res) => {
  try {
    if (req?.query?.myPosts) {
      getMyPosts(req, res);
      return;
    }

    let options = {
      where: { approved: true },
    };

    if (req?.query?.contest_id)
      options.where.contest_id = req?.query?.contest_id;

    if (req?.tokenData?.role === "admin") delete options.where.approved;
    const results = await allPosts(options);
    if (results.length)
      res.status(200).send(await myGivenVotes(results, req?.tokenData?._id));
    else
      res
        .status(404)
        .send({ message: "No posts found." });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
const getMyPosts = async (req, res) => {
  try {
    let options = {};
    if (req?.tokenData?._id)
      options = {
        where: { user_id: req?.tokenData?._id },
      };
    const results = await allPosts(options);
    if (results.length)
      res.status(200).send(await myGivenVotes(results, req?.tokenData?._id));
    else
      res
        .status(404)
        .send({ message: "No posts found." });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getPost = async (req, res) => {
  try {
    const result = await singlePostById(req.params.id, req?.tokenData?._id);
    console.log(result);
    if (result) res.status(200).send(result);
    else
      res
        .status(404)
        .send({ message: "Post not found." });
  } catch (err) {
    res.status(500).send(err);
  }
};

const postPost = async (req, res) => {
  try {
    const result = await insertPost(req.body);
    if (result) getAllPosts(req, res);
    else
      res
        .status(500)
        .send({ message: "Something went wrong. Please try again." });
  } catch (err) {
    res.status(500).send(err);
  }
};
const putPost = async (req, res) => {
  try {
    const post = await singlePostById(req.params.id);
    if (req.tokenData.role === "contestant")
      if (post?.user_id !== req.tokenData._id || post.approved)
        return res
          .status(403)
          .send({
            message: "Sorry, you are not authorized to update this post.",
          });

    const result = await updatePost(req.body, req.params.id);

    if (result[0] > 0) getPost(req, res);
    else
      res
        .status(500)
        .send({ message: "Something went wrong. Please try again." });
  } catch (err) {
    res.status(500).send(err);
  }
};

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
      return res
        .status(403)
        .send({ message: "Sorry, you can't delete this post." });
    if (post) {
      await post.destroy();
      getAllPosts(req, res);
    } else res.status(404).send({ message: "Post not found." });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

export { getAllPosts, getMyPosts, getPost, postPost, putPost, deletePost };
