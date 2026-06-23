import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import { formatDateTime } from "../helpers/formatDateTime";
const OrderSuccess = () => {
const navigate = useNavigate();
const location = useLocation();
const id = location.state?.orderId;
const [orderData, setOrderData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchOrder = async () => {
    try {
      const res = await api({
        url: SummaryApi.getOrderById.url(id),
        method: SummaryApi.getOrderById.method,
      });

      setOrderData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (id) fetchOrder();
}, [id]);


if (loading) {
  return <div className="p-10 text-center">Loading...</div>;
}

if (!orderData) {
  return <div className="p-10 text-center">No Order Found</div>;
}

const {
  items = [],
  billingAddress = {},
  shippingAddress = {},
  paymentMethod,
  total,
  createdAt,
} = orderData;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* TOP */}
      <div className="bg-green-50 py-10 px-4 text-center mt-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-[#00B578] rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">✓</span>
          </div>
        </div>

        <h1 className="text-2xl lg:text-3xl font-semibold text-[#166534]">
          Order Placed Successfully!
        </h1>

        <p className="text-[#166534] mt-2 text-base lg:text-lg">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6 text-sm text-gray-700">
          <div className="text-[#166534]">
            <span className="text-[#166534]">Order ID:</span>
            <div className="font-semibold mt-2">{orderData.orderId}</div>
          </div>

          <div className="hidden md:block h-10 w-px bg-[#00B578]"></div>

          <div className="text-[#166534]">
            <span className="text-[#166534]">Estimated Delivery:</span>
            <div className="font-semibold mt-2">5 - 7 Days</div>
          </div>
        </div>
      </div>

      {/* DETAILS */}
      <div className="container mx-auto px-4 mt-8">
        <div className="bg-white border border-[#E5E5E5] rounded-xl">

        <div className="text-sm py-2.5 px-4 text-[#4D4D4D] border-b border-[#E5E5E5] pb-3 flex items-center gap-2 flex-wrap">

          <span className="font-semibold text-black">
            Order Details
          </span>

          <span className="text-[#4D4D4D]">•</span>

          <span>
            {formatDateTime(createdAt, false)}
          </span>

          <span className="text-[#4D4D4D]">•</span>

          <span>
            {items.length} Products
          </span>

        </div>

        <div className=" rounded-lg overflow-hidden">

          {/* TOP GRID */}
          <div className="m-6 grid grid-cols-1 lg:grid-cols-3 border rounded-lg overflow-hidden">

            {/* LEFT (BILLING + SHIPPING COMBINED) */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:divide-x divide-[#E5E5E5]">
              {/* BILLING */}
              <div className="p-5">
                <div className="border-b mb-2">
                <h3 className="text-xs text-[#999999] mb-3 tracking-wide">
                  BILLING ADDRESS
                </h3>
                </div>

                <p className="font-medium text-black">
                  {billingAddress.firstName} {billingAddress.lastName}
                </p>

                <p className="text-sm text-[#666666] mt-1">
                  {billingAddress.street}, {billingAddress.city}, {billingAddress.state} - {billingAddress.zip}
                </p>

                <div className="mt-4 text-sm">
                  <p className="text-[#999999] text-xs">EMAIL</p>
                  <p>{billingAddress.email}</p>
                </div>

                <div className="mt-3 text-sm">
                  <p className="text-[#999999] text-xs">PHONE</p>
                  <p>{billingAddress.phone}</p>
                </div>
              </div>


              {/* SHIPPING */}
              <div className="p-5">
                <div className="border-b mb-2">

                <h3 className="text-xs text-gray-400 mb-3 tracking-wide">
                  SHIPPING ADDRESS
                </h3>
                </div>
                <p className="font-medium text-black">
                  {shippingAddress.firstName} {shippingAddress.lastName}
                </p>

                <p className="text-sm text-[#666666] mt-1">
                  {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.zip}
                </p>

                <div className="mt-4 text-sm">
                  <p className="text-[#999999] text-xs">EMAIL</p>
                  <p>{shippingAddress.email}</p>
                </div>

                <div className="mt-3 text-sm">
                  <p className="text-[#999999] text-xs">PHONE</p>
                  <p>{shippingAddress.phone}</p>
                </div>
              </div>

            </div>

            {/* RIGHT (SUMMARY) */}
            <div className="border-t md:border-t-0 md:border-l border-[#E5E5E5] p-5 space-y-3">

              <div className="flex justify-between text-sm">
                <span className="text-[#999999] font-medium">ORDER ID:</span>
                <span className="font-medium text-black">{orderData.orderId}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-[#999999]">PAYMENT METHOD:</span>
                <span className="font-medium text-black">{paymentMethod}</span>
              </div>

              <div className="border-t border-[#E6E6E6] pt-3 space-y-2 text-sm">

                <div className="flex justify-between">
                  <span className="text-[#666666]">Subtotal</span>
                  <span>₹{total}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#666666]">Discount</span>
                  <span>0%</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#666666]">Shipping</span>
                  <span>Free</span>
                </div>

                <div className="flex justify-between font-semibold text-[#1A1A1A] pt-2">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

              </div>
            </div>

          </div>

          {/* PRODUCTS SECTION */}
          <div className="border-t border-[#E5E5E5] p-6">

            <h3 className="font-medium mb-4">Products</h3>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border border-[#E6E6E6] rounded-lg p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₹{item.price}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
        </div>

        {/* BUTTONS */}
       <div className="flex flex-col md:flex-row gap-4 justify-start mt-5 mb-10">

        {/* TRACK ORDER */}
        <button
          onClick={() =>
            navigate('/order/order-details', {
              state: { orderId: orderData._id },
            })
          }
          className="border border-[#E6E6E6] rounded-full px-6 py-2 w-full md:w-auto"
        >
          Track Order
          </button>

        {/* CONTINUE SHOPPING */}
        <button
          onClick={() => navigate("/shop")}
          className="bg-[#00B207] text-white px-8 py-2 rounded-full w-full md:w-auto"
        >
          Continue Shopping
        </button>

        </div>
      </div>

    </div>
  );
};

export default OrderSuccess;