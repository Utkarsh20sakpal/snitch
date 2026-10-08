import productModel from "../models/product.model.js";
import  uploadFile  from "../services/storage.services.js";


export async function createProduct (req, res)  {


    const { title, description, priceAmount, priceCurrency } = req.body;

    const seller = req.user;

    const images = await Promise.all(req.files.map(async (file) => {

        const url = await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname,
        
        })
        return { 
            url
        }
       
    }))

    const product = await productModel.create({
        title,
        description,
        price:{
            amount: Number(priceAmount),
            currency: priceCurrency || "INR"
        },
        seller: seller._id,
        images,
    })

    res.status(201).json({
        message: "Product created successfully",
       success: true,
        product
    })

}

export async function getSellerProducts(req, res) {

    const seller = req.user;

    const products = await productModel.find({ seller: seller._id });

    res.status(200).json({
        message: "Products fetched successfully",
        success: true,
        products
    })
}