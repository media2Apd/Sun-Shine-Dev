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
import * as crypto from "crypto";
import Review from "../models/Review.js";
import mongoose from "mongoose";

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

// export const getOrderById = (id) => repo.getOrderById(id);

// export const getOrderById = async (orderId) => {

//   const order = await repo.getOrderById(orderId);

//   if (!order)
//     throw new Error("Order not found");

//   const updatedItems = await Promise.all(

//     order.items.map(async (item) => {

//       const review = await Review.findOne({
//         productId: new mongoose.Types.ObjectId(item.productId._id),
//         userId: new mongoose.Types.ObjectId(order.customerId),
//         variantId: new mongoose.Types.ObjectId(item.variantId) // ⭐ missing piece
//       }).select("rating comment images");

//       return {
//         ...item.toObject(),
//         review: review || null
//       };

//     })

//   );

//   order.items = updatedItems;

//   return order;

// };

export const getOrderById = async (orderId, userId) => {

  const order = await repo.getOrderById(orderId);

  if (!order)
    throw new Error("Order not found");

  if (order.customerId.toString() !== userId.toString()) {
    throw new Error("Unauthorized access");
  }

  const updatedItems = await Promise.all(

    order.items.map(async (item) => {

      const productId =
        item.productId?._id || item.productId;

      const review = await Review.findOne({
        productId,
        userId
      }).select("rating comment images");

      console.log("CHECK REVIEW:", review);

      return {
        ...item.toObject(),
        review: review || null,
        isReviewed: !!review
      };

    })

  );

  const orderObj = order.toObject(); // 🔥 FIX

  orderObj.items = updatedItems;

  return orderObj;
};

export const updateOrderStatus = (id, data) =>
  repo.updateOrder(id, data);

export const deleteOrder = (id) => repo.deleteOrder(id);

// ✅ RAZORPAY
// export const createRazorpayOrder = async (body, userId) => {
//   const razorpayOrder = await razorpay.orders.create({
//     amount: body.total * 100,
//     currency: "INR",
//     receipt: "receipt_" + Date.now(),
//   });

//   const order = await Order.create({
//     ...body,
//     customerId: userId,
//     paymentMethod: "ONLINE",
//     razorpayOrderId: razorpayOrder.id,
//   });

//   return { order, razorpayOrder };
// };
export const createRazorpayOrder = async (body, userId) => {

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

    // reduce stock
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

  // create razorpay order
  const razorpayOrder = await razorpay.orders.create({
    amount: body.total * 100,
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  });

  // create DB order
  const order = await Order.create({
    ...body,

    orderId: razorpayOrder.id,

    customerId: userId,

    items: itemsWithSnapshot,

    paymentMethod: "ONLINE",

    razorpayOrderId: razorpayOrder.id,

    paymentStatus: "Pending",

    status: "Pending",
  });



  return { order, razorpayOrder };

};
export const verifyRazorpayPayment = async (body, userId) => {

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(
      razorpay_order_id + "|" + razorpay_payment_id
    )
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    throw new Error("Payment verification failed");
  }

  const order = await Order.findOneAndUpdate(
    { orderId: razorpay_order_id },
    {
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      paymentStatus: "SUCCESS",
      status: "Placed"
    },
    { new: true }
  );

    // clear cart after order creation
  await Cart.deleteMany({ userId });

  return order;
};


export const getAllOrders = (filters) => {

return repo.getAllOrders(filters);

};
