import path from "path"
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config()
import ConnectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import connectDB from "./config/db.js";
import { errorHandler, notfound } from "./middlewares/errorMiddleware.js";

const PORT = process.env.port  || 5000;
connectDB();
const app = express()

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


app.use("/api/users", userRoutes)

//set __dirname to current directory
const __dirname = path.resolve()
if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")))

  //any route that is not api/users is going to load that index.html
  app.get('*', (req,res)=> {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  })
}else{
  //if we are in development, we dont need to load the index.html.Because we are using the Vite dev server or create-react-app dev server
  app.get('/', (req,res)=> {
    res.send("API is running")
  })
}






app.use(notfound)
app.use(errorHandler)

app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}` );
} )