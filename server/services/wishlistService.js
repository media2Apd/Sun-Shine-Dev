import * as repo from "../repositories/wishlistRepo.js";


export const addToWishlist=async(userId,productId)=>{

let wishlist=await repo.getWishlist(userId);

if(!wishlist){

wishlist=await repo.createWishlist({

userId,

items:[{productId}]

});

return wishlist;

}


const exists=wishlist.items.find(

item=>item.productId.toString()===productId

);

if(exists)

throw new Error("Product already in wishlist");


wishlist.items.push({productId});

await wishlist.save();

return wishlist;

};



export const getWishlist=userId=>

repo.getWishlist(userId);



export const removeFromWishlist=async(userId,productId)=>{

const wishlist=await repo.getWishlist(userId);

wishlist.items=wishlist.items.filter(

item=>item.productId.toString()!==productId

);

await wishlist.save();

return wishlist;

};



export const clearWishlist=async(userId)=>{

return repo.updateWishlist(userId,{items:[]});

};