import Product from "../models/Product.js";
import mongoose from "mongoose";

export const createProduct = (data)=>Product.create(data);

export const getAllProducts = ()=>Product.find().populate("category", "name");

export const getProductById = (id)=>Product.findById(id).populate("category", "name");

export const updateProduct = (id,data)=>
Product.findByIdAndUpdate(id,data,{new:true});

export const deleteProduct = (id)=>
Product.findByIdAndDelete(id);

export const getProductBySlugOrIdRepo = async (slugOrId) => {

  let query = {};

  if (mongoose.Types.ObjectId.isValid(slugOrId)) {
    query._id = slugOrId;
  } else {
    query.slug = slugOrId;
  }

  return Product.findOne(query).populate("category");

};