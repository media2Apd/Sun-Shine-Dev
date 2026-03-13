import React from "react";

const AddressPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Billing Details */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-6">Billing Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="First name"/>
            <input className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Last name"/>
          </div>

          <div className="mt-4">
            <input className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Select Country"/>
          </div>

          <div className="mt-4">
            <input className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter Street Address"/>
          </div>

          <div className="mt-4">
            <input className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Select City"/>
          </div>

          <div className="mt-4">
            <input className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Select State"/>
          </div>

          <div className="mt-4">
            <input className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter Zip Code"/>
          </div>

          <div className="mt-4">
            <input className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter Phone Number"/>
          </div>

          <div className="mt-4">
            <input className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Enter Email Address"/>
          </div>

          {/* Delivery Address */}
          <div className="mt-6">
            <h3 className="font-medium mb-3">Delivery Address</h3>

            <div className="flex flex-col md:flex-row gap-4">
              <label className="flex items-center gap-2 border rounded-lg px-4 py-3 w-full cursor-pointer">
                <input type="radio" name="address"/>
                Same as shipping address
              </label>

              <label className="flex items-center gap-2 border rounded-lg px-4 py-3 w-full cursor-pointer">
                <input type="radio" name="address"/>
                Use a different billing address
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between text-sm mb-2">
            <span>Items (3)</span>
            <span>₹84.00</span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Sub Total</span>
            <span>₹84.00</span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="flex justify-between text-sm mb-4">
            <span>Taxes</span>
            <span>₹5.00</span>
          </div>

          <div className="border-t pt-4 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>$79.00</span>
          </div>

          <div className="mt-4 text-sm">
            <p className="font-medium">Payment Method</p>
            <p className="text-gray-500">Cash on Delivery (COD)</p>
          </div>

          <button className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-medium transition">
            Place Order →
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddressPage;