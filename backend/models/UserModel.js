const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"Please provide your name"],
    },
    email:{
        type:String,
        require:[true,"Please provide your email"],
       // unique:true,
    },
    password:{
        type:String,
        require:[true,"Please provide your password"],
    },
    photo:{
        type:String,
        require:[true,"Please provide your photo"],
        default:"",
    },
    role:{
        type:String,
        enum:["Admin","buyer","seller"],
        default:"buyer",
    },
    commisionbalance:{
        type:Number,
        default:0,
    },
    balance:{
        type:Number,
        default:0,
    },
 },
   {timestamps:true}
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(this.password,salt);
    this.password = hashedPassword;
    next();
    
});

const User = mongoose.model("User",userSchema);
module.exports = User;

