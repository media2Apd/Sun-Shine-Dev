// import React from "react";
// import {
//   PhoneIcon,
//   EnvelopeIcon,
//   MapPinIcon,
//   ClipboardDocumentListIcon,
//   CurrencyRupeeIcon,
//   CalendarIcon,
// } from "@heroicons/react/24/solid";

// const CustomerDetail = () => {
//   const customer = {
//     phone: "8778239060",
//     email: "hameed@example.com",
//     location: "Bangalore, India",
//     totalOrders: 44,
//     totalSpend: 18500,
//     lastOrder: "12-07-2025",
//   };

//   return (
//     <div className="min-h-screen  p-8">
//       {/* Top Info */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         {/* Phone */}
//         <div className="flex items-center gap-4">
//           <div className="bg-gray-200 rounded-xl p-3">
//             <PhoneIcon className="w-5 h-5 text-green-600" />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Phone Number</p>
//             <p className="font-semibold text-gray-900">
//               {customer.phone}
//             </p>
//           </div>
//         </div>

//         {/* Email */}
//         <div className="flex items-center gap-4">
//           <div className="bg-gray-200 rounded-xl p-3">
//             <EnvelopeIcon className="w-5 h-5 text-green-600" />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Email Address</p>
//             <p className="font-semibold text-gray-900">
//               {customer.email}
//             </p>
//           </div>
//         </div>

//         {/* Location */}
//         <div className="flex items-center gap-4">
//           <div className="bg-gray-200 rounded-xl p-3">
//             <MapPinIcon className="w-5 h-5 text-green-600" />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Location</p>
//             <p className="font-semibold text-gray-900">
//               {customer.location}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Total Orders */}
//         <div className="bg-[#eef0f2] rounded-2xl p-6">
//           <div className="flex items-center gap-3 mb-3">
//             <ClipboardDocumentListIcon className="w-6 h-6 text-green-600" />
//           </div>
//           <p className="text-gray-500 text-sm">Total Orders</p>
//           <p className="text-2xl font-bold text-gray-900 mt-1">
//             {customer.totalOrders}
//           </p>
//         </div>

//         {/* Total Spend */}
//         <div className="bg-[#eef0f2] rounded-2xl p-6">
//           <div className="flex items-center gap-3 mb-3">
//             <CurrencyRupeeIcon className="w-6 h-6 text-green-600" />
//           </div>
//           <p className="text-gray-500 text-sm">Total Spend</p>
//           <p className="text-2xl font-bold text-gray-900 mt-1">
//             ₹{customer.totalSpend.toLocaleString()}
//           </p>
//         </div>

//         {/* Last Order */}
//         <div className="bg-[#eef0f2] rounded-2xl p-6">
//           <div className="flex items-center gap-3 mb-3">
//             <CalendarIcon className="w-6 h-6 text-green-600" />
//           </div>
//           <p className="text-gray-500 text-sm">Last Order</p>
//           <p className="text-2xl font-bold text-gray-900 mt-1">
//             {customer.lastOrder}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDetail;


// import React, { useContext, useMemo } from "react";
// import { useLocation } from "react-router-dom";
// import { LoginContext } from "../Context/LoginContext";
// import { useOrder } from "../Context/OrderContext";

// import {
//   PhoneIcon,
//   EnvelopeIcon,
//   MapPinIcon,
//   ClipboardDocumentListIcon,
//   CurrencyRupeeIcon,
//   CalendarIcon,
// } from "@heroicons/react/24/solid";

// const CustomerDetail = () => {
//   const location = useLocation();
//   const customerId = location.state?.customerId;

//   const { users } = useContext(LoginContext);
//   const { orderData } = useOrder();

//   const customer = useMemo(() => {
//     if (!customerId) return null;

//     const user = users.find((u) => u.customerId === customerId);
//     if (!user) return null;

//     const userOrders = orderData.filter(
//       (order) => order.customerId === customerId
//     );

//     const totalOrders = userOrders.length;

//     const totalSpend = userOrders.reduce(
//       (sum, order) => sum + Number(order.total || 0),
//       0
//     );

//     const lastOrder =
//       totalOrders > 0
//         ? userOrders[userOrders.length - 1]?.createdAt?.slice(0, 10)
//         : "N/A";

//     return {
//       phone: user.phone || "N/A",
//       email: user.email || "N/A",
//       location: user.city || "N/A",
//       totalOrders: totalOrders || "N/A",
//       totalSpend: totalSpend || 0,
//       lastOrder,
//     };
//   }, [customerId, users, orderData]);

//   if (!customer) {
//     return (
//       <div className="p-10 text-center text-lg font-semibold">
//         Customer not found
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-8">
//       {/* Top Info */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="flex items-center gap-4">
//           <div className="bg-gray-200 rounded-xl p-3">
//             <PhoneIcon className="w-5 h-5 text-green-600" />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Phone Number</p>
//             <p className="font-semibold text-gray-900">{customer.phone}</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="bg-gray-200 rounded-xl p-3">
//             <EnvelopeIcon className="w-5 h-5 text-green-600" />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Email Address</p>
//             <p className="font-semibold text-gray-900">{customer.email}</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="bg-gray-200 rounded-xl p-3">
//             <MapPinIcon className="w-5 h-5 text-green-600" />
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Location</p>
//             <p className="font-semibold text-gray-900">{customer.location}</p>
//           </div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-[#eef0f2] rounded-2xl p-6">
//           <div className="flex items-center gap-3 mb-3">
//             <ClipboardDocumentListIcon className="w-6 h-6 text-green-600" />
//           </div>
//           <p className="text-gray-500 text-sm">Total Orders</p>
//           <p className="text-2xl font-bold text-gray-900 mt-1">
//             {customer.totalOrders}
//           </p>
//         </div>

//         <div className="bg-[#eef0f2] rounded-2xl p-6">
//           <div className="flex items-center gap-3 mb-3">
//             <CurrencyRupeeIcon className="w-6 h-6 text-green-600" />
//           </div>
//           <p className="text-gray-500 text-sm">Total Spend</p>
//           <p className="text-2xl font-bold text-gray-900 mt-1">
//             ₹{Number(customer.totalSpend).toLocaleString()}
//           </p>
//         </div>

//         <div className="bg-[#eef0f2] rounded-2xl p-6">
//           <div className="flex items-center gap-3 mb-3">
//             <CalendarIcon className="w-6 h-6 text-green-600" />
//           </div>
//           <p className="text-gray-500 text-sm">Last Order</p>
//           <p className="text-2xl font-bold text-gray-900 mt-1">
//             {customer.lastOrder}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDetail;


// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { 
//   FiPhone, 
//   FiMail, 
//   FiMapPin, 
//   FiShoppingBag, 
//   FiCreditCard, 
//   FiCalendar, 
//   FiArrowLeft,
//   FiUser
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const CustomerDetail = () => {
//   const { id } = useParams(); // Get ID from path: customer-detail/:id
//   const navigate = useNavigate();

//   const [customer, setCustomer] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // --- FETCH USER DATA ---
//   const fetchUserDetails = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await api({
//         url: SummaryApi.getOneUser.url(id),
//         method: SummaryApi.getOneUser.method,
//       });

//       if (response.data.success) {
//         setCustomer(response.data.data);
//       } else {
//         toast.error("User not found");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Error fetching customer overview");
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     if (id) {
//       fetchUserDetails();
//     }
//   }, [id, fetchUserDetails]);

//   if (loading) {
//     return (
//       <div className="min-h-[400px] flex flex-col items-center justify-center gap-3">
//         <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//         <p className="text-gray-500 font-medium animate-pulse">Loading Customer Overview...</p>
//       </div>
//     );
//   }

//   if (!customer) {
//     return (
//       <div className="p-20 text-center">
//         <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 text-red-500 rounded-full mb-4">
//             <FiUser size={32} />
//         </div>
//         <h2 className="text-xl font-bold text-gray-800">Customer Not Found</h2>
//         <button 
//           onClick={() => navigate(-1)} 
//           className="mt-4 text-green-600 font-semibold flex items-center gap-2 justify-center mx-auto hover:underline"
//         >
//           <FiArrowLeft /> Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-1 md:p-4 animate-in fade-in duration-500">
//       {/* Header & Back Button */}
//       <div className="flex items-center gap-4 mb-8">
//         <button 
//           onClick={() => navigate(-1)} 
//           className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
//         >
//           <FiArrowLeft size={20} className="text-gray-600" />
//         </button>
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">{customer.name || "Customer Detail"}</h2>
//           <p className="text-sm text-gray-400 font-medium">Customer Overview & Statistics</p>
//         </div>
//       </div>

//       {/* Top Contact Info Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center gap-4">
//           <div className="bg-green-50 rounded-xl p-3 text-green-600">
//             <FiPhone size={22} />
//           </div>
//           <div className="overflow-hidden">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</p>
//             <p className="font-bold text-gray-800 truncate">{customer.phone || "Not Provided"}</p>
//           </div>
//         </div>

//         <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center gap-4">
//           <div className="bg-green-50 rounded-xl p-3 text-green-600">
//             <FiMail size={22} />
//           </div>
//           <div className="overflow-hidden">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
//             <p className="font-bold text-gray-800 truncate">{customer.email || "N/A"}</p>
//           </div>
//         </div>

//         <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center gap-4">
//           <div className="bg-green-50 rounded-xl p-3 text-green-600">
//             <FiMapPin size={22} />
//           </div>
//           <div className="overflow-hidden">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Primary Location</p>
//             <p className="font-bold text-gray-800 truncate">{customer.city || customer.address || "Location N/A"}</p>
//           </div>
//         </div>
//       </div>

//       {/* Statistics Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-[#f8fafb] rounded-3xl p-8 border border-gray-50 shadow-inner">
//           <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center text-green-600 shadow-sm mb-4">
//             <FiShoppingBag size={24} />
//           </div>
//           <p className="text-gray-400 text-sm font-bold uppercase tracking-tight">Total Orders</p>
//           <p className="text-4xl font-black text-gray-900 mt-2">
//             {customer.totalOrders || 0}
//           </p>
//           <p className="text-[10px] text-gray-400 mt-2 font-medium italic">Lifetime purchase frequency</p>
//         </div>

//         <div className="bg-[#f8fafb] rounded-3xl p-8 border border-gray-50 shadow-inner">
//           <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center text-green-600 shadow-sm mb-4">
//             <FiCreditCard size={24} />
//           </div>
//           <p className="text-gray-400 text-sm font-bold uppercase tracking-tight">Total Spend</p>
//           <p className="text-4xl font-black text-gray-900 mt-2">
//             ₹{Number(customer.totalSpend || 0).toLocaleString()}
//           </p>
//           <p className="text-[10px] text-gray-400 mt-2 font-medium italic">Total revenue generated</p>
//         </div>

//         <div className="bg-[#f8fafb] rounded-3xl p-8 border border-gray-50 shadow-inner">
//           <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center text-green-600 shadow-sm mb-4">
//             <FiCalendar size={24} />
//           </div>
//           <p className="text-gray-400 text-sm font-bold uppercase tracking-tight">Last Order</p>
//           <p className="text-3xl font-black text-gray-900 mt-2">
//             {customer.lastOrderDate ? new Date(customer.lastOrderDate).toLocaleDateString('en-GB', { 
//               day: '2-digit', month: 'short', year: 'numeric' 
//             }) : "No Orders"}
//           </p>
//           <p className="text-[10px] text-gray-400 mt-2 font-medium italic">Date of most recent activity</p>
//         </div>
//       </div>

//       {/* Additional Details (Optional) */}
//       <div className="mt-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
//         <h3 className="font-bold text-gray-700 mb-4">Account Details</h3>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div>
//                 <p className="text-[10px] text-gray-400 uppercase font-bold">User Role</p>
//                 <span className="text-xs font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full uppercase tracking-tighter">
//                     {customer.role || "User"}
//                 </span>
//             </div>
//             <div>
//                 <p className="text-[10px] text-gray-400 uppercase font-bold">Member Since</p>
//                 <p className="text-sm font-bold text-gray-700">{new Date(customer.createdAt).getFullYear()}</p>
//             </div>
//             <div>
//                 <p className="text-[10px] text-gray-400 uppercase font-bold">Verified Status</p>
//                 <p className="text-sm font-bold text-green-600">Verified</p>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDetail;


// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { 
//   FiPhone, 
//   FiMail, 
//   FiShoppingBag, 
//   FiCreditCard, 
//   FiCalendar, 
//   FiArrowLeft,
//   FiUser,
//   FiClock
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const CustomerDetail = () => {
//   const { id } = useParams(); // Gets ID from customer-detail/:id
//   const navigate = useNavigate();

//   const [customer, setCustomer] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // --- FETCH USER DATA ---
//   const fetchUserDetails = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await api({
//         url: SummaryApi.getOneUser.url(id),
//         method: SummaryApi.getOneUser.method,
//       });

//       if (response.data.success) {
//         setCustomer(response.data.data);
//       } else {
//         toast.error("User overview not found");
//       }
//     } catch (error) {
//       toast.error("Error fetching customer data");
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     if (id) {
//       fetchUserDetails();
//     }
//   }, [id, fetchUserDetails]);

//   if (loading) {
//     return (
//       <div className="min-h-[400px] flex flex-col items-center justify-center gap-3">
//         <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//         <p className="text-gray-500 font-medium animate-pulse">Loading Customer Data...</p>
//       </div>
//     );
//   }

//   if (!customer) {
//     return (
//       <div className="p-20 text-center">
//         <FiUser size={48} className="mx-auto text-gray-200 mb-4" />
//         <h2 className="text-xl font-bold text-gray-800">Customer not found</h2>
//         <button onClick={() => navigate(-1)} className="mt-4 text-green-600 font-bold flex items-center gap-2 mx-auto">
//           <FiArrowLeft /> Go Back
//         </button>
//       </div>
//     );
//   }

//   // Handle empty name string like " " from your format
//   const displayName = customer.name?.trim() || "Guest User";

//   return (
//     <div className="p-1 md:p-4">
//       {/* Header & Back Link */}
//       <div className="flex items-center gap-4 mb-8">
//         <button 
//           onClick={() => navigate(-1)} 
//           className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
//         >
//           <FiArrowLeft size={20} className="text-gray-600" />
//         </button>
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">{displayName}</h2>
//           <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Customer Overview</p>
//         </div>
//       </div>

//       {/* Top Contact Info Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center gap-4">
//           <div className="bg-green-50 rounded-xl p-3 text-green-600">
//             <FiPhone size={22} />
//           </div>
//           <div className="overflow-hidden">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</p>
//             <p className="font-bold text-gray-800 truncate">{customer.phone || "Not provided"}</p>
//           </div>
//         </div>

//         <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex items-center gap-4">
//           <div className="bg-green-50 rounded-xl p-3 text-green-600">
//             <FiMail size={22} />
//           </div>
//           <div className="overflow-hidden">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
//             <p className="font-bold text-gray-800 truncate">{customer.email}</p>
//           </div>
//         </div>
//       </div>

//       {/* Statistics Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Total Orders */}
//         <div className="bg-[#f8fafb] rounded-3xl p-8 border border-gray-50 shadow-inner">
//           <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center text-green-600 shadow-sm mb-4">
//             <FiShoppingBag size={24} />
//           </div>
//           <p className="text-gray-400 text-xs font-bold uppercase tracking-tight">Total Orders</p>
//           <p className="text-4xl font-black text-gray-900 mt-2">
//             {customer.ordersCount || 0}
//           </p>
//         </div>

//         {/* Total Spend */}
//         <div className="bg-[#f8fafb] rounded-3xl p-8 border border-gray-50 shadow-inner">
//           <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center text-green-600 shadow-sm mb-4">
//             <FiCreditCard size={24} />
//           </div>
//           <p className="text-gray-400 text-xs font-bold uppercase tracking-tight">Total Spend</p>
//           <p className="text-4xl font-black text-gray-900 mt-2">
//             ₹{Number(customer.totalAmount || 0).toLocaleString()}
//           </p>
//         </div>

//         {/* Joined Date */}
//         <div className="bg-[#f8fafb] rounded-3xl p-8 border border-gray-50 shadow-inner">
//           <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center text-green-600 shadow-sm mb-4">
//             <FiCalendar size={24} />
//           </div>
//           <p className="text-gray-400 text-xs font-bold uppercase tracking-tight">Joined On</p>
//           <p className="text-3xl font-black text-gray-900 mt-2">
//             {new Date(customer.createdAt).toLocaleDateString('en-GB', { 
//               day: '2-digit', month: 'short', year: 'numeric' 
//             })}
//           </p>
//         </div>
//       </div>

//       {/* Bottom Meta Info */}
//       <div className="mt-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-wrap gap-8 items-center justify-between">
//         <div className="flex items-center gap-3">
//             <div className="bg-blue-50 p-2 rounded-lg text-blue-500">
//                 <FiClock />
//             </div>
//             <div>
//                 <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Account ID</p>
//                 <p className="text-sm font-bold text-gray-700">{customer._id}</p>
//             </div>
//         </div>
        
//         <div className="flex gap-4">
//             <div className="px-4 py-2 bg-green-50 rounded-xl">
//                 <p className="text-[10px] text-green-600 uppercase font-bold text-center">Active Account</p>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDetail;


// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { 
//   FiPhone, 
//   FiMail, 
//   FiMapPin, 
//   FiShoppingBag, 
//   FiCreditCard, 
//   FiCalendar, 
//   FiArrowLeft,
//   FiUser,
//   FiClock
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const CustomerDetail = () => {
//   const { id } = useParams(); // Path: /admin-panel/customer-list/customer-detail/:id
//   const navigate = useNavigate();

//   const [customer, setCustomer] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // --- FETCH USER OVERVIEW ---
//   const fetchUserDetails = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await api({
//         url: SummaryApi.getOneUser.url(id),
//         method: SummaryApi.getOneUser.method,
//       });

//       if (response.data.success) {
//         setCustomer(response.data.data);
//       } else {
//         toast.error("User overview not found");
//       }
//     } catch (error) {
//       toast.error("Error fetching customer data");
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     if (id) fetchUserDetails();
//   }, [id, fetchUserDetails]);

//   // Helper to handle empty name strings
//   const displayName = customer?.name?.trim() ? customer.name : customer?.email?.split('@')[0] || "Customer";

//   if (loading) {
//     return (
//       <div className="min-h-[400px] flex flex-col items-center justify-center gap-3">
//         <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//         <p className="text-gray-500 font-medium animate-pulse">Loading Overview...</p>
//       </div>
//     );
//   }

//   if (!customer) {
//     return (
//       <div className="p-20 text-center">
//         <FiUser size={48} className="mx-auto text-gray-200 mb-4" />
//         <h2 className="text-xl font-bold text-gray-800">Customer Data Not Available</h2>
//         <button onClick={() => navigate(-1)} className="mt-4 text-green-600 font-bold flex items-center gap-2 mx-auto">
//           <FiArrowLeft /> Back to List
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="">
//       {/* HEADER */}
//       <div className="flex items-center gap-4 mb-8">
//         <button 
//           onClick={() => navigate(-1)} 
//           className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all shadow-sm group"
//         >
//           <FiArrowLeft size={20} className="text-gray-400 group-hover:text-green-600" />
//         </button>
//         <div>
//           <h2 className="text-2xl font-black text-gray-800 tracking-tight">{displayName}</h2>
//           <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Customer Profile Overview</p>
//         </div>
//       </div>

//       {/* TOP INFO CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
//           <div className="bg-green-50 rounded-xl p-3 text-green-600">
//             <FiPhone size={22} />
//           </div>
//           <div className="overflow-hidden">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Phone Number</p>
//             <p className="font-bold text-gray-700 truncate">{customer.phone || "Not Provided"}</p>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
//           <div className="bg-green-50 rounded-xl p-3 text-green-600">
//             <FiMail size={22} />
//           </div>
//           <div className="overflow-hidden">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Email Address</p>
//             <p className="font-bold text-gray-700 truncate">{customer.email}</p>
//           </div>
//         </div>

//         <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
//           <div className="bg-green-50 rounded-xl p-3 text-green-600">
//             <FiMapPin size={22} />
//           </div>
//           <div className="overflow-hidden">
//             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Last Known Location</p>
//             <p className="font-bold text-gray-700 truncate">{customer.address || "No Address Saved"}</p>
//           </div>
//         </div>
//       </div>

//       {/* STATS SECTION */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Total Orders Card */}
//         <div className="bg-[#f8fafc] rounded-[32px] p-8 border border-gray-50 relative overflow-hidden group">
//           <div className="absolute -right-4 -top-4 text-green-100 opacity-20 transition-transform group-hover:scale-110">
//             <FiShoppingBag size={120} />
//           </div>
//           <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-green-600 shadow-sm mb-6">
//             <FiShoppingBag size={28} />
//           </div>
//           <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Total Orders</p>
//           <p className="text-5xl font-black text-gray-900 mt-2">
//             {customer.ordersCount || 0}
//           </p>
//         </div>

//         {/* Total Spend Card */}
//         <div className="bg-[#f8fafc] rounded-[32px] p-8 border border-gray-50 relative overflow-hidden group">
//           <div className="absolute -right-4 -top-4 text-green-100 opacity-20 transition-transform group-hover:scale-110">
//             <FiCreditCard size={120} />
//           </div>
//           <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-green-600 shadow-sm mb-6">
//             <FiCreditCard size={28} />
//           </div>
//           <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Total Spend</p>
//           <p className="text-5xl font-black text-gray-900 mt-2">
//             ₹{Number(customer.totalAmount || 0).toLocaleString()}
//           </p>
//         </div>

//         {/* Last Order Date Card */}
//         <div className="bg-[#f8fafc] rounded-[32px] p-8 border border-gray-50 relative overflow-hidden group">
//           <div className="absolute -right-4 -top-4 text-green-100 opacity-20 transition-transform group-hover:scale-110">
//             <FiCalendar size={120} />
//           </div>
//           <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-green-600 shadow-sm mb-6">
//             <FiCalendar size={28} />
//           </div>
//           <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Last Order</p>
//           <p className="text-3xl font-black text-gray-900 mt-2">
//             {customer.lastOrderDate ? new Date(customer.lastOrderDate).toLocaleDateString('en-GB', { 
//               day: '2-digit', month: 'short', year: 'numeric' 
//             }) : "N/A"}
//           </p>
//         </div>
//       </div>

//       {/* FOOTER INFO */}
//       <div className="mt-10 flex flex-wrap gap-6 items-center border-t pt-8 px-4">
//         <div className="flex items-center gap-2 text-gray-400">
//            <FiClock />
//            <span className="text-xs font-bold uppercase tracking-tighter">Member Since:</span>
//            <span className="text-xs font-black text-gray-600 italic">
//              {new Date(customer.createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
//            </span>
//         </div>
//         <div className="flex items-center gap-2 text-gray-400">
//            <FiUser />
//            <span className="text-xs font-bold uppercase tracking-tighter">Customer ID:</span>
//            <span className="text-xs font-black text-gray-600">{customer._id}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDetail;

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiBarChart2, 
  FiCreditCard, 
  FiClock, 
  FiArrowLeft 
} from "react-icons/fi";
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api({
        url: SummaryApi.getOneUser.url(id),
        method: SummaryApi.getOneUser.method,
      });

      if (response.data.success) {
        setCustomer(response.data.data);
      }
    } catch (error) {
      toast.error("Error fetching customer data");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchUserDetails();
  }, [id, fetchUserDetails]);

  // Handle display name logic
  const displayName = customer?.name?.trim() ? customer.name : customer?.email?.split('@')[0] || "User";

  // Format date to DD-MM-YYYY
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER SECTION */}
      <div className="flex items-center gap-6 mb-10">
        <button onClick={() => navigate(-1)} className="text-gray-800 hover:text-green-600 transition-colors">
          <FiArrowLeft size={24} />
        </button>
        
        <div className="h-10 w-[1px] bg-gray-200"></div>

        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h2 className="text-[28px] font-semibold text-gray-900 leading-tight">
              {displayName}
            </h2>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-green-50 text-[#10b981] text-[11px] font-bold rounded-full uppercase tracking-wide">
              <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></span>
              Active
            </span>
          </div>
          <p className="text-[14px] text-gray-500 mt-1">
            Retail • ID: #{customer?._id?.slice(-5).toUpperCase() || "N/A"}
          </p>
        </div>
      </div>

      {/* MAIN WHITE CARD */}
      <div className="bg-white rounded-[20px] p-10 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
        
        {/* CONTACT INFO ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-[#f9fafb] rounded-lg flex items-center justify-center text-[#10b981]">
              <FiPhone size={20} />
            </div>
            <div>
              <p className="text-[13px] text-gray-500 mb-0.5">Phone Number</p>
              <p className="text-[16px] font-semibold text-gray-900">{customer?.phone || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-[#f9fafb] rounded-lg flex items-center justify-center text-[#10b981]">
              <FiMail size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] text-gray-500 mb-0.5">Email Address</p>
              <p className="text-[16px] font-semibold text-gray-900 truncate">{customer?.email || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-[#f9fafb] rounded-lg flex items-center justify-center text-[#10b981]">
              <FiMapPin size={20} />
            </div>
            <div>
              <p className="text-[13px] text-gray-500 mb-0.5">Location</p>
              <p className="text-[16px] font-semibold text-gray-900">{customer?.address || "N/A"}</p>
            </div>
          </div>

        </div>

        {/* STATS CONTAINERS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Total Orders */}
          <div className="bg-[#f9fafb] rounded-2xl p-7 flex flex-col justify-between h-[150px]">
            <FiBarChart2 size={22} className="text-[#10b981]" />
            <div>
              <p className="text-[14px] text-gray-500 mb-1.5">Total Orders</p>
              <p className="text-[26px] font-bold text-gray-900">{customer?.ordersCount || 0}</p>
            </div>
          </div>

          {/* Total Spend */}
          <div className="bg-[#f9fafb] rounded-2xl p-7 flex flex-col justify-between h-[150px]">
            <FiCreditCard size={22} className="text-[#10b981]" />
            <div>
              <p className="text-[14px] text-gray-500 mb-1.5">Total Spend</p>
              <p className="text-[26px] font-bold text-gray-900">
                ₹{Number(customer?.totalAmount || 0).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Last Order */}
          <div className="bg-[#f9fafb] rounded-2xl p-7 flex flex-col justify-between h-[150px]">
            <FiClock size={22} className="text-[#10b981]" />
            <div>
              <p className="text-[14px] text-gray-500 mb-1.5">Last Order</p>
              <p className="text-[26px] font-bold text-gray-900">
                {formatDate(customer?.lastOrderDate)}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CustomerDetail;