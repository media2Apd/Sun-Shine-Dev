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
//     code: "",
//     shortDescription: "",
//     detailDescription: "",
//     crops: "",
//     packageType: "",
//     gst: "",
//     images: [],
//     showOnWebsite: false,
//     newLaunch: false,
//     featuredProduct: false,

//     variants: [
     
//       {
//         id:Date.now() + Math.random(),
//         capacity: "",
//         unit: "",
//         mrp: "",
//         price: "",
//         stock: "",
//          color: "",        // ✅ NEW
//     type: "",         // ✅ NEW
//     category: "",     // ✅ NEW
//     stockStatus: "",  // ✅ NEW
//     tags: ""          // ✅ NEW
//       }
//     ]
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
//           gst: existingProduct.gst || "",
//           images: existingProduct.images || [existingProduct.image],
//           showOnWebsite: existingProduct.showOnWebsite || false,
//           newLaunch: existingProduct.newLaunch || false,
//           featuredProduct: existingProduct.featuredProduct || false,

//           variants: existingProduct.variants || [
//             {
//               capacity: "",
//               unit: "",
//               mrp: "",
//               price: "",
//               stock: "",
//                 color: "",        // ✅ NEW
//                 type: "",         // ✅ NEW
//                  category: "",     // ✅ NEW
//                 stockStatus: "",  // ✅ NEW
//                    tags: ""  ,        // ✅ NEW
//             }
//           ]
//         });

//       }

//     }

//   }, [id, products]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   const handleVariantChange = (index, field, value) => {

//     const updated = [...product.variants];
//     updated[index][field] = value;

//     setProduct({
//       ...product,
//       variants: updated
//     });

//   };

//   const addVariant = () => {

//   setProduct({
//     ...product,
//     variants: [
//       ...product.variants,
//       {
//         id: Date.now()+ Math.random(),
//         capacity: "",
//         unit: "",
//         mrp: "",
//         price: "",
//         stock: "",
//         color: "",
//         type: "",
//         category: "",
//         stockStatus: "",
//         tags: "",
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
//       variants: product.variants,
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

// <div className="">

// <h2 className="text-2xl font-semibold mb-6">
// {isViewMode ? "View Product" : id ? "Edit Product" : "Add New Product"}
// </h2>

// <form onSubmit={handleSubmit} className="space-y-6">

// {/* Product Name */}

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

// {/* Category */}

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

// {/* Description */}

// <div className="grid grid-cols-2 gap-4">

// <div>
// <label>Short Description</label>

// <textarea
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
// name="detailDescription"
// value={product.detailDescription}
// onChange={handleChange}
// disabled={isViewMode}
// className="w-full border p-2 rounded"
// />

// </div>

// </div>

// {/* Toggles */}

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

// {/* VARIANTS */}

// <div>

// <label className="text-lg font-semibold">Variants</label>

// <div className="overflow-x-auto scrollbar-hide">

// <div className="min-w-[850px]">

// {/* LABEL ROW */}

// <div className="grid grid-cols-5 gap-3 text-sm font-medium text-gray-600 mt-2">
// <span>Capacity</span>
// <span>Unit</span>
// <span>MRP</span>
// <span>Price</span>
// <span>Stock</span>
// </div>

// {/* {product.variants.map((variant,index)=>(

// <div key={index}

// className="grid grid-cols-5 gap-3 mt-2"> */}

// {product.variants.map((variant,index)=>(

// <div key={variant.id}
// className="grid grid-cols-5 gap-3 mt-2">

// <input
// placeholder="capacity"
// value={variant.capacity}
// onChange={(e)=>
// handleVariantChange(index,"capacity",e.target.value)
// }
// className="border p-2 rounded"
// />

// <select
// value={variant.unit}
// onChange={(e)=>
// handleVariantChange(index,"unit",e.target.value)
// }
// className="border p-2 rounded"
// >
// <option value="">Select Unit</option>
// <option value="ml">ml</option>
// <option value="liter">liter</option>
// <option value="kg">kg</option>
// </select>

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

// </div>

// </div>

// <button
// type="button"
// onClick={addVariant}
// className="mt-3 px-3 py-2 bg-blue-500 text-white rounded"
// >
// Add Variant
// </button>

// </div>

// {/* IMAGE SECTION */}

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
// onChange={(e)=>
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
// onChange={(e)=>
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
     video: "", // ✅ ADD THIS
    showOnWebsite: false,
    newLaunch: false,
    featuredProduct: false,

    variants: [
      {
        id: Date.now() + Math.random(),
        capacity: "",
        unit: "",
        mrp: "",
        price: "",
        stock: "",
        color: "",
        type: "",
        category: "",
        stockStatus: "",
        tags: ""
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
          video: existingProduct.video || "",
          showOnWebsite: existingProduct.showOnWebsite || false,
          newLaunch: existingProduct.newLaunch || false,
          featuredProduct: existingProduct.featuredProduct || false,

          variants: existingProduct.variants || [
            {
              id: Date.now() + Math.random(),
              capacity: "",
              unit: "",
              mrp: "",
              price: "",
              stock: "",
              color: "",
              type: "",
              category: "",
              stockStatus: "",
              tags: ""
            }
          ]
        });

      }

    }

  }, [id, products]);

  const handleVideoChange = (file) => {
  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    setProduct({
      ...product,
      video: reader.result
    });
  };

  reader.readAsDataURL(file);
};

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
          id: Date.now() + Math.random(),
          capacity: "",
          unit: "",
          mrp: "",
          price: "",
          stock: "",
          color: "",
          type: "",
          category: "",
          stockStatus: "",
          tags: ""
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
      video: product.video,
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

<div className="">

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

<div className="overflow-x-auto scrollbar-hide">

<div className="min-w-[1400px]">

{/* LABEL ROW */}
<div className="grid grid-cols-10 gap-3 text-sm font-medium text-gray-600 mt-2">
<span>Capacity</span>
<span>Unit</span>
<span>MRP</span>
<span>Price</span>
<span>Stock</span>
<span>Color</span>
<span>Type</span>
<span>Category</span>
<span>Status</span>
<span>Tags</span>
</div>

{product.variants.map((variant,index)=>(

<div key={variant.id} className="grid grid-cols-10 gap-3 mt-2">

<input
placeholder="capacity"
value={variant.capacity}
onChange={(e)=>handleVariantChange(index,"capacity",e.target.value)}
className="border p-2 rounded"
/>

<select
value={variant.unit}
onChange={(e)=>handleVariantChange(index,"unit",e.target.value)}
className="border p-2 rounded"
>
<option value="">Select Unit</option>
<option value="ml">ml</option>
<option value="liter">liter</option>
<option value="kg">kg</option>
</select>

<input
placeholder="MRP"
value={variant.mrp}
onChange={(e)=>handleVariantChange(index,"mrp",e.target.value)}
className="border p-2 rounded"
/>

<input
placeholder="Price"
value={variant.price}
onChange={(e)=>handleVariantChange(index,"price",e.target.value)}
className="border p-2 rounded"
/>

<input
placeholder="Stock"
value={variant.stock}
onChange={(e)=>handleVariantChange(index,"stock",e.target.value)}
className="border p-2 rounded"
/>

<input
placeholder="Color"
value={variant.color}
onChange={(e)=>handleVariantChange(index,"color",e.target.value)}
className="border p-2 rounded"
/>

<input
placeholder="Type"
value={variant.type}
onChange={(e)=>handleVariantChange(index,"type",e.target.value)}
className="border p-2 rounded"
/>

<select
value={variant.category}
onChange={(e)=>handleVariantChange(index,"category",e.target.value)}
className="border p-2 rounded"
>
<option value="">Select Category</option>
{category?.map((cat,i)=>(
<option key={i} value={cat.name}>{cat.name}</option>
))}
</select>

<select
value={variant.stockStatus}
onChange={(e)=>handleVariantChange(index,"stockStatus",e.target.value)}
className="border p-2 rounded"
>
<option value="">Status</option>
<option value="available">Available</option>
<option value="lowstock">Low Stock</option>
<option value="outofstock">Out of Stock</option>
</select>

<input
placeholder="Tags"
value={variant.tags}
onChange={(e)=>handleVariantChange(index,"tags",e.target.value)}
className="border p-2 rounded"
/>

</div>

))}

</div>

</div>

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

{/* VIDEO SECTION */}
<div className="mt-6">
  <label className="text-sm block mb-4">
    Product Video
  </label>

  <div className="w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50">

    {product.video ? (
      <video
        src={product.video}
        controls
        className="h-full rounded"
      />
    ) : (
      <label className="cursor-pointer text-gray-400 text-sm">
        Upload Video
        <input
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) =>
            handleVideoChange(e.target.files[0])
          }
        />
      </label>
    )}

  </div>
</div>

</div>

  );
};

export default NewProduct;

