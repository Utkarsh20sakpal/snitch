import mongoose from "mongoose";
import userModel from "./user.model.js";


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
        amount: {
            type: Number,
            required: true
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP", "JPY", "CAD", "INR"],
        default: "INR"
    },
   },
   images:[ {
     url:{
        type: String,
        required: true
     }
   }    ]   
},
{timestamps: true}
)

const productModel = mongoose.model("product", productSchema);

export default productModel;