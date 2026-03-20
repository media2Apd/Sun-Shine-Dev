import React from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClipboardDocumentListIcon,
  CurrencyRupeeIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";

const CustomerDetail = () => {
  const customer = {
    phone: "8778239060",
    email: "hameed@example.com",
    location: "Bangalore, India",
    totalOrders: 44,
    totalSpend: 18500,
    lastOrder: "12-07-2025",
  };

  return (
    <div className="min-h-screen  p-8">
      {/* Top Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Phone */}
        <div className="flex items-center gap-4">
          <div className="bg-gray-200 rounded-xl p-3">
            <PhoneIcon className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="font-semibold text-gray-900">
              {customer.phone}
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-4">
          <div className="bg-gray-200 rounded-xl p-3">
            <EnvelopeIcon className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="font-semibold text-gray-900">
              {customer.email}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-4">
          <div className="bg-gray-200 rounded-xl p-3">
            <MapPinIcon className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-semibold text-gray-900">
              {customer.location}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Orders */}
        <div className="bg-[#eef0f2] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <ClipboardDocumentListIcon className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-gray-500 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {customer.totalOrders}
          </p>
        </div>

        {/* Total Spend */}
        <div className="bg-[#eef0f2] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <CurrencyRupeeIcon className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-gray-500 text-sm">Total Spend</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            ₹{customer.totalSpend.toLocaleString()}
          </p>
        </div>

        {/* Last Order */}
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