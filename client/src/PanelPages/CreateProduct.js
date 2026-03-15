

import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../Context/ProductContext";
import { CategoryContext } from "../Context/CategoryContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const NewProduct = () => {

  const { products, addProduct, updateProduct } = useContext(ProductContext);
  const { category } = useContext(CategoryContext);

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const isViewMode = location.pathname.includes("view-product");

  const [product, setProduct] = useState({
    name: "",
    category: "",
    code: "",
    shortDescription: "",
    description: "",
    crops: "",
    packageType: "",
    mrp: "",
    sellingPrice: "",
    quantity: "",
    gst: "",
    images: [],
    showOnWebsite: false,
    newLaunch: false,
    featuredProduct: false
  });

  useEffect(() => {

    if (id) {

      const existingProduct = products.find(
        (p) => p.id === Number(id)
      );

      if (existingProduct) {

        setProduct({
          name: existingProduct.name || "",
          category: existingProduct.category || "",
          code: existingProduct.code || "",
          shortDescription: existingProduct.shortDescription || "",
          description: existingProduct.description || "",
          crops: existingProduct.crops || "",
          packageType: existingProduct.packageType || "",
          mrp: existingProduct.oldPrice || "",
          sellingPrice: existingProduct.price || "",
          quantity: existingProduct.stock || "",
          gst: existingProduct.gst || "",
          images: existingProduct.images || [existingProduct.image],
          showOnWebsite: existingProduct.showOnWebsite || false,
          newLaunch: existingProduct.newLaunch || false,
          featuredProduct: existingProduct.featuredProduct || false
        });

      }

    }

  }, [id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (file, index) => {

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      const updatedImages = [...product.images];
      updatedImages[index] = reader.result;

      setProduct({
        ...product,
        images: updatedImages
      });

    };

    reader.readAsDataURL(file);

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const productData = {
      id: id ? Number(id) : Date.now(),
      name: product.name,
      category: product.category,
      price: product.sellingPrice,
      oldPrice: product.mrp,
      stock: product.quantity,
      image: product.images?.[0] || "",
      images: product.images,
      code: product.code,
      shortDescription: product.shortDescription,
      description: product.description,
      crops: product.crops,
      packageType: product.packageType,
      gst: product.gst,
      showOnWebsite: product.showOnWebsite,
      newLaunch: product.newLaunch,
      featuredProduct: product.featuredProduct,
      date: new Date().toLocaleDateString(),
      status: true
    };

    if (id) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }

    navigate("/admin-panel/product-list");

  };

  return (

<div className="p-6">

<h2 className="text-2xl font-semibold mb-6">
{isViewMode ? "View Product" : id ? "Edit Product" : "Add New Product"}
</h2>

<form onSubmit={handleSubmit} className="space-y-6">

<div>

<label className="text-sm">Product Name</label>

<input
type="text"
name="name"
value={product.name}
onChange={handleChange}
disabled={isViewMode}
className="w-full border p-2 rounded mt-1"
/>

</div>

<div>

<label className="text-sm">Category</label>

<select
name="category"
value={product.category}
onChange={handleChange}
disabled={isViewMode}
className="w-full border p-2 rounded mt-1"
>

<option value="">Select Category</option>

{category?.map((cat,index)=>(
<option key={index} value={cat.name}>
{cat.name}
</option>
))}

</select>

</div>

<div className="grid grid-cols-2 gap-4">

<div>

<label>MRP</label>

<input
type="number"
name="mrp"
value={product.mrp}
onChange={handleChange}
disabled={isViewMode}
className="w-full border p-2 rounded"
/>

</div>

<div>

<label>Selling Price</label>

<input
type="number"
name="sellingPrice"
value={product.sellingPrice}
onChange={handleChange}
disabled={isViewMode}
className="w-full border p-2 rounded"
/>

</div>

</div>

<div>

<label>Quantity</label>

<input
type="number"
name="quantity"
value={product.quantity}
onChange={handleChange}
disabled={isViewMode}
className="w-full border p-2 rounded"
/>

</div>

<div className="space-y-4">

{[
{ label:"Show on Website", name:"showOnWebsite" },
{ label:"New Launch", name:"newLaunch" },
{ label:"Featured Product", name:"featuredProduct" }
].map((item)=>(

<div key={item.name} className="flex justify-between items-center">

<span>{item.label}</span>

<button
type="button"
disabled={isViewMode}
onClick={()=>
setProduct({
...product,
[item.name]:!product[item.name]
})
}
className={`w-12 h-6 flex items-center rounded-full p-1 ${
product[item.name] ? "bg-green-600":"bg-gray-300"
}`}
>

<div
className={`bg-white w-4 h-4 rounded-full transform ${
product[item.name] ? "translate-x-6":""
}`}
/>

</button>

</div>

))}

</div>

<div>

<label className="block mb-3">Product Images</label>

<div className="grid grid-cols-5 gap-4">

{[0,1,2,3,4].map((index)=>(

<div key={index} className="border p-2 rounded text-center">

{product.images[index] ? (

<img
src={product.images[index]}
alt=""
className="h-20 object-cover mx-auto"
/>

) : (

<label className="cursor-pointer text-gray-400">

Upload

<input
type="file"
className="hidden"
disabled={isViewMode}
onChange={(e)=>
handleImageChange(e.target.files[0],index)
}
/>

</label>

)}

</div>

))}

</div>

</div>

<div className="flex gap-3 justify-end">

<button
type="button"
onClick={()=>navigate(-1)}
className="px-4 py-2 border rounded"
>

Back

</button>

{!isViewMode && (
<button
type="submit"
className="px-4 py-2 bg-green-600 text-white rounded"
>
Save Product
</button>
)}

</div>

</form>

</div>

  );
};

export default NewProduct;