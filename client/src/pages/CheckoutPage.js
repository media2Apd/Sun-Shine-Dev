


import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSettings } from "../Context/SettingsContext";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json";
import { useOrder } from "../Context/OrderContext";
import { CartContext } from "../Context/CartContext";
import { LoginContext } from "../Context/LoginContext";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderSummary = location.state?.orderSummary;
  const { clearCart } = useContext(CartContext);
  const { address } = useSettings();
  const { setOrderData } = useOrder();
 const { currentUser } = useContext(LoginContext);
  const [loading, setLoading] = useState(false);
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);

  // Shipping form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
  });

  // Billing form
  const [billingData, setBillingData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
  });

  // autofill address
  useEffect(() => {
    if (address) {
      setFormData(address);
      setBillingData(address);
    }
  }, [address]);

  const handleBillingToggle = (value) => {
    setUseDifferentBilling(value);
    if (value) {
      setBillingData(formData);
    }
  };

  // ✅ FINAL ORDER LOGIC
  const handlePlaceOrder = () => {
    setLoading(true);

    const orderId = "ORD-" + Date.now();

    const finalOrder = {
      orderId,
      items: orderSummary.items,
      total: orderSummary.total,

      shippingAddress: formData,
      billingAddress: useDifferentBilling ? billingData : formData,

      paymentMethod: "COD",
      createdAt: new Date().toISOString(),

       customerId: currentUser?.customerId, 
    };

    // context
    setOrderData(finalOrder);
    
    // localStorage (multiple orders)
    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, finalOrder])
    );
    clearCart();
    setTimeout(() => {
      navigate("/order-page");
    }, 4000);
  };

  if (!orderSummary) {
    return <div className="p-10 text-center">No order summary found!</div>;
  }

  return (
    <div className="min-h-screen py-5 px-7 ">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="w-40 h-40">
            <Lottie animationData={animationData} loop />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SIDE (UNCHANGED UI) */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold">Shipping Address</h2>

          {/* (ALL YOUR EXISTING FORM CODE SAME - NO CHANGE) */}

            {/* First + Last Name */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
             <label htmlFor="firstName" className="text-sm font-medium mb-1">First Name</label>
             <input
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ex. John"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-sm font-medium mb-1">Last Name</label>
              <input
                id="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ex. Doe"
              />
            </div>
          </div>

          {/* Country */}
          <div className="flex flex-col">
            <label htmlFor="country" className="text-sm font-medium mb-1">Country</label>
            <input
              id="country"
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Select Country"
            />
          </div>

          {/* Street Address */}
          <div className="flex flex-col">
            <label htmlFor="street" className="text-sm font-medium mb-1">Street Address</label>
            <input
              id="street"
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
              className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter Street Address"
            />
          </div>

          {/* City + State */}
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col w-full md:w-[48%]">
              <label htmlFor="city" className="text-sm font-medium mb-1">City</label>
              <input
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Select City"
              />
            </div>
            <div className="flex flex-col w-full md:w-[48%]">
              <label htmlFor="state" className="text-sm font-medium mb-1">State</label>
              <input
                id="state"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Select State"
              />
            </div>
          </div>

          {/* Zip + Phone */}
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col w-full md:w-[48%]">
              <label htmlFor="zip" className="text-sm font-medium mb-1">Zip Code</label>
              <input
                id="zip"
                value={formData.zip}
                onChange={(e) =>
                  setFormData({ ...formData, zip: e.target.value })
                }
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter Zip Code"
              />
            </div>
            <div className="flex flex-col w-full md:w-[48%]">
              <label htmlFor="phone" className="text-sm font-medium mb-1">Phone Number</label>
              <input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter Phone Number"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-1">Email Address</label>
            <input
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter Email Address"
            />
          </div>

          {/* Billing toggle */}
          <h3 className="text-xl font-bold mt-4">Billing Address</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <label
              className="flex items-center gap-2 border rounded-lg px-4 py-3 w-full cursor-pointer"
              onClick={() => handleBillingToggle(false)}
            >
              <input type="radio" checked={!useDifferentBilling} readOnly />
              Same as shipping address
            </label>

            <label
              className="flex items-center gap-2 border rounded-lg px-4 py-3 w-full cursor-pointer"
              onClick={() => handleBillingToggle(true)}
            >
              <input type="radio" checked={useDifferentBilling} readOnly />
              Use a different billing address
            </label>
          </div>

          {useDifferentBilling && (
            <div className="space-y-4 mt-4">
              <h1 className="text-xl font-bold">Billing Details</h1>

                          {/* First + Last Name */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
             <label htmlFor="firstName" className="text-sm font-medium mb-1">First Name</label>
             <input
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ex. John"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-sm font-medium mb-1">Last Name</label>
              <input
                id="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ex. Doe"
              />
            </div>
          </div>

          {/* Country */}
          <div className="flex flex-col">
            <label htmlFor="country" className="text-sm font-medium mb-1">Country</label>
            <input
              id="country"
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Select Country"
            />
          </div>

          {/* Street Address */}
          <div className="flex flex-col">
            <label htmlFor="street" className="text-sm font-medium mb-1">Street Address</label>
            <input
              id="street"
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
              className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter Street Address"
            />
          </div>

          {/* City + State */}
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col w-full md:w-[48%]">
              <label htmlFor="city" className="text-sm font-medium mb-1">City</label>
              <input
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Select City"
              />
            </div>
            <div className="flex flex-col w-full md:w-[48%]">
              <label htmlFor="state" className="text-sm font-medium mb-1">State</label>
              <input
                id="state"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Select State"
              />
            </div>
          </div>

          {/* Zip + Phone */}
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col w-full md:w-[48%]">
              <label htmlFor="zip" className="text-sm font-medium mb-1">Zip Code</label>
              <input
                id="zip"
                value={formData.zip}
                onChange={(e) =>
                  setFormData({ ...formData, zip: e.target.value })
                }
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter Zip Code"
              />
            </div>
            <div className="flex flex-col w-full md:w-[48%]">
              <label htmlFor="phone" className="text-sm font-medium mb-1">Phone Number</label>
              <input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter Phone Number"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-1">Email Address</label>
            <input
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter Email Address"
            />
          </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE (ORDER SUMMARY - UI SAME) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 h-fit">

          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Items ({orderSummary.items.length})</span>
              <span>₹{orderSummary.total}</span>
            </div>

            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>₹{orderSummary.total}</span>
            </div>

            {/* <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-black font-medium">Free</span>
            </div>

            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹5.00</span>
            </div>
          </div> */}
  </div>
          <div className="border-t border-dashed my-4"></div>

          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span className="text-black text-xl">₹{orderSummary.total}</span>
          </div>

          <div className="border-t my-4"></div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Payment Method</span>
              <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                COD
              </span>
            </div>

            <div className="font-medium">Cash on Delivery (COD)</div>
            <div className="text-xs text-gray-500">
              Pay when your order is delivered.
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-medium transition"
          >
            Place Order →
          </button>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;

