// import { useState, useContext, useEffect } from "react";
// import { CategoryContext } from "../Context/CategoryContext";
// import { useNavigate, useLocation } from "react-router-dom";

// const CreateCategory = () => {
//   const { addCategory, categories, setCategories } = useContext(CategoryContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const editCategory = location.state?.category; // ✅ check if editing

//   const initialState = {
//     category: "topCategory",
//     name: "",
//     url: "",
//     ShortDescription: "",
//     price: "",
//     description: "",
//     showOnWebsite: false,
//     allowOrders: false,
//     featuredProduct: false,
//     icon: null,
//     image: null,
//     status: "Active",
//   };

//   // ✅ use editCategory as initial form data if available
//   const [formData, setFormData] = useState(editCategory || initialState);

//   useEffect(() => {
//     if (editCategory) setFormData(editCategory); // prefill on mount
//   }, [editCategory]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleFileChange = (e, field) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFormData((prev) => ({
//         ...prev,
//         [field]: reader.result,
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const removeImage = (field) => {
//     setFormData({ ...formData, [field]: null });
//   };

//   // ✅ SAVE & CREATE ANOTHER
//   const handleSaveAndCreate = (e) => {
//     e.preventDefault();

//     if (editCategory) {
//       // Update existing category
//       const updatedCategories = categories.map((cat) =>
//         cat.id === editCategory.id ? { ...formData, id: editCategory.id } : cat
//       );
//       setCategories(updatedCategories);
//     } else {
//       addCategory({
//         id: Date.now(),
//         ...formData,
//         createdDate: new Date().toLocaleDateString(),
//       });
//     }

//     // reset form
//     setFormData(initialState);
//   };

//   // ✅ SAVE CATEGORY & NAVIGATE
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (editCategory) {
//       const updatedCategories = categories.map((cat) =>
//         cat.id === editCategory.id ? { ...formData, id: editCategory.id } : cat
//       );
//       setCategories(updatedCategories);
//     } else {
//       addCategory({
//         id: Date.now(),
//         ...formData,
//         createdDate: new Date().toLocaleDateString(),
//       });
//     }

//     navigate("/admin-panel/products-category");
//   };

//   return (
//     <div className="">
//       <h2 className="text-xl md:text-2xl font-semibold mb-8">
//         {editCategory ? "Edit Category" : "Create Category"}
//       </h2>

//       <form className="space-y-8">
//         {/* Basic Information */}
//         <div className="bg-white rounded-xl shadow p-5 md:p-6 space-y-6">
//           <h3 className="font-semibold text-lg border-b pb-3">
//             Basic Information
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="text-[15px] font-medium">Category Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 className="w-full border px-3 py-3 rounded-lg mt-2"
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div>
//               <label className="text-[15px] font-medium">Category URL</label>
//               <input
//                 type="text"
//                 name="url"
//                 value={formData.url}
//                 className="w-full border px-3 py-3 rounded-lg mt-2"
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="md:col-span-2">
//               <label className="text-[15px] font-medium">Short Description</label>
//               <input
//                 type="text"
//                 name="ShortDescription"
//                 value={formData.ShortDescription}
//                 className="w-full border px-3 py-3 rounded-lg mt-2"
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Category Usage */}
//         <div className="bg-white rounded-xl shadow p-5 md:p-6 space-y-6">
//           <h3 className="font-semibold text-lg border-b pb-3">
//             Category Usage & Display Settings
//           </h3>

//           <div className="space-y-4">
//             {[
//               { label: "Show on Website", name: "showOnWebsite" },
//               { label: "Allow Orders", name: "allowOrders" },
//               { label: "Featured Product", name: "featuredProduct" },
//             ].map((item) => (
//               <div key={item.name} className="flex justify-between items-center">
//                 <span className="text-[15px] font-medium">{item.label}</span>
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setFormData({
//                       ...formData,
//                       [item.name]: !formData[item.name],
//                     })
//                   }
//                   className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
//                     formData[item.name] ? "bg-green-600" : "bg-gray-300"
//                   }`}
//                 >
//                   <div
//                     className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
//                       formData[item.name] ? "translate-x-6" : ""
//                     }`}
//                   />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Image Upload */}
//         <div className="bg-white rounded-xl shadow p-5 md:p-6">
//           <h3 className="font-semibold text-lg border-b pb-3 mb-6">
//             Category Icon / Image
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Icon */}
//             <div>
//               <label className="block mb-3 text-[15px] font-medium">
//                 Upload Icon (SVG/PNG)
//               </label>
//               <div className="border-2 border-dashed rounded-lg p-6 text-center">
//                 {formData.icon ? (
//                   <>
//                     <img src={formData.icon} alt="icon" className="h-20 mx-auto mb-4" />
//                     <div className="flex justify-center gap-4 text-sm">
//                       <label className="cursor-pointer text-blue-600">
//                         Edit
//                         <input
//                           type="file"
//                           hidden
//                           onChange={(e) => handleFileChange(e, "icon")}
//                         />
//                       </label>
//                       <button
//                         type="button"
//                         onClick={() => removeImage("icon")}
//                         className="text-red-600"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   <label className="cursor-pointer text-gray-400">
//                     Click to Upload
//                     <input
//                       type="file"
//                       hidden
//                       onChange={(e) => handleFileChange(e, "icon")}
//                     />
//                   </label>
//                 )}
//               </div>
//             </div>

//             {/* Image */}
//             <div>
//               <label className="block mb-3 text-[15px] font-medium">
//                 Upload Image (JPG/PNG)
//               </label>
//               <div className="border-2 border-dashed rounded-lg p-6 text-center">
//                 {formData.image ? (
//                   <>
//                     <img src={formData.image} alt="product" className="h-20 mx-auto mb-4" />
//                     <div className="flex justify-center gap-4 text-sm">
//                       <label className="cursor-pointer text-blue-600">
//                         Edit
//                         <input
//                           type="file"
//                           hidden
//                           onChange={(e) => handleFileChange(e, "image")}
//                         />
//                       </label>
//                       <button
//                         type="button"
//                         onClick={() => removeImage("image")}
//                         className="text-red-600"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   <label className="cursor-pointer text-gray-400">
//                     Click to Upload
//                     <input
//                       type="file"
//                       hidden
//                       onChange={(e) => handleFileChange(e, "image")}
//                     />
//                   </label>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="px-6 py-2 rounded-full border w-full sm:w-auto"
//           >
//             Back
//           </button>

//           <button
//             type="button"
//             onClick={handleSaveAndCreate}
//             className="px-6 py-2 rounded-full bg-gray-200 w-full sm:w-auto"
//           >
//             Save & Create Another
//           </button>

//           <button
//             type="button"
//             onClick={handleSubmit}
//             className="px-8 py-2 rounded-full bg-green-600 text-white w-full sm:w-auto"
//           >
//             {editCategory ? "Update Category" : "Save Product"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateCategory;


// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
// import SummaryApi from "../common/SummaryApi";
// import api from "../common/apiClient";

// const CreateCategory = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { pathname } = useLocation();

//   const isView = pathname.includes("view-category");
//   const isEdit = pathname.includes("edit-category");
//   const isCreate = !isView && !isEdit;

//   const [formData, setFormData] = useState({
//     name: "",
//     shortDescription: "",
//     status: "Active",
//     showOnWebsite: true,
//     allowOrders: true,
//     featuredProduct: false,
//     categoryType: "topCategory",
//   });

//   // const [iconFile, setIconFile] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [previews, setPreviews] = useState({ image: null });
//   const [loading, setLoading] = useState(false);

//   // Fetch data if Edit or View
//   useEffect(() => {
//     if (id) {
//       const fetchDetail = async () => {
//         try {
//           const res = await api({
//             url: SummaryApi.getCategoryById.url(id),
//             method: SummaryApi.getCategoryById.method,
//           });
//           if (res.data.success) {
//             setFormData(res.data.data);
//             setPreviews({
//               image: res.data.data.image?.url,
//             });
//           }
//         } catch (err) {
//           toast.error("Could not load details");
//         }
//       };
//       fetchDetail();
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     if (isView) return;
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleFile = (e, type) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (type === "image") setImageFile(file);
//       setPreviews((prev) => ({ ...prev, [type]: URL.createObjectURL(file) }));
//     }
//   };

//   const handleSubmit = async (e, mode = "save") => {
//     e.preventDefault();
//     if (!formData.name) return toast.error("Category Name is required");

//     setLoading(true);
//     const data = new FormData();
//     Object.keys(formData).forEach((key) => data.append(key, formData[key]));
//     if (imageFile) data.append("image", imageFile);

//     try {
//       const apiConfig = isCreate ? SummaryApi.createCategory : SummaryApi.updateCategory;
//       const url = isCreate ? apiConfig.url : apiConfig.url(id);

//       const response = await api({
//         url: url,
//         method: apiConfig.method,
//         data: data,
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.data.success) {
//         toast.success(isCreate ? "Category Created" : "Category Updated");
//         if (mode === "save") navigate("/admin-panel/products-category");
//         else {
//           setFormData({ name: "", status: "Active" }); // Reset for create another
//           setPreviews({ image: null });
//         }
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Operation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">
//         {isView ? "Category Details" : isEdit ? "Edit Category" : "Create Category"}
//       </h2>

//       <form className="space-y-6" onSubmit={(e) => handleSubmit(e, "save")}>
//         {/* Form Grid */}
//         <div className="bg-white p-6 rounded-xl shadow grid grid-cols-1 md:grid-cols-1">

//           <div>
//           <h3 className="font-bold border-b pb-2 col-span-1">Basic Information</h3>
//             <label className="block text-sm font-semibold mb-2 mt-4">Category Name *</label>
//             <input
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               disabled={isView}
//               className="w-full border p-3 rounded-lg outline-none focus:border-green-500 disabled:bg-gray-50"
//               placeholder="e.g. T-Shirts"
//               required
//             />
//           </div>

//           <div className="col-span-2 mt-4">
//             <label className="block text-sm font-semibold mb-2">Short Description</label>
//             <textarea
//               name="shortDescription"
//               value={formData.shortDescription}
//               onChange={handleChange}
//               disabled={isView}
//               className="w-full border p-3 rounded-lg h-24 outline-none disabled:bg-gray-50"
//             />
//           </div>
//         </div>

//         {/* Display Settings */}
//         <div className="bg-white p-6 rounded-xl shadow space-y-4">
//           <h3 className="font-bold border-b pb-2">Category Usage & Display Settings</h3>
//           <div className="flex justify-between items-center">
//             <span>Show on Website</span>
//             <input 
//                 type="checkbox" 
//                 name="showOnWebsite" 
//                 checked={formData.showOnWebsite} 
//                 onChange={handleChange} 
//                 disabled={isView}
//                 className="w-5 h-5 accent-green-600"
//             />
//           </div>
//           <div className="flex justify-between items-center">
//             <span>Featured Product</span>
//             <input 
//                 type="checkbox" 
//                 name="featuredProduct" 
//                 checked={formData.featuredProduct} 
//                 onChange={handleChange} 
//                 disabled={isView}
//                 className="w-5 h-5 accent-green-600"
//             />
//           </div>
//         </div>

//         {/* Media Upload */}
//         <div className="bg-white p-6 rounded-xl shadow grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-semibold mb-2">Image</label>
//             <div className="border-2 border-dashed p-4 rounded-lg text-center">
//               {previews.image && <img src={previews.image} className="h-16 mx-auto mb-2 rounded" alt="preview" />}
//               {!isView && <input type="file" onChange={(e) => handleFile(e, "image")} className="text-sm" />}
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end gap-3">
//           <button type="button" onClick={() => navigate(-1)} className="px-6 py-2 border rounded-full">Back</button>
          
//           {!isView && (
//             <>
//               {isCreate && (
//                 <button 
//                   type="button" 
//                   disabled={loading}
//                   onClick={(e) => handleSubmit(e, "createAnother")} 
//                   className="px-6 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
//                 >
//                   Save & Add Another
//                 </button>
//               )}
//               <button 
//                 type="submit" 
//                 disabled={loading}
//                 className="px-10 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 shadow-md"
//               >
//                 {loading ? "Processing..." : isEdit ? "Update Category" : "Save Category"}
//               </button>
//             </>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateCategory;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
// import SummaryApi from "../common/SummaryApi";
// import api from "../common/apiClient";

// const CreateCategory = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { pathname } = useLocation();

//   const isView = pathname.includes("view-category");
//   const isEdit = pathname.includes("edit-category");
//   const isCreate = !isView && !isEdit;

//   const [formData, setFormData] = useState({
//     name: "",
//     shortDescription: "",
//     status: "Active",
//     showOnWebsite: true,
//     allowOrders: true,
//     featuredProduct: false,
//     categoryType: "topCategory",
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [previews, setPreviews] = useState({ image: null });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (id) {
//       const fetchDetail = async () => {
//         try {
//           const res = await api({
//             url: SummaryApi.getCategoryById.url(id),
//             method: SummaryApi.getCategoryById.method,
//           });
//           if (res.data.success) {
//             // We strip the nested image object to prevent [object Object] issue
//             const { image, ...rest } = res.data.data;
//             setFormData(rest);
//             setPreviews({
//               image: image?.url || null,
//             });
//           }
//         } catch (err) {
//           toast.error("Could not load details");
//         }
//       };
//       fetchDetail();
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     if (isView) return;
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleFile = (e, type) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (type === "image") setImageFile(file);
//       setPreviews((prev) => ({ ...prev, [type]: URL.createObjectURL(file) }));
//     }
//   };

//   const handleSubmit = async (e, mode = "save") => {
//     e.preventDefault();
//     if (!formData.name) return toast.error("Category Name is required");

//     setLoading(true);
//     const data = new FormData();

//     // ✅ FIXED: Append only text/boolean fields, skip objects
//     Object.keys(formData).forEach((key) => {
//         // Don't send internal DB fields if they exist
//         if (["_id", "createdAt", "updatedAt", "__v", "image"].includes(key)) return;
//         data.append(key, formData[key]);
//     });

//     // ✅ FIXED: Only append image if a new file was actually picked
//     if (imageFile) {
//       data.append("image", imageFile);
//     }

//     try {
//       const apiConfig = isCreate ? SummaryApi.createCategory : SummaryApi.updateCategory;
//       const url = isCreate ? apiConfig.url : apiConfig.url(id);

//       const response = await api({
//         url: url,
//         method: apiConfig.method,
//         data: data,
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.data.success) {
//         toast.success(isCreate ? "Category Created" : "Category Updated");
//         if (mode === "save") navigate("/admin-panel/products-category");
//         else {
//           setFormData({ name: "", status: "Active", showOnWebsite: true, allowOrders: true });
//           setPreviews({ image: null });
//           setImageFile(null);
//         }
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Operation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-6">
//         {isView ? "Category Details" : isEdit ? "Edit Category" : "Create Category"}
//       </h2>

//       <form className="space-y-6" onSubmit={(e) => handleSubmit(e, "save")}>
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h3 className="font-bold border-b pb-2 mb-4">Basic Information</h3>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-semibold mb-2">Category Name *</label>
//               <input
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 disabled={isView}
//                 className="w-full border p-3 rounded-lg outline-none focus:border-green-500 disabled:bg-gray-50"
//                 placeholder="e.g. T-Shirts"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold mb-2">Short Description</label>
//               <textarea
//                 name="shortDescription"
//                 value={formData.shortDescription}
//                 onChange={handleChange}
//                 disabled={isView}
//                 className="w-full border p-3 rounded-lg h-24 outline-none disabled:bg-gray-50"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow space-y-4">
//           <h3 className="font-bold border-b pb-2 text-gray-700">Display Settings</h3>
//           <div className="flex justify-between items-center py-2">
//             <span className="text-sm font-medium">Show on Website</span>
//             <input 
//                 type="checkbox" 
//                 name="showOnWebsite" 
//                 checked={formData.showOnWebsite} 
//                 onChange={handleChange} 
//                 disabled={isView}
//                 className="w-5 h-5 accent-green-600 cursor-pointer"
//             />
//           </div>
//           <div className="flex justify-between items-center py-2">
//             <span className="text-sm font-medium">Featured Product</span>
//             <input 
//                 type="checkbox" 
//                 name="featuredProduct" 
//                 checked={formData.featuredProduct} 
//                 onChange={handleChange} 
//                 disabled={isView}
//                 className="w-5 h-5 accent-green-600 cursor-pointer"
//             />
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow">
//           <h3 className="font-bold border-b pb-2 mb-4 text-gray-700">Category Image</h3>
//           <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 p-6 rounded-lg bg-gray-50">
//             {previews.image ? (
//                 <div className="relative mb-4">
//                     <img src={previews.image} className="h-32 w-32 object-cover rounded-lg shadow-md border" alt="preview" />
//                     {!isView && (
//                         <button 
//                             type="button"
//                             onClick={() => {setPreviews({image: null}); setImageFile(null);}}
//                             className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
//                         >✕</button>
//                     )}
//                 </div>
//             ) : (
//                 <div className="text-gray-400 mb-4 text-sm">No image selected</div>
//             )}
            
//             {!isView && (
//                 <label className="cursor-pointer bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200 hover:bg-green-100 transition-all text-sm font-medium">
//                     {previews.image ? "Change Image" : "Upload Image"}
//                     <input type="file" accept="image/*" hidden onChange={(e) => handleFile(e, "image")} />
//                 </label>
//             )}
//           </div>
//         </div>

//         <div className="flex justify-end gap-3 pt-4">
//           <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 border rounded-full hover:bg-gray-50 transition-all">Back</button>
          
//           {!isView && (
//             <>
//               {isCreate && (
//                 <button 
//                   type="button" 
//                   disabled={loading}
//                   onClick={(e) => handleSubmit(e, "createAnother")} 
//                   className="px-6 py-2.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-all text-gray-700"
//                 >
//                   Save & Add Another
//                 </button>
//               )}
//               <button 
//                 type="submit" 
//                 disabled={loading}
//                 className="px-10 py-2.5 bg-green-600 text-white rounded-full hover:bg-green-700 shadow-md transition-all disabled:opacity-50"
//               >
//                 {loading ? "Processing..." : isEdit ? "Update Category" : "Save Category"}
//               </button>
//             </>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateCategory;


// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";
// import SummaryApi from "../common/SummaryApi";
// import api from "../common/apiClient";

// const CreateCategory = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { pathname } = useLocation();

//   const isView = pathname.includes("view-category");
//   const isEdit = pathname.includes("edit-category");
//   const isCreate = !isView && !isEdit;

//   const [formData, setFormData] = useState({
//     name: "",
//     url: "",
//     shortDescription: "",
//     price: 0,
//     showOnWebsite: true,
//     allowOrders: true,
//     featuredProduct: false,
//     status: "Active",
//     categoryType: "topCategory",
//   });

//   const [imageFile, setImageFile] = useState(null); // Actual file for upload
//   const [previews, setPreviews] = useState({ image: null }); // URL for display
//   const [loading, setLoading] = useState(false);

//   // 1. FETCH DATA (VIEW / EDIT MODE)
//   useEffect(() => {
//     if (id) {
//       const fetchDetail = async () => {
//         setLoading(true);
//         try {
//           const res = await api({
//             url: SummaryApi.getCategoryById.url(id),
//             method: SummaryApi.getCategoryById.method,
//           });

//           if (res.data.success) {
//             const data = res.data.data;
            
//             // ✅ PREVENT [object Object]: Separate primitives from the image object
//             setFormData({
//               name: data.name || "",
//               url: data.url || "",
//               shortDescription: data.shortDescription || "",
//               price: data.price || 0,
//               showOnWebsite: data.showOnWebsite ?? true,
//               allowOrders: data.allowOrders ?? true,
//               featuredProduct: data.featuredProduct ?? false,
//               status: data.status || "Active",
//               categoryType: data.categoryType || "topCategory",
//             });

//             // Set the preview from the Cloudinary URL
//             setPreviews({
//               image: data.image?.url || null,
//             });
//           }
//         } catch (err) {
//           toast.error("Failed to load category data");
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchDetail();
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     if (isView) return;
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       setPreviews({ image: URL.createObjectURL(file) });
//     }
//   };

//   // 2. SUBMIT DATA
//   const handleSubmit = async (e, mode = "save") => {
//     e.preventDefault();
//     if (!formData.name) return toast.error("Category Name is required");

//     setLoading(true);
//     const dataToSend = new FormData();

//     // ✅ Append text and boolean fields
//     Object.keys(formData).forEach((key) => {
//       dataToSend.append(key, formData[key]);
//     });

//     // ✅ ONLY append "image" if a NEW FILE was selected
//     // If imageFile is null, the backend will keep the old Cloudinary data
//     if (imageFile) {
//       dataToSend.append("image", imageFile);
//     }

//     try {
//       const apiConfig = isCreate ? SummaryApi.createCategory : SummaryApi.updateCategory;
//       const url = isCreate ? apiConfig.url : apiConfig.url(id);

//       const response = await api({
//         url: url,
//         method: apiConfig.method,
//         data: dataToSend,
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.data.success) {
//         toast.success(isCreate ? "Category Created!" : "Category Updated!");
//         if (mode === "save") navigate("/admin-panel/products-category");
//         else {
//           // Reset for "Save & Add Another"
//           setFormData({ name: "", url: "", shortDescription: "", price: 0, status: "Active", showOnWebsite: true, allowOrders: true });
//           setPreviews({ image: null });
//           setImageFile(null);
//         }
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Operation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading && id && !formData.name) return <div className="p-10 text-center">Loading Data...</div>;

//   return (
//     <div className="max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">
//         {isView ? "View Category" : isEdit ? "Update Category" : "Create New Category"}
//       </h2>

//       <form className="space-y-6" onSubmit={(e) => handleSubmit(e, "save")}>
        
//         {/* Basic Info Section */}
//         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//           <h3 className="font-bold text-gray-700 border-b pb-3 mb-5">Basic Information</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="col-span-1">
//               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category Name *</label>
//               <input
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 disabled={isView}
//                 className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-green-500 disabled:bg-gray-50 transition-all"
//                 placeholder="e.g. T-shirt"
//                 required
//               />
//             </div>
//             <div className="col-span-1">
//               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Slug URL</label>
//               <input
//                 name="url"
//                 value={formData.url}
//                 onChange={handleChange}
//                 disabled={isView}
//                 className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-green-500 disabled:bg-gray-50 transition-all"
//                 placeholder="slug-url"
//               />
//             </div>
//             <div className="col-span-2">
//               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Short Description</label>
//               <textarea
//                 name="shortDescription"
//                 value={formData.shortDescription}
//                 onChange={handleChange}
//                 disabled={isView}
//                 className="w-full border border-gray-200 p-3 rounded-xl h-24 outline-none focus:border-green-500 disabled:bg-gray-50 transition-all"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Settings Section */}
//         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//           <h3 className="font-bold text-gray-700 border-b pb-3 mb-4">Display & Visibility</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//             <label className="flex items-center gap-3 cursor-pointer">
//               <input type="checkbox" name="showOnWebsite" checked={formData.showOnWebsite} onChange={handleChange} disabled={isView} className="w-5 h-5 accent-green-600" />
//               <span className="text-sm font-medium">Show on Website</span>
//             </label>
//             <label className="flex items-center gap-3 cursor-pointer">
//               <input type="checkbox" name="allowOrders" checked={formData.allowOrders} onChange={handleChange} disabled={isView} className="w-5 h-5 accent-green-600" />
//               <span className="text-sm font-medium">Allow Orders</span>
//             </label>
//             <label className="flex items-center gap-3 cursor-pointer">
//               <input type="checkbox" name="featuredProduct" checked={formData.featuredProduct} onChange={handleChange} disabled={isView} className="w-5 h-5 accent-green-600" />
//               <span className="text-sm font-medium">Featured Category</span>
//             </label>
//           </div>
//         </div>

//         {/* Image Upload Section */}
//         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//           <h3 className="font-bold text-gray-700 border-b pb-3 mb-5">Category Image</h3>
//           <div className="flex flex-col items-center p-8 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50">
//             {previews.image ? (
//               <div className="relative group">
//                 <img src={previews.image} className="h-40 w-40 object-cover rounded-xl shadow-lg border-2 border-white" alt="preview" />
//                 {!isView && (
//                   <button 
//                     type="button" 
//                     onClick={() => {setPreviews({image:null}); setImageFile(null);}}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-all"
//                   >✕</button>
//                 )}
//               </div>
//             ) : (
//               <div className="text-gray-400 text-sm flex flex-col items-center">
//                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 text-gray-300 font-bold text-2xl">?</div>
//                 No image selected
//               </div>
//             )}
            
//             {!isView && (
//               <label className="mt-6 cursor-pointer bg-white border border-gray-200 px-6 py-2 rounded-full text-sm font-bold text-gray-600 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all shadow-sm">
//                 {previews.image ? "Change Image" : "Upload Image"}
//                 <input type="file" accept="image/*" hidden onChange={handleFileChange} />
//               </label>
//             )}
//           </div>
//         </div>

//         {/* Form Actions */}
//         <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 pb-10">
//           <button type="button" onClick={() => navigate(-1)} className="px-8 py-3 border border-gray-200 rounded-full font-bold text-gray-500 hover:bg-gray-50 transition-all">
//             Back
//           </button>
          
//           {!isView && (
//             <>
//               {isCreate && (
//                 <button 
//                   type="button" 
//                   disabled={loading}
//                   onClick={(e) => handleSubmit(e, "createAnother")} 
//                   className="px-8 py-3 bg-gray-100 text-gray-600 rounded-full font-bold hover:bg-gray-200 transition-all"
//                 >
//                   Save & Add Another
//                 </button>
//               )}
//               <button 
//                 type="submit" 
//                 disabled={loading}
//                 className="px-12 py-3 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 shadow-xl shadow-green-100 transition-all disabled:opacity-50"
//               >
//                 {loading ? "Processing..." : isEdit ? "Update Category" : "Save Category"}
//               </button>
//             </>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateCategory;


import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import api from "../common/apiClient";

const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isView = pathname.includes("view-category");
  const isEdit = pathname.includes("edit-category");
  const isCreate = !isView && !isEdit;

  // 1. FormData state (Only holds text/boolean fields)
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    status: "Active",
    showOnWebsite: true,
    allowOrders: true,
    featuredProduct: false,
    categoryType: "topCategory",
  });

  // 2. Separate states for Files and Previews
  const [imageFile, setImageFile] = useState(null);
  const [previews, setPreviews] = useState({ image: null });
  const [loading, setLoading] = useState(false);

  // Fetch Category Data (Edit/View Mode)
  useEffect(() => {
    if (id) {
      const fetchDetail = async () => {
        try {
          const res = await api({
            url: SummaryApi.getCategoryById.url(id),
            method: SummaryApi.getCategoryById.method,
          });

          if (res.data.success) {
            const data = res.data.data;
            
            // Map the API data to local state
            setFormData({
              name: data.name || "",
              shortDescription: data.shortDescription || "",
              status: data.status || "Active",
              showOnWebsite: data.showOnWebsite ?? true,
              allowOrders: data.allowOrders ?? true,
              featuredProduct: data.featuredProduct ?? false,
              categoryType: data.categoryType || "topCategory",
            });

            // Set the existing Cloudinary image URL as preview
            if (data.image?.url) {
              setPreviews({ image: data.image.url });
            }
          }
        } catch (err) {
          toast.error("Could not load category details");
        }
      };
      fetchDetail();
    }
  }, [id]);

  const handleChange = (e) => {
    if (isView) return;
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviews({ image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e, mode = "save") => {
    e.preventDefault();
    if (!formData.name) return toast.error("Category Name is required");

    setLoading(true);
    const data = new FormData();

    // ✅ STEP 1: Append only text/boolean fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // ✅ STEP 2: Append image only if a NEW file was picked
    // If imageFile is null, backend will keep the existing Cloudinary image
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const apiConfig = isCreate ? SummaryApi.createCategory : SummaryApi.updateCategory;
      const url = isCreate ? apiConfig.url : apiConfig.url(id);

      const response = await api({
        url: url,
        method: apiConfig.method,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success(isCreate ? "Category Created Successfully" : "Category Updated Successfully");
        
        if (mode === "save") {
          navigate("/admin-panel/products-category");
        } else {
          // Reset form for "Create Another"
          setFormData({
            name: "",
            shortDescription: "",
            status: "Active",
            showOnWebsite: true,
            allowOrders: true,
            featuredProduct: false,
            categoryType: "topCategory",
          });
          setImageFile(null);
          setPreviews({ image: null });
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-1">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isView ? "View Category" : isEdit ? "Edit Category" : "Create Category"}
      </h2>

      <form className="space-y-6" onSubmit={(e) => handleSubmit(e, "save")}>
        
        {/* Basic Info Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold border-b pb-3 mb-5 text-gray-700">Basic Information</h3>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-600">Category Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isView}
                className="w-full border border-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50 transition-all"
                placeholder="Enter category name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-600">Short Description</label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                disabled={isView}
                className="w-full border border-gray-200 p-3 rounded-lg h-28 outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50 transition-all resize-none"
                placeholder="Brief description of the category..."
              />
            </div>
          </div>
        </div>

        {/* Visibility Settings Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-bold border-b pb-3 text-gray-700">Display Settings</h3>
          <div className="flex justify-between items-center py-2 px-1">
            <span className="text-sm font-medium text-gray-600">Show on Website</span>
            <input 
                type="checkbox" 
                name="showOnWebsite" 
                checked={formData.showOnWebsite} 
                onChange={handleChange} 
                disabled={isView}
                className="w-5 h-5 accent-green-600 cursor-pointer disabled:cursor-default"
            />
          </div>
          <div className="flex justify-between items-center py-2 px-1 border-t border-gray-50">
            <span className="text-sm font-medium text-gray-600">Mark as Featured Category</span>
            <input 
                type="checkbox" 
                name="featuredProduct" 
                checked={formData.featuredProduct} 
                onChange={handleChange} 
                disabled={isView}
                className="w-5 h-5 accent-green-600 cursor-pointer disabled:cursor-default"
            />
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold border-b pb-3 mb-5 text-gray-700">Category Thumbnail</h3>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-100 p-8 rounded-xl bg-gray-50">
            {previews.image ? (
                <div className="relative group">
                    <img src={previews.image} className="h-40 w-40 object-cover rounded-xl shadow-lg border-2 border-white" alt="category" />
                    {!isView && (
                        <button 
                            type="button"
                            onClick={() => {setPreviews({image: null}); setImageFile(null);}}
                            className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                        >✕</button>
                    )}
                </div>
            ) : (
                <div className="flex flex-col items-center text-gray-400">
                    <div className="bg-white p-4 rounded-full shadow-sm mb-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    </div>
                    <p className="text-sm">No image uploaded yet</p>
                </div>
            )}
            
            {!isView && (
                <label className="mt-6 cursor-pointer bg-white text-green-600 px-6 py-2 rounded-full border border-green-200 hover:bg-green-600 hover:text-white transition-all text-sm font-bold shadow-sm">
                    {previews.image ? "Change Image" : "Select Image"}
                    <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                </label>
            )}
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="px-8 py-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-all font-medium text-gray-600"
          >
            Back
          </button>
          
          {!isView && (
            <>
              {isCreate && (
                <button 
                  type="button" 
                  disabled={loading}
                  onClick={(e) => handleSubmit(e, "createAnother")} 
                  className="px-8 py-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-all text-gray-700 font-medium flex items-center gap-2 justify-center disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                      Processing...
                    </>
                  ) : (
                    "Save & Add Another"
                  )}
                </button>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="px-12 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 shadow-xl shadow-green-100 transition-all disabled:opacity-50 font-bold flex items-center gap-2 justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                    Processing...
                  </>
                ) : (
                  isEdit ? "Update Category" : "Save Category"
                )}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;