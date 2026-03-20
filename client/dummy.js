import { useState, useContext } from "react";
import { ProductContext } from "../Context/ProductContext";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {

  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    subCategory: "",
    code: "",
    shortDescription: "",
    description: "",
    crops: "",
    packageType: "",
    mrp: "",
    sellingPrice: "",
    quantity: "",
    gst: "",
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // ✅ IMAGE UPLOAD WITH BASE64
  const handleImageChange = (file, index) => {

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      const updatedImages = [...product.images];
      updatedImages[index] = reader.result;

      setProduct({
        ...product,
        images: updatedImages
      });

    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      name: product.name,
      category: product.category,
      price: product.sellingPrice,
      oldPrice: product.mrp,
      stock: product.quantity,
      image: product.images?.[0] || "",
      date: new Date().toLocaleDateString(),
      status: true
    };

    addProduct(newProduct);

    navigate("/admin-panel/product-list");
  };

  return (

<div className="p-4 md:p-6">

<h2 className="text-xl md:text-2xl font-semibold mb-6">
Add New Product
</h2>

<form onSubmit={handleSubmit} className="space-y-6">

{/* BASIC INFORMATION */}

<div className="bg-white p-4 md:p-6 rounded-xl shadow">

<h3 className="font-semibold mb-4">Basic Information</h3>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div>
<label className="text-sm">Product Name</label>
<input
type="text"
name="name"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
/>
</div>

<div>
<label className="text-sm">Category</label>
<select
name="category"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
>
<option>Select Category</option>
<option>Bio Based Product</option>
<option>Organic Product</option>
</select>
</div>

<div>
<label className="text-sm">Sub Category</label>
<select
name="subCategory"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
>
<option>Select Sub Category</option>
<option>Renewable</option>
<option>Non-Renewable</option>
</select>
</div>

<div>
<label className="text-sm">Product Code</label>
<input
type="text"
name="code"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
/>
</div>

<div className="md:col-span-2">
<label className="text-sm">Short Description</label>
<input
type="text"
name="shortDescription"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
/>
</div>

</div>
</div>

{/* PRODUCT DETAILS */}

<div className="bg-white p-4 md:p-6 rounded-xl shadow">

<h3 className="font-semibold mb-4">Product Details</h3>

<div className="space-y-4">

<div>
<label className="text-sm">Detailed Description</label>

<textarea
rows="4"
name="description"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
/>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div>
<label className="text-sm">Suitable Crops</label>

<select
name="crops"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
>
<option>Select Crops</option>
<option>Paddy</option>
<option>Vegetables</option>
</select>

</div>

<div>
<label className="text-sm">Packaging Type</label>

<select
name="packageType"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
>
<option>Select Type</option>
<option>Bottle</option>
<option>Packet</option>
</select>

</div>

</div>

</div>
</div>

{/* PRICING */}

<div className="bg-white p-4 md:p-6 rounded-xl shadow">

<h3 className="font-semibold mb-4">
Pricing & Inventory
</h3>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div>
<label className="text-sm">MRP</label>
<input
type="number"
name="mrp"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
/>
</div>

<div>
<label className="text-sm">Selling Price</label>
<input
type="number"
name="sellingPrice"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
/>
</div>

<div>
<label className="text-sm">Quantity</label>
<input
type="number"
name="quantity"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
/>
</div>

<div>
<label className="text-sm">GST/Tax</label>

<select
name="gst"
onChange={handleChange}
className="w-full border p-2 rounded mt-1"
>
<option>Select GST</option>
<option>5%</option>
<option>12%</option>
<option>18%</option>
</select>
</div>

</div>

{/* PRODUCT IMAGES */}

<div className="mt-6">

<label className="text-sm block mb-4">
Product Images
</label>

<div className="grid grid-cols-2 md:grid-cols-5 gap-6">

{[0,1,2,3,4].map((index) => (

<div key={index} className="text-center">

<div className="w-full h-28 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50">

{product.images[index] ? (

<img
src={product.images[index]}
alt="preview"
className="h-full object-cover rounded"
/>

) : (

<label className="cursor-pointer text-gray-400 text-sm">

Upload

<input
type="file"
className="hidden"
onChange={(e) =>
handleImageChange(e.target.files[0], index)
}
/>

</label>

)}

</div>

<div className="flex justify-between mt-2 text-sm">

<button
type="button"
className="text-gray-500"
onClick={() => {

const files = [...product.images];
files[index] = null;

setProduct({
...product,
images: files
});

}}
>

Remove

</button>

<label className="cursor-pointer text-gray-500">

✎

<input
type="file"
className="hidden"
onChange={(e) =>
handleImageChange(e.target.files[0], index)
}
/>

</label>

</div>

</div>

))}

</div>

</div>

</div>

{/* BUTTONS */}

<div className="flex flex-col sm:flex-row justify-end gap-3">

<button
type="button"
className="px-6 py-2 border rounded-lg w-full sm:w-auto"
onClick={() => navigate(-1)}
>

Back

</button>

<button
type="submit"
className="px-6 py-2 bg-green-600 text-white rounded-lg w-full sm:w-auto"
>

Save Product

</button>

</div>

</form>

</div>

  );
};

export default NewProduct;








//************************************************************** */


import React, { useContext, useState } from "react";
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import OTPInput from "otp-input-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("emailPassword"); // 'phonePassword', 'phoneOtp', 'emailPassword'
  const [data, setData] = useState({
    login: "",
    otp: "", 
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/";
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const otpResponse = await fetch(SummaryApi.sendOtp.url, {
        method: SummaryApi.sendOtp.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: data.login }),
      });
      const otpResult = await otpResponse.json();
      if (otpResult.success) {
        toast.success("OTP sent successfully!");
      } else {
        toast.error("Failed to send OTP.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const otpVerifyResponse = await fetch(SummaryApi.verifyOtp.url, {
        method: SummaryApi.verifyOtp.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: data.login, otp: data.otp }),
      });
      const otpVerifyResult = await otpVerifyResponse.json();
      if (otpVerifyResult.success) {
        toast.success("Login successful!");
        await fetchUserDetails();
        await fetchUserAddToCart();
        navigate(redirectPath, { replace: true });
      } else {
        toast.error("Incorrect OTP.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneAndEmailWithPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataResponse = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        toast.success(dataApi.message);
        await fetchUserDetails();
        await fetchUserAddToCart();
        // await handlePayment(); // Preserving commented code
        // navigate("/"); // Preserving commented code
        navigate(redirectPath, { replace: true });
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginMethodChange = (method) => {
    setLoginMethod(method);
    setData({ login: "", otp: "", password: "" });
  };

  return (
    <section className="min-h-screen -mt-24 flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 w-full max-w-[500px] rounded-2xl shadow-xl">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Relda</h1>
          <p className="text-gray-500 text-sm">Please log in using the form below.</p>
        </div>

        {loginMethod === "emailPassword" && (
          <form className="flex flex-col gap-5" onSubmit={handlePhoneAndEmailWithPassword}>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                name="login"
                value={data.login}
                onChange={handleOnChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#E60000] transition-all placeholder:text-gray-300"
                autoComplete="email"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-700">Password</label>
                <Link to="/forgot-password" size="sm" className="text-xs font-bold text-[#E60000] hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative border border-gray-200 rounded-lg flex items-center focus-within:border-[#E60000] transition-all">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={data.password}
                  name="password"
                  onChange={handleOnChange}
                  className="w-full border-l-0 border-gray-200 rounded-l-lg px-4 py-3 outline-none focus:border-[#E60000] transition-all placeholder:text-gray-300"
                  autoComplete="current-password"
                  required
                />
                <div className="pr-4 cursor-pointer text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <button 
                type="submit"
                disabled={loading}
                className="bg-[#E60000] hover:bg-[#CC0000] text-white font-bold py-3 rounded-lg mt-2 transition-all active:scale-95 shadow-md shadow-red-100 flex items-center justify-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Login'}
            </button>

            <div className="text-center mt-4">
               <p className="text-sm text-gray-600">
                Don't have an account? <Link to="/sign-up" className="text-[#E60000] font-bold hover:underline">Signup</Link>
              </p>
              <button 
                type="button"
                onClick={() => handleLoginMethodChange("phonePassword")}
                className="text-sm font-bold text-[#E60000] hover:underline mt-3"
              >
                Login with phone number?
              </button>
            </div>
          </form>
        )}

        {/* Phone Password Form */}
        {loginMethod === "phonePassword" && (
          <form className="flex flex-col gap-5" onSubmit={handlePhoneAndEmailWithPassword}>
             <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Phone Number</label>
              <div className="phone-input-container">
                <ReactPhoneInput
                    country="in"
                    value={data.login}
                    onChange={(phone) => handleOnChange({ target: { name: 'login', value: phone } })}
                    containerClass="!w-full"
                    inputClass="!w-full !h-[50px] !border-gray-200 !rounded-lg !text-base focus:!border-[#E60000]"
                    buttonClass="focus:!border-[#E60000] !border-gray-200  !rounded-l-lg !bg-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-gray-700">Password</label>
                <Link to="/forgot-password" size="sm" className="text-xs font-bold text-[#E60000] hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative border border-gray-200 rounded-lg flex items-center focus-within:border-[#E60000] transition-all">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={data.password}
                  name="password"
                  onChange={handleOnChange}
                  className="w-full border-l-0 border-gray-200 rounded-l-lg px-4 py-3 outline-none focus:border-[#E60000] transition-all placeholder:text-gray-300"
                  autoComplete="current-password"
                  required
                />
                <div className="pr-4 cursor-pointer text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <button 
                type="submit"
                disabled={loading}
                className="bg-[#E60000] hover:bg-[#CC0000] text-white font-bold py-3 rounded-lg mt-2 transition-all active:scale-95 shadow-md shadow-red-100 flex items-center justify-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Login'}
            </button>
            <div className="text-center mt-4">
               <p className="text-sm text-gray-600">
                Don't have an account? <Link to="/sign-up" className="text-[#E60000] font-bold hover:underline">Signup</Link>
              </p>
              <div className="text-center flex flex-col gap-3 mt-3">
                {/* <button type="button" onClick={() => handleLoginMethodChange("phoneOtp")} className="text-sm font-bold text-[#E60000] hover:underline">Login with OTP?</button> */}
                <button type="button" onClick={() => handleLoginMethodChange("emailPassword")} className="text-sm font-bold text-[#E60000] hover:underline">Login with email?</button>
              </div>
            </div>
          </form>
        )}

        {/* OTP Form */}
        {loginMethod === "phoneOtp" && (
          <form className="flex flex-col gap-5" onSubmit={handleOtpVerify}>
             <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-700">Phone Number</label>
              <div className="flex gap-2">
                <div className="flex-1">
                    <ReactPhoneInput
                        country="in"
                        value={data.login}
                        onChange={(phone) => handleOnChange({ target: { name: 'login', value: phone } })}
                        inputClass="!w-full !h-[50px] !border-gray-200 !rounded-lg focus:!border-[#E60000]"
                    />
                </div>
                <button type="button" onClick={handleSendOtp} className="bg-gray-100 px-4 rounded-lg text-sm font-bold hover:bg-gray-200">Send</button>
              </div>
            </div>

            <div className="flex flex-col gap-1 items-center">
              <label className="text-sm font-bold text-gray-700 self-start">OTP</label>
              <OTPInput
                value={data.otp}
                onChange={(otp) => handleOnChange({ target: { name: "otp", value: otp } })}
                OTPLength={6}
                otpType="number"
                disabled={false}
                autoFocus
                inputClassName="!w-10 !h-10 md:!w-12 md:!h-12 !border !border-gray-200 !rounded-lg focus:!border-[#E60000] !outline-none"
              />
            </div>

            <button className="bg-[#E60000] hover:bg-[#CC0000] text-white font-bold py-3 rounded-lg mt-2 transition-all">
              Verify & Login
            </button>

            <button type="button" onClick={() => handleLoginMethodChange("phonePassword")} className="text-center text-sm font-bold text-[#E60000] hover:underline mt-4">
                Back to Password Login
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Login;

//************************************************************************ */


import React, { useState } from 'react';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    
    // Name validation
    if (!data.name.trim()) tempErrors.name = "Name is required";
    
    // Email validation
    if (!data.email) {
        tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        tempErrors.email = "Please enter a valid email address";
    }
    
    // Mobile validation
    if (!data.mobile || data.mobile.length < 10) tempErrors.mobile = "Valid mobile number is required";
    
    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
    if (data.password.length < 8) {
        tempErrors.password = "Password must be at least 8 characters";
    } else if (!passwordRegex.test(data.password)) {
        tempErrors.password = "Use uppercase, lowercase, numbers & symbols";
    }

    // Confirm Password validation
    if (data.password !== data.confirmPassword) {
        tempErrors.confirmPassword = "Passwords do not match";
    }

    // Terms validation
    if (!agreeTerms) {
        tempErrors.terms = "Please accept the Terms & Conditions to continue";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    // Clear error for that field when user starts typing
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);

    try {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await dataResponse.json();

      if (result.success) {
        toast.success(result.message);
        navigate('/login');
      } else {
        if (result.details) {
          const fieldErrors = {};
          result.details.forEach((detail) => {
            fieldErrors[detail.field] = detail.message;
          });
          setErrors(fieldErrors);
        } else {
          toast.error(result.message);
        }
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-4 py-20">
      <div className="bg-white p-8 md:p-12 w-full max-w-[500px] rounded-2xl shadow-xl">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Relda</h1>
          <p className="text-gray-500 text-sm">Please sign up in using the form below.</p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              className={`w-full border ${errors.name ? 'border-[#E60000]' : 'border-gray-200'} rounded-lg px-4 py-3 outline-none focus:border-[#E60000] transition-all placeholder:text-gray-300`}
            />
            {errors.name && <p className="text-[#E60000] text-xs font-medium ml-1">{errors.name}</p>}
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="pixelshipon@gmail.com"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              className={`w-full border ${errors.email ? 'border-[#E60000]' : 'border-gray-200'} rounded-lg px-4 py-3 outline-none focus:border-[#E60000] transition-all placeholder:text-gray-300`}
            />
            {errors.email && <p className="text-[#E60000] text-xs font-medium ml-1">{errors.email}</p>}
          </div>

          {/* Mobile Number */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Mobile Number</label>
            <ReactPhoneInput
                country="in"
                value={data.mobile}
                onChange={(phone) => handleOnChange({ target: { name: 'mobile', value: phone } })}
                containerClass="!w-full"
                inputClass={`!w-full !h-[50px] !border ${errors.mobile ? '!border-[#E60000]' : '!border-gray-200'} !rounded-lg !text-base focus:!border-[#E60000]`}
                buttonClass="!border-gray-200 !rounded-l-lg !bg-transparent"
            />
            {errors.mobile && <p className="text-[#E60000] text-xs font-medium ml-1">{errors.mobile}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Password</label>
            <div className={`relative border ${errors.password ? 'border-[#E60000]' : 'border-gray-200'} rounded-lg flex items-center focus-within:border-[#E60000] transition-all`}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={data.password}
                name="password"
                onChange={handleOnChange}
                                  className="w-full border-l-0 border-gray-200 rounded-l-lg px-4 py-3 outline-none focus:border-[#E60000] transition-all placeholder:text-gray-300"

              />
              <div className="pr-4 cursor-pointer text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errors.password ? (
                <p className="text-[#E60000] text-xs font-medium ml-1">{errors.password}</p>
            ) : (
                <p className="text-green-600 text-[10px] md:text-xs font-semibold mt-1">Min 8 chars: Uppercase, Lowercase, Number & Symbol</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700">Confirm Password</label>
            <div className={`relative border ${errors.confirmPassword ? 'border-[#E60000]' : 'border-gray-200'} rounded-lg flex items-center focus-within:border-[#E60000] transition-all`}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={data.confirmPassword}
                name="confirmPassword"
                onChange={handleOnChange}
                className="w-full px-4 py-3 bg-transparent outline-none placeholder:text-gray-300"
              />
              <div className="pr-4 cursor-pointer text-gray-400" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errors.confirmPassword && <p className="text-[#E60000] text-xs font-medium ml-1">{errors.confirmPassword}</p>}
          </div>

          {/* Terms and Conditions */}
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center gap-2">
                <input 
                type="checkbox" 
                id="terms"
                checked={agreeTerms}
                onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if(e.target.checked) setErrors(prev => ({...prev, terms: ""}));
                }}
                className="accent-[#E60000] cursor-pointer w-4 h-4" 
                />
                <label htmlFor="terms" className="text-xs font-semibold text-gray-700 cursor-pointer">
                    Agree with <a href="/TermsAndConditions" target="_blank" className="text-[#E60000] underline">Terms & Condition</a>
                </label>
            </div>
            {errors.terms && <p className="text-[#E60000] text-[10px] font-medium ml-6">{errors.terms}</p>}
          </div>

          <button 
              type="submit"
              disabled={loading}
              className="bg-[#E60000] hover:bg-[#CC0000] text-white font-bold py-3 rounded-lg mt-2 transition-all active:scale-95 shadow-md shadow-red-100 flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Signup'}
          </button>

          <div className="text-center mt-2">
            <p className="text-sm text-gray-600">
              Already have an account? <Link to="/login" className="text-[#E60000] font-bold hover:underline">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;


// ***************************************************************


import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import SummaryApi from '../common';

const ForgotPassword = () => {
   const [email, setEmail] = useState('');
   const [loading, setLoading] = useState(false);

   const handleSubmit = async (e) => {
       e.preventDefault();
       setLoading(true);
       try {
           const response = await fetch(SummaryApi.forgotPassword.url, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ email }),
           });

           const data = await response.json();
           if (data.success) {
               toast.success(data.message || "Reset link sent successfully!");
           } else {
               toast.error(data.message || "Failed to send reset link.");
           }
       } catch (error) {
           toast.error("An error occurred. Please try again.");
       } finally {
           setLoading(false);
       }
   };

   return (
       <section className="min-h-screen -mt-24 bg-gray-100 flex items-center justify-center p-4">
           <div className="bg-white p-8 md:p-12 w-full max-w-[500px] rounded-2xl shadow-xl">
               
               {/* Header Section */}
               <div className="text-center mb-8">
                   <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password</h1>
                   <p className="text-gray-500 text-sm">
                       No worries, we'll send you instructions to reset your password.
                   </p>
               </div>

               <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                   {/* Email Input */}
                   <div className="flex flex-col gap-1">
                       <label htmlFor="email" className="text-sm font-bold text-gray-700">
                           Email Address
                       </label>
                       <input
                           type="email"
                           id="email"
                           placeholder="Enter your registered email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                           className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#E60000] transition-all placeholder:text-gray-300"
                       />
                   </div>

                   {/* Submit Button */}
                   <button
                       type="submit"
                       disabled={loading}
                       className={`bg-[#E60000] hover:bg-[#CC0000] text-white font-bold py-3 rounded-lg transition-all active:scale-95 shadow-lg shadow-red-100 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                   >
                       {loading ? "Sending..." : "Send Reset Link"}
                   </button>

                   {/* Footer Link */}
                   <div className="text-center">
                       <p className="text-sm text-gray-600">
                           Remember your password?{' '}
                           <Link to="/login" className="text-[#E60000] font-bold hover:underline">
                               Back to Login
                           </Link>
                       </p>
                   </div>
               </form>
           </div>
       </section>
   );
};

export default ForgotPassword;

//************************************************************* */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SummaryApi from '../common';

const ResetPassword = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [data, setData] = useState({
       password: '',
       confirmPassword: ''
   });
   const [errors, setErrors] = useState({});
   const { token } = useParams();
   const navigate = useNavigate();

   const handleOnChange = (e) => {
       const { name, value } = e.target;
       setData(prev => ({ ...prev, [name]: value }));
       if (errors[name]) {
           setErrors(prev => ({ ...prev, [name]: "" }));
       }
   };

   const validate = () => {
       let tempErrors = {};
       const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;

       if (data.password.length < 8) {
           tempErrors.password = "Password must be at least 8 characters";
       } else if (!passwordRegex.test(data.password)) {
           tempErrors.password = "Use uppercase, lowercase, numbers & symbols";
       }

       if (data.password !== data.confirmPassword) {
           tempErrors.confirmPassword = "Passwords do not match";
       }

       setErrors(tempErrors);
       return Object.keys(tempErrors).length === 0;
   };

   const handleSubmit = async (e) => {
       e.preventDefault();
       
       if (!validate()) return;

       try {
           const response = await fetch(SummaryApi.resetPassword(token).url, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ password: data.password }),
           });

           const result = await response.json();
           if (result.success) {
               toast.success(result.message || "Password reset successful!");
               navigate('/login');
           } else {
               toast.error(result.message || "Failed to reset password.");
           }
       } catch (error) {
           toast.error("An error occurred. Please try again.");
       }
   };

   return (
       <section className="min-h-screen -mt-24 bg-gray-100 flex items-center justify-center p-4 py-20">
           <div className="bg-white p-8 md:p-12 w-full max-w-[500px] rounded-2xl shadow-xl">
               
               {/* Header Section */}
               <div className="text-center mb-8">
                   <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
                   <p className="text-gray-500 text-sm">
                       Please enter and confirm your new strong password.
                   </p>
               </div>

               <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                   
                   {/* New Password */}
                   <div className="flex flex-col gap-1">
                       <label className="text-sm font-bold text-gray-700">New Password</label>
                       <div className={`relative border ${errors.password ? 'border-[#E60000]' : 'border-gray-200'} rounded-lg flex items-center focus-within:border-[#E60000] transition-all`}>
                           <input
                               type={showPassword ? "text" : "password"}
                               placeholder="********"
                               name="password"
                               value={data.password}
                               onChange={handleOnChange}
                               className="w-full px-4 py-3 bg-transparent outline-none placeholder:text-gray-300"
                           />
                           <div className="pr-4 cursor-pointer text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                               {showPassword ? <FaEyeSlash /> : <FaEye />}
                           </div>
                       </div>
                       {errors.password ? (
                           <p className="text-[#E60000] text-xs font-medium ml-1">{errors.password}</p>
                       ) : (
                           <p className="text-green-600 text-[10px] md:text-xs font-semibold mt-1">Min 8 chars: Uppercase, Lowercase, Number & Symbol</p>
                       )}
                   </div>

                   {/* Confirm New Password */}
                   <div className="flex flex-col gap-1">
                       <label className="text-sm font-bold text-gray-700">Confirm New Password</label>
                       <div className={`relative border ${errors.confirmPassword ? 'border-[#E60000]' : 'border-gray-200'} rounded-lg flex items-center focus-within:border-[#E60000] transition-all`}>
                           <input
                               type={showConfirmPassword ? "text" : "password"}
                               placeholder="Re-enter your password"
                               name="confirmPassword"
                               value={data.confirmPassword}
                               onChange={handleOnChange}
                               className="w-full px-4 py-3 bg-transparent outline-none placeholder:text-gray-300"
                           />
                           <div className="pr-4 cursor-pointer text-gray-400" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                               {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                           </div>
                       </div>
                       {errors.confirmPassword && (
                           <p className="text-[#E60000] text-xs font-medium ml-1">{errors.confirmPassword}</p>
                       )}
                   </div>

                   {/* Submit Button */}
                   <button
                       type="submit"
                       className="bg-[#E60000] hover:bg-[#CC0000] text-white font-bold py-3 rounded-lg mt-4 transition-all active:scale-95 shadow-lg shadow-red-100"
                   >
                       Reset Password
                   </button>
               </form>
           </div>
       </section>
   );
};

export default ResetPassword;