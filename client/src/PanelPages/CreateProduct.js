

// import { useState, useContext, useEffect } from "react";

// import { ProductContext } from "../Context/ProductContext";
// import { CategoryContext } from "../Context/CategoryContext";
// import { useNavigate, useParams, useLocation } from "react-router-dom";

// const NewProduct = () => {

//   const { products, addProduct, updateProduct } = useContext(ProductContext);
//   const { category } = useContext(CategoryContext);

//   const navigate = useNavigate();
//   const { id } = useParams();
//   const location = useLocation();

//   const isViewMode = location.pathname.includes("view-product");

//   const [product, setProduct] = useState({
//     name: "",
//     category: "",
//     variants: product.variants,
//     code: "",
//     shortDescription: "",
//     detailDescription: "",
//     crops: "",
//     packageType: "",
//     // mrp: "",
//     // sellingPrice: "",
//     // quantity: "",
//     gst: "",
//     images: [],
//     showOnWebsite: false,
//     newLaunch: false,
//     featuredProduct: false,

//     variants: [
//     {
//       quantity: "",
//       unit: "",
//       mrp: "",
//       price: "",
//       stock: ""
//     }
//   ]
//   });

//   useEffect(() => {

//     if (id) {

//       const existingProduct = products.find(
//         (p) => p.id === Number(id)
//       );

//       if (existingProduct) {

//         setProduct({
//           name: existingProduct.name || "",
//           category: existingProduct.category || "",
//           code: existingProduct.code || "",
//           shortDescription: existingProduct.shortDescription || "",
//           detailDescription: existingProduct.detailDescription || "",
//           crops: existingProduct.crops || "",
//           packageType: existingProduct.packageType || "",
//           // mrp: existingProduct.oldPrice || "",
//           // sellingPrice: existingProduct.price || "",
//           // quantity: existingProduct.stock || "",
//           gst: existingProduct.gst || "",
//           images: existingProduct.images || [existingProduct.image],
//           showOnWebsite: existingProduct.showOnWebsite || false,
//           newLaunch: existingProduct.newLaunch || false,
//           featuredProduct: existingProduct.featuredProduct || false,
//           variants: existingProduct.variants || [
//  {
//   quantity:"",
//   unit:"",
//   mrp:"",
//   price:"",
//   stock:""
//  }
// ],
//         });

//       }

//     }

//   }, [id, products]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   const handleVariantChange = (index, field, value) => {

//   const updated = [...product.variants];

//   updated[index][field] = value;

//   setProduct({
//     ...product,
//     variants: updated
//   });

// };

// const addVariant = () => {

//   setProduct({
//     ...product,
//     variants: [
//       ...product.variants,
//       {
//         quantity: "",
//         unit: "",
//         mrp: "",
//         price: "",
//         stock: ""
//       }
//     ]
//   });

// };

//   const handleImageChange = (file, index) => {

//     if (!file) return;

//     const reader = new FileReader();

//     reader.onloadend = () => {

//       const updatedImages = [...product.images];
//       updatedImages[index] = reader.result;

//       setProduct({
//         ...product,
//         images: updatedImages
//       });

//     };

//     reader.readAsDataURL(file);

//   };

//   const handleSubmit = (e) => {

//     e.preventDefault();

//     const productData = {
//       id: id ? Number(id) : Date.now(),
//       name: product.name,
//       category: product.category,
//       price: product.sellingPrice,
//       oldPrice: product.mrp,
//       stock: product.quantity,
//       image: product.images?.[0] || "",
//       images: product.images,
//       code: product.code,
//       shortDescription: product.shortDescription,
//       detailDescription: product.detailDescription,
//       crops: product.crops,
//       packageType: product.packageType,
//       gst: product.gst,
//       showOnWebsite: product.showOnWebsite,
//       newLaunch: product.newLaunch,
//       featuredProduct: product.featuredProduct,
//       date: new Date().toLocaleDateString(),
//       status: true
//     };

//     if (id) {
//       updateProduct(productData);
//     } else {
//       addProduct(productData);
//     }

//     navigate("/admin-panel/product-list");

//   };

//   return (

// <div className="p-6">

// <h2 className="text-2xl font-semibold mb-6">
// {isViewMode ? "View Product" : id ? "Edit Product" : "Add New Product"}
// </h2>

// <form onSubmit={handleSubmit} className="space-y-6">

// <div>

// <label className="text-sm">Product Name</label>

// <input
// type="text"
// name="name"
// value={product.name}
// onChange={handleChange}
// disabled={isViewMode}
// className="w-full border p-2 rounded mt-1"
// />

// </div>

// <div>

// <label className="text-sm">Category</label>

// <select
// name="category"
// value={product.category}
// onChange={handleChange}
// disabled={isViewMode}
// className="w-full border p-2 rounded mt-1"
// >

// <option value="">Select Category</option>

// {category?.map((cat,index)=>(
// <option key={index} value={cat.name}>
// {cat.name}
// </option>
// ))}

// </select>

// </div>

// <div className="grid grid-cols-2 gap-4">

// <div>

// <label>Short Description</label>

// <textarea
// type="text"
// name="shortDescription"
// value={product.shortDescription}
// onChange={handleChange}
// disabled={isViewMode}
// className="w-full border p-2 rounded"
// />

// </div>

// <div>

// <label>Detail Description</label>

// <textarea
// type="textarea"
// name="detailDescription"
// value={product.detailDescription}
// onChange={handleChange}
// disabled={isViewMode}
// className="w-full border p-2 rounded"
// />

// </div>

// </div>

// <div className="grid grid-cols-2 gap-4">

// <div>

// <label>MRP</label>

// <input
// type="number"
// name="mrp"
// value={product.mrp}
// onChange={handleChange}
// disabled={isViewMode}
// className="w-full border p-2 rounded"
// />

// </div>

// <div>

// <label>Selling Price</label>

// <input
// type="number"
// name="sellingPrice"
// value={product.sellingPrice}
// onChange={handleChange}
// disabled={isViewMode}
// className="w-full border p-2 rounded"
// />

// </div>

// </div>

// <div>

// <label>Quantity</label>

// <input
// type="number"
// name="quantity"
// value={product.quantity}
// onChange={handleChange}
// disabled={isViewMode}
// className="w-full border p-2 rounded"
// />

// </div>

// <div className="space-y-4">

// {[
// { label:"Show on Website", name:"showOnWebsite" },
// { label:"New Launch", name:"newLaunch" },
// { label:"Featured Product", name:"featuredProduct" }
// ].map((item)=>(

// <div key={item.name} className="flex justify-between items-center">

// <span>{item.label}</span>

// <button
// type="button"
// disabled={isViewMode}
// onClick={()=>
// setProduct({
// ...product,
// [item.name]:!product[item.name]
// })
// }
// className={`w-12 h-6 flex items-center rounded-full p-1 ${
// product[item.name] ? "bg-green-600":"bg-gray-300"
// }`}
// >

// <div
// className={`bg-white w-4 h-4 rounded-full transform ${
// product[item.name] ? "translate-x-6":""
// }`}
// />

// </button>

// </div>

// ))}

// </div>
// <div>

// <label className="text-lg font-semibold">Variants</label>

// {product.variants.map((variant,index)=>(

// <div key={index} className="grid grid-cols-5 gap-3 mt-2">

// <input
// placeholder="Qty"
// value={variant.quantity}
// onChange={(e)=>
// handleVariantChange(index,"quantity",e.target.value)
// }
// className="border p-2 rounded"
// />

// <input
// placeholder="Unit (ml / liter / kg)"
// value={variant.unit}
// onChange={(e)=>
// handleVariantChange(index,"unit",e.target.value)
// }
// className="border p-2 rounded"
// />

// <input
// placeholder="MRP"
// value={variant.mrp}
// onChange={(e)=>
// handleVariantChange(index,"mrp",e.target.value)
// }
// className="border p-2 rounded"
// />

// <input
// placeholder="Price"
// value={variant.price}
// onChange={(e)=>
// handleVariantChange(index,"price",e.target.value)
// }
// className="border p-2 rounded"
// />

// <input
// placeholder="Stock"
// value={variant.stock}
// onChange={(e)=>
// handleVariantChange(index,"stock",e.target.value)
// }
// className="border p-2 rounded"
// />

// </div>

// ))}

// <button
// type="button"
// onClick={addVariant}
// className="mt-3 px-3 py-2 bg-blue-500 text-white rounded"
// >
// Add Variant
// </button>

// </div>
// <div className="mt-6">

// <label className="text-sm block mb-4">
// Product Images
// </label>

// <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

// {[0,1,2,3,4].map((index) => (

// <div key={index} className="text-center">

// <div className="w-full h-28 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50">

// {product.images[index] ? (

// <img
// src={product.images[index]}
// alt="preview"
// className="h-full object-cover rounded"
// />

// ) : (

// <label className="cursor-pointer text-gray-400 text-sm">

// Upload

// <input
// type="file"
// className="hidden"
// onChange={(e) =>
// handleImageChange(e.target.files[0], index)
// }
// />

// </label>

// )}

// </div>

// <div className="flex justify-between mt-2 text-sm">

// <button
// type="button"
// className="text-gray-500"
// onClick={() => {

// const files = [...product.images];
// files[index] = null;

// setProduct({
// ...product,
// images: files
// });

// }}
// >

// Remove

// </button>

// <label className="cursor-pointer text-gray-500">

// ✎

// <input
// type="file"
// className="hidden"
// onChange={(e) =>
// handleImageChange(e.target.files[0], index)
// }
// />

// </label>

// </div>

// </div>

// ))}

// </div>

// </div>

// <div className="flex gap-3 justify-end">

// <button
// type="button"
// onClick={()=>navigate(-1)}
// className="px-4 py-2 border rounded"
// >

// Back

// </button>

// {!isViewMode && (
// <button
// type="submit"
// className="px-4 py-2 bg-green-600 text-white rounded"
// >
// Save Product
// </button>
// )}

// </div>

// </form>

// </div>

//   );
// };

// export default NewProduct;

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
    detailDescription: "",
    crops: "",
    packageType: "",
    gst: "",
    images: [],
    showOnWebsite: false,
    newLaunch: false,
    featuredProduct: false,

    variants: [
      {
        quantity: "",
        unit: "",
        mrp: "",
        price: "",
        stock: ""
      }
    ]
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
          detailDescription: existingProduct.detailDescription || "",
          crops: existingProduct.crops || "",
          packageType: existingProduct.packageType || "",
          gst: existingProduct.gst || "",
          images: existingProduct.images || [existingProduct.image],
          showOnWebsite: existingProduct.showOnWebsite || false,
          newLaunch: existingProduct.newLaunch || false,
          featuredProduct: existingProduct.featuredProduct || false,

          variants: existingProduct.variants || [
            {
              quantity: "",
              unit: "",
              mrp: "",
              price: "",
              stock: ""
            }
          ]
        });

      }

    }

  }, [id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleVariantChange = (index, field, value) => {

    const updated = [...product.variants];
    updated[index][field] = value;

    setProduct({
      ...product,
      variants: updated
    });

  };

  const addVariant = () => {

    setProduct({
      ...product,
      variants: [
        ...product.variants,
        {
          quantity: "",
          unit: "",
          mrp: "",
          price: "",
          stock: ""
        }
      ]
    });

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
      variants: product.variants,
      image: product.images?.[0] || "",
      images: product.images,
      code: product.code,
      shortDescription: product.shortDescription,
      detailDescription: product.detailDescription,
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

{/* Product Name */}

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

{/* Category */}

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

{/* Description */}

<div className="grid grid-cols-2 gap-4">

<div>
<label>Short Description</label>

<textarea
name="shortDescription"
value={product.shortDescription}
onChange={handleChange}
disabled={isViewMode}
className="w-full border p-2 rounded"
/>

</div>

<div>
<label>Detail Description</label>

<textarea
name="detailDescription"
value={product.detailDescription}
onChange={handleChange}
disabled={isViewMode}
className="w-full border p-2 rounded"
/>

</div>

</div>

{/* Toggles */}

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

{/* VARIANTS */}

<div>

<label className="text-lg font-semibold">Variants</label>

{product.variants.map((variant,index)=>(

<div key={index} className="grid grid-cols-5 gap-3 mt-2">

<input
placeholder="Qty"
value={variant.quantity}
onChange={(e)=>
handleVariantChange(index,"quantity",e.target.value)
}
className="border p-2 rounded"
/>

<input
placeholder="Unit (ml / liter / kg)"
value={variant.unit}
onChange={(e)=>
handleVariantChange(index,"unit",e.target.value)
}
className="border p-2 rounded"
/>

<input
placeholder="MRP"
value={variant.mrp}
onChange={(e)=>
handleVariantChange(index,"mrp",e.target.value)
}
className="border p-2 rounded"
/>

<input
placeholder="Price"
value={variant.price}
onChange={(e)=>
handleVariantChange(index,"price",e.target.value)
}
className="border p-2 rounded"
/>

<input
placeholder="Stock"
value={variant.stock}
onChange={(e)=>
handleVariantChange(index,"stock",e.target.value)
}
className="border p-2 rounded"
/>

</div>

))}

<button
type="button"
onClick={addVariant}
className="mt-3 px-3 py-2 bg-blue-500 text-white rounded"
>
Add Variant
</button>

</div>

{/* IMAGE SECTION */}

<div className="mt-6">

<label className="text-sm block mb-4">
Product Images
</label>

<div className="grid grid-cols-2 md:grid-cols-5 gap-6">

{[0,1,2,3,4].map((index) => (

<div key={index} className="text-center">

<div className="w-full h-28 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50">

{product.images[index] ? (

<img
src={product.images[index]}
alt="preview"
className="h-full object-cover rounded"
/>

) : (

<label className="cursor-pointer text-gray-400 text-sm">

Upload

<input
type="file"
className="hidden"
onChange={(e)=>
handleImageChange(e.target.files[0], index)
}
/>

</label>

)}

</div>

<div className="flex justify-between mt-2 text-sm">

<button
type="button"
className="text-gray-500"
onClick={() => {

const files = [...product.images];
files[index] = null;

setProduct({
...product,
images: files
});

}}
>

Remove

</button>

<label className="cursor-pointer text-gray-500">

✎

<input
type="file"
className="hidden"
onChange={(e)=>
handleImageChange(e.target.files[0], index)
}
/>

</label>

</div>

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