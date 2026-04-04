import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import { motion } from "framer-motion";
import { Loader2, ShoppingCart } from "lucide-react";
import { GiCheckMark } from "react-icons/gi";
import { FaTruckFast } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import { MdPendingActions } from "react-icons/md";

const statusConfig = {
  Placed: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
    icon: <MdPendingActions className="text-yellow-600 text-lg" />,
  },
  Packaged: {
    bg: "bg-orange-100",
    text: "text-orange-600",
    icon: <FaTruckFast className="text-orange-600 text-lg" />,
  },
  Shipped: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    icon: <FaTruckFast className="text-blue-600 text-lg" />,
  },
  Delivered: {
    bg: "bg-green-100",
    text: "text-green-600",
    icon: <GiCheckMark className="text-green-600 text-lg" />,
  },
  Cancelled: {
    bg: "bg-red-100",
    text: "text-red-600",
    icon: <ImCancelCircle className="text-red-600 text-lg" />,
  },
};
export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await api({
        url: SummaryApi.getOrders.url,
        method: SummaryApi.getOrders.method,
      });

      setOrders(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      const confirmCancel = window.confirm(
        "Are you sure you want to cancel this order?"
      );

      if (!confirmCancel) return;

      const res = await fetch(`/api/orders/${orderId}/cancel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to cancel order");
      }

      // ✅ Update UI instantly
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status: "Cancelled" }
            : order
        )
      );

      alert("Order cancelled successfully ✅");
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    }
  };

  // 🔄 Loading UI
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-[#15803D]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-[#64748B] font-medium"
        >
          Loading your orders...
        </motion.p>

      </div>
    );
  }


  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-100 p-6 rounded-full mb-4"
        >
          <ShoppingCart strokeWidth={1} className="w-10 h-10 text-gray-500" />
        </motion.div>

        <motion.h2
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg font-semibold text-gray-700"
        >
          No Orders Yet
        </motion.h2>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-gray-500 mt-2"
        >
          Looks like you haven’t placed any orders yet.
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 bg-[#15803D] text-white rounded-lg transition"
        >
          Start Shopping
        </motion.button>

      </div>
    );
  }
  return (
    <div className="container mx-auto px-8 py-10">
      <div>
        <h1 className="text-2xl font-semibold text-black mb-1">
          Order History
        </h1>
        <p className="text-[#64748B] mb-6">
          View your previous orders and track your purchases.
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {orders.map((order) => {
          const config = statusConfig[order.status] || {};

          return (
            <div
              key={order._id}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white"
            >
              {/* 🔝 TOP */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 p-5 bg-white">

                {/* LEFT */}
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-lg ${config.bg || "bg-gray-100"}`}
                  >
                    {config.icon || <FaTruckFast className="text-gray-500" />}
                  </div>

                  <div>
                    <p className="font-semibold text-[#0F172A] text-sm md:text-base">
                      {order.orderId}
                    </p>
                    <p className="text-xs md:text-sm text-[#747484]">
                      Placed on {new Date(order.createdAt).toDateString()}
                    </p>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex justify-between items-center md:block md:text-right">

                  {/* Status */}
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${config.bg} ${config.text}`}>
                    {order.status}
                  </span>

                  {/* Price */}
                  <p className="text-base md:text-lg font-semibold mt-0 md:mt-1">
                    ₹{order.total?.toLocaleString()}
                  </p>

                </div>
              </div>

              {/* 🔽 BOTTOM */}
              <div className="bg-[#F8FAFC80] p-5 flex flex-col md:flex-row justify-between gap-4">

                {/* ITEMS */}
                <div>
                  <p className="text-sm font-medium text-black mb-2">
                    Items Purchased
                  </p>

                  <ul className="text-sm text-gray-600 space-y-1">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} / Qty-{item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col items-end gap-3 w-full md:w-auto">

                  {/* ✅ BIG BUTTON */}
                  {order.status === "Delivered" ? (
                    <button
                      onClick={() =>
                        navigate("/category-products/product-overview", {
                          state: { id: order.items[0]?.productId },
                        })
                      }
                      className="w-56 bg-[#00B207] hover:bg-green-700 text-white py-1.5 rounded-full font-medium"
                    >
                      Buy Again
                    </button>
                  ) : order.status !== "Cancelled" ? (
                    <button
                      onClick={() => navigate(`/order/order-details`, { state: { orderId: order._id }})}
                      className="w-56 bg-[#00B207] hover:bg-green-700 text-white py-1.5 rounded-full font-medium"
                    >
                      Track Order
                    </button>
                  ) : null}

                  {/* ✅ VIEW DETAILS */}
                  <div className="flex gap-3 w-56">

                    {/* VIEW DETAILS */}
                    <button
                      onClick={() => navigate(`/order/order-details`, { state: { orderId: order._id }})}
                      className="flex-1 border border-[#E3E3E3] bg-white py-2 rounded-md text-sm text-[#747484] hover:bg-gray-100"
                    >
                      View Details
                    </button>

                    {/* CANCEL ORDER */}
                    {(order.status === "Placed" || order.status === "Packaged") && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="flex-1 border border-red-300 bg-white text-red-600 py-2 rounded-md text-sm hover:bg-red-50"
                      >
                        Cancel
                      </button>
                    )}

                  </div>

                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
