import {Router} from "express"
import passport from "passport";
import auth from "../controller/authController.js";
import protect from "../helper/protect.js";

const route = Router();

route.get("/google", passport.authenticate("google",  { scope: ['profile', 'email'] }))

route.get(
    "/google/callback",passport.authenticate("google", { failureRedirect: "/" }),auth.loginController);

route.get("/getMe",protect,auth.getMe)


route.get("/logout",auth.logoutController)    

export default route;