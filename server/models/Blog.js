import mongoose from "mongoose";

const blockSchema = new mongoose.Schema({

type:{
type:String,
enum:[
"heading",
"paragraph",
"list",
"image",
"quote",
"faq",
"tip"
]
},

value:String

});


const blogSchema = new mongoose.Schema({

title:{
type:String,
required:true
},

slug:{
type:String,
required:true,
unique:true
},

category:String,

author:String,

publishDate:Date,

metaTitle:String,

metaDescription:String,

featuredImage:{
url:String,
publicId:String
},

status:{
type:String,
enum:["Draft","Published"],
default:"Draft"
},

content:[blockSchema]

},{timestamps:true});


export default mongoose.model(
"Blog",
blogSchema
);