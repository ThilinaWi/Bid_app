const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');

const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: "1d"});
   };

const registerUser = asyncHandler(async(req,res)=>{
    const{name,email,password,} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("please fill in all required field");
    }


  const userExits = await User.findOne({ email });
  if (userExits) {
    res.status(400);
    throw new Error("email is already use or exist");
  }

    const user = await User.create({
        name,
        email,
        password,
    });

   const token = generateToken(user._id);
   res.cookie("token", token, {
    path: "/", 
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day from
    samesite: "none",
    secure: true,
 });


 if (User){
    const { _id, name, email, photo, role} = user;
    res.status(201).json({_id,name,email,photo,role });
 }else{
    res.status(400);
    throw new Error("Invalid user data");
 }


});

module.exports = {
   registerUser,
};