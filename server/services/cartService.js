import Cart from "../models/Cart.js";
import * as repo from "../repositories/cartRepo.js";

export const addToCart = async (body) => {

const { userId, productId, variantIndex, quantity } = body;


let cart = await Cart.findOne({ userId });


/* If cart not exists → create */

if (!cart) {

return repo.addToCart({

userId,

items: [

{

productId,

variantIndex,

quantity

}

]

});

}


/* Check duplicate product */

const exists = cart.items.find(

(item) =>

item.productId.toString() === productId &&

item.variantIndex === variantIndex

);


if (exists)

throw new Error("Product already exists in cart");


/* Add new item */

cart.items.push({

productId,

variantIndex,

quantity

});


await cart.save();


return cart;

};


export const getCart=(userId)=>

repo.getCart(userId);


export const updateQuantity=(body)=>

repo.updateQuantity(body);


export const removeItem=(body)=>

repo.removeItem(body);