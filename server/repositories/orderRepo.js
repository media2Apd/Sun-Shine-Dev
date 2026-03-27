// import Order from "../models/Order.js";

// export const createOrder=(data)=>Order.create(data);

// export const getOrders=()=>Order.find()
// .populate("items.productId");

// export const getOrderById=(id)=>
// Order.findById(id).populate("items.productId");

// export const updateOrder=(id,data)=>
// Order.findByIdAndUpdate(id,data,{new:true});

// export const deleteOrder=(id)=>
// Order.findByIdAndDelete(id);


import Order from "../models/Order.js";


export const createOrder = (data) => Order.create(data);

export const getOrders = (userId) =>
  Order.find({ customerId: userId, isDeleted: false })
    .sort({ createdAt: -1 })
    .populate("items.productId");

export const getOrderById = (id) =>
  Order.findById(id).populate("items.productId");

export const updateOrder = (id, data) =>
  Order.findByIdAndUpdate(id, data, { new: true });

export const deleteOrder = (id) =>
  Order.findByIdAndUpdate(id, { isDeleted: true });

export const getAllOrders = async (filters) => {

const { startDate, endDate, status } = filters;

let query = {

isDeleted: false

};


/*
STATUS FILTER
*/
if (status) {

query.status = status;

}


/*
DATE FILTER
*/
if (startDate || endDate) {

query.createdAt = {};

if (startDate) {

query.createdAt.$gte = new Date(startDate);

}

if (endDate) {

query.createdAt.$lte = new Date(endDate);

}

}


/*
FINAL QUERY
*/
return await Order.find(query)

.populate("items.productId")

.sort({ createdAt: -1 });

};