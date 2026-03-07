

import { useState, useContext } from "react";
import { ProductContext } from "../Context/ProductContext";
import { useNavigate } from "react-router-dom";


const NewProduct = () => {

  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    subCategory: "",
    code: "",
    shortDescription: "",
    description: "",
    crops: "",
    packageType: "",
    mrp: "",
    sellingPrice: "",
    quantity: "",
    gst: "",
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    setProduct({ ...product, images: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
  id: Date.now(),
  name: product.name,
  category: product.category,
  price: product.sellingPrice,
  oldPrice: product.mrp,
  stock: product.quantity,
  image: product.images?.[0]
    ? URL.createObjectURL(product.images[0])
    : "",
  date: new Date().toLocaleDateString(),
  status: true
};

    addProduct(newProduct);

    navigate("/admin-panel/product-list");
  };

  return (
    
    <div className="p-4 md:p-6">

<h2 className="text-xl md:text-2xl font-semibold mb-6">
Add New Product
</h2>

<form onSubmit={handleSubmit} className="space-y-6">

{/* BASIC INFORMATION */}

<div className="bg-white p-4 md:p-6 rounded-xl shadow">

<h3 className="font-semibold mb-4">Basic Information</h3>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div>
<label className="text-sm">Product Name</label>
<input
type="text"
name="name"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
/>
</div>

<div>
<label className="text-sm">Category</label>
<select
name="category"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
>
  <option> Select Category</option>
<option>Bio Based Product</option>
<option>Organic Product</option>
</select>
</div>

<div>
<label className="text-sm">Sub Category</label>
<select
name="subCategory"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
>
<option>Select Sub Category</option>
<option>Renewable</option>
<option>non-Renewable</option>
</select>
</div>

<div>
<label className="text-sm">Product Code</label>
<input
type="text"
name="code"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
/>
</div>

<div className="md:col-span-2">
<label className="text-sm">Short Description</label>
<input
type="text"
name="shortDescription"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
/>
</div>

</div>
</div>

{/* PRODUCT DETAILS */}

<div className="bg-white p-4 md:p-6 rounded-xl shadow">

<h3 className="font-semibold mb-4">Product Details</h3>

<div className="space-y-4">

<div>
<label className="text-sm">Detailed Description</label>

<textarea
rows="4"
name="description"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
/>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div>
<label className="text-sm">Suitable Crops</label>

<select
name="crops"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
>
<option>Select Crops</option>
<option>Paddy</option>
<option>Vegetables</option>
</select>

</div>

<div>
<label className="text-sm">Packaging Type</label>

<select
name="packageType"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
>
<option>Select Type</option>
<option>Bottle</option>
<option>Packet</option>
</select>

</div>

</div>

</div>
</div>

{/* PRICING */}

<div className="bg-white p-4 md:p-6 rounded-xl shadow">

<h3 className="font-semibold mb-4">
Pricing & Inventory
</h3>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div>
<label className="text-sm">MRP</label>
<input
type="number"
name="mrp"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
/>
</div>

<div>
<label className="text-sm">Selling Price</label>
<input
type="number"
name="sellingPrice"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
/>
</div>

<div>
<label className="text-sm">Quantity</label>
<input
type="number"
name="quantity"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
/>
</div>

<div>
<label className="text-sm">GST/Tax</label>

<select
name="gst"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
>
<option>Select GST</option>
<option>5%</option>
<option>12%</option>
<option>18%</option>
</select>

</div>

</div>

<div className="mt-6">

<label className="text-sm">
Product Images
</label>

<input
type="file"
multiple
onChange={handleImage}
className="mt-2"
/>

</div>

</div>

{/* BUTTONS */}

<div className="flex flex-col sm:flex-row justify-end gap-3">

<button
type="button"
className="px-6 py-2 border rounded-lg w-full sm:w-auto"
onClick={() => navigate(-1)}
>
Back
</button>

<button
type="submit"
className="px-6 py-2 bg-green-600 text-white rounded-lg w-full sm:w-auto"
>
Save Product
</button>

</div>

</form>

</div>
  );
};

export default NewProduct;