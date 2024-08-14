const mongoose=require("mongoose");

const userModel=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        
    },
    email:{
        type:String,
        unique:true,
        require:true,
    },
    age:{
        type:Number,
    },

});

const User = mongoose.model("User",userModel);
module.exports = User;