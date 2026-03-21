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

import React, { useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";
import { useOrder } from "../Context/OrderContext";

import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClipboardDocumentListIcon,
  CurrencyRupeeIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";

const CustomerDetail = () => {
  const location = useLocation();
  const customerId = location.state?.customerId;

  const { users } = useContext(LoginContext);
  const { orderData } = useOrder();

  const customer = useMemo(() => {
    if (!customerId) return null;

    const user = users.find((u) => u.customerId === customerId);
    if (!user) return null;

    const userOrders = orderData.filter(
      (order) => order.customerId === customerId
    );

    const totalOrders = userOrders.length;

    const totalSpend = userOrders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

    const lastOrder =
      totalOrders > 0
        ? userOrders[userOrders.length - 1]?.createdAt?.slice(0, 10)
        : "N/A";

    return {
      phone: user.phone || "N/A",
      email: user.email || "N/A",
      location: user.city || "N/A",
      totalOrders: totalOrders || "N/A",
      totalSpend: totalSpend || 0,
      lastOrder,
    };
  }, [customerId, users, orderData]);

  if (!customer) {
    return (
      <div className="p-10 text-center text-lg font-semibold">
        Customer not found
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      {/* Top Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-gray-200 rounded-xl p-3">
            <PhoneIcon className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="font-semibold text-gray-900">{customer.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-gray-200 rounded-xl p-3">
            <EnvelopeIcon className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="font-semibold text-gray-900">{customer.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-gray-200 rounded-xl p-3">
            <MapPinIcon className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-semibold text-gray-900">{customer.location}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#eef0f2] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <ClipboardDocumentListIcon className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-gray-500 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {customer.totalOrders}
          </p>
        </div>

        <div className="bg-[#eef0f2] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <CurrencyRupeeIcon className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-gray-500 text-sm">Total Spend</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            ₹{Number(customer.totalSpend).toLocaleString()}
          </p>
        </div>

        <div className="bg-[#eef0f2] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <CalendarIcon className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-gray-500 text-sm">Last Order</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {customer.lastOrder}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;