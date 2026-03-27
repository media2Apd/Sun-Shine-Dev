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

  const units = [
    { label: "mg", value: "mg", type: "weight" },
    { label: "g", value: "g", type: "weight" },
    { label: "kg", value: "kg", type: "weight" },
    { label: "ml", value: "ml", type: "volume" },
    { label: "l", value: "l", type: "volume" },
    { label: "pcs", value: "pcs", type: "count" },
  ];

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
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 md:p-6 rounded-3xl shadow-sm border mt-4">
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
        <div className="bg-white p-4 md:p-6 rounded-3xl border shadow-sm">
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
        <div className="bg-white p-4 md:p-6 rounded-3xl border shadow-sm">
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
                <div className="p-4 md:p-6 flex gap-6 min-w-[1000px]"> 
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
                      {units.map((unit) => (
    <option key={unit.value} value={unit.value}>
      {unit.label}
    </option>
  ))}
                      {/* <option value="ml">ml</option><option value="liter">liter</option><option value="kg">kg</option><option value="unit">Unit</option> */}
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
              <div className="px-4 md:px-6 pb-6">
                <div className="bg-gray-50/50 p-4 md:p-5 rounded-2xl border border-dashed border-gray-200">
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
        <div className="bg-white p-4 md:p-6 rounded-3xl border shadow-sm">
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