import mongoose from "mongoose";


const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to database ...... .....");
        
    } catch (error) {
        console.log("some thing want wrong to connect to DB",error.message);
        process.exit(1);
    }
}

export default connectDB;