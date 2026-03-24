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


import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import api from "../common/apiClient";

const CreateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isView = pathname.includes("view-category");
  const isEdit = pathname.includes("edit-category");
  const isCreate = !isView && !isEdit;

  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    status: "Active",
    showOnWebsite: true,
    allowOrders: true,
    featuredProduct: false,
    categoryType: "topCategory",
  });

  // const [iconFile, setIconFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previews, setPreviews] = useState({ icon: null, image: null });
  const [loading, setLoading] = useState(false);

  // Fetch data if Edit or View
  useEffect(() => {
    if (id) {
      const fetchDetail = async () => {
        try {
          const res = await api({
            url: SummaryApi.getCategoryById.url(id),
            method: SummaryApi.getCategoryById.method,
          });
          if (res.data.success) {
            setFormData(res.data.data);
            setPreviews({
              // icon: res.data.data.icon?.url,
              image: res.data.data.image?.url,
            });
          }
        } catch (err) {
          toast.error("Could not load details");
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

  const handleFile = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      // if (type === "icon") setIconFile(file);
      if (type === "image") setImageFile(file);
      setPreviews((prev) => ({ ...prev, [type]: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e, mode = "save") => {
    e.preventDefault();
    if (!formData.name) return toast.error("Category Name is required");

    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    // if (iconFile) data.append("icon", iconFile);
    if (imageFile) data.append("image", imageFile);

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
        toast.success(isCreate ? "Category Created" : "Category Updated");
        if (mode === "save") navigate("/admin-panel/products-category");
        else {
          setFormData({ name: "", status: "Active" }); // Reset for create another
          setPreviews({ icon: null, image: null });
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        {isView ? "Category Details" : isEdit ? "Edit Category" : "Create Category"}
      </h2>

      <form className="space-y-6" onSubmit={(e) => handleSubmit(e, "save")}>
        {/* Form Grid */}
        <div className="bg-white p-6 rounded-xl shadow grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-semibold mb-2">Category Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isView}
              className="w-full border p-3 rounded-lg outline-none focus:border-green-500 disabled:bg-gray-50"
              placeholder="e.g. T-Shirts"
              required
            />
          </div>

          {/* <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-semibold mb-2">Slug URL</label>
            <input
              name="url"
              value={formData.url}
              onChange={handleChange}
              disabled={isView}
              className="w-full border p-3 rounded-lg outline-none focus:border-green-500 disabled:bg-gray-50"
            />
          </div> */}

          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-2">Short Description</label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              disabled={isView}
              className="w-full border p-3 rounded-lg h-24 outline-none disabled:bg-gray-50"
            />
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <h3 className="font-bold border-b pb-2">Settings</h3>
          <div className="flex justify-between items-center">
            <span>Show on Website</span>
            <input 
                type="checkbox" 
                name="showOnWebsite" 
                checked={formData.showOnWebsite} 
                onChange={handleChange} 
                disabled={isView}
                className="w-5 h-5 accent-green-600"
            />
          </div>
          <div className="flex justify-between items-center">
            <span>Featured Product</span>
            <input 
                type="checkbox" 
                name="featuredProduct" 
                checked={formData.featuredProduct} 
                onChange={handleChange} 
                disabled={isView}
                className="w-5 h-5 accent-green-600"
            />
          </div>
        </div>

        {/* Media Upload */}
        <div className="bg-white p-6 rounded-xl shadow grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* <div>
            <label className="block text-sm font-semibold mb-2">Icon</label>
            <div className="border-2 border-dashed p-4 rounded-lg text-center">
              {previews.icon && <img src={previews.icon} className="h-16 mx-auto mb-2 rounded" alt="icon" />}
              {!isView && <input type="file" onChange={(e) => handleFile(e, "icon")} className="text-sm" />}
            </div>
          </div> */}
          <div>
            <label className="block text-sm font-semibold mb-2">Image</label>
            <div className="border-2 border-dashed p-4 rounded-lg text-center">
              {previews.image && <img src={previews.image} className="h-16 mx-auto mb-2 rounded" alt="preview" />}
              {!isView && <input type="file" onChange={(e) => handleFile(e, "image")} className="text-sm" />}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => navigate(-1)} className="px-6 py-2 border rounded-full">Back</button>
          
          {!isView && (
            <>
              {isCreate && (
                <button 
                  type="button" 
                  disabled={loading}
                  onClick={(e) => handleSubmit(e, "createAnother")} 
                  className="px-6 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  Save & Add Another
                </button>
              )}
              <button 
                type="submit" 
                disabled={loading}
                className="px-10 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 shadow-md"
              >
                {loading ? "Processing..." : isEdit ? "Update Category" : "Save Category"}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;