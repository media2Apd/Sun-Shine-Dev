// import { useState, useContext } from "react";
// import { LoginContext } from "../Context/LoginContext";
// import { useNavigate } from "react-router-dom";
// import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
// import { useToken } from "../Context/TokenContext"; // import token context 

// const LoginPage = () => {
//   const { login } = useContext(LoginContext);
//   const navigate = useNavigate();
//  const { generateToken } = useToken(); // get generateToken
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [message, setMessage] = useState("");

 

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const res = login({ email, password });
//     if (res.success) {
//       generateToken(email);
//       setMessage("Logged in successfully!");
//       navigate("/");
//     } else {
//       setMessage(res.message);
//     }
//   };

  

//   return (
//     <div className="flex items-start justify-center min-h-screen bg-gray-50 px-4 pb-20 md:items-center md:pt-0">
//       <form className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md" onSubmit={handleLogin}>
//         <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="mb-4 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <div className="relative mb-4">
//           <input
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <span
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
//           </span>
//         </div>

//         <div className="flex items-center justify-between mb-4 text-sm">
//           <label className="flex items-center">
//             <input
//               type="checkbox"
//               checked={rememberMe}
//               onChange={(e) => setRememberMe(e.target.checked)}
//               className="mr-2"
//             />
//             Remember me
//           </label>
//           <span
//             className="text-blue-600 cursor-pointer hover:underline"
//             onClick={() => navigate("/change-password")}
//           >
//             Forgot password?
//           </span>
//         </div>

//         <button className="w-full bg-green-600 text-white py-2 rounded mb-2 hover:bg-green-700 transition-colors">
//           Login
//         </button>

//         {message && <p className="text-center text-sm text-red-600 mt-2">{message}</p>}

//         <p className="text-center mt-4 text-sm">
//           Don't have an account?{" "}
//           <span
//             className="text-blue-600 cursor-pointer hover:underline"
//             onClick={() => navigate("/signup-page")}
//           >
//             Register
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SummaryApi from "../common/SummaryApi";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch(SummaryApi.signIn.url, {
//         method: SummaryApi.signIn.method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         // Save Token and User info
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));
        
//         alert("Login Successful");
//         navigate("/");
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       alert("Server Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <form className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md" onSubmit={handleLogin}>
//         <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
//         <input type="email" placeholder="Email" className="mb-4 w-full border p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" className="mb-4 w-full border p-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
//         <div className="flex justify-between text-sm mb-4">
//             <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/forgot-password")}>Forgot Password?</span>
//         </div>

//         <button className="w-full bg-green-600 text-white py-2 rounded" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import SummaryApi from "../common/SummaryApi";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import { getLocalWishlist, clearLocalWishlist } from "../helpers/wishlistHelper";
import { getLocalCart, clearLocalCart } from "../helpers/cartHelper";
import api from "../common/apiClient";
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";

const syncLocalDataToBackend = async (token) => {
  try {
    // 🔥 WISHLIST SYNC
    const localWishlist = getLocalWishlist();

    for (const item of localWishlist) {
      await api({
        url: SummaryApi.addToWishlist.url,
        method: SummaryApi.addToWishlist.method,
        data: {
          productId: item.productId,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    // 🔥 CART SYNC
    const localCart = getLocalCart();

    for (const item of localCart) {
      await api({
        url: SummaryApi.addToCart.url,
        method: "post",
        data: {
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity || 1,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    // 🔥 CLEAR LOCAL AFTER SYNC
    clearLocalWishlist();
    clearLocalCart();

    // 🔥 REFRESH CONTEXT
    window.dispatchEvent(new Event("wishlistUpdated"));
    window.dispatchEvent(new Event("cartUpdated"));

  } catch (err) {
    console.log("Sync failed", err);
  }
};

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { refreshWishlist } = useWishlist();
  const { refreshCart } = useCart();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => ({ ...preve, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        toast.success(dataResponse.message);

        localStorage.setItem("token", dataResponse.token);
        localStorage.setItem("user", JSON.stringify(dataResponse.user));

        // 🔥 IMPORTANT: SYNC LOCAL DATA
        await syncLocalDataToBackend(dataResponse.token);
        // 🔥 THIS FIXES HEADER
        await refreshWishlist();
        await refreshCart();

        window.dispatchEvent(new Event("wishlistUpdated"));
        window.dispatchEvent(new Event("cartUpdated"));
        const userRes = await axios.get(SummaryApi.getProfile.url, {
          headers: { Authorization: `Bearer ${dataResponse.token}` },
        });

        dispatch(setUserDetails(userRes?.data?.data));
        navigate("/");
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Sign In</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-green-500 transition-all"
            value={data.email}
            onChange={handleOnChange}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-green-500 transition-all"
              value={data.password}
              onChange={handleOnChange}
              required
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-green-600 w-4 h-4" />
              Remember me
            </label>
            <span 
              onClick={() => navigate("/forgot-password")}
              className="hover:text-green-600 cursor-pointer transition-all"
            >
              Forgot Password?
            </span>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-[#39B54A] hover:bg-[#32a342] text-white font-semibold py-3 rounded-full mt-4 transition-all shadow-md active:scale-95 disabled:opacity-70"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600 text-sm">
          Don't have account?{" "}
          <span 
            className="font-bold text-gray-800 cursor-pointer hover:underline"
            onClick={() => navigate("/signup-page")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;