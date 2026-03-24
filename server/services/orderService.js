import * as repo from "../repositories/orderRepo.js";
import Product from "../models/Product.js";
import razorpay from "../config/razorpay.js";

export const createOrder=async(body)=>{

for(const item of body.items){

const product=await Product.findById(item.productId);

if(!product)
throw new Error("Product not found");


if(product.variants[item.variantIndex].stock < item.quantity)

throw new Error("Insufficient stock");


product.variants[item.variantIndex].stock -= item.quantity;

await product.save();

}

return repo.createOrder(body);

};


export const cancelOrder=async(orderId)=>{

const order=await repo.getOrderById(orderId);

if(!order)
throw new Error("Order not found");


for(const item of order.items){

const product=await Product.findById(item.productId);

product.variants[item.variantIndex].stock += item.quantity;

await product.save();

}

return repo.updateOrder(orderId,{
status:"Cancelled"
});

};


export const updateOrderStatus=(id,data)=>
repo.updateOrder(id,data);


export const getOrders=()=>repo.getOrders();

export const getOrderById=(id)=>repo.getOrderById(id);

export const deleteOrder=(id)=>repo.deleteOrder(id);

export const createRazorpayOrder = async(body)=>{

const razorpayOrder = await razorpay.orders.create({

amount: body.total * 100,

currency:"INR",

receipt:"receipt_"+Date.now()

});


const order = await Order.create({

...body,

paymentMethod:"ONLINE",

razorpayOrderId: razorpayOrder.id

});


return {

order,

razorpayOrder

};

};