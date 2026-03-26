// import React, { useState, useEffect, useCallback,useRef } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { 
//   FiPlus, FiTrash2, FiUpload, FiVideo, FiInfo, 
//   FiPackage, FiLayers, FiEye, FiX, FiPlay, FiAlignLeft, FiFileText 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";


// const ProductForm = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { pathname } = useLocation();
  
// const prevPreviewsRef = useRef({
//   images: [],
//   video: null
// });

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

//   const [formData, setFormData] = useState({
//     name: "",
//     category: "",
//     brand: "",
//     shortDescription: "",
//     detailDescription: "",
//     showOnWebsite: true,
//     newLaunch: false,
//     featuredProduct: false,
//     images: Array(5).fill(null), // Holds File objects for new uploads
//     video: null,                 // Holds File object for new upload
//     variants: [initialVariant()]
//   });

//   const [previews, setPreviews] = useState({
//     images: Array(5).fill(null), // Holds URLs (Blob or Hosted)
//     video: null                  // Holds URL (Blob or Hosted)
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
        
//         // Map variants and ensure they have the required structure
//         const mappedVariants = p.variants?.map(v => ({
//           ...v,
//           id: v._id || Date.now() + Math.random(),
//           additionalInfo: v.additionalInfo?.length ? v.additionalInfo : [{ key: "", value: "" }]
//         })) || [initialVariant()];

//         setFormData({
//           ...p,
//           category: p.categoryId?._id || p.categoryId,
//           images: Array(5).fill(null),
//           video: null,
//           variants: mappedVariants
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

//   // Cleanup Blob URLs to prevent memory leaks
//   useEffect(() => {
//   const prev = prevPreviewsRef.current;

//   // cleanup old images
//   prev.images.forEach((url, index) => {
//     const currentUrl = previews.images[index];

//     if (
//       url &&
//       url.startsWith("blob:") &&
//       url !== currentUrl
//     ) {
//       URL.revokeObjectURL(url);
//     }
//   });

//   // cleanup old video
//   if (
//     prev.video &&
//     prev.video.startsWith("blob:") &&
//     prev.video !== previews.video
//   ) {
//     URL.revokeObjectURL(prev.video);
//   }

//   // update ref
//   prevPreviewsRef.current = previews;

// }, [previews]);

// useEffect(() => {
//   return () => {
//     const prev = prevPreviewsRef.current;

//     prev.images.forEach(url => {
//       if (url?.startsWith("blob:")) {
//         URL.revokeObjectURL(url);
//       }
//     });

//     if (prev.video?.startsWith("blob:")) {
//       URL.revokeObjectURL(prev.video);
//     }
//   };
// }, []);


//   // --- VALIDATION ---
//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name?.trim()) newErrors.name = "Name is required";
//     if (!formData.category) newErrors.category = "Category is required";
//     if (!formData.shortDescription?.trim()) newErrors.shortDescription = "Description is required";
    
//     const variantErrors = [];
//     formData.variants.forEach((v, index) => {
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
//   const file = e.target.files[0];
//   if (!file) return;

//   const blobUrl = URL.createObjectURL(file);

//   setFormData(prev => {
//     const newImages = [...prev.images];
//     newImages[index] = file;
//     return { ...prev, images: newImages };
//   });

//   setPreviews(prev => {
//     const newPreviews = [...prev.images];
//     newPreviews[index] = blobUrl;
//     return { ...prev, images: newPreviews };
//   });
// };
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
//   const file = e.target.files[0];
//   if (!file) return;

//   const blobUrl = URL.createObjectURL(file);

//   setFormData(prev => ({ ...prev, video: file }));
//   setPreviews(prev => ({ ...prev, video: blobUrl }));
// };

//   const removeVideo = () => {
//     if (previews.video?.startsWith('blob:')) {
//       URL.revokeObjectURL(previews.video);
//     }
//     setFormData(prev => ({ ...prev, video: null }));
//     setPreviews(prev => ({ ...prev, video: null }));
//   };

//   const onVariantChange = (index, field, value) => {
//     const updated = [...formData.variants];
//     updated[index][field] = value;
//     setFormData({ ...formData, variants: updated });
//   };

//   const onInfoChange = (vIndex, iIndex, field, value) => {
//     const updated = [...formData.variants];
//     updated[vIndex].additionalInfo[iIndex][field] = value;
//     setFormData({ ...formData, variants: updated });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return toast.error("Please fill required fields");

//     setLoading(true);
//     const formDataToSend = new FormData();

//     // Append basic fields
//     Object.keys(formData).forEach(key => {
//       if (!['variants', 'images', 'video'].includes(key)) {
//         formDataToSend.append(key, formData[key]);
//       }
//     });

//     // Append variants
//     formDataToSend.append("variants", JSON.stringify(formData.variants));
    
//     // Process Images: Send actual File objects for new uploads
//     formData.images.forEach(img => { 
//       if (img instanceof File) formDataToSend.append("images", img); 
//     });

//     // Send existing image URLs so backend knows what to keep
//     const existingImages = previews.images.filter(img => typeof img === 'string' && img.startsWith('http'));
//     formDataToSend.append("existingImages", JSON.stringify(existingImages));

//     // Process Video
//     if (formData.video instanceof File) {
//       formDataToSend.append("video", formData.video);
//     } else if (previews.video?.startsWith('http')) {
//       formDataToSend.append("existingVideo", previews.video);
//     }

//     try {
//       const config = isEditMode ? SummaryApi.updateProduct(id) : SummaryApi.createProduct;
//       const res = await api({
//         url: config.url,
//         method: config.method,
//         data: formDataToSend,
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
//     <div className="pb-20 relative">
//       {/* PREVIEW MODAL */}
//       {previewModal.isOpen && (
//         <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
//           <button 
//             type="button"
//             onClick={() => setPreviewModal({isOpen: false, url: null, type: null})} 
//             className="absolute top-6 right-6 text-white text-4xl hover:text-red-500 z-50 transition-colors"
//           >
//             <FiX />
//           </button>
//           <div className="w-full max-w-5xl flex items-center justify-center">
//             {previewModal.type === 'video' ? (
//               <video 
//                 key={previewModal.url} // Key forces re-mount when URL changes
//                 src={previewModal.url} 
//                 controls 
//                 autoPlay 
//                 className="max-w-full max-h-[85vh] rounded-lg shadow-2xl" 
//               />
//             ) : (
//               <img 
//                 key={previewModal.url}
//                 src={previewModal.url} 
//                 alt="View" 
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
//               <input name="name" value={formData.name} onChange={handleChange} disabled={isViewMode} className={`w-full border p-3 rounded-xl mt-1 outline-none ${errors.name ? "border-red-500" : "focus:border-green-500"}`} />
//               {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600">Brand</label>
//               <input name="brand" value={formData.brand} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 outline-none" />
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600">Category *</label>
//               <select name="category" value={formData.category} onChange={handleChange} disabled={isViewMode} className={`w-full border p-3 rounded-xl mt-1 outline-none ${errors.category ? "border-red-500" : ""}`}>
//                 <option value="">Select</option>
//                 {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//               </select>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//             <div>
//               <label className="text-sm font-bold text-gray-600 flex items-center gap-1 mb-2"><FiAlignLeft className="text-green-500" /> Short Description *</label>
//               <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} disabled={isViewMode} className={`w-full border p-4 rounded-xl h-32 resize-none outline-none ${errors.shortDescription ? "border-red-500" : "focus:border-green-500"}`} />
//             </div>
//             <div>
//               <label className="text-sm font-bold text-gray-600 flex items-center gap-1 mb-2"><FiFileText className="text-green-500" /> Detailed Description</label>
//               <textarea name="detailDescription" value={formData.detailDescription} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-4 rounded-xl h-32 resize-none outline-none" />
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
//                 <button type="button" onClick={() => handleToggle(item)} className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${formData[item] ? "bg-green-600" : "bg-gray-300"}`}>
//                   <div className={`bg-white w-4 h-4 rounded-full shadow transform transition-all ${formData[item] ? "translate-x-6" : ""}`} />
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
//               <button type="button" onClick={() => setFormData(p => ({ ...p, variants: [...p.variants, initialVariant()] }))} className="bg-green-50 text-green-700 px-4 py-2 rounded-xl font-bold border border-green-200 hover:bg-green-100 flex items-center gap-1 transition-all"><FiPlus /> Add Variant</button>
//             )}
//           </div>
//           {formData.variants.map((variant, vIndex) => (
//             <div key={variant.id} className="bg-white p-6 rounded-3xl border shadow-sm relative overflow-hidden">
//               <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
//               {!isViewMode && formData.variants.length > 1 && (
//                 <button type="button" onClick={() => {
//                   const updated = [...formData.variants];
//                   updated.splice(vIndex, 1);
//                   setFormData({ ...formData, variants: updated });
//                 }} className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"><FiTrash2 size={20} /></button>
//               )}
//               <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
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
//                 {/* ADDED STOCK FIELD */}
//                 <div>
//                   <label className="text-[11px] font-bold text-gray-400 uppercase">Stock</label>
//                   <input type="number" className="w-full border border-gray-200 p-2 rounded-lg mt-1 outline-none focus:border-green-500" value={variant.stock} onChange={(e) => onVariantChange(vIndex, 'stock', e.target.value)} disabled={isViewMode} />
//                 </div>
//               </div>
              
//               <div className="mt-6 bg-gray-50/50 p-4 rounded-2xl border border-dashed">
//                 <div className="flex justify-between items-center mb-4">
//                   <p className="text-xs font-bold text-gray-500 uppercase">Extra Info</p>
//                   {!isViewMode && <button type="button" onClick={() => {
//                     const updated = [...formData.variants];
//                     updated[vIndex].additionalInfo.push({ key: "", value: "" });
//                     setFormData({ ...formData, variants: updated });
//                   }} className="text-[10px] font-bold text-green-600 bg-white px-3 py-1 rounded-full border border-green-100 shadow-sm transition-all hover:bg-green-50">+ Add Field</button>}
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {variant.additionalInfo.map((info, iIndex) => (
//                     <div key={iIndex} className="flex gap-2 items-center">
//                       <input placeholder="Key (e.g. Color)" className="flex-1 text-sm border p-2 rounded-lg outline-none focus:border-green-500" value={info.key} onChange={(e) => onInfoChange(vIndex, iIndex, 'key', e.target.value)} disabled={isViewMode} />
//                       <input placeholder="Value" className="flex-1 text-sm border p-2 rounded-lg outline-none focus:border-green-500" value={info.value} onChange={(e) => onInfoChange(vIndex, iIndex, 'value', e.target.value)} disabled={isViewMode} />
//                       {!isViewMode && <button type="button" onClick={() => {
//                         const updated = [...formData.variants];
//                         updated[vIndex].additionalInfo.splice(iIndex, 1);
//                         setFormData({ ...formData, variants: updated });
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
//                       <img src={preview} alt={`preview-${idx}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
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
//                   <video 
//                     key={previews.video} // Forces update when file changes
//                     src={previews.video} 
//                     className="w-full h-full object-cover" 
//                     muted 
//                     playsInline 
//                   />
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

// export default ProductForm;


// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { 
//   FiPlus, FiTrash2, FiUpload, FiVideo, FiInfo, 
//   FiPackage, FiLayers, FiEye, FiX, FiPlay, FiAlignLeft, FiFileText 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const ProductForm = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { pathname } = useLocation();
  
//   const prevPreviewsRef = useRef({ images: [], video: null });

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
//     additionalInfo: [{ key: "", value: "" }]
//   });

//   const [formData, setFormData] = useState({
//     name: "",
//     category: "",
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
//         url: SummaryApi.getOneProduct.url(id),
//         method: SummaryApi.getOneProduct.method
//       });

//       if (res.data.success) {
//         const p = res.data.data;
        
//         const mappedVariants = p.variants?.map(v => ({
//           ...v,
//           id: v._id || Date.now() + Math.random(),
//           additionalInfo: v.additionalInfo?.length ? v.additionalInfo : [{ key: "", value: "" }]
//         })) || [initialVariant()];

//         setFormData({
//           name: p.name || "",
//           category: p.category?._id || p.category || "",
//           brand: p.brand || "",
//           shortDescription: p.shortDescription || "",
//           detailDescription: p.detailDescription || "",
//           showOnWebsite: p.showOnWebsite ?? true,
//           newLaunch: p.newLaunch ?? false,
//           featuredProduct: p.featuredProduct ?? false,
//           images: Array(5).fill(null),
//           video: null,
//           variants: mappedVariants
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

//   // Cleanup Blob URLs
//   useEffect(() => {
//     const prev = prevPreviewsRef.current;
//     prev.images.forEach((url, index) => {
//       if (url && url.startsWith("blob:") && url !== previews.images[index]) {
//         URL.revokeObjectURL(url);
//       }
//     });
//     if (prev.video && prev.video.startsWith("blob:") && prev.video !== previews.video) {
//       URL.revokeObjectURL(prev.video);
//     }
//     prevPreviewsRef.current = previews;
//   }, [previews]);

//   // --- HANDLERS ---
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleToggle = (name) => {
//     if (isViewMode) return;
//     setFormData(prev => ({ ...prev, [name]: !prev[name] }));
//   };

//   const handleImageChange = (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;
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
//   };

//   const removeImage = (index) => {
//     setFormData(prev => {
//       const newImages = [...prev.images];
//       newImages[index] = "DELETE"; // Mark for deletion or null
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
//     const blobUrl = URL.createObjectURL(file);
//     setFormData(prev => ({ ...prev, video: file }));
//     setPreviews(prev => ({ ...prev, video: blobUrl }));
//   };

//   const onVariantChange = (index, field, value) => {
//     const updated = [...formData.variants];
//     updated[index][field] = value;
//     setFormData({ ...formData, variants: updated });
//   };

//   const onInfoChange = (vIndex, iIndex, field, value) => {
//     const updated = [...formData.variants];
//     updated[vIndex].additionalInfo[iIndex][field] = value;
//     setFormData({ ...formData, variants: updated });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const data = new FormData();

//     Object.keys(formData).forEach(key => {
//       if (!['variants', 'images', 'video'].includes(key)) {
//         data.append(key, formData[key]);
//       }
//     });

//     data.append("variants", JSON.stringify(formData.variants));
    
//     formData.images.forEach(img => { 
//       if (img instanceof File) data.append("images", img); 
//     });

//     const existingImages = previews.images.filter(img => typeof img === 'string' && img.startsWith('http'));
//     data.append("existingImages", JSON.stringify(existingImages));

//     if (formData.video instanceof File) {
//       data.append("video", formData.video);
//     } else if (previews.video?.startsWith('http')) {
//       data.append("existingVideo", previews.video);
//     }

//     try {
//       const config = isEditMode ? SummaryApi.updateProduct(id) : SummaryApi.createProduct;
//       const res = await api({
//         url: config.url,
//         method: config.method,
//         data: data,
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       if (res.data.success) {
//         toast.success(isEditMode ? "Product Updated" : "Product Created");
//         navigate("/admin-panel/product-list");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Operation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="pb-20 px-2 md:px-0">
//       {/* PREVIEW MODAL */}
//       {previewModal.isOpen && (
//         <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4">
//           <button onClick={() => setPreviewModal({isOpen: false})} className="absolute top-6 right-6 text-white text-3xl"><FiX /></button>
//           {previewModal.type === 'video' ? (
//             <video src={previewModal.url} controls autoPlay className="max-w-full max-h-[80vh] rounded-lg" />
//           ) : (
//             <img src={previewModal.url} alt="Preview" className="max-w-full max-h-[80vh] object-contain" />
//           )}
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 bg-white p-5 rounded-2xl shadow-sm border mt-4">
//         <h2 className="text-xl font-bold text-gray-800">
//           {isViewMode ? "View Product" : isEditMode ? "Edit Product" : "Create Product"}
//         </h2>
//         {!isViewMode && (
//           <button onClick={handleSubmit} disabled={loading} className="w-full md:w-auto bg-green-600 text-white px-8 py-2.5 rounded-full font-bold shadow-md hover:bg-green-700 disabled:opacity-50 transition-all">
//             {loading ? "Saving..." : "Save Product"}
//           </button>
//         )}
//       </div>

//       <div className="space-y-6">
//         {/* BASIC INFO */}
//         <div className="bg-white p-6 rounded-2xl border shadow-sm">
//           <h3 className="text-md font-bold text-gray-700 mb-4 flex items-center gap-2 border-b pb-3"><FiInfo className="text-green-500" /> Basic Details</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//             <div>
//               <label className="text-xs font-bold text-gray-500 uppercase">Product Name *</label>
//               <input name="name" value={formData.name} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-2.5 rounded-lg mt-1 outline-none focus:border-green-500" />
//             </div>
//             <div>
//               <label className="text-xs font-bold text-gray-500 uppercase">Brand</label>
//               <input name="brand" value={formData.brand} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-2.5 rounded-lg mt-1 outline-none focus:border-green-500" />
//             </div>
//             <div>
//               <label className="text-xs font-bold text-gray-500 uppercase">Category *</label>
//               <select name="category" value={formData.category} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-2.5 rounded-lg mt-1 outline-none focus:border-green-500">
//                 <option value="">Select Category</option>
//                 {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//               </select>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
//             <textarea name="shortDescription" placeholder="Short Description" value={formData.shortDescription} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl h-24 resize-none outline-none focus:border-green-500" />
//             <textarea name="detailDescription" placeholder="Detailed Description" value={formData.detailDescription} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl h-24 resize-none outline-none focus:border-green-500" />
//           </div>
//         </div>

//         {/* VISIBILITY SECTION - FIXED ALIGNMENT */}
//         <div className="bg-white p-6 rounded-2xl border shadow-sm">
//           <h3 className="text-md font-bold text-gray-700 mb-4 border-b pb-3 flex items-center gap-2"><FiLayers className="text-green-500" /> Visibility & Status</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {[
//               { label: "Show On Website", key: "showOnWebsite" },
//               { label: "New Launch", key: "newLaunch" },
//               { label: "Featured Product", key: "featuredProduct" }
//             ].map(item => (
//               <div key={item.key} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
//                 <span className="text-sm font-bold text-gray-600">{item.label}</span>
//                 <button type="button" onClick={() => handleToggle(item.key)} className={`w-11 h-6 flex items-center rounded-full px-1 transition-colors ${formData[item.key] ? "bg-green-500" : "bg-gray-300"}`}>
//                   <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${formData[item.key] ? "translate-x-5" : "translate-x-0"}`} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* VARIANTS SECTION - FIXED HORIZONTAL SCROLL */}
//         <div className="space-y-4">
//           <div className="flex justify-between items-center">
//             <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><FiPackage className="text-green-600" /> Variants</h3>
//             {!isViewMode && (
//               <button type="button" onClick={() => setFormData(p => ({ ...p, variants: [...p.variants, initialVariant()] }))} className="text-sm bg-green-50 text-green-700 px-4 py-2 rounded-lg font-bold border border-green-200 hover:bg-green-100 flex items-center gap-1 transition-all"><FiPlus /> Add Variant</button>
//             )}
//           </div>

//           {formData.variants.map((variant, vIndex) => (
//             <div key={variant.id} className="bg-white rounded-2xl border shadow-sm overflow-hidden">
//               <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
//                 <span className="text-xs font-bold text-gray-500">VARIANT #{vIndex + 1}</span>
//                 {!isViewMode && formData.variants.length > 1 && (
//                   <button onClick={() => {
//                     const updated = [...formData.variants];
//                     updated.splice(vIndex, 1);
//                     setFormData({ ...formData, variants: updated });
//                   }} className="text-red-400 hover:text-red-600"><FiTrash2 size={18} /></button>
//                 )}
//               </div>

//               {/* HORIZONTAL SCROLL CONTAINER */}
//               <div className="overflow-x-auto">
//                 <div className="p-5 flex gap-4 min-w-[900px]"> 
//                   <div className="flex-1 min-w-[180px]">
//                     <label className="text-[10px] font-bold text-gray-400 uppercase">SKU *</label>
//                     <input className="w-full border border-gray-200 p-2 rounded-lg mt-1 outline-none focus:border-green-500 text-sm" value={variant.sku} onChange={(e) => onVariantChange(vIndex, 'sku', e.target.value)} disabled={isViewMode} />
//                   </div>
//                   <div className="w-24">
//                     <label className="text-[10px] font-bold text-gray-400 uppercase">Capacity</label>
//                     <input className="w-full border border-gray-200 p-2 rounded-lg mt-1 outline-none focus:border-green-500 text-sm" value={variant.capacity} onChange={(e) => onVariantChange(vIndex, 'capacity', e.target.value)} disabled={isViewMode} />
//                   </div>
//                   <div className="w-24">
//                     <label className="text-[10px] font-bold text-gray-400 uppercase">Unit</label>
//                     <select className="w-full border border-gray-200 p-2 rounded-lg mt-1 outline-none focus:border-green-500 text-sm" value={variant.unit} onChange={(e) => onVariantChange(vIndex, 'unit', e.target.value)} disabled={isViewMode}>
//                       <option value="ml">ml</option><option value="liter">liter</option><option value="kg">kg</option><option value="unit">Unit</option>
//                     </select>
//                   </div>
//                   <div className="w-32">
//                     <label className="text-[10px] font-bold text-gray-400 uppercase">MRP *</label>
//                     <input type="number" className="w-full border border-gray-200 p-2 rounded-lg mt-1 outline-none focus:border-green-500 text-sm" value={variant.mrp} onChange={(e) => onVariantChange(vIndex, 'mrp', e.target.value)} disabled={isViewMode} />
//                   </div>
//                   <div className="w-32">
//                     <label className="text-[10px] font-bold text-gray-400 uppercase">Price *</label>
//                     <input type="number" className="w-full border border-gray-200 p-2 rounded-lg mt-1 outline-none focus:border-green-500 text-sm" value={variant.price} onChange={(e) => onVariantChange(vIndex, 'price', e.target.value)} disabled={isViewMode} />
//                   </div>
//                   <div className="w-24">
//                     <label className="text-[10px] font-bold text-gray-400 uppercase">Stock</label>
//                     <input type="number" className="w-full border border-gray-200 p-2 rounded-lg mt-1 outline-none focus:border-green-500 text-sm" value={variant.stock} onChange={(e) => onVariantChange(vIndex, 'stock', e.target.value)} disabled={isViewMode} />
//                   </div>
//                 </div>
//               </div>
              
//               {/* EXTRA INFO - FIXED RESPONSIVENESS */}
//               <div className="px-5 pb-5">
//                 <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-200">
//                   <div className="flex justify-between items-center mb-3">
//                     <p className="text-[10px] font-bold text-gray-400 uppercase">Extra Specifications</p>
//                     {!isViewMode && <button type="button" onClick={() => {
//                       const updated = [...formData.variants];
//                       updated[vIndex].additionalInfo.push({ key: "", value: "" });
//                       setFormData({ ...formData, variants: updated });
//                     }} className="text-[10px] font-bold text-green-600 bg-white px-3 py-1 rounded-lg border border-green-100 shadow-sm hover:bg-green-50">+ Add Field</button>}
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     {variant.additionalInfo.map((info, iIndex) => (
//                       <div key={iIndex} className="flex gap-2 items-center bg-white p-1.5 rounded-lg border border-gray-100 shadow-sm">
//                         <input placeholder="Key" className="w-1/3 text-xs border-none outline-none focus:ring-0 p-1" value={info.key} onChange={(e) => onInfoChange(vIndex, iIndex, 'key', e.target.value)} disabled={isViewMode} />
//                         <div className="h-4 w-[1px] bg-gray-200" />
//                         <input placeholder="Value" className="flex-1 text-xs border-none outline-none focus:ring-0 p-1 min-w-0" value={info.value} onChange={(e) => onInfoChange(vIndex, iIndex, 'value', e.target.value)} disabled={isViewMode} />
//                         {!isViewMode && <button type="button" onClick={() => {
//                           const updated = [...formData.variants];
//                           updated[vIndex].additionalInfo.splice(iIndex, 1);
//                           setFormData({ ...formData, variants: updated });
//                         }} className="text-red-300 hover:text-red-500 px-1"><FiX size={14} /></button>}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* MEDIA SECTION */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="md:col-span-2 bg-white p-6 rounded-2xl border shadow-sm">
//             <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2 border-b pb-3"><FiUpload className="text-green-500" /> Product Images</h3>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
//               {previews.images.map((preview, idx) => (
//                 <div key={idx} className="relative aspect-square border-2 border-dashed border-gray-200 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center group">
//                   {preview ? (
//                     <>
//                       <img src={preview} alt="product" className="w-full h-full object-cover" />
//                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
//                         <button onClick={() => setPreviewModal({ isOpen: true, url: preview, type: 'image' })} className="p-1.5 bg-white rounded-full text-blue-600 shadow-md"><FiEye size={14}/></button>
//                         {!isViewMode && <button onClick={() => removeImage(idx)} className="p-1.5 bg-white rounded-full text-red-600 shadow-md"><FiTrash2 size={14}/></button>}
//                       </div>
//                     </>
//                   ) : (
//                     !isViewMode && (
//                       <label className="cursor-pointer flex flex-col items-center">
//                         <FiPlus className="text-gray-300" size={20} />
//                         <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, idx)} />
//                       </label>
//                     )
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-2xl border shadow-sm">
//             <h3 className="font-bold text-gray-700 mb-4 border-b pb-3 flex items-center gap-2"><FiVideo className="text-green-500" /> Product Video</h3>
//             <div className="relative aspect-video border-2 border-dashed border-gray-200 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center group">
//               {previews.video ? (
//                 <>
//                   <video src={previews.video} className="w-full h-full object-cover" muted />
//                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
//                     <button onClick={() => setPreviewModal({ isOpen: true, url: previews.video, type: 'video' })} className="p-2 bg-white rounded-full text-blue-600"><FiPlay /></button>
//                     {!isViewMode && <button onClick={() => setFormData(p => ({...p, video: null})) || setPreviews(p => ({...p, video: null}))} className="p-2 bg-white rounded-full text-red-600"><FiTrash2 /></button>}
//                   </div>
//                 </>
//               ) : (
//                 !isViewMode && (
//                   <label className="cursor-pointer flex flex-col items-center">
//                     <FiPlus className="text-gray-300" size={24} />
//                     <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Upload Video</span>
//                     <input type="file" hidden accept="video/*" onChange={handleVideoChange} />
//                   </label>
//                 )
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductForm;


// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { 
//   FiPlus, FiTrash2, FiUpload, FiVideo, FiInfo, 
//   FiPackage, FiLayers, FiEye, FiX, FiPlay, FiAlignLeft, FiFileText 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const ProductForm = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { pathname } = useLocation();
  
//   const prevPreviewsRef = useRef({ images: [], video: null });

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
//     additionalInfo: [{ key: "", value: "" }]
//   });

//   const [formData, setFormData] = useState({
//     name: "",
//     category: "",
//     brand: "",
//     shortDescription: "",
//     detailDescription: "",
//     showOnWebsite: true,
//     newLaunch: false,
//     featuredProduct: false,
//     images: Array(5).fill(null), // File objects
//     video: null,                 // File object
//     variants: [initialVariant()]
//   });

//   const [previews, setPreviews] = useState({
//     images: Array(5).fill(null), // URL strings (blob or http)
//     video: null
//   });

//   // --- VALIDATION LOGIC ---
//   const validate = () => {
//     const newErrors = {};

//     // Basic Info Validation
//     if (!formData.name?.trim()) newErrors.name = "Product name is required";
//     if (!formData.category) newErrors.category = "Please select a category";
//     if (!formData.shortDescription?.trim()) newErrors.shortDescription = "Short description is required";

//     // Media Validation
//     const hasImage = previews.images.some(img => img !== null);
//     if (!hasImage) newErrors.images = "At least one product image is required";

//     // Variant Validation
//     const variantErrors = [];
//     formData.variants.forEach((v, index) => {
//       const vErr = {};
//       if (!v.sku?.trim()) vErr.sku = "Required";
//       if (!v.mrp || Number(v.mrp) <= 0) vErr.mrp = "Invalid";
//       if (!v.price || Number(v.price) <= 0) vErr.price = "Invalid";
//       if (Number(v.price) > Number(v.mrp)) vErr.price = "Price > MRP";
//       if (Object.keys(vErr).length > 0) variantErrors[index] = vErr;
//     });

//     if (variantErrors.length > 0) newErrors.variants = variantErrors;

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // --- DATA FETCHING ---
//   const fetchCategories = useCallback(async () => {
//     try {
//       const res = await api({
//         url: SummaryApi.getAllCategories.url,
//         method: SummaryApi.getAllCategories.method
//       });
//       if (res.data.success) setCategories(res.data.data);
//     } catch (err) {
//       toast.error("Failed to load categories");
//     }
//   }, []);

//   const fetchProductDetails = useCallback(async () => {
//     if (!id) return;
//     setLoading(true);
//     try {
//       const res = await api({
//         url: SummaryApi.getOneProduct.url(id),
//         method: SummaryApi.getOneProduct.method
//       });

//       if (res.data.success) {
//         const p = res.data.data;
        
//         const mappedVariants = p.variants?.map(v => ({
//           ...v,
//           id: v._id || Date.now() + Math.random(),
//           additionalInfo: v.additionalInfo?.length ? v.additionalInfo : [{ key: "", value: "" }]
//         })) || [initialVariant()];

//         setFormData({
//           name: p.name || "",
//           category: p.category?._id || p.category || "",
//           brand: p.brand || "",
//           shortDescription: p.shortDescription || "",
//           detailDescription: p.detailDescription || "",
//           showOnWebsite: p.showOnWebsite ?? true,
//           newLaunch: p.newLaunch ?? false,
//           featuredProduct: p.featuredProduct ?? false,
//           images: Array(5).fill(null),
//           video: null,
//           variants: mappedVariants
//         });
        
//         const newPreviews = Array(5).fill(null);
//         (p.images || []).forEach((url, i) => { if(i < 5) newPreviews[i] = url; });
        
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

//   // Cleanup Blob URLs
//   useEffect(() => {
//     const prev = prevPreviewsRef.current;
//     prev.images.forEach((url, index) => {
//       if (url?.startsWith("blob:") && url !== previews.images[index]) {
//         URL.revokeObjectURL(url);
//       }
//     });
//     if (prev.video?.startsWith("blob:") && prev.video !== previews.video) {
//       URL.revokeObjectURL(prev.video);
//     }
//     prevPreviewsRef.current = previews;
//   }, [previews]);

//   // --- HANDLERS ---
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
//   };

//   const handleToggle = (name) => {
//     if (isViewMode) return;
//     setFormData(prev => ({ ...prev, [name]: !prev[name] }));
//   };

//   const handleImageChange = (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;
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
//     const blobUrl = URL.createObjectURL(file);
//     setFormData(prev => ({ ...prev, video: file }));
//     setPreviews(prev => ({ ...prev, video: blobUrl }));
//   };

//   const onVariantChange = (index, field, value) => {
//     const updated = [...formData.variants];
//     updated[index][field] = value;
//     setFormData({ ...formData, variants: updated });
//     // Clear variant error if exists
//     if (errors.variants?.[index]?.[field]) {
//       const newVarErrors = [...errors.variants];
//       delete newVarErrors[index][field];
//       setErrors(prev => ({ ...prev, variants: newVarErrors }));
//     }
//   };

//   const onInfoChange = (vIndex, iIndex, field, value) => {
//     const updated = [...formData.variants];
//     updated[vIndex].additionalInfo[iIndex][field] = value;
//     setFormData({ ...formData, variants: updated });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) {
//       toast.error("Please fix the errors in the form");
//       return;
//     }

//     setLoading(true);
//     const data = new FormData();

//     // Append base fields
//     Object.keys(formData).forEach(key => {
//       if (!['variants', 'images', 'video'].includes(key)) {
//         data.append(key, formData[key]);
//       }
//     });

//     data.append("variants", JSON.stringify(formData.variants));
    
//     // Append new image files
//     formData.images.forEach(img => { 
//       if (img instanceof File) data.append("images", img); 
//     });

//     // Track existing images to keep
//     const existingImages = previews.images.filter(img => typeof img === 'string' && img.startsWith('http'));
//     data.append("existingImages", JSON.stringify(existingImages));

//     // Handle Video
//     if (formData.video instanceof File) {
//       data.append("video", formData.video);
//     } else if (previews.video?.startsWith('http')) {
//       data.append("existingVideo", previews.video);
//     }

//     try {
//       const config = isEditMode ? SummaryApi.updateProduct(id) : SummaryApi.createProduct;
//       const res = await api({
//         url: config.url,
//         method: config.method,
//         data: data,
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       if (res.data.success) {
//         toast.success(isEditMode ? "Product updated successfully" : "Product created successfully");
//         navigate("/admin-panel/product-list");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Operation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="pb-20 px-4 md:px-0 max-w-7xl mx-auto">
//       {/* PREVIEW MODAL */}
//       {previewModal.isOpen && (
//         <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4">
//           <button onClick={() => setPreviewModal({isOpen: false})} className="absolute top-6 right-6 text-white text-4xl hover:text-red-500 transition-colors"><FiX /></button>
//           {previewModal.type === 'video' ? (
//             <video src={previewModal.url} controls autoPlay className="max-w-full max-h-[85vh] rounded-xl shadow-2xl" />
//           ) : (
//             <img src={previewModal.url} alt="Preview" className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl" />
//           )}
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-6 rounded-3xl shadow-sm border mt-4">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">
//             {isViewMode ? "View Product Details" : isEditMode ? "Edit Product" : "Add New Product"}
//           </h2>
//           <p className="text-sm text-gray-400 font-medium">Manage your store inventory</p>
//         </div>
//         {!isViewMode && (
//           <button onClick={handleSubmit} disabled={loading} className="w-full md:w-auto bg-green-600 text-white px-12 py-3 rounded-full font-bold shadow-lg hover:bg-green-700 active:scale-95 disabled:opacity-50 transition-all">
//             {loading ? "Processing..." : "Save Product"}
//           </button>
//         )}
//       </div>

//       <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
//         {/* BASIC INFORMATION */}
//         <div className="bg-white p-8 rounded-3xl border shadow-sm">
//           <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4"><FiInfo className="text-green-500" /> Basic Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="md:col-span-1">
//               <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Product Name *</label>
//               <input name="name" value={formData.name} onChange={handleChange} disabled={isViewMode} className={`w-full border p-3 rounded-xl mt-1 outline-none transition-all ${errors.name ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-green-500"}`} />
//               {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.name}</p>}
//             </div>
//             <div>
//               <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Brand / Manufacturer</label>
//               <input name="brand" value={formData.brand} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 outline-none focus:border-green-500" />
//             </div>
//             <div>
//               <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category *</label>
//               <select name="category" value={formData.category} onChange={handleChange} disabled={isViewMode} className={`w-full border p-3 rounded-xl mt-1 outline-none ${errors.category ? "border-red-500" : "border-gray-200 focus:border-green-500"}`}>
//                 <option value="">Choose Category</option>
//                 {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//               </select>
//               {errors.category && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.category}</p>}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//             <div>
//               <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-2"><FiAlignLeft className="text-green-500" /> Short Description *</label>
//               <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} disabled={isViewMode} className={`w-full border p-4 rounded-2xl h-32 resize-none outline-none ${errors.shortDescription ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-green-500"}`} />
//               {errors.shortDescription && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.shortDescription}</p>}
//             </div>
//             <div>
//               <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-2"><FiFileText className="text-green-500" /> Detailed Description</label>
//               <textarea name="detailDescription" value={formData.detailDescription} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-4 rounded-2xl h-32 resize-none outline-none focus:border-green-500" />
//             </div>
//           </div>
//         </div>

//         {/* VISIBILITY SECTION - FIXED ALIGNMENT */}
//         <div className="bg-white p-8 rounded-3xl border shadow-sm">
//           <h3 className="text-lg font-bold text-gray-700 mb-6 border-b pb-4 flex items-center gap-2"><FiLayers className="text-green-500" /> Visibility Settings</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[
//               { label: "Show On Website", key: "showOnWebsite" },
//               { label: "New Launch", key: "newLaunch" },
//               { label: "Featured Product", key: "featuredProduct" }
//             ].map(item => (
//               <div key={item.key} className="flex justify-between items-center bg-gray-50 p-5 rounded-2xl border border-gray-100">
//                 <span className="text-sm font-bold text-gray-700">{item.label}</span>
//                 <button type="button" onClick={() => handleToggle(item.key)} className={`w-12 h-6 flex items-center rounded-full px-1 transition-all duration-300 ${formData[item.key] ? "bg-green-600" : "bg-gray-300"}`}>
//                   <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all ${formData[item.key] ? "translate-x-6" : "translate-x-0"}`} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* VARIANTS - FIXED HORIZONTAL SCROLL & MIN-WIDTH */}
//         <div className="space-y-6">
//           <div className="flex justify-between items-center px-2">
//             <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><FiPackage className="text-green-600" /> Product Variants</h3>
//             {!isViewMode && (
//               <button type="button" onClick={() => setFormData(p => ({ ...p, variants: [...p.variants, initialVariant()] }))} className="text-sm bg-green-50 text-green-700 px-5 py-2.5 rounded-xl font-bold border border-green-200 hover:bg-green-100 flex items-center gap-2 transition-all shadow-sm"><FiPlus /> Add New Variant</button>
//             )}
//           </div>

//           {formData.variants.map((variant, vIndex) => (
//             <div key={variant.id} className="bg-white rounded-3xl border shadow-sm overflow-hidden transition-all hover:shadow-md">
//               <div className="p-4 bg-gray-50/80 border-b flex justify-between items-center px-6">
//                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pricing & Inventory #{vIndex + 1}</span>
//                 {!isViewMode && formData.variants.length > 1 && (
//                   <button onClick={() => {
//                     const updated = [...formData.variants];
//                     updated.splice(vIndex, 1);
//                     setFormData({ ...formData, variants: updated });
//                   }} className="text-red-400 hover:text-red-600 transition-colors bg-white p-1.5 rounded-full border shadow-sm"><FiTrash2 size={16} /></button>
//                 )}
//               </div>

//               {/* HORIZONTAL SCROLL AREA */}
//               <div className="overflow-x-auto">
//                 <div className="p-6 flex gap-6 min-w-[1000px]"> 
//                   <div className="flex-1 min-w-[200px]">
//                     <label className="text-[10px] font-bold text-gray-400 uppercase">SKU ID *</label>
//                     <input className={`w-full border p-2.5 rounded-xl mt-1 outline-none text-sm font-medium ${errors.variants?.[vIndex]?.sku ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-green-500"}`} value={variant.sku} onChange={(e) => onVariantChange(vIndex, 'sku', e.target.value)} disabled={isViewMode} />
//                   </div>
//                   <div className="w-28">
//                     <label className="text-[10px] font-bold text-gray-400 uppercase">Capacity</label>
//                     <input className="w-full border border-gray-200 p-2.5 rounded-xl mt-1 outline-none focus:border-green-500 text-sm font-medium" value={variant.capacity} onChange={(e) => onVariantChange(vIndex, 'capacity', e.target.value)} disabled={isViewMode} />
//                   </div>
//                   <div className="w-28">
//                     <label className="text-[10px] font-bold text-gray-400 uppercase">Unit</label>
//                     <select className="w-full border border-gray-200 p-2.5 rounded-xl mt-1 outline-none focus:border-green-500 text-sm font-bold" value={variant.unit} onChange={(e) => onVariantChange(vIndex, 'unit', e.target.value)} disabled={isViewMode}>
//                       <option value="ml">ml</option><option value="liter">liter</option><option value="kg">kg</option><option value="unit">Unit</option>
//                     </select>
//                   </div>
//                   <div className="w-36">
//                     <label className="text-[10px] font-bold text-gray-400 uppercase">MRP Price *</label>
//                     <input type="number" className={`w-full border p-2.5 rounded-xl mt-1 outline-none text-sm font-bold ${errors.variants?.[vIndex]?.mrp ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-green-500"}`} value={variant.mrp} onChange={(e) => onVariantChange(vIndex, 'mrp', e.target.value)} disabled={isViewMode} />
//                   </div>
//                   <div className="w-36">
//                     <label className="text-[10px] font-bold text-gray-400 uppercase">Selling Price *</label>
//                     <input type="number" className={`w-full border p-2.5 rounded-xl mt-1 outline-none text-sm font-bold ${errors.variants?.[vIndex]?.price ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-green-500"}`} value={variant.price} onChange={(e) => onVariantChange(vIndex, 'price', e.target.value)} disabled={isViewMode} />
//                   </div>
//                   <div className="w-28">
//                     <label className="text-[10px] font-bold text-gray-400 uppercase">Stock Qty</label>
//                     <input type="number" className="w-full border border-gray-200 p-2.5 rounded-xl mt-1 outline-none focus:border-green-500 text-sm font-bold" value={variant.stock} onChange={(e) => onVariantChange(vIndex, 'stock', e.target.value)} disabled={isViewMode} />
//                   </div>
//                 </div>
//               </div>
              
//               {/* EXTRA INFO - RESPONSIVE VALUE BOXES */}
//               <div className="px-6 pb-6">
//                 <div className="bg-gray-50/50 p-5 rounded-2xl border border-dashed border-gray-200">
//                   <div className="flex justify-between items-center mb-4">
//                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Additional Specifications</p>
//                     {!isViewMode && <button type="button" onClick={() => {
//                       const updated = [...formData.variants];
//                       updated[vIndex].additionalInfo.push({ key: "", value: "" });
//                       setFormData({ ...formData, variants: updated });
//                     }} className="text-[10px] font-bold text-green-600 bg-white px-4 py-1.5 rounded-full border border-green-100 shadow-sm hover:bg-green-50 transition-colors">+ Add Custom Field</button>}
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {variant.additionalInfo.map((info, iIndex) => (
//                       <div key={iIndex} className="flex gap-2 items-center bg-white p-2 rounded-xl border border-gray-100 shadow-sm transition-all focus-within:ring-1 focus-within:ring-green-200">
//                         <input placeholder="Key (e.g. Color)" className="w-1/3 text-xs border-none outline-none focus:ring-0 px-2 py-1 font-semibold" value={info.key} onChange={(e) => onInfoChange(vIndex, iIndex, 'key', e.target.value)} disabled={isViewMode} />
//                         <div className="h-4 w-[1px] bg-gray-200" />
//                         <input placeholder="Value" className="flex-1 text-xs border-none outline-none focus:ring-0 px-2 py-1 min-w-0" value={info.value} onChange={(e) => onInfoChange(vIndex, iIndex, 'value', e.target.value)} disabled={isViewMode} />
//                         {!isViewMode && <button type="button" onClick={() => {
//                           const updated = [...formData.variants];
//                           updated[vIndex].additionalInfo.splice(iIndex, 1);
//                           setFormData({ ...formData, variants: updated });
//                         }} className="text-red-300 hover:text-red-500 px-2"><FiX size={16} /></button>}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* MEDIA MANAGEMENT */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="md:col-span-2 bg-white p-8 rounded-3xl border shadow-sm">
//             <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//               <FiUpload className="text-green-500" /> Product Images 
//               {errors.images && <span className="text-red-500 text-[10px] ml-2">({errors.images})</span>}
//             </h3>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
//               {previews.images.map((preview, idx) => (
//                 <div key={idx} className={`relative aspect-square border-2 border-dashed rounded-2xl overflow-hidden flex items-center justify-center transition-all group ${preview ? "border-solid border-gray-100" : (errors.images ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-gray-50")}`}>
//                   {preview ? (
//                     <>
//                       <img src={preview} alt="upload" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
//                       <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
//                         <button type="button" onClick={() => setPreviewModal({ isOpen: true, url: preview, type: 'image' })} className="p-2 bg-white rounded-full text-blue-600 shadow-xl hover:scale-110 transition-transform"><FiEye size={16}/></button>
//                         {!isViewMode && <button type="button" onClick={() => removeImage(idx)} className="p-2 bg-white rounded-full text-red-600 shadow-xl hover:scale-110 transition-transform"><FiTrash2 size={16}/></button>}
//                       </div>
//                     </>
//                   ) : (
//                     !isViewMode && (
//                       <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full hover:bg-gray-100 transition-colors">
//                         <FiPlus className="text-gray-300" size={24} />
//                         <span className="text-[9px] font-bold text-gray-400 mt-1">ADD IMAGE</span>
//                         <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, idx)} />
//                       </label>
//                     )
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white p-8 rounded-3xl border shadow-sm">
//             <h3 className="font-bold text-gray-700 mb-6 border-b pb-4 flex items-center gap-2"><FiVideo className="text-green-500" /> Promotional Video</h3>
//             <div className={`relative aspect-video border-2 border-dashed rounded-2xl overflow-hidden flex items-center justify-center transition-all group ${previews.video ? "border-solid border-gray-100" : "border-gray-200 bg-gray-50"}`}>
//               {previews.video ? (
//                 <>
//                   <video src={previews.video} className="w-full h-full object-cover" muted />
//                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity duration-300">
//                     <button type="button" onClick={() => setPreviewModal({ isOpen: true, url: previews.video, type: 'video' })} className="p-3 bg-white rounded-full text-blue-600 shadow-xl hover:scale-110 transition-transform"><FiPlay size={20}/></button>
//                     {!isViewMode && <button type="button" onClick={() => { setFormData(p => ({...p, video: null})); setPreviews(p => ({...p, video: null})); }} className="p-3 bg-white rounded-full text-red-600 shadow-xl hover:scale-110 transition-transform"><FiTrash2 size={20}/></button>}
//                   </div>
//                 </>
//               ) : (
//                 !isViewMode && (
//                   <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full hover:bg-gray-100 transition-colors">
//                     <FiPlus className="text-gray-300" size={32} />
//                     <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase">Upload MP4</span>
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

// export default ProductForm;

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { 
//   FiPlus, FiTrash2, FiUpload, FiInfo, 
//   FiPackage, FiLayers, FiEye, FiX, FiAlignLeft, FiFileText 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const ProductForm = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { pathname } = useLocation();
  
//   const prevPreviewsRef = useRef({ images: [] });

//   const isViewMode = pathname.includes("view-product");
//   const isEditMode = !!id && !isViewMode;

//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [previewModal, setPreviewModal] = useState({ isOpen: false, url: null });

//   // --- INITIAL STATE ---
//   const initialVariant = () => ({
//     id: Date.now() + Math.random(),
//     sku: "",
//     capacity: "",
//     unit: "kg",
//     mrp: "",
//     price: "",
//     stock: "0",
//     additionalInfo: [{ key: "", value: "" }]
//   });

//   const [formData, setFormData] = useState({
//     name: "",
//     category: "",
//     brand: "",
//     shortDescription: "",
//     detailDescription: "",
//     showOnWebsite: true,
//     newLaunch: false,
//     featuredProduct: false,
//     images: Array(5).fill(null), // File objects for upload
//     variants: [initialVariant()]
//   });

//   const [previews, setPreviews] = useState({
//     images: Array(5).fill(null) // URL strings for display
//   });

//   // --- VALIDATION LOGIC ---
//   const validate = () => {
//     const newErrors = {};

//     if (!formData.name?.trim()) newErrors.name = "Product name is required";
//     if (!formData.category) newErrors.category = "Please select a category";
//     if (!formData.shortDescription?.trim()) newErrors.shortDescription = "Short description is required";

//     const hasImage = previews.images.some(img => img !== null);
//     if (!hasImage) newErrors.images = "At least one product image is required";

//     const variantErrors = [];
//     formData.variants.forEach((v, index) => {
//       const vErr = {};
//       if (!v.sku?.trim()) vErr.sku = "Required";
//       if (!v.mrp || Number(v.mrp) <= 0) vErr.mrp = "Invalid";
//       if (!v.price || Number(v.price) <= 0) vErr.price = "Invalid";
//       if (Number(v.price) > Number(v.mrp)) vErr.price = "Price > MRP";
//       if (Object.keys(vErr).length > 0) variantErrors[index] = vErr;
//     });

//     if (variantErrors.length > 0) newErrors.variants = variantErrors;

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // --- DATA FETCHING ---
//   const fetchCategories = useCallback(async () => {
//     try {
//       const res = await api({
//         url: SummaryApi.getAllCategories.url,
//         method: SummaryApi.getAllCategories.method
//       });
//       if (res.data.success) setCategories(res.data.data);
//     } catch (err) {
//       toast.error("Failed to load categories");
//     }
//   }, []);

//   const fetchProductDetails = useCallback(async () => {
//     if (!id) return;
//     setLoading(true);
//     try {
//       const res = await api({
//         url: SummaryApi.getOneProduct.url(id),
//         method: SummaryApi.getOneProduct.method
//       });

//       if (res.data.success) {
//         const p = res.data.data;
        
//         const mappedVariants = p.variants?.map(v => ({
//           ...v,
//           id: v._id || Date.now() + Math.random(),
//           additionalInfo: v.additionalInfo?.length ? v.additionalInfo : [{ key: "", value: "" }]
//         })) || [initialVariant()];

//         setFormData({
//           name: p.name || "",
//           category: p.category?._id || p.category || "",
//           brand: p.brand || "",
//           shortDescription: p.shortDescription || "",
//           detailDescription: p.detailDescription || "",
//           showOnWebsite: p.showOnWebsite ?? true,
//           newLaunch: p.newLaunch ?? false,
//           featuredProduct: p.featuredProduct ?? false,
//           images: Array(5).fill(null),
//           variants: mappedVariants
//         });
        
//         const newPreviews = Array(5).fill(null);
//         (p.images || []).forEach((url, i) => { if(i < 5) newPreviews[i] = url; });
        
//         setPreviews({ images: newPreviews });
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

//   // Cleanup Blob URLs
//   useEffect(() => {
//     const prev = prevPreviewsRef.current;
//     prev.images.forEach((url, index) => {
//       if (url?.startsWith("blob:") && url !== previews.images[index]) {
//         URL.revokeObjectURL(url);
//       }
//     });
//     prevPreviewsRef.current = previews;
//   }, [previews]);

//   // --- HANDLERS ---
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
//   };

//   const handleToggle = (name) => {
//     if (isViewMode) return;
//     setFormData(prev => ({ ...prev, [name]: !prev[name] }));
//   };

//   const handleImageChange = (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;
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

//   const onVariantChange = (index, field, value) => {
//     const updated = [...formData.variants];
//     updated[index][field] = value;
//     setFormData({ ...formData, variants: updated });
//     if (errors.variants?.[index]?.[field]) {
//       const newVarErrors = [...errors.variants];
//       delete newVarErrors[index][field];
//       setErrors(prev => ({ ...prev, variants: newVarErrors }));
//     }
//   };

//   const onInfoChange = (vIndex, iIndex, field, value) => {
//     const updated = [...formData.variants];
//     updated[vIndex].additionalInfo[iIndex][field] = value;
//     setFormData({ ...formData, variants: updated });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) {
//       toast.error("Please fill all required fields correctly");
//       return;
//     }

//     setLoading(true);
//     const data = new FormData();

//     Object.keys(formData).forEach(key => {
//       if (!['variants', 'images'].includes(key)) {
//         data.append(key, formData[key]);
//       }
//     });

//     data.append("variants", JSON.stringify(formData.variants));
    
//     formData.images.forEach(img => { 
//       if (img instanceof File) data.append("images", img); 
//     });

//     const existingImages = previews.images.filter(img => typeof img === 'string' && img.startsWith('http'));
//     data.append("existingImages", JSON.stringify(existingImages));

//     try {
//       const config = isEditMode ? SummaryApi.updateProduct(id) : SummaryApi.createProduct;
//       const res = await api({
//         url: config.url,
//         method: config.method,
//         data: data,
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       if (res.data.success) {
//         toast.success(isEditMode ? "Product updated" : "Product created");
//         navigate("/admin-panel/product-list");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Operation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="pb-20 max-w-7xl mx-auto px-4 md:px-0">
//       {/* IMAGE PREVIEW MODAL */}
//       {previewModal.isOpen && (
//         <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4">
//           <button onClick={() => setPreviewModal({isOpen: false, url: null})} className="absolute top-6 right-6 text-white text-4xl hover:text-red-500 transition-colors"><FiX /></button>
//           <img src={previewModal.url} alt="Full View" className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl" />
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-6 rounded-3xl shadow-sm border mt-4">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">
//             {isViewMode ? "View Product" : isEditMode ? "Edit Product" : "Add Product"}
//           </h2>
//         </div>
//         {!isViewMode && (
//           <button onClick={handleSubmit} disabled={loading} className="w-full md:w-auto bg-green-600 text-white px-12 py-3 rounded-full font-bold shadow-lg hover:bg-green-700 active:scale-95 disabled:opacity-50 transition-all">
//             {loading ? "Processing..." : "Save Product"}
//           </button>
//         )}
//       </div>

//       <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        
//         {/* BASIC INFORMATION */}
//         <div className="bg-white p-8 rounded-3xl border shadow-sm">
//           <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4"><FiInfo className="text-green-500" /> Basic Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="md:col-span-1">
//               <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Product Name *</label>
//               <input name="name" value={formData.name} onChange={handleChange} disabled={isViewMode} className={`w-full border p-3 rounded-xl mt-1 outline-none transition-all ${errors.name ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-green-500"}`} />
//               {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.name}</p>}
//             </div>
//             <div>
//               <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Brand</label>
//               <input name="brand" value={formData.brand} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 outline-none focus:border-green-500" />
//             </div>
//             <div>
//               <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category *</label>
//               <select name="category" value={formData.category} onChange={handleChange} disabled={isViewMode} className={`w-full border p-3 rounded-xl mt-1 outline-none ${errors.category ? "border-red-500" : "border-gray-200 focus:border-green-500"}`}>
//                 <option value="">Select Category</option>
//                 {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
//               </select>
//               {errors.category && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.category}</p>}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//             <div>
//               <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-2"><FiAlignLeft className="text-green-500" /> Short Description *</label>
//               <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} disabled={isViewMode} className={`w-full border p-4 rounded-2xl h-32 resize-none outline-none ${errors.shortDescription ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-green-500"}`} />
//               {errors.shortDescription && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.shortDescription}</p>}
//             </div>
//             <div>
//               <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-2"><FiFileText className="text-green-500" /> Detailed Description</label>
//               <textarea name="detailDescription" value={formData.detailDescription} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-4 rounded-2xl h-32 resize-none outline-none focus:border-green-500" />
//             </div>
//           </div>
//         </div>

//         {/* VISIBILITY */}
//         <div className="bg-white p-8 rounded-3xl border shadow-sm">
//           <h3 className="text-lg font-bold text-gray-700 mb-6 border-b pb-4 flex items-center gap-2"><FiLayers className="text-green-500" /> Visibility</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[
//               { label: "Show On Website", key: "showOnWebsite" },
//               { label: "New Launch", key: "newLaunch" },
//               { label: "Featured Product", key: "featuredProduct" }
//             ].map(item => (
//               <div key={item.key} className="flex justify-between items-center bg-gray-50 p-5 rounded-2xl border border-gray-100">
//                 <span className="text-sm font-bold text-gray-700">{item.label}</span>
//                 <button type="button" onClick={() => handleToggle(item.key)} className={`w-12 h-6 flex items-center rounded-full px-1 transition-all duration-300 ${formData[item.key] ? "bg-green-600" : "bg-gray-300"}`}>
//                   <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all ${formData[item.key] ? "translate-x-6" : "translate-x-0"}`} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* VARIANTS - HORIZONTAL SCROLL ENABLED */}
//         <div className="space-y-6">
//           <div className="flex justify-between items-center px-2">
//             <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><FiPackage className="text-green-600" /> Variants</h3>
//             {!isViewMode && (
//               <button type="button" onClick={() => setFormData(p => ({ ...p, variants: [...p.variants, initialVariant()] }))} className="text-sm bg-green-50 text-green-700 px-5 py-2.5 rounded-xl font-bold border border-green-200 hover:bg-green-100 flex items-center gap-2 transition-all shadow-sm"><FiPlus /> Add Variant</button>
//             )}
//           </div>

//           {formData.variants.map((variant, vIndex) => (
//             <div key={variant.id} className="bg-white rounded-3xl border shadow-sm overflow-hidden">
//               <div className="p-4 bg-gray-50/80 border-b flex justify-between items-center px-6">
//                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Variant #{vIndex + 1}</span>
//                 {!isViewMode && formData.variants.length > 1 && (
//                   <button onClick={() => {
//                     const updated = [...formData.variants];
//                     updated.splice(vIndex, 1);
//                     setFormData({ ...formData, variants: updated });
//                   }} className="text-red-400 hover:text-red-600 transition-colors bg-white p-1.5 rounded-full border shadow-sm"><FiTrash2 size={16} /></button>
//                 )}
//               </div>

//               {/* VARIANT INPUTS ROW */}
//               <div className="overflow-x-auto">
//                 <div className="p-6 flex gap-6 min-w-[1000px]"> 
//                   <div className="flex-1 min-w-[200px]">
//                     <label className="text-[10px] font-bold text-gray-400 uppercase">SKU *</label>
//                     <input className={`w-full border p-2.5 rounded-xl mt-1 outline-none text-sm font-medium ${errors.variants?.[vIndex]?.sku ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-green-500"}`} value={variant.sku} onChange={(e) => onVariantChange(vIndex, 'sku', e.target.value)} disabled={isViewMode} />
//                   </div>
//                   <div className="w-28">
//                     <label className="text-[10px] font-bold text-gray-400 uppercase">Capacity</label>
//                     <input className="w-full border border-gray-200 p-2.5 rounded-xl mt-1 outline-none focus:border-green-500 text-sm font-medium" value={variant.capacity} onChange={(e) => onVariantChange(vIndex, 'capacity', e.target.value)} disabled={isViewMode} />
//                   </div>
//                   <div className="w-28">
//                     <label className="text-[10px] font-bold text-gray-400 uppercase">Unit</label>
//                     <select className="w-full border border-gray-200 p-2.5 rounded-xl mt-1 outline-none focus:border-green-500 text-sm font-bold" value={variant.unit} onChange={(e) => onVariantChange(vIndex, 'unit', e.target.value)} disabled={isViewMode}>
//                       <option value="ml">ml</option><option value="liter">liter</option><option value="kg">kg</option><option value="unit">Unit</option>
//                     </select>
//                   </div>
//                   <div className="w-36">
//                     <label className="text-[10px] font-bold text-gray-400 uppercase">MRP *</label>
//                     <input type="number" className={`w-full border p-2.5 rounded-xl mt-1 outline-none text-sm font-bold ${errors.variants?.[vIndex]?.mrp ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-green-500"}`} value={variant.mrp} onChange={(e) => onVariantChange(vIndex, 'mrp', e.target.value)} disabled={isViewMode} />
//                   </div>
//                   <div className="w-36">
//                     <label className="text-[10px] font-bold text-gray-400 uppercase">Price *</label>
//                     <input type="number" className={`w-full border p-2.5 rounded-xl mt-1 outline-none text-sm font-bold ${errors.variants?.[vIndex]?.price ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-green-500"}`} value={variant.price} onChange={(e) => onVariantChange(vIndex, 'price', e.target.value)} disabled={isViewMode} />
//                   </div>
//                   <div className="w-28">
//                     <label className="text-[10px] font-bold text-gray-400 uppercase">Stock</label>
//                     <input type="number" className="w-full border border-gray-200 p-2.5 rounded-xl mt-1 outline-none focus:border-green-500 text-sm font-bold" value={variant.stock} onChange={(e) => onVariantChange(vIndex, 'stock', e.target.value)} disabled={isViewMode} />
//                   </div>
//                 </div>
//               </div>
              
//               {/* EXTRA INFO */}
//               <div className="px-6 pb-6">
//                 <div className="bg-gray-50/50 p-5 rounded-2xl border border-dashed border-gray-200">
//                   <div className="flex justify-between items-center mb-4">
//                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Extra Specifications</p>
//                     {!isViewMode && <button type="button" onClick={() => {
//                       const updated = [...formData.variants];
//                       updated[vIndex].additionalInfo.push({ key: "", value: "" });
//                       setFormData({ ...formData, variants: updated });
//                     }} className="text-[10px] font-bold text-green-600 bg-white px-4 py-1.5 rounded-full border border-green-100 shadow-sm hover:bg-green-50">+ Add Field</button>}
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {variant.additionalInfo.map((info, iIndex) => (
//                       <div key={iIndex} className="flex gap-2 items-center bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
//                         <input placeholder="Key" className="w-1/3 text-xs border-none outline-none px-2 py-1 font-semibold" value={info.key} onChange={(e) => onInfoChange(vIndex, iIndex, 'key', e.target.value)} disabled={isViewMode} />
//                         <div className="h-4 w-[1px] bg-gray-200" />
//                         <input placeholder="Value" className="flex-1 text-xs border-none outline-none px-2 py-1 min-w-0" value={info.value} onChange={(e) => onInfoChange(vIndex, iIndex, 'value', e.target.value)} disabled={isViewMode} />
//                         {!isViewMode && <button type="button" onClick={() => {
//                           const updated = [...formData.variants];
//                           updated[vIndex].additionalInfo.splice(iIndex, 1);
//                           setFormData({ ...formData, variants: updated });
//                         }} className="text-red-300 hover:text-red-500 px-2"><FiX size={16} /></button>}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* IMAGES */}
//         <div className="bg-white p-8 rounded-3xl border shadow-sm">
//           <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
//             <FiUpload className="text-green-500" /> Product Images 
//             {errors.images && <span className="text-red-500 text-[10px] ml-2 font-bold">({errors.images})</span>}
//           </h3>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
//             {previews.images.map((preview, idx) => (
//               <div key={idx} className={`relative aspect-square border-2 border-dashed rounded-2xl overflow-hidden flex items-center justify-center transition-all group ${preview ? "border-solid border-gray-100" : (errors.images ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-gray-50")}`}>
//                 {preview ? (
//                   <>
//                     <img src={preview} alt="product" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
//                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
//                       <button type="button" onClick={() => setPreviewModal({ isOpen: true, url: preview })} className="p-2 bg-white rounded-full text-blue-600 shadow-xl hover:scale-110 transition-transform"><FiEye size={16}/></button>
//                       {!isViewMode && <button type="button" onClick={() => removeImage(idx)} className="p-2 bg-white rounded-full text-red-600 shadow-xl hover:scale-110 transition-transform"><FiTrash2 size={16}/></button>}
//                     </div>
//                   </>
//                 ) : (
//                   !isViewMode && (
//                     <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full hover:bg-gray-100 transition-colors">
//                       <FiPlus className="text-gray-300" size={24} />
//                       <span className="text-[9px] font-bold text-gray-400 mt-1">UPLOAD</span>
//                       <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, idx)} />
//                     </label>
//                   )
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProductForm;

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { 
  FiPlus, FiTrash2, FiUpload, FiInfo, 
  FiPackage, FiLayers, FiEye, FiX, FiAlignLeft, FiFileText 
} from "react-icons/fi";
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  
  const prevPreviewsRef = useRef({ images: [] });

  const isViewMode = pathname.includes("view-product");
  const isEditMode = !!id && !isViewMode;

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [previewModal, setPreviewModal] = useState({ isOpen: false, url: null });

  // --- INITIAL STATE ---
  const initialVariant = () => ({
    id: Date.now() + Math.random(),
    sku: "",
    capacity: "",
    unit: "kg",
    mrp: "",
    price: "",
    stock: "0",
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
    images: Array(5).fill(null), // Holds new File objects
    variants: [initialVariant()]
  });

  const [previews, setPreviews] = useState({
    images: Array(5).fill(null) // Holds URL strings (http or blob)
  });

  // --- VALIDATION LOGIC ---
  const validate = () => {
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = "Product name is required";
    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.shortDescription?.trim()) newErrors.shortDescription = "Short description is required";

    const hasImage = previews.images.some(img => img !== null);
    if (!hasImage) newErrors.images = "At least one product image is required";

    const variantErrors = [];
    formData.variants.forEach((v, index) => {
      const vErr = {};
      if (!v.sku?.trim()) vErr.sku = "Required";
      if (!v.mrp || Number(v.mrp) <= 0) vErr.mrp = "Invalid";
      if (!v.price || Number(v.price) <= 0) vErr.price = "Invalid";
      if (Number(v.price) > Number(v.mrp)) vErr.price = "Price > MRP";
      if (Object.keys(vErr).length > 0) variantErrors[index] = vErr;
    });

    if (variantErrors.length > 0) newErrors.variants = variantErrors;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- DATA FETCHING ---
  const fetchCategories = useCallback(async () => {
    try {
      const res = await api({
        url: SummaryApi.getAllCategories.url,
        method: SummaryApi.getAllCategories.method
      });
      if (res.data.success) setCategories(res.data.data);
    } catch (err) {
      toast.error("Failed to load categories");
    }
  }, []);

  const fetchProductDetails = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await api({
        url: SummaryApi.getOneProduct.url(id),
        method: SummaryApi.getOneProduct.method
      });

      if (res.data.success) {
        const p = res.data.data;
        
        // Map variants and handle the additionalInfo formatting
        const mappedVariants = p.variants?.map(v => ({
          ...v,
          id: v._id || Date.now() + Math.random(),
          additionalInfo: v.additionalInfo?.length > 0 
            ? v.additionalInfo.map(info => ({ key: info.key, value: info.value })) 
            : [{ key: "", value: "" }]
        })) || [initialVariant()];

        // Update Form State (handling category object)
        setFormData({
          name: p.name || "",
          category: p.category?._id || "", // Extract ID from category object
          brand: p.brand || "",
          shortDescription: p.shortDescription || "",
          detailDescription: p.detailDescription || "",
          showOnWebsite: p.showOnWebsite ?? true,
          newLaunch: p.newLaunch ?? false,
          featuredProduct: p.featuredProduct ?? false,
          images: Array(5).fill(null), // Reset file upload inputs
          variants: mappedVariants
        });
        
        // Update Previews State (handling images as array of objects)
        const newPreviews = Array(5).fill(null);
        if (p.images && Array.isArray(p.images)) {
          p.images.forEach((imgObj, i) => {
            if(i < 5) newPreviews[i] = imgObj.url; // Extract .url from image object
          });
        }
        
        setPreviews({ images: newPreviews });
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

  // Cleanup Blob URLs
  useEffect(() => {
    const prev = prevPreviewsRef.current;
    prev.images.forEach((url, index) => {
      if (url?.startsWith("blob:") && url !== previews.images[index]) {
        URL.revokeObjectURL(url);
      }
    });
    prevPreviewsRef.current = previews;
  }, [previews]);

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    if (errors.images) setErrors(prev => ({ ...prev, images: null }));
  };

  const removeImage = (index) => {
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

  const onVariantChange = (index, field, value) => {
    const updated = [...formData.variants];
    updated[index][field] = value;
    setFormData({ ...formData, variants: updated });
    if (errors.variants?.[index]?.[field]) {
      const newVarErrors = [...errors.variants];
      delete newVarErrors[index][field];
      setErrors(prev => ({ ...prev, variants: newVarErrors }));
    }
  };

  const onInfoChange = (vIndex, iIndex, field, value) => {
    const updated = [...formData.variants];
    updated[vIndex].additionalInfo[iIndex][field] = value;
    setFormData({ ...formData, variants: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    setLoading(true);
    const data = new FormData();

    Object.keys(formData).forEach(key => {
      if (!['variants', 'images'].includes(key)) {
        data.append(key, formData[key]);
      }
    });

    data.append("variants", JSON.stringify(formData.variants));
    
    formData.images.forEach(img => { 
      if (img instanceof File) data.append("images", img); 
    });

    // We send existing URLs (strings starting with http) to tell backend which ones to keep
    const existingImages = previews.images.filter(img => typeof img === 'string' && img.startsWith('http'));
    data.append("existingImages", JSON.stringify(existingImages));

    try {
      const configUrl = isEditMode ? SummaryApi.updateProduct.url(id) : SummaryApi.createProduct.url;
      const configMethod = isEditMode ? SummaryApi.updateProduct.method : SummaryApi.createProduct.method;
      const res = await api({
        url: configUrl,
        method: configMethod,
        data: data,
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (res.data.success) {
        toast.success(isEditMode ? "Product updated successfully" : "Product created successfully");
        navigate("/admin-panel/product-list");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20">
      {/* IMAGE PREVIEW MODAL */}
      {previewModal.isOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4">
          <button onClick={() => setPreviewModal({isOpen: false, url: null})} className="absolute top-6 right-6 text-white text-4xl hover:text-red-500 transition-colors"><FiX /></button>
          <img src={previewModal.url} alt="Full View" className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl" />
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-6 rounded-3xl shadow-sm border mt-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isViewMode ? "View Product" : isEditMode ? "Edit Product" : "Add Product"}
          </h2>
        </div>
        {!isViewMode && (
          <button onClick={handleSubmit} disabled={loading} className="w-full md:w-auto bg-green-600 text-white px-12 py-3 rounded-full font-bold shadow-lg hover:bg-green-700 active:scale-95 disabled:opacity-50 transition-all">
            {loading ? "Processing..." : "Save Product"}
          </button>
        )}
      </div>

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        
        {/* BASIC INFORMATION */}
        <div className="bg-white p-8 rounded-3xl border shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4"><FiInfo className="text-green-500" /> Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Product Name *</label>
              <input name="name" value={formData.name} onChange={handleChange} disabled={isViewMode} className={`w-full border p-3 rounded-xl mt-1 outline-none transition-all ${errors.name ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-green-500"}`} />
              {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.name}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Brand</label>
              <input name="brand" value={formData.brand} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-3 rounded-xl mt-1 outline-none focus:border-green-500" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Category *</label>
              <select name="category" value={formData.category} onChange={handleChange} disabled={isViewMode} className={`w-full border p-3 rounded-xl mt-1 outline-none ${errors.category ? "border-red-500" : "border-gray-200 focus:border-green-500"}`}>
                <option value="">Select Category</option>
                {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
              </select>
              {errors.category && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.category}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-2"><FiAlignLeft className="text-green-500" /> Short Description *</label>
              <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} disabled={isViewMode} className={`w-full border p-4 rounded-2xl h-32 resize-none outline-none ${errors.shortDescription ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-green-500"}`} />
              {errors.shortDescription && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.shortDescription}</p>}
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1 mb-2"><FiFileText className="text-green-500" /> Detailed Description</label>
              <textarea name="detailDescription" value={formData.detailDescription} onChange={handleChange} disabled={isViewMode} className="w-full border border-gray-200 p-4 rounded-2xl h-32 resize-none outline-none focus:border-green-500" />
            </div>
          </div>
        </div>

        {/* VISIBILITY */}
        <div className="bg-white p-8 rounded-3xl border shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-6 border-b pb-4 flex items-center gap-2"><FiLayers className="text-green-500" /> Visibility</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Show On Website", key: "showOnWebsite" },
              { label: "New Launch", key: "newLaunch" },
              { label: "Featured Product", key: "featuredProduct" }
            ].map(item => (
              <div key={item.key} className="flex justify-between items-center bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <span className="text-sm font-bold text-gray-700">{item.label}</span>
                <button type="button" onClick={() => handleToggle(item.key)} className={`w-12 h-6 flex items-center rounded-full px-1 transition-all duration-300 ${formData[item.key] ? "bg-green-600" : "bg-gray-300"}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all ${formData[item.key] ? "translate-x-6" : "translate-x-0"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* VARIANTS - HORIZONTAL SCROLL ENABLED */}
        <div className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><FiPackage className="text-green-600" /> Variants</h3>
            {!isViewMode && (
              <button type="button" onClick={() => setFormData(p => ({ ...p, variants: [...p.variants, initialVariant()] }))} className="text-sm bg-green-50 text-green-700 px-5 py-2.5 rounded-xl font-bold border border-green-200 hover:bg-green-100 flex items-center gap-2 transition-all shadow-sm"><FiPlus /> Add Variant</button>
            )}
          </div>

          {formData.variants.map((variant, vIndex) => (
            <div key={variant.id} className="bg-white rounded-3xl border shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50/80 border-b flex justify-between items-center px-6">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Variant #{vIndex + 1}</span>
                {!isViewMode && formData.variants.length > 1 && (
                  <button onClick={() => {
                    const updated = [...formData.variants];
                    updated.splice(vIndex, 1);
                    setFormData({ ...formData, variants: updated });
                  }} className="text-red-400 hover:text-red-600 transition-colors bg-white p-1.5 rounded-full border shadow-sm"><FiTrash2 size={16} /></button>
                )}
              </div>

              {/* VARIANT INPUTS ROW */}
              <div className="overflow-x-auto">
                <div className="p-6 flex gap-6 min-w-[1000px]"> 
                  <div className="flex-1 min-w-[200px]">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">SKU *</label>
                    <input className={`w-full border p-2.5 rounded-xl mt-1 outline-none text-sm font-medium ${errors.variants?.[vIndex]?.sku ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-green-500"}`} value={variant.sku} onChange={(e) => onVariantChange(vIndex, 'sku', e.target.value)} disabled={isViewMode} />
                  </div>
                  <div className="w-28">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Capacity</label>
                    <input className="w-full border border-gray-200 p-2.5 rounded-xl mt-1 outline-none focus:border-green-500 text-sm font-medium" value={variant.capacity} onChange={(e) => onVariantChange(vIndex, 'capacity', e.target.value)} disabled={isViewMode} />
                  </div>
                  <div className="w-28">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Unit</label>
                    <select className="w-full border border-gray-200 p-2.5 rounded-xl mt-1 outline-none focus:border-green-500 text-sm font-bold" value={variant.unit} onChange={(e) => onVariantChange(vIndex, 'unit', e.target.value)} disabled={isViewMode}>
                      <option value="ml">ml</option><option value="liter">liter</option><option value="kg">kg</option><option value="unit">Unit</option>
                    </select>
                  </div>
                  <div className="w-36">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">MRP *</label>
                    <input type="number" className={`w-full border p-2.5 rounded-xl mt-1 outline-none text-sm font-bold ${errors.variants?.[vIndex]?.mrp ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-green-500"}`} value={variant.mrp} onChange={(e) => onVariantChange(vIndex, 'mrp', e.target.value)} disabled={isViewMode} />
                  </div>
                  <div className="w-36">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Price *</label>
                    <input type="number" className={`w-full border p-2.5 rounded-xl mt-1 outline-none text-sm font-bold ${errors.variants?.[vIndex]?.price ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-green-500"}`} value={variant.price} onChange={(e) => onVariantChange(vIndex, 'price', e.target.value)} disabled={isViewMode} />
                  </div>
                  <div className="w-28">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Stock</label>
                    <input type="number" className="w-full border border-gray-200 p-2.5 rounded-xl mt-1 outline-none focus:border-green-500 text-sm font-bold" value={variant.stock} onChange={(e) => onVariantChange(vIndex, 'stock', e.target.value)} disabled={isViewMode} />
                  </div>
                </div>
              </div>
              
              {/* EXTRA INFO */}
              <div className="px-6 pb-6">
                <div className="bg-gray-50/50 p-5 rounded-2xl border border-dashed border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Extra Specifications</p>
                    {!isViewMode && <button type="button" onClick={() => {
                      const updated = [...formData.variants];
                      updated[vIndex].additionalInfo.push({ key: "", value: "" });
                      setFormData({ ...formData, variants: updated });
                    }} className="text-[10px] font-bold text-green-600 bg-white px-4 py-1.5 rounded-full border border-green-100 shadow-sm hover:bg-green-50 transition-colors">+ Add Field</button>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {variant.additionalInfo.map((info, iIndex) => (
                      <div key={iIndex} className="flex gap-2 items-center bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
                        <input placeholder="Key" className="w-1/3 text-xs border-none outline-none px-2 py-1 font-semibold" value={info.key} onChange={(e) => onInfoChange(vIndex, iIndex, 'key', e.target.value)} disabled={isViewMode} />
                        <div className="h-4 w-[1px] bg-gray-200" />
                        <input placeholder="Value" className="flex-1 text-xs border-none outline-none px-2 py-1 min-w-0" value={info.value} onChange={(e) => onInfoChange(vIndex, iIndex, 'value', e.target.value)} disabled={isViewMode} />
                        {!isViewMode && <button type="button" onClick={() => {
                          const updated = [...formData.variants];
                          updated[vIndex].additionalInfo.splice(iIndex, 1);
                          setFormData({ ...formData, variants: updated });
                        }} className="text-red-300 hover:text-red-500 px-2"><FiX size={16} /></button>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* IMAGES */}
        <div className="bg-white p-8 rounded-3xl border shadow-sm">
          <h3 className="font-bold text-gray-700 mb-6 flex items-center gap-2 border-b pb-4">
            <FiUpload className="text-green-500" /> Product Images 
            {errors.images && <span className="text-red-500 text-[10px] ml-2 font-bold">({errors.images})</span>}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {previews.images.map((preview, idx) => (
              <div key={idx} className={`relative aspect-square border-2 border-dashed rounded-2xl overflow-hidden flex items-center justify-center transition-all group ${preview ? "border-solid border-gray-100" : (errors.images ? "border-red-300 bg-red-50/30" : "border-gray-200 bg-gray-50")}`}>
                {preview ? (
                  <>
                    <img src={preview} alt="product" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
                      <button type="button" onClick={() => setPreviewModal({ isOpen: true, url: preview })} className="p-2 bg-white rounded-full text-blue-600 shadow-xl hover:scale-110 transition-transform"><FiEye size={16}/></button>
                      {!isViewMode && <button type="button" onClick={() => removeImage(idx)} className="p-2 bg-white rounded-full text-red-600 shadow-xl hover:scale-110 transition-transform"><FiTrash2 size={16}/></button>}
                    </div>
                  </>
                ) : (
                  !isViewMode && (
                    <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full hover:bg-gray-100 transition-colors">
                      <FiPlus className="text-gray-300" size={24} />
                      <span className="text-[9px] font-bold text-gray-400 mt-1 uppercase">Upload</span>
                      <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(e, idx)} />
                    </label>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;