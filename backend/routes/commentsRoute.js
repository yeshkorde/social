import {Router} from "express"
import protect from "../helper/protect.js"
import {createCommentController} from "../controller/commentController.js"
const route = Router();


route.post("/createComment",protect,createCommentController)


export default route