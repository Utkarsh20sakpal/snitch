import express from "express";
import  authenticateSeller  from "../middleware/auth.middleware.js";
import { createProduct , getSellerProducts , getAllProducts, getProductById} from "../controller/product.controller.js";
import multer from "multer";
import {createProductValidator} from "../validator/product.validator.js";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }
})


const router = express.Router();

/** 
@route POST /api/products
@description Create a new product
@access Private (Seller only)
*/

router.post("/" , authenticateSeller ,   upload.array("images" , 7) , createProductValidator, createProduct);


/**
 * @route GET /api/products/seller
 * @description Get all products for the authenticated seller
 * @access Private (Seller only)
 */

router.get("/seller" ,authenticateSeller , getSellerProducts)


/**
 * @route GET /api/products
 * @description Get all products 
 * @access Public
 */

router.get("/" , getAllProducts)

/**
 * @route GET /api/products/:id
 * @description Get single product by id
 * @access Public
 */
router.get("/:id", getProductById);


export default router;