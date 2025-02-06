import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    sender:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isSeen: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["follow", "warning", "success", "error", "alert", "reminder"],
      required: true,
      default: "info",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notifications", notificationSchema);
