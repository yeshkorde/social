import mongoose from "mongoose";

const folderSchema = mongoose.Schema(
  {
    folderName: {
      type: String,
    },
    postes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "post",
      },
    ],
    isFolder: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("folder", folderSchema);
