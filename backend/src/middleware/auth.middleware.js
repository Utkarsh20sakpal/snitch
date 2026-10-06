import jwt from "jsonwebtoken";
import  userModel  from "../models/user.model.js";
import { config } from "../config/config.js";



const authenticateSeller = async (req, res, next) => {

const token = req.cookies.token;

if(!token){
    return re.status(401).json({
        message:"Unauthorized Access"
    })
}

try{

    const decoded = jwt.verify(token, config.JWT_SECRET);
   
    const user = await userModel.findById(decoded.id);

    if(!user){
        return res.status(401).json({
            message : "invalid credentials"
        })
    }

    if(user.role !== "seller"){

        return res.status(403).json({
            message: "Access denied - Only sellers are allowed to perform this action"
        })
    }
    req.user = user;
    next();
}

catch(err){

    console.error(err);
    return res.status(500).json({
        message: "Server error"
    })

}

}

export default authenticateSeller;