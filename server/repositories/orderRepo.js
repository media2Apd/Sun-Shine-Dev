import Order from "../models/Order.js";

export const createOrder=(data)=>Order.create(data);

export const getOrders=()=>Order.find()
.populate("items.productId");

export const getOrderById=(id)=>
Order.findById(id).populate("items.productId");

export const updateOrder=(id,data)=>
Order.findByIdAndUpdate(id,data,{new:true});

export const deleteOrder=(id)=>
Order.findByIdAndDelete(id);
