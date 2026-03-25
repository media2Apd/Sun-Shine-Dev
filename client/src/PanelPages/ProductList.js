// import { useContext, useState, useRef, useEffect } from "react";

// import { ProductContext } from "../Context/ProductContext";
// import { FiSearch, FiPlus } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { MoreHorizontal  } from "lucide-react";

// /* ================= ACTION MENU ================= */

// const ActionMenu = ({ item, openMenuId, setOpenMenuId }) => {

//   const { deleteProduct, toggleHideProduct } = useContext(ProductContext);
//   const navigate = useNavigate();

//   const isOpen = openMenuId === item.id;
//   const btnRef = useRef(null);

//   const [position, setPosition] = useState({ top: 0, left: 0 });

//   const handleToggle = () => {
//     if (isOpen) {
//       setOpenMenuId(null);
//     } else {
//       const rect = btnRef.current.getBoundingClientRect();

//       // smart position
//       let top = rect.bottom + 5;
//       let left = rect.right - 150;

//       // if near bottom → open மேல
//       if (window.innerHeight - rect.bottom < 150) {
//         top = rect.top - 150;
//       }

//       // if near right edge → adjust
//       if (window.innerWidth - rect.right < 150) {
//         left = rect.left - 120;
//       }

//       setPosition({ top, left });
//       setOpenMenuId(item.id);
//     }
//   };

//   return (
//     <>
//       <button
//         ref={btnRef}
//         onClick={handleToggle}
//         className="p-1 hover:bg-gray-100 rounded"
//       >
//         < MoreHorizontal size={20} />
//       </button>

//       {isOpen && (
//         <div
//           className="fixed w-40 bg-white border rounded-lg shadow-lg text-sm z-[9999]"
//           style={{ top: position.top, left: position.left }}
//         >
//           <button
//             onClick={() => deleteProduct(item.id)}
//             className="block w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100 border-b"
//           >
//             Delete
//           </button>

//           <button
//             onClick={() => toggleHideProduct(item.id)}
//             className="block w-full text-left px-3 py-2 hover:bg-gray-100 border-b"
//           >
//             {item.showOnWebsite ? "Hide" : "Show"}
//           </button>

//           <button
//             onClick={() => navigate(`/admin-panel/edit-product/${item.id}`)}
//             className="block w-full text-left px-3 py-2 hover:bg-gray-100 border-b"
//           >
//             Edit
//           </button>

//           <button
//             onClick={() => navigate(`/admin-panel/view-product/${item.id}`)}
//             className="block w-full text-left px-3 py-2 text-green-600 hover:bg-gray-100"
//           >
//             View
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// /* ================= PRODUCT LIST ================= */

// const ProductList = () => {

//   const { products } = useContext(ProductContext);
//   const navigate = useNavigate();

//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [subCategory] = useState("");
//   const [status, setStatus] = useState("");
//   const [openMenuId, setOpenMenuId] = useState(null);

//   const categories = [...new Set(products.map((p) => p.category))];

//   const filteredProducts = products
//     .filter((item) =>
//       item.name.toLowerCase().includes(search.toLowerCase())
//     )
//     .filter((item) =>
//       category ? item.category === category : true
//     )
//     .filter((item) =>
//       subCategory ? item.subCategory === subCategory : true
//     )
//     .filter((item) =>
//       status
//         ? status === "Show"
//           ? item.showOnWebsite === true
//           : item.showOnWebsite === false
//         : true
//     );

//   return (
//     <div className="p-1">

//       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
//         <h2 className="text-xl md:text-2xl font-bold">Products</h2>

//         <button className="bg-green-600 text-white px-3 py-1 rounded-lg w-full md:w-auto">
//           Export
//         </button>
//       </div>

//       <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-6">

//         <div className="flex flex-col md:flex-row gap-3 w-full">

//           <select
//             className="border px-3 py-2 rounded-lg w-full md:w-auto"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">All Categories</option>
//             {categories.map((cat, i) => (
//               <option key={i}>{cat}</option>
//             ))}
//           </select>

//           <select
//             className="border px-3 py-2 rounded-lg w-full md:w-auto"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//           >
//             <option value="">All Status</option>
//             <option value="Hide">Hide</option>
//             <option value="Show">Show</option>
//           </select>

//         </div>

//         <div className="flex gap-2">

//           <div className="relative">
//             <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           <button
//             onClick={() => navigate("/admin-panel/product-list/create-product")}
//             className="bg-green-600 text-white px-3 py-2 rounded-lg"
//           >
//             <FiPlus />
//           </button>

//         </div>

//       </div>

//       <div className="bg-white rounded-xl overflow-x-auto">

//         <table className="min-w-full border-separate border-spacing-y-3 text-sm">

//           <thead>
//             <tr className="bg-gray-100 text-center">
//               <th className="py-3 px-4 rounded-l-lg">Category</th>
//               <th className="py-3 px-4">Product</th>
//               <th className="py-3 px-4">Stock</th>
//               <th className="py-3 px-4">Date</th>
//               <th className="py-3 px-4">Status</th>
//               <th className="py-3 px-4 rounded-r-lg">Action</th>
//             </tr>
//           </thead>

//           <tbody>

//             {filteredProducts.map((item) => (

//               <tr key={item.id} className="text-center">

//                 <td className="py-3 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">
//                   {item.category}
//                 </td>

//                 <td className="py-3 px-4 bg-white border-y border-gray-200">
//                   {item.name}
//                 </td>

//                 <td className="py-3 px-4 bg-white border-y border-gray-200">
//                   {item.variants?.reduce(
//                     (t, v) => t + Number(v.stock || 0), 0
//                   )}
//                 </td>

//                 <td className="py-3 px-4 bg-white border-y border-gray-200">
//                   {item.date}
//                 </td>

//                 <td className="py-3 px-4 bg-white border-y border-gray-200">
//                   {item.showOnWebsite ? (
//                     <span className="text-green-600">● Show</span>
//                   ) : (
//                     <span className="text-red-500">● Hide</span>
//                   )}
//                 </td>

//                 <td className="py-3 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg">
//                   <ActionMenu
//                     item={item}
//                     openMenuId={openMenuId}
//                     setOpenMenuId={setOpenMenuId}
//                   />
//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// };

// export default ProductList;

// import { useContext, useState, useRef, useEffect } from "react";
// import { ProductContext } from "../Context/ProductContext";
// import { FiSearch, FiPlus } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { MoreHorizontal } from "lucide-react";

// /* ================= ACTION MENU ================= */

// const ActionMenu = ({ item, openMenuId, setOpenMenuId }) => {

//   const { deleteProduct, toggleHideProduct } = useContext(ProductContext);
//   const navigate = useNavigate();

//   const isOpen = openMenuId === item.id;
//   const btnRef = useRef(null);
//   const menuRef = useRef(null); // ✅ NEW

//   const [position, setPosition] = useState({ top: 0, left: 0 });

//   const handleToggle = () => {
//     if (isOpen) {
//       setOpenMenuId(null);
//     } else {
//       const rect = btnRef.current.getBoundingClientRect();

//       let top = rect.bottom + 5;
//       let left = rect.right - 150;

//       if (window.innerHeight - rect.bottom < 150) {
//         top = rect.top - 150;
//       }

//       if (window.innerWidth - rect.right < 150) {
//         left = rect.left - 120;
//       }

//       setPosition({ top, left });
//       setOpenMenuId(item.id);
//     }
//   };

//   // ✅ OUTSIDE CLICK CLOSE
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target) &&
//         !btnRef.current.contains(event.target)
//       ) {
//         setOpenMenuId(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [setOpenMenuId]);

//   return (
//     <>
//       <button
//         ref={btnRef}
//         onClick={handleToggle}
//         className="p-1 hover:bg-gray-100 rounded"
//       >
//         <MoreHorizontal size={20} />
//       </button>

//       {isOpen && (
//         <div
//           ref={menuRef} // ✅ IMPORTANT
//           className="fixed w-40 bg-white border rounded-lg shadow-lg text-sm z-[9999]"
//           style={{ top: position.top, left: position.left }}
//         >
//           <button
//             onClick={() => deleteProduct(item.id)}
//             className="block w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100 border-b"
//           >
//             Delete
//           </button>

//           <button
//             onClick={() => toggleHideProduct(item.id)}
//             className="block w-full text-left px-3 py-2 hover:bg-gray-100 border-b"
//           >
//             {item.showOnWebsite ? "Hide" : "Show"}
//           </button>

//           <button
//             onClick={() => navigate(`/admin-panel/edit-product/${item.id}`)}
//             className="block w-full text-left px-3 py-2 hover:bg-gray-100 border-b"
//           >
//             Edit
//           </button>

//           <button
//             onClick={() => navigate(`/admin-panel/view-product/${item.id}`)}
//             className="block w-full text-left px-3 py-2 text-green-600 hover:bg-gray-100"
//           >
//             View
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// /* ================= PRODUCT LIST ================= */

// const ProductList = () => {

//   const { products } = useContext(ProductContext);
//   const navigate = useNavigate();

//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [subCategory] = useState("");
//   const [status, setStatus] = useState("");
//   const [openMenuId, setOpenMenuId] = useState(null);

//   const categories = [...new Set(products.map((p) => p?.category?.name))];

//   const filteredProducts = products
//     .filter((item) =>
//       item.name.toLowerCase().includes(search.toLowerCase())
//     )
//     .filter((item) =>
//       category ? item?.category?.name === category : true
//     )
//     .filter((item) =>
//       subCategory ? item.subCategory === subCategory : true
//     )
//     .filter((item) =>
//       status
//         ? status === "Show"
//           ? item.showOnWebsite === true
//           : item.showOnWebsite === false
//         : true
//     );

//   return (
//     <div className="p-1">

//       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
//         <h2 className="text-xl md:text-2xl font-bold">Products</h2>

//         <button className="bg-green-600 text-white px-3 py-1 rounded-lg w-full md:w-auto">
//           Export
//         </button>
//       </div>

//       <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-6">

//         <div className="flex flex-col md:flex-row gap-3 w-full">

//           <select
//             className="border px-3 py-2 rounded-lg w-full md:w-auto"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">All Categories</option>
//             {categories.map((cat, i) => (
//               <option key={i}>{cat}</option>
//             ))}
//           </select>

//           <select
//             className="border px-3 py-2 rounded-lg w-full md:w-auto"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//           >
//             <option value="">All Status</option>
//             <option value="Hide">Hide</option>
//             <option value="Show">Show</option>
//           </select>

//         </div>

//         <div className="flex gap-2">

//           <div className="relative">
//             <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           <button
//             onClick={() => navigate("/admin-panel/product-list/create-product")}
//             className="bg-green-600 text-white px-3 py-2 rounded-lg"
//           >
//             <FiPlus />
//           </button>

//         </div>

//       </div>

//       <div className="bg-white rounded-xl overflow-x-auto">

//         <table className="min-w-full border-separate border-spacing-y-3 text-sm">

//           <thead>
//             <tr className="bg-gray-100 text-center">
//               <th className="py-3 px-4 rounded-l-lg">Category</th>
//               <th className="py-3 px-4">Product</th>
//               <th className="py-3 px-4">Stock</th>
//               <th className="py-3 px-4">Date</th>
//               <th className="py-3 px-4">Status</th>
//               <th className="py-3 px-4 rounded-r-lg">Action</th>
//             </tr>
//           </thead>

//           <tbody>

//             {filteredProducts.map((item) => (

//               <tr key={item.id} className="text-center">

//                 <td className="py-3 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">
//                   {item?.category?.name}
//                 </td>

//                 <td className="py-3 px-4 bg-white border-y border-gray-200">
//                   {item.name}
//                 </td>

//                 <td className="py-3 px-4 bg-white border-y border-gray-200">
//                   {item.variants?.reduce(
//                     (t, v) => t + Number(v.stock || 0), 0
//                   )}
//                 </td>

//                 <td className="py-3 px-4 bg-white border-y border-gray-200">
//                   {item.date}
//                 </td>

//                 <td className="py-3 px-4 bg-white border-y border-gray-200">
//                   {item.showOnWebsite ? (
//                     <span className="text-green-600">● Show</span>
//                   ) : (
//                     <span className="text-red-500">● Hide</span>
//                   )}
//                 </td>

//                 <td className="py-3 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg">
//                   <ActionMenu
//                     item={item}
//                     openMenuId={openMenuId}
//                     setOpenMenuId={setOpenMenuId}
//                   />
//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// };

// export default ProductList;


// import { useContext, useState, useRef, useEffect } from "react";
// import { ProductContext } from "../Context/ProductContext";
// import { FiSearch, FiPlus, FiImage } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { MoreHorizontal } from "lucide-react";

// /* ================= ACTION MENU ================= */

// const ActionMenu = ({ item, openMenuId, setOpenMenuId }) => {
//   const { deleteProduct, toggleHideProduct } = useContext(ProductContext);
//   const navigate = useNavigate();

//   // Reference item._id instead of item.id
//   const isOpen = openMenuId === item._id;
//   const btnRef = useRef(null);
//   const menuRef = useRef(null);

//   const [position, setPosition] = useState({ top: 0, left: 0 });

//   const handleToggle = () => {
//     if (isOpen) {
//       setOpenMenuId(null);
//     } else {
//       const rect = btnRef.current.getBoundingClientRect();
//       let top = rect.bottom + 5;
//       let left = rect.right - 150;

//       if (window.innerHeight - rect.bottom < 150) {
//         top = rect.top - 150;
//       }
//       if (window.innerWidth - rect.right < 150) {
//         left = rect.left - 120;
//       }

//       setPosition({ top, left });
//       setOpenMenuId(item._id); // Use _id
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target) &&
//         !btnRef.current.contains(event.target)
//       ) {
//         setOpenMenuId(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [setOpenMenuId]);

//   return (
//     <>
//       <button
//         ref={btnRef}
//         onClick={handleToggle}
//         className="p-1 hover:bg-gray-100 rounded transition-colors"
//       >
//         <MoreHorizontal size={20} />
//       </button>

//       {isOpen && (
//         <div
//           ref={menuRef}
//           className="fixed w-40 bg-white border border-gray-200 rounded-lg shadow-xl text-sm z-[9999] overflow-hidden animate-in fade-in zoom-in duration-100"
//           style={{ top: position.top, left: position.left }}
//         >
//           <button
//             onClick={() => {
//                 deleteProduct(item._id);
//                 setOpenMenuId(null);
//             }}
//             className="block w-full text-left px-4 py-2.5 text-red-500 hover:bg-red-50 border-b border-gray-50"
//           >
//             Delete Product
//           </button>

//           <button
//             onClick={() => {
//                 toggleHideProduct(item._id);
//                 setOpenMenuId(null);
//             }}
//             className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 border-b border-gray-50"
//           >
//             {item.showOnWebsite ? "Hide from Site" : "Show on Site"}
//           </button>

//           <button
//             onClick={() => navigate(`/admin-panel/edit-product/${item._id}`)}
//             className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 border-b border-gray-50"
//           >
//             Edit Details
//           </button>

//           <button
//             onClick={() => navigate(`/admin-panel/view-product/${item._id}`)}
//             className="block w-full text-left px-4 py-2.5 text-green-600 hover:bg-green-50"
//           >
//             View Full Data
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// /* ================= PRODUCT LIST ================= */

// const ProductList = () => {
//   const { products } = useContext(ProductContext);
//   const navigate = useNavigate();

//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [status, setStatus] = useState("");
//   const [openMenuId, setOpenMenuId] = useState(null);

//   // Correctly extract unique category names from the object structure
//   const categories = [...new Set(products.map((p) => p.category?.name || "Uncategorized"))].filter(Boolean);

//   const filteredProducts = products
//     .filter((item) =>
//       item.name.toLowerCase().includes(search.toLowerCase())
//     )
//     .filter((item) =>
//       category ? (item.category?.name === category) : true
//     )
//     .filter((item) =>
//       status
//         ? status === "Show"
//           ? item.showOnWebsite === true
//           : item.showOnWebsite === false
//         : true
//     );

//   return (
//     <div className="p-4 bg-gray-50 min-h-screen">
//       {/* HEADER SECTION */}
//       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
//         <div>
//             <h2 className="text-2xl font-bold text-gray-800">Product Inventory</h2>
//             <p className="text-sm text-gray-500">Manage your product catalog and visibility</p>
//         </div>

//         <div className="flex gap-2">
//             <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-all">
//             Export CSV
//             </button>
//             <button 
//                 onClick={() => navigate("/admin-panel/product-list/create-product")}
//                 className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-green-700 shadow-sm transition-all active:scale-95"
//             >
//                 <FiPlus /> Add Product
//             </button>
//         </div>
//       </div>

//       {/* FILTER BAR */}
//       <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:justify-between gap-4 mb-6">
//         <div className="flex flex-wrap gap-3">
//           <select
//             className="border border-gray-200 px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">All Categories</option>
//             {categories.map((cat, i) => (
//               <option key={i} value={cat}>{cat}</option>
//             ))}
//           </select>

//           <select
//             className="border border-gray-200 px-3 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//           >
//             <option value="">Status: All</option>
//             <option value="Show">Visible Only</option>
//             <option value="Hide">Hidden Only</option>
//           </select>
//         </div>

//         <div className="relative w-full md:w-64">
//           <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by name..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500 transition-all"
//           />
//         </div>
//       </div>

//       {/* TABLE SECTION */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-gray-50/50 border-b border-gray-100">
//                 <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Product Info</th>
//                 <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Category</th>
//                 <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Available Stock</th>
//                 <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Date Added</th>
//                 <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
//                 <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-50">
//               {filteredProducts.map((item) => (
//                 <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
//                   <td className="py-4 px-6">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden border border-gray-200 flex items-center justify-center shrink-0">
//                         {item.images && item.images[0] ? (
//                           <img 
//                             src={item.images[0].url} 
//                             alt={item.name} 
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <FiImage className="text-gray-400" />
//                         )}
//                       </div>
//                       <div>
//                         <p className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</p>
//                         <p className="text-[10px] text-gray-400 uppercase tracking-tight">{item.code || 'NO-CODE'}</p>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="py-4 px-6 text-center">
//                     <span className="inline-block px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold">
//                       {item.category?.name || "N/A"}
//                     </span>
//                   </td>

//                   <td className="py-4 px-6 text-center">
//                     <span className={`font-mono text-sm ${item.variants?.reduce((t, v) => t + Number(v.stock || 0), 0) > 10 ? 'text-gray-600' : 'text-orange-500 font-bold'}`}>
//                       {item.variants?.reduce((t, v) => t + Number(v.stock || 0), 0)}
//                     </span>
//                   </td>

//                   <td className="py-4 px-6 text-center text-gray-500 text-sm">
//                     {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
//                   </td>

//                   <td className="py-4 px-6 text-center">
//                     {item.showOnWebsite ? (
//                       <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-[11px] font-bold">
//                         <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Live
//                       </span>
//                     ) : (
//                       <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 text-[11px] font-bold">
//                         <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Hidden
//                       </span>
//                     )}
//                   </td>

//                   <td className="py-4 px-6 text-right">
//                     <ActionMenu
//                       item={item}
//                       openMenuId={openMenuId}
//                       setOpenMenuId={setOpenMenuId}
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
        
//         {filteredProducts.length === 0 && (
//           <div className="py-20 text-center flex flex-col items-center">
//              <FiSearch size={40} className="text-gray-200 mb-2" />
//              <p className="text-gray-400 font-medium">No products found matching your filters.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductList;


// import { useContext, useState, useRef, useEffect } from "react";
// import { ProductContext } from "../Context/ProductContext";
// import { FiSearch, FiPlus } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { MoreHorizontal } from "lucide-react";

// /* ================= ACTION MENU ================= */

// const ActionMenu = ({ item, openMenuId, setOpenMenuId }) => {
//   const { deleteProduct, toggleHideProduct } = useContext(ProductContext);
//   const navigate = useNavigate();

//   // Changed to use _id based on your data format
//   const isOpen = openMenuId === item._id;
//   const btnRef = useRef(null);
//   const menuRef = useRef(null);

//   const [position, setPosition] = useState({ top: 0, left: 0 });

//   const handleToggle = () => {
//     if (isOpen) {
//       setOpenMenuId(null);
//     } else {
//       const rect = btnRef.current.getBoundingClientRect();

//       let top = rect.bottom + 5;
//       let left = rect.right - 150;

//       if (window.innerHeight - rect.bottom < 150) {
//         top = rect.top - 150;
//       }

//       if (window.innerWidth - rect.right < 150) {
//         left = rect.left - 120;
//       }

//       setPosition({ top, left });
//       setOpenMenuId(item._id); // Use _id
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target) &&
//         !btnRef.current.contains(event.target)
//       ) {
//         setOpenMenuId(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [setOpenMenuId]);

//   return (
//     <>
//       <button
//         ref={btnRef}
//         onClick={handleToggle}
//         className="p-1 hover:bg-gray-100 rounded"
//       >
//         <MoreHorizontal size={20} />
//       </button>

//       {isOpen && (
//         <div
//           ref={menuRef}
//           className="fixed w-40 bg-white border rounded-lg shadow-lg text-sm z-[9999]"
//           style={{ top: position.top, left: position.left }}
//         >
//           <button
//             onClick={() => deleteProduct(item._id)}
//             className="block w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100 border-b"
//           >
//             Delete
//           </button>

//           <button
//             onClick={() => toggleHideProduct(item._id)}
//             className="block w-full text-left px-3 py-2 hover:bg-gray-100 border-b"
//           >
//             {item.showOnWebsite ? "Hide" : "Show"}
//           </button>

//           <button
//             onClick={() => navigate(`/admin-panel/edit-product/${item._id}`)}
//             className="block w-full text-left px-3 py-2 hover:bg-gray-100 border-b"
//           >
//             Edit
//           </button>

//           <button
//             onClick={() => navigate(`/admin-panel/view-product/${item._id}`)}
//             className="block w-full text-left px-3 py-2 text-green-600 hover:bg-gray-100"
//           >
//             View
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// /* ================= PRODUCT LIST ================= */

// const ProductList = () => {
//   const { products } = useContext(ProductContext);
//   const navigate = useNavigate();

//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [status, setStatus] = useState("");
//   const [openMenuId, setOpenMenuId] = useState(null);

//   // Extract category names handling the object structure { _id, name }
//   const categories = [...new Set(products.map((p) => p.category?.name || p.categoryId))].filter(Boolean);

//   const filteredProducts = products
//     .filter((item) =>
//       item.name.toLowerCase().includes(search.toLowerCase())
//     )
//     .filter((item) => {
//       if (!category) return true;
//       const catName = item.category?.name || item.categoryId;
//       return catName === category;
//     })
//     .filter((item) =>
//       status
//         ? status === "Show"
//           ? item.showOnWebsite === true
//           : item.showOnWebsite === false
//         : true
//     );

//   // Helper to format Date
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   return (
//     <div className="p-1">
//       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
//         <h2 className="text-xl md:text-2xl font-bold">Products</h2>
//         <button className="bg-green-600 text-white px-3 py-1 rounded-lg w-full md:w-auto">
//           Export
//         </button>
//       </div>

//       <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-6">
//         <div className="flex flex-col md:flex-row gap-3 w-full">
//           <select
//             className="border px-3 py-2 rounded-lg w-full md:w-auto outline-none focus:ring-1 focus:ring-green-500"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">All Categories</option>
//             {categories.map((cat, i) => (
//               <option key={i} value={cat}>{cat}</option>
//             ))}
//           </select>

//           <select
//             className="border px-3 py-2 rounded-lg w-full md:w-auto outline-none focus:ring-1 focus:ring-green-500"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//           >
//             <option value="">All Status</option>
//             <option value="Hide">Hide</option>
//             <option value="Show">Show</option>
//           </select>
//         </div>

//         <div className="flex gap-2">
//           <div className="relative">
//             <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search product name..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
//             />
//           </div>

//           <button
//             onClick={() => navigate("/admin-panel/product-list/create-product")}
//             className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
//           >
//             <FiPlus />
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl overflow-x-auto shadow-sm">
//         <table className="min-w-full border-separate border-spacing-y-3 text-sm">
//           <thead>
//             <tr className="bg-gray-100 text-center">
//               <th className="py-3 px-4 rounded-l-lg font-semibold text-gray-600">Category</th>
//               <th className="py-3 px-4 font-semibold text-gray-600">Product</th>
//               <th className="py-3 px-4 font-semibold text-gray-600">Stock</th>
//               <th className="py-3 px-4 font-semibold text-gray-600">Date</th>
//               <th className="py-3 px-4 font-semibold text-gray-600">Status</th>
//               <th className="py-3 px-4 rounded-r-lg font-semibold text-gray-600">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredProducts.map((item) => (
//               <tr key={item._id} className="text-center group">
//                 <td className="py-3 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">
//                   {item.category?.name || "N/A"}
//                 </td>

//                 <td className="py-3 px-4 bg-white border-y border-gray-200 font-medium">
//                   {item.name}
//                 </td>

//                 <td className="py-3 px-4 bg-white border-y border-gray-200">
//                   {item.variants?.reduce(
//                     (total, variant) => total + (Number(variant.stock) || 0), 0
//                   )}
//                 </td>

//                 <td className="py-3 px-4 bg-white border-y border-gray-200 text-gray-500">
//                   {formatDate(item.createdAt)}
//                 </td>

//                 <td className="py-3 px-4 bg-white border-y border-gray-200">
//                   {item.showOnWebsite ? (
//                     <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
//                       ● Show
//                     </span>
//                   ) : (
//                     <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold">
//                       ● Hide
//                     </span>
//                   )}
//                 </td>

//                 <td className="py-3 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg">
//                   <ActionMenu
//                     item={item}
//                     openMenuId={openMenuId}
//                     setOpenMenuId={setOpenMenuId}
//                   />
//                 </td>
//               </tr>
//             ))}
            
//             {filteredProducts.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="py-10 text-center text-gray-400 bg-white rounded-xl border border-gray-100">
//                   No products found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProductList;

import { useContext, useState, useRef, useEffect } from "react";
import { ProductContext } from "../Context/ProductContext";
import { FiSearch, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";

/* ================= ACTION MENU ================= */

const ActionMenu = ({ item, openMenuId, setOpenMenuId }) => {

  const { deleteProduct, toggleHideProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  // Updated to use item._id
  const isOpen = openMenuId === item._id;
  const btnRef = useRef(null);
  const menuRef = useRef(null); 

  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleToggle = () => {
    if (isOpen) {
      setOpenMenuId(null);
    } else {
      const rect = btnRef.current.getBoundingClientRect();

      let top = rect.bottom + 5;
      let left = rect.right - 150;

      if (window.innerHeight - rect.bottom < 150) {
        top = rect.top - 150;
      }

      if (window.innerWidth - rect.right < 150) {
        left = rect.left - 120;
      }

      setPosition({ top, left });
      setOpenMenuId(item._id); // Updated to use item._id
    }
  };

  // ✅ OUTSIDE CLICK CLOSE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !btnRef.current.contains(event.target)
      ) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenMenuId]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleToggle}
        className="p-1 hover:bg-gray-100 rounded"
      >
        <MoreHorizontal size={20} />
      </button>

      {isOpen && (
        <div
          ref={menuRef} 
          className="fixed w-40 bg-white border rounded-lg shadow-lg text-sm z-[9999]"
          style={{ top: position.top, left: position.left }}
        >
          <button
            onClick={() => deleteProduct(item._id)}
            className="block w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100 border-b"
          >
            Delete
          </button>

          <button
            onClick={() => toggleHideProduct(item._id)}
            className="block w-full text-left px-3 py-2 hover:bg-gray-100 border-b"
          >
            {item.showOnWebsite ? "Hide" : "Show"}
          </button>

          <button
            onClick={() => navigate(`/admin-panel/edit-product/${item._id}`)}
            className="block w-full text-left px-3 py-2 hover:bg-gray-100 border-b"
          >
            Edit
          </button>

          <button
            onClick={() => navigate(`/admin-panel/view-product/${item._id}`)}
            className="block w-full text-left px-3 py-2 text-green-600 hover:bg-gray-100"
          >
            View
          </button>
        </div>
      )}
    </>
  );
};

/* ================= PRODUCT LIST ================= */

const ProductList = () => {

  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory] = useState("");
  const [status, setStatus] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  // Logic updated to handle nested category object: category.name
  const categories = [...new Set(products.map((p) => p.category?.name || p.category))].filter(Boolean);

  const filteredProducts = products
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) => {
      if (!category) return true;
      const catName = item.category?.name || item.category;
      return catName === category;
    })
    .filter((item) =>
      subCategory ? item.subCategory === subCategory : true
    )
    .filter((item) =>
      status
        ? status === "Show"
          ? item.showOnWebsite === true
          : item.showOnWebsite === false
        : true
    );

  // Helper to format the MongoDB ISO date to a readable format
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="p-1">

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Products</h2>

        <button className="bg-green-600 text-white px-3 py-1 rounded-lg w-full md:w-auto">
          Export
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-6">

        <div className="flex flex-col md:flex-row gap-3 w-full">

          <select
            className="border px-3 py-2 rounded-lg w-full md:w-auto"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            className="border px-3 py-2 rounded-lg w-full md:w-auto"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Hide">Hide</option>
            <option value="Show">Show</option>
          </select>

        </div>

        <div className="flex gap-2">

          <div className="relative">
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <button
            onClick={() => navigate("/admin-panel/product-list/create-product")}
            className="bg-green-600 text-white px-3 py-2 rounded-lg"
          >
            <FiPlus />
          </button>

        </div>

      </div>

      <div className="bg-white rounded-xl overflow-x-auto">

        <table className="min-w-full border-separate border-spacing-y-3 text-sm">

          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="py-3 px-4 rounded-l-lg">Product</th>
              <th className="py-3 px-4 ">Category</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 rounded-r-lg">Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredProducts.map((item) => (

              <tr key={item._id} className="text-center">

                <td className="py-3 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">
                  {item.name}
                </td>

                <td className="py-3 px-4 bg-white border-y border-gray-200 font-medium">
                  {item.category?.name || item.category || "N/A"}
                </td>

                <td className="py-3 px-4 bg-white border-y border-gray-200">
                  {item.variants?.reduce(
                    (t, v) => t + Number(v.stock || 0), 0
                  )}
                </td>

                <td className="py-3 px-4 bg-white border-y border-gray-200">
                  {formatDate(item.createdAt)}
                </td>

                <td className="py-3 px-4 bg-white border-y border-gray-200">
                  {item.showOnWebsite ? (
                    <span className="text-green-600 font-medium">● Show</span>
                  ) : (
                    <span className="text-red-500 font-medium">● Hide</span>
                  )}
                </td>

                <td className="py-3 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg">
                  <ActionMenu
                    item={item}
                    openMenuId={openMenuId}
                    setOpenMenuId={setOpenMenuId}
                  />
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ProductList;
