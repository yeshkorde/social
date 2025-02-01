import userModle from "../models/userModle.js";
import imagekit from "../helper/imageKit.js";

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
      name: { $regex: q, $options: "i" },
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
    const currentuser = await userModle.findOne({_id:req.user._id})
    const {q} = req.query;

    if(q==="update"){
  
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const responce = await imagekit.upload({
      file: req.file.buffer,
      folder: "profileImages",
      fileName: "ProfileImage.png",
      isPrivateFile: false,
    });
    currentuser.profileImage = responce.url;
    currentuser.save();
    return res.json({ message: "File uploaded successfully",currentuser,sucess:true });
  }

  if(q === "remove"){
    currentuser.profileImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png";
    currentuser.save();
    return res.json({ message: "File uploaded successfully",currentuser,sucess:true });
  }

  } catch (error) {
    console.log(
      "some thing want wrong to update profile image ",
      error.message
    );
  }
};
