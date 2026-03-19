

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiSearch, FiMoreHorizontal } from "react-icons/fi";
import { useOrder } from "../Context/OrderContext";

const OrderlistPage = () => {
  const { orderData, setOrderData } = useOrder();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  // Filter orders safely
  const filteredOrders = orderData
    .filter(
      (order) =>
        (order.customer?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (order.id?.toString() || "").includes(searchTerm)
    )
    .filter((order) =>
      selectedDate
        ? order.orderDate === new Date(selectedDate).toLocaleDateString()
        : true
    );

  // Delete order
  const deleteOrder = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrderData(orderData.filter((order) => order.id !== id));
    }
  };

  // Toggle status
  const toggleOrderStatus = (id) => {
    const updated = orderData.map((order) =>
      order.id === id
        ? {
            ...order,
            status: order.status === "Pending" ? "Completed" : "Pending",
          }
        : order
    );
    setOrderData(updated);
  };

  return (
    <div className="p-1">

      {/* TITLE */}
      <div className="text-xl md:text-2xl font-bold pb-4">
        Orders List
      </div>

      {/* FILTER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 mb-6">

        {/* DATE */}
        <div className="relative w-full md:w-auto">
          <FiCalendar className="absolute left-3 top-3 text-gray-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* SEARCH */}
        <div className="relative w-full md:w-auto">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3">

          {/* HEADER */}
          <thead className="text-sm text-gray-600">
            <tr className="text-center bg-gray-100">
              <th className="py-4 px-4 rounded-l-lg">Order ID</th>
              <th className="py-4 px-4">Customer</th>
              <th className="py-4 px-4">Items</th>
              <th className="py-4 px-4">Amount</th>
              <th className="py-4 px-4">Order Date</th>
              <th className="py-4 px-4">Status</th>
              {/* <th className="py-4 px-4 rounded-r-lg">Actions</th> */}
            </tr>
          </thead>

          <tbody>
  {filteredOrders.length === 0 ? (
    <tr>
      <td colSpan="7" className="p-4 text-center text-gray-400">
        No matching orders found
      </td>
    </tr>
  ) : (
    filteredOrders.map((order) => (
      <tr key={order.orderId} className="text-sm text-center">
        {/* <td className="py-4 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">
          {order.orderId || "N/A"}
        </td> */}
        <td className="py-4 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">

  <button
    onClick={() =>
      navigate(`/admin-panel/order-list/order-overview`,{ state: { id: order.orderId } })
    }
    className="text-blue-600 hover:underline font-medium"
  >
    {order.orderId || "N/A"}
  </button>

</td>
        <td className="py-4 px-4 bg-white border-y border-gray-200">
          {order.billingAddress
            ? `${order.billingAddress.firstName} ${order.billingAddress.lastName}`
            : "Unknown"}
        </td>
        <td className="py-4 px-4 bg-white border-y border-gray-200">
          {order.items?.length || 0}
        </td>
        <td className="py-4 px-4 bg-white border-y border-gray-200">
          ${order.total?.toFixed(2) || "0.00"}
        </td>
        <td className="py-4 px-4 bg-white border-y border-gray-200">
          {order.createdAt
            ? new Date(order.createdAt).toLocaleDateString()
            : "N/A"}
        </td>
        <td className="py-4 px-4 bg-white border-y border-gray-200">
          {order.status || "Order received"}
        </td>
        {/* <td className="py-4 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg relative"> */}
          {/* Your action buttons like View/Edit/Delete */}
        {/* </td> */}
      </tr>
    ))
  )}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default OrderlistPage;


