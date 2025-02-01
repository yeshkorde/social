import mongoose from "mongoose";
import userModel from "../models/userModle.js";
import jwt from "jsonwebtoken";

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user._json.email });
    if (!user) {
      const newUser = await userModel.create({
        email: req.user._json.email,
        name: req.user._json.name,
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
    let currentuser = await userModel.aggregate([
      {
        $match:{_id:new mongoose.Types.ObjectId(data.id)}
      },
    ])

    currentuser = currentuser[0]

    if (!token.token || !currentuser) {
      return res.json({ message: "not outanticated user ", status: false });
    }
    req.user = currentuser;    
   return res.json({message:"login sucess",currentuser,status:true})
  } catch (error) {
    console.log(error.message);
  }
};

export default { loginController, logoutController, getMe };
