import express from "express";
import { isAdmin, verifytoken } from "../middlewares/AuthMiddleware.js";
import {CategoryController,updateController, getCategoryController, getSingleCatgeory, deleteCategoryController} from "../controllers/CategoryController.js";

const router = express.Router();




router.post("/createnew",verifytoken,isAdmin,CategoryController)

router.put("/updatecategory/:id",verifytoken,isAdmin,updateController)

router.get("/getcategory",getCategoryController)
router.get("/getsinglecategory/:slug",getSingleCatgeory)
router.delete("/deletecategory/:id",verifytoken,isAdmin,deleteCategoryController)

export default router;