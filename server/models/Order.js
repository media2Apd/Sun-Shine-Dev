// import mongoose from "mongoose";

// const orderItemSchema = new mongoose.Schema({

// productId:{
// type:mongoose.Schema.Types.ObjectId,
// ref:"Product",
// required:true
// },

// variantIndex:Number,

// quantity:Number,

// price:Number

// });

// const orderSchema = new mongoose.Schema({

// customerId:{
// type:mongoose.Schema.Types.ObjectId,
// ref:"User"
// },

// items:[orderItemSchema],

// shippingAddress:Object,

// billingAddress:Object,

// total:Number,

// paymentMethod:{
// type:String,
// enum:["COD","ONLINE"],
// default:"COD"
// },

// paymentStatus:{
// type:String,
// enum:["Pending","Paid"],
// default:"Pending"
// },

// status:{
// type:String,
// enum:[
// "Placed",
// "Processing",
// "Shipped",
// "Delivered",
// "Cancelled"
// ],
// default:"Placed"
// }

// },{timestamps:true});

// export default mongoose.model("Order",orderSchema);

import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  variantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  quantity: Number,

  price: Number,

  // 🔥 IMPORTANT (snapshot data)
  name: String,
  image: String,
});

const orderSchema = new mongoose.Schema(
  {
    // 🔥 User-friendly order ID
    orderId: {
      type: String,
      unique: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    items: [orderItemSchema],

    shippingAddress: Object,
    billingAddress: Object,

    total: Number,

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    // 🔥 STATUS (frontend match)
    status: {
      type: String,
      default: "Placed",
    },

    // ✅ ADD THESE FOR RAZORPAY
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,

    transactionId: String,

    // 🔥 soft delete
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);