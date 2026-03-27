import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import { formatDateTime } from "../helpers/formatDateTime";

export default function OrderDetails() {
  const location = useLocation();
  const id = location.state?.orderId;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api({
          url: SummaryApi.getOrderById.url(id),
          method: SummaryApi.getOrderById.method,
        });

        setOrder(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrder();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!order) {
    return <div className="p-6 text-red-500">Order not found</div>;
  }

  const items = order.items || [];
  const billingAddress = order.billingAddress || {};
  const shippingAddress = order.shippingAddress || {};
  const paymentMethod = order.paymentMethod || "";
  const orderId = order.orderId || "";
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = order.total || subtotal;

const stepMap = {
  Placed: 0,
  Processing: 1,
  Shipped: 2,
  Delivered: 3,
};

const steps = [
  "Order received",
  "Processing",
  "On the way",
  "Delivered",
];
  const currentStep = stepMap[order.status] ?? 0;

  return (
    <div className="container mx-auto bg-white min-h-screen px-8 py-10">
      <div className="container mx-auto border border-[#E5E5E5] bg-white rounded-xl">

        {/* HEADER */}
        <div className="px-4 py-2 border-b border-[#E5E5E5] flex flex-col md:flex-row md:items-center md:justify-between gap-2">

          {/* LEFT SIDE */}
        <div className="text-sm py-2.5 px-4 text-[#4D4D4D] pb-3 flex items-center gap-2 flex-wrap">

          <span className="font-semibold text-black">
            Order Details
          </span>

          <span className="text-[#4D4D4D]">•</span>

          <span>
            {formatDateTime(order.createdAt, false)}
          </span>

          <span className="text-[#4D4D4D]">•</span>

          <span>
            {items.length} Products
          </span>

        </div>

          {/* RIGHT SIDE */}
          <div className="text-left md:text-right">
            <button
              onClick={() => navigate(-1)}
              className="text-[#00B207] text-sm font-semibold"
            >
              Back to List
            </button>
          </div>

        </div>


        {/* Cards */}
          {/* TOP GRID */}
          <div className="md:m-6 grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* LEFT (BILLING + SHIPPING COMBINED) */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 border rounded-lg divide-y md:divide-y-0 md:divide-x">
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
            <div className="border rounded-lg p-5 space-y-3 border-[#E5E5E5]">

              <div className="flex justify-between text-sm">
                <span className="text-[#999999] font-medium">ORDER ID:</span>
                <span className="font-medium text-black">{orderId}</span>
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

        {/* Stepper */}
      <div className="overflow-x-auto mb-6 p-6">
        <div className="min-w-[500px] flex justify-between relative">

          {/* BASE LINE */}
          {/* BASE LINE */}
          <div className="absolute top-4 left-0 right-0 mx-6 h-[6px] bg-gray-200"></div>

          {/* PROGRESS LINE */}
          {order.status !== "Cancelled" && (
            <div
              className="absolute top-4 h-[6px] bg-green-600 transition-all"
              style={{
                left: "16px",
                right: `${(steps.length - 1 - currentStep) * (100 / (steps.length - 1))}%`,
              }}
            ></div>
          )}

          {/* ❌ CANCEL LINE */}
          {order.status === "Cancelled" && (
            <div className="absolute top-4 left-0 w-full h-1 bg-red-400"></div>
          )}

          {steps.map((label, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div key={index} className="flex flex-col items-center relative z-10">

                {/* 🔘 STEP CIRCLE */}
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-xs border-2 transition-all

                    ${
                      order.status === "Cancelled"
                        ? "border-red-400 text-red-500 bg-white"

                        : isCompleted
                        ? "bg-green-600 text-white border-green-600"

                        : isCurrent
                        ? "bg-green-600 text-white border-green-600"

                        : "border-green-500 text-green-600 bg-white border-dashed"
                    }
                  `}
                >
                  {isCompleted ? "✓" : (index + 1).toString().padStart(2, "0")}
                </div>

                {/* 📝 LABEL */}
                <p
                  className={`text-xs mt-2 text-center

                    ${
                      order.status === "Cancelled"
                        ? "text-red-500"
                        : index <= currentStep
                        ? "text-green-600 font-medium"
                        : "text-gray-400"
                    }
                  `}
                >
                  {label}
                </p>

              </div>
            );
          })}

        </div>

        {/* ❌ CANCEL TEXT */}
        {order.status === "Cancelled" && (
          <p className="text-center text-sm text-red-500 mt-4 font-medium">
            Order Cancelled
          </p>
        )}
      </div>

        {/* Table */}
      <div className="">
        <div className="overflow-x-auto rounded-b-lg">

          <table className="w-full min-w-[600px] text-sm">

            {/* HEADER */}
            <thead className="bg-[#F2F2F2] text-gray-500 text-xs uppercase">
              <tr>
                <th className="py-3 px-4 text-left">Product</th>
                <th className="px-4 text-center">Price</th>
                <th className="px-4 text-center">Quantity</th>
                <th className="px-4 text-right">Subtotal</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {items.map((item, i) => (
                <tr
                  key={i}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  
                  {/* PRODUCT */}
                  <td className="py-4 px-4 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt=""
                      className="w-12 h-12 rounded-md object-cover border"
                    />
                    <span className="text-gray-800 font-medium">
                      {item.name}
                    </span>
                  </td>

                  {/* PRICE */}
                  <td className="px-4 text-center text-gray-700">
                    ₹{item.price}
                  </td>

                  {/* QTY */}
                  <td className="px-4 text-center text-gray-600">
                    x{item.quantity}
                  </td>

                  {/* SUBTOTAL */}
                  <td className="px-4 text-right font-medium text-gray-800">
                    ₹{item.price * item.quantity}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
      </div>
    </div>
  );
}

