import * as service from "../services/orderService.js";


export const createOrder=async(req,res)=>{

try{

const data=await service.createOrder(req.body);

res.json({

success:true,
data

});

}
catch(err){

res.status(400).json({

success:false,
message:err.message

});

}

};


export const cancelOrder=async(req,res)=>{

const data=await service.cancelOrder(req.params.id);

res.json(data);

};


export const getOrders=async(req,res)=>{

const data=await service.getOrders();

res.json(data);

};


export const getOrderById=async(req,res)=>{

const data=await service.getOrderById(req.params.id);

res.json(data);

};


export const updateOrderStatus=async(req,res)=>{

const data=await service.updateOrderStatus(

req.params.id,
req.body

);

res.json(data);

};


export const deleteOrder=async(req,res)=>{

await service.deleteOrder(req.params.id);

res.json({

success:true

});

};

export const createRazorpayOrder = async(req,res)=>{

const data = await service.createRazorpayOrder(

req.body

);

res.json({

success:true,

data

});

};

export const verifyPayment = async(req,res)=>{

const order = await service.verifyPayment(

req.body

);

res.json({

success:true,

order

});

};