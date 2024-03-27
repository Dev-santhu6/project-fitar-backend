import jwt  from "jsonwebtoken"
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";


 const protect = asyncHandler(async(req,res,next)=>{
 let token;
 
 token =req.cookies.jwt;
 if(token){
    try{
           const decoded = jwt.verify(token,process.env.JWT_SECRET);

           req.user= await User.findById(decoded.userId).select('-password');
           next();
      
    
        req.user = decoded;
        next();

    } catch (error){
        res.status(401);
        throw new Error("Not authorized,invaild token");
    }
} else{
    res.status(401);
    throw new Error("Not authorized,no token");
}
 });

 
//this is isAdmin 
// const isAdmin = asyncHandler(async (req, res, next) => {
// const { email} = req.user;
// const adminUser = await User.findOne({ email });
// console.log(adminUser);
// if (adminUser.role !== "admin") {
// throw new Error("You are not an admin");
// } else {
// next();
// }
// });



const isAdmin = (req, res, next) => {
    const { user } = req; // Assuming you store user information in req.user
  
    if (user && user.email === process.env.ADMIN) {
      // User is an admin
      req.isAdmin = true;
    } else {
      req.isAdmin = false;
    }
  
    next();
  };

export { protect, isAdmin}