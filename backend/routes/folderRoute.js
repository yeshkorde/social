import {Router} from "express"
import protect from "../helper/protect.js"
import {createFolderController} from "../controller/folderController.js"


const route = Router()


route.post("/createFolder",protect,createFolderController)

export default route