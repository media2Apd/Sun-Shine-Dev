// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiPlus, FiCalendar, FiSearch, FiMoreHorizontal, FiInbox } from "react-icons/fi";
// import api from "../common/apiClient";
// import toast from "react-hot-toast";
// import SummaryApi from "../common/SummaryApi";

// const CategoryList = () => {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [openMenuId, setOpenMenuId] = useState(null);
//   const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

//   const btnRefs = useRef({});
//   const menuRef = useRef(null);

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await api({
//         url: SummaryApi.getAllCategories.url,
//         method: SummaryApi.getAllCategories.method,
//       });
//       if (response.data.success) {
//         setCategories(response.data.data);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch categories");
//     } finally {
//       // Small delay for smooth transition if needed
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Close menu on scroll
//   useEffect(() => {
//     const handleScroll = () => setOpenMenuId(null);
//     window.addEventListener("scroll", handleScroll, true);
//     return () => window.removeEventListener("scroll", handleScroll, true);
//   }, []);

//   // Menu positioning logic
//   const handleToggle = (id) => {
//     if (openMenuId === id) {
//       setOpenMenuId(null);
//     } else {
//       const rect = btnRefs.current[id].getBoundingClientRect();
//       const menuHeight = 95; 
//       const spaceBelow = window.innerHeight - rect.bottom;
      
//       const top = spaceBelow < menuHeight ? rect.top - menuHeight - 5 : rect.bottom + 5;
//       const left = rect.right - 140;

//       setMenuPosition({ top, left });
//       setOpenMenuId(id);
//     }
//   };

//   // Close on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target) && 
//           !Object.values(btnRefs.current).some((btn) => btn?.contains(event.target))) {
//         setOpenMenuId(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const filteredCategories = categories
//     .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
//     .filter((item) =>
//       selectedDate ? new Date(item.createdAt).toLocaleDateString() === new Date(selectedDate).toLocaleDateString() : true
//     );

//   return (
//     <div className="p-1">
//       <div className="text-xl md:text-2xl font-bold pb-4">Product Category List</div>

//       {/* Header Actions */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 mb-6">
//         <div className="relative w-full md:w-auto">
//           <FiCalendar className="absolute left-3 top-3 text-gray-400" />
//           <input
//             type="date"
//             className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-auto focus:ring-2 focus:ring-green-500 outline-none"
//             onChange={(e) => setSelectedDate(e.target.value)}
//           />
//         </div>
//         <div className="relative w-full md:w-auto">
//           <FiSearch className="absolute left-3 top-3 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search categories..."
//             className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-64 focus:ring-2 focus:ring-green-500 outline-none"
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <button 
//           onClick={() => navigate("/admin-panel/products-category/create-category")} 
//           className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-700 transition-all shadow-md"
//         >
//           <FiPlus size={26} />
//         </button>
//       </div>

//       <div className="bg-white rounded-xl overflow-x-auto min-h-[300px]">
//         <table className="min-w-full border-separate border-spacing-y-3 px-2">
//           <thead className="text-sm">
//             <tr className="text-left bg-gray-100">
//               <th className="py-4 px-4 rounded-l-lg font-semibold">Name</th>
//               <th className="py-4 px-4 font-semibold">Status</th>
//               <th className="py-4 px-4 font-semibold">Visibility</th>
//               <th className="py-4 px-4 font-semibold">Created</th>
//               <th className="py-4 px-4 rounded-r-lg font-semibold text-center">Action</th>
//             </tr>
//           </thead>
          
//           <tbody>
//             {/* 1. LOADING STATE */}
//             {loading ? (
//               <tr>
//                 <td colSpan="5" className="py-20 text-center">
//                   <div className="flex flex-col items-center gap-2">
//                     <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//                     <p className="text-gray-500 text-sm animate-pulse">Fetching Categories...</p>
//                   </div>
//                 </td>
//               </tr>
//             ) : 
            
//             /* 2. EMPTY DATA STATE */
//             filteredCategories.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="py-20 text-center bg-white border border-gray-100 rounded-xl">
//                   <div className="flex flex-col items-center gap-2 text-gray-400">
//                     <FiInbox size={48} className="opacity-20" />
//                     <p className="text-sm font-medium">No categories found</p>
//                     <button 
//                       onClick={() => navigate("/admin-panel/products-category/create-category")}
//                       className="text-green-600 text-xs hover:underline mt-2"
//                     >
//                       + Create your first category
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ) : (

//               /* 3. DATA RENDERING */
//               filteredCategories.map((item) => (
//                 <tr key={item._id} className="text-sm text-left group">
//                   <td className="py-4 px-4 bg-white border-y border-l border-gray-100 rounded-l-xl font-medium text-gray-700">
//                     {item.name}
//                   </td>
//                   <td className="py-4 px-4 bg-white border-y border-gray-100">
//                     <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${item.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
//                       {item.status}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4 bg-white border-y border-gray-100 text-gray-500">
//                     {item.showOnWebsite ? "Visible" : "Hidden"}
//                   </td>
//                   <td className="py-4 px-4 bg-white border-y border-gray-100 text-gray-500 italic">
//                     {new Date(item.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="py-4 px-4 bg-white border-y border-r border-gray-100 rounded-r-xl relative text-center">
//                     <button
//                       ref={(el) => (btnRefs.current[item._id] = el)}
//                       onClick={() => handleToggle(item._id)}
//                       className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-800 transition-colors"
//                     >
//                       <FiMoreHorizontal size={20} />
//                     </button>

//                     {openMenuId === item._id && (
//                       <div
//                         ref={menuRef}
//                         className="fixed w-36 bg-white border border-gray-100 rounded-xl shadow-xl text-sm z-[9999] overflow-hidden"
//                         style={{ top: menuPosition.top, left: menuPosition.left }}
//                       >
//                         <button onClick={() => navigate(`/admin-panel/products-category/view-category/${item._id}`)} className="block w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 transition-colors">View Details</button>
//                         <button onClick={() => navigate(`/admin-panel/products-category/edit-category/${item._id}`)} className="block w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 transition-colors">Edit Category</button>
//                         {/* <button className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors font-medium">Delete</button> */}
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CategoryList;


import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiCalendar, FiSearch, FiMoreHorizontal, FiInbox } from "react-icons/fi";
import api from "../common/apiClient";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import { formatDateTime } from "../helpers/formatDateTime";

const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const btnRefs = useRef({});
  const menuRef = useRef(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api({
        url: SummaryApi.getAllCategories.url,
        method: SummaryApi.getAllCategories.method,
      });
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleScroll = () => setOpenMenuId(null);
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  const handleToggle = (id) => {
    if (openMenuId === id) {
      setOpenMenuId(null);
    } else {
      const rect = btnRefs.current[id].getBoundingClientRect();
      const menuHeight = 95; 
      const spaceBelow = window.innerHeight - rect.bottom;
      
      const top = spaceBelow < menuHeight ? rect.top - menuHeight - 5 : rect.bottom + 5;
      const left = rect.right - 140;

      setMenuPosition({ top, left });
      setOpenMenuId(id);
    }
  };

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

  const filteredCategories = categories
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((item) =>
      selectedDate ? new Date(item.createdAt).toLocaleDateString() === new Date(selectedDate).toLocaleDateString() : true
    );

  return (
    <div className="p-1">
      <div className="text-xl md:text-2xl font-bold pb-4">Product Category List</div>

      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 mb-6">
        <div className="relative w-full md:w-auto">
          <FiCalendar className="absolute left-3 top-3 text-gray-400" />
          <input
            type="date"
            className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-auto focus:ring-2 focus:ring-green-500 outline-none"
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className="relative w-full md:w-auto">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-64 focus:ring-2 focus:ring-green-500 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => navigate("/admin-panel/products-category/create-category")} 
          className="bg-[#00B207] text-white w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md"
        >
          <FiPlus size={26} />
        </button>
      </div>

      <div className="rounded-xl overflow-x-auto min-h-[300px]">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead className="text-sm">
            <tr className="text-left bg-gray-100">
              <th className="py-4 px-4 rounded-l-lg font-semibold">S. No</th>
              <th className="py-4 px-4 font-semibold">Name</th>
              <th className="py-4 px-4 font-semibold">Status</th>
              <th className="py-4 px-4 font-semibold">Visibility</th>
              <th className="py-4 px-4 font-semibold">Created</th>
              <th className="py-4 px-4 rounded-r-lg font-semibold text-center">Action</th>
            </tr>
          </thead>
          
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-20 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 text-sm animate-pulse">Fetching Categories...</p>
                  </div>
                </td>
              </tr>
            ) : 
            
            filteredCategories.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-20 text-center bg-white border border-gray-100 rounded-xl">
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <FiInbox size={48} className="opacity-20" />
                    <p className="text-sm font-medium">No categories found</p>
                    <button 
                      onClick={() => navigate("/admin-panel/products-category/create-category")}
                      className="text-green-600 text-xs hover:underline mt-2"
                    >
                      + Create your first category
                    </button>
                  </div>
                </td>
              </tr>
            ) : (

              filteredCategories.map((item, index) => (
                <tr key={item._id} className="text-sm text-left group">
                  <td className="py-4 px-4 bg-white border-y border-l border-gray-100 rounded-l-xl font-medium text-gray-700">
                    {index + 1}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-100 font-medium text-gray-700">
                    {item.name}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-100">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${item.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-100 text-gray-500">
                    {item.showOnWebsite ? "Visible" : "Hidden"}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-100 text-gray-500">
                    {formatDateTime(item.createdAt, false)}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-r border-gray-100 rounded-r-xl relative text-center">
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
                        className="fixed w-36 bg-white border border-gray-100 rounded-xl shadow-xl text-sm z-[9999] overflow-hidden"
                        style={{ top: menuPosition.top, left: menuPosition.left }}
                      >
                        <button onClick={() => navigate(`/admin-panel/products-category/view-category/${item._id}`)} className="block w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 transition-colors">View Details</button>
                        <button onClick={() => navigate(`/admin-panel/products-category/edit-category/${item._id}`)} className="block w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 transition-colors">Edit Category</button>
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

export default CategoryList;