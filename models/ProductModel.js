import mongoose from "mongoose";
const ProductDetailsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
},
slug:{
    type:String,
    required:true,
   
},
description:{
    type:String,
 required:true},
price:{
    type:Number,
    required:true,

},
Category:{
    type:mongoose.ObjectId,
    ref:'ProductCategory'
},
quantity:{
    type:Number,
    required:true
},
photo:{
  
    data:Buffer,
    contentType:String,

},

shipping: {
    type: Boolean,
    default: false, 
  },
},
{
    timestamps:true
}
)
const ProductSet=mongoose.model("ProductDetails",ProductDetailsSchema)
export default ProductSet;