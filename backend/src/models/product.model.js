import mongoose from "mongoose";
import userModel from "./user.model.js";
import priceSchema from "./priceSchema.model.js";


const productSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
     seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required: true    
    },
    price:{
        type: priceSchema,
        required: true
   },
   images:[ {
     url:{
        type: String,
        required: true
     }
   }    ]  ,

    variants: [
        {
            images: [
                {
                    url: {
                        type: String,
                        required: true
                    }
                }
            ],
            stock: {
                type: Number,
                default: 0
            },
            attributes: {
                type: Map,
                of: String
            },
            price: {
                type: priceSchema,
            }
        },

    ],

},
{timestamps: true}
)

const productModel = mongoose.model("product", productSchema);

export default productModel;