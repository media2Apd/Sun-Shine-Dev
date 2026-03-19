


import React from "react";
import { useOrder } from "../Context/OrderContext";
import { useNavigate } from "react-router-dom";
const OrderSuccess = () => {
const navigate = useNavigate();
  const { orderData } = useOrder();

  if (!orderData) {
    return <div className="p-10 text-center">No Order Found</div>;
  }

  const {
    orderId,
    shippingAddress,
    billingAddress,
    total,
    items,
    paymentMethod,
    createdAt,
  } = orderData;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* TOP */}
      <div className="bg-green-50 py-10 px-4 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl">✓</span>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-green-700">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-6 text-sm text-gray-700">
          <div>
            <span className="text-gray-500">Order ID:</span>
            <div className="font-medium">{orderId}</div>
          </div>

          <div className="hidden md:block h-6 w-px bg-gray-300"></div>

          <div>
            <span className="text-gray-500">Estimated Delivery:</span>
            <div className="font-medium">5 - 7 Days</div>
          </div>
        </div>
      </div>

      {/* DETAILS */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">

          <div className="text-sm text-gray-500 mb-4">
            <span className="font-medium text-black">Order Details</span> •{" "}
            {new Date(createdAt).toDateString()} • {items.length} Products
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* BILLING */}
            <div className="border rounded-lg p-4">
              <h3 className="text-xs text-gray-500 mb-2">BILLING ADDRESS</h3>

              <p className="font-medium">
                {billingAddress.firstName} {billingAddress.lastName}
              </p>

              <p className="text-sm text-gray-600">
                {billingAddress.street}, {billingAddress.city}, {billingAddress.state} - {billingAddress.zip}
              </p>

              <div className="mt-3 text-sm">
                <p className="text-gray-500">EMAIL</p>
                <p>{billingAddress.email}</p>
              </div>

              <div className="mt-2 text-sm">
                <p className="text-gray-500">PHONE</p>
                <p>{billingAddress.phone}</p>
              </div>
            </div>

            {/* SHIPPING */}
            <div className="border rounded-lg p-4">
              <h3 className="text-xs text-gray-500 mb-2">SHIPPING ADDRESS</h3>

              <p className="font-medium">
                {shippingAddress.firstName} {shippingAddress.lastName}
              </p>

              <p className="text-sm text-gray-600">
                {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.zip}
              </p>

              <div className="mt-3 text-sm">
                <p className="text-gray-500">EMAIL</p>
                <p>{shippingAddress.email}</p>
              </div>

              <div className="mt-2 text-sm">
                <p className="text-gray-500">PHONE</p>
                <p>{shippingAddress.phone}</p>
              </div>
            </div>

            {/* SUMMARY */}
            <div className="border rounded-lg p-4 space-y-3">

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">ORDER ID:</span>
                <span className="font-medium">{orderId}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">PAYMENT METHOD:</span>
                <span className="font-medium">{paymentMethod}</span>
              </div>

              <div className="border-t pt-3 space-y-2 text-sm">

                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>₹{total}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Discount</span>
                  <span>0%</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>Free</span>
                </div>

                <div className="flex justify-between font-semibold text-green-600 pt-2">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* BUTTONS */}
       <div className="flex flex-col md:flex-row gap-4 justify-center mt-5 mb-10">

  {/* TRACK ORDER */}
  <button
    onClick={()=> navigate('orderdetails-page')}
    className="border rounded-full px-6 py-3 w-full md:w-auto"
  >
    Track Order
  </button>

  {/* CONTINUE SHOPPING */}
  <button
    onClick={() => navigate("/")}
    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full w-full md:w-auto"
  >
    Continue Shopping
  </button>

</div>
      </div>

    </div>
  );
};

export default OrderSuccess;