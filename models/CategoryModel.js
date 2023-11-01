import mongoose from "mongoose"


const ProductCatSchema=new mongoose.Schema({
    categoryname:{
        type:String,
        required:true,
},
slug:{
    type:String,
    lowercase:true
}
})
const CategoryDetails=mongoose.model("ProductCategory",ProductCatSchema)
export default CategoryDetails;