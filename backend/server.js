import express from "express";
import dotenv from "dotenv";
dotenv.config()

const PORT = process.env.port  || 5000
const app = express()

app.get("/", (req,res) => {
  res.send("Hello New World")
})


app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}` );
} )