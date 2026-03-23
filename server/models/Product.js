import mongoose from "mongoose";
import slugify from "slugify";

const variantSchema = new mongoose.Schema({
  capacity: String,
  unit: String,
  mrp: Number,
  price: Number,
  stock: Number
});

const productSchema = new mongoose.Schema(
{
name: { type: String, required: true },

category: String,

slug: String,

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

showOnWebsite: Boolean,

newLaunch: Boolean,

featuredProduct: Boolean,

variants: [variantSchema]

},
{ timestamps: true }
);

productSchema.pre("save", function (next) {

if (this.isModified("name")) {
this.slug = slugify(this.name, { lower: true, strict: true });
}

next();
});

export default mongoose.model("Product", productSchema);        