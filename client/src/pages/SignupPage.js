// import { useState, useContext } from "react";
// import { LoginContext } from "../Context/LoginContext";
// import { useToken } from "../Context/TokenContext"; // import token context
// import { useNavigate } from "react-router-dom";
// import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

// const SignupPage = () => {
//   const { register } = useContext(LoginContext);
//   const { generateToken } = useToken(); // get generateToken
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [acceptTerms, setAcceptTerms] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSignup = (e) => {
//     e.preventDefault();

//     if (!acceptTerms) return setMessage("Accept terms & conditions");
//     if (password !== confirm) return setMessage("Passwords do not match");

//     const res = register({ email, password });
//     if (res.success) {
//       // ✅ generate token immediately after registration
//       generateToken(email);

//       setMessage("Account created!");
//       navigate("/"); // redirect after signup
//     } else {
//       setMessage(res.message);
//     }
//   };

//   return (
//     <div className="flex items-start justify-center min-h-screen bg-gray-50 px-4 pb-20 md:items-center md:pt-0">
//       <form
//         className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
//         onSubmit={handleSignup}
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

//         {/* Email */}
//         <input
//           type="email"
//           placeholder="Email"
//           className="mb-4 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         {/* Password */}
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

//         {/* Confirm Password */}
//         <div className="relative mb-4">
//           <input
//             type={showConfirm ? "text" : "password"}
//             placeholder="Confirm Password"
//             className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
//             value={confirm}
//             onChange={(e) => setConfirm(e.target.value)}
//             required
//           />
//           <span
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
//             onClick={() => setShowConfirm(!showConfirm)}
//           >
//             {showConfirm ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
//           </span>
//         </div>

//         {/* Terms & Conditions */}
//         <label className="flex items-center mb-4 text-sm">
//           <input
//             type="checkbox"
//             checked={acceptTerms}
//             onChange={(e) => setAcceptTerms(e.target.checked)}
//             className="mr-2"
//           />
//           Accept all terms & Conditions
//         </label>

//         {/* Submit Button */}
//         <button className="w-full bg-green-600 text-white py-2 rounded mb-2 hover:bg-green-700 transition-colors">
//           Create Account
//         </button>

//         {/* Message */}
//         {message && <p className="text-center text-sm text-red-600 mt-2">{message}</p>}

//         {/* Login Link */}
//         <p className="text-center mt-4 text-sm">
//           Already have an account?{" "}
//           <span
//             className="text-blue-600 cursor-pointer hover:underline"
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default SignupPage;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
// import SummaryApi from "../common/SummaryApi";
// import { toast } from "react-hot-toast"; // Optional for better alerts

// const SignupPage = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1); // 1: Registration, 2: OTP Verification
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     otp: ""
//   });

//   const handleInput = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Step 1: Request OTP
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) return alert("Passwords do not match");

//     setLoading(true);
//     try {
//       const response = await fetch(SummaryApi.register.url, {
//         method: SummaryApi.register.method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: formData.email }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setStep(2);
//         alert("OTP sent to your email!");
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       alert("Registration error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 2: Verify OTP and Create Account
//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await fetch(SummaryApi.verifyOtp.url, {
//         method: SummaryApi.verifyOtp.method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//           otp: formData.otp
//         }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));
//         alert("Account verified successfully!");
//         navigate("/");
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       alert("Verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <form className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md" onSubmit={step === 1 ? handleRegister : handleVerify}>
//         <h2 className="text-2xl font-bold mb-6 text-center">{step === 1 ? "Create Account" : "Verify Email"}</h2>

//         {step === 1 ? (
//           <>
//             <input type="email" name="email" placeholder="Email" className="mb-4 w-full border p-2 rounded" onChange={handleInput} required />
//             <div className="relative mb-4">
//               <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" className="w-full border p-2 rounded" onChange={handleInput} required />
//               <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
//                 {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
//               </span>
//             </div>
//             <input name="confirmPassword" type="password" placeholder="Confirm Password" className="mb-4 w-full border p-2 rounded" onChange={handleInput} required />
//             <button disabled={loading} className="w-full bg-green-600 text-white py-2 rounded">
//               {loading ? "Sending OTP..." : "Register"}
//             </button>
//           </>
//         ) : (
//           <>
//             <p className="text-sm mb-4 text-center">Enter the 4-digit code sent to {formData.email}</p>
//             <input name="otp" type="text" placeholder="Enter OTP" className="mb-4 w-full border p-2 rounded text-center text-xl tracking-widest" onChange={handleInput} required />
//             <button disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">
//               {loading ? "Verifying..." : "Verify & Complete Signup"}
//             </button>
//           </>
//         )}
//       </form>
//     </div>
//   );
// };

// export default SignupPage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-hot-toast";

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Info, 2: OTP
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    otp: ""
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Step 1: Send OTP
  const handleRegisterClick = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.register.url, {
        method: SummaryApi.register.method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      const resData = await response.json();
      if (resData.success) {
        toast.success("OTP sent to your email!");
        setStep(2);
      } else {
        toast.error(resData.message);
      }
    } catch (err) {
      toast.error("Registration error");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Final Verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.verifyOtp.url, {
        method: SummaryApi.verifyOtp.method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          otp: data.otp
        }),
      });
      const resData = await response.json();
      if (resData.success) {
        toast.success("Account created successfully!");
        navigate("/login");
      } else {
        toast.error(resData.message);
      }
    } catch (err) {
      toast.error("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          {step === 1 ? "Create Account" : "Verify Email"}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={step === 1 ? handleRegisterClick : handleVerifyOtp}>
          {step === 1 ? (
            <>
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
                <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
                </div>
              </div>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-green-500 transition-all"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                  {showCurrentPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <input type="checkbox" id="terms" className="accent-green-600 w-4 h-4" required />
                <label htmlFor="terms" className="cursor-pointer">Accept all terms & Conditions</label>
              </div>
            </>
          ) : (
            <>
              <p className="text-center text-sm text-gray-500 mb-2">OTP sent to {data.email}</p>
              <input
                type="text"
                name="otp"
                placeholder="Enter 4-digit OTP"
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-center text-xl tracking-widest outline-none focus:border-green-500"
                value={data.otp}
                onChange={handleOnChange}
                required
              />
            </>
          )}

          <button className="w-full bg-[#39B54A] hover:bg-[#32a342] text-white font-semibold py-3 rounded-full mt-4 transition-all shadow-md active:scale-95">
            {loading ? "Please wait..." : step === 1 ? "Create Account" : "Verify & Sign Up"}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600 text-sm">
          Already have account?{" "}
          <span className="font-bold text-gray-800 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;