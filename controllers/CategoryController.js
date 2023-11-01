import slugify from "slugify";
import CategoryDetails from "../models/CategoryModel.js"


export const CategoryController=async(req,res)=>{
    const{categoryname}=req.body
 
    try{
        if(!categoryname){
            return res.status(400).json("send all fields")       
         }
         const existingCategory=await CategoryDetails.findOne({categoryname})
if(existingCategory){
   return res.status(200).send({success:true,
    message:"already exists"})
}
    const Categoryobj=new CategoryDetails({categoryname,slug:slugify(categoryname)})
    await Categoryobj.save()
    res.status(200).send({
        success:true,
        message:"user created",
        Categoryobj
    })
    }
    catch(err){
return res.status(500).send({
    success:false,
    message:"error in registration",
    err
})
    }

}
export const updateController=async(req,res)=>{
    try{
 const {id}=req.params   
 const{categoryname}=req.body
 const update=await CategoryDetails.findByIdAndUpdate(id,{categoryname,slug:slugify(categoryname)},{new:true})
 if(!update){
    return res.status(400).send({success:false,message:"not found"})

 }
 else{
    return res.status(200).send({success:true,message:"updated",update})
 }}
 catch(err){
    console.log(err)
 }
}
export const getCategoryController=async(req,res)=>{
    try{
    
const getCategory=await CategoryDetails.find({})
return res.status(200).send({success:true,getCategory})
    }
    catch(err){
return res.status(500).send(err)
    }
}
export const getSingleCatgeory=async(req,res)=>{
    try{
const{slug}=req.params;
const getSingleCategory=await CategoryDetails.findOne({slug})
if(!getSingleCategory){
    return res.status(400).send({success:false,message:"notfound"})
}
return res.status(200).send({success:true,getSingleCategory})
    }
    catch(err){

    }
}
export const deleteCategoryController=async(req,res)=>{
    try{
    const{id}=req.params
    const deleteresult=await CategoryDetails.findByIdAndDelete(id)
    if(!deleteresult){
        return res.status(400).send({success:false,message:"not found"})
    }
    else{
        return res.status(200).send({success:true,message:"deleted",deleteresult})
    }
}
catch(err){
    return res.status(500).send(err)
}
}

