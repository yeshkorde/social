import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  roomId: {
    type: String,
  },
  messages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "message",
    },
  ],
  isGroupChat: {
    type: Boolean,
    default: false,
  },
  pareciens: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  ],
},{timestamps:true});


export default mongoose.model("chat",chatSchema);