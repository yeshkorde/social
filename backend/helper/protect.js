import jwt from "jsonwebtoken";
import userModle from "../models/userModle.js";

const protect = async (req, res, next) => {
  try {
    const token = req.cookies;

    if (!token.token) {
      return res.json({ message: "not outanticated user ", status: false });
    }
    const data = jwt.verify(token.token, process.env.JWT_SECRET);
    const currentuser = await userModle.findOne({ _id: data.id });
    req.user = currentuser;
    next();
  } catch (error) {
    console.log("some thing want wrong to protact", error.message);
    return res.json({message:error.message,status:false})
  }
};

export default protect;
