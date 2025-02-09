import mongoose from "mongoose";
import userModel from "../models/userModle.js";
import jwt from "jsonwebtoken";
import {v4 as uuid} from "uuid"
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user._json.email });
    if (!user) {
      const newUser = await userModel.create({
        email: req.user._json.email,
        name: req.user._json.name,
        userName:req.user._json.name+"@"+Math.floor(Math.random()*10000),
      });
      req.user = newUser;
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      res.cookie("token", token);
      return res.redirect("http://localhost:5173/");
    } else {
      req.user = user;
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      res.cookie("token", token);
      return res.redirect("http://localhost:5173/");
    }
  } catch (error) {
    console.error(
      "Something went wrong while logging in the user",
      error.message
    );
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};

const logoutController = async (req, res) => {
  try {
    return res
      .cookie("token", "")
      .json({ message: "logout sucessfull ", status: true })
      .status(200);
  } catch (error) {
    console.log("some thing want to logout ", error.message);
    res
      .json({ message: "some thing want wrong to logout you", status: false })
      .status(500);
  }
};



const getMe = async (req, res) => {
  try {
const token = req.cookies;

    const data = jwt.verify(token.token, process.env.JWT_SECRET);
    let currentuser = await userModel.findOne({_id:data.id}).populate({
      path:"Notifications",
      modle:"Notifications",
      populate:{
        path:"sender",
        module:"userModle"
      }
    })
     

    if (!token.token || !currentuser) {
      return res.json({ message: "not outanticated user ", status: false });
    }
    req.user = currentuser;    
   return res.json({message:"login sucess",currentuser,status:true})
  } catch (error) {
    console.log("some thing wrong in get me ",error.message);
  }
};

export default { loginController, logoutController, getMe };
