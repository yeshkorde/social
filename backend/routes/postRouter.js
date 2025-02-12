import {Router} from "express"
import {createPostControlller,feedPostController} from "../controller/postControlle.js"
import protect from "../helper/protect.js"
import upload from "../helper/multer.js"

const route = Router()


route.post("/createPost",upload.array("file",7),protect,createPostControlller)
route.get("/feedPostes",protect,feedPostController)





export default  route