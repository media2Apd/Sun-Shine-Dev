

// import React, { useContext, useMemo } from "react";
// import {
//   ShoppingCart,
//   Package,
//   Truck,
//   CheckCircle,
//   MessageCircle,
// } from "lucide-react";

// import { useOrder } from "../Context/OrderContext";
// import { ProductContext } from "../Context/ProductContext";
// import { useEnquiry } from "../Context/EnquiryContext";

// export default function AdminDashboard() {
//   const { orderData } = useOrder();
//   const { products } = useContext(ProductContext);
//  const { enquiries } = useEnquiry();

//   const orders = orderData || [];

//   /* ===== TOP STATS ===== */

//   const totalOrders = orders.length;

//   const totalRevenue = orders.reduce(
//     (sum, order) => sum + (order.total || 0),
//     0
//   );

//   const productsAvailable = products?.length || 0;

//   const stats = [
//     { title: "Total Orders", value: totalOrders },
//     { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}` },
//     { title: "Active Customers", value: "1,247" }, // static
//     { title: "Products Available", value: productsAvailable },
//   ];

//   /* ===== ORDER LIFECYCLE ===== */

//   const lifecycle = [
//     {
//       label: "New Orders",
//       value: orders.filter((o) => o.status === "Order received").length,
//       icon: ShoppingCart,
//       color: "text-blue-500",
//     },
//     {
//       label: "Processing",
//       value: orders.filter((o) => o.status === "Processing").length,
//       icon: Package,
//       color: "text-orange-500",
//     },
//     {
//       label: "Dispatched",
//       value: orders.filter((o) => o.status === "On the way").length,
//       icon: Truck,
//       color: "text-purple-500",
//     },
//     {
//       label: "Delivered",
//       value: orders.filter((o) => o.status === "Delivered").length,
//       icon: CheckCircle,
//       color: "text-green-500",
//     },
//   ];

//   /* ===== INVENTORY ===== */

//   const inventory = products?.map((p) => ({
//     name: p.name,
//     available: p.stock,
//     status: p.stock < 1 ? "Out of Stock" : "Low Stock",
//   }));

//   /* ===== RECENT ORDERS ===== */

//   const recentOrders = [...orders]
//     .reverse()
//     .slice(0, 6)
//     .map((o) => ({
//       id: o.orderId,
//       customer: o.billingAddress?.firstName || "Customer",
//       amount: o.total,
//       status: o.status,
//     }));

//   /* ===== RECENT ENQUIRIES ===== */

//   const recentEnquiries = [...(enquiries || [])]
//     .reverse()
//     .slice(0, 5);

//   /* ===== CUSTOMER INSIGHTS (STATIC UI SAME) ===== */

//   const customerInsights = {
//     totalCustomers: 1247,
//     newCustomers: 156,
//     thisWeek: 28,
//     topCustomer: {
//       name: "Abirami K",
//       orders: 45,
//       spent: "₹45,000",
//       avatar: "https://i.pravatar.cc/100?img=5",
//     },
//   };

//   return (
//     <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//       {/* TOP STATS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//         {stats.map((item, i) => (
//           <div key={i} className="bg-white p-5 rounded-xl border shadow-sm">
//             <p className="text-gray-500 text-sm">{item.title}</p>
//             <h2 className="text-2xl font-semibold mt-2">{item.value}</h2>
//             <p className="text-green-500 text-xs mt-2">Live Data</p>
//           </div>
//         ))}
//       </div>

//       {/* ORDER LIFECYCLE */}
//       <div className="bg-white mt-6 p-6 rounded-xl border shadow-sm">
//         <h3 className="font-semibold mb-5">Orders Lifecycle</h3>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {lifecycle.map((item, i) => {
//             const Icon = item.icon;
//             return (
//               <div key={i} className="flex items-center gap-3">
//                 <div className="p-2 bg-gray-100 rounded-lg">
//                   <Icon size={18} className={item.color} />
//                 </div>
//                 <div>
//                   <h2 className="font-semibold">{item.value}</h2>
//                   <p className="text-sm text-gray-500">{item.label}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* TABLES */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
//         {/* INVENTORY */}
//         <div className="bg-white p-6 rounded-xl border shadow-sm overflow-auto">
//           <div className="flex justify-between mb-4">
//             <h3 className="font-semibold">Inventory</h3>
//           </div>

//           <table className="w-full text-sm">
//             <thead className="text-gray-400 border-b">
//               <tr>
//                 <th className="text-left pb-2">Product Name</th>
//                 <th>Available</th>
//                 <th>Stock Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {inventory?.map((item, i) => (
//                 <tr key={i} className="border-b">
//                   <td className="py-3">{item.name}</td>
//                   <td className="text-center">{item.available}</td>
//                   <td className="text-center">
//                     <span
//                       className={
//                         item.status === "Low Stock"
//                           ? "text-orange-500"
//                           : "text-red-500"
//                       }
//                     >
//                       ● {item.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* RECENT ORDERS */}
//         <div className="bg-white p-6 rounded-xl border shadow-sm overflow-auto">
//           <div className="flex justify-between mb-4">
//             <h3 className="font-semibold">Recent Orders</h3>
//           </div>

//           <table className="w-full text-sm">
//             <thead className="text-gray-400 border-b">
//               <tr>
//                 <th className="text-left pb-2">Order ID</th>
//                 <th>Customer</th>
//                 <th>Amount</th>
//                 <th>Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {recentOrders.map((item, i) => (
//                 <tr key={i} className="border-b">
//                   <td className="py-3">{item.id}</td>
//                   <td>{item.customer}</td>
//                   <td>₹{item.amount}</td>
//                   <td>
//                     <span
//                       className={
//                         item.status === "Delivered"
//                           ? "text-green-600"
//                           : "text-orange-500"
//                       }
//                     >
//                       {item.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* BOTTOM SECTION */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
//         {/* ENQUIRIES */}
//         <div className="bg-white p-6 rounded-xl border shadow-sm">
//           <h3 className="font-semibold mb-4">Recent Enquiries</h3>

//           {recentEnquiries.map((item, i) => (
//             <div key={i} className="flex items-center justify-between py-3 border-b">
//               <div className="flex items-center gap-3">
//                 <div className="bg-green-100 p-2 rounded-full">
//                   <MessageCircle size={16} className="text-green-600" />
//                 </div>
//                 <div>
//                   <p className="font-medium">{item.name}</p>
//                   <p className="text-gray-500 text-sm">{item.message}</p>
//                 </div>
//               </div>
//               <span className="text-xs text-gray-400">{item.time}</span>
//             </div>
//           ))}
//         </div>

//         {/* CUSTOMER INSIGHTS (UNCHANGED UI) */}
//         <div className="bg-white p-6 rounded-xl border shadow-sm">
//           <div className="flex justify-between mb-6">
//             <h3 className="font-semibold">Customer Insights</h3>
//             <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
//               This Week
//             </span>
//           </div>

//           <div className="space-y-4">
//             <div className="flex justify-between">
//               <span>Total Customers</span>
//               <span className="font-semibold">
//                 {customerInsights.totalCustomers}
//               </span>
//             </div>

//             <div className="flex justify-between">
//               <span>New Customers</span>
//               <span className="font-semibold">
//                 {customerInsights.newCustomers}
//               </span>
//             </div>

//             <div className="flex justify-between">
//               <span>This Week</span>
//               <span className="font-semibold">
//                 {customerInsights.thisWeek}
//               </span>
//             </div>

//             <div className="flex items-center gap-3 pt-4 border-t">
//               <img
//                 src={customerInsights.topCustomer.avatar}
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//               <div>
//                 <p className="font-medium">
//                   {customerInsights.topCustomer.name}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {customerInsights.topCustomer.orders} orders •{" "}
//                   {customerInsights.topCustomer.spent}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useContext, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { ProductContext } from "../Context/ProductContext";
// import { useOrder } from "../Context/OrderContext";
// import { useEnquiry } from "../Context/EnquiryContext";

// export default function AdminDashboard() {
//   const navigate = useNavigate();

//  const { orderData } = useOrder();
//   const { products } = useContext(ProductContext);
//  const { enquiries } = useEnquiry();
// const orders = orderData || [];
//   /* ================= Dashboard Stats ================= */

//   const totalOrders = orders?.length || 0;

//   const totalRevenue = orders.reduce(
//     (sum, order) => sum + (order.total || 0),
//     0
//   );

//   const productsAvailable = products?.length || 0;

//   /* ================= Orders Lifecycle ================= */

//   const newOrders = orders.filter(
//     (o) => o.status === "Order received"
//   ).length;

//   const processingOrders = orders.filter(
//     (o) => o.status === "Processing"
//   ).length;

//   const dispatchedOrders = orders.filter(
//     (o) => o.status === "On the way"
//   ).length;

//   const deliveredOrders = orders.filter(
//     (o) => o.status === "Delivered"
//   ).length;

//   const maxOrders =
//     newOrders + processingOrders + dispatchedOrders + deliveredOrders || 1;

//   const getWidth = (count) => `${(count / maxOrders) * 100}%`;

//   /* ================= Recent Orders ================= */

//   const recentOrders = useMemo(() => {
//     return [...orders]
//       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//       .slice(0, 6);
//   }, [orders]);

//   /* ================= Recent Enquiries ================= */

//   const recentEnquiries = useMemo(() => {
//     return [...enquiries]
//       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//       .slice(0, 5);
//   }, [enquiries]);

//   /* ================= Inventory ================= */

//   const inventoryProducts = products.slice(0, 6);

//   return (
//     <div className="p-6 space-y-8">

//       {/* ================= TOP CARDS ================= */}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card title="Total Orders" value={totalOrders} />
//         <Card title="Total Revenue" value={`₹${totalRevenue}`} />
//         <Card title="Active Customers" value="1247" />
//         <Card title="Products Available" value={productsAvailable} />
//       </div>

//       {/* ================= ORDER LIFECYCLE ================= */}

//       <div className="bg-white p-6 rounded-xl shadow">
//         <h2 className="text-lg font-semibold mb-6">Orders Lifecycle</h2>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

//           <LifecycleCard
//             title="New Orders"
//             count={newOrders}
//             color="bg-blue-500"
//             width={getWidth(newOrders)}
//           />

//           <LifecycleCard
//             title="Processing"
//             count={processingOrders}
//             color="bg-orange-500"
//             width={getWidth(processingOrders)}
//           />

//           <LifecycleCard
//             title="Dispatched"
//             count={dispatchedOrders}
//             color="bg-purple-500"
//             width={getWidth(dispatchedOrders)}
//           />

//           <LifecycleCard
//             title="Delivered"
//             count={deliveredOrders}
//             color="bg-green-500"
//             width={getWidth(deliveredOrders)}
//           />
//         </div>
//       </div>

//       {/* ================= INVENTORY + RECENT ORDERS ================= */}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* Inventory */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <div className="flex justify-between mb-4">
//             <h2 className="font-semibold text-lg">Inventory</h2>
//             <button
//               onClick={() => navigate("/inventory")}
//               className="text-green-600 text-sm"
//             >
//               View Inventory →
//             </button>
//           </div>

//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-gray-500 text-left">
//                 <th>Product Name</th>
//                 <th>Available</th>
//                 <th>Stock Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {inventoryProducts.map((product) => {
//                 const availableCount =
//                   product.count ?? product.stock ?? 0;

//                 const stockStatus =
//                   availableCount < 1
//                     ? { text: "Out of Stock", color: "text-red-500" }
//                     : { text: "Low Stock", color: "text-yellow-500" };

//                 return (
//                   <tr key={product.id} className="border-t">
//                     <td className="py-2">{product.name}</td>
//                     <td>{availableCount}</td>
//                     <td className={stockStatus.color}>
//                       {stockStatus.text}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {/* Recent Orders */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <div className="flex justify-between mb-4">
//             <h2 className="font-semibold text-lg">Recent Orders</h2>
//             <button
//               onClick={() => navigate("/orders")}
//               className="text-green-600 text-sm"
//             >
//               View All Orders →
//             </button>
//           </div>

//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-gray-500 text-left">
//                 <th>Order ID</th>
//                 <th>Customer</th>
//                 <th>Amount</th>
//                 <th>Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {recentOrders.map((order) => (
//                 <tr key={order.orderId} className="border-t">
//                   <td className="py-2">{order.orderId}</td>
//                   <td>{order.customerName || "Customer"}</td>
//                   <td>₹{order.total}</td>
//                   <td>{order.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ================= RECENT ENQUIRIES ================= */}

//       <div className="bg-white p-6 rounded-xl shadow">
//         <div className="flex justify-between mb-4">
//           <h2 className="font-semibold text-lg">Recent Enquiries</h2>
//         </div>

//         {recentEnquiries.map((enq, index) => (
//           <div key={index} className="border-t py-3">
//             <p className="font-medium">{enq.name}</p>
//             <p className="text-sm text-gray-500">{enq.message}</p>
//           </div>
//         ))}
//       </div>

//       {/* ================= CUSTOMER INSIGHTS (STATIC UI) ================= */}

//       <div className="bg-white p-6 rounded-xl shadow">
//         <h2 className="font-semibold text-lg mb-4">Customer Insights</h2>

//         <div className="grid md:grid-cols-3 gap-6">
//           <div>
//             <p className="text-gray-500 text-sm">New Customers</p>
//             <p className="text-2xl font-bold">28</p>
//             <p className="text-sm text-gray-400">This Week</p>
//           </div>

//           <div>
//             <p className="text-gray-500 text-sm">New Customers</p>
//             <p className="text-2xl font-bold">156</p>
//             <p className="text-sm text-gray-400">This Week</p>
//           </div>

//           <div className="flex items-center gap-3">
//             <img
//               src="https://i.pravatar.cc/40"
//               className="w-10 h-10 rounded-full"
//               alt=""
//             />
//             <div>
//               <p className="font-semibold">Abirami K</p>
//               <p className="text-sm text-gray-500">
//                 45 orders • ₹25000 spent
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= Components ================= */

// function Card({ title, value }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow">
//       <p className="text-gray-500 text-sm">{title}</p>
//       <h2 className="text-2xl font-bold mt-2">{value}</h2>
//     </div>
//   );
// }

// function LifecycleCard({ title, count, color, width }) {
//   return (
//     <div>
//       <p className="text-xl font-semibold">{count}</p>
//       <p className="text-sm text-gray-500">{title}</p>

//       <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
//         <div
//           className={`${color} h-2 rounded-full`}
//           style={{ width }}
//         />
//       </div>
//     </div>
//   );
// }

import React, { useContext } from "react";
import {
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
  MessageCircle,
} from "lucide-react";

import { useOrder } from "../Context/OrderContext";
import { ProductContext } from "../Context/ProductContext";
import { useEnquiry } from "../Context/EnquiryContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { orderData } = useOrder();
  const { products } = useContext(ProductContext);
  const { enquiries } = useEnquiry();

  const orders = orderData || [];
  
const navigate = useNavigate();


  /* ===== TOP STATS ===== */

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.total || 0),
    0
  );

  const productsAvailable = products?.length || 0;

  const stats = [
    { title: "Total Orders", value: totalOrders },
    { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}` },
    { title: "Active Customers", value: "1,247" },
    { title: "Products Available", value: productsAvailable },
  ];

  /* ===== ORDER LIFECYCLE ===== */

  const lifecycle = [
    {
      label: "New Orders",
      value: orders.filter((o) => o.status === "Order received").length,
      icon: ShoppingCart,
      color: "text-blue-500",
    },
    {
      label: "Processing",
      value: orders.filter((o) => o.status === "Processing").length,
      icon: Package,
      color: "text-orange-500",
    },
    {
      label: "Dispatched",
      value: orders.filter((o) => o.status === "On the way").length,
      icon: Truck,
      color: "text-purple-500",
    },
    {
      label: "Delivered",
      value: orders.filter((o) => o.status === "Delivered").length,
      icon: CheckCircle,
      color: "text-green-500",
    },
  ];

  const totalLifecycle =
    lifecycle.reduce((sum, item) => sum + item.value, 0) || 1;

  /* ===== INVENTORY ===== */

  const inventory = products?.map((p) => ({
    name: p.name,
    available: p.stock ?? p.count ?? 0,
    status: (p.stock ?? p.count ?? 0) < 1 ? "Out of Stock" : "Low Stock",
  }));

  /* ===== RECENT ORDERS ===== */

  const recentOrders = [...orders]
    .reverse()
    .slice(0, 6)
    .map((o) => ({
      id: o.orderId,
      customer: o.billingAddress?.firstName || "Customer",
      amount: o.total,
      status: o.status,
    }));

  /* ===== RECENT ENQUIRIES ===== */

  const recentEnquiries = [...(enquiries || [])].reverse().slice(0, 5);

  /* ===== CUSTOMER INSIGHTS ===== */

  const customerInsights = {
    totalCustomers: 1247,
    newCustomers: 156,
    thisWeek: 28,
    topCustomer: {
      name: "Abirami K",
      orders: 45,
      spent: "₹45,000",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border shadow-sm">
            <p className="text-gray-500 text-sm">{item.title}</p>
            <h2 className="text-2xl font-semibold mt-2">{item.value}</h2>
            <p className="text-green-500 text-xs mt-2">Live Data</p>
          </div>
        ))}
      </div>

      {/* ORDER LIFECYCLE */}
      <div className="bg-white mt-6 p-6 rounded-xl border shadow-sm">
        <h3 className="font-semibold mb-5">Orders Lifecycle</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {lifecycle.map((item, i) => {
            const Icon = item.icon;
            const progress = (item.value / totalLifecycle) * 100;

            return (
              <div key={i}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Icon size={18} className={item.color} />
                  </div>

                  <div>
                    <h2 className="font-semibold">{item.value}</h2>
                    <p className="text-sm text-gray-500">{item.label}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2 h-1.5 bg-gray-200 rounded-full">
                  <div
                    className={`h-1.5 rounded-full ${item.color.replace(
                      "text",
                      "bg"
                    )}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TABLES */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        {/* INVENTORY */}
        <div className="bg-white p-6 rounded-xl border shadow-sm overflow-auto">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Inventory</h3>
             <span
              onClick={() => navigate("/admin-panel/product-list")}
      className="text-green-600 text-sm cursor-pointer"
    >
      View Inventory →
    </span>
          </div>

          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b">
              <tr>
                <th className="text-left pb-2">Product Name</th>
                <th>Available</th>
                <th>Stock Status</th>
              </tr>
            </thead>

            <tbody>
              {inventory?.map((item, i) => (
                <tr key={i} className="border-b">
                  <td className="py-3">{item.name}</td>
                  <td className="text-center">{item.available}</td>
                  <td className="text-center">
                    <span
                      className={
                        item.status === "Low Stock"
                          ? "text-orange-500"
                          : "text-red-500"
                      }
                    >
                      ● {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* RECENT ORDERS */}
        <div className="bg-white p-6 rounded-xl border shadow-sm overflow-auto">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Recent Orders</h3>
            <span 
            onClick={() => navigate("/admin-panel/order-list")}
            className="text-green-600 text-sm cursor-pointer">
              View All Orders →
            </span>
          </div>

          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b">
              <tr>
                <th className="text-left pb-2">Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((item, i) => (
                <tr key={i} className="border-b">
                  <td className="py-3">{item.id}</td>
                  <td>{item.customer}</td>
                  <td>₹{item.amount}</td>
                  <td>
                    <span
                      className={
                        item.status === "Delivered"
                          ? "text-green-600"
                          : "text-orange-500"
                      }
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        {/* ENQUIRIES */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-semibold mb-4">Recent Enquiries</h3>

          {recentEnquiries.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <MessageCircle size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500 text-sm">{item.message}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">{item.time}</span>
            </div>
          ))}
        </div>

        {/* CUSTOMER INSIGHTS */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between mb-6">
            <h3 className="font-semibold">Customer Insights</h3>
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
              This Week
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Customers</span>
              <span className="font-semibold">
                {customerInsights.totalCustomers}
              </span>
            </div>

            <div className="flex justify-between">
              <span>New Customers</span>
              <span className="font-semibold">
                {customerInsights.newCustomers}
              </span>
            </div>

            <div className="flex justify-between">
              <span>This Week</span>
              <span className="font-semibold">
                {customerInsights.thisWeek}
              </span>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t">
              <img
                src={customerInsights.topCustomer.avatar}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">
                  {customerInsights.topCustomer.name}
                </p>
                <p className="text-sm text-gray-500">
                  {customerInsights.topCustomer.orders} orders •{" "}
                  {customerInsights.topCustomer.spent}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}