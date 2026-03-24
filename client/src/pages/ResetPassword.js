// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import SummaryApi from "../common/SummaryApi";

// const ResetPassword = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: location.state?.email || "", // Email carried from forgot-password
//     otp: "",
//     newPassword: ""
//   });

//   const handleReset = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(SummaryApi.resetPassword.url, {
//         method: SummaryApi.resetPassword.method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       if (data.success) {
//         alert("Password reset successful!");
//         navigate("/login-page");
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       alert("Error resetting password");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <form onSubmit={handleReset} className="bg-white p-8 shadow-md rounded-lg w-96">
//         <h2 className="text-xl font-bold mb-4">Set New Password</h2>
//         <input 
//           type="email" 
//           placeholder="Email" 
//           className="w-full border p-2 mb-4 rounded bg-gray-100" 
//           value={formData.email} 
//           readOnly 
//         />
//         <input 
//           type="text" 
//           placeholder="Enter 4-digit OTP" 
//           className="w-full border p-2 mb-4 rounded" 
//           onChange={(e) => setFormData({...formData, otp: e.target.value})} 
//           required 
//         />
//         <input 
//           type="password" 
//           placeholder="New Password" 
//           className="w-full border p-2 mb-4 rounded" 
//           onChange={(e) => setFormData({...formData, newPassword: e.target.value})} 
//           required 
//         />
//         <button className="w-full bg-green-600 text-white py-2 rounded">
//           Reset Password
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import SummaryApi from "../common/SummaryApi";
import api from "../common/apiClient";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    otp: "",
    newPassword: ""
  });


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await api({
      url: SummaryApi.resetPassword.url,
      method: SummaryApi.resetPassword.method,
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
    });

    const data = response.data;

    if (data.success) {
      toast.success("Password reset successfully!");
      navigate("/login-page");
    } else {
      toast.error(data.message);
    }

  } catch (err) {
    //  better error handling than fetch
    const message =
      err.response?.data?.message || "Reset failed";
    toast.error(message);

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Reset Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={formData.email}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 outline-none text-gray-500"
            readOnly
          />
          <input
            type="text"
            placeholder="OTP"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-green-500"
            onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
            required
          />
          <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-green-500"
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                required
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
            </div>
          </div>
          
          <button className="w-full bg-[#39B54A] hover:bg-[#32a342] text-white font-semibold py-3 rounded-full mt-4 shadow-md transition-all">
             {loading ? "Resetting..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;