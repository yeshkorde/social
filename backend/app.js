import express from "express";
import dotenv from "dotenv";
import expressSession from "express-session";
import passport from "passport";
import connectDB from "./utils/ConnectDB.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./routes/userRouter.js"
import {Server} from "socket.io"
import http from "http"
import  {initializeSocket} from "./Sockit.js"


const app = express();
dotenv.config();
const server = http.createServer(app)




app.use(cors({ origin: process.env.FRONTEND_URL,credentials:true}));
app.use(cookieParser())



connectDB();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
  })
);



import("./helper/googleStrategy.js");
app.use(passport.initialize());
app.use(passport.session());


initializeSocket(server)

app.use("/api/auth", authRouter);
app.use("/api/user",userRouter)



server.listen(process.env.PORT, () => {
  console.log(`server is runing on port ${process.env.PORT} `);
});

