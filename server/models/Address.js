import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
{
userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

firstName:String,
lastName:String,
company:String,
street:String,
email:String,
phone:String,
country:String,
state:String,
zip:String,

isDefault:{
type:Boolean,
default:false
}

},
{timestamps:true}
);

export default mongoose.model("Address",addressSchema);