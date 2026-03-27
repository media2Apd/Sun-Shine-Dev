import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiSearch, FiMoreHorizontal, FiInbox } from "react-icons/fi";
import api from "../common/apiClient";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";

const ProductList = () => {
  const navigate = useNavigate();
  
  // States
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // For the filter dropdown
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  
  // Dropdown States
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  // Refs for positioning and outside click
  const btnRefs = useRef({});
  const menuRef = useRef(null);

  // Fetch Products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api({
        url: SummaryApi.getAllProducts.url,
        method: SummaryApi.getAllProducts.method,
      });
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Categories for the filter dropdown
  const fetchCategories = async () => {
    try {
      const response = await api({
        url: SummaryApi.getAllCategories.url,
        method: SummaryApi.getAllCategories.method,
      });
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => setOpenMenuId(null);
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          !Object.values(btnRefs.current).some((btn) => btn?.contains(event.target))) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Menu positioning logic (Detects bottom of screen)
  const handleToggle = (id) => {
    if (openMenuId === id) {
      setOpenMenuId(null);
    } else {
      const rect = btnRefs.current[id].getBoundingClientRect();
      const menuHeight = 95; // Estimated height of product action menu
      const spaceBelow = window.innerHeight - rect.bottom;
      
      // If not enough space below, show menu above the button
      const top = spaceBelow < menuHeight ? rect.top - menuHeight - 5 : rect.bottom + 5;
      const left = rect.right - 150;

      setMenuPosition({ top, left });
      setOpenMenuId(id);
    }
  };

  // Delete Product Handler
  // const handleDeleteProduct = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this product?")) {
  //     try {
  //       // Replace with your actual delete API endpoint if available in SummaryApi
  //       toast.loading("Deleting product...");
  //       // const response = await api({ ... }) 
  //       // if(response.data.success) { fetchProducts(); toast.success("Deleted"); }
  //       setOpenMenuId(null);
  //       toast.dismiss();
  //       toast.success("Delete functionality triggered for ID: " + id);
  //     } catch (error) {
  //       toast.error("Failed to delete product");
  //     }
  //   }
  // };

  // Filter Logic
  const filteredProducts = products.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const catName = item.category?.name || item.category;
    const categoryMatch = selectedCategory ? catName === selectedCategory : true;
    
    const statusMatch = selectedStatus 
      ? (selectedStatus === "Show" ? item.showOnWebsite : !item.showOnWebsite) 
      : true;

    return nameMatch && categoryMatch && statusMatch;
  });

  return (
    <div className="p-1">
      <div className="text-xl md:text-2xl font-bold pb-4">Product List</div>

      {/* Header Actions / Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 mb-6">
        
        {/* Category Filter */}
        <select 
          className="border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select 
          className="border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Show">Show</option>
          <option value="Hide">Hide</option>
        </select>

        {/* Search Input */}
        <div className="relative w-full md:w-auto">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-64 focus:ring-2 focus:ring-green-500 outline-none text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Create Button */}
        <button 
          onClick={() => navigate("/admin-panel/product-list/create-product")} 
          className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-700 transition-all shadow-md shrink-0"
        >
          <FiPlus size={26} />
        </button>
      </div>

      <div className="bg-white rounded-xl overflow-x-auto min-h-[400px]">
        <table className="min-w-full border-separate border-spacing-y-3 px-2">
          <thead className="text-sm">
            <tr className="text-center bg-gray-100">
              <th className="py-4 px-4 rounded-l-lg font-semibold">Product</th>
              <th className="py-4 px-4 font-semibold">Category</th>
              <th className="py-4 px-4 font-semibold">Stock</th>
              <th className="py-4 px-4 font-semibold">Created</th>
              <th className="py-4 px-4 font-semibold">Status</th>
              <th className="py-4 px-4 rounded-r-lg font-semibold">Action</th>
            </tr>
          </thead>
          
          <tbody>
            {loading ? (
              /* LOADING STATE */
              <tr>
                <td colSpan="6" className="py-20 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 text-sm animate-pulse">Fetching Products...</p>
                  </div>
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              /* EMPTY STATE */
              <tr>
                <td colSpan="6" className="py-20 text-center bg-white border border-gray-100 rounded-xl">
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <FiInbox size={48} className="opacity-20" />
                    <p className="text-sm font-medium">No products found</p>
                    <button 
                      onClick={() => navigate("/admin-panel/product-list/create-product")}
                      className="text-green-600 text-xs hover:underline mt-2"
                    >
                      + Add your first product
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              /* DATA RENDERING */
              filteredProducts.map((item) => (
                <tr key={item._id} className="text-sm text-center group">
                  {/* Name */}
                  <td className="py-4 px-4 bg-white border-y border-l border-gray-100 rounded-l-xl font-medium text-gray-700">
                    {item.name}
                  </td>
                  
                  {/* Category */}
                  <td className="py-4 px-4 bg-white border-y border-gray-100 font-medium">
                    {item.category?.name || item.category || "N/A"}
                  </td>

                  {/* Stock Calculation */}
                  <td className="py-4 px-4 bg-white border-y border-gray-100 text-gray-600">
                    {item.variants?.reduce((t, v) => t + Number(v.stock || 0), 0) || 0}
                  </td>

                  {/* Date */}
                  <td className="py-4 px-4 bg-white border-y border-gray-100 text-gray-500 italic">
                    {new Date(item.createdAt).toLocaleDateString('en-GB', { 
                        day: '2-digit', month: 'short', year: 'numeric' 
                    })}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 bg-white border-y border-gray-100">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${item.showOnWebsite ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {item.showOnWebsite ? "● Show" : "● Hide"}
                    </span>
                  </td>

                  {/* Action Menu */}
                  <td className="py-4 px-4 bg-white border-y border-r border-gray-100 rounded-r-xl relative">
                    <button
                      ref={(el) => (btnRefs.current[item._id] = el)}
                      onClick={() => handleToggle(item._id)}
                      className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-800 transition-colors"
                    >
                      <FiMoreHorizontal size={20} />
                    </button>

                    {openMenuId === item._id && (
                      <div
                        ref={menuRef}
                        className="fixed w-40 bg-white border border-gray-100 rounded-xl shadow-xl text-sm z-[9999] overflow-hidden"
                        style={{ top: menuPosition.top, left: menuPosition.left }}
                      >
                        <button 
                          onClick={() => { setOpenMenuId(null); navigate(`/admin-panel/product-list/view-product/${item._id}`); }} 
                          className="block w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 transition-colors"
                        >
                          View Details
                        </button>
                        <button 
                          onClick={() => { setOpenMenuId(null); navigate(`/admin-panel/product-list/edit-product/${item._id}`); }} 
                          className="block w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 transition-colors"
                        >
                          Edit Product
                        </button>
                        {/* <button 
                          onClick={() => handleDeleteProduct(item._id)}
                          className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors font-medium"
                        >
                          Delete Product
                        </button> */}
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;