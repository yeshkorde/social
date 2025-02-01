import {Router} from "express"
import { searchUsers,updateProfileImageController } from "../controller/userController.js";
import protect from "../helper/protect.js";
import upload from "../helper/multer.js";

const route = Router();


route.get("/SearchUsers",protect,searchUsers)
route.post("/UpdateProfileImage",protect,upload.single("file"),updateProfileImageController)

export default route