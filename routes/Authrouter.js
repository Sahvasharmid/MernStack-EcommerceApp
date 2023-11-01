import express from "express";
import {
  registerController,
  loginController,
  adminController,
  protectedController,
  forgotPasswordController,
  updateProfileController,

} from "../controllers/AuthController.js";
import { isAdmin,verifytoken } from "../middlewares/AuthMiddleware.js";
const router=express.Router()

router.get("/",(req,res)=>{
  res.send("hello")
})

router.post("/login",loginController)
router.post("/register",registerController)

router.get("/privateroute",verifytoken,protectedController)
router.post("/forgotpassword",forgotPasswordController)
router.get("/adminroute",verifytoken,isAdmin,adminController)
router.put("/profile", verifytoken, updateProfileController);

export default router;