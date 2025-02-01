import mongoose from "mongoose"


const commentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    },
    message:{
        type:String
    },
    likes:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"user"
        }
    ],
    postId:{
        type:String
    }
},{timeseries:true})


export default mongoose.model("comment",commentSchema)