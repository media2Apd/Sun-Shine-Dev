// import * as service from "../services/orderService.js";

// export const createOrder=async(req,res)=>{

// try{

// const data=await service.createOrder(req.body);

// res.json({

// success:true,
// data

// });

// }
// catch(err){

// res.status(400).json({

// success:false,
// message:err.message

// });

// }

// };

// export const cancelOrder=async(req,res)=>{

// const data=await service.cancelOrder(req.params.id);

// res.json(data);

// };

// export const getOrders=async(req,res)=>{

// const data=await service.getOrders();

// res.json(data);

// };

// export const getOrderById=async(req,res)=>{

// const data=await service.getOrderById(req.params.id);

// res.json(data);

// };

// export const updateOrderStatus=async(req,res)=>{

// const data=await service.updateOrderStatus(

// req.params.id,
// req.body

// );

// res.json(data);

// };

// export const deleteOrder=async(req,res)=>{

// await service.deleteOrder(req.params.id);

// res.json({

// success:true

// });

// };

// export const createRazorpayOrder = async(req,res)=>{

// const data = await service.createRazorpayOrder(

// req.body

// );

// res.json({

// success:true,

// data

// });

// };

// export const verifyPayment = async(req,res)=>{

// const order = await service.verifyPayment(

// req.body

// );

// res.json({

// success:true,

// order

// });

// };

import * as service from "../services/orderService.js";

// ✅ CREATE
export const createOrder = async (req, res) => {
  try {
    const data = await service.createOrder(
      req.body,
      req.user._id, // 🔥 from auth middleware
    );

    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ GET ALL
export const getOrders = async (req, res) => {
  const data = await service.getOrders(req.user._id);
  res.json(data);
};

// ✅ GET ONE
// export const getOrderById = async (req, res) => {
//   const data = await service.getOrderById(req.params.id, req.user._id);
//   res.json(data);
// };

export const getOrderById = async (req, res) => {
  try {
    const data = await service.getOrderById(req.params.id, req.user._id);

    res.json(data);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// ✅ CANCEL
export const cancelOrder = async (req, res) => {
  const data = await service.cancelOrder(req.params.id);
  res.json(data);
};

// ✅ STATUS UPDATE (ADMIN)
export const updateOrderStatus = async (req, res) => {
  const data = await service.updateOrderStatus(req.params.id, req.body);
  res.json(data);
};

// ✅ DELETE
export const deleteOrder = async (req, res) => {
  await service.deleteOrder(req.params.id);
  res.json({ success: true });
};

// ✅ RAZORPAY
// export const createRazorpayOrder = async (req, res) => {
//   const data = await service.createRazorpayOrder(
//     req.body,
//     req.user._id
//   );

//   res.json({ success: true, data });
// };
export const createRazorpayOrder = async (req, res) => {
  try {
    const data = await service.createRazorpayOrder(req.body, req.user._id);

    res.json({
      success: true,
      message: "Order created successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const order = await service.verifyRazorpayPayment(req.body, req.user._id);

    res.json({
      success: true,
      message: "Payment verified successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;

    const data = await service.getAllOrders({
      startDate,
      endDate,
      status,
    });

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
