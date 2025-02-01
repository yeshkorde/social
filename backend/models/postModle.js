import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  caption: {
    type: String,
  },
  discription: {
    type: String,
  },
  linkes: [
    {
      type: String,
    },
  ],
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "comment",
    },
  ],
  saved: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  ],
  media: [
    {
      type: String,
    },
  ],
},{timeseries:true});


export default mongoose.model("post",postSchema)