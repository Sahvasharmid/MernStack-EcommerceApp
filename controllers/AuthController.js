import userModel from '../models/userModel.js'
import bcrypt from "bcrypt"

import jwt from "jsonwebtoken";

export const loginController=async(req,res)=>{
    const{email,password}=req.body
    try{
        
 const loginresult=await userModel.findOne({email})
    if(!loginresult){
        return res.status(403).send('User not found');  
    }

  const match = await bcrypt.compare(password,loginresult.password);
  
    if (match) {
      const token=jwt.sign({_id:loginresult._id},"secretkey",{expiresIn:'24h'})

      return res.status(200).send({success:true,token:token,message:"success",loginresult:{email:loginresult.email,
        username:loginresult.username,
        phoneno:loginresult.phoneno,
        address:loginresult.address,
        role:loginresult.role
       }});
    } else {
      return res.status(401).send('Invalid credentials');
    
    }
  } 
      

    catch(err){
console.log(err)
    }
}
 export const registerController=async(req,res)=>{
        const{username,email,password,phoneno,address,answer}=req.body
        
    try {
      if (!username || !email || !password || !phoneno || !address || !answer) {
          return res.status(400).send({ error: "All fields are required" });
      }
          //check user
          const exisitingUser = await userModel.findOne({ email });
          //exisiting user
          if (exisitingUser) {
            return res.status(200).send({
              success: false,
              message: "Already Register please login",
            });
          }
             const hashedPassword = await bcrypt.hash(password, 7);

        const Userobj=new userModel({username,email,password:hashedPassword,phoneno,address,answer})
        await Userobj.save()
        res.status(200).send({
            success:true,
            message:"user created",
            Userobj
        })
        }
        catch(err){
          console.log(err)
    return res.status(500).send({
      
        success:false,
        message:"error in registration",
        
    })
        }
    }



    export  const protectedController=async(req,res)=>{
        res.status(200).json({ok:true})
      }
     export const forgotPasswordController=async(req,res)=>{
try{const{email,newpassword,answer}=req.body
if(!email||!newpassword||!answer){
return  res.status(400).send("Send all fields")
}
const userResult=await userModel.findOne({email,answer})
if(!userResult){
 return res.status(401).send("user not found")
}

const hashedPassword = await bcrypt.hash(newpassword, 7);
const Updateresult=await userModel.findByIdAndUpdate(userResult._id,{password:hashedPassword})
return res.status(200).send({
  success:true,
  message:"password reset succesfull",
  Updateresult

})
}
catch(err){
  console.log(err)
 return res.status(500).send({
    success:false,
    message:"not success"
  })
}
      }
    export  const adminController=async(req,res)=>{
return res.status(200).json({ok:true})
      }
export const updateProfileController = async (req, res) => {
        try {
          console.log(req.users)
          const { username, email, password, address, phoneno } = req.body;
          const user = await userModel.findById(req.users._id);
          //password
          if (password && password.length < 6) {
            return res.json({ error: "Passsword is required and 6 character long" });
          }
        const hashedPassword = await bcrypt.hash(password, 7);
        
          const updatedUser = await userModel.findByIdAndUpdate(
            req.users._id,
            {
              username: username || user.name,
              password: hashedPassword || user.password,
              phoneno: phoneno || user.phoneno,
              address: address || user.address,
            },
            { new: true }
          );
          res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
          });
        } catch (error) {
          console.log(error);
          res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
          });
        }
      };
