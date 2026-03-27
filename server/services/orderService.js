// import * as repo from "../repositories/orderRepo.js";
// import Product from "../models/Product.js";
// import {razorpay} from "../config/razorpay.js";

// export const createOrder=async(body)=>{

// for(const item of body.items){

// const product=await Product.findById(item.productId);

// if(!product)
// throw new Error("Product not found");


// if(product.variants[item.variantIndex].stock < item.quantity)

// throw new Error("Insufficient stock");


// product.variants[item.variantIndex].stock -= item.quantity;

// await product.save();

// }

// return repo.createOrder(body);

// };


// export const cancelOrder=async(orderId)=>{

// const order=await repo.getOrderById(orderId);

// if(!order)
// throw new Error("Order not found");


// for(const item of order.items){

// const product=await Product.findById(item.productId);

// product.variants[item.variantIndex].stock += item.quantity;

// await product.save();

// }

// return repo.updateOrder(orderId,{
// status:"Cancelled"
// });

// };


// export const updateOrderStatus=(id,data)=>
// repo.updateOrder(id,data);


// export const getOrders=()=>repo.getOrders();

// export const getOrderById=(id)=>repo.getOrderById(id);

// export const deleteOrder=(id)=>repo.deleteOrder(id);

// export const createRazorpayOrder = async(body)=>{

// const razorpayOrder = await razorpay.orders.create({

// amount: body.total * 100,

// currency:"INR",

// receipt:"receipt_"+Date.now()

// });


// const order = await Order.create({

// ...body,

// paymentMethod:"ONLINE",

// razorpayOrderId: razorpayOrder.id

// });


// return {

// order,

// razorpayOrder

// };

// };

import * as repo from "../repositories/orderRepo.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import { razorpay } from "../config/razorpay.js";
import Cart from "../models/Cart.js";

// ✅ CREATE ORDER
export const createOrder = async (body, userId) => {
  const itemsWithSnapshot = [];

    for (const item of body.items) {
    const product = await Product.findById(item.productId);

    if (!product) throw new Error("Product not found");

    const variant = product.variants.find(
        (v) => v._id.toString() === item.variantId
    );

    if (!variant) throw new Error("Invalid variant");

    if (variant.stock < item.quantity)
        throw new Error("Insufficient stock");

    variant.stock -= item.quantity;
    await product.save();

    itemsWithSnapshot.push({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        price: item.price,
        name: product.name,
        image: product.images?.[0]?.url,
    });
    }

  const order = {
    ...body,
    orderId: "ORD-" + Date.now(),
    customerId: userId,
    items: itemsWithSnapshot,
  };

  const createdOrder = await repo.createOrder(order);

    // 🔥 CLEAR CART
    await Cart.deleteMany({ userId });

    return createdOrder;
};

// ✅ CANCEL ORDER
export const cancelOrder = async (orderId) => {
  const order = await repo.getOrderById(orderId);

  if (!order) throw new Error("Order not found");

  if (order.status === "Cancelled")
    throw new Error("Already cancelled");

  for (const item of order.items) {
    const product = await Product.findById(item.productId);

    if (!product) continue;

    const variant = product.variants.find(
      (v) => v._id.toString() === item.variantId
    );

    if (!variant) continue;

    variant.stock += item.quantity;
    await product.save();
  }

  return repo.updateOrder(orderId, { status: "Cancelled" });
};

// ✅ GET ORDERS (USER BASED)
export const getOrders = (userId) => repo.getOrders(userId);

export const getOrderById = (id) => repo.getOrderById(id);

export const updateOrderStatus = (id, data) =>
  repo.updateOrder(id, data);

export const deleteOrder = (id) => repo.deleteOrder(id);

// ✅ RAZORPAY
export const createRazorpayOrder = async (body, userId) => {
  const razorpayOrder = await razorpay.orders.create({
    amount: body.total * 100,
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  });

  const order = await Order.create({
    ...body,
    customerId: userId,
    paymentMethod: "ONLINE",
    razorpayOrderId: razorpayOrder.id,
  });

  return { order, razorpayOrder };
};


export const getAllOrders = (filters) => {

return repo.getAllOrders(filters);

};