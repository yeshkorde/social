import { Server } from "socket.io";
import userModle from "./models/userModle.js";
import jwt from "jsonwebtoken";

let io = null;

export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173", // Ensure frontend URL is correct
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  });

  io.on("connection", async (socket) => {
    try {
      const cookie = socket.handshake.headers.cookie;

      if (cookie) {
        if (cookie.startsWith("connect.sid=")) {
          return;
        }

        const token = cookie.split("=")[1].split(";")[0];

        // Verify token safely
        let decoded;
        try {
          decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
          console.error("JWT Verification Failed:", err.message);
          return;
        }

        // Find the user and update their socket ID
        const currentUser = await userModle.findOne({ _id: decoded.id });
        if (!currentUser) return;

        currentUser.SockitId = socket.id;
        await currentUser.save();
      }
    } catch (error) {
      console.error("Socket Connection Error:", error);
    }

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};


export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
