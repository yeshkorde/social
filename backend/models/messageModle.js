import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    },
    reciver:{
           type:mongoose.Schema.ObjectId,
        ref:"user"
    },
    message:{
        type:String
    },
    media:{
        type:String
    },
    like:{
        type:Boolean,
        default:false,
    },
    isReaded:{
        type:Boolean,
        default:false
    }
},{timeseries:true})

export default mongoose.model("message",messageSchema)