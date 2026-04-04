import mongoose from "mongoose";
import slugify from "slugify";

const variantSchema = new mongoose.Schema({
  sku: String,
  capacity: String,
  unit: String,
  mrp: Number,
  price: Number,
  stock: Number,
  additionalInfo: [ {
    key: String,
    value: String
  } ]
});

const productSchema = new mongoose.Schema(
{
name: { type: String, required: true },

category: {type: mongoose.Schema.Types.ObjectId, ref: "Category" },

slug: String,

brand: String,

code: String,

shortDescription: String,

detailDescription: String,

crops: String,

packageType: String,

gst: String,

images: [
{
url: String,
publicId: String
}
],

video: {
  url: { type: String, default: null },
  publicId: { type: String, default: null }
},

showOnWebsite: Boolean,

newLaunch: Boolean,

featuredProduct: Boolean,

variants: [variantSchema],

averageRating: { type: Number, default: 0 },

totalReviews: { type: Number, default: 0 },
},
{ timestamps: true }
);

productSchema.pre("save", function (next) {

if (this.isModified("name")) {
this.slug = slugify(this.name, { lower: true, strict: true });
}

next();
});

productSchema.index({ name: "text", brand: "text", code: "text" });

productSchema.index({ slug: 1 });

productSchema.index({ category: 1 });

productSchema.index({ featuredProduct: 1 });

productSchema.index({ newLaunch: 1 });

export default mongoose.model("Product", productSchema);        