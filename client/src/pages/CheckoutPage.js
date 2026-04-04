import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSettings } from "../Context/SettingsContext";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json";
import { useOrder } from "../Context/OrderContext";
import { useCart } from "../Context/CartContext";
import { useSelector } from "react-redux";
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import logo from "../assets/logo.svg";
import toast from "react-hot-toast";
const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderSummary = location.state?.orderSummary;
  const [paymentMethod, setPaymentMethod] = useState("COD");
  
  const { refreshCart } = useCart();
  const { address } = useSettings();
  const { setOrderData } = useOrder();
  const [loading, setLoading] = useState(false);
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);
  const user = useSelector((state) => state?.user?.user);
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

    useEffect(() => {
    if (!user) {
      navigate("/login", {
        state: { redirectTo: "/cart/checkout" },
      });
    }
  }, [navigate, user]);

  // autofill address
useEffect(() => {
  if (address) {
    setFormData({
      firstName: address.firstName || "",
      lastName: address.lastName || "",
      country: address.country || "",
      street: address.street || "",
      city: address.city || "",
      state: address.state || "",
      zip: address.zip || "",
      phone: address.phone || "",
      email: address.email || "",
    });

    setBillingData({
      firstName: address.firstName || "",
      lastName: address.lastName || "",
      country: address.country || "",
      street: address.street || "",
      city: address.city || "",
      state: address.state || "",
      zip: address.zip || "",
      phone: address.phone || "",
      email: address.email || "",
    });
  }
}, [address]);

  const handleBillingToggle = (value) => {
    setUseDifferentBilling(value);

    if (!value) {
      // ✅ same as shipping
      setBillingData(formData);
    } else {
      // ✅ empty separate form
      setBillingData({
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
    }
  };

  // ✅ FINAL ORDER LOGIC
  // const handlePlaceOrder = async () => {
  //   try {
  //     setLoading(true);

  //     const finalOrder = {
  //       items: orderSummary.items.map((item) => ({
  //         productId: item.productId,
  //         variantId: item.variantId, // ✅ MUST BE PRESENT
  //         quantity: item.qty,        // ✅ map qty → quantity
  //         price: item.price,
  //       })),
  //       total: orderSummary.total,
  //       shippingAddress: formData,
  //       billingAddress: useDifferentBilling ? billingData : formData,
  //       paymentMethod: "COD",
  //       customerId: user?._id,
  //     };

  //     const response = await api({
  //       url: SummaryApi.createOrder.url,
  //       method: SummaryApi.createOrder.method,
  //       data: finalOrder,
  //     });

  //     // ✅ correct data access
  //     const order = response.data.data;

  //     setOrderData(order);

  //     await refreshCart();

  //     // ✅ navigate using correct id
  //     navigate(`/order`, {
  //       state: { orderId: order._id },
  //     });

  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handlePlaceOrder = async () => {
    
    if (loading) return;

    const validateAddress = (data) => {
      return (
        data.firstName &&
        data.lastName &&
        data.country &&
        data.street &&
        data.city &&
        data.state &&
        data.zip &&
        data.phone &&
        data.email
      );
    };

      // ✅ SHIPPING ADDRESS CHECK
    if (!validateAddress(formData)) {
      toast.error("Please fill all shipping address fields ❌");
      return;
    }

    // ✅ BILLING ADDRESS CHECK (if different)
    if (useDifferentBilling && !validateAddress(billingData)) {
      toast.error("Please fill all billing address fields ❌");
      return;
    }

    try {
      setLoading(true);

      const finalOrder = {
        items: orderSummary.items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.qty,
          price: item.price,
        })),
        total: orderSummary.total,
        shippingAddress: formData,
        billingAddress: useDifferentBilling ? billingData : formData,
        paymentMethod: paymentMethod, // ✅ dynamic
        customerId: user?._id,
      };

      let response;

      // ✅ CONDITION BASED API CALL
      if (paymentMethod === "COD") {
        response = await api({
          url: SummaryApi.createOrder.url,
          method: SummaryApi.createOrder.method,
          data: finalOrder,
        });
      }else {
        const res = await api({
          url: SummaryApi.createOnlineOrder.url,
          method: SummaryApi.createOnlineOrder.method,
          data: finalOrder,
        });

        if (!res.data.success) {
          toast.error("Failed to create Razorpay order");
          setLoading(false);
          return;
        }

        const razorpayData = res.data.data.razorpayOrder;

        const options = {
          key: "rzp_test_RyBnpI4IJfC1QM",
          amount: razorpayData.amount,
          currency: razorpayData.currency,
          name: "Sunshine International Agritech",
          description: "Secure Payment for Your Order",
          image: logo, // 🔥 change this
          order_id: razorpayData.id,

          handler: async function (response) {
            setLoading(true);

            const verifyRes = await api({
              url: SummaryApi.verifyOrder.url,
              method: SummaryApi.verifyOrder.method,
              data: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
            });

            if (verifyRes.data.success) {
              const order = verifyRes.data.data;

              setOrderData(order);
              await refreshCart();

              navigate(`/order`, {
                state: { orderId: order._id },
              });
            } else {
              toast.error("Payment verification failed");
            }
          },

          modal: {
            ondismiss: function () {
              setLoading(false);
            },
          },

          prefill: {
            name: formData.firstName + " " + formData.lastName,
            email: formData.email,
            contact: formData.phone,
          },

          notes: {
            customerId: user?._id,
            company: "Sunshine International Agritech",
          },

          theme: {
            color: "#16a34a",
          },
        };

        if (!window.Razorpay) {
          console.error("Razorpay not loaded");
          toast.error("Payment system not loaded. Please refresh ❌");
          setLoading(false);
          return;
        }
        const rzp = new window.Razorpay(options);
        rzp.open();

        rzp.on("payment.failed", function (response) {
          console.log(response.error);
          toast.error("Payment Failed ❌");
          setLoading(false); // 🔥 IMPORTANT
        });

        return;
      }

      const order = response.data.data;

      setOrderData(order);
      await refreshCart();

      navigate(`/order`, {
        state: { orderId: order._id },
      });

    } catch (err) {
      console.log(err);
    } finally {
      if (paymentMethod === "COD") {
        setLoading(false);
      }
    }
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
                value={billingData.firstName}
                onChange={(e) =>
                  setBillingData({ ...billingData, firstName: e.target.value })
                }
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ex. John"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-sm font-medium mb-1">Last Name</label>
              <input
                id="lastName"
                value={billingData.lastName}
                onChange={(e) =>
                  setBillingData({ ...billingData, lastName: e.target.value })
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
              value={billingData.country}
              onChange={(e) =>
                setBillingData({ ...billingData, country: e.target.value })
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
              value={billingData.street}
              onChange={(e) =>
                setBillingData({ ...billingData, street: e.target.value })
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
                value={billingData.city}
                onChange={(e) =>
                  setBillingData({ ...billingData, city: e.target.value })
                }
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Select City"
              />
            </div>
            <div className="flex flex-col w-full md:w-[48%]">
              <label htmlFor="state" className="text-sm font-medium mb-1">State</label>
              <input
                id="state"
                value={billingData.state}
                onChange={(e) =>
                  setBillingData({ ...billingData, state: e.target.value })
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
                value={billingData.zip}
                onChange={(e) =>
                  setBillingData({ ...billingData, zip: e.target.value })
                }
                className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter Zip Code"
              />
            </div>
            <div className="flex flex-col w-full md:w-[48%]">
              <label htmlFor="phone" className="text-sm font-medium mb-1">Phone Number</label>
              <input
                id="phone"
                value={billingData.phone}
                onChange={(e) =>
                  setBillingData({ ...billingData, phone: e.target.value })
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
              value={billingData.email}
              onChange={(e) =>
                setBillingData({ ...billingData, email: e.target.value })
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

            <div className="space-y-3">
              <div className="text-sm text-gray-600 mb-2">Payment Method</div>

              {/* COD */}
              <label
                className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer ${
                  paymentMethod === "COD" ? "border-green-500 bg-green-50" : ""
                }`}
                onClick={() => setPaymentMethod("COD")}
              >
                <div>
                  <div className="font-medium">Cash on Delivery</div>
                  <div className="text-xs text-gray-500">
                    Pay when order is delivered
                  </div>
                </div>
                <input type="radio" checked={paymentMethod === "COD"} readOnly />
              </label>

              {/* ONLINE */}
              <label
                className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer ${
                  paymentMethod === "ONLINE" ? "border-green-500 bg-green-50" : ""
                }`}
                onClick={() => setPaymentMethod("ONLINE")}
              >
                <div>
                  <div className="font-medium">Online Payment</div>
                  <div className="text-xs text-gray-500">
                    Pay using Razorpay / UPI / Card
                  </div>
                </div>
                <input type="radio" checked={paymentMethod === "ONLINE"} readOnly />
              </label>
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

