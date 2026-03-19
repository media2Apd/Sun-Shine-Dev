import React from "react";

const CustomerDetail = () => {
  const customer = {
    name: "Hameed Rahman",
    status: "Active",
    id: "CUST-99281",
    phone: "8778239060",
    email: "hameed@example.com",
    location: "Bangalore, India",
    totalOrders: 44,
    totalSpend: 18500,
    lastOrder: "12-07-2025",
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold flex items-center gap-3">
          {customer.name}
          <span
            className={`ml-2 px-2 py-1 text-xs rounded-full font-medium ${
              customer.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {customer.status}
          </span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Retail - ID: #{customer.id}
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
          <span className="text-green-600 text-xl">📞</span>
          <div>
            <p className="text-gray-500 text-sm">Phone Number</p>
            <p className="font-semibold">{customer.phone}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
          <span className="text-green-600 text-xl">✉️</span>
          <div>
            <p className="text-gray-500 text-sm">Email Address</p>
            <p className="font-semibold">{customer.email}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
          <span className="text-green-600 text-xl">📍</span>
          <div>
            <p className="text-gray-500 text-sm">Location</p>
            <p className="font-semibold">{customer.location}</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 text-sm mb-1">Total Orders</p>
          <p className="font-bold text-xl">{customer.totalOrders}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 text-sm mb-1">Total Spend</p>
          <p className="font-bold text-xl">₹{customer.totalSpend.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 text-sm mb-1">Last Order</p>
          <p className="font-bold text-xl">{customer.lastOrder}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;