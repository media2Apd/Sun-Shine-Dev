import * as repo from "../repositories/cartRepo.js";

import Cart from "../models/Cart.js";


export const addToCart = async ({

userId,
productId,
variantId,
quantity

}) => {

if (!productId || !variantId)

throw new Error("ProductId and VariantId required");


if (!quantity || quantity <= 0)

throw new Error("Quantity must be greater than 0");


let cart = await Cart.findOne({ userId });


/* create cart if not exists */

if (!cart) {

cart = await Cart.create({

userId,

items: [

{

productId,
variantId,
quantity

}

]

});

return cart;

}


/* check duplicate product */

const existingItem = cart.items.find(

(item) =>

item.productId.toString() === productId &&

item.variantId.toString() === variantId

);


/* increase quantity if exists */

if (existingItem) {

existingItem.quantity += quantity;

} else {

cart.items.push({

productId,
variantId,
quantity

});

}


await cart.save();

return cart;

};


export const getCart=(userId)=>

repo.getCart(userId);


export const updateQuantity=(body)=>

repo.updateQuantity(body);


export const removeItem=(body)=>

repo.removeItem(body);