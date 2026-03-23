import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },
    url: {
      type: String,
      trim: true,
      lowercase: true,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    showOnWebsite: {
      type: Boolean,
      default: false,
    },
    allowOrders: {
      type: Boolean,
      default: false,
    },
    featuredProduct: {
      type: Boolean,
      default: false,
    },
    icon: {
      url: { type: String, default: null },
      publicId: { type: String, default: null },
    },
    image: {
      url: { type: String, default: null },
      publicId: { type: String, default: null },
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    categoryType: {
      type: String,
      default: "topCategory",
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;