import {Router} from "express"
import {createPostControlller,feedPostController,likePostControler} from "../controller/postControlle.js"
import protect from "../helper/protect.js"
import upload from "../helper/multer.js"

const route = Router()


route.post("/createPost",upload.array("file",7),protect,createPostControlller)
route.get("/feedPostes",protect,feedPostController);
route.post("/likePost",protect,likePostControler)





export default  route