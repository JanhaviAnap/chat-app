import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());
//app.use(cors());
console.log("process.env.IP_URL: ",process.env.IP_URL);
app.use(cors({origin: process.env.IP_URL,credentials: true}));


const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

// try {
//     mongoose.connect(URI);
//     console.log("Connected to MongoDB");
// } catch (error) {
//     console.log(error);
// }

async function connectWithRetry() {
    try {
        await mongoose.connect(URI);
        console.log("Connected to MongoDB ✅");
    } catch (err) {
        console.error(URI,"\n>>>MongoDB connection unsuccessful, retrying in 5 seconds... 🔄", err);
        setTimeout(connectWithRetry, 5000);
    }
}

// Start trying to connect
connectWithRetry();


//routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

server.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});
