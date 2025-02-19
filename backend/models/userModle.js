import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    SockitId: {
      type: String,
      default: "",
    },
    userName: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
    },
    Dob: {
      type: String,
    },
    name: {
      type: String,
    },
    profileImage: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png",
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    linkes: [
      {
        type: String,
      },
    ],
    postes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "post",
      },
    ],
    status: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "status",
      },
    ],
    reels: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "reels",
      },
    ],
    chates: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "chat",
      },
    ],
    saved: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "saved",
      },
    ],
    Notifications: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Notifications",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
    ],
    fileId: {
      type: String,
      default: "",
    },
  },
  { timestamps:true }
);

export default mongoose.model("user", userSchema);
