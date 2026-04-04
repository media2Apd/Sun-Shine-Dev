
// import { useOrder } from "../Context/OrderContext";
// import { useState } from "react";
// import ConfirmModal from "../panelComponents/ConfirmModal";
// import { useLocation } from "react-router-dom";

// export default function AdminOrderOverview({  }) {
//   const location = useLocation();
//   const id = location.state?.id;
//   const { orderData, setOrderData, updateOrderStatus } = useOrder(); // ✅ setOrderData bring பண்ணி
//   const [openStatus, setOpenStatus] = useState(false);
//   const [confirmBox, setConfirmBox] = useState({ open: false, status: "" });

//   // ✅ Select specific order if orderIdProp exists
//   const order = Array.isArray(orderData)
//     ? orderData.find(o => o.orderId === id) || orderData[orderData.length - 1]
//     : orderData;

//   if (!order) return <div className="p-1 text-red-500">Order not found</div>;

//   // ✅ Deep copy items to prevent last order override issue
//   const items = order.items ? order.items.map(item => ({ ...item })) : [];
//   const billing = order.billingAddress || {};
//   const shipping = order.shippingAddress || {};
//   const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
//   const total = order.total || subtotal;

//   const steps = ["Order received", "Processing", "On the way", "Delivered"];
//   const currentStep = steps.indexOf(order.status || "Order received");

//   const handleConfirm = () => {
//     updateOrderStatus(order.orderId, confirmBox.status);
//     setConfirmBox({ open: false, status: "" });
//   };

//   // ✅ Safe function to update items for a specific order
//   const updateOrderItems = (orderId, newItems) => {
//     setOrderData(prevOrders =>
//       prevOrders.map(o =>
//         o.orderId === orderId ? { ...o, items: newItems.map(item => ({ ...item })) } : o
//       )
//     );
//   };

//   return (
//     <div className="min-h-screen p-3 sm:p-6">
//       {/* CONFIRM MODAL */}
//       <ConfirmModal
//         open={confirmBox.open}
//         title="Confirm Status Change"
//         message={`Are you sure you want to change status to "${confirmBox.status}"?`}
//         onConfirm={handleConfirm}
//         onCancel={() => setConfirmBox({ open: false, status: "" })}
//       />

//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6">
//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-3">
//           <div>
//             <h2 className="text-lg font-semibold">Order Details</h2>
//             <p className="text-sm text-gray-500">
//               {new Date(order.createdAt).toDateString()} • {items.length} Products
//             </p>
//           </div>

//           {/* STATUS DROPDOWN */}
//           <div className="relative">
//             <button
//               onClick={() => setOpenStatus(!openStatus)}
//               className="bg-green-600 text-white px-4 py-2 rounded-md text-sm"
//             >
//               {order.status || "Order received"}
//             </button>

//             {openStatus && (
//               <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-md z-50">
//                 {steps.map((step, i) => {
//                   const isDisabled = i <= currentStep;
//                   return (
//                     <button
//                       key={i}
//                       disabled={isDisabled}
//                       onClick={() => {
//                         setConfirmBox({ open: true, status: step });
//                         setOpenStatus(false);
//                       }}
//                       className={`block w-full text-left px-3 py-2 text-sm
//                         ${isDisabled ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}
//                     >
//                       {step}
//                     </button>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//           <AddressCard title="Billing Address" data={billing} />
//           <AddressCard title="Shipping Address" data={shipping} />
//           <div className="border rounded-lg p-4 text-sm">
//             <Row label="Order ID" value={order.orderId} />
//             <Row label="Payment" value={order.paymentMethod} />
//             <hr className="my-3" />
//             <Row label="Subtotal" value={`₹${subtotal}`} />
//             <Row label="Shipping" value="Free" />
//             <div className="flex justify-between mt-3 font-semibold text-green-600">
//               <span>Total</span>
//               <span>₹{total}</span>
//             </div>
//           </div>
//         </div>

//         {/* STEPPER */}
//         <div className="overflow-x-auto mb-6">
//           <div className="min-w-[500px] flex justify-between relative">
//             <div className="absolute top-4 left-0 w-full h-1 bg-gray-200"></div>
//             <div
//               className="absolute top-4 left-0 h-1 bg-green-500"
//               style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
//             />
//             {steps.map((label, index) => (
//               <div key={index} className="flex flex-col items-center w-full z-10">
//                 <div className={`w-8 h-8 flex items-center justify-center rounded-full text-xs border 
//                   ${index <= currentStep ? "bg-green-600 text-white" : "text-gray-500"}`}>
//                   {(index + 1).toString().padStart(2, "0")}
//                 </div>
//                 <p className="text-xs mt-2 text-gray-500">{label}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[500px] text-sm">
//             <thead className="border-b text-gray-400">
//               <tr>
//                 <th className="py-2 text-left">Product</th>
//                 <th>Price</th>
//                 <th>Qty</th>
//                 <th className="text-right">Subtotal</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item, i) => (
//                 <tr key={i} className="border-b">
//                   <td className="py-3 flex items-center gap-3">
//                     <img src={item.image} alt="" className="w-10 h-10 rounded object-cover" />
//                     {item.name}
//                   </td>
//                   <td>₹{item.price}</td>
//                   <td>x{item.qty}</td>
//                   <td className="text-right">₹{item.price * item.qty}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* COMPONENTS */
// const AddressCard = ({ title, data }) => (
//   <div className="border rounded-lg p-4 text-sm">
//     <p className="text-gray-400 uppercase text-xs mb-2">{title}</p>
//     <p className="font-medium">{data?.firstName} {data?.lastName}</p>
//     <p className="text-gray-500 text-xs">{data?.street}, {data?.state}, {data?.country}</p>
//     <div className="mt-3">
//       <p className="text-gray-400 text-xs">Email</p>
//       <p>{data?.email}</p>
//     </div>
//     <div className="mt-2">
//       <p className="text-gray-400 text-xs">Phone</p>
//       <p>{data?.phone}</p>
//     </div>
//   </div>
// );

// const Row = ({ label, value }) => (
//   <div className="flex justify-between mb-1">
//     <span className="text-gray-500">{label}</span>
//     <span>{value}</span>
//   </div>
// );


// import React, { useState, useEffect, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { 
//   FiCheckCircle, FiClock, 
//   FiAlertCircle, FiChevronDown, FiMail, FiPhone, FiMapPin 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const AdminOrderOverview = () => {
//   const { id } = useParams(); // Get MongoDB _id from URL
//   const navigate = useNavigate();

//   // --- States ---
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [openStatusDropdown, setOpenStatusDropdown] = useState(false);
//   const [confirmModal, setConfirmModal] = useState({ open: false, nextStatus: "" });

//   // Status mapping for the Progress Tracker
//   const statusSteps = ["Placed", "Packaged", "Shipped", "Delivered", "Cancelled"];
  
//   // --- Fetch Order Details ---
//   const fetchOrderDetails = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await api({
//         url: SummaryApi.getOrderById.url(id),
//         method: SummaryApi.getOrderById.method,
//       });

//         setOrder(response.data);
 
//     } catch (error) {
//       toast.error("Error fetching order details");
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchOrderDetails();
//   }, [fetchOrderDetails]);

//   // --- Handle Status Update ---
//   const handleStatusChange = async () => {
//     try {
//       const response = await api({
//         url: SummaryApi.updateOrderStatus.url(id),
//         method: SummaryApi.updateOrderStatus.method,
//         data: { status: confirmModal.nextStatus }
//       });

//       if (response.data.success) {
//         toast.success(`Order marked as ${confirmModal.nextStatus}`);
//         setOrder(response.data.data); // Update UI with response data
//         setConfirmModal({ open: false, nextStatus: "" });
//       }
//     } catch (error) {
//       toast.error("Failed to update status");
//     }
//   };

//   if (loading) return <div className="p-10 text-center text-gray-400">Loading order details...</div>;
//   if (!order) return <div className="p-10 text-center text-red-500">Order not found.</div>;

//   const currentStepIndex = statusSteps.indexOf(order.status);
//   const subtotal = order.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;

//   return (
//     <div>
      
//       {/* Breadcrumb / Back */}
//       <button 
//         onClick={() => navigate(-1)} 
//         className="mb-6 text-sm text-gray-500 hover:text-green-600 font-medium flex items-center gap-2"
//       >
//         ← Back to Orders
//       </button>

//       <div className="space-y-6">
        
//         {/* Header Section */}
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <div>
//             <h2 className="text-xl font-bold text-gray-800">Order #{order.orderId}</h2>
//             <p className="text-sm text-gray-400 mt-1">
//               Placed on {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} • {order.items?.length} Items
//             </p>
//           </div>

//           <div className="relative w-full md:w-auto">
//             <button 
//               onClick={() => setOpenStatusDropdown(!openStatusDropdown)}
//               className="w-full md:w-48 flex items-center justify-between bg-green-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-green-100 transition-all active:scale-95"
//             >
//               <span>{order.status === 'Delivered' ? 'Completed' : order.status}</span>
//               <FiChevronDown className={`transition-transform ${openStatusDropdown ? 'rotate-180' : ''}`} />
//             </button>

//             {openStatusDropdown && (
//               <div className="absolute right-0 mt-2 w-full md:w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden py-1">
//                 {statusSteps.map((step) => (
//                   <button
//                     key={step}
//                     onClick={() => {
//                       setConfirmModal({ open: true, nextStatus: step });
//                       setOpenStatusDropdown(false);
//                     }}
//                     disabled={step === order.status}
//                     className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
//                       step === order.status ? 'bg-gray-50 text-gray-300' : 'hover:bg-green-50 text-gray-600 hover:text-green-600'
//                     }`}
//                   >
//                     {step === 'Delivered' ? 'Completed' : step}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Info Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <AddressCard title="Billing Address" address={order.billingAddress} />
//           <AddressCard title="Shipping Address" address={order.shippingAddress} />
          
//           <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
//             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Payment Summary</h3>
//             <div className="space-y-3">
//               <SummaryRow label="Payment Method" value={order.paymentMethod} />
//               <SummaryRow label="Payment Status" value={order.paymentStatus} highlight />
//               <hr className="border-gray-50" />
//               <SummaryRow label="Subtotal" value={`₹${subtotal.toLocaleString()}`} />
//               <SummaryRow label="Shipping" value="Free" />
//               <div className="flex justify-between items-center pt-2">
//                 <span className="text-sm font-bold text-gray-800">Total Amount</span>
//                 <span className="text-lg font-bold text-green-600">₹{order.total?.toLocaleString()}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Progress Tracker */}
//         <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm overflow-x-auto">
//           <div className="min-w-[600px] flex justify-between relative px-10">
//             {/* Background Line */}
//             <div className="absolute top-5 left-20 right-20 h-0.5 bg-gray-100 -z-0"></div>
//             {/* Progress Line */}
//             <div 
//               className="absolute top-5 left-20 h-0.5 bg-green-600 transition-all duration-500 -z-0"
//               style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * (100 - (40 / statusSteps.length * 10))}%` }}
//             ></div>

//             {statusSteps.map((step, index) => {
//               const isActive = index <= currentStepIndex;
//               return (
//                 <div key={step} className="flex flex-col items-center relative z-10">
//                   <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-all duration-300 ${isActive ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
//                     {isActive ? <FiCheckCircle size={20} /> : <FiClock size={20} />}
//                   </div>
//                   <p className={`text-xs font-bold mt-3 ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
//                     {step === 'Delivered' ? 'Completed' : step}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Items Table */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="p-6 border-b border-gray-50">
//             <h3 className="text-sm font-bold text-gray-800">Order Items</h3>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead className="bg-gray-50/50 text-gray-400 font-bold text-[11px] uppercase tracking-wider">
//                 <tr>
//                   <th className="px-6 py-4 text-left">Product Details</th>
//                   <th className="px-6 py-4 text-center">Price</th>
//                   <th className="px-6 py-4 text-center">Quantity</th>
//                   <th className="px-6 py-4 text-right">Subtotal</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-50">
//                 {order.items?.map((item, i) => (
//                   <tr key={i} className="hover:bg-gray-50/30 transition-colors">
//                     <td className="px-6 py-4 flex items-center gap-4">
//                       <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover border border-gray-100 shadow-sm" />
//                       <div>
//                         <p className="font-bold text-gray-800">{item.name}</p>
//                         <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wide">ID: {item.productId?._id?.slice(-6)}</p>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-center font-medium text-gray-600">₹{item.price?.toLocaleString()}</td>
//                     <td className="px-6 py-4 text-center text-gray-600 font-bold">x{item.quantity}</td>
//                     <td className="px-6 py-4 text-right font-bold text-gray-800">₹{(item.price * item.quantity).toLocaleString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       {confirmModal.open && (
//         <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in duration-200">
//             <div className="p-8 flex flex-col items-center text-center">
//               <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-4">
//                 <FiAlertCircle size={32} />
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 mb-2">Update Order Status?</h3>
//               <p className="text-gray-500 text-sm leading-relaxed px-2">
//                 Are you sure you want to change this order to 
//                 <span className="font-bold text-green-600"> {confirmModal.nextStatus === 'Delivered' ? 'Completed' : confirmModal.nextStatus}</span>?
//               </p>
//             </div>
//             <div className="flex border-t border-gray-100">
//               <button 
//                 onClick={() => setConfirmModal({ open: false, nextStatus: "" })} 
//                 className="flex-1 py-4 text-sm font-bold text-gray-400 hover:bg-gray-50 transition-colors border-r"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleStatusChange} 
//                 className="flex-1 py-4 text-sm font-bold text-green-600 hover:bg-green-50 transition-colors"
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

// // --- Sub-Components for Clean Code ---

// const AddressCard = ({ title, address }) => (
//   <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
//     <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</h3>
//     <div>
//       <p className="font-bold text-gray-800 text-base">{address?.firstName} {address?.lastName}</p>
//       <div className="mt-2 space-y-1.5 text-sm text-gray-500 leading-relaxed">
//         <p className="flex items-center gap-2"><FiMapPin className="text-gray-300" /> {address?.street}</p>
//         <p className="ml-6">{address?.city}, {address?.state} - {address?.zip}</p>
//       </div>
//     </div>
//     <div className="pt-2 space-y-2">
//       <p className="text-xs text-gray-400 flex items-center gap-2 font-medium">
//         <FiMail size={14} /> {address?.email}
//       </p>
//       <p className="text-xs text-gray-400 flex items-center gap-2 font-medium">
//         <FiPhone size={14} /> {address?.phone}
//       </p>
//     </div>
//   </div>
// );

// const SummaryRow = ({ label, value, highlight }) => (
//   <div className="flex justify-between items-center text-sm">
//     <span className="text-gray-500 font-medium">{label}</span>
//     <span className={`font-bold ${highlight ? 'text-green-600 bg-green-50 px-2 py-0.5 rounded' : 'text-gray-800'}`}>{value}</span>
//   </div>
// );

// export default AdminOrderOverview;




// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { 
//   FiPackage, FiTruck, FiChevronDown, 
//   FiPhone, FiMail, FiMapPin, FiCreditCard 
// } from "react-icons/fi";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// const AdminOrderOverview = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedStatus, setSelectedStatus] = useState("Placed");

//   const fetchOrderDetails = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await api({
//         url: SummaryApi.getOrderById.url(id),
//         method: SummaryApi.getOrderById.method,
//       });
//       setOrder(response.data);
//       setSelectedStatus(response.data.status);
//     } catch (error) {
//       toast.error("Error fetching order details");
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchOrderDetails();
//   }, [fetchOrderDetails]);

//   if (loading) return <div className="p-10 text-center text-gray-400">Loading order details...</div>;
//   if (!order) return <div className="p-10 text-center text-red-500">Order not found.</div>;

//   // --- Financial Calculations ---
//   const subtotal = order.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;
  
//   // Calculating tax dynamically based on product GST
//   const taxAmount = order.items?.reduce((acc, item) => {
//     const gstRate = Number(item.productId?.gst) || 0;
//     return acc + (item.price * item.quantity * gstRate / 100);
//   }, 0) || 0;

//   const grandTotal = order.total || subtotal; // Using DB total
//   const deliveryCharges = grandTotal > (subtotal + taxAmount) ? grandTotal - (subtotal + taxAmount) : 0;

//   // Address Fallback checking (Since provided data contains empty strings)
//   const shipping = order.shippingAddress;
//   const billing = order.billingAddress;

//   return (
//     <div className="text-slate-800">
      
//       {/* Breadcrumb */}
//       <nav className="text-xs font-medium text-gray-500 mb-2 flex gap-2">
//         <span onClick={() => navigate(-1)}>Orders</span> <span>›</span> <span className="text-gray-400">Order Details</span>
//       </nav>
//       <h1 className="text-2xl font-bold text-[#4AB300] mb-8">Order #{order.orderId || "N/A"}</h1>

//       {/* Top 5 Metrics Row */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-8">
//         <StatCard 
//           label="Order Status" 
//           value={`#${order.orderId?.slice(-6) || "N/A"}`} 
//           sub={`Placed on ${new Date(order.createdAt).toLocaleDateString('en-GB')}`} 
//           badge={order.status} 
//         />
//         <StatCard label="Type" value="Standard" />
//         <StatCard label="Items" value={`${order.items?.length || 0} Items`} />
//         <StatCard label="Payment" value={order.paymentStatus || "PENDING"} color="text-green-600" />
//         <StatCard label="Total" value={`₹${grandTotal.toLocaleString()}`} isBold />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* Left Column: Items and Update Actions */}
//         <div className="lg:col-span-2 space-y-6">
          
//           {/* Order Items Section */}
//           <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
//             <div className="p-5 border-b border-gray-50 flex justify-between items-center">
//               <h2 className="font-bold text-gray-700 flex items-center gap-2">
//                 <FiPackage className="text-[#4AB300]" /> Order Items
//               </h2>
//               <span className="text-xs text-gray-400 font-medium">{order.items?.length || 0} Items Total</span>
//             </div>
//             <table className="w-full text-sm">
//               <thead className="bg-gray-50 text-[11px] uppercase text-gray-400 font-bold">
//                 <tr>
//                   <th className="px-6 py-3 text-left">Product Name</th>
//                   <th className="px-6 py-3 text-left">Brand</th>
//                   <th className="px-6 py-3 text-center">Qty</th>
//                   <th className="px-6 py-3 text-center">Price</th>
//                   <th className="px-6 py-3 text-right">Total</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-50">
//                 {order.items?.map((item, idx) => (
//                   <tr key={idx} className="hover:bg-gray-50/50">
//                     <td className="px-6 py-4 flex items-center gap-3">
//                       <img 
//                         src={item.image || "https://placehold.co/100x100?text=No+Image"} 
//                         alt={item.name} 
//                         className="w-11 h-11 bg-gray-50 rounded-lg object-cover border border-gray-100"
//                       />
//                       <div>
//                         <p className="font-bold text-gray-700">{item.name}</p>
//                         <p className="text-[10px] text-gray-400 uppercase">Code: {item.productId?.code || "N/A"}</p>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-gray-500 font-medium">
//                       {item.productId?.brand || "Generic"}
//                     </td>
//                     <td className="px-6 py-4 text-center font-semibold text-gray-700">x{item.quantity}</td>
//                     <td className="px-6 py-4 text-center text-gray-600">₹{item.price.toLocaleString()}</td>
//                     <td className="px-6 py-4 text-right font-bold text-gray-700">₹{(item.price * item.quantity).toLocaleString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Update Actions */}
//           <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
//             <h2 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
//               <span className="w-5 h-1 bg-[#4AB300] rounded-full"></span> Update Order Actions
//             </h2>
            
//             <div className="space-y-5">
//               <div className="space-y-1.5">
//                 <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Change Status</label>
//                 <div className="relative">
//                   <select 
//                     value={selectedStatus}
//                     onChange={(e) => setSelectedStatus(e.target.value)}
//                     className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-green-100"
//                   >
//                     <option value="Placed">Placed</option>
//                     <option value="Packaged">Packaged</option>
//                     <option value="Shipped">Shipped</option>
//                     <option value="Delivered">Delivered</option>
//                   </select>
//                   <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>

//               <button className="w-full bg-[#4AB300] hover:bg-[#3d9c00] text-white py-3.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-green-100">
//                 Update Order Status
//               </button>
              
//               <button className="w-full bg-white border border-red-100 text-red-500 hover:bg-red-50 py-3.5 rounded-full font-bold text-sm transition-all">
//                 Cancel Order
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Right Column: Customer Details & Financial Summary */}
//         <div className="space-y-6">
          
//           {/* Customer Card (Deep Green) */}
//           <div className="bg-[#123804] text-white rounded-2xl p-8 shadow-xl">
//             <p className="text-[11px] font-bold text-green-400/70 uppercase tracking-widest mb-6">Customer Details</p>
//             <h2 className="text-xl font-bold mb-8">
//               {shipping?.firstName || shipping?.lastName ? `${shipping.firstName} ${shipping.lastName}` : "Name not provided"}
//             </h2>
            
//             <div className="space-y-5 text-sm">
//               <div className="flex items-center gap-4">
//                 <FiPhone className="text-green-400" /> 
//                 <span>{shipping?.phone || "+91 Not Provided"}</span>
//               </div>
//               <div className="flex items-center gap-4">
//                 <FiMail className="text-green-400" /> 
//                 <span>{shipping?.email || "No Email Provided"}</span>
//               </div>
              
//               <div className="pt-4 space-y-4">
//                 <div className="flex gap-4">
//                    <FiTruck className="mt-1 text-green-400 shrink-0" />
//                    <div>
//                      <p className="text-[10px] font-bold text-green-400/50 uppercase mb-1">Shipping Address</p>
//                      <p className="text-green-50/90 text-xs leading-relaxed">
//                        {shipping?.street ? (
//                          <>
//                            {shipping.street},<br />
//                            {shipping.city}, {shipping.state} - {shipping.zip}
//                          </>
//                        ) : (
//                          "Address details not provided"
//                        )}
//                      </p>
//                    </div>
//                 </div>
//                 <div className="flex gap-4">
//                    <FiMapPin className="mt-1 text-green-400 shrink-0" />
//                    <div>
//                      <p className="text-[10px] font-bold text-green-400/50 uppercase mb-1">Billing Address</p>
//                      <p className="text-green-50/90 text-xs leading-relaxed">
//                        {billing?.street ? (
//                          <>
//                            {billing.street},<br />
//                            {billing.city}, {billing.state} - {billing.zip}
//                          </>
//                        ) : (
//                          "Billing details not provided"
//                        )}
//                      </p>
//                    </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Financial Summary */}
//           <div className="bg-[#F4F6F8] rounded-2xl p-8">
//             <h3 className="text-sm font-bold text-gray-700 mb-6 uppercase tracking-tight">Financial Summary</h3>
            
//             <div className="space-y-4 text-sm font-medium text-gray-500">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span className="text-gray-800 font-bold">₹{subtotal.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Tax (GST)</span>
//                 <span className="text-gray-800 font-bold">₹{taxAmount.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Delivery Charges</span>
//                 <span className="text-gray-800 font-bold">₹{deliveryCharges.toLocaleString()}</span>
//               </div>
              
//               <div className="pt-6 border-t border-gray-200 flex justify-between items-end">
//                 <span className="text-[#4AB300] font-bold">Grand Total</span>
//                 <span className="text-3xl font-black text-gray-800">₹{grandTotal.toLocaleString()}</span>
//               </div>

//               <div className="mt-8 bg-white p-4 rounded-xl flex items-center gap-3 border border-gray-100">
//                 <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-[#4AB300]">
//                   <FiCreditCard size={20} />
//                 </div>
//                 <div>
//                   <p className="text-[9px] font-bold text-gray-400 uppercase">Method</p>
//                   <p className="text-xs font-bold text-green-600">{order.paymentMethod || "COD"}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// // Top Cards UI Helper Component
// const StatCard = ({ label, value, sub, badge, color = "text-gray-800", isBold = false }) => (
//   <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 relative overflow-hidden flex flex-col justify-center h-28">
//     <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-wider">{label}</p>
//     <div className="space-y-1">
//       <p className={`text-lg ${isBold ? 'font-black' : 'font-bold'} ${color}`}>{value}</p>
//       {sub && <p className="text-[10px] text-gray-400 font-medium">{sub}</p>}
//       {badge && (
//         <span className="absolute top-5 right-5 bg-orange-100 text-orange-500 text-[10px] font-bold px-3 py-1 rounded-full">
//           {badge}
//         </span>
//       )}
//     </div>
//   </div>
// );

// export default AdminOrderOverview;


import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  FiPackage, FiTruck, FiChevronDown, 
  FiPhone, FiMail, FiMapPin, FiCreditCard, FiLoader 
} from "react-icons/fi";
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";

const AdminOrderOverview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const fetchOrderDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api({
        url: SummaryApi.getOrderById.url(id),
        method: SummaryApi.getOrderById.method,
      });
      setOrder(response.data);
      setSelectedStatus(response.data.status);
    } catch (error) {
      toast.error("Error fetching order details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrderDetails();
  }, [fetchOrderDetails]);

  const handleStatusUpdate = async () => {
    setUpdating(true);
    try {
      await api({
        url: SummaryApi.updateOrderStatus.url(id),
        method: SummaryApi.updateOrderStatus.method,
        data: { status: selectedStatus }
      });
      
      setOrder(prev => ({ ...prev, status: selectedStatus }));
      toast.success("Order status updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error updating status");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelOrder = async () => {
    if(!window.confirm("Are you sure you want to cancel this order?")) return;
    setUpdating(true);
    try {
      await api({
        url: SummaryApi.updateOrderStatus.url(id),
        method: SummaryApi.updateOrderStatus.method,
        data: { status: "Cancelled" }
      });
      setOrder(prev => ({ ...prev, status: "Cancelled" }));
      setSelectedStatus("Cancelled");
      toast.success("Order Cancelled");
    } catch (error) {
      toast.error("Failed to cancel order");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2 text-gray-400">
      <FiLoader className="animate-spin text-3xl text-[#4AB300]" />
      <p>Loading order details...</p>
    </div>
  );

  if (!order) return <div className="p-10 text-center text-red-500 font-bold">Order not found.</div>;

  const subtotal = order.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;
  const taxAmount = order.items?.reduce((acc, item) => {
    const gstRate = Number(item.productId?.gst) || 0;
    return acc + (item.price * item.quantity * gstRate / 100);
  }, 0) || 0;

  const grandTotal = order.total || subtotal;
  const deliveryCharges = grandTotal > (subtotal + taxAmount) ? grandTotal - (subtotal + taxAmount) : 0;

  const shipping = order.shippingAddress;
  const billing = order.billingAddress;

  return (
    <div className="text-slate-800">
      
      {/* Breadcrumb */}
      <nav className="text-xs font-medium text-gray-500 mb-2 flex gap-2 items-center">
        <span className="cursor-pointer hover:text-[#4AB300]" onClick={() => navigate(-1)}>Orders</span> 
        <span>›</span> 
        <span className="text-gray-400">Order Details</span>
      </nav>
      <h1 className="text-2xl font-bold text-[#4AB300] mb-8 break-all">Order #{order.orderId || "N/A"}</h1>

      {/* Top Stats Row - Fixed Overlapping with better breakpoints */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        <StatCard 
          label="Order Status" 
          value={`#${order.orderId?.slice(-6) || "N/A"}`} 
          sub={`Placed on ${new Date(order.createdAt).toLocaleDateString('en-GB')}`} 
          badge={order.status} 
        />
        <StatCard label="Type" value="Standard" />
        <StatCard label="Items" value={`${order.items?.length || 0} Items`} />
        <StatCard label="Payment" value={order.paymentStatus || "PENDING"} color="text-green-600" />
        <StatCard label="Total" value={`₹${grandTotal.toLocaleString()}`} isBold />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Items and Update Actions */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Order Items Table Section - Added Overflow Scroll */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-50 flex justify-between items-center">
              <h2 className="font-bold text-gray-700 flex items-center gap-2">
                <FiPackage className="text-[#4AB300]" /> Order Items
              </h2>
              <span className="text-xs text-gray-400 font-medium">{order.items?.length || 0} Items Total</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[600px]">
                <thead className="bg-gray-50 text-[11px] uppercase text-gray-400 font-bold">
                  <tr>
                    <th className="px-6 py-4 text-left">Product Name</th>
                    <th className="px-6 py-4 text-left">Brand</th>
                    <th className="px-6 py-4 text-center">Qty</th>
                    <th className="px-6 py-4 text-center">Price</th>
                    <th className="px-6 py-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {order.items?.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <img 
                                src={item.image || "https://placehold.co/100x100?text=No+Image"} 
                                alt={item.name} 
                                className="w-12 h-12 bg-gray-50 rounded-lg object-cover border border-gray-100 shrink-0"
                            />
                            <div className="min-w-0">
                                <p className="font-bold text-gray-700 truncate max-w-[200px]">{item.name}</p>
                                <p className="text-[10px] text-gray-400 uppercase">Code: {item.productId?.code || "N/A"}</p>
                            </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-medium">
                        {item.productId?.brand || "Generic"}
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-gray-700">x{item.quantity}</td>
                      <td className="px-6 py-4 text-center text-gray-600">₹{item.price.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right font-bold text-gray-700">₹{(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Update Actions */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
            <h2 className="font-bold text-gray-700 mb-6 flex items-center gap-2">
              <span className="w-5 h-1 bg-[#4AB300] rounded-full"></span> Update Order Actions
            </h2>
            
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Change Status</label>
                <div className="relative">
                  <select 
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    disabled={updating || order.status === "Cancelled" || order.status === "Delivered"}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-green-100 disabled:opacity-50"
                  >
                    <option value="Placed">Placed</option>
                    <option value="Packaged">Packaged</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled" disabled>Cancelled</option>
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <button 
                onClick={handleStatusUpdate}
                disabled={updating || order.status === "Cancelled"}
                className="w-full bg-[#4AB300] hover:bg-[#3d9c00] text-white py-3.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-green-100 disabled:bg-gray-300 disabled:shadow-none flex justify-center items-center gap-2"
              >
                {updating && <FiLoader className="animate-spin" />} Update Order Status
              </button>
              
              {order.status !== "Cancelled" && order.status !== "Delivered" && (
                <button 
                    onClick={handleCancelOrder}
                    disabled={updating}
                    className="w-full bg-white border border-red-100 text-red-500 hover:bg-red-50 py-3.5 rounded-full font-bold text-sm transition-all"
                >
                    Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Customer Details & Financial Summary */}
        <div className="space-y-6">
          
          {/* Customer Card */}
          <div className="bg-[#123804] text-white rounded-2xl p-6 md:p-8 shadow-xl">
            <p className="text-[11px] font-bold text-green-400/70 uppercase tracking-widest mb-6">Customer Details</p>
            <h2 className="text-xl font-bold mb-8 truncate">
              {shipping?.firstName ? `${shipping.firstName} ${shipping.lastName || ''}` : "Name not provided"}
            </h2>
            
            <div className="space-y-6 text-sm">
              <div className="flex items-center gap-4">
                <FiPhone className="text-green-400 shrink-0" /> 
                <span className="break-all">{shipping?.phone || "+91 Not Provided"}</span>
              </div>
              <div className="flex items-center gap-4">
                <FiMail className="text-green-400 shrink-0" /> 
                <span className="break-all">{shipping?.email || "No Email Provided"}</span>
              </div>
              
              <div className="pt-4 space-y-6 border-t border-green-900">
                <div className="flex gap-4">
                   <FiTruck className="mt-1 text-green-400 shrink-0" />
                   <div>
                     <p className="text-[10px] font-bold text-green-400/50 uppercase mb-1">Shipping Address</p>
                     <p className="text-green-50/90 text-xs leading-relaxed">
                       {shipping?.street ? (
                         <>
                           {shipping.street},<br />
                           {shipping.city}, {shipping.state} - {shipping.zip}
                         </>
                       ) : (
                         "Address details not provided"
                       )}
                     </p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <FiMapPin className="mt-1 text-green-400 shrink-0" />
                   <div>
                     <p className="text-[10px] font-bold text-green-400/50 uppercase mb-1">Billing Address</p>
                     <p className="text-green-50/90 text-xs leading-relaxed">
                       {billing?.street ? (
                         <>
                           {billing.street},<br />
                           {billing.city}, {billing.state} - {billing.zip}
                         </>
                       ) : (
                         "Billing details not provided"
                       )}
                     </p>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="bg-[#F4F6F8] rounded-2xl p-6 md:p-8">
            <h3 className="text-sm font-bold text-gray-700 mb-6 uppercase tracking-tight">Financial Summary</h3>
            
            <div className="space-y-4 text-sm font-medium text-gray-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-gray-800 font-bold">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (GST)</span>
                <span className="text-gray-800 font-bold">₹{taxAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-gray-800 font-bold">₹{deliveryCharges.toLocaleString()}</span>
              </div>
              
              <div className="pt-6 border-t border-gray-200 flex justify-between items-end">
                <span className="text-[#4AB300] font-bold">Grand Total</span>
                <span className="text-2xl md:text-3xl font-black text-gray-800">₹{grandTotal.toLocaleString()}</span>
              </div>

              <div className="mt-8 bg-white p-4 rounded-xl flex items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-[#4AB300]">
                  <FiCreditCard size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase">Method</p>
                  <p className="text-xs font-bold text-green-600 uppercase">{order.paymentMethod || "COD"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fixed StatCard to handle long text and responsive sizing better
const StatCard = ({ label, value, sub, badge, color = "text-gray-800", isBold = false }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 relative overflow-hidden flex flex-col justify-center min-h-[110px]">
    <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-wider">{label}</p>
    <div className="space-y-1">
      <p className={`text-lg leading-tight ${isBold ? 'font-black' : 'font-bold'} ${color} truncate`}>{value}</p>
      {sub && <p className="text-[10px] text-gray-400 font-medium truncate">{sub}</p>}
      {badge && (
        <span className={`absolute top-4 right-4 text-[10px] font-bold px-3 py-1 rounded-full ${
            badge === 'Cancelled' ? 'bg-red-100 text-red-500' : 'bg-orange-100 text-orange-500'
        }`}>
          {badge}
        </span>
      )}
    </div>
  </div>
);

export default AdminOrderOverview;