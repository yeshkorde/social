import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
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
      isReaded:[
        {
            type:Boolean,
            default:false,
            userId:mongoose.Schema.ObjectId,
            ref:"user"
        }
      ]
},{timestamps:true})


export default mongoose.model("status",statusSchema)