// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SummaryApi from "../common/SummaryApi";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch(SummaryApi.forgotPassword.url, {
//         method: SummaryApi.forgotPassword.method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         alert("OTP sent to your email");
//         // Pass email to reset password page via state
//         navigate("/reset-password", { state: { email } });
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       alert("Error sending OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg w-96">
//         <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
//         <input 
//           type="email" 
//           placeholder="Enter Registered Email" 
//           className="w-full border p-2 mb-4 rounded" 
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required 
//         />
//         <button className="w-full bg-blue-600 text-white py-2 rounded">
//           {loading ? "Sending..." : "Send OTP"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.forgotPassword.url, {
        method: SummaryApi.forgotPassword.method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("OTP sent to your email");
        navigate("/reset-password", { state: { email } });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="w-full bg-[#39B54A] hover:bg-[#32a342] text-white font-semibold py-3 rounded-full mt-4 shadow-md transition-all">
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
        <p className="text-center mt-6 text-sm">
          <span className="text-gray-500 cursor-pointer hover:underline" onClick={() => navigate("/login")}>Back to Login</span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;