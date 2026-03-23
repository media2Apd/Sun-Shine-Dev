import Cart from "../models/Cart.js";

export const addToCart=async({

userId,
productId,
variantIndex,
quantity

})=>{

let cart=await Cart.findOne({userId});

if(!cart){

cart=await Cart.create({

userId,
items:[{productId,variantIndex,quantity}]

});

return cart;

}

cart.items.push({

productId,
variantIndex,
quantity

});

await cart.save();

return cart;

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