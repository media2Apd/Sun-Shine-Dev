

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiCalendar, FiSearch, FiMoreHorizontal } from "react-icons/fi";
// import { useOrder } from "../Context/OrderContext";

// const OrderlistPage = () => {
//   const { orderData, setOrderData } = useOrder();
//   const navigate = useNavigate();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [openMenuId, setOpenMenuId] = useState(null);

//   // Filter orders safely
//   const filteredOrders = orderData
//     .filter(
//       (order) =>
//         (order.customer?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
//         (order.id?.toString() || "").includes(searchTerm)
//     )
//     .filter((order) =>
//       selectedDate
//         ? order.orderDate === new Date(selectedDate).toLocaleDateString()
//         : true
//     );

//   // Delete order
//   const deleteOrder = (id) => {
//     if (window.confirm("Are you sure you want to delete this order?")) {
//       setOrderData(orderData.filter((order) => order.id !== id));
//     }
//   };

//   // Toggle status
//   const toggleOrderStatus = (id) => {
//     const updated = orderData.map((order) =>
//       order.id === id
//         ? {
//             ...order,
//             status: order.status === "Pending" ? "Completed" : "Pending",
//           }
//         : order
//     );
//     setOrderData(updated);
//   };

//   return (
//     <div className="p-1">

//       {/* TITLE */}
//       <div className="text-xl md:text-2xl font-bold pb-4">
//         Orders List
//       </div>

//       {/* FILTER SECTION */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 mb-6">

//         {/* DATE */}
//         <div className="relative w-full md:w-auto">
//           <FiCalendar className="absolute left-3 top-3 text-gray-400" />
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         {/* SEARCH */}
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

//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-xl overflow-x-auto">
//         <table className="min-w-full border-separate border-spacing-y-3">

//           {/* HEADER */}
//           <thead className="text-sm text-gray-600">
//             <tr className="text-center bg-gray-100">
//               <th className="py-4 px-4 rounded-l-lg">Order ID</th>
//               <th className="py-4 px-4">Customer</th>
//               <th className="py-4 px-4">Items</th>
//               <th className="py-4 px-4">Amount</th>
//               <th className="py-4 px-4">Order Date</th>
//               <th className="py-4 px-4">Status</th>
//               {/* <th className="py-4 px-4 rounded-r-lg">Actions</th> */}
//             </tr>
//           </thead>

//           <tbody>
//   {filteredOrders.length === 0 ? (
//     <tr>
//       <td colSpan="7" className="p-4 text-center text-gray-400">
//         No matching orders found
//       </td>
//     </tr>
//   ) : (
//     filteredOrders.map((order) => (
//       <tr key={order.orderId} className="text-sm text-center">
//         {/* <td className="py-4 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">
//           {order.orderId || "N/A"}
//         </td> */}
//         <td className="py-4 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">

//   <button
//     onClick={() =>
//       navigate(`/admin-panel/order-list/order-overview`,{ state: { id: order.orderId } })
//     }
//     className="text-blue-600 hover:underline font-medium"
//   >
//     {order.orderId || "N/A"}
//   </button>

// </td>
//         <td className="py-4 px-4 bg-white border-y border-gray-200">
//           {order.billingAddress
//             ? `${order.billingAddress.firstName} ${order.billingAddress.lastName}`
//             : "Unknown"}
//         </td>
//         <td className="py-4 px-4 bg-white border-y border-gray-200">
//           {order.items?.length || 0}
//         </td>
//         <td className="py-4 px-4 bg-white border-y border-gray-200">
//           ${order.total?.toFixed(2) || "0.00"}
//         </td>
//         <td className="py-4 px-4 bg-white border-y border-gray-200">
//           {order.createdAt
//             ? new Date(order.createdAt).toLocaleDateString()
//             : "N/A"}
//         </td>
//         <td className="py-4 px-4 bg-white border-y border-gray-200">
//           {order.status || "Order received"}
//         </td>
//         {/* <td className="py-4 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg relative"> */}
//           {/* Your action buttons like View/Edit/Delete */}
//         {/* </td> */}
//       </tr>
//     ))
//   )}
// </tbody>

//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrderlistPage;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiCalendar, FiSearch } from "react-icons/fi";
// import { useOrder } from "../Context/OrderContext";

// const OrderlistPage = () => {
//   const { orderData, setOrderData } = useOrder();
//   const navigate = useNavigate();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");

//   // Correct filtering based on your actual order structure
//   const filteredOrders = orderData
//     .filter((order) => {
//       const name = `${order.billingAddress?.firstName || ""} ${order.billingAddress?.lastName || ""}`;
//       const orderId = order.orderId?.toString() || "";

//       return (
//         name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         orderId.includes(searchTerm)
//       );
//     })
//     .filter((order) =>
//       selectedDate
//         ? new Date(order.createdAt).toLocaleDateString() ===
//           new Date(selectedDate).toLocaleDateString()
//         : true
//     );

//   return (
//     <div className="p-1">
//       {/* TITLE */}
//       <div className="text-xl md:text-2xl font-bold pb-4">
//         Orders List
//       </div>

//       {/* FILTER SECTION */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 mb-6">

//         {/* DATE */}
//         <div className="relative w-full md:w-auto">
//           <FiCalendar className="absolute left-3 top-3 text-gray-400" />
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         {/* SEARCH */}
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

//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-xl overflow-x-auto">
//         <table className="min-w-full border-separate border-spacing-y-3">

//           <thead className="text-sm text-gray-600">
//             <tr className="text-center bg-gray-100">
//               <th className="py-4 px-4 rounded-l-lg">Order ID</th>
//               <th className="py-4 px-4">Customer</th>
//               <th className="py-4 px-4">Items</th>
//               <th className="py-4 px-4">Amount</th>
//               <th className="py-4 px-4">Order Date</th>
//               <th className="py-4 px-4">Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredOrders.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="p-4 text-center text-gray-400">
//                   No matching orders found
//                 </td>
//               </tr>
//             ) : (
//               filteredOrders.map((order) => (
//                 <tr key={order.orderId} className="text-sm text-center">
//                   <td className="py-4 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">
//                     <button
//                       onClick={() =>
//                         navigate(`/admin-panel/order-list/order-overview`, {
//                           state: { id: order.orderId },
//                         })
//                       }
//                       className="text-blue-600 hover:underline font-medium"
//                     >
//                       {order.orderId || "N/A"}
//                     </button>
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {order.billingAddress
//                       ? `${order.billingAddress.firstName} ${order.billingAddress.lastName}`
//                       : "Unknown"}
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {order.items?.length || 0}
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     ₹{order.total?.toLocaleString() || "0"}
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {order.createdAt
//                       ? new Date(order.createdAt).toLocaleDateString()
//                       : "N/A"}
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {order.status || "Order received"}
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

// export default OrderlistPage;

// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   FiSearch, FiCalendar, FiDownload, FiMoreHorizontal, 
//   FiChevronLeft, FiChevronRight, FiInbox, FiLoader 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const OrderlistPage = () => {
//   const navigate = useNavigate();

//   // --- States ---
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [activeTab, setActiveTab] = useState("All orders");
  
//   // --- Pagination States ---
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;

//   const tabs = ["All orders", "Completed", "Pending", "Cancelled"];

//   // --- Fetch Data from Backend ---
//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await api({
//         url: SummaryApi.getOrders.url,
//         method: SummaryApi.getOrders.method,
//       });

//       if (response.data.success) {
//         setOrders(response.data.data);
//       } else {
//         toast.error(response.data.message || "Failed to fetch orders");
//       }
//     } catch (error) {
//       console.error("Order fetch error:", error);
//       toast.error("Error connecting to server");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   // --- Filtering Logic ---
//   const filteredOrders = useMemo(() => {
//     return orders.filter((order) => {
//       // 1. Search Filter (Order ID or Customer Name)
//       const customerName = `${order.billingAddress?.firstName || ""} ${order.billingAddress?.lastName || ""}`.toLowerCase();
//       const orderId = (order.orderId || "").toLowerCase();
//       const matchesSearch = customerName.includes(searchTerm.toLowerCase()) || orderId.includes(searchTerm.toLowerCase());

//       // 2. Date Filter
//       const matchesDate = selectedDate 
//         ? new Date(order.createdAt).toLocaleDateString() === new Date(selectedDate).toLocaleDateString()
//         : true;

//       // 3. Tab Filter (Status Mapping)
//       let matchesTab = true;
//       if (activeTab === "Completed") matchesTab = order.status === "Delivered";
//       else if (activeTab === "Pending") matchesTab = ["Placed", "Processing", "Shipped"].includes(order.status);
//       else if (activeTab === "Cancelled") matchesTab = order.status === "Cancelled";

//       return matchesSearch && matchesDate && matchesTab;
//     });
//   }, [orders, searchTerm, selectedDate, activeTab]);

//   // --- Pagination Logic ---
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

//   // --- Helper: Status Styles ---
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "Delivered":
//         return "bg-green-50 text-green-600 border-green-100";
//       case "Cancelled":
//         return "bg-red-50 text-red-600 border-red-100";
//       default:
//         return "bg-orange-50 text-orange-600 border-orange-100";
//     }
//   };

//   return (
//     <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//         <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Orders</h1>
//         <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl transition-all font-semibold shadow-sm w-fit">
//           <FiDownload size={18} /> Export
//         </button>
//       </div>

//       {/* Tabs & Filters Row */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
//         {/* Navigation Tabs */}
//         <div className="flex items-center gap-6 border-b lg:border-none overflow-x-auto no-scrollbar">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
//               className={`pb-2 text-sm font-semibold transition-all whitespace-nowrap relative ${
//                 activeTab === tab ? "text-green-600" : "text-gray-400 hover:text-gray-600"
//               }`}
//             >
//               {tab}
//               {activeTab === tab && (
//                 <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 rounded-full" />
//               )}
//             </button>
//           ))}
//         </div>

//         {/* Filter Inputs */}
//         <div className="flex flex-col sm:flex-row items-center gap-3">
//           <div className="relative w-full sm:w-auto">
//             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by ID or name..."
//               className="pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 shadow-sm transition-all"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="relative w-full sm:w-auto">
//             <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//             <input
//               type="date"
//               className="pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-green-500/20 shadow-sm transition-all text-gray-600"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-gray-50/50 text-gray-500 text-[13px] uppercase tracking-wider font-bold">
//                 <th className="px-6 py-4">Order ID</th>
//                 <th className="px-6 py-4">Customer</th>
//                 <th className="px-6 py-4 text-center">Items</th>
//                 <th className="px-6 py-4">Payment</th>
//                 <th className="px-6 py-4">Amount</th>
//                 <th className="px-6 py-4">Order Date</th>
//                 <th className="px-6 py-4">Status</th>
//                 <th className="px-6 py-4 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {loading ? (
//                 <tr>
//                   <td colSpan="8" className="py-20 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <FiLoader className="animate-spin text-green-600" size={30} />
//                       <p className="text-gray-400 animate-pulse">Loading orders...</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : currentItems.length === 0 ? (
//                 <tr>
//                   <td colSpan="8" className="py-20 text-center">
//                     <div className="flex flex-col items-center text-gray-400">
//                       <FiInbox size={48} className="mb-2 opacity-20" />
//                       <p>No orders found matching your criteria</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 currentItems.map((order) => (
//                   <tr key={order._id} className="hover:bg-gray-50/50 transition-colors group">
//                     <td className="px-6 py-4 font-medium text-blue-600 whitespace-nowrap">
//                       <button 
//                         onClick={() => navigate(`/admin-panel/order-list/order-overview`, { state: { id: order._id } })}
//                         className="hover:underline"
//                       >
//                         #{order.orderId}
//                       </button>
//                     </td>
//                     <td className="px-6 py-4 text-gray-700 font-medium">
//                       {order.billingAddress?.firstName} {order.billingAddress?.lastName}
//                     </td>
//                     <td className="px-6 py-4 text-center text-gray-600">
//                       {order.items?.length || 0}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
//                         order.paymentStatus === 'Paid' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-50 text-gray-500 border-gray-100'
//                       }`}>
//                         {order.paymentStatus}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 font-bold text-gray-800">
//                       ₹{order.total?.toLocaleString()}
//                     </td>
//                     <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
//                       {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className={`flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg border w-32 ${getStatusStyle(order.status)}`}>
//                         <span className="text-[12px] font-bold uppercase tracking-tight">{order.status}</span>
//                         <div className="w-1.5 h-1.5 rounded-full bg-current" />
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <button className="p-2 hover:bg-white hover:shadow-md rounded-full text-gray-400 transition-all">
//                         <FiMoreHorizontal size={20} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination Section */}
//         {totalPages > 1 && (
//           <div className="px-6 py-4 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
//             <p className="text-sm text-gray-500">
//               Showing <span className="font-semibold text-gray-800">{indexOfFirstItem + 1}</span> to <span className="font-semibold text-gray-800">{Math.min(indexOfLastItem, filteredOrders.length)}</span> of <span className="font-semibold text-gray-800">{filteredOrders.length}</span> orders
//             </p>
//             <div className="flex items-center gap-2">
//               <button 
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage(prev => prev - 1)}
//                 className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
//               >
//                 <FiChevronLeft />
//               </button>
              
//               {[...Array(totalPages)].map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
//                     currentPage === i + 1 
//                     ? "bg-green-600 text-white shadow-md shadow-green-100" 
//                     : "hover:bg-gray-50 text-gray-600 border border-gray-100"
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}

//               <button 
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage(prev => prev + 1)}
//                 className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
//               >
//                 <FiChevronRight />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderlistPage;


// import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   FiSearch, FiCalendar, FiUpload, FiMoreHorizontal, 
//   FiChevronLeft, FiChevronRight, FiChevronDown 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const OrderlistPage = () => {
//   const navigate = useNavigate();

//   // --- States ---
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [activeTab, setActiveTab] = useState("All orders");
  
//   // --- Pagination States ---
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   const tabs = ["All orders", "Completed", "Pending", "Cancelled"];

//   // --- Fetch Data ---
//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const response = await api({
//         url: SummaryApi.getOrders.url,
//         method: SummaryApi.getOrders.method,
//       });

//       if (response.data.success) {
//         setOrders(response.data.data);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // --- Filtering Logic ---
//   const filteredOrders = useMemo(() => {
//     return orders.filter((order) => {
//       const customerName = `${order.billingAddress?.firstName || ""} ${order.billingAddress?.lastName || ""}`.toLowerCase();
//       const orderIdString = (order.orderId || "").toLowerCase();
//       const matchesSearch = customerName.includes(searchTerm.toLowerCase()) || orderIdString.includes(searchTerm.toLowerCase());

//       const matchesDate = selectedDate 
//         ? new Date(order.createdAt).toLocaleDateString() === new Date(selectedDate).toLocaleDateString()
//         : true;

//       let matchesTab = true;
//       if (activeTab === "Completed") matchesTab = order.status === "Delivered";
//       else if (activeTab === "Pending") matchesTab = ["Placed", "Processing", "Shipped"].includes(order.status);
//       else if (activeTab === "Cancelled") matchesTab = order.status === "Cancelled";

//       return matchesSearch && matchesDate && matchesTab;
//     });
//   }, [orders, searchTerm, selectedDate, activeTab]);

//   // --- Pagination Logic ---
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

//   // --- Helper: Status Styles from Image ---
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "Delivered":
//       case "Completed":
//         return "bg-[#E6FFF0] text-[#00B037] border-[#B3FFCC]";
//       case "Cancelled":
//         return "bg-[#FFF0F0] text-[#FF4D4D] border-[#FFCCCC]";
//       default: // Pending / Processing / Shipped
//         return "bg-[#FFF7E6] text-[#FF9900] border-[#FFE5B3]";
//     }
//   };

//   return (
//     <div className="p-6 bg-[#F9FAFB] min-h-screen font-sans text-[#1A1A1A]">
      
//       {/* Header Row */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">Orders</h1>
//         <button className="bg-[#41B619] text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium">
//           <FiUpload size={14} className="rotate-180" /> Export
//         </button>
//       </div>

//       {/* Tabs and Filters Row */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
//         <div className="flex items-center gap-6 border-b border-gray-100">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
//               className={`pb-3 text-sm font-medium transition-all relative ${
//                 activeTab === tab ? "text-[#41B619]" : "text-gray-500"
//               }`}
//             >
//               {tab}
//               {activeTab === tab && (
//                 <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#41B619]" />
//               )}
//             </button>
//           ))}
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="relative">
//             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search...."
//               className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm w-64 focus:outline-none"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="relative">
//             <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">Today</span>
//             <input
//               type="date"
//               className="pl-10 pr-16 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none text-transparent"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="overflow-x-auto">
//         <table className="w-full border-separate border-spacing-y-3">
//           <thead>
//             <tr className="text-sm font-semibold text-gray-700">
//               <th className="px-4 py-2 text-left font-semibold">Order ID</th>
//               <th className="px-4 py-2 text-left font-semibold">Customer</th>
//               <th className="px-4 py-2 text-left font-semibold">Order Type</th>
//               <th className="px-4 py-2 text-center font-semibold">Items</th>
//               <th className="px-4 py-2 text-left font-semibold">Payment</th>
//               <th className="px-4 py-2 text-left font-semibold">Amount</th>
//               <th className="px-4 py-2 text-left font-semibold">Order date</th>
//               <th className="px-4 py-2 text-left font-semibold">Status</th>
//               <th className="px-4 py-2 text-center font-semibold">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {!loading && currentItems.map((order) => (
//               <tr key={order._id} className="text-[13px] group">
//                 <td className="px-4 py-4 bg-white border-y border-l border-gray-100 rounded-l-xl text-gray-500">
//                   <button 
//                     onClick={() => navigate(`/admin-panel/order-list/order-overview`, { state: { id: order._id } })}
//                     className="hover:text-[#41B619]"
//                   >
//                     #{order.orderId}
//                   </button>
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
//                   {order.billingAddress?.firstName} {order.billingAddress?.lastName || "Ramesh Farms"}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
//                    {order.total > 5000 ? "Bulk" : "Retail"}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-center text-gray-500">
//                   {order.items?.length}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
//                   {order.paymentStatus === 'Paid' ? 'Paid' : 'Unpaid'}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 font-medium text-gray-700">
//                   ₹{order.total?.toLocaleString()}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
//                   {new Date(order.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100">
//                   <div className={`flex items-center justify-between px-3 py-1 rounded-md border text-[12px] w-[100px] cursor-pointer ${getStatusStyle(order.status === 'Delivered' ? 'Completed' : order.status)}`}>
//                     <span>{order.status === 'Delivered' ? 'Completed' : order.status}</span>
//                     <FiChevronDown size={14} />
//                   </div>
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-r border-gray-100 rounded-r-xl text-center text-gray-400">
//                   <button className="hover:text-gray-800">
//                     <FiMoreHorizontal size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Loading / Empty States */}
//         {loading && <div className="text-center py-10 text-gray-400">Loading orders...</div>}
//         {!loading && filteredOrders.length === 0 && (
//           <div className="text-center py-10 text-gray-400 bg-white rounded-xl">No matching orders found</div>
//         )}
//       </div>

//       {/* Pagination Section */}
//       {totalPages > 1 && (
//         <div className="flex items-center justify-end gap-2 mt-8">
//           <button 
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(prev => prev - 1)}
//             className="p-2 text-gray-400 hover:text-gray-800 disabled:opacity-30"
//           >
//             <FiChevronLeft size={20} />
//           </button>
          
//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`w-8 h-8 rounded-md text-sm font-medium transition-all ${
//                 currentPage === i + 1 
//                 ? "bg-[#41B619] text-white" 
//                 : "text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}

//           {totalPages > 5 && <span className="text-gray-400 px-1">...</span>}
//           {totalPages > 5 && [23, 24].map(num => (
//              <button key={num} className="w-8 h-8 text-sm text-gray-600 hover:bg-gray-100 rounded-md">{num}</button>
//           ))}

//           <button 
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage(prev => prev + 1)}
//             className="p-2 text-gray-400 hover:text-gray-800 disabled:opacity-30"
//           >
//             <FiChevronRight size={20} />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderlistPage;


// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   FiSearch, FiCalendar, FiUpload, FiMoreHorizontal, 
//   FiChevronLeft, FiChevronRight, FiChevronDown, FiX 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const OrderlistPage = () => {
//   const navigate = useNavigate();

//   // --- States ---
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Filter States
//   const [searchTerm, setSearchTerm] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [activeTab, setActiveTab] = useState("All orders");
  
//   // Pagination States
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 8;

//   const tabs = ["All orders", "Completed", "Pending", "Cancelled"];

//   // --- Fetch Data with Query Params ---
//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     try {
//       // Mapping Frontend Tabs to Backend Status
//       let statusParam = "";
//       if (activeTab === "Completed") statusParam = "Delivered";
//       else if (activeTab === "Pending") statusParam = "Placed,Processing,Shipped";
//       else if (activeTab === "Cancelled") statusParam = "Cancelled";

//       const response = await api({
//         url: SummaryApi.getOrders.url,
//         method: SummaryApi.getOrders.method,
//         params: {
//           page: currentPage,
//           limit: itemsPerPage,
//           search: searchTerm,
//           startDate: startDate,
//           endDate: endDate,
//           status: statusParam
//         }
//       });

//       if (response.data.success) {
//         setOrders(response.data.data);
//         // Assuming backend returns totalPages. If not, calculate based on count.
//         setTotalPages(response.data.totalPages || 1); 
//       }
//     } catch (error) {
//       toast.error("Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, searchTerm, startDate, endDate, activeTab]);

//   // Trigger fetch when dependencies change
//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   const handleResetFilters = () => {
//     setSearchTerm("");
//     setStartDate("");
//     setEndDate("");
//     setActiveTab("All orders");
//     setCurrentPage(1);
//   };

//   // --- Helper: Status Styles from Image ---
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "Delivered":
//       case "Completed":
//         return "bg-[#E6FFF0] text-[#00B037] border-[#B3FFCC]";
//       case "Cancelled":
//         return "bg-[#FFF0F0] text-[#FF4D4D] border-[#FFCCCC]";
//       default: 
//         return "bg-[#FFF7E6] text-[#FF9900] border-[#FFE5B3]";
//     }
//   };

//   return (
//     <div className="p-6 bg-[#F9FAFB] min-h-screen font-sans text-[#1A1A1A]">
      
//       {/* Header Row */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">Orders</h1>
//         <button className="bg-[#41B619] text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium hover:bg-[#369b14] transition-colors">
//           <FiUpload size={14} className="rotate-180" /> Export
//         </button>
//       </div>

//       {/* Tabs and Filters Row */}
//       <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-4">
//         {/* Navigation Tabs */}
//         <div className="flex items-center gap-6 border-b border-gray-100">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
//               className={`pb-3 text-sm font-medium transition-all relative whitespace-nowrap ${
//                 activeTab === tab ? "text-[#41B619]" : "text-gray-500"
//               }`}
//             >
//               {tab}
//               {activeTab === tab && (
//                 <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#41B619]" />
//               )}
//             </button>
//           ))}
//         </div>

//         {/* Date & Search Filters */}
//         <div className="flex flex-wrap items-center gap-3">
          
//           {/* Start Date */}
//           <div className="relative group">
//             <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//             <input
//               type="date"
//               className="pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#41B619] w-40"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//             />
//             <span className="absolute -top-5 left-1 text-[10px] text-gray-400 font-semibold uppercase">Start date</span>
//           </div>

//           {/* End Date */}
//           <div className="relative group">
//             <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//             <input
//               type="date"
//               className="pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#41B619] w-40"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//             />
//             <span className="absolute -top-5 left-1 text-[10px] text-gray-400 font-semibold uppercase">End date</span>
//           </div>

//           {/* Search */}
//           <div className="relative">
//             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search...."
//               className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm w-56 focus:outline-none focus:border-[#41B619]"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Reset Button */}
//           {(startDate || endDate || searchTerm) && (
//             <button 
//               onClick={handleResetFilters}
//               className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
//             >
//               <FiX /> Reset
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="overflow-x-auto min-h-[450px]">
//         <table className="w-full border-separate border-spacing-y-3">
//           <thead>
//             <tr className="text-sm font-semibold text-gray-700">
//               <th className="px-4 py-2 text-left font-semibold">Order ID</th>
//               <th className="px-4 py-2 text-left font-semibold">Customer</th>
//               <th className="px-4 py-2 text-left font-semibold">Order Type</th>
//               <th className="px-4 py-2 text-center font-semibold">Items</th>
//               <th className="px-4 py-2 text-left font-semibold">Payment</th>
//               <th className="px-4 py-2 text-left font-semibold">Amount</th>
//               <th className="px-4 py-2 text-left font-semibold">Order date</th>
//               <th className="px-4 py-2 text-left font-semibold">Status</th>
//               <th className="px-4 py-2 text-center font-semibold">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {!loading && orders.map((order) => (
//               <tr key={order._id} className="text-[13px] group">
//                 <td className="px-4 py-4 bg-white border-y border-l border-gray-100 rounded-l-xl text-gray-500 font-medium">
//                   <button 
//                     onClick={() => navigate(`/admin-panel/order-list/order-overview`, { state: { id: order._id } })}
//                     className="hover:text-[#41B619]"
//                   >
//                     #{order.orderId}
//                   </button>
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
//                   {order.billingAddress?.firstName} {order.billingAddress?.lastName}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
//                    {order.total > 5000 ? "Bulk" : "Retail"}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-center text-gray-500">
//                   {order.items?.length || 0}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
//                   {order.paymentStatus === 'Paid' ? 'Paid' : 'Unpaid'}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 font-bold text-gray-700">
//                   ₹{order.total?.toLocaleString()}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
//                   {new Date(order.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100">
//                   <div className={`flex items-center justify-between px-3 py-1.5 rounded-md border text-[11px] font-bold w-[105px] cursor-pointer ${getStatusStyle(order.status === 'Delivered' ? 'Completed' : order.status)}`}>
//                     <span>{order.status === 'Delivered' ? 'Completed' : order.status}</span>
//                     <FiChevronDown size={14} />
//                   </div>
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-r border-gray-100 rounded-r-xl text-center text-gray-400">
//                   <button className="hover:text-gray-800 p-2 rounded-full hover:bg-gray-50 transition-all">
//                     <FiMoreHorizontal size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Loader */}
//         {loading && (
//           <div className="flex flex-col items-center justify-center py-20 gap-3">
//             <div className="w-8 h-8 border-4 border-[#41B619] border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-gray-400 text-sm">Fetching orders...</p>
//           </div>
//         )}
        
//         {/* Empty State */}
//         {!loading && orders.length === 0 && (
//           <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
//             No orders found for the selected criteria.
//           </div>
//         )}
//       </div>

//       {/* Pagination Section */}
//       {!loading && totalPages > 1 && (
//         <div className="flex items-center justify-end gap-2 mt-8">
//           <button 
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(prev => prev - 1)}
//             className="p-2 text-gray-400 hover:text-gray-800 disabled:opacity-30 transition-all"
//           >
//             <FiChevronLeft size={20} />
//           </button>
          
//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`w-9 h-9 rounded-lg text-sm font-bold transition-all shadow-sm ${
//                 currentPage === i + 1 
//                 ? "bg-[#41B619] text-white" 
//                 : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-50"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button 
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage(prev => prev + 1)}
//             className="p-2 text-gray-400 hover:text-gray-800 disabled:opacity-30 transition-all"
//           >
//             <FiChevronRight size={20} />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderlistPage;



// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   FiSearch, FiCalendar, FiUpload, FiMoreHorizontal, 
//   FiChevronLeft, FiChevronRight, FiChevronDown, FiX, FiInbox 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const OrderlistPage = () => {
//   const navigate = useNavigate();

//   // --- States ---
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Filter States
//   const [searchTerm, setSearchTerm] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [activeTab, setActiveTab] = useState("All orders");
  
//   // Pagination States
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 10;

//   const tabs = ["All orders", "Completed", "Pending", "Cancelled"];

//   // --- Fetch Data from Backend ---
//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     try {
//       let statusParam = "";
//       if (activeTab === "Completed") statusParam = "Delivered";
//       else if (activeTab === "Pending") statusParam = "Placed,Processing,Shipped";
//       else if (activeTab === "Cancelled") statusParam = "Cancelled";

//       const response = await api({
//         url: SummaryApi.getOrders.url,
//         method: SummaryApi.getOrders.method,
//         params: {
//           page: currentPage,
//           limit: itemsPerPage,
//           search: searchTerm,
//           startDate: startDate,
//           endDate: endDate,
//           status: statusParam
//         }
//       });

//       if (response.data.success) {
//         setOrders(response.data.data);
//         setTotalPages(response.data.totalPages || 1); 
//       }
//     } catch (error) {
//       toast.error("Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, searchTerm, startDate, endDate, activeTab]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   // --- Export Functionality (CSV) ---
//   const handleExport = () => {
//     if (orders.length === 0) return toast.error("No data to export");

//     const headers = ["Order ID,Customer,Type,Items,Payment,Amount,Date,Status\n"];
//     const csvData = orders.map(order => {
//       const customer = `${order.billingAddress?.firstName} ${order.billingAddress?.lastName}`;
//       const type = order.total > 5000 ? "Bulk" : "Retail";
//       const date = new Date(order.createdAt).toLocaleDateString('en-GB');
//       return `${order.orderId},${customer},${type},${order.items?.length},${order.paymentStatus},${order.total},${date},${order.status}`;
//     }).join("\n");

//     const blob = new Blob([headers + csvData], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `Orders_Report_${new Date().toLocaleDateString()}.csv`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//     toast.success("Exporting CSV...");
//   };

//   // --- Helper: Status Styles ---
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "Delivered":
//       case "Completed":
//         return "bg-[#E6FFF0] text-[#00B037] border-[#B3FFCC]";
//       case "Cancelled":
//         return "bg-[#FFF0F0] text-[#FF4D4D] border-[#FFCCCC]";
//       default: 
//         return "bg-[#FFF7E6] text-[#FF9900] border-[#FFE5B3]";
//     }
//   };

//   return (
//     <div className="p-4 md:p-6 bg-[#F9FAFB] min-h-screen font-sans text-[#1A1A1A]">
      
//       {/* Header Row: Responsive alignment */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//         <h1 className="text-2xl font-bold">Orders</h1>
//         <button 
//           onClick={handleExport}
//           className="bg-[#41B619] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-bold hover:bg-[#369b14] shadow-sm transition-all w-full sm:w-auto justify-center"
//         >
//           <FiUpload size={16} className="rotate-180" /> Export
//         </button>
//       </div>

//       {/* Filter Section: Stacks on mobile, Rows on Desktop */}
//       <div className="space-y-4 mb-6">
        
//         {/* Navigation Tabs (Scrollable on small screens) */}
//         <div className="flex items-center gap-6 border-b border-gray-100 overflow-x-auto no-scrollbar pb-1">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
//               className={`pb-3 text-sm font-medium transition-all relative whitespace-nowrap ${
//                 activeTab === tab ? "text-[#41B619]" : "text-gray-400"
//               }`}
//             >
//               {tab}
//               {activeTab === tab && (
//                 <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#41B619]" />
//               )}
//             </button>
//           ))}
//         </div>

//         {/* Dynamic Inputs Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-end gap-4">
          
//           <div className="flex flex-col gap-1.5 flex-1">
//             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Start Date</label>
//             <div className="relative">
//               <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="date"
//                 className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#41B619] shadow-sm"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="flex flex-col gap-1.5 flex-1">
//             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">End Date</label>
//             <div className="relative">
//               <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="date"
//                 className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#41B619] shadow-sm"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="flex flex-col gap-1.5 lg:w-[300px]">
//             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1 sm:hidden lg:block">Search Orders</label>
//             <div className="relative">
//               <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search ID, Name..."
//                 className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#41B619] shadow-sm"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           {(startDate || endDate || searchTerm) && (
//              <button 
//               onClick={() => { setSearchTerm(""); setStartDate(""); setEndDate(""); }}
//               className="lg:mb-1 p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all flex items-center justify-center gap-1 text-xs font-bold border border-transparent hover:border-red-100"
//             >
//               <FiX /> Reset
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Table Section: Horizontal scroll wrapper is crucial for mobile */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[900px] border-separate border-spacing-y-3 px-4">
//             <thead>
//               <tr className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">
//                 <th className="px-4 py-4 text-left">Order ID</th>
//                 <th className="px-4 py-4 text-left">Customer</th>
//                 <th className="px-4 py-4 text-left">Order Type</th>
//                 <th className="px-4 py-4 text-center">Items</th>
//                 <th className="px-4 py-4 text-left">Payment</th>
//                 <th className="px-4 py-4 text-left">Amount</th>
//                 <th className="px-4 py-4 text-left">Order date</th>
//                 <th className="px-4 py-4 text-left">Status</th>
//                 <th className="px-4 py-4 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {!loading && orders.map((order) => (
//                 <tr key={order._id} className="text-[13px] group">
//                   <td className="px-4 py-4 bg-[#FDFDFD] border-y border-l border-gray-100 rounded-l-xl text-[#41B619] font-bold">
//                     <button onClick={() => navigate(`/admin-panel/order-list/order-overview`, { state: { id: order._id } })}>
//                       #{order.orderId}
//                     </button>
//                   </td>
//                   <td className="px-4 py-4 bg-[#FDFDFD] border-y border-gray-100 text-gray-600 font-medium">
//                     {order.billingAddress?.firstName} {order.billingAddress?.lastName}
//                   </td>
//                   <td className="px-4 py-4 bg-[#FDFDFD] border-y border-gray-100 text-gray-500">
//                     {order.total > 5000 ? "Bulk" : "Retail"}
//                   </td>
//                   <td className="px-4 py-4 bg-[#FDFDFD] border-y border-gray-100 text-center text-gray-600">
//                     {order.items?.length || 0}
//                   </td>
//                   <td className="px-4 py-4 bg-[#FDFDFD] border-y border-gray-100">
//                     <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${order.paymentStatus === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}>
//                       {order.paymentStatus}
//                     </span>
//                   </td>
//                   <td className="px-4 py-4 bg-[#FDFDFD] border-y border-gray-100 font-bold text-gray-800">
//                     ₹{order.total?.toLocaleString()}
//                   </td>
//                   <td className="px-4 py-4 bg-[#FDFDFD] border-y border-gray-100 text-gray-500">
//                     {new Date(order.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}
//                   </td>
//                   <td className="px-4 py-4 bg-[#FDFDFD] border-y border-gray-100">
//                     <div className={`flex items-center justify-between px-3 py-1.5 rounded-lg border text-[11px] font-bold w-[110px] ${getStatusStyle(order.status === 'Delivered' ? 'Completed' : order.status)}`}>
//                       <span>{order.status === 'Delivered' ? 'Completed' : order.status}</span>
//                       <FiChevronDown size={14} />
//                     </div>
//                   </td>
//                   <td className="px-4 py-4 bg-[#FDFDFD] border-y border-r border-gray-100 rounded-r-xl text-center">
//                     <button className="text-gray-300 hover:text-gray-600 p-2 rounded-full transition-all">
//                       <FiMoreHorizontal size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Loading / Empty States */}
//         {loading && (
//           <div className="flex flex-col items-center justify-center py-20 gap-3">
//             <div className="w-10 h-10 border-[3px] border-[#41B619] border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-gray-400 text-sm font-medium">Updating list...</p>
//           </div>
//         )}
//         {!loading && orders.length === 0 && (
//           <div className="text-center py-20 text-gray-400 flex flex-col items-center gap-2">
//             <div className="p-6 rounded-full bg-gray-50 mb-2">
//               <FiInbox size={40} className="opacity-20" />
//             </div>
//             <p className="text-sm font-medium">No orders found for the selected criteria.</p>
//           </div>
//         )}
//       </div>

//       {/* Pagination: Responsive alignment */}
//       {!loading && totalPages > 1 && (
//         <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4 px-2">
//           <p className="text-xs text-gray-400 font-medium">Showing page {currentPage} of {totalPages}</p>
//           <div className="flex items-center gap-2">
//             <button 
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage(prev => prev - 1)}
//               className="p-2.5 text-gray-400 bg-white border border-gray-100 rounded-xl hover:text-[#41B619] disabled:opacity-30 shadow-sm"
//             >
//               <FiChevronLeft size={20} />
//             </button>
            
//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`w-10 h-10 rounded-xl text-sm font-bold transition-all shadow-sm ${
//                   currentPage === i + 1 
//                   ? "bg-[#41B619] text-white" 
//                   : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-50"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}

//             <button 
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage(prev => prev + 1)}
//               className="p-2.5 text-gray-400 bg-white border border-gray-100 rounded-xl hover:text-[#41B619] disabled:opacity-30 shadow-sm"
//             >
//               <FiChevronRight size={20} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderlistPage;


// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   FiSearch, FiCalendar, FiUpload, FiMoreHorizontal, 
//   FiChevronLeft, FiChevronRight, FiChevronDown, FiX 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const OrderlistPage = () => {
//   const navigate = useNavigate();

//   // --- States ---
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Filter States
//   const [searchTerm, setSearchTerm] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [activeTab, setActiveTab] = useState("All orders");
  
//   // Pagination States
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 10;

//   const tabs = ["All orders", "Completed", "Pending", "Cancelled"];

//   // --- Fetch Data with Backend Query Params ---
//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     try {
//       let statusParam = "";
//       if (activeTab === "Completed") statusParam = "Delivered";
//       else if (activeTab === "Pending") statusParam = "Placed,Processing,Shipped";
//       else if (activeTab === "Cancelled") statusParam = "Cancelled";

//       const response = await api({
//         url: SummaryApi.getAllOrders.url,
//         method: SummaryApi.getAllOrders.method,
//         params: {
//           page: currentPage,
//           limit: itemsPerPage,
//           search: searchTerm,
//           startDate: startDate,
//           endDate: endDate,
//           status: statusParam
//         }
//       });

//       if (response.data.success) {
//         setOrders(response.data.data);
//         setTotalPages(response.data.totalPages || 1); 
//       }
//     } catch (error) {
//       toast.error("Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, searchTerm, startDate, endDate, activeTab]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   // --- Export Function ---
//   const handleExport = () => {
//     if (orders.length === 0) return toast.error("No data to export");
//     const headers = "Order ID,Customer,Order Type,Items,Payment,Amount,Order date,Status\n";
//     const csvRows = orders.map(o => (
//       `${o.orderId},${o.billingAddress?.firstName} ${o.billingAddress?.lastName},${o.total > 5000 ? 'Bulk' : 'Retail'},${o.items?.length},${o.paymentStatus},${o.total},${new Date(o.createdAt).toLocaleDateString('en-GB')},${o.status}`
//     )).join("\n");
    
//     const blob = new Blob([headers + csvRows], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "Orders_Export.csv";
//     a.click();
//     toast.success("Exporting...");
//   };

//   // --- Helper: Status Styles from Image ---
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "Delivered":
//       case "Completed":
//         return "bg-[#E6FFF0] text-[#00B037] border-[#B3FFCC]";
//       case "Cancelled":
//         return "bg-[#FFF0F0] text-[#FF4D4D] border-[#FFCCCC]";
//       default: 
//         return "bg-[#FFF7E6] text-[#FF9900] border-[#FFE5B3]";
//     }
//   };

//   return (
//     <div className="p-4 md:p-8 bg-[#FDFDFD] min-h-screen font-sans">
      
//       {/* Header Row */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-[#1A1A1A]">Orders</h1>
//         <button 
//           onClick={handleExport}
//           className="bg-[#6DC40B] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-[#5eb108] transition-all"
//         >
//           <FiUpload size={14} className="rotate-180" /> Export
//         </button>
//       </div>

//       {/* Tabs Row */}
//       <div className="flex items-center gap-6 border-b border-gray-100 mb-6 overflow-x-auto no-scrollbar">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
//             className={`pb-3 text-[15px] font-medium transition-all relative whitespace-nowrap ${
//               activeTab === tab ? "text-[#6DC40B]" : "text-gray-400"
//             }`}
//           >
//             {tab}
//             {activeTab === tab && (
//               <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#6DC40B]" />
//             )}
//           </button>
//         ))}
//       </div>

//       {/* Date Filters Row - Responsive Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:flex items-center gap-4 mb-4">
//         <div className="flex flex-col gap-1 w-full lg:w-auto">
//           <label className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">START DATE</label>
//           <div className="relative">
//             <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="date"
//               className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full md:w-64 focus:outline-none"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="flex flex-col gap-1 w-full lg:w-auto">
//           <label className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">END DATE</label>
//           <div className="relative">
//             <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="date"
//               className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full md:w-64 focus:outline-none"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Search Bar Row */}
//       <div className="mb-8 w-full md:w-full lg:w-[536px]">
//         <div className="relative">
//           <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search...."
//             className="pl-10 pr-4 py-2.5 bg-white border border-[#6DC40B] rounded-xl text-sm w-full focus:outline-none"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Table Section - Responsive Scroll */}
//       <div className="overflow-x-auto min-h-[400px]">
//         {loading ? (
//            <div className="text-center py-20 text-gray-400">Loading orders...</div>
//         ) : orders.length === 0 ? (
//           <div className="w-full border-2 border-dashed border-gray-100 rounded-3xl py-24 flex flex-col items-center justify-center">
//             <p className="text-gray-400 text-lg">No orders found for the selected criteria.</p>
//           </div>
//         ) : (
//           <table className="w-full border-separate border-spacing-y-3 min-w-[1000px]">
//             <thead>
//               <tr className="text-[14px] font-bold text-[#2D3748]">
//                 <th className="px-4 py-2 text-left">Order ID</th>
//                 <th className="px-4 py-2 text-left">Customer</th>
//                 <th className="px-4 py-2 text-left">Order Type</th>
//                 <th className="px-4 py-2 text-center">Items</th>
//                 <th className="px-4 py-2 text-left">Payment</th>
//                 <th className="px-4 py-2 text-left">Amount</th>
//                 <th className="px-4 py-2 text-left">Order date</th>
//                 <th className="px-4 py-2 text-left">Status</th>
//                 <th className="px-4 py-2 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order._id} className="text-[13px]">
//                   <td className="px-4 py-4 bg-white border-y border-l border-gray-100 rounded-l-2xl text-gray-500">
//                     <button onClick={() => navigate(`/admin-panel/order-list/order-overview`, { state: { id: order._id } })}>
//                       #{order.orderId}
//                     </button>
//                   </td>
//                   <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500 font-medium">
//                     {order.billingAddress?.firstName} {order.billingAddress?.lastName}
//                   </td>
//                   <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
//                     {order.total > 5000 ? "Bulk" : "Retail"}
//                   </td>
//                   <td className="px-4 py-4 bg-white border-y border-gray-100 text-center text-gray-500">
//                     {order.items?.length || 0}
//                   </td>
//                   <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
//                     {order.paymentStatus}
//                   </td>
//                   <td className="px-4 py-4 bg-white border-y border-gray-100 font-bold text-[#1A1A1A]">
//                     ₹{order.total?.toLocaleString()}
//                   </td>
//                   <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
//                     {new Date(order.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}
//                   </td>
//                   <td className="px-4 py-4 bg-white border-y border-gray-100">
//                     <div className={`flex items-center justify-between px-3 py-1.5 rounded-lg border text-[12px] w-[110px] ${getStatusStyle(order.status === 'Delivered' ? 'Completed' : order.status)}`}>
//                       <span>{order.status === 'Delivered' ? 'Completed' : order.status}</span>
//                       <FiChevronDown size={14} />
//                     </div>
//                   </td>
//                   <td className="px-4 py-4 bg-white border-y border-r border-gray-100 rounded-r-2xl text-center text-gray-300">
//                     <button className="hover:text-gray-600">
//                       <FiMoreHorizontal size={20} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Pagination Row */}
//       {!loading && totalPages > 1 && (
//         <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-8">
//           <div className="flex items-center gap-2">
//             <button 
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage(prev => prev - 1)}
//               className="p-2 text-gray-400 disabled:opacity-30"
//             >
//               <FiChevronLeft size={20} />
//             </button>
            
//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
//                   currentPage === i + 1 
//                   ? "bg-[#6DC40B] text-white" 
//                   : "text-gray-500 hover:bg-gray-100"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}

//             <button 
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage(prev => prev + 1)}
//               className="p-2 text-gray-400 disabled:opacity-30"
//             >
//               <FiChevronRight size={20} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderlistPage;


// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { 
//   FiSearch, FiCalendar, FiUpload, FiMoreHorizontal, 
//   FiChevronLeft, FiChevronRight, FiAlertCircle 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const OrderlistPage = () => {
//   const navigate = useNavigate();

//   // --- States ---
//   const [orders, setOrders] = useState([]); // Raw data from backend
//   const [loading, setLoading] = useState(true);
  
//   // Filter States
//   const [searchTerm, setSearchTerm] = useState(""); // Frontend search
//   const [startDate, setStartDate] = useState("");  // Backend filter
//   const [endDate, setEndDate] = useState("");      // Backend filter
//   const [activeTab, setActiveTab] = useState("All orders");
  
//   // Pagination States
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 10;

//   // Status Update Modal States
//   const [showModal, setShowModal] = useState(false);
//   const [statusUpdateData, setStatusUpdateData] = useState({ id: null, newStatus: "" });

//   const tabs = ["All orders", "Completed", "Pending", "Cancelled"];

//   // --- Fetch Data (Backend Filtered for Dates & Status) ---
//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     try {
//       let statusParam = "";
//       if (activeTab === "Completed") statusParam = "Delivered";
//       else if (activeTab === "Pending") statusParam = "Placed,Processing,Shipped";
//       else if (activeTab === "Cancelled") statusParam = "Cancelled";

//       const response = await api({
//         url: SummaryApi.getAllOrders.url,
//         method: SummaryApi.getAllOrders.method,
//         params: {
//           page: currentPage,
//           limit: itemsPerPage,
//           startDate: startDate,
//           endDate: endDate,
//           status: statusParam
//         }
//       });

//       if (response.data.success) {
//         setOrders(response.data.data);
//         setTotalPages(response.data.totalPages || 1); 
//       }
//     } catch (error) {
//       toast.error("Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, startDate, endDate, activeTab]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   // --- Frontend Filter (Search by OrderID or Customer Name) ---
//   const filteredOrders = useMemo(() => {
//     return orders.filter((order) => {
//       const customerName = `${order.billingAddress?.firstName || ""} ${order.billingAddress?.lastName || ""}`.toLowerCase();
//       const orderId = (order.orderId || "").toLowerCase();
//       const search = searchTerm.toLowerCase();
//       return customerName.includes(search) || orderId.includes(search);
//     });
//   }, [orders, searchTerm]);

//   // --- Export Function ---
//   const handleExport = () => {
//     if (filteredOrders.length === 0) return toast.error("No data to export");
//     const headers = "Order ID,Customer,Amount,Date,Status\n";
//     const csvRows = filteredOrders.map(o => (
//       `${o.orderId},${o.billingAddress?.firstName} ${o.billingAddress?.lastName},${o.total},${new Date(o.createdAt).toLocaleDateString()},${o.status}`
//     )).join("\n");
//     const blob = new Blob([headers + csvRows], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "Orders.csv";
//     a.click();
//   };

//   // --- Status Update Handlers ---
//   const openUpdateModal = (id, newStatus) => {
//     setStatusUpdateData({ id, newStatus });
//     setShowModal(true);
//   };

//   const handleStatusUpdate = async () => {
//     try {
//       const response = await api({
//         url: SummaryApi.updateOrderStatus.url(statusUpdateData.id),
//         method: SummaryApi.updateOrderStatus.method,
//         data: { status: statusUpdateData.newStatus }
//       });

//       if (response.data.success) {
//         toast.success("Status updated successfully");
//         setShowModal(false);
//         fetchOrders(); // Refresh data
//       }
//     } catch (error) {
//       toast.error("Failed to update status");
//     }
//   };

//   // --- UI Helper: Status Style ---
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "Delivered":
//       case "Completed": return "bg-[#E6FFF0] text-[#00B037] border-[#B3FFCC]";
//       case "Cancelled": return "bg-[#FFF0F0] text-[#FF4D4D] border-[#FFCCCC]";
//       default: return "bg-[#FFF7E6] text-[#FF9900] border-[#FFE5B3]";
//     }
//   };

//   return (
//     <div className="p-4 md:p-8 bg-[#FDFDFD] min-h-screen font-sans">
      
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-[#1A1A1A]">Orders</h1>
//         <button onClick={handleExport} className="bg-[#6DC40B] text-white px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:opacity-90 transition-all">
//           <FiUpload size={14} className="rotate-180" /> Export
//         </button>
//       </div>

//       {/* Tabs Row */}
//       <div className="flex items-center gap-6 border-b border-gray-100 mb-6 overflow-x-auto no-scrollbar">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
//             className={`pb-3 text-[15px] font-medium transition-all relative whitespace-nowrap ${activeTab === tab ? "text-[#6DC40B]" : "text-gray-400"}`}
//           >
//             {tab}
//             {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#6DC40B]" />}
//           </button>
//         ))}
//       </div>

//       {/* Filters Row (Dates and Search in one row on big screen) */}
//       <div className="flex flex-col xl:flex-row items-end gap-4 mb-8">
//         <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
//           <div className="flex flex-col gap-1 flex-1 sm:w-48">
//             <label className="text-[11px] font-bold text-gray-400 uppercase">START DATE</label>
//             <div className="relative">
//               <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <input type="date" className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full focus:outline-none" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//             </div>
//           </div>
//           <div className="flex flex-col gap-1 flex-1 sm:w-48">
//             <label className="text-[11px] font-bold text-gray-400 uppercase">END DATE</label>
//             <div className="relative">
//               <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <input type="date" className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full focus:outline-none" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col gap-1 w-full xl:flex-1">
//           <div className="relative">
//             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//             <input 
//               type="text" 
//               placeholder="Search by ID or Name...." 
//               className="pl-10 pr-4 py-2.5 bg-white border border-[#6DC40B] rounded-xl text-sm w-full focus:outline-none" 
//               value={searchTerm} 
//               onChange={(e) => setSearchTerm(e.target.value)} 
//             />
//           </div>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="overflow-x-auto">
//         <table className="w-full border-separate border-spacing-y-3 min-w-[1000px]">
//           <thead>
//             <tr className="text-[14px] font-bold text-[#2D3748]">
//               <th className="px-4 py-2 text-left">Order ID</th>
//               <th className="px-4 py-2 text-left">Customer</th>
//               <th className="px-4 py-2 text-left">Order Type</th>
//               <th className="px-4 py-2 text-center">Items</th>
//               <th className="px-4 py-2 text-left">Payment</th>
//               <th className="px-4 py-2 text-left">Amount</th>
//               <th className="px-4 py-2 text-left">Order date</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {!loading && filteredOrders.map((order) => (
//               <tr key={order._id} className="text-[13px]">
//                 <td className="px-4 py-4 bg-white border-y border-l border-gray-100 rounded-l-2xl text-gray-500">
//                    #{order.orderId}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-600 font-medium">
//                   {order.billingAddress?.firstName} {order.billingAddress?.lastName}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
//                   {order.total > 5000 ? "Bulk" : "Retail"}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-center text-gray-500">
//                   {order.items?.length || 0}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100">
//                   <span className={`px-2 py-1 rounded-md text-[11px] font-bold ${order.paymentStatus === 'Paid' ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'}`}>
//                     {order.paymentStatus}
//                   </span>
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 font-bold text-[#1A1A1A]">
//                   ₹{order.total?.toLocaleString()}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
//                   {new Date(order.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100">
//                    <select 
//                     value={order.status} 
//                     onChange={(e) => openUpdateModal(order._id, e.target.value)}
//                     className={`flex items-center justify-between px-3 py-1.5 rounded-lg border text-[12px] font-bold w-[120px] outline-none cursor-pointer appearance-none ${getStatusStyle(order.status)}`}
//                     style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', backgroundSize: '14px' }}
//                    >
//                     <option value="Placed">Placed</option>
//                     <option value="Processing">Packaged</option>
//                     <option value="Shipped">Shipped</option>
//                     <option value="Delivered">Completed</option>
//                     <option value="Cancelled">Cancelled</option>
//                    </select>
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-r border-gray-100 rounded-r-2xl text-center text-gray-300">
//                   <button onClick={() => navigate(`/admin-panel/order-list/order-overview`, { state: { id: order._id } })} className="hover:text-gray-600">
//                     <FiMoreHorizontal size={20} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {loading && <div className="text-center py-20 text-gray-400 font-medium">Loading data from server...</div>}
//         {!loading && filteredOrders.length === 0 && (
//           <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl text-gray-400">
//             No orders found for the selected criteria.
//           </div>
//         )}
//       </div>

//       {/* Pagination */}
//       {!loading && totalPages > 1 && (
//         <div className="flex justify-end items-center gap-2 mt-8">
//           <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-2 text-gray-400 disabled:opacity-20"><FiChevronLeft size={22} /></button>
//           {[...Array(totalPages)].map((_, i) => (
//             <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-9 h-9 rounded-xl text-sm font-bold ${currentPage === i + 1 ? "bg-[#6DC40B] text-white" : "text-gray-400 hover:bg-gray-100"}`}>
//               {i + 1}
//             </button>
//           ))}
//           <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="p-2 text-gray-400 disabled:opacity-20"><FiChevronRight size={22} /></button>
//         </div>
//       )}

//       {/* Status Confirmation Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in duration-200">
//             <div className="p-8 flex flex-col items-center text-center">
//               <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-4">
//                 <FiAlertCircle size={32} />
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 mb-2">Update Status?</h3>
//               <p className="text-gray-500 text-sm leading-relaxed">Are you sure you want to change the order status to <span className="font-bold text-[#6DC40B]">{statusUpdateData.newStatus}</span>?</p>
//             </div>
//             <div className="flex border-t">
//               <button onClick={() => setShowModal(false)} className="flex-1 py-4 text-sm font-bold text-gray-400 hover:bg-gray-50 transition-colors border-r">Cancel</button>
//               <button onClick={handleStatusUpdate} className="flex-1 py-4 text-sm font-bold text-[#6DC40B] hover:bg-green-50 transition-colors">Apply Change</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderlistPage;


// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { 
//   FiSearch, FiCalendar, FiUpload, FiMoreHorizontal, 
//   FiChevronLeft, FiChevronRight, FiAlertCircle, FiChevronDown 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const OrderlistPage = () => {
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();

//   // --- States initialized from URL Query Parameters ---
//   const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
//   const [startDate, setStartDate] = useState(searchParams.get("start") || "");
//   const [endDate, setEndDate] = useState(searchParams.get("end") || "");
//   const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "All orders");
//   const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);

//   // Data states
//   const [orders, setOrders] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 10;

//   // Status Update Modal States
//   const [showModal, setShowModal] = useState(false);
//   const [statusUpdateData, setStatusUpdateData] = useState({ id: null, newStatus: "" });

//   const tabs = ["All orders", "Completed", "Pending", "Cancelled"];

//   // --- Sync State to URL Query Parameters ---
//   useEffect(() => {
//     const params = {};
//     if (searchTerm) params.search = searchTerm;
//     if (startDate) params.start = startDate;
//     if (endDate) params.end = endDate;
//     if (activeTab !== "All orders") params.tab = activeTab;
//     if (currentPage > 1) params.page = currentPage;
    
//     setSearchParams(params, { replace: true });
//   }, [searchTerm, startDate, endDate, activeTab, currentPage, setSearchParams]);

//   // --- Fetch Data (Backend Filtered for Dates & Status) ---
//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     try {
//       let statusParam = "";
//       if (activeTab === "Completed") statusParam = "Delivered";
//       else if (activeTab === "Pending") statusParam = "Placed,Processing,Shipped";
//       else if (activeTab === "Cancelled") statusParam = "Cancelled";

//       const response = await api({
//         url: SummaryApi.getAllOrders.url,
//         method: SummaryApi.getAllOrders.method,
//         params: {
//           page: currentPage,
//           limit: itemsPerPage,
//           startDate: startDate,
//           endDate: endDate,
//           status: statusParam
//         }
//       });

//       if (response.data.success) {
//         setOrders(response.data.data);
//         setTotalPages(response.data.totalPages || 1); 
//       }
//     } catch (error) {
//       toast.error("Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, startDate, endDate, activeTab]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   // --- Frontend Filter (Search by OrderID or Customer Name) ---
//   const filteredOrders = useMemo(() => {
//     return orders.filter((order) => {
//       const customerName = `${order.billingAddress?.firstName || ""} ${order.billingAddress?.lastName || ""}`.toLowerCase();
//       const orderId = (order.orderId || "").toLowerCase();
//       const search = searchTerm.toLowerCase();
//       return customerName.includes(search) || orderId.includes(search);
//     });
//   }, [orders, searchTerm]);

//   // --- Export Function ---
//   const handleExport = () => {
//     if (filteredOrders.length === 0) return toast.error("No data to export");
//     const headers = "Order ID,Customer,Amount,Date,Status\n";
//     const csvRows = filteredOrders.map(o => (
//       `${o.orderId},${o.billingAddress?.firstName} ${o.billingAddress?.lastName},${o.total},${new Date(o.createdAt).toLocaleDateString()},${o.status}`
//     )).join("\n");
//     const blob = new Blob([headers + csvRows], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `Orders_${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   // --- Status Update Handlers ---
//   const openUpdateModal = (id, newStatus) => {
//     setStatusUpdateData({ id, newStatus });
//     setShowModal(true);
//   };

//   const handleStatusUpdate = async () => {
//     try {
//       const response = await api({
//         url: SummaryApi.updateOrderStatus.url(statusUpdateData.id),
//         method: SummaryApi.updateOrderStatus.method,
//         data: { status: statusUpdateData.newStatus }
//       });

//       if (response.data.success) {
//         toast.success("Status updated successfully");
//         setShowModal(false); // Close Modal
//         fetchOrders(); // Re-fetch data
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Failed to update status");
//     }
//   };

//   // --- UI Helper: Status Style ---
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "Delivered":
//       case "Completed": return "bg-[#E6FFF0] text-[#00B037] border-[#B3FFCC]";
//       case "Cancelled": return "bg-[#FFF0F0] text-[#FF4D4D] border-[#FFCCCC]";
//       default: return "bg-[#FFF7E6] text-[#FF9900] border-[#FFE5B3]";
//     }
//   };

//   return (
//     <div className="p-4 md:p-8 bg-[#FDFDFD] min-h-screen font-sans">
      
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-[#1A1A1A]">Orders</h1>
//         <button onClick={handleExport} className="bg-[#6DC40B] text-white px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:opacity-90 transition-all shadow-sm">
//           <FiUpload size={14} className="rotate-180" /> Export
//         </button>
//       </div>

//       {/* Tabs Row */}
//       <div className="flex items-center gap-6 border-b border-gray-100 mb-6 overflow-x-auto no-scrollbar">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
//             className={`pb-3 text-[15px] font-medium transition-all relative whitespace-nowrap ${activeTab === tab ? "text-[#6DC40B]" : "text-gray-400"}`}
//           >
//             {tab}
//             {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#6DC40B]" />}
//           </button>
//         ))}
//       </div>

//       {/* Filters Row: Big screen single row for Dates and Search */}
//       <div className="flex flex-col xl:flex-row items-end gap-4 mb-8">
//         <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
//           <div className="flex flex-col gap-1 flex-1 sm:w-48">
//             <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">START DATE</label>
//             <div className="relative">
//               <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <input 
//                 type="date" 
//                 className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full focus:outline-none focus:border-[#6DC40B] transition-all shadow-sm" 
//                 value={startDate} 
//                 onChange={(e) => { setStartDate(e.target.value); setCurrentPage(1); }} 
//               />
//             </div>
//           </div>
//           <div className="flex flex-col gap-1 flex-1 sm:w-48">
//             <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">END DATE</label>
//             <div className="relative">
//               <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <input 
//                 type="date" 
//                 className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full focus:outline-none focus:border-[#6DC40B] transition-all shadow-sm" 
//                 value={endDate} 
//                 onChange={(e) => { setEndDate(e.target.value); setCurrentPage(1); }} 
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col gap-1 w-full xl:flex-1">
//           <div className="relative">
//             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//             <input 
//               type="text" 
//               placeholder="Search by ID or Name...." 
//               className="pl-10 pr-4 py-2.5 bg-white border border-[#6DC40B] rounded-xl text-sm w-full focus:outline-none shadow-sm" 
//               value={searchTerm} 
//               onChange={(e) => setSearchTerm(e.target.value)} 
//             />
//           </div>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="overflow-x-auto min-h-[450px]">
//         <table className="w-full border-separate border-spacing-y-3 min-w-[1000px]">
//           <thead>
//             <tr className="text-[14px] font-bold text-[#2D3748]">
//               <th className="px-4 py-2 text-left">Order ID</th>
//               <th className="px-4 py-2 text-left">Customer</th>
//               <th className="px-4 py-2 text-left">Order Type</th>
//               <th className="px-4 py-2 text-center">Items</th>
//               <th className="px-4 py-2 text-left">Payment</th>
//               <th className="px-4 py-2 text-left">Amount</th>
//               <th className="px-4 py-2 text-left">Order date</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {!loading && filteredOrders.map((order) => (
//               <tr key={order._id} className="text-[13px] group">
//                 <td className="px-4 py-4 bg-white border-y border-l border-gray-100 rounded-l-2xl text-gray-500">
//                    #{order.orderId}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-600 font-medium">
//                   {order.billingAddress?.firstName} {order.billingAddress?.lastName}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
//                   {order.total > 5000 ? "Bulk" : "Retail"}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-center text-gray-500">
//                   {order.items?.length || 0}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100">
//                   <span className={`px-2 py-1 rounded-md text-[11px] font-bold ${order.paymentStatus === 'Paid' ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'}`}>
//                     {order.paymentStatus}
//                   </span>
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 font-bold text-[#1A1A1A]">
//                   ₹{order.total?.toLocaleString()}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
//                   {new Date(order.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 relative">
//                    <div className="relative inline-block w-full">
//                     <select 
//                       value={order.status} 
//                       onChange={(e) => openUpdateModal(order._id, e.target.value)}
//                       className={`flex items-center justify-between px-3 py-1.5 rounded-lg border text-[12px] font-bold w-full outline-none cursor-pointer appearance-none transition-all ${getStatusStyle(order.status)}`}
//                     >
//                       <option value="Placed">Placed</option>
//                       <option value="Processing">Packaged</option>
//                       <option value="Shipped">Shipped</option>
//                       <option value="Delivered">Completed</option>
//                       <option value="Cancelled">Cancelled</option>
//                     </select>
//                     <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" size={14} />
//                    </div>
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-r border-gray-100 rounded-r-2xl text-center text-gray-300">
//                   <button onClick={() => navigate(`/admin-panel/order-list/order-overview`, { state: { id: order._id } })} className="hover:text-gray-600 transition-colors">
//                     <FiMoreHorizontal size={20} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {loading && <div className="text-center py-20 text-gray-400 font-medium animate-pulse">Fetching orders...</div>}
//         {!loading && filteredOrders.length === 0 && (
//           <div className="py-24 text-center border-2 border-dashed border-gray-100 rounded-3xl text-gray-400">
//             No orders found for the selected criteria.
//           </div>
//         )}
//       </div>

//       {/* Pagination Row */}
//       {!loading && totalPages > 1 && (
//         <div className="flex justify-end items-center gap-2 mt-8">
//           <button 
//             disabled={currentPage === 1} 
//             onClick={() => setCurrentPage(prev => prev - 1)} 
//             className="p-2 text-gray-400 hover:text-[#6DC40B] disabled:opacity-20 transition-all"
//           >
//             <FiChevronLeft size={22} />
//           </button>
//           {[...Array(totalPages)].map((_, i) => (
//             <button 
//               key={i} 
//               onClick={() => setCurrentPage(i + 1)} 
//               className={`w-9 h-9 rounded-xl text-sm font-bold transition-all shadow-sm ${currentPage === i + 1 ? "bg-[#6DC40B] text-white" : "text-gray-400 bg-white border border-gray-100 hover:bg-gray-50"}`}
//             >
//               {i + 1}
//             </button>
//           ))}
//           <button 
//             disabled={currentPage === totalPages} 
//             onClick={() => setCurrentPage(prev => prev + 1)} 
//             className="p-2 text-gray-400 hover:text-[#6DC40B] disabled:opacity-20 transition-all"
//           >
//             <FiChevronRight size={22} />
//           </button>
//         </div>
//       )}

//       {/* --- Status Confirmation Modal --- */}
//       {showModal && (
//         <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in duration-200">
//             <div className="p-8 flex flex-col items-center text-center">
//               <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-4">
//                 <FiAlertCircle size={32} />
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 mb-2 font-sans tracking-tight">Update Status?</h3>
//               <p className="text-gray-500 text-sm leading-relaxed">
//                 Are you sure you want to change the order status to 
//                 <span className="font-bold text-[#6DC40B]"> {statusUpdateData.newStatus}</span>?
//               </p>
//             </div>
//             <div className="flex border-t border-gray-100">
//               <button 
//                 onClick={() => setShowModal(false)} 
//                 className="flex-1 py-4 text-sm font-bold text-gray-400 hover:bg-gray-50 transition-colors border-r border-gray-100"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleStatusUpdate} 
//                 className="flex-1 py-4 text-sm font-bold text-[#6DC40B] hover:bg-green-50 transition-colors"
//               >
//                 Apply Change
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderlistPage;


// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { 
//   FiSearch, FiCalendar, FiUpload, FiMoreHorizontal, 
//   FiChevronLeft, FiChevronRight, FiAlertCircle, FiChevronDown 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const OrderlistPage = () => {
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();

//   // --- Initializing States from URL Query Parameters ---
//   const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
//   const [startDate, setStartDate] = useState(searchParams.get("start") || "");
//   const [endDate, setEndDate] = useState(searchParams.get("end") || "");
//   const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "All orders");
//   const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);

//   // Data states
//   const [orders, setOrders] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 10;

//   // Status Update Modal States
//   const [showModal, setShowModal] = useState(false);
//   const [statusUpdateData, setStatusUpdateData] = useState({ id: null, newStatus: "" });

//   const tabs = ["All orders", "Completed", "Pending", "Cancelled"];

//   // --- 1. Sync State changes to URL ---
//   useEffect(() => {
//     const params = {};
//     if (searchTerm) params.search = searchTerm;
//     if (startDate) params.start = startDate;
//     if (endDate) params.end = endDate;
//     if (activeTab !== "All orders") params.tab = activeTab;
//     if (currentPage > 1) params.page = currentPage;
    
//     setSearchParams(params, { replace: true });
//   }, [searchTerm, startDate, endDate, activeTab, currentPage, setSearchParams]);

//   // --- 2. Fetch Data (Backend Filtering for Dates & Tabs) ---
//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     try {
//       let statusParam = "";
//       if (activeTab === "Completed") statusParam = "Delivered";
//       else if (activeTab === "Pending") statusParam = "Placed,Processing,Shipped";
//       else if (activeTab === "Cancelled") statusParam = "Cancelled";

//       const response = await api({
//         url: SummaryApi.getAllOrders.url,
//         method: SummaryApi.getAllOrders.method,
//         params: {
//           page: currentPage,
//           limit: itemsPerPage,
//           startDate: startDate,
//           endDate: endDate,
//           status: statusParam
//         }
//       });

//       if (response.data.success) {
//         setOrders(response.data.data);
//         setTotalPages(response.data.totalPages || 1); 
//       }
//     } catch (error) {
//       toast.error("Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, startDate, endDate, activeTab]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   // --- 3. Frontend Search Filter ---
//   const filteredOrders = useMemo(() => {
//     return orders.filter((order) => {
//       const customerName = `${order.billingAddress?.firstName || ""} ${order.billingAddress?.lastName || ""}`.toLowerCase();
//       const orderId = (order.orderId || "").toLowerCase();
//       const search = searchTerm.toLowerCase();
//       return customerName.includes(search) || orderId.includes(search);
//     });
//   }, [orders, searchTerm]);

//   // --- 4. Export Function ---
//   const handleExport = () => {
//     if (filteredOrders.length === 0) return toast.error("No data to export");
//     const headers = "Order ID,Customer,Amount,Date,Status\n";
//     const csvRows = filteredOrders.map(o => (
//       `${o.orderId},${o.billingAddress?.firstName} ${o.billingAddress?.lastName},${o.total},${new Date(o.createdAt).toLocaleDateString()},${o.status}`
//     )).join("\n");
//     const blob = new Blob([headers + csvRows], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `Orders_Report.csv`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   // --- 5. Status Update Logic ---
//   const openUpdateModal = (id, newStatus) => {
//     setStatusUpdateData({ id, newStatus });
//     setShowModal(true);
//   };

//   const handleStatusUpdate = async () => {
//     try {
//       const response = await api({
//         url: SummaryApi.updateOrderStatus.url(statusUpdateData.id),
//         method: SummaryApi.updateOrderStatus.method,
//         data: { status: statusUpdateData.newStatus }
//       });

//       if (response.data.success) {
//         const updatedOrder = response.data.data;
        
//         // Update frontend state immediately
//         setOrders(prevOrders => 
//           prevOrders.map(order => 
//             order._id === updatedOrder._id ? updatedOrder : order
//           )
//         );

//         toast.success("Status updated successfully");
//         setShowModal(false); // Close Modal
//         // fetchOrders(); // Optional: Re-fetch if backend logic changes totals/counts
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Error updating status");
//     }
//   };

//   // --- UI Helper: Styles ---
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "Delivered":
//       case "Completed": return "bg-[#E6FFF0] text-[#00B037] border-[#B3FFCC]";
//       case "Cancelled": return "bg-[#FFF0F0] text-[#FF4D4D] border-[#FFCCCC]";
//       default: return "bg-[#FFF7E6] text-[#FF9900] border-[#FFE5B3]";
//     }
//   };

//   return (
//     <div className="p-4 md:p-8 bg-[#FDFDFD] min-h-screen font-sans">
      
//       {/* Header Row */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-[#1A1A1A]">Orders</h1>
//         <button onClick={handleExport} className="bg-[#6DC40B] text-white px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:opacity-90 transition-all shadow-sm">
//           <FiUpload size={14} className="rotate-180" /> Export
//         </button>
//       </div>

//       {/* Tabs Row */}
//       <div className="flex items-center gap-6 border-b border-gray-100 mb-6 overflow-x-auto no-scrollbar">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
//             className={`pb-3 text-[15px] font-medium transition-all relative whitespace-nowrap ${activeTab === tab ? "text-[#6DC40B]" : "text-gray-400"}`}
//           >
//             {tab}
//             {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#6DC40B]" />}
//           </button>
//         ))}
//       </div>

//       {/* Filters Row: Big screen single row for Dates and Search */}
//       <div className="flex flex-col xl:flex-row items-end gap-4 mb-8">
//         <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
//           <div className="flex flex-col gap-1 flex-1 sm:w-48">
//             <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">START DATE</label>
//             <div className="relative">
//               <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <input 
//                 type="date" 
//                 className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full focus:outline-none focus:border-[#6DC40B] transition-all" 
//                 value={startDate} 
//                 onChange={(e) => { setStartDate(e.target.value); setCurrentPage(1); }} 
//               />
//             </div>
//           </div>
//           <div className="flex flex-col gap-1 flex-1 sm:w-48">
//             <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">END DATE</label>
//             <div className="relative">
//               <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <input 
//                 type="date" 
//                 className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full focus:outline-none focus:border-[#6DC40B] transition-all" 
//                 value={endDate} 
//                 onChange={(e) => { setEndDate(e.target.value); setCurrentPage(1); }} 
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col gap-1 w-full xl:flex-1">
//           <div className="relative">
//             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//             <input 
//               type="text" 
//               placeholder="Search by ID or Name...." 
//               className="pl-10 pr-4 py-2.5 bg-white border border-[#6DC40B] rounded-xl text-sm w-full focus:outline-none shadow-sm" 
//               value={searchTerm} 
//               onChange={(e) => setSearchTerm(e.target.value)} 
//             />
//           </div>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="overflow-x-auto min-h-[450px]">
//         <table className="w-full border-separate border-spacing-y-3 min-w-[1000px]">
//           <thead>
//             <tr className="text-[14px] font-bold text-[#2D3748]">
//               <th className="px-4 py-2 text-left font-bold">Order ID</th>
//               <th className="px-4 py-2 text-left font-bold">Customer</th>
//               <th className="px-4 py-2 text-left font-bold">Order Type</th>
//               <th className="px-4 py-2 text-center font-bold">Items</th>
//               <th className="px-4 py-2 text-left font-bold">Payment</th>
//               <th className="px-4 py-2 text-left font-bold">Amount</th>
//               <th className="px-4 py-2 text-left font-bold">Order date</th>
//               <th className="px-4 py-2 text-left font-bold">Status</th>
//               <th className="px-4 py-2 text-center font-bold">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {!loading && filteredOrders.map((order) => (
//               <tr key={order._id} className="text-[13px] group">
//                 <td className="px-4 py-4 bg-white border-y border-l border-gray-100 rounded-l-2xl text-gray-500">
//                    #{order.orderId}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-600 font-medium">
//                   {order.billingAddress?.firstName} {order.billingAddress?.lastName}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
//                   {order.total > 5000 ? "Bulk" : "Retail"}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-center text-gray-500">
//                   {order.items?.length || 0}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100">
//                   <span className={`px-2 py-1 rounded-md text-[11px] font-bold ${order.paymentStatus === 'Paid' ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'}`}>
//                     {order.paymentStatus}
//                   </span>
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 font-bold text-[#1A1A1A]">
//                   ₹{order.total?.toLocaleString()}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
//                   {new Date(order.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 relative">
//                    <div className="relative inline-block w-full">
//                     <select 
//                       value={order.status} 
//                       onChange={(e) => openUpdateModal(order._id, e.target.value)}
//                       className={`flex items-center justify-between px-3 py-1.5 rounded-lg border text-[12px] font-bold w-full outline-none cursor-pointer appearance-none ${getStatusStyle(order.status)}`}
//                     >
//                       <option value="Placed">Placed</option>
//                       <option value="Processing">Packaged</option>
//                       <option value="Shipped">Shipped</option>
//                       <option value="Delivered">Completed</option>
//                       <option value="Cancelled">Cancelled</option>
//                     </select>
//                     <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" size={14} />
//                    </div>
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-r border-gray-100 rounded-r-2xl text-center text-gray-300">
//                   <button onClick={() => navigate(`/admin-panel/order-list/order-overview`, { state: { id: order._id } })} className="hover:text-gray-600">
//                     <FiMoreHorizontal size={20} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {loading && <div className="text-center py-20 text-gray-400 font-medium">Loading data...</div>}
//         {!loading && filteredOrders.length === 0 && (
//           <div className="py-24 text-center border-2 border-dashed border-gray-100 rounded-3xl text-gray-400">
//             No orders found for the selected criteria.
//           </div>
//         )}
//       </div>

//       {/* Pagination */}
//       {!loading && totalPages > 1 && (
//         <div className="flex justify-end items-center gap-2 mt-8">
//           <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-2 text-gray-400 hover:text-[#6DC40B] disabled:opacity-20"><FiChevronLeft size={22} /></button>
//           {[...Array(totalPages)].map((_, i) => (
//             <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-9 h-9 rounded-xl text-sm font-bold shadow-sm transition-all ${currentPage === i + 1 ? "bg-[#6DC40B] text-white" : "text-gray-500 bg-white border hover:bg-gray-50"}`}>
//               {i + 1}
//             </button>
//           ))}
//           <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="p-2 text-gray-400 hover:text-[#6DC40B] disabled:opacity-20"><FiChevronRight size={22} /></button>
//         </div>
//       )}

//       {/* --- Custom Update Confirmation Modal --- */}
//       {showModal && (
//         <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in duration-200">
//             <div className="p-8 flex flex-col items-center text-center">
//               <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-4">
//                 <FiAlertCircle size={32} />
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 mb-2">Update Status?</h3>
//               <p className="text-gray-500 text-sm leading-relaxed">
//                 Are you sure you want to change the order status to 
//                 <span className="font-bold text-[#6DC40B]"> {statusUpdateData.newStatus}</span>?
//               </p>
//             </div>
//             <div className="flex border-t border-gray-100">
//               <button 
//                 onClick={() => setShowModal(false)} 
//                 className="flex-1 py-4 text-sm font-bold text-gray-400 hover:bg-gray-50 border-r border-gray-100 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleStatusUpdate} 
//                 className="flex-1 py-4 text-sm font-bold text-[#6DC40B] hover:bg-green-50 transition-colors"
//               >
//                 Apply Change
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderlistPage;


// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { 
//   FiSearch, FiCalendar, FiUpload, FiMoreHorizontal, 
//   FiChevronLeft, FiChevronRight, FiAlertCircle, FiChevronDown 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const OrderlistPage = () => {
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();

//   // --- Initializing States from URL Query Parameters ---
//   const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
//   const [startDate, setStartDate] = useState(searchParams.get("start") || "");
//   const [endDate, setEndDate] = useState(searchParams.get("end") || "");
//   const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "All orders");
//   const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);

//   // Data states
//   const [orders, setOrders] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 10;

//   // Status Update Modal States
//   const [showModal, setShowModal] = useState(false);
//   const [statusUpdateData, setStatusUpdateData] = useState({ id: null, newStatus: "" });

//   const tabs = ["All orders", "Completed", "Pending", "Cancelled"];

//   // --- Sync State to URL Query Parameters ---
//   useEffect(() => {
//     const params = {};
//     if (searchTerm) params.search = searchTerm;
//     if (startDate) params.start = startDate;
//     if (endDate) params.end = endDate;
//     if (activeTab !== "All orders") params.tab = activeTab;
//     if (currentPage > 1) params.page = currentPage;
    
//     setSearchParams(params, { replace: true });
//   }, [searchTerm, startDate, endDate, activeTab, currentPage, setSearchParams]);

//   // --- Fetch Data (Backend Filtered for Dates & Status) ---
//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     try {
//       let statusParam = "";
//       if (activeTab === "Completed") statusParam = "Delivered";
//       else if (activeTab === "Pending") statusParam = "Placed,Packaged,Shipped";
//       else if (activeTab === "Cancelled") statusParam = "Cancelled";

//       const response = await api({
//         url: SummaryApi.getAllOrders.url,
//         method: SummaryApi.getAllOrders.method,
//         params: {
//           page: currentPage,
//           limit: itemsPerPage,
//           startDate: startDate,
//           endDate: endDate,
//           status: statusParam
//         }
//       });

//       if (response.data.success) {
//         setOrders(response.data.data);
//         setTotalPages(response.data.totalPages || 1); 
//       }
//     } catch (error) {
//       toast.error("Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, startDate, endDate, activeTab]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   // --- Frontend Filter (Search by OrderID or Customer Name) ---
//   const filteredOrders = useMemo(() => {
//     return orders.filter((order) => {
//       const customerName = `${order.billingAddress?.firstName || ""} ${order.billingAddress?.lastName || ""}`.toLowerCase();
//       const orderId = (order.orderId || "").toLowerCase();
//       const search = searchTerm.toLowerCase();
//       return customerName.includes(search) || orderId.includes(search);
//     });
//   }, [orders, searchTerm]);

//   // --- Status Update Handler ---
//   const openUpdateModal = (id, newStatus) => {
//     setStatusUpdateData({ id, newStatus });
//     setShowModal(true);
//   };

//   const handleStatusUpdate = async () => {
//     try {
//       const response = await api({
//         url: SummaryApi.updateOrderStatus.url(statusUpdateData.id),
//         method: SummaryApi.updateOrderStatus.method,
//         data: { status: statusUpdateData.newStatus }
//       });

//         // 1. Update the specific order in the local state for instant UI change
//         setOrders(prevOrders => 
//           prevOrders.map(order => 
//             order._id === statusUpdateData.id 
//               ? { ...order, status: response.data.status } 
//               : order
//           )
//         );

//         // 2. Close the modal
//         setShowModal(false);
//         setStatusUpdateData({ id: null, newStatus: "" });
        
//         // 3. Optional: Trigger a refetch to ensure pagination/tabs are still correct
//         // fetchOrders(); 
        
//         toast.success("Order status updated");
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Error updating status");
//     }
//   };

//   const handleExport = () => {
//     if (filteredOrders.length === 0) return toast.error("No data to export");
//     const headers = "Order ID,Customer,Amount,Date,Status\n";
//     const csvRows = filteredOrders.map(o => (
//       `${o.orderId},${o.billingAddress?.firstName} ${o.billingAddress?.lastName},${o.total},${new Date(o.createdAt).toLocaleDateString()},${o.status}`
//     )).join("\n");
//     const blob = new Blob([headers + csvRows], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url; a.download = `Orders_${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "Delivered":
//       case "Completed": return "bg-[#E6FFF0] text-[#00B037] border-[#B3FFCC]";
//       case "Cancelled": return "bg-[#FFF0F0] text-[#FF4D4D] border-[#FFCCCC]";
//       default: return "bg-[#FFF7E6] text-[#FF9900] border-[#FFE5B3]";
//     }
//   };

//   return (
//     <div className="p-4 md:p-8 bg-[#FDFDFD] min-h-screen font-sans">
      
//       {/* --- Header --- */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-[#1A1A1A]">Orders</h1>
//         <button onClick={handleExport} className="bg-[#6DC40B] text-white px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:opacity-90 transition-all shadow-sm">
//           <FiUpload size={14} className="rotate-180" /> Export
//         </button>
//       </div>

//       {/* --- Tabs --- */}
//       <div className="flex items-center gap-6 border-b border-gray-100 mb-6 overflow-x-auto no-scrollbar">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
//             className={`pb-3 text-[15px] font-medium transition-all relative whitespace-nowrap ${activeTab === tab ? "text-[#6DC40B]" : "text-gray-400"}`}
//           >
//             {tab}
//             {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#6DC40B]" />}
//           </button>
//         ))}
//       </div>

//       {/* --- Filters Row --- */}
//       <div className="flex flex-col xl:flex-row items-end gap-4 mb-8">
//         <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
//           <div className="flex flex-col gap-1 flex-1 sm:w-48">
//             <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">START DATE</label>
//             <div className="relative">
//               <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <input 
//                 type="date" 
//                 className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full focus:outline-none focus:border-[#6DC40B] transition-all shadow-sm" 
//                 value={startDate} 
//                 onChange={(e) => { setStartDate(e.target.value); setCurrentPage(1); }} 
//               />
//             </div>
//           </div>
//           <div className="flex flex-col gap-1 flex-1 sm:w-48">
//             <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">END DATE</label>
//             <div className="relative">
//               <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <input 
//                 type="date" 
//                 className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full focus:outline-none focus:border-[#6DC40B] transition-all shadow-sm" 
//                 value={endDate} 
//                 onChange={(e) => { setEndDate(e.target.value); setCurrentPage(1); }} 
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col gap-1 w-full xl:flex-1">
//           <div className="relative">
//             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//             <input 
//               type="text" 
//               placeholder="Search by ID or Name...." 
//               className="pl-10 pr-4 py-2.5 bg-white border border-[#6DC40B] rounded-xl text-sm w-full focus:outline-none shadow-sm" 
//               value={searchTerm} 
//               onChange={(e) => setSearchTerm(e.target.value)} 
//             />
//           </div>
//         </div>
//       </div>

//       {/* --- Table Section --- */}
//       <div className="overflow-x-auto min-h-[450px]">
//         <table className="w-full border-separate border-spacing-y-3 min-w-[1000px]">
//           <thead>
//             <tr className="text-[14px] font-bold text-[#2D3748]">
//               <th className="px-4 py-2 text-left">Order ID</th>
//               <th className="px-4 py-2 text-left">Customer</th>
//               <th className="px-4 py-2 text-left">Order Type</th>
//               <th className="px-4 py-2 text-center">Items</th>
//               <th className="px-4 py-2 text-left">Payment</th>
//               <th className="px-4 py-2 text-left">Amount</th>
//               <th className="px-4 py-2 text-left">Order date</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {!loading && filteredOrders.map((order) => (
//               <tr key={order._id} className="text-[13px] group">
//                 <td className="px-4 py-4 bg-white border-y border-l border-gray-100 rounded-l-2xl text-gray-500 font-medium">
//                    #{order.orderId}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-600 font-medium">
//                   {order.billingAddress?.firstName} {order.billingAddress?.lastName}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
//                   {order.total > 5000 ? "Bulk" : "Retail"}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-center text-gray-500">
//                   {order.items?.length || 0}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100">
//                   <span className={`px-2 py-1 rounded-md text-[11px] font-bold ${order.paymentStatus === 'Paid' ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'}`}>
//                     {order.paymentStatus}
//                   </span>
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 font-bold text-[#1A1A1A]">
//                   ₹{order.total?.toLocaleString()}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
//                   {new Date(order.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 relative">
//                    <div className="relative inline-block w-full">
//                     <select 
//                       value={order.status} 
//                       onChange={(e) => openUpdateModal(order._id, e.target.value)}
//                       className={`flex items-center justify-between px-3 py-1.5 rounded-lg border text-[12px] font-bold w-full outline-none cursor-pointer appearance-none transition-all ${getStatusStyle(order.status)}`}
//                     >
//                       <option value="Placed">Placed</option>
//                       <option value="Packaged">Packaged</option>
//                       <option value="Shipped">Shipped</option>
//                       <option value="Delivered">Completed</option>
//                       <option value="Cancelled">Cancelled</option>
//                     </select>
//                     <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" size={14} />
//                    </div>
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-r border-gray-100 rounded-r-2xl text-center text-gray-300">
//                   <button onClick={() => navigate(`/admin-panel/order-list/order-overview`, { state: { id: order._id } })} className="hover:text-gray-600 transition-colors">
//                     <FiMoreHorizontal size={20} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {loading && <div className="text-center py-20 text-gray-400 font-medium animate-pulse">Fetching orders...</div>}
//         {!loading && filteredOrders.length === 0 && (
//           <div className="py-24 text-center border-2 border-dashed border-gray-100 rounded-3xl text-gray-400">
//             No orders found for the selected criteria.
//           </div>
//         )}
//       </div>

//       {/* --- Pagination --- */}
//       {!loading && totalPages > 1 && (
//         <div className="flex justify-end items-center gap-2 mt-8">
//           <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-2 text-gray-400 hover:text-[#6DC40B] transition-all"><FiChevronLeft size={22} /></button>
//           {[...Array(totalPages)].map((_, i) => (
//             <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-9 h-9 rounded-xl text-sm font-bold shadow-sm ${currentPage === i + 1 ? "bg-[#6DC40B] text-white" : "text-gray-400 bg-white border border-gray-100"}`}>
//               {i + 1}
//             </button>
//           ))}
//           <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="p-2 text-gray-400 hover:text-[#6DC40B] transition-all"><FiChevronRight size={22} /></button>
//         </div>
//       )}

//       {/* --- Status Confirmation Modal --- */}
//       {showModal && (
//         <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in duration-200">
//             <div className="p-8 flex flex-col items-center text-center">
//               <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-4">
//                 <FiAlertCircle size={32} />
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 mb-2 font-sans tracking-tight">Update Status?</h3>
//               <p className="text-gray-500 text-sm leading-relaxed">
//                 Are you sure you want to change the order status to 
//                 <span className="font-bold text-[#6DC40B]"> {statusUpdateData.newStatus}</span>?
//               </p>
//             </div>
//             <div className="flex border-t border-gray-100">
//               <button onClick={() => setShowModal(false)} className="flex-1 py-4 text-sm font-bold text-gray-400 hover:bg-gray-50 transition-colors border-r border-gray-100">Cancel</button>
//               <button onClick={handleStatusUpdate} className="flex-1 py-4 text-sm font-bold text-[#6DC40B] hover:bg-green-50 transition-colors">Apply Change</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderlistPage;


// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { 
//   FiSearch, FiCalendar, FiUpload, FiMoreHorizontal, 
//   FiChevronLeft, FiChevronRight, FiAlertCircle, FiChevronDown 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const OrderlistPage = () => {
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();

//   // --- Initializing States from URL Query Parameters ---
//   const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
//   const [startDate, setStartDate] = useState(searchParams.get("start") || "");
//   const [endDate, setEndDate] = useState(searchParams.get("end") || "");
//   const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "All orders");
//   const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);

//   // Data states
//   const [orders, setOrders] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 10;

//   // Status Update Modal States
//   const [showModal, setShowModal] = useState(false);
//   const [statusUpdateData, setStatusUpdateData] = useState({ id: null, newStatus: "" });

//   const tabs = ["All orders", "Completed", "Pending", "Cancelled"];

//   // --- Sync State to URL Query Parameters ---
//   useEffect(() => {
//     const params = {};
//     if (searchTerm) params.search = searchTerm;
//     if (startDate) params.start = startDate;
//     if (endDate) params.end = endDate;
//     if (activeTab !== "All orders") params.tab = activeTab;
//     if (currentPage > 1) params.page = currentPage;
    
//     setSearchParams(params, { replace: true });
//   }, [searchTerm, startDate, endDate, activeTab, currentPage, setSearchParams]);

//   // --- Fetch Data ---
//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     try {
//       let statusParam = "";
//       if (activeTab === "Completed") statusParam = "Delivered";
//       else if (activeTab === "Pending") statusParam = "Placed,Packaged,Shipped";
//       else if (activeTab === "Cancelled") statusParam = "Cancelled";

//       const response = await api({
//         url: SummaryApi.getAllOrders.url,
//         method: SummaryApi.getAllOrders.method,
//         params: {
//           page: currentPage,
//           limit: itemsPerPage,
//           startDate: startDate,
//           endDate: endDate,
//           status: statusParam
//         }
//       });

//       if (response.data.success) {
//         setOrders(response.data.data);
//         setTotalPages(response.data.totalPages || 1); 
//       }
//     } catch (error) {
//       toast.error("Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, startDate, endDate, activeTab]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   // --- Frontend Filter ---
//   const filteredOrders = useMemo(() => {
//     return orders.filter((order) => {
//       const customerName = `${order.billingAddress?.firstName || ""} ${order.billingAddress?.lastName || ""}`.toLowerCase();
//       const orderId = (order.orderId || "").toLowerCase();
//       const search = searchTerm.toLowerCase();
//       return customerName.includes(search) || orderId.includes(search);
//     });
//   }, [orders, searchTerm]);

//   // --- Status Update Handler ---
//   const openUpdateModal = (id, newStatus) => {
//     setStatusUpdateData({ id, newStatus });
//     setShowModal(true);
//   };

//   const handleStatusUpdate = async () => {
//     try {
//       const response = await api({
//         url: SummaryApi.updateOrderStatus.url(statusUpdateData.id),
//         method: SummaryApi.updateOrderStatus.method,
//         data: { status: statusUpdateData.newStatus }
//       });

//         // Update local state for instant UI feedback
//         setOrders(prevOrders => 
//           prevOrders.map(order => 
//             order._id === statusUpdateData.id 
//               ? { ...order, status: response.data.status } 
//               : order
//           )
//         );
//         setShowModal(false);
//         setStatusUpdateData({ id: null, newStatus: "" });
//         toast.success("Order status updated");
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Error updating status");
//     }
//   };

//   const handleExport = () => {
//     if (filteredOrders.length === 0) return toast.error("No data to export");
//     const headers = "Order ID,Customer,Amount,Date,Status\n";
//     const csvRows = filteredOrders.map(o => (
//       `${o.orderId},${o.billingAddress?.firstName} ${o.billingAddress?.lastName},${o.total},${new Date(o.createdAt).toLocaleDateString()},${o.status}`
//     )).join("\n");
//     const blob = new Blob([headers + csvRows], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url; a.download = `Orders_Report.csv`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   // --- UI Helper: Status Style ---
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "Delivered":
//       case "Completed": return "bg-[#E6FFF0] text-[#00B037] border-[#B3FFCC]";
//       case "Cancelled": return "bg-[#FFF0F0] text-[#FF4D4D] border-[#FFCCCC]";
//       default: return "bg-[#FFF7E6] text-[#FF9900] border-[#FFE5B3]";
//     }
//   };

//   return (
//     <div>
      
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-[#1A1A1A]">Orders</h1>
//         <button onClick={handleExport} className="bg-[#6DC40B] text-white px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:opacity-90 transition-all shadow-sm">
//           <FiUpload size={14} className="rotate-180" /> Export
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="flex items-center gap-6 border-b border-gray-100 mb-6 overflow-x-auto no-scrollbar">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
//             className={`pb-3 text-[15px] font-medium transition-all relative whitespace-nowrap ${activeTab === tab ? "text-[#6DC40B]" : "text-gray-400"}`}
//           >
//             {tab}
//             {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#6DC40B]" />}
//           </button>
//         ))}
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col xl:flex-row items-end gap-4 mb-8">
//         <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
//           <div className="flex flex-col gap-1 flex-1 sm:w-48">
//             <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">START DATE</label>
//             <div className="relative">
//               <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <input 
//                 type="date" 
//                 className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full focus:outline-none focus:border-[#6DC40B] transition-all shadow-sm" 
//                 value={startDate} 
//                 onChange={(e) => { setStartDate(e.target.value); setCurrentPage(1); }} 
//               />
//             </div>
//           </div>
//           <div className="flex flex-col gap-1 flex-1 sm:w-48">
//             <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">END DATE</label>
//             <div className="relative">
//               <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <input 
//                 type="date" 
//                 className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full focus:outline-none focus:border-[#6DC40B] transition-all shadow-sm" 
//                 value={endDate} 
//                 onChange={(e) => { setEndDate(e.target.value); setCurrentPage(1); }} 
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col gap-1 w-full xl:flex-1">
//           <div className="relative">
//             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//             <input 
//               type="text" 
//               placeholder="Search by ID or Name...." 
//               className="pl-10 pr-4 py-2.5 bg-white border border-[#6DC40B] rounded-xl text-sm w-full focus:outline-none shadow-sm" 
//               value={searchTerm} 
//               onChange={(e) => setSearchTerm(e.target.value)} 
//             />
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full border-separate border-spacing-y-3 min-w-[1100px]">
//           <thead>
//             <tr className="text-[14px] font-semibold text-[#2D3748] bg-gray-100">
//               <th className="px-4 py-4 text-left rounded-l-lg">Order ID</th>
//               <th className="px-4 py-4 text-left">Customer</th>
//               <th className="px-4 py-4 text-left">Order Type</th>
//               <th className="px-4 py-4 text-center">Items</th>
//               <th className="px-4 py-4 text-left">Payment</th>
//               <th className="px-4 py-4 text-left">Amount</th>
//               <th className="px-4 py-4 text-left">Order date</th>
//               <th className="px-4 py-4 text-left min-w-[150px]">Status</th>
//               <th className="px-4 py-4 text-center rounded-r-lg">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {!loading && filteredOrders.map((order) => (
//               <tr key={order._id} className="text-[13px] group">
//                 <td className="px-4 py-4 bg-white border-y border-l border-gray-100 rounded-l-2xl text-gray-500 font-medium">
//                    #{order.orderId}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-600 font-medium">
//                   {order.billingAddress?.firstName} {order.billingAddress?.lastName}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
//                   {order.total > 5000 ? "Bulk" : "Retail"}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-center text-gray-500">
//                   {order.items?.length || 0}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100">
//                   <span className={`px-2 py-1 rounded-md text-[11px] font-bold ${order.paymentStatus === 'Paid' ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'}`}>
//                     {order.paymentStatus}
//                   </span>
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 font-bold text-[#1A1A1A]">
//                   ₹{order.total?.toLocaleString()}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500 whitespace-nowrap">
//                   {new Date(order.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100">
//                    <div className="relative w-full max-w-[130px]">
//                     <select 
//                       value={order.status === 'Delivered' ? 'Delivered' : order.status} 
//                       onChange={(e) => openUpdateModal(order._id, e.target.value)}
//                       className={`flex items-center justify-between px-3 pr-8 py-1.5 rounded-lg border text-[11px] font-bold w-full outline-none cursor-pointer appearance-none transition-all ${getStatusStyle(order.status)}`}
//                     >
//                       <option value="Placed">Placed</option>
//                       <option value="Packaged">Packaged</option>
//                       <option value="Shipped">Shipped</option>
//                       <option value="Delivered">Completed</option>
//                       <option value="Cancelled">Cancelled</option>
//                     </select>
//                     <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-70" size={14} />
//                    </div>
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-r border-gray-100 rounded-r-2xl text-center text-gray-300">
//                   <button onClick={() => navigate(`/admin-panel/order-list/order-overview/${order._id}`, { state: { id: order._id } })} className="hover:text-gray-600">
//                     <FiMoreHorizontal size={20} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {loading && <div className="text-center py-20 text-gray-400 font-medium">Loading orders...</div>}
//         {!loading && filteredOrders.length === 0 && (
//           <div className="py-24 text-center border-2 border-dashed border-gray-100 rounded-3xl text-gray-400">
//             No orders found for the selected criteria.
//           </div>
//         )}
//       </div>

//       {/* Pagination */}
//       {!loading && totalPages > 1 && (
//         <div className="flex justify-end items-center gap-2 mt-8">
//           <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-2 text-gray-400 hover:text-[#6DC40B] transition-all"><FiChevronLeft size={22} /></button>
//           {[...Array(totalPages)].map((_, i) => (
//             <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-9 h-9 rounded-xl text-sm font-bold shadow-sm ${currentPage === i + 1 ? "bg-[#6DC40B] text-white" : "text-gray-400 bg-white border border-gray-100"}`}>
//               {i + 1}
//             </button>
//           ))}
//           <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="p-2 text-gray-400 hover:text-[#6DC40B] transition-all"><FiChevronRight size={22} /></button>
//         </div>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in duration-200">
//             <div className="p-8 flex flex-col items-center text-center">
//               <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-4">
//                 <FiAlertCircle size={32} />
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 mb-2">Update Status?</h3>
//               <p className="text-gray-500 text-sm leading-relaxed">
//                 Change order status to <span className="font-bold text-[#6DC40B]">{statusUpdateData.newStatus === 'Delivered' ? 'Completed' : statusUpdateData.newStatus}</span>?
//               </p>
//             </div>
//             <div className="flex border-t border-gray-100">
//               <button onClick={() => setShowModal(false)} className="flex-1 py-4 text-sm font-bold text-gray-400 hover:bg-gray-50 transition-colors border-r border-gray-100">Cancel</button>
//               <button onClick={handleStatusUpdate} className="flex-1 py-4 text-sm font-bold text-[#6DC40B] hover:bg-green-50 transition-colors">Apply Change</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderlistPage;



// import React, { useState, useEffect, useCallback, useMemo, useRef } from "react"; // Added useRef
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { 
//   FiSearch, FiCalendar, FiUpload, FiMoreHorizontal, 
//   FiChevronLeft, FiChevronRight, FiAlertCircle, FiChevronDown 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const OrderlistPage = () => {
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();

//   // --- Initializing States from URL Query Parameters ---
//   const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
//   const [startDate, setStartDate] = useState(searchParams.get("start") || "");
//   const [endDate, setEndDate] = useState(searchParams.get("end") || "");
//   const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "All orders");
//   const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);

//   // Data states
//   const [orders, setOrders] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 10;

//   // Dropdown States for Action Menu
//   const [openMenuId, setOpenMenuId] = useState(null);
//   const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

//   // Refs for positioning and outside click
//   const btnRefs = useRef({});
//   const menuRef = useRef(null);

//   // Status Update Modal States
//   const [showModal, setShowModal] = useState(false);
//   const [statusUpdateData, setStatusUpdateData] = useState({ id: null, newStatus: "" });

//   const tabs = ["All orders", "Completed", "Pending", "Cancelled"];

//   // --- Dropdown Logic (Same as ProductList) ---
//   useEffect(() => {
//     const handleScroll = () => setOpenMenuId(null);
//     window.addEventListener("scroll", handleScroll, true);
//     return () => window.removeEventListener("scroll", handleScroll, true);
//   }, []);

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

//   const handleToggle = (id) => {
//     if (openMenuId === id) {
//       setOpenMenuId(null);
//     } else {
//       const rect = btnRefs.current[id].getBoundingClientRect();
//       const menuHeight = 50; // Height for single "View Order" option
//       const spaceBelow = window.innerHeight - rect.bottom;
      
//       const top = spaceBelow < menuHeight ? rect.top - menuHeight - 5 : rect.bottom + 5;
//       const left = rect.right - 150;

//       setMenuPosition({ top, left });
//       setOpenMenuId(id);
//     }
//   };

//   // --- Sync State to URL Query Parameters ---
//   useEffect(() => {
//     const params = {};
//     if (searchTerm) params.search = searchTerm;
//     if (startDate) params.start = startDate;
//     if (endDate) params.end = endDate;
//     if (activeTab !== "All orders") params.tab = activeTab;
//     if (currentPage > 1) params.page = currentPage;
    
//     setSearchParams(params, { replace: true });
//   }, [searchTerm, startDate, endDate, activeTab, currentPage, setSearchParams]);

//   // --- Fetch Data ---
//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     try {
//       let statusParam = "";
//       if (activeTab === "Completed") statusParam = "Delivered";
//       else if (activeTab === "Pending") statusParam = "Placed,Packaged,Shipped";
//       else if (activeTab === "Cancelled") statusParam = "Cancelled";

//       const response = await api({
//         url: SummaryApi.getAllOrders.url,
//         method: SummaryApi.getAllOrders.method,
//         params: {
//           page: currentPage,
//           limit: itemsPerPage,
//           startDate: startDate,
//           endDate: endDate,
//           status: statusParam
//         }
//       });

//       if (response.data.success) {
//         setOrders(response.data.data);
//         setTotalPages(response.data.totalPages || 1); 
//       }
//     } catch (error) {
//       toast.error("Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, startDate, endDate, activeTab]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   // --- Frontend Filter ---
//   const filteredOrders = useMemo(() => {
//     return orders.filter((order) => {
//       const customerName = `${order.billingAddress?.firstName || ""} ${order.billingAddress?.lastName || ""}`.toLowerCase();
//       const orderId = (order.orderId || "").toLowerCase();
//       const search = searchTerm.toLowerCase();
//       return customerName.includes(search) || orderId.includes(search);
//     });
//   }, [orders, searchTerm]);

//   // --- Status Update Handler ---
//   const openUpdateModal = (id, newStatus) => {
//     setStatusUpdateData({ id, newStatus });
//     setShowModal(true);
//   };

//   const handleStatusUpdate = async () => {
//     try {
//       const response = await api({
//         url: SummaryApi.updateOrderStatus.url(statusUpdateData.id),
//         method: SummaryApi.updateOrderStatus.method,
//         data: { status: statusUpdateData.newStatus }
//       });

//         setOrders(prevOrders => 
//           prevOrders.map(order => 
//             order._id === statusUpdateData.id 
//               ? { ...order, status: response.data.status } 
//               : order
//           )
//         );
//         setShowModal(false);
//         setStatusUpdateData({ id: null, newStatus: "" });
//         toast.success("Order status updated");
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Error updating status");
//     }
//   };

//   const handleExport = () => {
//     if (filteredOrders.length === 0) return toast.error("No data to export");
//     const headers = "Order ID,Customer,Amount,Date,Status\n";
//     const csvRows = filteredOrders.map(o => (
//       `${o.orderId},${o.billingAddress?.firstName} ${o.billingAddress?.lastName},${o.total},${new Date(o.createdAt).toLocaleDateString()},${o.status}`
//     )).join("\n");
//     const blob = new Blob([headers + csvRows], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url; a.download = `Orders_Report.csv`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "Delivered":
//       case "Completed": return "bg-[#E6FFF0] text-[#00B037] border-[#B3FFCC]";
//       case "Cancelled": return "bg-[#FFF0F0] text-[#FF4D4D] border-[#FFCCCC]";
//       default: return "bg-[#FFF7E6] text-[#FF9900] border-[#FFE5B3]";
//     }
//   };

//   return (
//     <div>
      
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-[#1A1A1A]">Orders</h1>
//         <button onClick={handleExport} className="bg-[#6DC40B] text-white px-5 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:opacity-90 transition-all shadow-sm">
//           <FiUpload size={14} className="rotate-180" /> Export
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className="flex items-center gap-6 border-b border-gray-100 mb-6 overflow-x-auto no-scrollbar">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
//             className={`pb-3 text-[15px] font-medium transition-all relative whitespace-nowrap ${activeTab === tab ? "text-[#6DC40B]" : "text-gray-400"}`}
//           >
//             {tab}
//             {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#6DC40B]" />}
//           </button>
//         ))}
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col xl:flex-row items-end gap-4 mb-8">
//         <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
//           <div className="flex flex-col gap-1 flex-1 sm:w-48">
//             <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">START DATE</label>
//             <div className="relative">
//               <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <input 
//                 type="date" 
//                 className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full focus:outline-none focus:border-[#6DC40B] transition-all shadow-sm" 
//                 value={startDate} 
//                 onChange={(e) => { setStartDate(e.target.value); setCurrentPage(1); }} 
//               />
//             </div>
//           </div>
//           <div className="flex flex-col gap-1 flex-1 sm:w-48">
//             <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">END DATE</label>
//             <div className="relative">
//               <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//               <input 
//                 type="date" 
//                 className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full focus:outline-none focus:border-[#6DC40B] transition-all shadow-sm" 
//                 value={endDate} 
//                 onChange={(e) => { setEndDate(e.target.value); setCurrentPage(1); }} 
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col gap-1 w-full xl:flex-1">
//           <div className="relative">
//             <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//             <input 
//               type="text" 
//               placeholder="Search by ID or Name...." 
//               className="pl-10 pr-4 py-2.5 bg-white border border-[#6DC40B] rounded-xl text-sm w-full focus:outline-none shadow-sm" 
//               value={searchTerm} 
//               onChange={(e) => setSearchTerm(e.target.value)} 
//             />
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto min-h-[400px]">
//         <table className="w-full border-separate border-spacing-y-3 min-w-[1100px]">
//           <thead>
//             <tr className="text-[14px] font-semibold text-[#2D3748] bg-gray-100">
//               <th className="px-4 py-4 text-left rounded-l-lg">Order ID</th>
//               <th className="px-4 py-4 text-left">Customer</th>
//               <th className="px-4 py-4 text-left">Order Type</th>
//               <th className="px-4 py-4 text-center">Items</th>
//               <th className="px-4 py-4 text-left">Payment</th>
//               <th className="px-4 py-4 text-left">Amount</th>
//               <th className="px-4 py-4 text-left">Order date</th>
//               <th className="px-4 py-4 text-left min-w-[150px]">Status</th>
//               <th className="px-4 py-4 text-center rounded-r-lg">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {!loading && filteredOrders.map((order) => (
//               <tr key={order._id} className="text-[13px] group">
//                 <td className="px-4 py-4 bg-white border-y border-l border-gray-100 rounded-l-2xl text-gray-500 font-medium">
//                    #{order.orderId}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-600 font-medium">
//                   {order.billingAddress?.firstName} {order.billingAddress?.lastName}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
//                   {order.total > 5000 ? "Bulk" : "Retail"}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-center text-gray-500">
//                   {order.items?.length || 0}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100">
//                   <span className={`px-2 py-1 rounded-md text-[11px] font-bold ${order.paymentStatus === 'Paid' ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'}`}>
//                     {order.paymentStatus}
//                   </span>
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 font-bold text-[#1A1A1A]">
//                   ₹{order.total?.toLocaleString()}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500 whitespace-nowrap">
//                   {new Date(order.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}
//                 </td>
//                 <td className="px-4 py-4 bg-white border-y border-gray-100">
//                    <div className="relative w-full max-w-[130px]">
//                     <select 
//                       value={order.status === 'Delivered' ? 'Delivered' : order.status} 
//                       onChange={(e) => openUpdateModal(order._id, e.target.value)}
//                       className={`flex items-center justify-between px-3 pr-8 py-1.5 rounded-lg border text-[11px] font-bold w-full outline-none cursor-pointer appearance-none transition-all ${getStatusStyle(order.status)}`}
//                     >
//                       <option value="Placed">Placed</option>
//                       <option value="Packaged">Packaged</option>
//                       <option value="Shipped">Shipped</option>
//                       <option value="Delivered">Completed</option>
//                       <option value="Cancelled">Cancelled</option>
//                     </select>
//                     <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-70" size={14} />
//                    </div>
//                 </td>

//                 {/* UPDATED ACTION COLUMN */}
//                 <td className="px-4 py-4 bg-white border-y border-r border-gray-100 rounded-r-2xl text-center relative">
//                    <button
//                       ref={(el) => (btnRefs.current[order._id] = el)}
//                       onClick={() => handleToggle(order._id)}
//                       className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-800 transition-colors"
//                     >
//                       <FiMoreHorizontal size={20} />
//                     </button>

//                     {openMenuId === order._id && (
//                       <div
//                         ref={menuRef}
//                         className="fixed w-40 bg-white border border-gray-100 rounded-xl shadow-xl text-sm z-[9999] overflow-hidden"
//                         style={{ top: menuPosition.top, left: menuPosition.left }}
//                       >
//                         <button 
//                           onClick={() => { setOpenMenuId(null); navigate(`/admin-panel/order-list/order-overview/${order._id}`); }} 
//                           className="block w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
//                         >
//                           View Order
//                         </button>
//                       </div>
//                     )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {loading && <div className="text-center py-20 text-gray-400 font-medium">Loading orders...</div>}
//         {!loading && filteredOrders.length === 0 && (
//           <div className="py-24 text-center border-2 border-dashed border-gray-100 rounded-3xl text-gray-400">
//             No orders found for the selected criteria.
//           </div>
//         )}
//       </div>

//       {/* Pagination & Modal remain unchanged... */}
//       {!loading && totalPages > 1 && (
//         <div className="flex justify-end items-center gap-2 mt-8">
//           <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-2 text-gray-400 hover:text-[#6DC40B] transition-all"><FiChevronLeft size={22} /></button>
//           {[...Array(totalPages)].map((_, i) => (
//             <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-9 h-9 rounded-xl text-sm font-bold shadow-sm ${currentPage === i + 1 ? "bg-[#6DC40B] text-white" : "text-gray-400 bg-white border border-gray-100"}`}>
//               {i + 1}
//             </button>
//           ))}
//           <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="p-2 text-gray-400 hover:text-[#6DC40B] transition-all"><FiChevronRight size={22} /></button>
//         </div>
//       )}

//       {showModal && (
//         <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in duration-200">
//             <div className="p-8 flex flex-col items-center text-center">
//               <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-4">
//                 <FiAlertCircle size={32} />
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 mb-2">Update Status?</h3>
//               <p className="text-gray-500 text-sm leading-relaxed">
//                 Change order status to <span className="font-bold text-[#6DC40B]">{statusUpdateData.newStatus === 'Delivered' ? 'Completed' : statusUpdateData.newStatus}</span>?
//               </p>
//             </div>
//             <div className="flex border-t border-gray-100">
//               <button onClick={() => setShowModal(false)} className="flex-1 py-4 text-sm font-bold text-gray-400 hover:bg-gray-50 transition-colors border-r border-gray-100">Cancel</button>
//               <button onClick={handleStatusUpdate} className="flex-1 py-4 text-sm font-bold text-[#6DC40B] hover:bg-green-50 transition-colors">Apply Change</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderlistPage;


import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  FiSearch, FiCalendar, FiDownload, FiMoreHorizontal, 
  FiChevronLeft, FiChevronRight, FiAlertCircle, FiChevronDown 
} from "react-icons/fi";
import * as XLSX from 'xlsx'; // Import the Excel library
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";

const OrderlistPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [startDate, setStartDate] = useState(searchParams.get("start") || "");
  const [endDate, setEndDate] = useState(searchParams.get("end") || "");
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "All orders");
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);

  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const btnRefs = useRef({});
  const menuRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [statusUpdateData, setStatusUpdateData] = useState({ id: null, newStatus: "" });

  const tabs = ["All orders", "Completed", "Pending", "Cancelled"];

  // --- Dropdown Logic ---
  useEffect(() => {
    const handleScroll = () => setOpenMenuId(null);
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

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

  const handleToggle = (id) => {
    if (openMenuId === id) {
      setOpenMenuId(null);
    } else {
      const rect = btnRefs.current[id].getBoundingClientRect();
      const menuHeight = 50;
      const spaceBelow = window.innerHeight - rect.bottom;
      const top = spaceBelow < menuHeight ? rect.top - menuHeight - 5 : rect.bottom + 5;
      const left = rect.right - 150;
      setMenuPosition({ top, left });
      setOpenMenuId(id);
    }
  };

  // --- Fetch Data ---
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      let statusParam = "";
      if (activeTab === "Completed") statusParam = "Delivered";
      else if (activeTab === "Pending") statusParam = "Placed,Packaged,Shipped,Processing";
      else if (activeTab === "Cancelled") statusParam = "Cancelled";

      const response = await api({
        url: SummaryApi.getAllOrders.url,
        method: SummaryApi.getAllOrders.method,
        params: {
          page: currentPage,
          limit: itemsPerPage,
          startDate: startDate,
          endDate: endDate,
          status: statusParam
        }
      });

      if (response.data.success) {
        setOrders(response.data.data);
        setTotalPages(response.data.totalPages || 1); 
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [currentPage, startDate, endDate, activeTab]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  // --- Sync State to URL ---
  useEffect(() => {
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (startDate) params.start = startDate;
    if (endDate) params.end = endDate;
    if (activeTab !== "All orders") params.tab = activeTab;
    if (currentPage > 1) params.page = currentPage;
    setSearchParams(params, { replace: true });
  }, [searchTerm, startDate, endDate, activeTab, currentPage, setSearchParams]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const customerName = `${order.billingAddress?.firstName || ""} ${order.billingAddress?.lastName || ""}`.toLowerCase();
      const orderId = (order.orderId || "").toLowerCase();
      const search = searchTerm.toLowerCase();
      return customerName.includes(search) || orderId.includes(search);
    });
  }, [orders, searchTerm]);

  // --- Excel Export with Column Width Auto-Adjustment ---
  const handleExportExcel = () => {
    if (filteredOrders.length === 0) return toast.error("No data to export");

    // Prepare the data
    const exportData = filteredOrders.map((o, index) => ({
      "S.No": index + 1,
      "Order ID": o.orderId,
      "Customer Name": `${o.billingAddress?.firstName || "N/A"} ${o.billingAddress?.lastName || ""}`.trim(),
      "Contact": o.billingAddress?.phone || "N/A",
      "Total Amount": o.total,
      "Items Count": o.items?.length || 0,
      "Payment Method": o.paymentMethod,
      "Payment Status": o.paymentStatus,
      "Status": o.status,
      "Order Date": new Date(o.createdAt).toLocaleDateString('en-GB')
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // --- Dynamic Column Width Calculation ---
    const objectMaxLength = [];
    exportData.forEach((row) => {
        Object.keys(row).forEach((key, i) => {
            const value = row[key] ? row[key].toString() : "";
            const currentWidth = Math.max(key.length, value.length);
            objectMaxLength[i] = Math.max(objectMaxLength[i] || 0, currentWidth);
        });
    });

    // Set width (adding 2 for padding)
    worksheet["!cols"] = objectMaxLength.map(w => ({ wch: w + 2 }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders Report");

    // Download file
    XLSX.writeFile(workbook, `Orders_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
    toast.success("Excel file generated!");
  };

  const handleStatusUpdate = async () => {
    try {
      const response = await api({
        url: SummaryApi.updateOrderStatus.url(statusUpdateData.id),
        method: SummaryApi.updateOrderStatus.method,
        data: { status: statusUpdateData.newStatus }
      });
      setOrders(prev => prev.map(o => o._id === statusUpdateData.id ? { ...o, status: response.data.status } : o));
      setShowModal(false);
      toast.success("Status updated");
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-50 text-green-600 border-green-100";
      case "Cancelled": return "bg-red-50 text-red-600 border-red-100";
      default: return "bg-orange-50 text-orange-600 border-orange-100";
    }
  };

  return (
    <div className="p-1">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Order List</h1>
        <button 
          onClick={handleExportExcel} 
          className="bg-[#6DC40B] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold hover:bg-[#5da70a] transition-all shadow-md"
        >
          <FiDownload size={16} /> Export Excel
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-100 mb-6 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
            className={`pb-3 text-sm font-bold transition-all relative whitespace-nowrap ${activeTab === tab ? "text-[#6DC40B]" : "text-gray-400"}`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#6DC40B] rounded-full" />}
          </button>
        ))}
      </div>

      {/* Filters (Date & Search) Code remains same as yours... */}
      <div className="flex flex-col xl:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
          <div className="flex flex-col gap-1 sm:w-48">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Start Date</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="date" className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full outline-none focus:border-[#6DC40B]" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
          </div>
          <div className="flex flex-col gap-1 sm:w-48">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">End Date</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="date" className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full outline-none focus:border-[#6DC40B]" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="relative flex-1 w-full">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search by Order ID or Name..." className="pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm w-full outline-none focus:border-[#6DC40B] shadow-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full border-separate border-spacing-y-3 min-w-[1100px]">
          <thead>
            <tr className="text-[14px] font-bold text-gray-500 bg-gray-100">
              <th className="px-4 py-4 text-left w-16 rounded-l-lg">S.No</th>
              <th className="px-4 py-4 text-left">Order ID</th>
              <th className="px-4 py-4 text-left">Customer</th>
              <th className="px-4 py-4 text-center">Items</th>
              <th className="px-4 py-4 text-left">Amount</th>
              <th className="px-4 py-4 text-left">Date</th>
              <th className="px-4 py-4 text-left">Status</th>
              <th className="px-4 py-4 text-center rounded-r-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && filteredOrders.map((order, index) => (
              <tr key={order._id} className="text-sm group">
                {/* Serial Number */}
                <td className="px-4 py-5 bg-white border-y border-l border-gray-100 rounded-l-2xl font-bold text-gray-400">
                  {((currentPage - 1) * itemsPerPage) + index + 1}.
                </td>

                <td className="px-4 py-5 bg-white border-y border-gray-100 font-bold text-gray-700">
                   #{order.orderId}
                </td>

                <td className="px-4 py-5 bg-white border-y border-gray-100">
                  <div className="font-bold text-gray-800 truncate max-w-[180px]">
                    {order.billingAddress?.firstName ? `${order.billingAddress.firstName} ${order.billingAddress.lastName}` : "Guest Customer"}
                  </div>
                  <div className="text-[11px] text-gray-400">{order.billingAddress?.phone || "No Phone"}</div>
                </td>

                <td className="px-4 py-5 bg-white border-y border-gray-100 text-center font-bold text-gray-600">
                  {order.items?.length || 0}
                </td>

                <td className="px-4 py-5 bg-white border-y border-gray-100">
                  <div className="font-black text-gray-800">₹{order.total?.toLocaleString()}</div>
                  <div className="text-[10px] font-bold text-green-600 uppercase">{order.paymentMethod}</div>
                </td>

                <td className="px-4 py-5 bg-white border-y border-gray-100 text-gray-500 font-medium">
                  {new Date(order.createdAt).toLocaleDateString('en-GB')}
                </td>

                <td className="px-4 py-5 bg-white border-y border-gray-100">
                   <div className="relative w-[130px]">
                    <select 
                      value={order.status} 
                      onChange={(e) => { setStatusUpdateData({ id: order._id, newStatus: e.target.value }); setShowModal(true); }}
                      className={`w-full px-3 py-1.5 rounded-lg border text-[11px] font-bold outline-none cursor-pointer appearance-none ${getStatusStyle(order.status)}`}
                    >
                      <option value="Placed">Placed</option>
                      <option value="Processing">Processing</option>
                      <option value="Packaged">Packaged</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                   </div>
                </td>

                <td className="px-4 py-5 bg-white border-y border-r border-gray-100 rounded-r-2xl text-center relative">
                   <button ref={(el) => (btnRefs.current[order._id] = el)} onClick={() => handleToggle(order._id)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-800 transition-all">
                      <FiMoreHorizontal size={20} />
                    </button>
                    {openMenuId === order._id && (
                      <div ref={menuRef} className="fixed w-40 bg-white border border-gray-100 rounded-xl shadow-2xl text-xs font-bold z-[9999] overflow-hidden" style={{ top: menuPosition.top, left: menuPosition.left }}>
                        <button onClick={() => { setOpenMenuId(null); navigate(`/admin-panel/order-list/order-overview/${order._id}`); }} className="block w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 text-gray-700">
                          VIEW ORDER
                        </button>
                      </div>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <div className="text-center py-20 text-gray-400 font-bold animate-pulse">Fetching Orders...</div>}
        {!loading && filteredOrders.length === 0 && <div className="py-20 text-center text-gray-400 font-medium border-2 border-dashed rounded-3xl">No matching orders found.</div>}
      </div>

      {/* Pagination & Status Modal code... */}
      {/* ... keeping your existing pagination/modal logic below ... */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mt-8">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-2 text-gray-400 hover:text-[#6DC40B] disabled:opacity-30"><FiChevronLeft size={22} /></button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${currentPage === i + 1 ? "bg-[#6DC40B] text-white shadow-lg" : "text-gray-400 bg-white border border-gray-100 hover:border-gray-300"}`}>{i + 1}</button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="p-2 text-gray-400 hover:text-[#6DC40B] disabled:opacity-30"><FiChevronRight size={22} /></button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in duration-200">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"><FiAlertCircle size={32} /></div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Update Status?</h3>
              <p className="text-sm text-gray-500">Change order status to <span className="font-bold text-[#6DC40B]">{statusUpdateData.newStatus}</span>?</p>
            </div>
            <div className="flex border-t border-gray-100">
              <button onClick={() => setShowModal(false)} className="flex-1 py-4 text-sm font-bold text-gray-400 hover:bg-gray-50 transition-colors border-r border-gray-100">Cancel</button>
              <button onClick={handleStatusUpdate} className="flex-1 py-4 text-sm font-bold text-[#6DC40B] hover:bg-green-50 transition-colors">Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderlistPage;