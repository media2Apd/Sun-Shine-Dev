import Review from "../models/Review.js";
import Order from "../models/Order.js";
import { uploadToCloudinary } from "../utils/Cloudinary.js";
import Product from "../models/Product.js";

// export const createReview = async (req, res) => {

//   try {

//     const { productId, rating, comment } = req.body;

//     if (!productId)
//       throw new Error("Product ID required");

//     /*
//     CHECK ORDER HISTORY
//     */
//     const order = await Order.findOne({
//       customerId: req.user.id,
//       "items.productId": productId,
//     });

//     /*
//     HANDLE IMAGE UPLOAD
//     */
//     let images = [];

//     if (req.files && req.files.length > 0) {

//       for (const file of req.files) {

//         const uploaded = await uploadToCloudinary(
//           file.buffer,
//           "reviews"
//         );

//         images.push(uploaded);

//       }

//     }

//     const review = await Review.create({

//       productId,
//       userId: req.user.id,
//       rating,
//       comment,

//       images,

//       isVerifiedPurchase: order ? true : false,

//     });

//     res.status(201).json(review);

//   }
//   catch (error) {

//     res.status(500).json({
//       message: error.message
//     });

//   }

// };
export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!productId) throw new Error("Product ID required");

    // ✅ ORDER CHECK
    const order = await Order.findOne({
      customerId: req.user.id,
      "items.productId": productId,
    });

    // ✅ IMAGE UPLOAD
    let images = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploaded = await uploadToCloudinary(file.buffer, "reviews");
        images.push(uploaded);
      }
    }

    // ✅ CREATE REVIEW
    const review = await Review.create({
      productId,
      userId: req.user.id,
      rating,
      comment,
      images,
      isVerifiedPurchase: order ? true : false,
    });

    // 🔥 UPDATE PRODUCT RATING (IMPORTANT)
    const stats = await Review.aggregate([
      { $match: { productId: review.productId } },
      {
        $group: {
          _id: "$productId",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    if (stats.length > 0) {
      await Product.findByIdAndUpdate(productId, {
        averageRating: Number(stats[0].averageRating.toFixed(1)),
        totalReviews: stats[0].totalReviews,
      });
    }

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: review,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
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

export const getAllReviews = async (req, res) => {
  try {

    const reviews = await Review.find()
      .populate("userId", "firstName lastName")
      .populate("productId", "name"); // optional (product name)

    res.json(reviews);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};