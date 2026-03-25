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

//   const [product, setFormData] = useState({
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

//         setFormData({
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
//     setFormData({ ...product, [name]: value });
//   };

//   const handleVariantChange = (index, field, value) => {

//     const updated = [...product.variants];
//     updated[index][field] = value;

//     setFormData({
//       ...product,
//       variants: updated
//     });

//   };

//   const addVariant = () => {

//   setFormData({
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

//       setFormData({
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
// setFormData({
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

// setFormData({
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

//   const [product, setFormData] = useState({
//     name: "",
//     category: "",
//     code: "",
//     shortDescription: "",
//     detailDescription: "",
//     crops: "",
//     packageType: "",
//     gst: "",
//     images: [],
//      video: "", // ✅ ADD THIS
//     showOnWebsite: false,
//     newLaunch: false,
//     featuredProduct: false,

//     variants: [
//       {
//         id: Date.now() + Math.random(),
//         capacity: "",
//         unit: "",
//         mrp: "",
//         price: "",
//         stock: "",
//         color: "",
//         type: "",
//         category: "",
//         stockStatus: "",
//         tags: ""
//       }
//     ]
//   });

//   useEffect(() => {

//     if (id) {

//       const existingProduct = products.find(
//         (p) => p.id === Number(id)
//       );

//       if (existingProduct) {

//         setFormData({
//           name: existingProduct.name || "",
//           category: existingProduct.category || "",
//           code: existingProduct.code || "",
//           shortDescription: existingProduct.shortDescription || "",
//           detailDescription: existingProduct.detailDescription || "",
//           crops: existingProduct.crops || "",
//           packageType: existingProduct.packageType || "",
//           gst: existingProduct.gst || "",
//           images: existingProduct.images || [existingProduct.image],
//           video: existingProduct.video || "",
//           showOnWebsite: existingProduct.showOnWebsite || false,
//           newLaunch: existingProduct.newLaunch || false,
//           featuredProduct: existingProduct.featuredProduct || false,

//           variants: existingProduct.variants || [
//             {
//               id: Date.now() + Math.random(),
//               capacity: "",
//               unit: "",
//               mrp: "",
//               price: "",
//               stock: "",
//               color: "",
//               type: "",
//               category: "",
//               stockStatus: "",
//               tags: ""
//             }
//           ]
//         });

//       }

//     }

//   }, [id, products]);

//   const handleVideoChange = (file) => {
//   if (!file) return;

//   const reader = new FileReader();

//   reader.onloadend = () => {
//     setFormData({
//       ...product,
//       video: reader.result
//     });
//   };

//   reader.readAsDataURL(file);
// };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...product, [name]: value });
//   };

//   const handleVariantChange = (index, field, value) => {

//     const updated = [...product.variants];
//     updated[index][field] = value;

//     setFormData({
//       ...product,
//       variants: updated
//     });

//   };

//   const addVariant = () => {

//     setFormData({
//       ...product,
//       variants: [
//         ...product.variants,
//         {
//           id: Date.now() + Math.random(),
//           capacity: "",
//           unit: "",
//           mrp: "",
//           price: "",
//           stock: "",
//           color: "",
//           type: "",
//           category: "",
//           stockStatus: "",
//           tags: ""
//         }
//       ]
//     });

//   };

//   const handleImageChange = (file, index) => {

//     if (!file) return;

//     const reader = new FileReader();

//     reader.onloadend = () => {

//       const updatedImages = [...product.images];
//       updatedImages[index] = reader.result;

//       setFormData({
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
//       video: product.video,
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
// setFormData({
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

// <div className="min-w-[1400px]">

// {/* LABEL ROW */}
// <div className="grid grid-cols-10 gap-3 text-sm font-medium text-gray-600 mt-2">
// <span>Capacity</span>
// <span>Unit</span>
// <span>MRP</span>
// <span>Price</span>
// <span>Stock</span>
// <span>Color</span>
// <span>Type</span>
// <span>Category</span>
// <span>Status</span>
// <span>Tags</span>
// </div>

// {product.variants.map((variant,index)=>(

// <div key={variant.id} className="grid grid-cols-10 gap-3 mt-2">

// <input
// placeholder="capacity"
// value={variant.capacity}
// onChange={(e)=>handleVariantChange(index,"capacity",e.target.value)}
// className="border p-2 rounded"
// />

// <select
// value={variant.unit}
// onChange={(e)=>handleVariantChange(index,"unit",e.target.value)}
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
// onChange={(e)=>handleVariantChange(index,"mrp",e.target.value)}
// className="border p-2 rounded"
// />

// <input
// placeholder="Price"
// value={variant.price}
// onChange={(e)=>handleVariantChange(index,"price",e.target.value)}
// className="border p-2 rounded"
// />

// <input
// placeholder="Stock"
// value={variant.stock}
// onChange={(e)=>handleVariantChange(index,"stock",e.target.value)}
// className="border p-2 rounded"
// />

// <input
// placeholder="Color"
// value={variant.color}
// onChange={(e)=>handleVariantChange(index,"color",e.target.value)}
// className="border p-2 rounded"
// />

// <input
// placeholder="Type"
// value={variant.type}
// onChange={(e)=>handleVariantChange(index,"type",e.target.value)}
// className="border p-2 rounded"
// />

// <select
// value={variant.category}
// onChange={(e)=>handleVariantChange(index,"category",e.target.value)}
// className="border p-2 rounded"
// >
// <option value="">Select Category</option>
// {category?.map((cat,i)=>(
// <option key={i} value={cat.name}>{cat.name}</option>
// ))}
// </select>

// <select
// value={variant.stockStatus}
// onChange={(e)=>handleVariantChange(index,"stockStatus",e.target.value)}
// className="border p-2 rounded"
// >
// <option value="">Status</option>
// <option value="available">Available</option>
// <option value="lowstock">Low Stock</option>
// <option value="outofstock">Out of Stock</option>
// </select>

// <input
// placeholder="Tags"
// value={variant.tags}
// onChange={(e)=>handleVariantChange(index,"tags",e.target.value)}
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

// {/* VIDEO SECTION */}
// <div className="mt-6">
//   <label className="text-sm block mb-4">
//     Product Video
//   </label>

//   <div className="w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50">

//     {product.video ? (
//       <video
//         src={product.video}
//         controls
//         className="h-full rounded"
//       />
//     ) : (
//       <label className="cursor-pointer text-gray-400 text-sm">
//         Upload Video
//         <input
//           type="file"
//           accept="video/*"
//           className="hidden"
//           onChange={(e) =>
//             handleVideoChange(e.target.files[0])
//           }
//         />
//       </label>
//     )}

//   </div>
// </div>

// </div>

//   );
// };

// export default NewProduct;



// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { FiPlus, FiTrash2, FiUpload, FiVideo, FiInfo } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const NewProduct = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);

//   // --- 1. STATE STRUCTURE ---
//   const [product, setFormData] = useState({
//     name: "",
//     categoryId: "",
//     brand: "",
//     shortDescription: "",
//     fullDescription: "",
//     video: null,
//     images: [],
//     showOnWebsite: true,
//     isNewLaunch: false,
//     isFeatured: false,
    
//     // VARIANTS SYSTEM
//     variants: [
//       {
//         id: Date.now(),
//         sku: "",
//         size: "", // e.g. 500, 1, 5
//         unit: "kg", // ml, L, kg, unit
//         mrp: "",
//         sellingPrice: "",
//         stock: "",
//         // KEY-VALUE ATTRIBUTES (Technical Specs)
//         attributes: [{ key: "Composition", value: "" }] 
//       }
//     ]
//   });

//   // --- 2. LOAD DATA ---
//   useEffect(() => {
//     fetchCategories();
//     if (id) fetchProductDetails();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...product, [name]: value });
//   };


//   const fetchCategories = async () => {
//     const res = await api(SummaryApi.getAllCategories);
//     if (res.data.success) setCategories(res.data.data);
//   };

//   const fetchProductDetails = async () => {
//     const res = await api(SummaryApi.getProductById(id));
//     if (res.data.success) setFormData(res.data.data);
//   };

//   // --- 3. DYNAMIC HANDLERS ---
//   const handleVariantChange = (vIndex, field, value) => {
//     const updatedVariants = [...product.variants];
//     updatedVariants[vIndex][field] = value;
//     setFormData({ ...product, variants: updatedVariants });
//   };

//   const addAttribute = (vIndex) => {
//     const updatedVariants = [...product.variants];
//     updatedVariants[vIndex].attributes.push({ key: "", value: "" });
//     setFormData({ ...product, variants: updatedVariants });
//   };

//   const handleAttributeChange = (vIndex, aIndex, field, value) => {
//     const updatedVariants = [...product.variants];
//     updatedVariants[vIndex].attributes[aIndex][field] = value;
//     setFormData({ ...product, variants: updatedVariants });
//   };

//   const removeAttribute = (vIndex, aIndex) => {
//     const updatedVariants = [...product.variants];
//     updatedVariants[vIndex].attributes.splice(aIndex, 1);
//     setFormData({ ...product, variants: updatedVariants });
//   };

//   const addVariant = () => {
//     setFormData({
//       ...product,
//       variants: [...product.variants, { id: Date.now(), attributes: [], unit: "kg" }]
//     });
//   };

//   // --- 4. FILE SUBMISSION (FORM DATA) ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     // Normal fields
//     Object.keys(product).forEach(key => {
//       if (key !== 'variants' && key !== 'images' && key !== 'video') {
//         formData.append(key, product[key]);
//       }
//     });

//     // Important: JSON stringify nested objects for backend to parse
//     formData.append("variants", JSON.stringify(product.variants));
    
//     // Files
//     if (product.video) formData.append("video", product.video);
//     product.images.forEach(img => formData.append("images", img));

//     try {
//       const response = await api({
//         url: id ? SummaryApi.updateProduct(id).url : SummaryApi.createProduct.url,
//         method: id ? "PUT" : "POST",
//         data: formData
//       });
//       if (response.data.success) {
//         toast.success("Product Saved!");
//         navigate("/admin-panel/product-list");
//       }
//     } catch (err) {
//       toast.error("Error saving product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 max-w-6xl mx-auto pb-20">
//       <form onSubmit={handleSubmit} className="space-y-8">
//         <header className="flex justify-between items-center">
//           <h2 className="text-2xl font-bold">Manage Agricultural Product</h2>
//           <div className="flex gap-2">
//             <button type="button" onClick={() => navigate(-1)} className="px-6 py-2 border rounded-full">Cancel</button>
//             <button type="submit" className="px-8 py-2 bg-green-600 text-white rounded-full font-bold shadow-lg">
//               {loading ? "Saving..." : "Save Product"}
//             </button>
//           </div>
//         </header>

//         {/* SECTION 1: BASIC INFO */}
//         <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//           <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><FiInfo /> General Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <input 
//               placeholder="Product Name (e.g. Organic Neem Fertilizer)" 
//               className="w-full border p-3 rounded-xl outline-none focus:border-green-500"
//               name="name" value={product.name} onChange={handleChange} required
//             />
//             <select 
//               name="categoryId" 
//               className="w-full border p-3 rounded-xl outline-none"
//               value={product.categoryId} onChange={handleChange} required
//             >
//               <option value="">Select Category</option>
//               {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//             </select>
//           </div>
//           <textarea 
//             placeholder="Short Summary for listings..." 
//             className="w-full border p-3 rounded-xl mt-4 h-20 outline-none"
//             name="shortDescription" value={product.shortDescription} onChange={handleChange}
//           />
//         </section>

//         {/* SECTION 2: VARIANTS & TECHNICAL SPECS */}
//         <section className="space-y-4">
//           <div className="flex justify-between items-center">
//             <h3 className="font-bold text-gray-700">Product Variants (Sizes/Technical Specs)</h3>
//             <button type="button" onClick={addVariant} className="text-green-600 flex items-center gap-1 font-bold">
//               <FiPlus /> Add New Size
//             </button>
//           </div>

//           {product.variants.map((variant, vIndex) => (
//             <div key={variant.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
//               <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                 <input placeholder="Capacity/Size" className="border p-2 rounded-lg" value={variant.size} onChange={(e) => handleVariantChange(vIndex, 'size', e.target.value)} />
//                 <select className="border p-2 rounded-lg" value={variant.unit} onChange={(e) => handleVariantChange(vIndex, 'unit', e.target.value)}>
//                   <option value="ml">ml</option><option value="liter">liter</option><option value="kg">kg</option><option value="unit">Unit (Labware)</option>
//                 </select>
//                 <input placeholder="MRP" className="border p-2 rounded-lg" value={variant.mrp} onChange={(e) => handleVariantChange(vIndex, 'mrp', e.target.value)} />
//                 <input placeholder="Selling Price" className="border p-2 rounded-lg" value={variant.sellingPrice} onChange={(e) => handleVariantChange(vIndex, 'sellingPrice', e.target.value)} />
//                 <input placeholder="Stock" className="border p-2 rounded-lg" value={variant.stock} onChange={(e) => handleVariantChange(vIndex, 'stock', e.target.value)} />
//               </div>

//               {/* DYNAMIC KEY-VALUE ATTRIBUTES */}
//               <div className="bg-gray-50 p-4 rounded-xl">
//                 <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Technical Specifications (Lab/Agriculture Data)</p>
//                 {variant.attributes.map((attr, aIndex) => (
//                   <div key={aIndex} className="flex gap-3 mb-2">
//                     <input 
//                       placeholder="Property (e.g. PH Level)" 
//                       className="flex-1 border p-2 rounded-lg text-sm" 
//                       value={attr.key} 
//                       onChange={(e) => handleAttributeChange(vIndex, aIndex, 'key', e.target.value)} 
//                     />
//                     <input 
//                       placeholder="Value (e.g. 6.5 - 7.5)" 
//                       className="flex-1 border p-2 rounded-lg text-sm" 
//                       value={attr.value} 
//                       onChange={(e) => handleAttributeChange(vIndex, aIndex, 'value', e.target.value)} 
//                     />
//                     <button type="button" onClick={() => removeAttribute(vIndex, aIndex)} className="text-red-400 hover:text-red-600"><FiTrash2 /></button>
//                   </div>
//                 ))}
//                 <button type="button" onClick={() => addAttribute(vIndex)} className="text-xs text-blue-600 font-bold mt-2">+ Add Specification Field</button>
//               </div>
//             </div>
//           ))}
//         </section>

//         {/* SECTION 3: MEDIA */}
//         <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
//            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
//               <h3 className="font-bold mb-4 flex items-center gap-2"><FiUpload /> Product Gallery</h3>
//               <input type="file" multiple className="text-sm" onChange={(e) => setFormData({...product, images: Array.from(e.target.files)})} />
//            </div>
//            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
//               <h3 className="font-bold mb-4 flex items-center gap-2"><FiVideo /> Product Video (Tutorial/Demo)</h3>
//               <input type="file" accept="video/*" className="text-sm" onChange={(e) => setFormData({...product, video: e.target.files[0]})} />
//            </div>
//         </section>
//       </form>
//     </div>
//   );
// };

// export default NewProduct;


// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { 
//   FiPlus, FiTrash2, FiUpload, FiVideo, FiInfo, 
//   FiPackage, FiLayers, FiChevronLeft 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const NewProduct = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { pathname } = useLocation();

//   const isViewMode = pathname.includes("view-product");
//   const isEditMode = !!id && !isViewMode;

//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);

//   // --- INITIAL STATE ---
//   const initialVariant = () => ({
//     id: Date.now() + Math.random(),
//     sku: "",
//     capacity: "",
//     unit: "kg",
//     mrp: "",
//     price: "",
//     stock: "",
//     stockStatus: "In Stock",
//     additionalInfo: [{ key: "", value: "" }]
//   });

//   const [product, setFormData] = useState({
//     name: "",
//     categoryId: "",
//     brand: "",
//     gst: "5",
//     shortDescription: "",
//     detailDescription: "",
//     showOnWebsite: true,
//     newLaunch: false,
//     featuredProduct: false,
//     images: [], // File objects
//     video: null, // File object
//     variants: [initialVariant()]
//   });

//   // For UI Previews
//   const [previews, setPreviews] = useState({
//     images: Array(5).fill(null),
//     video: null
//   });

//   // --- LOAD DATA ---
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await api({
//           url: SummaryApi.getAllCategories.url,
//           method: SummaryApi.getAllCategories.method
//         });
//         if (res.data.success) setCategories(res.data.data);
//       } catch (err) {
//         toast.error("Error loading categories");
//       }
//     };

//     const fetchProductDetails = async () => {
//       if (!id) return;
//       setLoading(true);
//       try {
//         const res = await api({
//           url: SummaryApi.getProductById?.url ? SummaryApi.getProductById.url(id) : `${SummaryApi.getAllProduct.url}/${id}`,
//           method: "GET"
//         });
//         if (res.data.success) {
//           const p = res.data.data;
//           setFormData({
//             ...p,
//             categoryId: p.categoryId?._id || p.categoryId,
//             images: [], // We don't overwrite existing files
//             video: null
//           });
//           // Set previews for existing Cloudinary URLs
//           setPreviews({
//             images: [...(p.images || []), ...Array(5).fill(null)].slice(0, 5),
//             video: p.video || null
//           });
//         }
//       } catch (err) {
//         toast.error("Error loading product details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//     fetchProductDetails();
//   }, [id]);

//   // --- HANDLERS ---
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value
//     }));
//   };

//   const handleToggle = (name) => {
//     if (isViewMode) return;
//     setFormData(prev => ({ ...prev, [name]: !prev[name] }));
//   };

//   // Variant Handlers
//   const addVariant = () => {
//     setFormData(prev => ({
//       ...prev,
//       variants: [...prev.variants, initialVariant()]
//     }));
//   };

//   const removeVariant = (index) => {
//     if (product.variants.length === 1) return toast.error("At least one variant required");
//     const updated = [...product.variants];
//     updated.splice(index, 1);
//     setFormData({ ...product, variants: updated });
//   };

//   const onVariantChange = (index, field, value) => {
//     const updated = [...product.variants];
//     updated[index][field] = value;
//     setFormData({ ...product, variants: updated });
//   };

//   // Additional Info (Key-Value) Handlers
//   const addInfoRow = (vIndex) => {
//     const updated = [...product.variants];
//     updated[vIndex].additionalInfo.push({ key: "", value: "" });
//     setFormData({ ...product, variants: updated });
//   };

//   const removeInfoRow = (vIndex, iIndex) => {
//     const updated = [...product.variants];
//     updated[vIndex].additionalInfo.splice(iIndex, 1);
//     setFormData({ ...product, variants: updated });
//   };

//   const onInfoChange = (vIndex, iIndex, field, value) => {
//     const updated = [...product.variants];
//     updated[vIndex].additionalInfo[iIndex][field] = value;
//     setFormData({ ...product, variants: updated });
//   };

//   // Media Handlers
//   const handleImageChange = (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const newImages = [...product.images];
//     newImages[index] = file;
//     setFormData({ ...product, images: newImages });

//     const newPreviews = [...previews.images];
//     newPreviews[index] = URL.createObjectURL(file);
//     setPreviews({ ...previews, images: newPreviews });
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setFormData({ ...product, video: file });
//     setPreviews({ ...previews, video: URL.createObjectURL(file) });
//   };

//   // --- SUBMIT ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!product.name || !product.categoryId) return toast.error("Basic info missing");

//     setLoading(true);
//     const formData = new FormData();

//     // Append regular fields
//     Object.keys(product).forEach(key => {
//       if (!['variants', 'images', 'video'].includes(key)) {
//         formData.append(key, product[key]);
//       }
//     });

//     // Handle Variants (JSON stringify is best for nested arrays in FormData)
//     formData.append("variants", JSON.stringify(product.variants));

//     // Handle Files
//     product.images.forEach(img => {
//       if (img instanceof File) formData.append("images", img);
//     });
//     if (product.video instanceof File) formData.append("video", product.video);

//     try {
//       const config = isEditMode 
//         ? SummaryApi.updateProduct(id) 
//         : SummaryApi.createProduct;

//       const res = await api({
//         url: config.url,
//         method: config.method,
//         data: formData,
//         headers: { "Content-Type": "multipart/form-data" }
//       });

//       if (res.data.success) {
//         toast.success(isEditMode ? "Product Updated!" : "Product Created!");
//         navigate("/admin-panel/product-list");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error saving product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-2 md:p-4 max-w-7xl mx-auto pb-20">
//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//         <div>
//           <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-green-600 mb-2 transition-all">
//             <FiChevronLeft /> Back to List
//           </button>
//           <h2 className="text-3xl font-extrabold text-gray-800">
//             {isViewMode ? "View Product" : isEditMode ? "Edit Product" : "Add Product"}
//           </h2>
//         </div>
//         {!isViewMode && (
//           <div className="flex gap-3 w-full md:w-auto">
//             <button 
//               onClick={handleSubmit} 
//               disabled={loading}
//               className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-full font-bold shadow-lg shadow-green-100 transition-all active:scale-95 disabled:opacity-50"
//             >
//               {loading ? "Processing..." : "Save Product Data"}
//             </button>
//           </div>
//         )}
//       </div>

//       <form className="space-y-8">
//         {/* BASIC INFORMATION */}
//         <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//           <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//             <FiInfo className="text-green-500" /> Basic Information
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="md:col-span-2">
//               <label className="text-sm font-bold text-gray-600 ml-1">Product Name *</label>
//               <input name="name" value={product.name} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 outline-none focus:border-green-500" placeholder="e.g. Organic NPK Fertilizer" required />
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600 ml-1">Brand</label>
//               <input name="brand" value={product.brand} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 outline-none focus:border-green-500" placeholder="e.g. AgriGrow" />
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600 ml-1">Category *</label>
//               <select name="categoryId" value={product.categoryId} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 outline-none focus:border-green-500" required>
//                 <option value="">Select Category</option>
//                 {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//               </select>
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600 ml-1">GST (%)</label>
//               <select name="gst" value={product.gst} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 outline-none focus:border-green-500">
//                 <option value="0">0%</option><option value="5">5%</option><option value="12">12%</option><option value="18">18%</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//             <div>
//               <label className="text-sm font-bold text-gray-600 ml-1">Short Description</label>
//               <textarea name="shortDescription" value={product.shortDescription} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 h-24 resize-none" placeholder="Summary for product cards..." />
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600 ml-1">Detailed Description</label>
//               <textarea name="detailDescription" value={product.detailDescription} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 h-24 resize-none" placeholder="Usage, ingredients, lab standards..." />
//             </div>
//           </div>
//         </div>

//         {/* WEBSITE SETTINGS */}
//         <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//           <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//             <FiLayers className="text-green-500" /> Website & Display Settings
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               { label: "Show on Website", name: "showOnWebsite" },
//               { label: "New Launch Product", name: "newLaunch" },
//               { label: "Featured Product", name: "featuredProduct" }
//             ].map(item => (
//               <div key={item.name} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
//                 <span className="font-semibold text-gray-700">{item.label}</span>
//                 <button
//                   type="button"
//                   onClick={() => handleToggle(item.name)}
//                   className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${product[item.name] ? "bg-green-600" : "bg-gray-300"}`}
//                 >
//                   <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all ${product[item.name] ? "translate-x-6" : ""}`} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* VARIANTS & DYNAMIC ADDITIONAL INFO */}
//         <div className="space-y-6">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
//               <FiPackage className="text-green-600" /> Product Variants
//             </h3>
//             {!isViewMode && (
//               <button type="button" onClick={addVariant} className="flex items-center gap-1 bg-green-50 text-green-700 px-4 py-2 rounded-xl font-bold hover:bg-green-100 transition-all">
//                 <FiPlus /> Add Variant
//               </button>
//             )}
//           </div>

//           {product.variants.map((variant, vIndex) => (
//             <div key={variant.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm relative animate-fadeIn">
//               {!isViewMode && product.variants.length > 1 && (
//                 <button onClick={() => removeVariant(vIndex)} className="absolute -top-3 -right-3 bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 shadow-sm border border-white">
//                   <FiTrash2 />
//                 </button>
//               )}

//               {/* Variant Core Fields */}
//               <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
//                 <div className="md:col-span-2">
//                   <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">SKU Code</label>
//                   <input placeholder="SKU001" className="w-full border p-2 rounded-lg mt-1" value={variant.sku} onChange={(e) => onVariantChange(vIndex, 'sku', e.target.value)} disabled={isViewMode} />
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Capacity</label>
//                   <input placeholder="500" className="w-full border p-2 rounded-lg mt-1" value={variant.capacity} onChange={(e) => onVariantChange(vIndex, 'capacity', e.target.value)} disabled={isViewMode} />
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Unit</label>
//                   <select className="w-full border p-2 rounded-lg mt-1" value={variant.unit} onChange={(e) => onVariantChange(vIndex, 'unit', e.target.value)} disabled={isViewMode}>
//                     <option value="ml">ml</option><option value="liter">liter</option><option value="kg">kg</option><option value="unit">Unit</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">MRP</label>
//                   <input type="number" placeholder="0" className="w-full border p-2 rounded-lg mt-1" value={variant.mrp} onChange={(e) => onVariantChange(vIndex, 'mrp', e.target.value)} disabled={isViewMode} />
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Selling Price</label>
//                   <input type="number" placeholder="0" className="w-full border p-2 rounded-lg mt-1" value={variant.price} onChange={(e) => onVariantChange(vIndex, 'price', e.target.value)} disabled={isViewMode} />
//                 </div>
//               </div>

//               {/* Additional Specs (The Agriculture/Lab dynamic data) */}
//               <div className="mt-6 bg-green-50/50 p-4 rounded-2xl border border-green-100">
//                 <div className="flex justify-between items-center mb-4">
//                   <p className="text-sm font-bold text-green-800">Technical Specifications / Lab Info</p>
//                   {!isViewMode && (
//                     <button type="button" onClick={() => addInfoRow(vIndex)} className="text-xs font-bold text-green-600 bg-white px-3 py-1 rounded-full border border-green-200">
//                       + Add Key-Value
//                     </button>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {variant.additionalInfo.map((info, iIndex) => (
//                     <div key={iIndex} className="flex gap-2 items-center">
//                       <input 
//                         placeholder="Key (e.g. Composition)" 
//                         className="flex-1 text-sm border p-2 rounded-lg" 
//                         value={info.key} 
//                         onChange={(e) => onInfoChange(vIndex, iIndex, 'key', e.target.value)} 
//                         disabled={isViewMode}
//                       />
//                       <input 
//                         placeholder="Value (e.g. 90% Zinc)" 
//                         className="flex-1 text-sm border p-2 rounded-lg" 
//                         value={info.value} 
//                         onChange={(e) => onInfoChange(vIndex, iIndex, 'value', e.target.value)} 
//                         disabled={isViewMode}
//                       />
//                       {!isViewMode && (
//                         <button type="button" onClick={() => removeInfoRow(vIndex, iIndex)} className="text-red-400 hover:text-red-600">
//                           <FiTrash2 size={16} />
//                         </button>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* MEDIA SECTION */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* IMAGE UPLOAD */}
//           <div className="md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//             <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//               <FiUpload className="text-green-500" /> Product Images (Max 5)
//             </h3>
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//               {[0, 1, 2, 3, 4].map((idx) => (
//                 <div key={idx} className="relative group aspect-square border-2 border-dashed rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50 border-gray-200">
//                   {previews.images[idx] ? (
//                     <img src={previews.images[idx]} alt="preview" className="w-full h-full object-cover" />
//                   ) : (
//                     <label className="cursor-pointer flex flex-col items-center gap-1">
//                       <FiPlus className="text-gray-300" size={24} />
//                       <span className="text-[10px] font-bold text-gray-400 uppercase">Upload</span>
//                       <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, idx)} disabled={isViewMode} />
//                     </label>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* VIDEO UPLOAD */}
//           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//             <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//               <FiVideo className="text-green-500" /> Product Video
//             </h3>
//             <div className="relative group aspect-video border-2 border-dashed rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50 border-gray-200">
//               {previews.video ? (
//                 <video src={previews.video} controls className="w-full h-full object-cover" />
//               ) : (
//                 <label className="cursor-pointer flex flex-col items-center gap-2">
//                   <FiPlus className="text-gray-300" size={24} />
//                   <span className="text-xs font-bold text-gray-400 uppercase">Upload Video</span>
//                   <input type="file" hidden accept="video/*" onChange={handleVideoChange} disabled={isViewMode} />
//                 </label>
//               )}
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default NewProduct;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { 
//   FiPlus, FiTrash2, FiUpload, FiVideo, FiInfo, 
//   FiPackage, FiLayers, FiChevronLeft, FiEye, FiX, FiPlay 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const NewProduct = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { pathname } = useLocation();

//   const isViewMode = pathname.includes("view-product");
//   const isEditMode = !!id && !isViewMode;

//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
  
//   // Modal states for View functionality
//   const [previewModal, setPreviewModal] = useState({ isOpen: false, url: null, type: null });

//   // --- INITIAL STATE ---
//   const initialVariant = () => ({
//     id: Date.now() + Math.random(),
//     sku: "",
//     capacity: "",
//     unit: "kg",
//     mrp: "",
//     price: "",
//     stock: "",
//     stockStatus: "In Stock",
//     additionalInfo: [{ key: "", value: "" }]
//   });

//   const [product, setFormData] = useState({
//     name: "",
//     categoryId: "",
//     brand: "",
//     shortDescription: "",
//     detailDescription: "",
//     showOnWebsite: true,
//     newLaunch: false,
//     featuredProduct: false,
//     images: Array(5).fill(null),
//     video: null,
//     variants: [initialVariant()]
//   });

//   const [previews, setPreviews] = useState({
//     images: Array(5).fill(null),
//     video: null
//   });

//   // --- LOAD DATA ---
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await api({
//           url: SummaryApi.getAllCategories.url,
//           method: SummaryApi.getAllCategories.method
//         });
//         if (res.data.success) setCategories(res.data.data);
//       } catch (err) {
//         toast.error("Error loading categories");
//       }
//     };

//     const fetchProductDetails = async () => {
//       if (!id) return;
//       setLoading(true);
//       try {
//         const res = await api({
//           url: SummaryApi.getProductById?.url ? SummaryApi.getProductById.url(id) : `${SummaryApi.getAllProduct.url}/${id}`,
//           method: "GET"
//         });
//         if (res.data.success) {
//           const p = res.data.data;
//           setFormData({
//             ...p,
//             categoryId: p.categoryId?._id || p.categoryId,
//             images: Array(5).fill(null),
//             video: null,
//             variants: p.variants || [initialVariant()]
//           });
          
//           const existingImages = [...(p.images || [])];
//           const newPreviews = Array(5).fill(null);
//           existingImages.forEach((url, i) => { if(i < 5) newPreviews[i] = url; });
          
//           setPreviews({
//             images: newPreviews,
//             video: p.video || null
//           });
//         }
//       } catch (err) {
//         toast.error("Error loading product details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//     fetchProductDetails();
//   }, [id]);

//   // --- HANDLERS ---
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleToggle = (name) => {
//     if (isViewMode) return;
//     setFormData(prev => ({ ...prev, [name]: !prev[name] }));
//   };

//   // Variant Handlers
//   const addVariant = () => setFormData(prev => ({ ...prev, variants: [...prev.variants, initialVariant()] }));
//   const removeVariant = (index) => {
//     if (product.variants.length === 1) return toast.error("At least one variant required");
//     const updated = [...product.variants];
//     updated.splice(index, 1);
//     setFormData({ ...product, variants: updated });
//   };
//   const onVariantChange = (index, field, value) => {
//     const updated = [...product.variants];
//     updated[index][field] = value;
//     setFormData({ ...product, variants: updated });
//   };
//   const onInfoChange = (vIndex, iIndex, field, value) => {
//     const updated = [...product.variants];
//     updated[vIndex].additionalInfo[iIndex][field] = value;
//     setFormData({ ...product, variants: updated });
//   };
//   const addInfoRow = (vIndex) => {
//     const updated = [...product.variants];
//     updated[vIndex].additionalInfo.push({ key: "", value: "" });
//     setFormData({ ...product, variants: updated });
//   };
//   const removeInfoRow = (vIndex, iIndex) => {
//     const updated = [...product.variants];
//     updated[vIndex].additionalInfo.splice(iIndex, 1);
//     setFormData({ ...product, variants: updated });
//   };

//   // --- MEDIA HANDLERS (IMAGE) ---
//   const handleImageChange = (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 2 * 1024 * 1024) return toast.error("Image must be less than 2MB");

//     const newImages = [...product.images];
//     newImages[index] = file;
//     setFormData(prev => ({ ...prev, images: newImages }));

//     const newPreviews = [...previews.images];
//     newPreviews[index] = URL.createObjectURL(file);
//     setPreviews(prev => ({ ...prev, images: newPreviews }));
//   };

//   const removeImage = (index) => {
//     const newImages = [...product.images];
//     newImages[index] = null;
//     const newPreviews = [...previews.images];
//     newPreviews[index] = null;
//     setFormData(prev => ({ ...prev, images: newImages }));
//     setPreviews(prev => ({ ...prev, images: newPreviews }));
//   };

//   // --- MEDIA HANDLERS (VIDEO) ---
//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 15 * 1024 * 1024) return toast.error("Video must be less than 15MB");

//     setFormData(prev => ({ ...prev, video: file }));
//     setPreviews(prev => ({ ...prev, video: URL.createObjectURL(file) }));
//   };

//   const removeVideo = () => {
//     setFormData(prev => ({ ...prev, video: null }));
//     setPreviews(prev => ({ ...prev, video: null }));
//   };

//   const closePreview = () => setPreviewModal({ isOpen: false, url: null, type: null });

//   // --- SUBMIT ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!product.name || !product.categoryId) return toast.error("Basic info missing");

//     setLoading(true);
//     const formData = new FormData();

//     Object.keys(product).forEach(key => {
//       if (!['variants', 'images', 'video'].includes(key)) {
//         formData.append(key, product[key]);
//       }
//     });

//     formData.append("variants", JSON.stringify(product.variants));

//     // Handle Image uploads
//     product.images.forEach(img => {
//       if (img instanceof File) formData.append("images", img);
//     });
    
//     // Handle existing images for Edit mode
//     const remainingUrls = previews.images.filter(img => typeof img === 'string' && img.startsWith('http'));
//     formData.append("existingImages", JSON.stringify(remainingUrls));

//     // Handle Video
//     if (product.video instanceof File) {
//       formData.append("video", product.video);
//     } else if (typeof previews.video === 'string' && previews.video.startsWith('http')) {
//       formData.append("existingVideo", previews.video);
//     }

//     try {
//       const config = isEditMode ? SummaryApi.updateProduct(id) : SummaryApi.createProduct;
//       const res = await api({
//         url: config.url,
//         method: config.method,
//         data: formData,
//         headers: { "Content-Type": "multipart/form-data" }
//       });

//       if (res.data.success) {
//         toast.success(isEditMode ? "Product Updated!" : "Product Created!");
//         navigate("/admin-panel/product-list");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error saving product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-2 md:p-4 max-w-7xl mx-auto pb-20 relative">
      
//       {/* GLOBAL MEDIA PREVIEW MODAL */}
//       {previewModal.isOpen && (
//         <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
//           <button onClick={closePreview} className="absolute top-6 right-6 text-white text-4xl hover:text-red-500 transition-colors z-50">
//             <FiX />
//           </button>
//           <div className="w-full max-w-5xl max-h-[90vh] flex items-center justify-center">
//             {previewModal.type === 'video' ? (
//               <video src={previewModal.url} controls autoPlay className="max-w-full max-h-[85vh] shadow-2xl rounded-lg" />
//             ) : (
//               <img src={previewModal.url} alt="Full view" className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-lg" />
//             )}
//           </div>
//         </div>
//       )}

//       {/* HEADER SECTION */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//         <div>
//           <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-green-600 mb-2 transition-all">
//             <FiChevronLeft /> Back to List
//           </button>
//           <h2 className="text-3xl font-extrabold text-gray-800">
//             {isViewMode ? "View Product" : isEditMode ? "Edit Product" : "Add Product"}
//           </h2>
//         </div>
//         {!isViewMode && (
//           <button onClick={handleSubmit} disabled={loading} className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-full font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50">
//             {loading ? "Processing..." : "Save Product Data"}
//           </button>
//         )}
//       </div>

//       <form className="space-y-8">
//         {/* BASIC INFORMATION */}
//         <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//           <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//             <FiInfo className="text-green-500" /> Basic Information
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="md:col-span-2">
//               <label className="text-sm font-bold text-gray-600">Product Name *</label>
//               <input name="name" value={product.name} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 outline-none focus:border-green-500" placeholder="Product Title" />
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600">Brand</label>
//               <input name="brand" value={product.brand} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 outline-none focus:border-green-500" />
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600">Category *</label>
//               <select name="categoryId" value={product.categoryId} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 outline-none focus:border-green-500">
//                 <option value="">Select Category</option>
//                 {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//               </select>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//             <textarea name="shortDescription" value={product.shortDescription} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl h-24 resize-none" placeholder="Brief summary..." />
//             <textarea name="detailDescription" value={product.detailDescription} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl h-24 resize-none" placeholder="Detailed product specs..." />
//           </div>
//         </div>

//         {/* WEBSITE SETTINGS */}
//         <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//           <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//             <FiLayers className="text-green-500" /> Visibility Settings
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               { label: "Show on Website", name: "showOnWebsite" },
//               { label: "New Launch", name: "newLaunch" },
//               { label: "Featured Product", name: "featuredProduct" }
//             ].map(item => (
//               <div key={item.name} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
//                 <span className="font-semibold text-gray-700">{item.label}</span>
//                 <button type="button" onClick={() => handleToggle(item.name)} className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${product[item.name] ? "bg-green-600" : "bg-gray-300"}`}>
//                   <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all ${product[item.name] ? "translate-x-6" : ""}`} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* VARIANTS */}
//         <div className="space-y-6">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
//               <FiPackage className="text-green-600" /> Variants & Pricing
//             </h3>
//             {!isViewMode && (
//               <button type="button" onClick={addVariant} className="flex items-center gap-1 bg-green-50 text-green-700 px-4 py-2 rounded-xl font-bold hover:bg-green-100 transition-all">
//                 <FiPlus /> Add Variant
//               </button>
//             )}
//           </div>

//           {product.variants.map((variant, vIndex) => (
//             <div key={variant.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm relative">
//               {!isViewMode && product.variants.length > 1 && (
//                 <button type="button" onClick={() => removeVariant(vIndex)} className="absolute -top-3 -right-3 bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 border border-white shadow-md">
//                   <FiTrash2 />
//                 </button>
//               )}
//               <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
//                 <div className="md:col-span-2">
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">SKU</label>
//                   <input className="w-full border p-2 rounded-lg mt-1" value={variant.sku} onChange={(e) => onVariantChange(vIndex, 'sku', e.target.value)} disabled={isViewMode} />
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">Capacity</label>
//                   <input className="w-full border p-2 rounded-lg mt-1" value={variant.capacity} onChange={(e) => onVariantChange(vIndex, 'capacity', e.target.value)} disabled={isViewMode} />
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">Unit</label>
//                   <select className="w-full border p-2 rounded-lg mt-1" value={variant.unit} onChange={(e) => onVariantChange(vIndex, 'unit', e.target.value)} disabled={isViewMode}>
//                     <option value="ml">ml</option><option value="liter">liter</option><option value="kg">kg</option><option value="unit">Unit</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">MRP</label>
//                   <input type="number" className="w-full border p-2 rounded-lg mt-1" value={variant.mrp} onChange={(e) => onVariantChange(vIndex, 'mrp', e.target.value)} disabled={isViewMode} />
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">Price</label>
//                   <input type="number" className="w-full border p-2 rounded-lg mt-1" value={variant.price} onChange={(e) => onVariantChange(vIndex, 'price', e.target.value)} disabled={isViewMode} />
//                 </div>
//               </div>

//               <div className="mt-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
//                 <div className="flex justify-between items-center mb-4">
//                   <p className="text-sm font-bold text-gray-600 uppercase tracking-tighter">Technical Details</p>
//                   {!isViewMode && (
//                     <button type="button" onClick={() => addInfoRow(vIndex)} className="text-xs font-bold text-green-600 bg-white px-3 py-1 rounded-full border border-green-200">+ Add Field</button>
//                   )}
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {variant.additionalInfo.map((info, iIndex) => (
//                     <div key={iIndex} className="flex gap-2 items-center">
//                       <input placeholder="Key" className="flex-1 text-sm border p-2 rounded-lg" value={info.key} onChange={(e) => onInfoChange(vIndex, iIndex, 'key', e.target.value)} disabled={isViewMode} />
//                       <input placeholder="Value" className="flex-1 text-sm border p-2 rounded-lg" value={info.value} onChange={(e) => onInfoChange(vIndex, iIndex, 'value', e.target.value)} disabled={isViewMode} />
//                       {!isViewMode && <button type="button" onClick={() => removeInfoRow(vIndex, iIndex)} className="text-red-400 hover:text-red-600"><FiTrash2 /></button>}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* MEDIA SECTION */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* IMAGES */}
//           <div className="md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//             <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//               <FiUpload className="text-green-500" /> Product Images (Max 5)
//             </h3>
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//               {previews.images.map((preview, idx) => (
//                 <div key={idx} className="relative aspect-square border-2 border-dashed rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50 border-gray-200 group">
//                   {preview ? (
//                     <>
//                       <img src={preview} alt="preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
//                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
//                         <button type="button" onClick={() => setPreviewModal({ isOpen: true, url: preview, type: 'image' })} className="p-2 bg-white rounded-full text-blue-600 hover:scale-110 transition-transform"><FiEye /></button>
//                         {!isViewMode && <button type="button" onClick={() => removeImage(idx)} className="p-2 bg-white rounded-full text-red-600 hover:scale-110 transition-transform"><FiTrash2 /></button>}
//                       </div>
//                     </>
//                   ) : (
//                     !isViewMode && (
//                       <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full hover:bg-gray-100 transition-colors">
//                         <FiPlus className="text-gray-300" size={24} />
//                         <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, idx)} />
//                       </label>
//                     )
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* VIDEO - FIXED PREVIEW BUG */}
//           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//             <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//               <FiVideo className="text-green-500" /> Product Video
//             </h3>
//             <div className="relative aspect-video w-full border-2 border-dashed rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50 border-gray-200 group">
//               {previews.video ? (
//                 <>
//                   {/* Using key={previews.video} forces the video element to refresh when a new file is picked */}
//                   <video 
//                     key={previews.video} 
//                     src={previews.video} 
//                     className="w-full h-full object-cover" 
//                     muted 
//                     playsInline
//                   />
//                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
//                     <button type="button" onClick={() => setPreviewModal({ isOpen: true, url: previews.video, type: 'video' })} className="p-3 bg-white rounded-full text-blue-600 shadow-xl hover:scale-110 transition-transform">
//                       <FiPlay size={24} />
//                     </button>
//                     {!isViewMode && (
//                       <button type="button" onClick={removeVideo} className="p-3 bg-white rounded-full text-red-600 shadow-xl hover:scale-110 transition-transform">
//                         <FiTrash2 size={24} />
//                       </button>
//                     )}
//                   </div>
//                   {/* Small badge to indicate video uploaded */}
//                   <div className="absolute bottom-2 right-2 bg-green-500 text-white text-[10px] px-2 py-1 rounded-md font-bold">VIDEO LOADED</div>
//                 </>
//               ) : (
//                 !isViewMode && (
//                   <label className="cursor-pointer flex flex-col items-center hover:text-green-600 transition-colors">
//                     <FiPlus className="text-gray-300" size={32} />
//                     <span className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">Upload MP4</span>
//                     <input type="file" hidden accept="video/mp4,video/x-m4v,video/*" onChange={handleVideoChange} />
//                   </label>
//                 )
//               )}
//             </div>
//             <p className="text-[10px] text-gray-400 mt-3 text-center italic">Best for Reels (9:16) or Product Demo (16:9)</p>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default NewProduct;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { 
//   FiPlus, FiTrash2, FiUpload, FiVideo, FiInfo, 
//   FiPackage, FiLayers, FiEye, FiX, FiPlay, FiAlignLeft 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const NewProduct = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { pathname } = useLocation();

//   const isViewMode = pathname.includes("view-product");
//   const isEditMode = !!id && !isViewMode;

//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [previewModal, setPreviewModal] = useState({ isOpen: false, url: null, type: null });

//   // --- INITIAL STATE (Refactored) ---
//   const initialVariant = () => ({
//     id: Date.now() + Math.random(),
//     sku: "",
//     capacity: "",
//     unit: "kg",
//     mrp: "",
//     price: "",
//     stock: "",
//     stockStatus: "In Stock",
//     additionalInfo: [{ key: "", value: "" }]
//   });

//   const [product, setFormData] = useState({
//     name: "",
//     categoryId: "",
//     brand: "",
//     description: "", // Single description field
//     showOnWebsite: true,
//     newLaunch: false,
//     featuredProduct: false,
//     images: Array(5).fill(null),
//     video: null,
//     variants: [initialVariant()]
//   });

//   const [previews, setPreviews] = useState({
//     images: Array(5).fill(null),
//     video: null
//   });

//   // --- DATA FETCHING ---
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await api({
//           url: SummaryApi.getAllCategories.url,
//           method: SummaryApi.getAllCategories.method
//         });
//         if (res.data.success) setCategories(res.data.data);
//       } catch (err) {
//         toast.error("Error loading categories");
//       }
//     };

//     const fetchProductDetails = async () => {
//       if (!id) return;
//       setLoading(true);
//       try {
//         const res = await api({
//           url: SummaryApi.getProductById?.url ? SummaryApi.getProductById.url(id) : `${SummaryApi.getAllProduct.url}/${id}`,
//           method: "GET"
//         });
//         if (res.data.success) {
//           const p = res.data.data;
//           setFormData({
//             ...p,
//             categoryId: p.categoryId?._id || p.categoryId,
//             images: Array(5).fill(null),
//             video: null,
//             variants: p.variants || [initialVariant()]
//           });
          
//           const existingImages = [...(p.images || [])];
//           const newPreviews = Array(5).fill(null);
//           existingImages.forEach((url, i) => { if(i < 5) newPreviews[i] = url; });
          
//           setPreviews({
//             images: newPreviews,
//             video: p.video || null
//           });
//         }
//       } catch (err) {
//         toast.error("Error loading product details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//     fetchProductDetails();
//   }, [id]);

//   // --- HANDLERS ---
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleToggle = (name) => {
//     if (isViewMode) return;
//     setFormData(prev => ({ ...prev, [name]: !prev[name] }));
//   };

//   // Media Handlers
//   const handleImageChange = (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const newImages = [...product.images];
//     newImages[index] = file;
//     setFormData(prev => ({ ...prev, images: newImages }));
//     const newPreviews = [...previews.images];
//     newPreviews[index] = URL.createObjectURL(file);
//     setPreviews(prev => ({ ...prev, images: newPreviews }));
//   };

//   const removeImage = (index) => {
//     const newImages = [...product.images];
//     newImages[index] = null;
//     const newPreviews = [...previews.images];
//     newPreviews[index] = null;
//     setFormData(prev => ({ ...prev, images: newImages }));
//     setPreviews(prev => ({ ...prev, images: newPreviews }));
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setFormData(prev => ({ ...prev, video: file }));
//     setPreviews(prev => ({ ...prev, video: URL.createObjectURL(file) }));
//   };

//   const removeVideo = () => {
//     setFormData(prev => ({ ...prev, video: null }));
//     setPreviews(prev => ({ ...prev, video: null }));
//   };

//   // Variant & Info Handlers
//   const onVariantChange = (index, field, value) => {
//     const updated = [...product.variants];
//     updated[index][field] = value;
//     setFormData({ ...product, variants: updated });
//   };
//   const onInfoChange = (vIndex, iIndex, field, value) => {
//     const updated = [...product.variants];
//     updated[vIndex].additionalInfo[iIndex][field] = value;
//     setFormData({ ...product, variants: updated });
//   };
//   const addInfoRow = (vIndex) => {
//     const updated = [...product.variants];
//     updated[vIndex].additionalInfo.push({ key: "", value: "" });
//     setFormData({ ...product, variants: updated });
//   };
//   const removeInfoRow = (vIndex, iIndex) => {
//     const updated = [...product.variants];
//     updated[vIndex].additionalInfo.splice(iIndex, 1);
//     setFormData({ ...product, variants: updated });
//   };

//   // --- SUBMIT ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!product.name || !product.categoryId) return toast.error("Basic info missing");

//     setLoading(true);
//     const formData = new FormData();

//     Object.keys(product).forEach(key => {
//       if (!['variants', 'images', 'video'].includes(key)) {
//         formData.append(key, product[key]);
//       }
//     });

//     formData.append("variants", JSON.stringify(product.variants));

//     product.images.forEach(img => {
//       if (img instanceof File) formData.append("images", img);
//     });
    
//     const remainingUrls = previews.images.filter(img => typeof img === 'string' && img.startsWith('http'));
//     formData.append("existingImages", JSON.stringify(remainingUrls));

//     if (product.video instanceof File) {
//       formData.append("video", product.video);
//     } else if (typeof previews.video === 'string' && previews.video.startsWith('http')) {
//       formData.append("existingVideo", previews.video);
//     }

//     try {
//       const config = isEditMode ? SummaryApi.updateProduct(id) : SummaryApi.createProduct;
//       const res = await api({
//         url: config.url,
//         method: config.method,
//         data: formData,
//         headers: { "Content-Type": "multipart/form-data" }
//       });

//       if (res.data.success) {
//         toast.success(isEditMode ? "Product Updated!" : "Product Created!");
//         navigate("/admin-panel/product-list");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error saving product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className=" pb-20 relative">
      
//       {/* PREVIEW MODAL */}
//       {previewModal.isOpen && (
//         <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
//           <button onClick={() => setPreviewModal({isOpen:false})} className="absolute top-6 right-6 text-white text-4xl hover:text-red-500 transition-colors z-50"><FiX /></button>
//           <div className="w-full max-w-5xl flex items-center justify-center">
//             {previewModal.type === 'video' ? (
//               <video src={previewModal.url} controls autoPlay className="max-w-full max-h-[85vh] shadow-2xl rounded-lg" />
//             ) : (
//               <img src={previewModal.url} alt="Full view" className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-lg" />
//             )}
//           </div>
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">
//             {isViewMode ? "View Product" : isEditMode ? "Edit Product" : "Add Product"}
//           </h2>
//         </div>
//         {!isViewMode && (
//           <button onClick={handleSubmit} disabled={loading} className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-full font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50">
//             {loading ? "Processing..." : "Save Product Data"}
//           </button>
//         )}
//       </div>

//       <form className="space-y-8">
//         {/* BASIC INFORMATION & DESCRIPTION */}
//         <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//           <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//             <FiInfo className="text-green-500" /> Basic Information
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="md:col-span-1">
//               <label className="text-sm font-bold text-gray-600">Product Name *</label>
//               <input name="name" value={product.name} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 outline-none focus:border-green-500" placeholder="Product Title" />
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600">Brand</label>
//               <input name="brand" value={product.brand} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 outline-none focus:border-green-500" placeholder="Brand Name" />
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600">Category *</label>
//               <select name="categoryId" value={product.categoryId} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 outline-none focus:border-green-500">
//                 <option value="">Select Category</option>
//                 {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//               </select>
//             </div>
//           </div>

//           <div className="mt-6">
//             <label className="text-sm font-bold text-gray-600 flex items-center gap-1 mb-2">
//               <FiAlignLeft className="text-green-500" /> Product Description
//             </label>
//             <textarea 
//               name="description" 
//               value={product.description} 
//               onChange={handleChange} 
//               disabled={isViewMode} 
//               className="w-full border border-gray-200 p-4 rounded-xl h-40 resize-none outline-none focus:border-green-500 transition-all shadow-inner bg-gray-50/30" 
//               placeholder="Write everything about the product here - usage, benefits, ingredients, etc..." 
//             />
//           </div>
//         </div>

//         {/* VISIBILITY SETTINGS */}
//         <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//           <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//             <FiLayers className="text-green-500" /> Visibility Settings
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               { label: "Show on Website", name: "showOnWebsite" },
//               { label: "New Launch", name: "newLaunch" },
//               { label: "Featured Product", name: "featuredProduct" }
//             ].map(item => (
//               <div key={item.name} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
//                 <span className="font-semibold text-gray-700">{item.label}</span>
//                 <button type="button" onClick={() => handleToggle(item.name)} className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${product[item.name] ? "bg-green-600" : "bg-gray-300"}`}>
//                   <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all ${product[item.name] ? "translate-x-6" : ""}`} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* VARIANTS */}
//         <div className="space-y-6">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
//               <FiPackage className="text-green-600" /> Variants & Pricing
//             </h3>
//             {!isViewMode && (
//               <button type="button" onClick={() => setFormData(prev => ({ ...prev, variants: [...prev.variants, initialVariant()] }))} className="flex items-center gap-1 bg-green-50 text-green-700 px-4 py-2 rounded-xl font-bold hover:bg-green-100 transition-all border border-green-200">
//                 <FiPlus /> Add Variant
//               </button>
//             )}
//           </div>

//           {product.variants.map((variant, vIndex) => (
//             <div key={variant.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden">
//               <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
//               {!isViewMode && product.variants.length > 1 && (
//                 <button type="button" onClick={() => {
//                   const updated = [...product.variants];
//                   updated.splice(vIndex, 1);
//                   setFormData({ ...product, variants: updated });
//                 }} className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors">
//                   <FiTrash2 size={20} />
//                 </button>
//               )}
//               <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
//                 <div className="md:col-span-2">
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">SKU</label>
//                   <input className="w-full border p-2 rounded-lg mt-1" value={variant.sku} onChange={(e) => onVariantChange(vIndex, 'sku', e.target.value)} disabled={isViewMode} />
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">Capacity</label>
//                   <input className="w-full border p-2 rounded-lg mt-1" value={variant.capacity} onChange={(e) => onVariantChange(vIndex, 'capacity', e.target.value)} disabled={isViewMode} />
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">Unit</label>
//                   <select className="w-full border p-2 rounded-lg mt-1" value={variant.unit} onChange={(e) => onVariantChange(vIndex, 'unit', e.target.value)} disabled={isViewMode}>
//                     <option value="ml">ml</option><option value="liter">liter</option><option value="kg">kg</option><option value="unit">Unit</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">MRP</label>
//                   <input type="number" className="w-full border p-2 rounded-lg mt-1" value={variant.mrp} onChange={(e) => onVariantChange(vIndex, 'mrp', e.target.value)} disabled={isViewMode} />
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">Price</label>
//                   <input type="number" className="w-full border p-2 rounded-lg mt-1" value={variant.price} onChange={(e) => onVariantChange(vIndex, 'price', e.target.value)} disabled={isViewMode} />
//                 </div>
//               </div>

//               <div className="mt-6 bg-gray-50/50 p-4 rounded-2xl border border-dashed border-gray-200">
//                 <div className="flex justify-between items-center mb-4">
//                   <p className="text-xs font-bold text-gray-500 uppercase">Extra Details</p>
//                   {!isViewMode && (
//                     <button type="button" onClick={() => addInfoRow(vIndex)} className="text-[10px] font-bold text-green-600 bg-white px-3 py-1 rounded-full border border-green-100 shadow-sm">+ Add Field</button>
//                   )}
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {variant.additionalInfo.map((info, iIndex) => (
//                     <div key={iIndex} className="flex gap-2 items-center">
//                       <input placeholder="Key" className="flex-1 text-sm border p-2 rounded-lg" value={info.key} onChange={(e) => onInfoChange(vIndex, iIndex, 'key', e.target.value)} disabled={isViewMode} />
//                       <input placeholder="Value" className="flex-1 text-sm border p-2 rounded-lg" value={info.value} onChange={(e) => onInfoChange(vIndex, iIndex, 'value', e.target.value)} disabled={isViewMode} />
//                       {!isViewMode && <button type="button" onClick={() => removeInfoRow(vIndex, iIndex)} className="text-red-300 hover:text-red-500"><FiTrash2 /></button>}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* MEDIA SECTION */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* IMAGES */}
//           <div className="md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//             <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//               <FiUpload className="text-green-500" /> Images
//             </h3>
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//               {previews.images.map((preview, idx) => (
//                 <div key={idx} className="relative aspect-square border-2 border-dashed rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50 border-gray-200 group">
//                   {preview ? (
//                     <>
//                       <img src={preview} alt="preview" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
//                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
//                         <button type="button" onClick={() => setPreviewModal({ isOpen: true, url: preview, type: 'image' })} className="p-2 bg-white rounded-full text-blue-600 shadow-lg"><FiEye /></button>
//                         {!isViewMode && <button type="button" onClick={() => removeImage(idx)} className="p-2 bg-white rounded-full text-red-600 shadow-lg"><FiTrash2 /></button>}
//                       </div>
//                     </>
//                   ) : (
//                     !isViewMode && (
//                       <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
//                         <FiPlus className="text-gray-300" size={24} />
//                         <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, idx)} />
//                       </label>
//                     )
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* VIDEO */}
//           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//             <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//               <FiVideo className="text-green-500" /> Product Video
//             </h3>
//             <div className="relative aspect-video w-full border-2 border-dashed rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50 border-gray-200 group">
//               {previews.video ? (
//                 <>
//                   <video key={previews.video} src={previews.video} className="w-full h-full object-cover" muted playsInline />
//                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
//                     <button type="button" onClick={() => setPreviewModal({ isOpen: true, url: previews.video, type: 'video' })} className="p-3 bg-white rounded-full text-blue-600 shadow-xl"><FiPlay size={24} /></button>
//                     {!isViewMode && <button type="button" onClick={removeVideo} className="p-3 bg-white rounded-full text-red-600 shadow-xl"><FiTrash2 size={24} /></button>}
//                   </div>
//                 </>
//               ) : (
//                 !isViewMode && (
//                   <label className="cursor-pointer flex flex-col items-center">
//                     <FiPlus className="text-gray-300" size={32} />
//                     <span className="text-xs font-bold text-gray-400 mt-2 uppercase">Upload MP4</span>
//                     <input type="file" hidden accept="video/*" onChange={handleVideoChange} />
//                   </label>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default NewProduct;


// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { 
//   FiPlus, FiTrash2, FiUpload, FiVideo, FiInfo, 
//   FiPackage, FiLayers, FiEye, FiX, FiPlay, FiAlignLeft, FiFileText 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const NewProduct = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { pathname } = useLocation();

//   const isViewMode = pathname.includes("view-product");
//   const isEditMode = !!id && !isViewMode;

//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [previewModal, setPreviewModal] = useState({ isOpen: false, url: null, type: null });

//   // --- INITIAL STATE ---
//   const initialVariant = () => ({
//     id: Date.now() + Math.random(),
//     sku: "",
//     capacity: "",
//     unit: "kg",
//     mrp: "",
//     price: "",
//     stock: "",
//     stockStatus: "In Stock",
//     additionalInfo: [{ key: "", value: "" }]
//   });

//   const [product, setFormData] = useState({
//     name: "",
//     categoryId: "",
//     brand: "",
//     shortDescription: "", // Restored
//     detailDescription: "", // Restored
//     showOnWebsite: true,
//     newLaunch: false,
//     featuredProduct: false,
//     images: Array(5).fill(null),
//     video: null,
//     variants: [initialVariant()]
//   });

//   const [previews, setPreviews] = useState({
//     images: Array(5).fill(null),
//     video: null
//   });

//   // --- DATA FETCHING ---
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await api({
//           url: SummaryApi.getAllCategories.url,
//           method: SummaryApi.getAllCategories.method
//         });
//         if (res.data.success) setCategories(res.data.data);
//       } catch (err) {
//         toast.error("Error loading categories");
//       }
//     };

//     const fetchProductDetails = async () => {
//       if (!id) return;
//       setLoading(true);
//       try {
//         const res = await api({
//           url: SummaryApi.getProductById?.url ? SummaryApi.getProductById.url(id) : `${SummaryApi.getAllProduct.url}/${id}`,
//           method: "GET"
//         });
//         if (res.data.success) {
//           const p = res.data.data;
//           setFormData({
//             ...p,
//             categoryId: p.categoryId?._id || p.categoryId,
//             images: Array(5).fill(null),
//             video: null,
//             variants: p.variants || [initialVariant()]
//           });
          
//           const existingImages = [...(p.images || [])];
//           const newPreviews = Array(5).fill(null);
//           existingImages.forEach((url, i) => { if(i < 5) newPreviews[i] = url; });
          
//           setPreviews({
//             images: newPreviews,
//             video: p.video || null
//           });
//         }
//       } catch (err) {
//         toast.error("Error loading product details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//     fetchProductDetails();
//   }, [id]);

//   // --- HANDLERS ---
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleToggle = (name) => {
//     if (isViewMode) return;
//     setFormData(prev => ({ ...prev, [name]: !prev[name] }));
//   };

//   // Media Handlers
//   const handleImageChange = (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const newImages = [...product.images];
//     newImages[index] = file;
//     setFormData(prev => ({ ...prev, images: newImages }));
//     const newPreviews = [...previews.images];
//     newPreviews[index] = URL.createObjectURL(file);
//     setPreviews(prev => ({ ...prev, images: newPreviews }));
//   };

//   const removeImage = (index) => {
//     const newImages = [...product.images];
//     newImages[index] = null;
//     const newPreviews = [...previews.images];
//     newPreviews[index] = null;
//     setFormData(prev => ({ ...prev, images: newImages }));
//     setPreviews(prev => ({ ...prev, images: newPreviews }));
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setFormData(prev => ({ ...prev, video: file }));
//     setPreviews(prev => ({ ...prev, video: URL.createObjectURL(file) }));
//   };

//   const removeVideo = () => {
//     setFormData(prev => ({ ...prev, video: null }));
//     setPreviews(prev => ({ ...prev, video: null }));
//   };

//   // Variant & Info Handlers
//   const onVariantChange = (index, field, value) => {
//     const updated = [...product.variants];
//     updated[index][field] = value;
//     setFormData({ ...product, variants: updated });
//   };
//   const onInfoChange = (vIndex, iIndex, field, value) => {
//     const updated = [...product.variants];
//     updated[vIndex].additionalInfo[iIndex][field] = value;
//     setFormData({ ...product, variants: updated });
//   };
//   const addInfoRow = (vIndex) => {
//     const updated = [...product.variants];
//     updated[vIndex].additionalInfo.push({ key: "", value: "" });
//     setFormData({ ...product, variants: updated });
//   };
//   const removeInfoRow = (vIndex, iIndex) => {
//     const updated = [...product.variants];
//     updated[vIndex].additionalInfo.splice(iIndex, 1);
//     setFormData({ ...product, variants: updated });
//   };

//   // --- SUBMIT ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!product.name || !product.categoryId) return toast.error("Basic info missing");

//     setLoading(true);
//     const formData = new FormData();

//     Object.keys(product).forEach(key => {
//       if (!['variants', 'images', 'video'].includes(key)) {
//         formData.append(key, product[key]);
//       }
//     });

//     formData.append("variants", JSON.stringify(product.variants));

//     product.images.forEach(img => {
//       if (img instanceof File) formData.append("images", img);
//     });
    
//     const remainingUrls = previews.images.filter(img => typeof img === 'string' && img.startsWith('http'));
//     formData.append("existingImages", JSON.stringify(remainingUrls));

//     if (product.video instanceof File) {
//       formData.append("video", product.video);
//     } else if (typeof previews.video === 'string' && previews.video.startsWith('http')) {
//       formData.append("existingVideo", previews.video);
//     }

//     try {
//       const config = isEditMode ? SummaryApi.updateProduct(id) : SummaryApi.createProduct;
//       const res = await api({
//         url: config.url,
//         method: config.method,
//         data: formData,
//         headers: { "Content-Type": "multipart/form-data" }
//       });

//       if (res.data.success) {
//         toast.success(isEditMode ? "Product Updated!" : "Product Created!");
//         navigate("/admin-panel/product-list");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error saving product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="pb-20 relative">
      
//       {/* PREVIEW MODAL */}
//       {previewModal.isOpen && (
//         <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
//           <button onClick={() => setPreviewModal({isOpen:false})} className="absolute top-6 right-6 text-white text-4xl hover:text-red-500 transition-colors z-50"><FiX /></button>
//           <div className="w-full max-w-5xl flex items-center justify-center">
//             {previewModal.type === 'video' ? (
//               <video src={previewModal.url} controls autoPlay className="max-w-full max-h-[85vh] shadow-2xl rounded-lg" />
//             ) : (
//               <img src={previewModal.url} alt="Full view" className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-lg" />
//             )}
//           </div>
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">
//             {isViewMode ? "View Product" : isEditMode ? "Edit Product" : "Add Product"}
//           </h2>
//         </div>
//         {!isViewMode && (
//           <button onClick={handleSubmit} disabled={loading} className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-full font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50">
//             {loading ? "Processing..." : "Save Product Data"}
//           </button>
//         )}
//       </div>

//       <form className="space-y-8">
//         {/* BASIC INFORMATION */}
//         <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//           <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//             <FiInfo className="text-green-500" /> Basic Information
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="md:col-span-1">
//               <label className="text-sm font-bold text-gray-600">Product Name *</label>
//               <input name="name" value={product.name} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 outline-none focus:border-green-500" placeholder="Product Title" />
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600">Brand</label>
//               <input name="brand" value={product.brand} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 outline-none focus:border-green-500" placeholder="Brand Name" />
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600">Category *</label>
//               <select name="categoryId" value={product.categoryId} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 outline-none focus:border-green-500">
//                 <option value="">Select Category</option>
//                 {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//               </select>
//             </div>
//           </div>

//           {/* DESCRIPTIONS */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//             <div>
//               <label className="text-sm font-bold text-gray-600 flex items-center gap-1 mb-2">
//                 <FiAlignLeft className="text-green-500" /> Short Description
//               </label>
//               <textarea 
//                 name="shortDescription" 
//                 value={product.shortDescription} 
//                 onChange={handleChange} 
//                 disabled={isViewMode} 
//                 className="w-full border border-gray-200 p-4 rounded-xl h-32 resize-none outline-none focus:border-green-500 transition-all shadow-inner bg-gray-50/30" 
//                 placeholder="Brief summary for product lists..." 
//               />
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600 flex items-center gap-1 mb-2">
//                 <FiFileText className="text-green-500" /> Detailed Description
//               </label>
//               <textarea 
//                 name="detailDescription" 
//                 value={product.detailDescription} 
//                 onChange={handleChange} 
//                 disabled={isViewMode} 
//                 className="w-full border border-gray-200 p-4 rounded-xl h-32 resize-none outline-none focus:border-green-500 transition-all shadow-inner bg-gray-50/30" 
//                 placeholder="Full usage instructions, benefits, and ingredients..." 
//               />
//             </div>
//           </div>
//         </div>

//         {/* VISIBILITY SETTINGS */}
//         <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//           <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//             <FiLayers className="text-green-500" /> Visibility Settings
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               { label: "Show on Website", name: "showOnWebsite" },
//               { label: "New Launch", name: "newLaunch" },
//               { label: "Featured Product", name: "featuredProduct" }
//             ].map(item => (
//               <div key={item.name} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
//                 <span className="font-semibold text-gray-700">{item.label}</span>
//                 <button type="button" onClick={() => handleToggle(item.name)} className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${product[item.name] ? "bg-green-600" : "bg-gray-300"}`}>
//                   <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all ${product[item.name] ? "translate-x-6" : ""}`} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* VARIANTS */}
//         <div className="space-y-6">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
//               <FiPackage className="text-green-600" /> Variants & Pricing
//             </h3>
//             {!isViewMode && (
//               <button type="button" onClick={() => setFormData(prev => ({ ...prev, variants: [...prev.variants, initialVariant()] }))} className="flex items-center gap-1 bg-green-50 text-green-700 px-4 py-2 rounded-xl font-bold hover:bg-green-100 transition-all border border-green-200">
//                 <FiPlus /> Add Variant
//               </button>
//             )}
//           </div>

//           {product.variants.map((variant, vIndex) => (
//             <div key={variant.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden">
//               <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
//               {!isViewMode && product.variants.length > 1 && (
//                 <button type="button" onClick={() => {
//                   const updated = [...product.variants];
//                   updated.splice(vIndex, 1);
//                   setFormData({ ...product, variants: updated });
//                 }} className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors">
//                   <FiTrash2 size={20} />
//                 </button>
//               )}
//               <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
//                 <div className="md:col-span-2">
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">SKU</label>
//                   <input className="w-full border p-2 rounded-lg mt-1" value={variant.sku} onChange={(e) => onVariantChange(vIndex, 'sku', e.target.value)} disabled={isViewMode} />
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">Capacity</label>
//                   <input className="w-full border p-2 rounded-lg mt-1" value={variant.capacity} onChange={(e) => onVariantChange(vIndex, 'capacity', e.target.value)} disabled={isViewMode} />
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">Unit</label>
//                   <select className="w-full border p-2 rounded-lg mt-1" value={variant.unit} onChange={(e) => onVariantChange(vIndex, 'unit', e.target.value)} disabled={isViewMode}>
//                     <option value="ml">ml</option><option value="liter">liter</option><option value="kg">kg</option><option value="unit">Unit</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">MRP</label>
//                   <input type="number" className="w-full border p-2 rounded-lg mt-1" value={variant.mrp} onChange={(e) => onVariantChange(vIndex, 'mrp', e.target.value)} disabled={isViewMode} />
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">Price</label>
//                   <input type="number" className="w-full border p-2 rounded-lg mt-1" value={variant.price} onChange={(e) => onVariantChange(vIndex, 'price', e.target.value)} disabled={isViewMode} />
//                 </div>
//               </div>

//               <div className="mt-6 bg-gray-50/50 p-4 rounded-2xl border border-dashed border-gray-200">
//                 <div className="flex justify-between items-center mb-4">
//                   <p className="text-xs font-bold text-gray-500 uppercase">Extra Details</p>
//                   {!isViewMode && (
//                     <button type="button" onClick={() => addInfoRow(vIndex)} className="text-[10px] font-bold text-green-600 bg-white px-3 py-1 rounded-full border border-green-100 shadow-sm">+ Add Field</button>
//                   )}
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {variant.additionalInfo.map((info, iIndex) => (
//                     <div key={iIndex} className="flex gap-2 items-center">
//                       <input placeholder="Key" className="flex-1 text-sm border p-2 rounded-lg" value={info.key} onChange={(e) => onInfoChange(vIndex, iIndex, 'key', e.target.value)} disabled={isViewMode} />
//                       <input placeholder="Value" className="flex-1 text-sm border p-2 rounded-lg" value={info.value} onChange={(e) => onInfoChange(vIndex, iIndex, 'value', e.target.value)} disabled={isViewMode} />
//                       {!isViewMode && <button type="button" onClick={() => removeInfoRow(vIndex, iIndex)} className="text-red-300 hover:text-red-500"><FiTrash2 /></button>}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* MEDIA SECTION */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* IMAGES */}
//           <div className="md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//             <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//               <FiUpload className="text-green-500" /> Images
//             </h3>
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//               {previews.images.map((preview, idx) => (
//                 <div key={idx} className="relative aspect-square border-2 border-dashed rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50 border-gray-200 group">
//                   {preview ? (
//                     <>
//                       <img src={preview} alt="preview" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
//                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
//                         <button type="button" onClick={() => setPreviewModal({ isOpen: true, url: preview, type: 'image' })} className="p-2 bg-white rounded-full text-blue-600 shadow-lg"><FiEye /></button>
//                         {!isViewMode && <button type="button" onClick={() => removeImage(idx)} className="p-2 bg-white rounded-full text-red-600 shadow-lg"><FiTrash2 /></button>}
//                       </div>
//                     </>
//                   ) : (
//                     !isViewMode && (
//                       <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
//                         <FiPlus className="text-gray-300" size={24} />
//                         <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, idx)} />
//                       </label>
//                     )
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* VIDEO */}
//           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//             <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//               <FiVideo className="text-green-500" /> Product Video
//             </h3>
//             <div className="relative aspect-video w-full border-2 border-dashed rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50 border-gray-200 group">
//               {previews.video ? (
//                 <>
//                   <video key={previews.video} src={previews.video} className="w-full h-full object-cover" muted playsInline />
//                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
//                     <button type="button" onClick={() => setPreviewModal({ isOpen: true, url: previews.video, type: 'video' })} className="p-3 bg-white rounded-full text-blue-600 shadow-xl"><FiPlay size={24} /></button>
//                     {!isViewMode && <button type="button" onClick={removeVideo} className="p-3 bg-white rounded-full text-red-600 shadow-xl"><FiTrash2 size={24} /></button>}
//                   </div>
//                 </>
//               ) : (
//                 !isViewMode && (
//                   <label className="cursor-pointer flex flex-col items-center">
//                     <FiPlus className="text-gray-300" size={32} />
//                     <span className="text-xs font-bold text-gray-400 mt-2 uppercase">Upload MP4</span>
//                     <input type="file" hidden accept="video/*" onChange={handleVideoChange} />
//                   </label>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default NewProduct;


// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { 
//   FiPlus, FiTrash2, FiUpload, FiVideo, FiInfo, 
//   FiPackage, FiLayers, FiEye, FiX, FiPlay, FiAlignLeft, FiFileText 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const NewProduct = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { pathname } = useLocation();

//   const isViewMode = pathname.includes("view-product");
//   const isEditMode = !!id && !isViewMode;

//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [previewModal, setPreviewModal] = useState({ isOpen: false, url: null, type: null });

//   // --- INITIAL STATE ---
//   const initialVariant = () => ({
//     id: Date.now() + Math.random(),
//     sku: "",
//     capacity: "",
//     unit: "kg",
//     mrp: "",
//     price: "",
//     stock: "0",
//     stockStatus: "In Stock",
//     additionalInfo: [{ key: "", value: "" }]
//   });

//   const [product, setFormData] = useState({
//     name: "",
//     categoryId: "",
//     brand: "",
//     shortDescription: "",
//     detailDescription: "",
//     showOnWebsite: true,
//     newLaunch: false,
//     featuredProduct: false,
//     images: Array(5).fill(null),
//     video: null,
//     variants: [initialVariant()]
//   });

//   const [previews, setPreviews] = useState({
//     images: Array(5).fill(null),
//     video: null
//   });

//   // --- MEMORY MANAGEMENT (Cleanup Object URLs) ---
//   useEffect(() => {
//     return () => {
//       previews.images.forEach(url => {
//         if (url && url.startsWith('blob:')) URL.revokeObjectURL(url);
//       });
//       if (previews.video && previews.video.startsWith('blob:')) {
//         URL.revokeObjectURL(previews.video);
//       }
//     };
//   }, [previews]);

//   // --- DATA FETCHING ---
//   const fetchCategories = useCallback(async () => {
//     try {
//       const res = await api({
//         url: SummaryApi.getAllCategories.url,
//         method: SummaryApi.getAllCategories.method
//       });
//       if (res.data.success) setCategories(res.data.data);
//     } catch (err) {
//       toast.error("Error loading categories");
//     }
//   }, []);

//   const fetchProductDetails = useCallback(async () => {
//     if (!id) return;
//     setLoading(true);
//     try {
//       const res = await api({
//         url: SummaryApi.getProductById?.url ? SummaryApi.getProductById.url(id) : `${SummaryApi.getAllProduct.url}/${id}`,
//         method: "GET"
//       });
//       if (res.data.success) {
//         const p = res.data.data;
//         setFormData({
//           ...p,
//           categoryId: p.categoryId?._id || p.categoryId,
//           images: Array(5).fill(null),
//           video: null,
//           variants: p.variants?.length ? p.variants : [initialVariant()]
//         });
        
//         const existingImages = [...(p.images || [])];
//         const newPreviews = Array(5).fill(null);
//         existingImages.forEach((url, i) => { if(i < 5) newPreviews[i] = url; });
        
//         setPreviews({
//           images: newPreviews,
//           video: p.video || null
//         });
//       }
//     } catch (err) {
//       toast.error("Error loading product details");
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchCategories();
//     fetchProductDetails();
//   }, [fetchCategories, fetchProductDetails]);

//   // --- VALIDATION LOGIC ---
//   const validate = () => {
//     const newErrors = {};
//     if (!product.name.trim()) newErrors.name = "Product name is required";
//     if (!product.categoryId) newErrors.categoryId = "Category is required";
//     if (!product.shortDescription?.trim()) newErrors.shortDescription = "Short description is required";
    
//     // Validate Variants
//     const variantErrors = [];
//     product.variants.forEach((v, index) => {
//       const vErr = {};
//       if (!v.sku.trim()) vErr.sku = "Required";
//       if (!v.capacity.trim()) vErr.capacity = "Required";
//       if (!v.mrp || Number(v.mrp) <= 0) vErr.mrp = "Invalid MRP";
//       if (!v.price || Number(v.price) <= 0) vErr.price = "Invalid Price";
//       if (Number(v.price) > Number(v.mrp)) vErr.price = "Price > MRP";
//       if (v.stock === "" || Number(v.stock) < 0) vErr.stock = "Invalid";
      
//       if (Object.keys(vErr).length > 0) variantErrors[index] = vErr;
//     });

//     if (variantErrors.length > 0) newErrors.variants = variantErrors;

//     // Check if at least one image exists (either file or existing URL)
//     const hasImage = product.images.some(img => img !== null) || previews.images.some(p => typeof p === 'string' && p.startsWith('http'));
//     if (!hasImage) newErrors.images = "At least one product image is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // --- HANDLERS ---
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
//   };

//   const handleToggle = (name) => {
//     if (isViewMode) return;
//     setFormData(prev => ({ ...prev, [name]: !prev[name] }));
//   };

//   const handleImageChange = (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 5 * 1024 * 1024) return toast.error("Image must be less than 5MB");

//     const newImages = [...product.images];
//     newImages[index] = file;
//     setFormData(prev => ({ ...prev, images: newImages }));

//     const newPreviews = [...previews.images];
//     newPreviews[index] = URL.createObjectURL(file);
//     setPreviews(prev => ({ ...prev, images: newPreviews }));
    
//     if (errors.images) setErrors(prev => ({ ...prev, images: null }));
//   };

//   const removeImage = (index) => {
//     const newImages = [...product.images];
//     newImages[index] = null;
//     const newPreviews = [...previews.images];
//     if (newPreviews[index]?.startsWith('blob:')) URL.revokeObjectURL(newPreviews[index]);
//     newPreviews[index] = null;
//     setFormData(prev => ({ ...prev, images: newImages }));
//     setPreviews(prev => ({ ...prev, images: newPreviews }));
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 50 * 1024 * 1024) return toast.error("Video must be less than 50MB");

//     setFormData(prev => ({ ...prev, video: file }));
//     setPreviews(prev => ({ ...prev, video: URL.createObjectURL(file) }));
//   };

//   const removeVideo = () => {
//     if (previews.video?.startsWith('blob:')) URL.revokeObjectURL(previews.video);
//     setFormData(prev => ({ ...prev, video: null }));
//     setPreviews(prev => ({ ...prev, video: null }));
//   };

//   const onVariantChange = (index, field, value) => {
//     const updated = [...product.variants];
//     updated[index][field] = value;
//     setFormData({ ...product, variants: updated });
//     // Clear variant error if exists
//     if (errors.variants?.[index]?.[field]) {
//       const newVarErrors = [...errors.variants];
//       delete newVarErrors[index][field];
//       setErrors(prev => ({ ...prev, variants: newVarErrors }));
//     }
//   };

//   const onInfoChange = (vIndex, iIndex, field, value) => {
//     const updated = [...product.variants];
//     updated[vIndex].additionalInfo[iIndex][field] = value;
//     setFormData({ ...product, variants: updated });
//   };

//   const addInfoRow = (vIndex) => {
//     const updated = [...product.variants];
//     updated[vIndex].additionalInfo.push({ key: "", value: "" });
//     setFormData({ ...product, variants: updated });
//   };

//   const removeInfoRow = (vIndex, iIndex) => {
//     const updated = [...product.variants];
//     updated[vIndex].additionalInfo.splice(iIndex, 1);
//     setFormData({ ...product, variants: updated });
//   };

//   // --- SUBMIT ---
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validate()) {
//       toast.error("Please fix the errors in the form");
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();

//     // Append standard fields
//     Object.keys(product).forEach(key => {
//       if (!['variants', 'images', 'video'].includes(key)) {
//         formData.append(key, product[key]);
//       }
//     });

//     formData.append("variants", JSON.stringify(product.variants));

//     // Handle Images
//     product.images.forEach(img => {
//       if (img instanceof File) formData.append("images", img);
//     });
    
//     const remainingUrls = previews.images.filter(img => typeof img === 'string' && img.startsWith('http'));
//     formData.append("existingImages", JSON.stringify(remainingUrls));

//     // Handle Video
//     if (product.video instanceof File) {
//       formData.append("video", product.video);
//     } else if (typeof previews.video === 'string' && previews.video.startsWith('http')) {
//       formData.append("existingVideo", previews.video);
//     }

//     try {
//       const config = isEditMode ? SummaryApi.updateProduct(id) : SummaryApi.createProduct;
//       const res = await api({
//         url: config.url,
//         method: config.method,
//         data: formData,
//         headers: { "Content-Type": "multipart/form-data" }
//       });

//       if (res.data.success) {
//         toast.success(isEditMode ? "Product Updated!" : "Product Created!");
//         navigate("/admin-panel/product-list");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error saving product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="pb-20 relative px-4 md:px-0">
      
//       {/* PREVIEW MODAL */}
//       {previewModal.isOpen && (
//         <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
//           <button onClick={() => setPreviewModal({isOpen:false})} className="absolute top-6 right-6 text-white text-4xl hover:text-red-500 transition-colors z-50"><FiX /></button>
//           <div className="w-full max-w-5xl flex items-center justify-center">
//             {previewModal.type === 'video' ? (
//               <video src={previewModal.url} controls autoPlay className="max-w-full max-h-[85vh] shadow-2xl rounded-lg" />
//             ) : (
//               <img src={previewModal.url} alt="Full view" className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-lg" />
//             )}
//           </div>
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-4">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">
//             {isViewMode ? "View Product" : isEditMode ? "Edit Product" : "Add Product"}
//           </h2>
//           <p className="text-gray-500 text-sm">Manage your product catalog details</p>
//         </div>
//         {!isViewMode && (
//           <button 
//             type="button"
//             onClick={handleSubmit} 
//             disabled={loading} 
//             className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-full font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
//           >
//             {loading ? <span className="animate-pulse">Processing...</span> : "Save Product Data"}
//           </button>
//         )}
//       </div>

//       <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
//         {/* BASIC INFORMATION */}
//         <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//           <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//             <FiInfo className="text-green-500" /> Basic Information
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="md:col-span-1">
//               <label className="text-sm font-bold text-gray-600">Product Name *</label>
//               <input 
//                 name="name" 
//                 value={product.name} 
//                 onChange={handleChange} 
//                 disabled={isViewMode} 
//                 className={`w-full border p-3 rounded-xl mt-1 outline-none transition-all focus:ring-2 ${errors.name ? "border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-green-500 focus:ring-green-100"}`} 
//                 placeholder="Product Title" 
//               />
//               {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600">Brand</label>
//               <input name="brand" value={product.brand} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 outline-none focus:border-green-500" placeholder="Brand Name" />
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600">Category *</label>
//               <select 
//                 name="categoryId" 
//                 value={product.categoryId} 
//                 onChange={handleChange} 
//                 disabled={isViewMode} 
//                 className={`w-full border p-3 rounded-xl mt-1 outline-none transition-all focus:ring-2 ${errors.categoryId ? "border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-green-500 focus:ring-green-100"}`}
//               >
//                 <option value="">Select Category</option>
//                 {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//               </select>
//               {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId}</p>}
//             </div>
//           </div>

//           {/* DESCRIPTIONS */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//             <div>
//               <label className="text-sm font-bold text-gray-600 flex items-center gap-1 mb-2">
//                 <FiAlignLeft className="text-green-500" /> Short Description *
//               </label>
//               <textarea 
//                 name="shortDescription" 
//                 value={product.shortDescription} 
//                 onChange={handleChange} 
//                 disabled={isViewMode} 
//                 className={`w-full border p-4 rounded-xl h-32 resize-none outline-none transition-all shadow-inner bg-gray-50/30 ${errors.shortDescription ? "border-red-500" : "border-gray-200 focus:border-green-500"}`} 
//                 placeholder="Brief summary for product lists..." 
//               />
//               {errors.shortDescription && <p className="text-red-500 text-xs mt-1">{errors.shortDescription}</p>}
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600 flex items-center gap-1 mb-2">
//                 <FiFileText className="text-green-500" /> Detailed Description
//               </label>
//               <textarea 
//                 name="detailDescription" 
//                 value={product.detailDescription} 
//                 onChange={handleChange} 
//                 disabled={isViewMode} 
//                 className="w-full border border-gray-200 p-4 rounded-xl h-32 resize-none outline-none focus:border-green-500 transition-all shadow-inner bg-gray-50/30" 
//                 placeholder="Full usage instructions, benefits, and ingredients..." 
//               />
//             </div>
//           </div>
//         </div>

//         {/* VISIBILITY SETTINGS */}
//         <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//           <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//             <FiLayers className="text-green-500" /> Visibility Settings
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               { label: "Show on Website", name: "showOnWebsite" },
//               { label: "New Launch", name: "newLaunch" },
//               { label: "Featured Product", name: "featuredProduct" }
//             ].map(item => (
//               <div key={item.name} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
//                 <span className="font-semibold text-gray-700">{item.label}</span>
//                 <button type="button" onClick={() => handleToggle(item.name)} className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${product[item.name] ? "bg-green-600" : "bg-gray-300"}`}>
//                   <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all ${product[item.name] ? "translate-x-6" : ""}`} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* VARIANTS */}
//         <div className="space-y-6">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
//               <FiPackage className="text-green-600" /> Variants & Pricing
//             </h3>
//             {!isViewMode && (
//               <button type="button" onClick={() => setFormData(prev => ({ ...prev, variants: [...prev.variants, initialVariant()] }))} className="flex items-center gap-1 bg-green-50 text-green-700 px-4 py-2 rounded-xl font-bold hover:bg-green-100 transition-all border border-green-200">
//                 <FiPlus /> Add Variant
//               </button>
//             )}
//           </div>

//           {product.variants.map((variant, vIndex) => (
//             <div key={variant.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden">
//               <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
//               {!isViewMode && product.variants.length > 1 && (
//                 <button type="button" onClick={() => {
//                   const updated = [...product.variants];
//                   updated.splice(vIndex, 1);
//                   setFormData({ ...product, variants: updated });
//                 }} className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors">
//                   <FiTrash2 size={20} />
//                 </button>
//               )}
//               <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
//                 <div className="md:col-span-2">
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">SKU *</label>
//                   <input 
//                     className={`w-full border p-2 rounded-lg mt-1 ${errors.variants?.[vIndex]?.sku ? "border-red-500" : "border-gray-200"}`} 
//                     value={variant.sku} 
//                     onChange={(e) => onVariantChange(vIndex, 'sku', e.target.value)} 
//                     disabled={isViewMode} 
//                   />
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">Capacity *</label>
//                   <input 
//                     className={`w-full border p-2 rounded-lg mt-1 ${errors.variants?.[vIndex]?.capacity ? "border-red-500" : "border-gray-200"}`} 
//                     value={variant.capacity} 
//                     onChange={(e) => onVariantChange(vIndex, 'capacity', e.target.value)} 
//                     disabled={isViewMode} 
//                   />
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">Unit</label>
//                   <select className="w-full border border-gray-200 p-2 rounded-lg mt-1" value={variant.unit} onChange={(e) => onVariantChange(vIndex, 'unit', e.target.value)} disabled={isViewMode}>
//                     <option value="ml">ml</option><option value="liter">liter</option><option value="kg">kg</option><option value="unit">Unit</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">MRP *</label>
//                   <input 
//                     type="number" 
//                     className={`w-full border p-2 rounded-lg mt-1 ${errors.variants?.[vIndex]?.mrp ? "border-red-500" : "border-gray-200"}`} 
//                     value={variant.mrp} 
//                     onChange={(e) => onVariantChange(vIndex, 'mrp', e.target.value)} 
//                     disabled={isViewMode} 
//                   />
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">Price *</label>
//                   <input 
//                     type="number" 
//                     className={`w-full border p-2 rounded-lg mt-1 ${errors.variants?.[vIndex]?.price ? "border-red-500" : "border-gray-200"}`} 
//                     value={variant.price} 
//                     onChange={(e) => onVariantChange(vIndex, 'price', e.target.value)} 
//                     disabled={isViewMode} 
//                   />
//                   {errors.variants?.[vIndex]?.price && <p className="text-[10px] text-red-500">{errors.variants[vIndex].price}</p>}
//                 </div>
//               </div>

//               <div className="mt-6 bg-gray-50/50 p-4 rounded-2xl border border-dashed border-gray-200">
//                 <div className="flex justify-between items-center mb-4">
//                   <p className="text-xs font-bold text-gray-500 uppercase">Extra Details (Optional)</p>
//                   {!isViewMode && (
//                     <button type="button" onClick={() => addInfoRow(vIndex)} className="text-[10px] font-bold text-green-600 bg-white px-3 py-1 rounded-full border border-green-100 shadow-sm transition-all hover:bg-green-50">+ Add Field</button>
//                   )}
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {variant.additionalInfo.map((info, iIndex) => (
//                     <div key={iIndex} className="flex gap-2 items-center">
//                       <input placeholder="Key (e.g. Color)" className="flex-1 text-sm border border-gray-200 p-2 rounded-lg focus:border-green-400 outline-none" value={info.key} onChange={(e) => onInfoChange(vIndex, iIndex, 'key', e.target.value)} disabled={isViewMode} />
//                       <input placeholder="Value" className="flex-1 text-sm border border-gray-200 p-2 rounded-lg focus:border-green-400 outline-none" value={info.value} onChange={(e) => onInfoChange(vIndex, iIndex, 'value', e.target.value)} disabled={isViewMode} />
//                       {!isViewMode && <button type="button" onClick={() => removeInfoRow(vIndex, iIndex)} className="text-red-300 hover:text-red-500 transition-colors"><FiTrash2 /></button>}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* MEDIA SECTION */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* IMAGES */}
//           <div className="md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//             <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//               <FiUpload className="text-green-500" /> Images {errors.images && <span className="text-red-500 text-xs font-normal">({errors.images})</span>}
//             </h3>
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//               {previews.images.map((preview, idx) => (
//                 <div key={idx} className={`relative aspect-square border-2 border-dashed rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50 transition-colors group ${errors.images ? "border-red-300" : "border-gray-200"}`}>
//                   {preview ? (
//                     <>
//                       <img src={preview} alt="preview" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
//                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
//                         <button type="button" onClick={() => setPreviewModal({ isOpen: true, url: preview, type: 'image' })} className="p-2 bg-white rounded-full text-blue-600 shadow-lg hover:bg-blue-50"><FiEye /></button>
//                         {!isViewMode && <button type="button" onClick={() => removeImage(idx)} className="p-2 bg-white rounded-full text-red-600 shadow-lg hover:bg-red-50"><FiTrash2 /></button>}
//                       </div>
//                     </>
//                   ) : (
//                     !isViewMode && (
//                       <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full hover:bg-gray-100 transition-colors">
//                         <FiPlus className="text-gray-300" size={24} />
//                         <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, idx)} />
//                       </label>
//                     )
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* VIDEO */}
//           <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
//             <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//               <FiVideo className="text-green-500" /> Product Video
//             </h3>
//             <div className="relative aspect-video w-full border-2 border-dashed rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50 border-gray-200 group">
//               {previews.video ? (
//                 <>
//                   <video key={previews.video} src={previews.video} className="w-full h-full object-cover" muted playsInline />
//                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
//                     <button type="button" onClick={() => setPreviewModal({ isOpen: true, url: previews.video, type: 'video' })} className="p-3 bg-white rounded-full text-blue-600 shadow-xl hover:bg-blue-50"><FiPlay size={24} /></button>
//                     {!isViewMode && <button type="button" onClick={removeVideo} className="p-3 bg-white rounded-full text-red-600 shadow-xl hover:bg-red-50"><FiTrash2 size={24} /></button>}
//                   </div>
//                 </>
//               ) : (
//                 !isViewMode && (
//                   <label className="cursor-pointer flex flex-col items-center hover:text-green-600 transition-colors">
//                     <FiPlus className="text-gray-300" size={32} />
//                     <span className="text-xs font-bold text-gray-400 mt-2 uppercase">Upload MP4</span>
//                     <input type="file" hidden accept="video/*" onChange={handleVideoChange} />
//                   </label>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default NewProduct;

// import React, { useState, useEffect, useCallback, } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { 
//   FiPlus, FiTrash2, FiUpload, FiVideo, FiInfo, 
//   FiPackage, FiLayers, FiEye, FiX, FiPlay, FiAlignLeft, FiFileText 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const NewProduct = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { pathname } = useLocation();

//   const isViewMode = pathname.includes("view-product");
//   const isEditMode = !!id && !isViewMode;

//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [previewModal, setPreviewModal] = useState({ isOpen: false, url: null, type: null });

//   // --- INITIAL STATE ---
//   const initialVariant = () => ({
//     id: Date.now() + Math.random(),
//     sku: "",
//     capacity: "",
//     unit: "kg",
//     mrp: "",
//     price: "",
//     stock: "0",
//     stockStatus: "In Stock",
//     additionalInfo: [{ key: "", value: "" }]
//   });

//   const [product, setFormData] = useState({
//     name: "",
//     categoryId: "",
//     brand: "",
//     shortDescription: "",
//     detailDescription: "",
//     showOnWebsite: true,
//     newLaunch: false,
//     featuredProduct: false,
//     images: Array(5).fill(null),
//     video: null,
//     variants: [initialVariant()]
//   });

//   const [previews, setPreviews] = useState({
//     images: Array(5).fill(null),
//     video: null
//   });

//   // --- DATA FETCHING ---
//   const fetchCategories = useCallback(async () => {
//     try {
//       const res = await api({
//         url: SummaryApi.getAllCategories.url,
//         method: SummaryApi.getAllCategories.method
//       });
//       if (res.data.success) setCategories(res.data.data);
//     } catch (err) {
//       toast.error("Error loading categories");
//     }
//   }, []);

//   const fetchProductDetails = useCallback(async () => {
//     if (!id) return;
//     setLoading(true);
//     try {
//       const res = await api({
//         url: SummaryApi.getProductById?.url ? SummaryApi.getProductById.url(id) : `${SummaryApi.getAllProduct.url}/${id}`,
//         method: "GET"
//       });
//       if (res.data.success) {
//         const p = res.data.data;
//         setFormData({
//           ...p,
//           categoryId: p.categoryId?._id || p.categoryId,
//           images: Array(5).fill(null),
//           video: null,
//           variants: p.variants?.length ? p.variants : [initialVariant()]
//         });
        
//         const existingImages = [...(p.images || [])];
//         const newPreviews = Array(5).fill(null);
//         existingImages.forEach((url, i) => { if(i < 5) newPreviews[i] = url; });
        
//         setPreviews({
//           images: newPreviews,
//           video: p.video || null
//         });
//       }
//     } catch (err) {
//       toast.error("Error loading product details");
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchCategories();
//     fetchProductDetails();
//   }, [fetchCategories, fetchProductDetails]);

//   // Cleanup Blob URLs on Unmount
//   useEffect(() => {
//     return () => {
//       previews.images.forEach(url => {
//         if (url?.startsWith('blob:')) URL.revokeObjectURL(url);
//       });

//       if (previews.video?.startsWith('blob:')) {
//         URL.revokeObjectURL(previews.video);
//       }
//     };
//   }, [previews.images, previews.video]);

//   // --- VALIDATION ---
//   const validate = () => {
//     const newErrors = {};
//     if (!product.name?.trim()) newErrors.name = "Name is required";
//     if (!product.categoryId) newErrors.categoryId = "Category is required";
//     if (!product.shortDescription?.trim()) newErrors.shortDescription = "Description is required";
    
//     const variantErrors = [];
//     product.variants.forEach((v, index) => {
//       const vErr = {};
//       if (!v.sku?.trim()) vErr.sku = "Required";
//       if (!v.capacity?.trim()) vErr.capacity = "Required";
//       if (!v.mrp || Number(v.mrp) <= 0) vErr.mrp = "Invalid";
//       if (!v.price || Number(v.price) <= 0) vErr.price = "Invalid";
//       if (Number(v.price) > Number(v.mrp)) vErr.price = "Price > MRP";
//       if (Object.keys(vErr).length > 0) variantErrors[index] = vErr;
//     });

//     if (variantErrors.length > 0) newErrors.variants = variantErrors;

//     const hasImage = previews.images.some(img => img !== null);
//     if (!hasImage) newErrors.images = "Upload at least one image";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // --- HANDLERS ---
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
//   };

//   const handleToggle = (name) => {
//     if (isViewMode) return;
//     setFormData(prev => ({ ...prev, [name]: !prev[name] }));
//   };

//   const handleImageChange = (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Revoke old blob if it exists to free memory
//     if (previews.images[index]?.startsWith('blob:')) {
//       URL.revokeObjectURL(previews.images[index]);
//     }

//     const blobUrl = URL.createObjectURL(file);
    
//     setFormData(prev => {
//       const newImages = [...prev.images];
//       newImages[index] = file;
//       return { ...prev, images: newImages };
//     });

//     setPreviews(prev => {
//       const newPreviews = [...prev.images];
//       newPreviews[index] = blobUrl;
//       return { ...prev, images: newPreviews };
//     });

//     if (errors.images) setErrors(prev => ({ ...prev, images: null }));
//   };

//   const removeImage = (index) => {
//     if (previews.images[index]?.startsWith('blob:')) {
//       URL.revokeObjectURL(previews.images[index]);
//     }
//     setFormData(prev => {
//       const newImages = [...prev.images];
//       newImages[index] = null;
//       return { ...prev, images: newImages };
//     });
//     setPreviews(prev => {
//       const newPreviews = [...prev.images];
//       newPreviews[index] = null;
//       return { ...prev, images: newPreviews };
//     });
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (previews.video?.startsWith('blob:')) {
//       URL.revokeObjectURL(previews.video);
//     }

//     const blobUrl = URL.createObjectURL(file);
//     setFormData(prev => ({ ...prev, video: file }));
//     setPreviews(prev => ({ ...prev, video: blobUrl }));
//   };

//   const removeVideo = () => {
//     if (previews.video?.startsWith('blob:')) {
//       URL.revokeObjectURL(previews.video);
//     }
//     setFormData(prev => ({ ...prev, video: null }));
//     setPreviews(prev => ({ ...prev, video: null }));
//   };

//   const onVariantChange = (index, field, value) => {
//     const updated = [...product.variants];
//     updated[index][field] = value;
//     setFormData({ ...product, variants: updated });
//   };

//   const onInfoChange = (vIndex, iIndex, field, value) => {
//     const updated = [...product.variants];
//     updated[vIndex].additionalInfo[iIndex][field] = value;
//     setFormData({ ...product, variants: updated });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return toast.error("Please fill required fields");

//     setLoading(true);
//     const formData = new FormData();
//     Object.keys(product).forEach(key => {
//       if (!['variants', 'images', 'video'].includes(key)) formData.append(key, product[key]);
//     });
//     formData.append("variants", JSON.stringify(product.variants));
    
//     product.images.forEach(img => { if (img instanceof File) formData.append("images", img); });
//     const existingImages = previews.images.filter(img => typeof img === 'string' && img.startsWith('http'));
//     formData.append("existingImages", JSON.stringify(existingImages));

//     if (product.video instanceof File) formData.append("video", product.video);
//     else if (previews.video?.startsWith('http')) formData.append("existingVideo", previews.video);

//     try {
//       const config = isEditMode ? SummaryApi.updateProduct(id) : SummaryApi.createProduct;
//       const res = await api({
//         url: config.url,
//         method: config.method,
//         data: formData,
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       if (res.data.success) {
//         toast.success("Saved successfully!");
//         navigate("/admin-panel/product-list");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error saving");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="pb-20 relative px-4">
//       {/* PREVIEW MODAL */}
//       {previewModal.isOpen && (
//         <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
//           <button onClick={() => setPreviewModal({isOpen:false})} className="absolute top-6 right-6 text-white text-4xl hover:text-red-500 z-50"><FiX /></button>
//           <div className="w-full max-w-5xl flex items-center justify-center">
//             {previewModal.type === 'video' ? (
//               <video key={previewModal.url} src={previewModal.url} controls autoPlay className="max-w-full max-h-[85vh] rounded-lg shadow-2xl" />
//             ) : (
//               <img src={previewModal.url} alt="View" className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" />
//             )}
//           </div>
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border mt-4">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">
//             {isViewMode ? "View Product" : isEditMode ? "Edit Product" : "Add Product"}
//           </h2>
//         </div>
//         {!isViewMode && (
//           <button onClick={handleSubmit} disabled={loading} className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-full font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50">
//             {loading ? "Processing..." : "Save Product"}
//           </button>
//         )}
//       </div>

//       <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
//         {/* BASIC INFO */}
//         <div className="bg-white p-6 rounded-3xl shadow-sm border">
//           <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4"><FiInfo className="text-green-500" /> Basic Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="md:col-span-1">
//               <label className="text-sm font-bold text-gray-600">Product Name *</label>
//               <input name="name" value={product.name} onChange={handleChange} disabled={isViewMode} className={`w-full border p-3 rounded-xl mt-1 outline-none ${errors.name ? "border-red-500" : "focus:border-green-500"}`} />
//               {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600">Brand</label>
//               <input name="brand" value={product.brand} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 outline-none" />
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600">Category *</label>
//               <select name="categoryId" value={product.categoryId} onChange={handleChange} disabled={isViewMode} className={`w-full border p-3 rounded-xl mt-1 outline-none ${errors.categoryId ? "border-red-500" : ""}`}>
//                 <option value="">Select</option>
//                 {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//               </select>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//             <div>
//               <label className="text-sm font-bold text-gray-600 flex items-center gap-1 mb-2"><FiAlignLeft className="text-green-500" /> Short Description *</label>
//               <textarea name="shortDescription" value={product.shortDescription} onChange={handleChange} disabled={isViewMode} className={`w-full border p-4 rounded-xl h-32 resize-none outline-none ${errors.shortDescription ? "border-red-500" : "focus:border-green-500"}`} />
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600 flex items-center gap-1 mb-2"><FiFileText className="text-green-500" /> Detailed Description</label>
//               <textarea name="detailDescription" value={product.detailDescription} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-4 rounded-xl h-32 resize-none outline-none" />
//             </div>
//           </div>
//         </div>

//         {/* VISIBILITY */}
//         <div className="bg-white p-6 rounded-3xl shadow-sm border">
//           <h3 className="text-lg font-bold text-gray-700 mb-6 border-b pb-4 flex items-center gap-2"><FiLayers className="text-green-500" /> Visibility</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {["showOnWebsite", "newLaunch", "featuredProduct"].map(item => (
//               <div key={item} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border">
//                 <span className="font-semibold text-gray-700 capitalize">{item.replace(/([A-Z])/g, ' $1')}</span>
//                 <button type="button" onClick={() => handleToggle(item)} className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${product[item] ? "bg-green-600" : "bg-gray-300"}`}>
//                   <div className={`bg-white w-4 h-4 rounded-full shadow transform transition-all ${product[item] ? "translate-x-6" : ""}`} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* VARIANTS */}
//         <div className="space-y-6">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-extrabold text-gray-800 flex items-center gap-2"><FiPackage className="text-green-600" /> Variants</h3>
//             {!isViewMode && (
//               <button type="button" onClick={() => setFormData(p => ({ ...p, variants: [...p.variants, initialVariant()] }))} className="bg-green-50 text-green-700 px-4 py-2 rounded-xl font-bold border border-green-200 hover:bg-green-100 flex items-center gap-1"><FiPlus /> Add</button>
//             )}
//           </div>
//           {product.variants.map((variant, vIndex) => (
//             <div key={variant.id} className="bg-white p-6 rounded-3xl border shadow-sm relative overflow-hidden">
//               <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
//               {!isViewMode && product.variants.length > 1 && (
//                 <button type="button" onClick={() => {
//                   const updated = [...product.variants];
//                   updated.splice(vIndex, 1);
//                   setFormData({ ...product, variants: updated });
//                 }} className="absolute top-4 right-4 text-red-400 hover:text-red-600"><FiTrash2 size={20} /></button>
//               )}
//               <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
//                 <div className="md:col-span-2">
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">SKU *</label>
//                   <input className={`w-full border p-2 rounded-lg mt-1 ${errors.variants?.[vIndex]?.sku ? "border-red-500" : "border-gray-200"}`} value={variant.sku} onChange={(e) => onVariantChange(vIndex, 'sku', e.target.value)} disabled={isViewMode} />
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">Capacity</label>
//                   <input className={`w-full border p-2 rounded-lg mt-1 ${errors.variants?.[vIndex]?.capacity ? "border-red-500" : ""}`} value={variant.capacity} onChange={(e) => onVariantChange(vIndex, 'capacity', e.target.value)} disabled={isViewMode} />
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">Unit</label>
//                   <select className="w-full border border-gray-200 p-2 rounded-lg mt-1" value={variant.unit} onChange={(e) => onVariantChange(vIndex, 'unit', e.target.value)} disabled={isViewMode}>
//                     <option value="ml">ml</option><option value="liter">liter</option><option value="kg">kg</option><option value="unit">Unit</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">MRP *</label>
//                   <input type="number" className={`w-full border p-2 rounded-lg mt-1 ${errors.variants?.[vIndex]?.mrp ? "border-red-500" : ""}`} value={variant.mrp} onChange={(e) => onVariantChange(vIndex, 'mrp', e.target.value)} disabled={isViewMode} />
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">Price *</label>
//                   <input type="number" className={`w-full border p-2 rounded-lg mt-1 ${errors.variants?.[vIndex]?.price ? "border-red-500" : ""}`} value={variant.price} onChange={(e) => onVariantChange(vIndex, 'price', e.target.value)} disabled={isViewMode} />
//                 </div>
//               </div>
//               <div className="mt-6 bg-gray-50/50 p-4 rounded-2xl border border-dashed">
//                 <div className="flex justify-between items-center mb-4">
//                   <p className="text-xs font-bold text-gray-500 uppercase">Extra Info</p>
//                   {!isViewMode && <button type="button" onClick={() => {
//                     const updated = [...product.variants];
//                     updated[vIndex].additionalInfo.push({ key: "", value: "" });
//                     setFormData({ ...product, variants: updated });
//                   }} className="text-[10px] font-bold text-green-600 bg-white px-3 py-1 rounded-full border border-green-100 shadow-sm transition-all hover:bg-green-50">+ Add Field</button>}
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {variant.additionalInfo.map((info, iIndex) => (
//                     <div key={iIndex} className="flex gap-2 items-center">
//                       <input placeholder="Key" className="flex-1 text-sm border p-2 rounded-lg outline-none" value={info.key} onChange={(e) => onInfoChange(vIndex, iIndex, 'key', e.target.value)} disabled={isViewMode} />
//                       <input placeholder="Value" className="flex-1 text-sm border p-2 rounded-lg outline-none" value={info.value} onChange={(e) => onInfoChange(vIndex, iIndex, 'value', e.target.value)} disabled={isViewMode} />
//                       {!isViewMode && <button type="button" onClick={() => {
//                         const updated = [...product.variants];
//                         updated[vIndex].additionalInfo.splice(iIndex, 1);
//                         setFormData({ ...product, variants: updated });
//                       }} className="text-red-300 hover:text-red-500 transition-colors"><FiTrash2 /></button>}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* MEDIA */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="md:col-span-2 bg-white p-6 rounded-3xl border">
//             <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4"><FiUpload className="text-green-500" /> Images {errors.images && <span className="text-red-500 text-xs">({errors.images})</span>}</h3>
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//               {previews.images.map((preview, idx) => (
//                 <div key={idx} className={`relative aspect-square border-2 border-dashed rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50 group transition-all ${errors.images ? "border-red-300" : "border-gray-200"}`}>
//                   {preview ? (
//                     <>
//                       <img src={preview} alt="prev" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
//                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
//                         <button type="button" onClick={() => setPreviewModal({ isOpen: true, url: preview, type: 'image' })} className="p-2 bg-white rounded-full text-blue-600 shadow-lg hover:scale-110 transition-transform"><FiEye /></button>
//                         {!isViewMode && <button type="button" onClick={() => removeImage(idx)} className="p-2 bg-white rounded-full text-red-600 shadow-lg hover:scale-110 transition-transform"><FiTrash2 /></button>}
//                       </div>
//                     </>
//                   ) : (
//                     !isViewMode && (
//                       <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full hover:bg-gray-100 transition-colors">
//                         <FiPlus className="text-gray-300" size={24} />
//                         <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, idx)} />
//                       </label>
//                     )
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-3xl border">
//             <h3 className="font-bold text-gray-700 mb-6 border-b pb-4 flex items-center gap-2"><FiVideo className="text-green-500" /> Video</h3>
//             <div className="relative aspect-video border-2 border-dashed rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50 border-gray-200 group">
//               {previews.video ? (
//                 <>
//                   <video key={previews.video} src={previews.video} className="w-full h-full object-cover" muted playsInline />
//                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
//                     <button type="button" onClick={() => setPreviewModal({ isOpen: true, url: previews.video, type: 'video' })} className="p-3 bg-white rounded-full text-blue-600 shadow-xl hover:scale-110 transition-transform"><FiPlay size={24} /></button>
//                     {!isViewMode && <button type="button" onClick={removeVideo} className="p-3 bg-white rounded-full text-red-600 shadow-xl hover:scale-110 transition-transform"><FiTrash2 size={24} /></button>}
//                   </div>
//                 </>
//               ) : (
//                 !isViewMode && (
//                   <label className="cursor-pointer flex flex-col items-center hover:text-green-600 transition-colors">
//                     <FiPlus className="text-gray-300" size={32} />
//                     <span className="text-xs font-bold text-gray-400 mt-2 uppercase">Upload MP4</span>
//                     <input type="file" hidden accept="video/*" onChange={handleVideoChange} />
//                   </label>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default NewProduct;

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { 
//   FiPlus, FiTrash2, FiUpload, FiVideo, FiInfo, 
//   FiPackage, FiLayers, FiEye, FiX, FiPlay, FiAlignLeft, FiFileText 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const NewProduct = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { pathname } = useLocation();

//   const isViewMode = pathname.includes("view-product");
//   const isEditMode = !!id && !isViewMode;

//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [previewModal, setPreviewModal] = useState({ isOpen: false, url: "", type: "" });

//   // --- INITIAL STATE ---
//   const initialVariant = () => ({
//     id: Date.now() + Math.random(),
//     sku: "",
//     capacity: "",
//     unit: "kg",
//     mrp: "",
//     price: "",
//     stock: "0",
//     stockStatus: "In Stock",
//     additionalInfo: [{ key: "", value: "" }]
//   });

//   const [product, setFormData] = useState({
//     name: "",
//     categoryId: "",
//     brand: "",
//     shortDescription: "",
//     detailDescription: "",
//     showOnWebsite: true,
//     newLaunch: false,
//     featuredProduct: false,
//     variants: [initialVariant()]
//   });

//   // Track Files and Preview URLs separately but in sync
//   const [imageFiles, setImageFiles] = useState(Array(5).fill(null)); 
//   const [imagePreviews, setImagePreviews] = useState(Array(5).fill(null));
//   const [videoFile, setVideoFile] = useState(null);
//   const [videoPreview, setVideoPreview] = useState(null);

//   // --- DATA FETCHING ---
//   const fetchCategories = useCallback(async () => {
//     try {
//       const res = await api({
//         url: SummaryApi.getAllCategories.url,
//         method: SummaryApi.getAllCategories.method
//       });
//       if (res.data.success) setCategories(res.data.data);
//     } catch (err) {
//       toast.error("Error loading categories");
//     }
//   }, []);

//   const fetchProductDetails = useCallback(async () => {
//     if (!id) return;
//     setLoading(true);
//     try {
//       const res = await api({
//         url: SummaryApi.getProductById?.url ? SummaryApi.getProductById.url(id) : `${SummaryApi.getAllProduct.url}/${id}`,
//         method: "GET"
//       });
//       if (res.data.success) {
//         const p = res.data.data;
//         setFormData({
//           ...p,
//           categoryId: p.categoryId?._id || p.categoryId,
//           variants: p.variants?.length ? p.variants : [initialVariant()]
//         });
        
//         // Populate existing images
//         const existingImgs = Array(5).fill(null);
//         if (p.images && Array.isArray(p.images)) {
//           p.images.forEach((img, i) => { if(i < 5) existingImgs[i] = img; });
//         }
//         setImagePreviews(existingImgs);
//         setVideoPreview(p.video || null);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error loading product details");
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchCategories();
//     fetchProductDetails();
//   }, [fetchCategories, fetchProductDetails]);

//   // Cleanup Blob URLs to prevent memory leaks
//   useEffect(() => {
//     return () => {
//       imagePreviews.forEach(url => {
//         if (url && typeof url === 'string' && url.startsWith('blob:')) URL.revokeObjectURL(url);
//       });
//       if (videoPreview && typeof videoPreview === 'string' && videoPreview.startsWith('blob:')) {
//         URL.revokeObjectURL(videoPreview);
//       }
//     };
//   }, [imagePreviews, videoPreview]);

//   // --- HANDLERS ---
//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
//   };

//   const handleToggle = (name) => {
//     if (isViewMode) return;
//     setFormData(prev => ({ ...prev, [name]: !prev[name] }));
//   };

//   const handleImageChange = (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Revoke old blob if replaced
//     if (imagePreviews[index] && typeof imagePreviews[index] === 'string' && imagePreviews[index].startsWith('blob:')) {
//       URL.revokeObjectURL(imagePreviews[index]);
//     }

//     const blobUrl = URL.createObjectURL(file);
    
//     const newFiles = [...imageFiles];
//     newFiles[index] = file;
//     setImageFiles(newFiles);

//     const newPreviews = [...imagePreviews];
//     newPreviews[index] = blobUrl;
//     setImagePreviews(newPreviews);

//     if (errors.images) setErrors(prev => ({ ...prev, images: null }));
//   };

//   const removeImage = (index) => {
//     if (imagePreviews[index] && typeof imagePreviews[index] === 'string' && imagePreviews[index].startsWith('blob:')) {
//       URL.revokeObjectURL(imagePreviews[index]);
//     }

//     const newFiles = [...imageFiles];
//     newFiles[index] = null;
//     setImageFiles(newFiles);

//     const newPreviews = [...imagePreviews];
//     newPreviews[index] = null;
//     setImagePreviews(newPreviews);
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (videoPreview && typeof videoPreview === 'string' && videoPreview.startsWith('blob:')) {
//       URL.revokeObjectURL(videoPreview);
//     }

//     const blobUrl = URL.createObjectURL(file);
//     setVideoFile(file);
//     setVideoPreview(blobUrl);
//   };

//   const removeVideo = () => {
//     if (videoPreview && typeof videoPreview === 'string' && videoPreview.startsWith('blob:')) {
//       URL.revokeObjectURL(videoPreview);
//     }
//     setVideoFile(null);
//     setVideoPreview(null);
//   };

//   const onVariantChange = (index, field, value) => {
//     const updated = [...product.variants];
//     updated[index][field] = value;
//     setFormData({ ...product, variants: updated });
//   };

//   const onInfoChange = (vIndex, iIndex, field, value) => {
//     const updated = [...product.variants];
//     updated[vIndex].additionalInfo[iIndex][field] = value;
//     setFormData({ ...product, variants: updated });
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!product.name?.trim()) newErrors.name = "Name is required";
//     if (!product.categoryId) newErrors.categoryId = "Category is required";
//     if (!product.shortDescription?.trim()) newErrors.shortDescription = "Description is required";
    
//     const variantErrors = [];
//     product.variants.forEach((v, index) => {
//       const vErr = {};
//       if (!v.sku?.trim()) vErr.sku = "Required";
//       if (!v.capacity?.trim()) vErr.capacity = "Required";
//       if (!v.mrp || Number(v.mrp) <= 0) vErr.mrp = "Invalid";
//       if (!v.price || Number(v.price) <= 0) vErr.price = "Invalid";
//       if (Number(v.price) > Number(v.mrp)) vErr.price = "Price > MRP";
//       if (Object.keys(vErr).length > 0) variantErrors[index] = vErr;
//     });

//     if (variantErrors.length > 0) newErrors.variants = variantErrors;

//     const hasImage = imagePreviews.some(img => img !== null);
//     if (!hasImage) newErrors.images = "Upload at least one image";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return toast.error("Please fill required fields");

//     setLoading(true);
//     const formData = new FormData();
    
//     // Basic Fields
//     Object.keys(product).forEach(key => {
//       if (!['variants', 'images', 'video', '_id', '__v', 'createdAt', 'updatedAt'].includes(key)) {
//         formData.append(key, product[key]);
//       }
//     });

//     // Variants
//     formData.append("variants", JSON.stringify(product.variants));
    
//     // Images Logic: Send new files and track existing URLs to keep
//     imageFiles.forEach(file => { if (file) formData.append("images", file); });
//     const existingImages = imagePreviews.filter(img => typeof img === 'string' && img.startsWith('http'));
//     formData.append("existingImages", JSON.stringify(existingImages));

//     // Video Logic
//     if (videoFile) formData.append("video", videoFile);
//     else if (videoPreview && videoPreview.startsWith('http')) formData.append("existingVideo", videoPreview);

//     try {
//       const config = isEditMode ? SummaryApi.updateProduct(id) : SummaryApi.createProduct;
//       const res = await api({
//         url: config.url,
//         method: config.method,
//         data: formData,
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       if (res.data.success) {
//         toast.success("Saved successfully!");
//         navigate("/admin-panel/product-list");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error saving");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="pb-20 relative px-4 bg-gray-50 min-h-screen">
//       {/* PREVIEW MODAL */}
//       {previewModal.isOpen && (
//         <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
//           <button 
//             type="button"
//             onClick={() => setPreviewModal({ isOpen: false, url: "", type: "" })} 
//             className="absolute top-6 right-6 text-white text-4xl hover:text-red-500 z-[10000] transition-colors"
//           >
//             <FiX />
//           </button>
//           <div className="w-full max-w-5xl flex items-center justify-center">
//             {previewModal.type === 'video' ? (
//               <video 
//                 key={previewModal.url} // Forces re-render when source changes
//                 src={previewModal.url} 
//                 controls 
//                 autoPlay 
//                 className="max-w-full max-h-[85vh] rounded-lg shadow-2xl" 
//               />
//             ) : (
//               <img 
//                 key={previewModal.url}
//                 src={previewModal.url} 
//                 alt="Preview" 
//                 className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" 
//               />
//             )}
//           </div>
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border mt-4">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">
//             {isViewMode ? "View Product" : isEditMode ? "Edit Product" : "Add Product"}
//           </h2>
//           <p className="text-sm text-gray-500">Manage your product details and media</p>
//         </div>
//         {!isViewMode && (
//           <button 
//             type="button"
//             onClick={handleSubmit} 
//             disabled={loading} 
//             className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-full font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50"
//           >
//             {loading ? "Processing..." : "Save Product"}
//           </button>
//         )}
//       </div>

//       <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
//         {/* BASIC INFO */}
//         <div className="bg-white p-6 rounded-3xl shadow-sm border">
//           <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4"><FiInfo className="text-green-500" /> Basic Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="md:col-span-1">
//               <label className="text-sm font-bold text-gray-600">Product Name *</label>
//               <input name="name" value={product.name} onChange={handleInputChange} disabled={isViewMode} className={`w-full border p-3 rounded-xl mt-1 outline-none transition-all ${errors.name ? "border-red-500" : "focus:border-green-500 border-gray-200"}`} />
//               {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600">Brand</label>
//               <input name="brand" value={product.brand} onChange={handleInputChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 outline-none focus:border-green-500 transition-all" />
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600">Category *</label>
//               <select name="categoryId" value={product.categoryId} onChange={handleInputChange} disabled={isViewMode} className={`w-full border p-3 rounded-xl mt-1 outline-none transition-all ${errors.categoryId ? "border-red-500" : "border-gray-200 focus:border-green-500"}`}>
//                 <option value="">Select Category</option>
//                 {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//               </select>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//             <div>
//               <label className="text-sm font-bold text-gray-600 flex items-center gap-1 mb-2"><FiAlignLeft className="text-green-500" /> Short Description *</label>
//               <textarea name="shortDescription" value={product.shortDescription} onChange={handleInputChange} disabled={isViewMode} className={`w-full border p-4 rounded-xl h-32 resize-none outline-none transition-all ${errors.shortDescription ? "border-red-500" : "focus:border-green-500 border-gray-200"}`} />
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600 flex items-center gap-1 mb-2"><FiFileText className="text-green-500" /> Detailed Description</label>
//               <textarea name="detailDescription" value={product.detailDescription} onChange={handleInputChange} disabled={isViewMode} className="w-full border border-gray-200 p-4 rounded-xl h-32 resize-none outline-none focus:border-green-500 transition-all" />
//             </div>
//           </div>
//         </div>

//         {/* VISIBILITY */}
//         <div className="bg-white p-6 rounded-3xl shadow-sm border">
//           <h3 className="text-lg font-bold text-gray-700 mb-6 border-b pb-4 flex items-center gap-2"><FiLayers className="text-green-500" /> Visibility & Tags</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {["showOnWebsite", "newLaunch", "featuredProduct"].map(item => (
//               <div key={item} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
//                 <span className="font-semibold text-gray-700 capitalize">{item.replace(/([A-Z])/g, ' $1')}</span>
//                 <button type="button" onClick={() => handleToggle(item)} disabled={isViewMode} className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${product[item] ? "bg-green-600" : "bg-gray-300"}`}>
//                   <div className={`bg-white w-4 h-4 rounded-full shadow transform transition-all ${product[item] ? "translate-x-6" : ""}`} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* VARIANTS */}
//         <div className="space-y-6">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-extrabold text-gray-800 flex items-center gap-2"><FiPackage className="text-green-600" /> Product Variants</h3>
//             {!isViewMode && (
//               <button 
//                 type="button" 
//                 onClick={() => setFormData(p => ({ ...p, variants: [...p.variants, initialVariant()] }))} 
//                 className="bg-green-50 text-green-700 px-4 py-2 rounded-xl font-bold border border-green-200 hover:bg-green-100 flex items-center gap-1 transition-colors"
//               >
//                 <FiPlus /> Add Variant
//               </button>
//             )}
//           </div>
//           {product.variants.map((variant, vIndex) => (
//             <div key={variant.id} className="bg-white p-6 rounded-3xl border shadow-sm relative overflow-hidden transition-all hover:shadow-md">
//               <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
//               {!isViewMode && product.variants.length > 1 && (
//                 <button 
//                   type="button" 
//                   onClick={() => {
//                     const updated = [...product.variants];
//                     updated.splice(vIndex, 1);
//                     setFormData({ ...product, variants: updated });
//                   }} 
//                   className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"
//                 >
//                   <FiTrash2 size={20} />
//                 </button>
//               )}
//               <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
//                 <div className="md:col-span-2">
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">SKU *</label>
//                   <input className={`w-full border p-2 rounded-lg mt-1 outline-none ${errors.variants?.[vIndex]?.sku ? "border-red-500" : "border-gray-200 focus:border-green-500"}`} value={variant.sku} onChange={(e) => onVariantChange(vIndex, 'sku', e.target.value)} disabled={isViewMode} />
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">Capacity</label>
//                   <input className={`w-full border p-2 rounded-lg mt-1 outline-none ${errors.variants?.[vIndex]?.capacity ? "border-red-500" : "border-gray-200 focus:border-green-500"}`} value={variant.capacity} onChange={(e) => onVariantChange(vIndex, 'capacity', e.target.value)} disabled={isViewMode} />
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">Unit</label>
//                   <select className="w-full border border-gray-200 p-2 rounded-lg mt-1 outline-none focus:border-green-500" value={variant.unit} onChange={(e) => onVariantChange(vIndex, 'unit', e.target.value)} disabled={isViewMode}>
//                     <option value="ml">ml</option><option value="liter">liter</option><option value="kg">kg</option><option value="unit">Unit</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">MRP *</label>
//                   <input type="number" className={`w-full border p-2 rounded-lg mt-1 outline-none ${errors.variants?.[vIndex]?.mrp ? "border-red-500" : "border-gray-200 focus:border-green-500"}`} value={variant.mrp} onChange={(e) => onVariantChange(vIndex, 'mrp', e.target.value)} disabled={isViewMode} />
//                 </div>
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">Price *</label>
//                   <input type="number" className={`w-full border p-2 rounded-lg mt-1 outline-none ${errors.variants?.[vIndex]?.price ? "border-red-500" : "border-gray-200 focus:border-green-500"}`} value={variant.price} onChange={(e) => onVariantChange(vIndex, 'price', e.target.value)} disabled={isViewMode} />
//                 </div>
//               </div>
              
//               <div className="mt-6 bg-gray-50/50 p-4 rounded-2xl border border-dashed border-gray-200">
//                 <div className="flex justify-between items-center mb-4">
//                   <p className="text-xs font-bold text-gray-500 uppercase">Additional Specification</p>
//                   {!isViewMode && <button type="button" onClick={() => {
//                     const updated = [...product.variants];
//                     updated[vIndex].additionalInfo.push({ key: "", value: "" });
//                     setFormData({ ...product, variants: updated });
//                   }} className="text-[10px] font-bold text-green-600 bg-white px-3 py-1 rounded-full border border-green-100 shadow-sm transition-all hover:bg-green-50">+ Add Field</button>}
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {variant.additionalInfo.map((info, iIndex) => (
//                     <div key={iIndex} className="flex gap-2 items-center">
//                       <input placeholder="Label (e.g. Color)" className="flex-1 text-sm border border-gray-200 p-2 rounded-lg outline-none focus:border-green-500" value={info.key} onChange={(e) => onInfoChange(vIndex, iIndex, 'key', e.target.value)} disabled={isViewMode} />
//                       <input placeholder="Value (e.g. Red)" className="flex-1 text-sm border border-gray-200 p-2 rounded-lg outline-none focus:border-green-500" value={info.value} onChange={(e) => onInfoChange(vIndex, iIndex, 'value', e.target.value)} disabled={isViewMode} />
//                       {!isViewMode && <button type="button" onClick={() => {
//                         const updated = [...product.variants];
//                         updated[vIndex].additionalInfo.splice(iIndex, 1);
//                         setFormData({ ...product, variants: updated });
//                       }} className="text-red-300 hover:text-red-500 transition-colors"><FiTrash2 /></button>}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* MEDIA SECTION */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* IMAGES */}
//           <div className="md:col-span-2 bg-white p-6 rounded-3xl border shadow-sm">
//             <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//               <FiUpload className="text-green-500" /> Product Images 
//               {errors.images && <span className="text-red-500 text-xs font-normal">({errors.images})</span>}
//             </h3>
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//               {imagePreviews.map((preview, idx) => (
//                 <div key={idx} className={`relative aspect-square border-2 border-dashed rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50 group transition-all ${errors.images ? "border-red-300" : "border-gray-200 hover:border-green-300"}`}>
//                   {preview ? (
//                     <>
//                       <img src={preview} alt={`Product ${idx}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
//                       <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
//                         <button 
//                           type="button" 
//                           onClick={() => setPreviewModal({ isOpen: true, url: preview, type: 'image' })} 
//                           className="p-2 bg-white rounded-full text-blue-600 shadow-lg hover:scale-110 transition-transform"
//                         >
//                           <FiEye />
//                         </button>
//                         {!isViewMode && (
//                           <button 
//                             type="button" 
//                             onClick={() => removeImage(idx)} 
//                             className="p-2 bg-white rounded-full text-red-600 shadow-lg hover:scale-110 transition-transform"
//                           >
//                             <FiTrash2 />
//                           </button>
//                         )}
//                       </div>
//                     </>
//                   ) : (
//                     !isViewMode && (
//                       <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full hover:bg-green-50 transition-colors">
//                         <FiPlus className="text-gray-300 group-hover:text-green-500" size={24} />
//                         <span className="text-[10px] text-gray-400 mt-1 uppercase font-bold group-hover:text-green-600">Add</span>
//                         <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, idx)} />
//                       </label>
//                     )
//                   )}
//                 </div>
//               ))}
//             </div>
//             <p className="mt-4 text-[11px] text-gray-400 italic">* First image will be the primary thumbnail.</p>
//           </div>

//           {/* VIDEO */}
//           <div className="bg-white p-6 rounded-3xl border shadow-sm">
//             <h3 className="font-bold text-gray-700 mb-6 border-b pb-4 flex items-center gap-2"><FiVideo className="text-green-500" /> Product Video</h3>
//             <div className="relative aspect-video border-2 border-dashed rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50 border-gray-200 group hover:border-green-300 transition-all">
//               {videoPreview ? (
//                 <>
//                   <video 
//                     key={videoPreview} 
//                     src={videoPreview} 
//                     className="w-full h-full object-cover" 
//                     muted 
//                     playsInline 
//                   />
//                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
//                     <button 
//                       type="button" 
//                       onClick={() => setPreviewModal({ isOpen: true, url: videoPreview, type: 'video' })} 
//                       className="p-3 bg-white rounded-full text-blue-600 shadow-xl hover:scale-110 transition-transform"
//                     >
//                       <FiPlay size={24} />
//                     </button>
//                     {!isViewMode && (
//                       <button 
//                         type="button" 
//                         onClick={removeVideo} 
//                         className="p-3 bg-white rounded-full text-red-600 shadow-xl hover:scale-110 transition-transform"
//                       >
//                         <FiTrash2 size={24} />
//                       </button>
//                     )}
//                   </div>
//                 </>
//               ) : (
//                 !isViewMode && (
//                   <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full hover:bg-green-50 transition-colors">
//                     <FiPlus className="text-gray-300 group-hover:text-green-500" size={32} />
//                     <span className="text-xs font-bold text-gray-400 mt-2 uppercase group-hover:text-green-600">Upload MP4</span>
//                     <input type="file" hidden accept="video/*" onChange={handleVideoChange} />
//                   </label>
//                 )
//               )}
//             </div>
//             <p className="mt-4 text-[11px] text-gray-400 text-center uppercase tracking-wider font-semibold">Max Size: 20MB</p>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default NewProduct;

import React, { useState, useEffect, useCallback,useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { 
  FiPlus, FiTrash2, FiUpload, FiVideo, FiInfo, 
  FiPackage, FiLayers, FiEye, FiX, FiPlay, FiAlignLeft, FiFileText 
} from "react-icons/fi";
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";


const NewProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  
const prevPreviewsRef = useRef({
  images: [],
  video: null
});

  const isViewMode = pathname.includes("view-product");
  const isEditMode = !!id && !isViewMode;

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [previewModal, setPreviewModal] = useState({ isOpen: false, url: null, type: null });

  // --- INITIAL STATE ---
  const initialVariant = () => ({
    id: Date.now() + Math.random(),
    sku: "",
    capacity: "",
    unit: "kg",
    mrp: "",
    price: "",
    stock: "0",
    stockStatus: "In Stock",
    additionalInfo: [{ key: "", value: "" }]
  });

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    shortDescription: "",
    detailDescription: "",
    showOnWebsite: true,
    newLaunch: false,
    featuredProduct: false,
    images: Array(5).fill(null), // Holds File objects for new uploads
    video: null,                 // Holds File object for new upload
    variants: [initialVariant()]
  });

  const [previews, setPreviews] = useState({
    images: Array(5).fill(null), // Holds URLs (Blob or Hosted)
    video: null                  // Holds URL (Blob or Hosted)
  });

  // --- DATA FETCHING ---
  const fetchCategories = useCallback(async () => {
    try {
      const res = await api({
        url: SummaryApi.getAllCategories.url,
        method: SummaryApi.getAllCategories.method
      });
      if (res.data.success) setCategories(res.data.data);
    } catch (err) {
      toast.error("Error loading categories");
    }
  }, []);

  const fetchProductDetails = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await api({
        url: SummaryApi.getProductById?.url ? SummaryApi.getProductById.url(id) : `${SummaryApi.getAllProduct.url}/${id}`,
        method: "GET"
      });
      if (res.data.success) {
        const p = res.data.data;
        
        // Map variants and ensure they have the required structure
        const mappedVariants = p.variants?.map(v => ({
          ...v,
          id: v._id || Date.now() + Math.random(),
          additionalInfo: v.additionalInfo?.length ? v.additionalInfo : [{ key: "", value: "" }]
        })) || [initialVariant()];

        setFormData({
          ...p,
          category: p.categoryId?._id || p.categoryId,
          images: Array(5).fill(null),
          video: null,
          variants: mappedVariants
        });
        
        const existingImages = [...(p.images || [])];
        const newPreviews = Array(5).fill(null);
        existingImages.forEach((url, i) => { if(i < 5) newPreviews[i] = url; });
        
        setPreviews({
          images: newPreviews,
          video: p.video || null
        });
      }
    } catch (err) {
      toast.error("Error loading product details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCategories();
    fetchProductDetails();
  }, [fetchCategories, fetchProductDetails]);

  // Cleanup Blob URLs to prevent memory leaks
  useEffect(() => {
  const prev = prevPreviewsRef.current;

  // cleanup old images
  prev.images.forEach((url, index) => {
    const currentUrl = previews.images[index];

    if (
      url &&
      url.startsWith("blob:") &&
      url !== currentUrl
    ) {
      URL.revokeObjectURL(url);
    }
  });

  // cleanup old video
  if (
    prev.video &&
    prev.video.startsWith("blob:") &&
    prev.video !== previews.video
  ) {
    URL.revokeObjectURL(prev.video);
  }

  // update ref
  prevPreviewsRef.current = previews;

}, [previews]);

useEffect(() => {
  return () => {
    const prev = prevPreviewsRef.current;

    prev.images.forEach(url => {
      if (url?.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }
    });

    if (prev.video?.startsWith("blob:")) {
      URL.revokeObjectURL(prev.video);
    }
  };
}, []);


  // --- VALIDATION ---
  const validate = () => {
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = "Name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.shortDescription?.trim()) newErrors.shortDescription = "Description is required";
    
    const variantErrors = [];
    formData.variants.forEach((v, index) => {
      const vErr = {};
      if (!v.sku?.trim()) vErr.sku = "Required";
      if (!v.capacity?.trim()) vErr.capacity = "Required";
      if (!v.mrp || Number(v.mrp) <= 0) vErr.mrp = "Invalid";
      if (!v.price || Number(v.price) <= 0) vErr.price = "Invalid";
      if (Number(v.price) > Number(v.mrp)) vErr.price = "Price > MRP";
      if (Object.keys(vErr).length > 0) variantErrors[index] = vErr;
    });

    if (variantErrors.length > 0) newErrors.variants = variantErrors;

    const hasImage = previews.images.some(img => img !== null);
    if (!hasImage) newErrors.images = "Upload at least one image";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleToggle = (name) => {
    if (isViewMode) return;
    setFormData(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleImageChange = (e, index) => {
  const file = e.target.files[0];
  if (!file) return;

  const blobUrl = URL.createObjectURL(file);

  setFormData(prev => {
    const newImages = [...prev.images];
    newImages[index] = file;
    return { ...prev, images: newImages };
  });

  setPreviews(prev => {
    const newPreviews = [...prev.images];
    newPreviews[index] = blobUrl;
    return { ...prev, images: newPreviews };
  });
};
  const removeImage = (index) => {
    if (previews.images[index]?.startsWith('blob:')) {
      URL.revokeObjectURL(previews.images[index]);
    }
    setFormData(prev => {
      const newImages = [...prev.images];
      newImages[index] = null;
      return { ...prev, images: newImages };
    });
    setPreviews(prev => {
      const newPreviews = [...prev.images];
      newPreviews[index] = null;
      return { ...prev, images: newPreviews };
    });
  };

  const handleVideoChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const blobUrl = URL.createObjectURL(file);

  setFormData(prev => ({ ...prev, video: file }));
  setPreviews(prev => ({ ...prev, video: blobUrl }));
};

  const removeVideo = () => {
    if (previews.video?.startsWith('blob:')) {
      URL.revokeObjectURL(previews.video);
    }
    setFormData(prev => ({ ...prev, video: null }));
    setPreviews(prev => ({ ...prev, video: null }));
  };

  const onVariantChange = (index, field, value) => {
    const updated = [...formData.variants];
    updated[index][field] = value;
    setFormData({ ...formData, variants: updated });
  };

  const onInfoChange = (vIndex, iIndex, field, value) => {
    const updated = [...formData.variants];
    updated[vIndex].additionalInfo[iIndex][field] = value;
    setFormData({ ...formData, variants: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return toast.error("Please fill required fields");

    setLoading(true);
    const formDataToSend = new FormData();

    // Append basic fields
    Object.keys(formData).forEach(key => {
      if (!['variants', 'images', 'video'].includes(key)) {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Append variants
    formDataToSend.append("variants", JSON.stringify(formData.variants));
    
    // Process Images: Send actual File objects for new uploads
    formData.images.forEach(img => { 
      if (img instanceof File) formDataToSend.append("images", img); 
    });

    // Send existing image URLs so backend knows what to keep
    const existingImages = previews.images.filter(img => typeof img === 'string' && img.startsWith('http'));
    formDataToSend.append("existingImages", JSON.stringify(existingImages));

    // Process Video
    if (formData.video instanceof File) {
      formDataToSend.append("video", formData.video);
    } else if (previews.video?.startsWith('http')) {
      formDataToSend.append("existingVideo", previews.video);
    }

    try {
      const config = isEditMode ? SummaryApi.updateProduct(id) : SummaryApi.createProduct;
      const res = await api({
        url: config.url,
        method: config.method,
        data: formDataToSend,
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (res.data.success) {
        toast.success("Saved successfully!");
        navigate("/admin-panel/product-list");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20 relative px-4">
      {/* PREVIEW MODAL */}
      {previewModal.isOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
          <button 
            type="button"
            onClick={() => setPreviewModal({isOpen: false, url: null, type: null})} 
            className="absolute top-6 right-6 text-white text-4xl hover:text-red-500 z-50 transition-colors"
          >
            <FiX />
          </button>
          <div className="w-full max-w-5xl flex items-center justify-center">
            {previewModal.type === 'video' ? (
              <video 
                key={previewModal.url} // Key forces re-mount when URL changes
                src={previewModal.url} 
                controls 
                autoPlay 
                className="max-w-full max-h-[85vh] rounded-lg shadow-2xl" 
              />
            ) : (
              <img 
                key={previewModal.url}
                src={previewModal.url} 
                alt="View" 
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" 
              />
            )}
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border mt-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isViewMode ? "View Product" : isEditMode ? "Edit Product" : "Add Product"}
          </h2>
        </div>
        {!isViewMode && (
          <button 
            type="button"
            onClick={handleSubmit} 
            disabled={loading} 
            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-full font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Save Product"}
          </button>
        )}
      </div>

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        {/* BASIC INFO */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border">
          <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4"><FiInfo className="text-green-500" /> Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="text-sm font-bold text-gray-600">Product Name *</label>
              <input name="name" value={formData.name} onChange={handleChange} disabled={isViewMode} className={`w-full border p-3 rounded-xl mt-1 outline-none ${errors.name ? "border-red-500" : "focus:border-green-500"}`} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-sm font-bold text-gray-600">Brand</label>
              <input name="brand" value={formData.brand} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 outline-none" />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-600">Category *</label>
              <select name="category" value={formData.category} onChange={handleChange} disabled={isViewMode} className={`w-full border p-3 rounded-xl mt-1 outline-none ${errors.category ? "border-red-500" : ""}`}>
                <option value="">Select</option>
                {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="text-sm font-bold text-gray-600 flex items-center gap-1 mb-2"><FiAlignLeft className="text-green-500" /> Short Description *</label>
              <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} disabled={isViewMode} className={`w-full border p-4 rounded-xl h-32 resize-none outline-none ${errors.shortDescription ? "border-red-500" : "focus:border-green-500"}`} />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-600 flex items-center gap-1 mb-2"><FiFileText className="text-green-500" /> Detailed Description</label>
              <textarea name="detailDescription" value={formData.detailDescription} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-4 rounded-xl h-32 resize-none outline-none" />
            </div>
          </div>
        </div>

        {/* VISIBILITY */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border">
          <h3 className="text-lg font-bold text-gray-700 mb-6 border-b pb-4 flex items-center gap-2"><FiLayers className="text-green-500" /> Visibility</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["showOnWebsite", "newLaunch", "featuredProduct"].map(item => (
              <div key={item} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border">
                <span className="font-semibold text-gray-700 capitalize">{item.replace(/([A-Z])/g, ' $1')}</span>
                <button type="button" onClick={() => handleToggle(item)} className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${formData[item] ? "bg-green-600" : "bg-gray-300"}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow transform transition-all ${formData[item] ? "translate-x-6" : ""}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* VARIANTS */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-extrabold text-gray-800 flex items-center gap-2"><FiPackage className="text-green-600" /> Variants</h3>
            {!isViewMode && (
              <button type="button" onClick={() => setFormData(p => ({ ...p, variants: [...p.variants, initialVariant()] }))} className="bg-green-50 text-green-700 px-4 py-2 rounded-xl font-bold border border-green-200 hover:bg-green-100 flex items-center gap-1 transition-all"><FiPlus /> Add Variant</button>
            )}
          </div>
          {formData.variants.map((variant, vIndex) => (
            <div key={variant.id} className="bg-white p-6 rounded-3xl border shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
              {!isViewMode && formData.variants.length > 1 && (
                <button type="button" onClick={() => {
                  const updated = [...formData.variants];
                  updated.splice(vIndex, 1);
                  setFormData({ ...formData, variants: updated });
                }} className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"><FiTrash2 size={20} /></button>
              )}
              <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                <div className="md:col-span-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase">SKU *</label>
                  <input className={`w-full border p-2 rounded-lg mt-1 outline-none ${errors.variants?.[vIndex]?.sku ? "border-red-500" : "border-gray-200 focus:border-green-500"}`} value={variant.sku} onChange={(e) => onVariantChange(vIndex, 'sku', e.target.value)} disabled={isViewMode} />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase">Capacity</label>
                  <input className={`w-full border p-2 rounded-lg mt-1 outline-none ${errors.variants?.[vIndex]?.capacity ? "border-red-500" : "border-gray-200 focus:border-green-500"}`} value={variant.capacity} onChange={(e) => onVariantChange(vIndex, 'capacity', e.target.value)} disabled={isViewMode} />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase">Unit</label>
                  <select className="w-full border border-gray-200 p-2 rounded-lg mt-1 outline-none focus:border-green-500" value={variant.unit} onChange={(e) => onVariantChange(vIndex, 'unit', e.target.value)} disabled={isViewMode}>
                    <option value="ml">ml</option><option value="liter">liter</option><option value="kg">kg</option><option value="unit">Unit</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase">MRP *</label>
                  <input type="number" className={`w-full border p-2 rounded-lg mt-1 outline-none ${errors.variants?.[vIndex]?.mrp ? "border-red-500" : "border-gray-200 focus:border-green-500"}`} value={variant.mrp} onChange={(e) => onVariantChange(vIndex, 'mrp', e.target.value)} disabled={isViewMode} />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase">Price *</label>
                  <input type="number" className={`w-full border p-2 rounded-lg mt-1 outline-none ${errors.variants?.[vIndex]?.price ? "border-red-500" : "border-gray-200 focus:border-green-500"}`} value={variant.price} onChange={(e) => onVariantChange(vIndex, 'price', e.target.value)} disabled={isViewMode} />
                </div>
                {/* ADDED STOCK FIELD */}
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase">Stock</label>
                  <input type="number" className="w-full border border-gray-200 p-2 rounded-lg mt-1 outline-none focus:border-green-500" value={variant.stock} onChange={(e) => onVariantChange(vIndex, 'stock', e.target.value)} disabled={isViewMode} />
                </div>
              </div>
              
              <div className="mt-6 bg-gray-50/50 p-4 rounded-2xl border border-dashed">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xs font-bold text-gray-500 uppercase">Extra Info</p>
                  {!isViewMode && <button type="button" onClick={() => {
                    const updated = [...formData.variants];
                    updated[vIndex].additionalInfo.push({ key: "", value: "" });
                    setFormData({ ...formData, variants: updated });
                  }} className="text-[10px] font-bold text-green-600 bg-white px-3 py-1 rounded-full border border-green-100 shadow-sm transition-all hover:bg-green-50">+ Add Field</button>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {variant.additionalInfo.map((info, iIndex) => (
                    <div key={iIndex} className="flex gap-2 items-center">
                      <input placeholder="Key (e.g. Color)" className="flex-1 text-sm border p-2 rounded-lg outline-none focus:border-green-500" value={info.key} onChange={(e) => onInfoChange(vIndex, iIndex, 'key', e.target.value)} disabled={isViewMode} />
                      <input placeholder="Value" className="flex-1 text-sm border p-2 rounded-lg outline-none focus:border-green-500" value={info.value} onChange={(e) => onInfoChange(vIndex, iIndex, 'value', e.target.value)} disabled={isViewMode} />
                      {!isViewMode && <button type="button" onClick={() => {
                        const updated = [...formData.variants];
                        updated[vIndex].additionalInfo.splice(iIndex, 1);
                        setFormData({ ...formData, variants: updated });
                      }} className="text-red-300 hover:text-red-500 transition-colors"><FiTrash2 /></button>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MEDIA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white p-6 rounded-3xl border">
            <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4"><FiUpload className="text-green-500" /> Images {errors.images && <span className="text-red-500 text-xs">({errors.images})</span>}</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {previews.images.map((preview, idx) => (
                <div key={idx} className={`relative aspect-square border-2 border-dashed rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50 group transition-all ${errors.images ? "border-red-300" : "border-gray-200"}`}>
                  {preview ? (
                    <>
                      <img src={preview} alt={`preview-${idx}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button type="button" onClick={() => setPreviewModal({ isOpen: true, url: preview, type: 'image' })} className="p-2 bg-white rounded-full text-blue-600 shadow-lg hover:scale-110 transition-transform"><FiEye /></button>
                        {!isViewMode && <button type="button" onClick={() => removeImage(idx)} className="p-2 bg-white rounded-full text-red-600 shadow-lg hover:scale-110 transition-transform"><FiTrash2 /></button>}
                      </div>
                    </>
                  ) : (
                    !isViewMode && (
                      <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full hover:bg-gray-100 transition-colors">
                        <FiPlus className="text-gray-300" size={24} />
                        <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, idx)} />
                      </label>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border">
            <h3 className="font-bold text-gray-700 mb-6 border-b pb-4 flex items-center gap-2"><FiVideo className="text-green-500" /> Video</h3>
            <div className="relative aspect-video border-2 border-dashed rounded-2xl overflow-hidden flex items-center justify-center bg-gray-50 border-gray-200 group">
              {previews.video ? (
                <>
                  <video 
                    key={previews.video} // Forces update when file changes
                    src={previews.video} 
                    className="w-full h-full object-cover" 
                    muted 
                    playsInline 
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button type="button" onClick={() => setPreviewModal({ isOpen: true, url: previews.video, type: 'video' })} className="p-3 bg-white rounded-full text-blue-600 shadow-xl hover:scale-110 transition-transform"><FiPlay size={24} /></button>
                    {!isViewMode && <button type="button" onClick={removeVideo} className="p-3 bg-white rounded-full text-red-600 shadow-xl hover:scale-110 transition-transform"><FiTrash2 size={24} /></button>}
                  </div>
                </>
              ) : (
                !isViewMode && (
                  <label className="cursor-pointer flex flex-col items-center hover:text-green-600 transition-colors">
                    <FiPlus className="text-gray-300" size={32} />
                    <span className="text-xs font-bold text-gray-400 mt-2 uppercase">Upload MP4</span>
                    <input type="file" hidden accept="video/*" onChange={handleVideoChange} />
                  </label>
                )
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;