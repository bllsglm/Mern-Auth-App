
import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUser,
  updateUser
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";


router.post("/", registerUser )
router.post("/auth", authUser )
router.post("/logout",logoutUser)
router.route("/profile").get(protect, getUser).put(protect,updateUser)


export default router