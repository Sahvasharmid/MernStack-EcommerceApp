import express from 'express'
const router=express.Router()
import {verifytoken,isAdmin} from "../middlewares/AuthMiddleware.js"
import formidable from "express-formidable";
import {createProdController, getAllproductsController, getSingleprodController, productPhotoController,getCategoryProductController,realtedProductController,searchProductController,productPageController, deleteProductController, deleteAllProductsController,UpdateProdController,productFilterController,productCountController } from "../controllers/ProdController.js"
router.post("/createproduct",verifytoken,isAdmin,formidable(),createProdController)
router.get("/getallproducts",getAllproductsController)
router.get("/getsingleproduct/:slug",getSingleprodController)
router.get("/getproductphoto/:id",productPhotoController)
router.delete("/deleteproduct/:id",deleteProductController)
router.put("/updateproduct/:id",verifytoken,isAdmin,formidable(),UpdateProdController)
router.delete('/deleteAllProducts', deleteAllProductsController);
router.post("/product-filters",productFilterController)
router.get("/product-count",productCountController)
router.get("/product/:page",productPageController)
router.get("/search/:keyword", searchProductController);
router.get("/related-product/:pid/:cid", realtedProductController);
router.get("/categories/:slug",getCategoryProductController)
export default router;
