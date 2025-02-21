import folderModle from "../models/folderModle.js";

export const createFolderController = async (req, res) => {
  try {
    const currentUser = req.user;
    const { folderName } = req.body;
    if (!folderName) {
      return res.json({
        error: "folder name is required",
      });
    }
    const newFolder = await folderModle.create({
        folderName,
      });

      currentUser.saved.push(newFolder);
      currentUser.save();
     
      return res.json({
        message:"folder created sucessfully",
        currentUser,
        success:true,
      })

  } catch (error) {
    res.json({
      error: "internal server error",
    });
  }
};
