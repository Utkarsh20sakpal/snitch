import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({

 email:{type:String, required:true, unique:true},
 contact:{type:String, required:true, unique:true},
 password:{type:String, required:true},
 fullName:{type:String, required:true},
 role:{
    type:String,
    enum:["buyer","seller"],
    deafault:"buyer"
 }

})


//so here pre is a middleware that will run before saving
//  the user to the database. It will hash the password if 
// it has been modified. This is important for security reasons, 
// as we don't want to store plain text passwords in the database.


userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})



userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}




const userModel = mongoose.model("User", userSchema);

export default userModel;