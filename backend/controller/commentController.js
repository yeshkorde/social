import PostModle from "../models/postModle.js";
import commentModle from "../models/commentModle.js";
export const createCommentController = async (req, res) => {
  try {
    const { comment, postId } = req.body;


    if(!comment || !postId){
        return res.json({
            error:"comment field in required"
        })
    }

    const post = await PostModle.findOne({ _id: postId });
    const currentUser = req.user;

    const newComment = await commentModle.create({
      message: comment,
      user: currentUser._id,
      postId,
    });
    post.comments.push(newComment._id);
    post.save();
    return res.json({ message: "comment created",sucess:true,comments:post.comments});
  } catch (error) {
    console.log(`some thing wantwrong to create comment`, error.message);
    res.json({
      error: "internal server error",
    });
  }
};
