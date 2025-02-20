import imagekit from "../helper/imageKit.js";
import cloudinary from "../helper/cloudinery.js";
import postModle from "../models/postModle.js";
import { Readable } from "stream";

export const createPostControlller = async (req, res) => {
  try {
    const files = req.files;
    const data = req.body;
    const currentUser = req.user;

    let uploadedFiles = [];

    if (files && files.length > 0) {
      const promisedFiles = files.map((file) => {
        return new Promise((resolve, reject) => {
          const folder = file.mimetype.startsWith("video/")
            ? "postVideos"
            : "postImages";

          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder,
              resource_type: file.mimetype.startsWith("video/")
                ? "video"
                : "image",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );

          Readable.from(file.buffer).pipe(uploadStream);
        });
      });

      uploadedFiles = await Promise.all(promisedFiles);
    }

    const mediaData = uploadedFiles.map((file) => ({
      url: file.secure_url,
      fileId: file.public_id,
      type: file.resource_type,
    }));

    const jsondata = JSON.parse(data.text || "{}");
    const jsonLinkes = JSON.parse(data.linkes || "[]");

    const newPost = await postModle.create({
      caption: jsondata.title,
      media: mediaData,
      discription: jsondata.discription,
      linkes: jsonLinkes,
      userId: currentUser._id,
    });

    currentUser.postes.push(newPost);
    await currentUser.save();

    

    return res.json({
      message: "Post created successfully",
      success: true,
      post: newPost,
      currentUser,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const feedPostController = async (req, res) => {
  try {
    const currentUser = req.user;

    await currentUser.populate({
      path: "following",
      populate: {
        path: "postes",
        model: "postes",
        populate: {
          path: "userId",
          model: "user",
        },
      },
    });

    let followingPostes = [];
    currentUser.following.forEach((user) => {
      followingPostes = followingPostes.concat(user.postes);
    });

    const randomPosts = await postModle
    .find()
    .populate({
      path: "userId", 
      modle:"user",
      populate:({
        path:"postes"
      })
    })
    .limit(10) 
    .sort({ createdAt: -1 }); 
  
  
  

    const uniquePostes = new Map();
    [...followingPostes, ...randomPosts].forEach((post) => {
      uniquePostes.set(post._id.toString(), post);
    });

    const shuffledPosts = Array.from(uniquePostes.values()).sort(
      () => 0.5 - Math.random()
    );

    const feedPosts = shuffledPosts.slice(0, 10);

    res.json({ posts: feedPosts });
  } catch (error) {
    console.error("Error fetching feed:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const likePostControler = async (req, res) => {
  try {
    const { postId } = req.body;

    const post = await postModle.findOne({_id:postId});

    if(!post){
      return res.json({
        error:"some thing want wrong",
        sucess:false
      })
    }

    if(post.likes.includes(req.user._id)){
      post.likes.splice(post.likes.indexOf(req.user._id),1);
      post.save();
      return res.json({
        message:"unliked post"
      })
    }

    post.likes.push(req.user._id)
    post.save();
    
    return res.json({
      message:"post liked"
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      message: "internal server error",
    });
  }
};
