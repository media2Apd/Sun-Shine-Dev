// import React from "react";

// const steps = [
//   { id: 1, label: "Order received", status: "done" },
//   { id: 2, label: "Processing", status: "active" },
//   { id: 3, label: "On the way", status: "pending" },
//   { id: 4, label: "Delivered", status: "pending" },
// ];

// const products = [
//   { name: "Red Capsicum", price: 14, qty: 5 },
//   { name: "Red Capsicum", price: 14, qty: 5 },
//   { name: "Red Capsicum", price: 14, qty: 5 },
// ];

// export default function OrderDetails() {
//   return (
//     <div className="bg-gray-100 min-h-screen p-3 sm:p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6">

//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6">
//           <div>
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//               Order Details
//             </h2>
//             <p className="text-xs sm:text-sm text-gray-500">
//               Dec 24, 2025 • 3 Products
//             </p>
//           </div>
//           <button className="text-green-600 text-sm font-medium self-start sm:self-auto">
//             Back to List
//           </button>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

//           {/* Billing */}
//           <div className="border rounded-lg p-4 text-sm">
//             <p className="text-gray-400 uppercase mb-2 text-xs">
//               Billing Address
//             </p>
//             <p className="font-medium text-gray-700">Dainne Russell</p>
//             <p className="text-gray-500 text-xs sm:text-sm">
//               4140 Parker Rd. Allentown, New Mexico 31134
//             </p>

//             <div className="mt-3">
//               <p className="text-gray-400 text-xs">Email</p>
//               <p className="text-gray-600 text-sm">
//                 dainne.russell@gmail.com
//               </p>
//             </div>

//             <div className="mt-2">
//               <p className="text-gray-400 text-xs">Phone</p>
//               <p className="text-gray-600 text-sm">(671) 555-0110</p>
//             </div>
//           </div>

//           {/* Shipping */}
//           <div className="border rounded-lg p-4 text-sm">
//             <p className="text-gray-400 uppercase mb-2 text-xs">
//               Shipping Address
//             </p>
//             <p className="font-medium text-gray-700">Dainne Russell</p>
//             <p className="text-gray-500 text-xs sm:text-sm">
//               4140 Parker Rd. Allentown, New Mexico 31134
//             </p>

//             <div className="mt-3">
//               <p className="text-gray-400 text-xs">Email</p>
//               <p className="text-gray-600 text-sm">
//                 dainne.russell@gmail.com
//               </p>
//             </div>

//             <div className="mt-2">
//               <p className="text-gray-400 text-xs">Phone</p>
//               <p className="text-gray-600 text-sm">(671) 555-0110</p>
//             </div>
//           </div>

//           {/* Summary */}
//           <div className="border rounded-lg p-4 text-sm">
//             <div className="flex justify-between mb-2">
//               <span className="text-gray-400">Order ID:</span>
//               <span className="text-gray-700">#4152</span>
//             </div>

//             <div className="flex justify-between mb-2">
//               <span className="text-gray-400">Payment:</span>
//               <span className="text-gray-700">Paypal</span>
//             </div>

//             <hr className="my-3" />

//             <div className="flex justify-between mb-1">
//               <span>Subtotal</span>
//               <span>$365.00</span>
//             </div>

//             <div className="flex justify-between mb-1">
//               <span>Discount</span>
//               <span>20%</span>
//             </div>

//             <div className="flex justify-between mb-1">
//               <span>Shipping</span>
//               <span>Free</span>
//             </div>

//             <div className="flex justify-between mt-3 font-semibold text-green-600">
//               <span>Total</span>
//               <span>$84.00</span>
//             </div>
//           </div>
//         </div>

//         {/* Progress */}
//         <div className="overflow-x-auto mb-6">
//           <div className="min-w-[500px] relative flex justify-between items-center">
            
//             <div className="absolute top-4 left-0 w-full h-1 bg-gray-200"></div>
//             <div className="absolute top-4 left-0 h-1 bg-green-500 w-1/2"></div>

//             {steps.map((step) => (
//               <div key={step.id} className="relative z-10 flex flex-col items-center w-full">
//                 <div
//                   className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium
//                   ${
//                     step.status === "done"
//                       ? "bg-green-500 text-white"
//                       : step.status === "active"
//                       ? "border-2 border-green-500 text-green-600 bg-white"
//                       : "border border-gray-300 text-gray-400"
//                   }`}
//                 >
//                   {step.id.toString().padStart(2, "0")}
//                 </div>
//                 <p className="text-[10px] sm:text-xs mt-2 text-gray-500 text-center">
//                   {step.label}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[500px] text-sm">
//             <thead className="text-left text-gray-400 border-b">
//               <tr>
//                 <th className="py-2">Product</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th className="text-right">Subtotal</th>
//               </tr>
//             </thead>

//             <tbody>
//               {products.map((p, i) => (
//                 <tr key={i} className="border-b">
//                   <td className="py-3 flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gray-200 rounded"></div>
//                     <span>{p.name}</span>
//                   </td>
//                   <td>${p.price.toFixed(2)}</td>
//                   <td>x{p.qty}</td>
//                   <td className="text-right">
//                     ${(p.price * p.qty).toFixed(2)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </div>
//   );
// }

// import { useParams } from "react-router-dom";
// import { useOrders } from "../Context/OrderContext";

// export default function OrderDetails() {
//   const { id } = useParams();
//   const { orders } = useOrders();

//   const order = orders.find((o) => o.id === id);

//   if (!order) return <div className="p-6">Order not found</div>;

//   const subtotal = order.items.reduce(
//     (acc, item) => acc + item.price * item.qty,
//     0
//   );

//   const discountAmount = (subtotal * order.discount) / 100;
//   const total = subtotal - discountAmount + order.shippingCost;

//   const steps = [
//     { label: "Order received" },
//     { label: "Processing" },
//     { label: "On the way" },
//     { label: "Delivered" },
//   ];

//   return (
//     <div className="bg-gray-100 min-h-screen p-3 sm:p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6">

//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between mb-6">
//           <div>
//             <h2 className="text-lg font-semibold">Order Details</h2>
//             <p className="text-sm text-gray-500">
//               {order.date} • {order.items.length} Products
//             </p>
//           </div>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

//           {/* Billing */}
//           <Card title="Billing Address" data={order.billing} />

//           {/* Shipping */}
//           <Card title="Shipping Address" data={order.shipping} />

//           {/* Summary */}
//           <div className="border rounded-lg p-4 text-sm">
//             <Row label="Order ID" value={order.id} />
//             <Row label="Payment" value={order.payment} />

//             <hr className="my-3" />

//             <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
//             <Row label="Discount" value={`${order.discount}%`} />
//             <Row label="Shipping" value={order.shippingCost ? `$${order.shippingCost}` : "Free"} />

//             <div className="flex justify-between mt-3 font-semibold text-green-600">
//               <span>Total</span>
//               <span>${total.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Stepper */}
//         <div className="overflow-x-auto mb-6">
//           <div className="min-w-[500px] flex justify-between relative">
//             <div className="absolute top-4 left-0 w-full h-1 bg-gray-200"></div>
//             <div
//               className="absolute top-4 left-0 h-1 bg-green-500"
//               style={{ width: `${(order.status / 4) * 100}%` }}
//             ></div>

//             {steps.map((step, index) => (
//               <div key={index} className="flex flex-col items-center z-10 w-full">
//                 <div
//                   className={`w-8 h-8 flex items-center justify-center rounded-full text-xs
//                   ${
//                     index < order.status
//                       ? "bg-green-500 text-white"
//                       : index === order.status
//                       ? "border-2 border-green-500 text-green-600"
//                       : "border text-gray-400"
//                   }`}
//                 >
//                   {(index + 1).toString().padStart(2, "0")}
//                 </div>
//                 <p className="text-xs mt-2 text-gray-500">{step.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Table */}
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
//               {order.items.map((item, i) => (
//                 <tr key={i} className="border-b">
//                   <td className="py-3 flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gray-200 rounded"></div>
//                     {item.name}
//                   </td>
//                   <td>${item.price}</td>
//                   <td>x{item.qty}</td>
//                   <td className="text-right">
//                     ${(item.price * item.qty).toFixed(2)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </div>
//   );
// }

// /* Reusable Components */

// const Card = ({ title, data }) => (
//   <div className="border rounded-lg p-4 text-sm">
//     <p className="text-gray-400 uppercase text-xs mb-2">{title}</p>
//     <p className="font-medium">{data.name}</p>
//     <p className="text-gray-500 text-xs">{data.address}</p>

//     <div className="mt-3">
//       <p className="text-gray-400 text-xs">Email</p>
//       <p>{data.email}</p>
//     </div>

//     <div className="mt-2">
//       <p className="text-gray-400 text-xs">Phone</p>
//       <p>{data.phone}</p>
//     </div>
//   </div>
// );

// const Row = ({ label, value }) => (
//   <div className="flex justify-between mb-1">
//     <span className="text-gray-500">{label}</span>
//     <span>{value}</span>
//   </div>
// );

// import { useParams } from "react-router-dom";
// import { useOrder } from "../Context/OrderContext";

// export default function OrderDetails() {

//   const { id } = useParams();
//   const { orderData } = useOrder();

//   // Find order
//   const order = orderData.find((o) => o.id === id);

//   if (!order) {
//     return <div className="p-6">Order not found</div>;
//   }

//   // Calculations
//   const subtotal = order.items.reduce(
//     (acc, item) => acc + item.price * item.qty,
//     0
//   );

//   const discountAmount = (subtotal * (order.discount || 0)) / 100;
//   const shipping = order.shippingCost || 0;
//   const total = subtotal - discountAmount + shipping;

//   const steps = [
//     "Order received",
//     "Processing",
//     "On the way",
//     "Delivered",
//   ];

//   return (
//     <div className="bg-gray-100 min-h-screen p-3 sm:p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6">

//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between mb-6">
//           <div>
//             <h2 className="text-lg sm:text-xl font-semibold">
//               Order Details
//             </h2>
//             <p className="text-sm text-gray-500">
//               {order.date} • {order.items.length} Products
//             </p>
//           </div>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

//           <AddressCard title="Billing Address" data={order.billing} />
//           <AddressCard title="Shipping Address" data={order.shipping} />

//           {/* Summary */}
//           <div className="border rounded-lg p-4 text-sm">
//             <Row label="Order ID" value={order.id} />
//             <Row label="Payment" value={order.payment} />

//             <hr className="my-3" />

//             <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
//             <Row label="Discount" value={`${order.discount || 0}%`} />
//             <Row
//               label="Shipping"
//               value={shipping ? `$${shipping}` : "Free"}
//             />

//             <div className="flex justify-between mt-3 font-semibold text-green-600">
//               <span>Total</span>
//               <span>${total.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Stepper */}
//         <div className="overflow-x-auto mb-6">
//           <div className="min-w-[500px] flex justify-between relative">

//             <div className="absolute top-4 left-0 w-full h-1 bg-gray-200"></div>

//             <div
//               className="absolute top-4 left-0 h-1 bg-green-500"
//               style={{
//                 width: `${((order.status || 1) / 4) * 100}%`,
//               }}
//             ></div>

//             {steps.map((label, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col items-center z-10 w-full"
//               >
//                 <div
//                   className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium
//                   ${
//                     index < order.status
//                       ? "bg-green-500 text-white"
//                       : index === order.status
//                       ? "border-2 border-green-500 text-green-600"
//                       : "border text-gray-400"
//                   }`}
//                 >
//                   {(index + 1).toString().padStart(2, "0")}
//                 </div>
//                 <p className="text-xs mt-2 text-gray-500 text-center">
//                   {label}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Table */}
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
//               {order.items.map((item, i) => (
//                 <tr key={i} className="border-b">
//                   <td className="py-3 flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gray-200 rounded"></div>
//                     {item.name}
//                   </td>
//                   <td>${item.price}</td>
//                   <td>x{item.qty}</td>
//                   <td className="text-right">
//                     ${(item.price * item.qty).toFixed(2)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </div>
//   );
// }

// /* 🔁 Reusable Components */

// const AddressCard = ({ title, data }) => (
//   <div className="border rounded-lg p-4 text-sm">
//     <p className="text-gray-400 uppercase text-xs mb-2">{title}</p>
//     <p className="font-medium">{data?.name}</p>
//     <p className="text-gray-500 text-xs">{data?.address}</p>

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

// import { useParams } from "react-router-dom";
// import { useOrder } from "../Context/OrderContext";

// export default function OrderDetails() {
//   const { id } = useParams();
//   const { orderData } = useOrder();

//   // 🔥 FIXED ID MATCH
//   const order = orderData.find(
//     (o) =>
//       o.id?.toString().replace("#", "") === id?.toString()
//   );

//   if (!order) {
//     return <div className="p-6">Order not found</div>;
//   }

//   // Calculations
//   const subtotal = order.items?.reduce(
//     (acc, item) => acc + item.price * item.qty,
//     0
//   ) || 0;

//   const discount = order.discount || 0;
//   const discountAmount = (subtotal * discount) / 100;
//   const shipping = order.shippingCost || 0;
//   const total = subtotal - discountAmount + shipping;

//   const steps = [
//     "Order received",
//     "Processing",
//     "On the way",
//     "Delivered",
//   ];

//   return (
//     <div className="bg-gray-100 min-h-screen p-3 sm:p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6">

//         {/* Header */}
//         <div className="mb-6">
//           <h2 className="text-lg sm:text-xl font-semibold">
//             Order Details
//           </h2>
//           <p className="text-sm text-gray-500">
//             {order.date || "N/A"} • {order.items?.length || 0} Products
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

//           <AddressCard title="Billing Address" data={order.billing} />
//           <AddressCard title="Shipping Address" data={order.shipping} />

//           {/* Summary */}
//           <div className="border rounded-lg p-4 text-sm">
//             <Row label="Order ID" value={order.id || "N/A"} />
//             <Row label="Payment" value={order.payment || "N/A"} />

//             <hr className="my-3" />

//             <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
//             <Row label="Discount" value={`${discount}%`} />
//             <Row label="Shipping" value={shipping ? `$${shipping}` : "Free"} />

//             <div className="flex justify-between mt-3 font-semibold text-green-600">
//               <span>Total</span>
//               <span>${total.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Stepper */}
//         <div className="overflow-x-auto mb-6">
//           <div className="min-w-[500px] flex justify-between relative">

//             <div className="absolute top-4 left-0 w-full h-1 bg-gray-200"></div>

//             <div
//               className="absolute top-4 left-0 h-1 bg-green-500"
//               style={{
//                 width: `${((order.status || 1) / 4) * 100}%`,
//               }}
//             ></div>

//             {steps.map((label, index) => (
//               <div key={index} className="flex flex-col items-center z-10 w-full">
//                 <div
//                   className={`w-8 h-8 flex items-center justify-center rounded-full text-xs
//                   ${
//                     index < order.status
//                       ? "bg-green-500 text-white"
//                       : index === order.status
//                       ? "border-2 border-green-500 text-green-600"
//                       : "border text-gray-400"
//                   }`}
//                 >
//                   {(index + 1).toString().padStart(2, "0")}
//                 </div>
//                 <p className="text-xs mt-2 text-gray-500 text-center">
//                   {label}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Table */}
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
//               {order.items?.map((item, i) => (
//                 <tr key={i} className="border-b">
//                   <td className="py-3 flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gray-200 rounded"></div>
//                     {item.name}
//                   </td>
//                   <td>${item.price}</td>
//                   <td>x{item.qty}</td>
//                   <td className="text-right">
//                     ${(item.price * item.qty).toFixed(2)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </div>
//   );
// }

// /* Components */

// const AddressCard = ({ title, data }) => (
//   <div className="border rounded-lg p-4 text-sm">
//     <p className="text-gray-400 uppercase text-xs mb-2">{title}</p>

//     <p className="font-medium">{data?.name || "N/A"}</p>
//     <p className="text-gray-500 text-xs">{data?.address || "N/A"}</p>

//     <div className="mt-3">
//       <p className="text-gray-400 text-xs">Email</p>
//       <p>{data?.email || "N/A"}</p>
//     </div>

//     <div className="mt-2">
//       <p className="text-gray-400 text-xs">Phone</p>
//       <p>{data?.phone || "N/A"}</p>
//     </div>
//   </div>
// );

// const Row = ({ label, value }) => (
//   <div className="flex justify-between mb-1">
//     <span className="text-gray-500">{label}</span>
//     <span>{value}</span>
//   </div>
// );

// import { useParams } from "react-router-dom";
// import { useOrder } from "../Context/OrderContext";

// export default function OrderDetails() {
//   const { id } = useParams();
//   const { orderData } = useOrder();

//   // ✅ match using orderId
// //   const order = orderData.find(
// //     (o) => o.orderId === id
// //   );
// console.log("URL ID:", id);
// console.log("ORDER IDs:", orderData.map(o => o.orderId));
// const order = orderData.find(
//   (o) =>
//     o.orderId?.replace("ORD-", "") === id?.replace("ORD-", "")
// );

//   if (!order) {
//     return <div className="p-6 text-red-500">Order not found</div>;
//   }

//   const items = order.items || [];

//   const billing = order.billingAddress || {};
//   const shipping = order.shippingAddress || {};

//   const subtotal = items.reduce(
//     (acc, item) => acc + item.price * item.qty,
//     0
//   );

//   const total = order.total || subtotal;

//   const steps = [
//     "Order received",
//     "Processing",
//     "On the way",
//     "Delivered",
//   ];

//   return (
//     <div className="bg-gray-100 min-h-screen p-3 sm:p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6">

//         {/* Header */}
//         <div className="mb-6">
//           <h2 className="text-lg font-semibold">Order Details</h2>
//           <p className="text-sm text-gray-500">
//             {order.date} • {items.length} Products
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

//           <AddressCard title="Billing Address" data={billing} />
//           <AddressCard title="Shipping Address" data={shipping} />

//           {/* Summary */}
//           <div className="border rounded-lg p-4 text-sm">
//             <Row label="Order ID" value={order.orderId} />
//             <Row label="Payment" value={order.paymentMethod} />

//             <hr className="my-3" />

//             <Row label="Subtotal" value={`$${subtotal}`} />
//             <Row label="Shipping" value="Free" />

//             <div className="flex justify-between mt-3 font-semibold text-green-600">
//               <span>Total</span>
//               <span>${total}</span>
//             </div>
//           </div>
//         </div>

//         {/* Stepper (static for now) */}
//         <div className="overflow-x-auto mb-6">
//           <div className="min-w-[500px] flex justify-between relative">

//             <div className="absolute top-4 left-0 w-full h-1 bg-gray-200"></div>
//             <div className="absolute top-4 left-0 h-1 bg-green-500 w-1/4"></div>

//             {steps.map((label, index) => (
//               <div key={index} className="flex flex-col items-center w-full z-10">
//                 <div className="w-8 h-8 flex items-center justify-center rounded-full text-xs border text-gray-500">
//                   {(index + 1).toString().padStart(2, "0")}
//                 </div>
//                 <p className="text-xs mt-2 text-gray-500">{label}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Table */}
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
//                     <img
//                       src={item.image}
//                       alt=""
//                       className="w-10 h-10 rounded object-cover"
//                     />
//                     {item.name}
//                   </td>
//                   <td>${item.price}</td>
//                   <td>x{item.qty}</td>
//                   <td className="text-right">
//                     ${item.price * item.qty}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </div>
//   );
// }

// /* 🔁 Address Component */

// const AddressCard = ({ title, data }) => (
//   <div className="border rounded-lg p-4 text-sm">
//     <p className="text-gray-400 uppercase text-xs mb-2">{title}</p>

//     <p className="font-medium">
//       {data.firstName} {data.lastName}
//     </p>

//     <p className="text-gray-500 text-xs">
//       {data.street}, {data.state}, {data.country}
//     </p>

//     <div className="mt-3">
//       <p className="text-gray-400 text-xs">Email</p>
//       <p>{data.email}</p>
//     </div>

//     <div className="mt-2">
//       <p className="text-gray-400 text-xs">Phone</p>
//       <p>{data.phone}</p>
//     </div>
//   </div>
// );

// const Row = ({ label, value }) => (
//   <div className="flex justify-between mb-1">
//     <span className="text-gray-500">{label}</span>
//     <span>{value}</span>
//   </div>
// );

import { useOrder } from "../Context/OrderContext";

export default function OrderDetails() {

  const { orderData } = useOrder();

  // ✅ same logic as success page (latest order)
  const order = Array.isArray(orderData)
    ? orderData[orderData.length - 1]
    : orderData;

  if (!order) {
    return <div className="p-6 text-red-500">Order not found</div>;
  }

  const items = order.items || [];

  const billing = order.billingAddress || {};
  const shipping = order.shippingAddress || {};

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const total = order.total || subtotal;

  const steps = [
    "Order received",
    "Processing",
    "On the way",
    "Delivered",
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-3 sm:p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-4 sm:p-6">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Order Details</h2>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toDateString()} • {items.length} Products
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

          <AddressCard title="Billing Address" data={billing} />
          <AddressCard title="Shipping Address" data={shipping} />

          {/* Summary */}
          <div className="border rounded-lg p-4 text-sm">
            <Row label="Order ID" value={order.orderId} />
            <Row label="Payment" value={order.paymentMethod} />

            <hr className="my-3" />

            <Row label="Subtotal" value={`₹${subtotal}`} />
            <Row label="Shipping" value="Free" />

            <div className="flex justify-between mt-3 font-semibold text-green-600">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>

        {/* Stepper */}
        <div className="overflow-x-auto mb-6">
          <div className="min-w-[500px] flex justify-between relative">

            <div className="absolute top-4 left-0 w-full h-1 bg-gray-200"></div>
            <div className="absolute top-4 left-0 h-1 bg-green-500 w-1/4"></div>

            {steps.map((label, index) => (
              <div key={index} className="flex flex-col items-center w-full z-10">
                <div className="w-8 h-8 flex items-center justify-center rounded-full text-xs border text-gray-500">
                  {(index + 1).toString().padStart(2, "0")}
                </div>
                <p className="text-xs mt-2 text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-sm">
            <thead className="border-b text-gray-400">
              <tr>
                <th className="py-2 text-left">Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th className="text-right">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="border-b">
                  <td className="py-3 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt=""
                      className="w-10 h-10 rounded object-cover"
                    />
                    {item.name}
                  </td>
                  <td>₹{item.price}</td>
                  <td>x{item.qty}</td>
                  <td className="text-right">
                    ₹{item.price * item.qty}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

/* 🔁 Address Component */

const AddressCard = ({ title, data }) => (
  <div className="border rounded-lg p-4 text-sm">
    <p className="text-gray-400 uppercase text-xs mb-2">{title}</p>

    <p className="font-medium">
      {data?.firstName} {data?.lastName}
    </p>

    <p className="text-gray-500 text-xs">
      {data?.street}, {data?.state}, {data?.country}
    </p>

    <div className="mt-3">
      <p className="text-gray-400 text-xs">Email</p>
      <p>{data?.email}</p>
    </div>

    <div className="mt-2">
      <p className="text-gray-400 text-xs">Phone</p>
      <p>{data?.phone}</p>
    </div>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between mb-1">
    <span className="text-gray-500">{label}</span>
    <span>{value}</span>
  </div>
);