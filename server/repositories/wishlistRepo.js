import Wishlist from "../models/WishList.js";


export const getWishlist=userId=>

Wishlist.findOne({userId})
.populate("items.productId");


export const createWishlist=data=>

Wishlist.create(data);


export const updateWishlist=(userId,data)=>

Wishlist.findOneAndUpdate(
{userId},
data,
{new:true}
);


export const removeFromWishlist = (userId, productId) => {

return Wishlist.findOneAndUpdate(

{ userId },

{

$pull: {

items: { productId }

}

},

{ new: true }

).populate("items.productId");

};