import Review from "../models/Review.js";

import Order from "../models/Order.js";



/*
CREATE VERIFIED REVIEW
*/
export const createReview=async(req,res)=>{

try{

const {productId,rating,comment}=req.body;


/*
CHECK ORDER HISTORY
*/
const order=await Order.findOne({

userId:req.user.id,
"items.productId":productId

});


const review=await Review.create({

productId,
userId:req.user.id,
rating,
comment,

isVerifiedPurchase:order?true:false

});


res.status(201).json(review);

}
catch(error){

res.status(500).json({

message:error.message

});

}

};



/*
GET PRODUCT REVIEWS
*/
export const getProductReviews=async(req,res)=>{

try{

const reviews=await Review.find({

productId:req.params.productId

}).populate("userId","firstName lastName");


res.json(reviews);

}
catch(error){

res.status(500).json({

message:error.message

});

}

};