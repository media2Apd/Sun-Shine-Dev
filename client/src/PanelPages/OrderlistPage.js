

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


import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiSearch, FiCalendar, FiUpload, FiMoreHorizontal, 
  FiChevronLeft, FiChevronRight, FiChevronDown, FiX 
} from "react-icons/fi";
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";

const OrderlistPage = () => {
  const navigate = useNavigate();

  // --- States ---
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeTab, setActiveTab] = useState("All orders");
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const tabs = ["All orders", "Completed", "Pending", "Cancelled"];

  // --- Fetch Data with Backend Query Params ---
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      let statusParam = "";
      if (activeTab === "Completed") statusParam = "Delivered";
      else if (activeTab === "Pending") statusParam = "Placed,Processing,Shipped";
      else if (activeTab === "Cancelled") statusParam = "Cancelled";

      const response = await api({
        url: SummaryApi.getOrders.url,
        method: SummaryApi.getOrders.method,
        params: {
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm,
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
  }, [currentPage, searchTerm, startDate, endDate, activeTab]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // --- Export Function ---
  const handleExport = () => {
    if (orders.length === 0) return toast.error("No data to export");
    const headers = "Order ID,Customer,Order Type,Items,Payment,Amount,Order date,Status\n";
    const csvRows = orders.map(o => (
      `${o.orderId},${o.billingAddress?.firstName} ${o.billingAddress?.lastName},${o.total > 5000 ? 'Bulk' : 'Retail'},${o.items?.length},${o.paymentStatus},${o.total},${new Date(o.createdAt).toLocaleDateString('en-GB')},${o.status}`
    )).join("\n");
    
    const blob = new Blob([headers + csvRows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Orders_Export.csv";
    a.click();
    toast.success("Exporting...");
  };

  // --- Helper: Status Styles from Image ---
  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
      case "Completed":
        return "bg-[#E6FFF0] text-[#00B037] border-[#B3FFCC]";
      case "Cancelled":
        return "bg-[#FFF0F0] text-[#FF4D4D] border-[#FFCCCC]";
      default: 
        return "bg-[#FFF7E6] text-[#FF9900] border-[#FFE5B3]";
    }
  };

  return (
    <div className="p-4 md:p-8 bg-[#FDFDFD] min-h-screen font-sans">
      
      {/* Header Row */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Orders</h1>
        <button 
          onClick={handleExport}
          className="bg-[#6DC40B] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-[#5eb108] transition-all"
        >
          <FiUpload size={14} className="rotate-180" /> Export
        </button>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-6 border-b border-gray-100 mb-6 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
            className={`pb-3 text-[15px] font-medium transition-all relative whitespace-nowrap ${
              activeTab === tab ? "text-[#6DC40B]" : "text-gray-400"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#6DC40B]" />
            )}
          </button>
        ))}
      </div>

      {/* Date Filters Row - Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:flex items-center gap-4 mb-4">
        <div className="flex flex-col gap-1 w-full lg:w-auto">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">START DATE</label>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full md:w-64 focus:outline-none"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full lg:w-auto">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">END DATE</label>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full md:w-64 focus:outline-none"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Search Bar Row */}
      <div className="mb-8 w-full md:w-full lg:w-[536px]">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search...."
            className="pl-10 pr-4 py-2.5 bg-white border border-[#6DC40B] rounded-xl text-sm w-full focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section - Responsive Scroll */}
      <div className="overflow-x-auto min-h-[400px]">
        {loading ? (
           <div className="text-center py-20 text-gray-400">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="w-full border-2 border-dashed border-gray-100 rounded-3xl py-24 flex flex-col items-center justify-center">
            <p className="text-gray-400 text-lg">No orders found for the selected criteria.</p>
          </div>
        ) : (
          <table className="w-full border-separate border-spacing-y-3 min-w-[1000px]">
            <thead>
              <tr className="text-[14px] font-bold text-[#2D3748]">
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Customer</th>
                <th className="px-4 py-2 text-left">Order Type</th>
                <th className="px-4 py-2 text-center">Items</th>
                <th className="px-4 py-2 text-left">Payment</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Order date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="text-[13px]">
                  <td className="px-4 py-4 bg-white border-y border-l border-gray-100 rounded-l-2xl text-gray-500">
                    <button onClick={() => navigate(`/admin-panel/order-list/order-overview`, { state: { id: order._id } })}>
                      #{order.orderId}
                    </button>
                  </td>
                  <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500 font-medium">
                    {order.billingAddress?.firstName} {order.billingAddress?.lastName}
                  </td>
                  <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
                    {order.total > 5000 ? "Bulk" : "Retail"}
                  </td>
                  <td className="px-4 py-4 bg-white border-y border-gray-100 text-center text-gray-500">
                    {order.items?.length || 0}
                  </td>
                  <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
                    {order.paymentStatus}
                  </td>
                  <td className="px-4 py-4 bg-white border-y border-gray-100 font-bold text-[#1A1A1A]">
                    ₹{order.total?.toLocaleString()}
                  </td>
                  <td className="px-4 py-4 bg-white border-y border-gray-100 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}
                  </td>
                  <td className="px-4 py-4 bg-white border-y border-gray-100">
                    <div className={`flex items-center justify-between px-3 py-1.5 rounded-lg border text-[12px] w-[110px] ${getStatusStyle(order.status === 'Delivered' ? 'Completed' : order.status)}`}>
                      <span>{order.status === 'Delivered' ? 'Completed' : order.status}</span>
                      <FiChevronDown size={14} />
                    </div>
                  </td>
                  <td className="px-4 py-4 bg-white border-y border-r border-gray-100 rounded-r-2xl text-center text-gray-300">
                    <button className="hover:text-gray-600">
                      <FiMoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Row */}
      {!loading && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-8">
          <div className="flex items-center gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 text-gray-400 disabled:opacity-30"
            >
              <FiChevronLeft size={20} />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
                  currentPage === i + 1 
                  ? "bg-[#6DC40B] text-white" 
                  : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 text-gray-400 disabled:opacity-30"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderlistPage;