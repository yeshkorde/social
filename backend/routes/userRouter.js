import { Router } from "express";
import {
  searchUsers,
  updateProfileImageController,
  followController,
  ChickNotification,
  getAllPostsController,
} from "../controller/userController.js";
import protect from "../helper/protect.js";
import upload from "../helper/multer.js";

const route = Router();

route.get("/SearchUsers", protect, searchUsers);

route.post(
  "/UpdateProfileImage",
  protect,
  upload.single("file"),
  updateProfileImageController
);

route.post("/follow", protect, followController);

route.post("/chickNotifications", ChickNotification);

route.get("/getAllPostes", protect, getAllPostsController);


route.post("/savePost",protect)

export default route;
