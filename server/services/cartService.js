import * as repo from "../repositories/cartRepo.js";

export const addToCart=async(body)=>{

return repo.addToCart(body);

};


export const getCart=(userId)=>

repo.getCart(userId);


export const updateQuantity=(body)=>

repo.updateQuantity(body);


export const removeItem=(body)=>

repo.removeItem(body);