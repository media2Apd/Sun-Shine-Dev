import mongoose from "mongoose";


const reviewSchema=new mongoose.Schema({

productId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Product"
},

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

rating:{
type:Number,
required:true
},

comment:String,


isVerifiedPurchase:{
type:Boolean,
default:false
}

},
{timestamps:true}
);


export default mongoose.model("Review",reviewSchema);