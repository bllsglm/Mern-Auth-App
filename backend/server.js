import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config()
import ConnectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const PORT = process.env.port  || 5000;
connectDB();
const app = express()

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


app.get("/", (req,res) => {
  res.send("Hello New World")
})


app.use("/api/users", userRoutes)

app.use(errorHandler)
app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}` );
} )