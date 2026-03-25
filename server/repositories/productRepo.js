import Product from "../models/Product.js";

export const createProduct = (data)=>Product.create(data);

export const getAllProducts = ()=>Product.find().populate("category", "name");

export const getProductById = (id)=>Product.findById(id).populate("category", "name");

export const updateProduct = (id,data)=>
Product.findByIdAndUpdate(id,data,{new:true});

export const deleteProduct = (id)=>
Product.findByIdAndDelete(id);