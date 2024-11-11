import seq from "../../schemas/index.js";
import postSchema from "../../schemas/post_schema.js";
import voteSchema from "../../schemas/vote_schema.js";

// `
// SELECT
//     p.*,
//     COUNT(v.post_id) AS count_votes
// FROM
//     (select * from posts where approved = true) as p
// LEFT JOIN
//     votes v ON p.id = v.post_id
// GROUP BY
//     p.id;
// `;
const allPosts = async (options = {}) => {
  try {
    let condition = "";
    if (options?.where) {
      condition = `where `;
      Object.keys(options.where).forEach((key, i) => {
        if(i > 0) condition += " AND ";
        condition += `${key} = ${options.where[key]}`;
      })
    }
    const results = await seq.query(`
            SELECT
                p.*,
                COUNT(v.post_id) AS count_votes
            FROM
                (select * from post ${condition}) as p
            LEFT JOIN
                vote v ON p._id = v.post_id
            GROUP BY p._id
            ORDER BY COUNT(v.post_id) DESC; 
        `);
    return results[0];
  } catch (err) {
    throw err
  }
};

const singlePostById = async (id, my_id) => {
  try {
    const result = await seq.query(`
        SELECT
            p.*,
            COUNT(v.post_id) AS count_votes
        FROM
            (select * from post where _id = ${id}) as p
        LEFT JOIN
            vote v ON p._id = v.post_id
        GROUP BY p._id
        ORDER BY COUNT(v.post_id) DESC;   
    `);
    if(my_id) {
      const vote = await voteSchema.findOne({
        where: { post_id: id, user_id: my_id }
      })
      result[0][0].vote = vote ? true : false;
    }
    return result[0][0];
  } catch (err) {
    throw err
  }
};

const insertPost = async (data) => {
  try {
    const result = await postSchema.create(data);
    return result;
  } catch (err) {
    throw err
  }
};
const updatePost = async (data, id) => {
  try {
    const result = await postSchema.update(data, {
      where: { _id: id },
    });
    return result;
  } catch (err) {
    throw err
  }
};

const myGivenVotes = async (data, user_id) => {
    try {
        if(!user_id) return data
        const result = await voteSchema.findAll({
            attributes: ['post_id'],
            where: { user_id: user_id }
        });
        data.forEach(d => {d.vote = result.includes(d._id)})
        return data
    } catch (err) {
        console.log(err);
        return data;
    }
}

export { allPosts, singlePostById, insertPost, updatePost, myGivenVotes };
