
// import { useContext, useState, useRef, useEffect } from "react";
// import { CategoryContext } from "../Context/CategoryContext";
// import { useNavigate } from "react-router-dom";
// import { FiPlus, FiCalendar, FiSearch, FiMoreHorizontal } from "react-icons/fi";
// import { ProductContext } from "../Context/ProductContext";

// const CategoryList = () => {
//   const { category, deleteCategory, toggleHideCategory } = useContext(CategoryContext);
//   const navigate = useNavigate();
//   const { products } = useContext(ProductContext);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [openMenuId, setOpenMenuId] = useState(null);
//   const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

//   const btnRefs = useRef({});
//   const menuRef = useRef(null); // ✅ NEW

//   const handleToggle = (id) => {
//     if (openMenuId === id) {
//       setOpenMenuId(null);
//     } else {
//       const rect = btnRefs.current[id].getBoundingClientRect();

//       let top = rect.bottom + 5;
//       let left = rect.right - 140;

//       if (window.innerHeight - rect.bottom < 150) {
//         top = rect.top - 150;
//       }

//       if (window.innerWidth - rect.right < 150) {
//         left = rect.left - 120;
//       }

//       setMenuPosition({ top, left });
//       setOpenMenuId(id);
//     }
//   };

//   // ✅ OUTSIDE CLICK CLOSE
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target) &&
//         !Object.values(btnRefs.current).some((btn) =>
//           btn?.contains(event.target)
//         )
//       ) {
//         setOpenMenuId(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const visibleProducts = category;

//   const filteredProducts = visibleProducts
//     .filter(
//       (item) =>
//         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.category?.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .filter((item) =>
//       selectedDate
//         ? item.createdDate === new Date(selectedDate).toLocaleDateString()
//         : true
//     );

//   return (
//     <div className="p-1">

//       <div className="text-xl md:text-2xl font-bold pb-4">
//         Product Category List
//       </div>

//       <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 mb-6">

//         <div className="relative w-full md:w-auto">
//           <FiCalendar className="absolute left-3 top-3 text-gray-400" />
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         <div className="relative w-full md:w-auto">
//           <FiSearch className="absolute left-3 top-3 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         <button
//           onClick={() => navigate("/admin-panel/create-category")}
//           className="bg-green-600 text-white w-10 h-10 items-center justify-center rounded-full hover:bg-green-700 hidden min-[431px]:flex"
//         >
//           <FiPlus size={26} />
//         </button>

//         <button
//           onClick={() => navigate("/admin-panel/create-category")}
//           className="bg-green-600 text-white px-3 py-2 rounded-lg w-full max-[430px]:block hidden"
//         >
//           + Add
//         </button>

//       </div>

//       <div className="bg-white rounded-xl overflow-x-auto">

//         <table className="min-w-full border-separate border-spacing-y-3">

//           <thead className="text-sm text-gray-600">
//             <tr className="text-center bg-gray-100">
//               <th className="py-4 px-4 rounded-l-lg">Name</th>
//               <th className="py-4 px-4">Products</th>
//               <th className="py-4 px-4">Status</th>
//               <th className="py-4 px-4">Visibility</th>
//               <th className="py-4 px-4">Created</th>
//               <th className="py-4 px-4 rounded-r-lg">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredProducts.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="p-4 text-center text-gray-400">
//                   No matching category found
//                 </td>
//               </tr>
//             ) : (
//               filteredProducts.map((item) => (

//                 <tr key={item.id} className="text-sm text-center">

//                   <td className="py-4 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">
//                     {item.name}
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {
//                       products.filter((p) => p.category === item.name).length
//                     }
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {item.status}
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {item.showOnWebsite ? "Visible" : "Hidden"}
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {item.createdDate}
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg">

//                     <button
//                       ref={(el) => (btnRefs.current[item.id] = el)}
//                       onClick={() => handleToggle(item.id)}
//                     >
//                       <FiMoreHorizontal />
//                     </button>

//                     {openMenuId === item.id && (
//                       <div
//                         ref={menuRef} // ✅ IMPORTANT
//                         className="fixed w-32 bg-white border rounded-lg shadow-lg text-sm z-[9999]"
//                         style={{
//                           top: menuPosition.top,
//                           left: menuPosition.left,
//                         }}
//                       >

//                         <button
//                           onClick={() => navigate(`/admin-panel/view-category/${item.id}`)}
//                           className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                         >
//                           View
//                         </button>

//                         <button
//                  onClick={() =>
//               navigate(`/admin-panel/edit-category/${item.id}`, { state: { category: item } })
//                   }
//                   className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                   >
//                  Edit
//                 </button>

//                         <button
//                           onClick={() => toggleHideCategory(item.id)}
//                           className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                         >
//                           {item.showOnWebsite ? "Hide" : "Show"}
//                         </button>

//                         <button
//                           onClick={() => deleteCategory(item.id)}
//                           className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
//                         >
//                           Delete
//                         </button>

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
import { FiPlus, FiSearch, FiMoreHorizontal } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";

const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const btnRefs = useRef({});
  // const menuRef = useRef(null);

  // 1. Fetch Categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios({
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

  // 2. Delete Category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const response = await axios({
        url: SummaryApi.deleteCategory.url(id),
        method: SummaryApi.deleteCategory.method,
      });
      if (response.data.success) {
        toast.success("Category deleted");
        fetchCategories(); // Refresh list
      }
    } catch (error) {
      toast.error("Error deleting category");
    }
  };

  // 3. Toggle Visibility
  const handleToggleVisibility = async (item) => {
    try {
      const response = await axios({
        url: SummaryApi.updateCategory.url(item._id),
        method: SummaryApi.updateCategory.method,
        data: { showOnWebsite: !item.showOnWebsite },
      });
      if (response.data.success) {
        toast.success("Visibility updated");
        fetchCategories();
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  // Menu Toggle Logic
  const handleToggleMenu = (id) => {
    if (openMenuId === id) {
      setOpenMenuId(null);
    } else {
      const rect = btnRefs.current[id].getBoundingClientRect();
      setMenuPosition({ top: rect.bottom + window.scrollY, left: rect.left - 100 });
      setOpenMenuId(id);
    }
  };

  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Category List</h2>
        <div className="flex gap-2">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 border rounded-lg outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => navigate("/admin-panel/create-category")}
            className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
          >
            <FiPlus size={24} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 border-b">Category Name</th>
              <th className="p-4 border-b text-center">Status</th>
              <th className="p-4 border-b text-center">Visibility</th>
              <th className="p-4 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="text-center p-10">Loading...</td></tr>
            ) : filteredCategories.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="p-4 border-b font-medium">{item.name}</td>
                <td className="p-4 border-b text-center">
                  <span className={`px-2 py-1 rounded text-xs ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 border-b text-center">
                  {item.showOnWebsite ? "Visible" : "Hidden"}
                </td>
                <td className="p-4 border-b text-center relative">
                  <button ref={el => btnRefs.current[item._id] = el} onClick={() => handleToggleMenu(item._id)}>
                    <FiMoreHorizontal />
                  </button>
                  
                  {openMenuId === item._id && (
                    <div className="fixed bg-white border shadow-lg rounded-lg w-32 z-50 text-left" style={{ top: menuPosition.top, left: menuPosition.left }}>
                      <button onClick={() => navigate(`/admin-panel/view-category/${item._id}`)} className="w-full px-4 py-2 hover:bg-gray-100 border-b">View</button>
                      <button onClick={() => navigate(`/admin-panel/edit-category/${item._id}`)} className="w-full px-4 py-2 hover:bg-gray-100 border-b">Edit</button>
                      <button onClick={() => handleToggleVisibility(item)} className="w-full px-4 py-2 hover:bg-gray-100 border-b">
                        {item.showOnWebsite ? "Hide" : "Show"}
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="w-full px-4 py-2 hover:bg-gray-100 text-red-600">Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;