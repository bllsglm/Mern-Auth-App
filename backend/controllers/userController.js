import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from '../utils/generateToken.js';


// desc register users
// route POST /api/user/
// @desc Public
const registerUser = asyncHandler(async(req,res) => {
  const {name, email ,password} = req.body;
  const userExist = await User.findOne({email})
  if(userExist){
    throw new Error('User already exist')
  }
  
  const user  = await User.create({name,email,password})
  if(user){
    generateToken(res, user._id)
    res.status(201).json({
      id : user._id,
      name : user.name,
      email : user.email
    })
  }else{
    res.status(400);
    throw new Error("Invalid user data")
  }
})


// desc auth user
// route POST /api/user/auth
// @desc Public
const authUser = asyncHandler(async(req,res) => {
  const {email , password} = req.body;
  const user = await User.findOne({email})

  if(user && await user.matchPassword(password)){
    generateToken(res, user._id)
    res.status(200).json({id : user._id, email: user.email, name : user.name})
  }else{
    res.status(401)
    throw new Error("Invalid email or password");
  }
})


// desc Logout and Destroy Cookie 
// route POST /api/user/logout
// @desc Private
const logoutUser = asyncHandler(async(req,res) => {
  res.clearCookie("jwt")
  res.status(200).json({message : "User Logged out"})
})


// desc Get profile
// route GET /api/user/profile
// @desc Private
const getUser = asyncHandler(async(req,res) => {
  const user = await User.findOne({_id: req.user._id})
  if(user) {
    res.status(200).json({
      name : user.name ,
      id : user._id, 
      email : user.email})
  }else{
    res.status(400)
    throw new Error("User not found")
  }
})

// desc Update profile
// route PUT /api/user/profile
// @desc Private
const updateUser = asyncHandler(async(req,res) => {
  const user = await User.findOne({_id : req.user._id})
  if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    
    if(req.body.password){
      user.password = req.body.password
    }
    
    const updatedUser = await user.save();
    res.status(200).json({
      id : updatedUser._id,
      name: user.name,
      email : user.email,
    })
  }else{
    res.status(400);
    throw new Error("User not found")
   }
})


export {
  registerUser,
  authUser,
  logoutUser,
  getUser,
  updateUser
}