import userModle from "../models/userModle.js";
import imagekit from "../helper/imageKit.js";
import { getIO} from "../Sockit.js";
import notificationModle from "../models/notificationModle.js";
import {v4 as uuidv4} from "uuid"
import cloudinary from "../helper/cloudinery.js"

export const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const users = await userModle.find({
      userName: { $regex: q, $options: "i" },
    });

    if (users.length === 0) {
      return res.json({ message: "user not found", sucess: false });
    }

    return res.json({ message: "user  found", sucess: true, users });
  } catch (error) {
    console.log("some thing want wrong to searching user", error.message);
    res.json({
      message: `some thing want wrong to searching user ${error.message}`,
    });
  }
};

export const updateProfileImageController = async (req, res) => {
  try {
    const currentuser = await userModle.findOne({ _id: req.user._id });
    const { q } = req.query;

    if (q === "update") {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      }

      if (currentuser.fileId) {
        await cloudinary.uploader.destroy(currentuser.fileId);
      }


      cloudinary.uploader.upload_stream(
        { folder: "profileImages" },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ message: "Upload failed", error });
          }

        
          currentuser.fileId = result.public_id;
          currentuser.profileImage = result.secure_url;
          await currentuser.save();

          return res.json({
            message: "File uploaded successfully",
            currentuser,
            success: true,
          });
        }
      ).end(req.file.buffer);
    }

    if (q === "remove") {
      console.log("Removing profile image...");

      if (currentuser.fileId) {
        await cloudinary.uploader.destroy(currentuser.fileId);
        currentuser.fileId = "";
      }


      currentuser.profileImage =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png";

      await currentuser.save();

      
      return res.status(200).json({
        message: "Profile image removed successfully",
        currentuser,
        success: true,
      });
    }

  } catch (error) {
    console.error("Error updating profile image: ", error.message);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};




export const followController = async (req, res) => {
  try {
    const { SockitId, _id } = req.body;
    const FollwingUser = await userModle.findOne({ _id });

    if (!SockitId) {
      return res.status(400).json({ success: false, error: "Socket ID is required" });
    }

    const currentUser = req.user;
    const io = getIO();

    if (currentUser.following.includes(_id)) {
      currentUser.following.splice(currentUser.following.indexOf(_id), 1);
      FollwingUser.followers.splice(FollwingUser.followers.indexOf(currentUser._id), 1);
      await FollwingUser.save();
      await currentUser.save();
      return res.json({ message: "Unfollowed successfully", currentUser });
    }

    currentUser.following.push(_id);
    FollwingUser.followers.push(currentUser._id);


    const newNotification = await notificationModle.create({
      title: `You have a follow request from ${currentUser.userName}`,
      isSeen: false,
      sender: currentUser._id,
      type: "follow",
    });

    FollwingUser.Notifications.push(newNotification);
    await FollwingUser.save();
    await currentUser.save();

   
    io.to(SockitId).emit("/followNotificatio", {
      title: newNotification.title,
      type: newNotification.type,
      isSeen: newNotification.isSeen,
      sender: currentUser,
      _id: newNotification._id,
      createdAt:Date.now(),

    });

    return res.json({ message: "Followed successfully", currentUser });
  } catch (error) {
    console.error("Follow Controller Error:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


export const ChickNotification = async(req,res)=>{
try {
  const {notificationId} = req.body
  const notification = await notificationModle.findOne({_id:notificationId})

  if(!notificationId){
    return res.json({
      error:"no such notification existes"
    
    },{
      status:400.
    })
  }

  notification.isSeen = true;
notification.save();
return res.json({
  message:"notification chicked"
})

} catch (error) {
  res.json({
    error:"enternal server error"
  })
}
} 


export const getAllPostsController = async(req,res)=>{
  try {
    const postes = await userModle.findOne({
      _id:req.user._id
    }).populate({
      modle:"poste",
      path:"postes"
    })
    res.json({poste:postes.postes,sucess:true})
  } catch (error) {
    res.json({
      message:"internal server error",
      sucess:false
    })
  }
}


export const getUserProfiledDataController = async(req,res)=>{
try {
  const {userId} = req.query;
  const user = await userModle.findOne({_id:userId}).populate({
    path:"postes",
    modle:"post",
  }).populate({
    path:"followers",
    modle:"user"
  }).populate({
    path:"following",
    modle:"user"
  })

  res.json({
    user,
  })

} catch (error) {
  res.json({
    error:"internal server error"
  })
  console.log(error.message);
  
}
}