import * as service from "../services/wishlistService.js";


export const addToWishlist=async(req,res)=>{

try{

const userId=req.user.id;

const {productId}=req.body;

const data=await service.addToWishlist(

userId,
productId

);

res.json({

success:true,
data

});

}
catch(err){

res.status(400).json({

message:err.message

});

}

};



export const getWishlist=async(req,res)=>{

const userId=req.user.id;

const data=await service.getWishlist(userId);

res.json(data);

};



export const removeFromWishlist=async(req,res)=>{

const userId=req.user.id;

const {productId}=req.body;

const data=await service.removeFromWishlist(

userId,
productId

);

res.json(data);

};



export const clearWishlist=async(req,res)=>{

const userId=req.user.id;

await service.clearWishlist(userId);

res.json({

success:true

});

};