import userModle from "../models/userModle.js";
import imagekit from "../helper/imageKit.js";
import { getIO } from "../Sockit.js";
import postModle from "../models/postModle.js";
import { populate } from "dotenv";

export const createPostControlller = async (req, res) => {
  try {
    const files = req.files;
    const data = req.body;
    const currentUser = req.user;
    let promessedFiles;

    if (files) {
      promessedFiles = files.map(async (file) => {
        let mediaData = [];
        if (file.mimetype.startsWith("video/")) {
          const res = await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
            folder: "/postVideos",
          });
          mediaData.push(res);
        } else {
          const res = await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
            folder: "/postImages",
          });
          mediaData.push(res);
        }
        return mediaData;
      });

      let responses = await Promise.all(promessedFiles);
      const flatResponses = responses.flat(3);

      let urlsAndFileId = [];

      flatResponses.forEach((responce) => {
        urlsAndFileId.push({
          url: responce.url,
          fileId: responce.fileId,
          type: responce.fileType,
        });
      });

      let jsondata = JSON.parse(data.text);
      let jsonLinkes = JSON.parse(data.linkes);

      const newPost = await postModle.create({
        caption: jsondata.title,
        media: urlsAndFileId,
        discription: jsondata.discription,
        linkes: jsonLinkes,
        userId: currentUser._id,
      });

      currentUser.postes.push(newPost);
      currentUser.save();
      return res.json({ message: "post created sucessfully", sucess: true });
    } else {
      let jsondata = JSON.parse(data.text);
      let jsonLinkes = JSON.parse(data.linkes);

      const newPost = await postModle.create({
        caption: jsondata.title,
        media: [],
        discription: jsondata.discription,
        linkes: jsonLinkes,
        userId: currentUser._id,
      });

      currentUser.postes.push(newPost);
      currentUser.save();
      return res.json({ message: "post created sucessfully", sucess: true });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "internal servar error", sucess: false });
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


    const randomPostes = await postModle.aggregate([
      { $sample: { size: 10 } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ]);
  
    const uniquePostes = new Map();
    [...followingPostes, ...randomPostes].forEach((post) => {
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
