import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const verifytoken=(req,res,next)=>{
    const authHeader=req.headers.authorization;
console.log(authHeader)
    if(authHeader===undefined){
      return res.status(401).send("no token")
     
    }
      let token=authHeader.split(" ")[1];
      console.log(token)
      jwt.verify(token,"secretkey",(err,decoded)=>{
        if(err){
         return res.status(500).send(err)
        }
        else{
            
         req.users=decoded
         console.log("decoded",decoded)
        console.log(req.users)
          next()
        }
      })
      
    
    
    }
  
    export const isAdmin = async (req, res, next) => {
      try {
        const user = await User.findById(req.users._id);
    
        if (!user) {
         
          return res.status(404).send({ success: false, message: "User not found" });
        }
    
        if (user.role !== 1) {
          
          return res.status(401).send({ success: false, message: "Unauthorized" });
        }
    
        next();
      } catch (err) {
        console.log(err);
        // Handle the error and send an appropriate response
        res.status(500).send({ success: false, message: "Internal Server Error" });
      }
    };
    
      
   
    