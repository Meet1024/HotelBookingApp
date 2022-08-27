import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import hotelRoute from "./routes/hotels.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js"
import roomRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";


const app = express()

dotenv.config()


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to db")
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("Disconnected")
})

mongoose.connection.on("connected", () => {
    console.log("connected")
})


app.use(express.json())
app.use(cookieParser())
app.use("/api/hotels", hotelRoute)
app.use("/api/rooms", roomRoute)
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)

app.use((err, req, res, next) => {

})
app.listen(8800, () => {
    connect()
    console.log("Connected to Backend.")
})