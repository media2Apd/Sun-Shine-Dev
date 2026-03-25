import Cart from "../models/Cart.js";

export const addToCart = (data) => {

return Cart.create(data);

};


export const getCart=(userId)=>

Cart.findOne({userId}).populate("items.productId", "name image price");


export const updateQuantity=async({

userId,
productId,
quantity

})=>{

return Cart.updateOne(

{userId,"items.productId":productId},

{$set:{"items.$.quantity":quantity}}

);

};


export const removeItem=async({

userId,
productId

})=>{

return Cart.updateOne(

{userId},

{$pull:{items:{productId}}}

);

};