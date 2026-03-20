
import React from "react";
import { useOrder } from "../Context/OrderContext";
import { useNavigate } from "react-router-dom";

const statusColors = {
  Delivered: "bg-green-100 text-green-600",
  Shipped: "bg-blue-100 text-blue-600",
  Pending: "bg-yellow-100 text-yellow-600",
  "Order received": "bg-yellow-100 text-yellow-600",
  Processing: "bg-blue-100 text-blue-600",
  "On the way": "bg-purple-100 text-purple-600",
};

export default function OrderHistoryPage() {
  const { orderData } = useOrder();
  const orders = orderData || [];
  const navigate = useNavigate();

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        You have no orders yet.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-1">
        Order History
      </h1>
      <p className="text-gray-500 mb-6">
        View your previous orders and track the status of your purchases.
      </p>

      <div className="space-y-6">
        {orders.map((order) => {
          const inStock = order.items.every((item) => item.stock > 0);

          return (
            <div
              key={order.orderId}
              className="bg-white border rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
            >
              {/* Left Section */}
              <div className="flex flex-col md:flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-gray-100 flex items-center justify-center">
                    {order.status === "Delivered" ? "✓" : "🚚"}
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">
                      Order #{order.orderId}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Placed on{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="text-gray-600 text-sm mt-2">
                  <p className="font-medium mb-1">Items Purchased</p>
                  <ul className="space-y-1">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} – {item.qty}{" "}
                        {item.stock < 1 && "(Out of Stock)"}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex flex-col md:items-end gap-3 mt-4 md:mt-0">
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium ${
                    statusColors[order.status] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {order.status}
                </span>

                <span className="text-lg font-semibold text-gray-800">
                  ₹{order.total?.toLocaleString()}
                </span>

                {/* Buttons */}
                {/* <div className="flex flex-col md:flex-row gap-2 mt-2">
                  {order.status === "Delivered" ? (
                    <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
                      Buy Again
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        navigate("/orderhistory-page/orderdetails-page", {
                          state: { order },
                        })
                      }
                      className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
                    >
                      Track Order
                    </button>
                  )}

                  <button
                    onClick={() =>
                      navigate("/orderhistory-page/orderdetails-page", {
                        state: { order },
                      })
                    }
                    className="border border-gray-300 px-6 py-2 rounded-full text-gray-700 hover:bg-gray-100 transition"
                  >
                    Details
                  </button>
                </div> */}
                <div className="flex flex-col md:flex-row gap-2 mt-2">
  {order.status === "Delivered" ? (
    <button
    onClick={() =>
    navigate("/category-products/product-overview", {
      state: { id: order.items[0]?.id },
    })
  }
      className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
    >
      Buy Again
    </button>
    
  ) : (
   
    <button
      onClick={() =>
        navigate("/order-page/orderdetails-page", {
          state: { order },
        })
      }
      className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
    >
      Track Order
    </button>
  )}

<button
  onClick={() =>
    navigate("/category-products/product-overview", {
      state: { id: order.items[0]?.id },
    })
  }
  className="border border-gray-300 px-6 py-2 rounded-full text-gray-700 hover:bg-gray-100 transition"
>
  View Details
</button>

</div>


              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}