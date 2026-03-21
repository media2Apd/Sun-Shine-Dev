// import { useState, useContext } from "react";
// import { LoginContext } from "../Context/LoginContext"; 
// import { useNavigate } from "react-router-dom";

// const SignupPage = () => {
//   const { register } = useContext(LoginContext);
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [acceptTerms, setAcceptTerms] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSignup = (e) => {
//     e.preventDefault();

//     if (!acceptTerms) return setMessage("Accept terms & conditions");
//     if (password !== confirm) return setMessage("Passwords do not match");

//     const res = register({ email, password });
//     if (res.success) {
//       setMessage("Account created!");
//       navigate("/dashboard"); // example redirect
//     } else {
//       setMessage(res.message);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50">
//       <form
//         onSubmit={handleSignup}
//         className="bg-white p-6 rounded-xl shadow-md w-[320px]"
//       >
//         <h2 className="text-xl font-bold mb-4">Create Account</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="input mb-3"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="input mb-3"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Confirm Password"
//           className="input mb-3"
//           value={confirm}
//           onChange={e => setConfirm(e.target.value)}
//           required
//         />

//         <label className="flex items-center mb-3 text-sm">
//           <input
//             type="checkbox"
//             checked={acceptTerms}
//             onChange={e => setAcceptTerms(e.target.checked)}
//             className="mr-2"
//           />
//           Accept all terms & Conditions
//         </label>

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 rounded mb-2 hover:bg-green-700"
//         >
//           Create Account
//         </button>

//         <p className="text-center text-sm text-red-600">{message}</p>

//         <p className="text-center mt-3 text-sm">
//           Already have account?{" "}
//           <span
//             className="text-blue-600 cursor-pointer"
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

// import { useState, useContext } from "react";
// import { LoginContext } from "../Context/LoginContext"; 
// import { useNavigate } from "react-router-dom";

// const SignupPage = () => {
//   const { register } = useContext(LoginContext);
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [acceptTerms, setAcceptTerms] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSignup = (e) => {
//     e.preventDefault();
//     if (!acceptTerms) return setMessage("Accept terms & conditions");
//     if (password !== confirm) return setMessage("Passwords do not match");

//     const res = register({ email, password });
//     if (res.success) {
//       setMessage("Account created!");
//       navigate("/dashboard"); 
//     } else {
//       setMessage(res.message);
//     }
//   };

//   return (
// <div className="flex items-start justify-center min-h-screen bg-gray-50 px-4 pt-8">      <form
//         onSubmit={handleSignup}
//         className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="mb-4 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="mb-4 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Confirm Password"
//           className="mb-4 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//           value={confirm}
//           onChange={e => setConfirm(e.target.value)}
//           required
//         />

//         <label className="flex items-center mb-4 text-sm">
//           <input
//             type="checkbox"
//             checked={acceptTerms}
//             onChange={e => setAcceptTerms(e.target.checked)}
//             className="mr-2"
//           />
//           Accept all terms & Conditions
//         </label>

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 rounded mb-2 hover:bg-green-700 transition-colors"
//         >
//           Create Account
//         </button>

//         {message && (
//           <p className="text-center text-sm text-red-600 mt-2">{message}</p>
//         )}

//         <p className="text-center mt-4 text-sm">
//           Already have an account?{" "}
//           <span
//             className="text-blue-600 cursor-pointer hover:underline"
//             onClick={() => navigate("/login-page")}
//           >
//             Login
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default SignupPage;

// import { useState, useContext } from "react";
// import { LoginContext } from "../Context/LoginContext";
// import { useNavigate } from "react-router-dom";
// import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

// const SignupPage = () => {
//   const { register } = useContext(LoginContext);
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
//       setMessage("Account created!");
//       navigate("/dashboard");
//     } else {
//       setMessage(res.message);
//     }
//   };

//   return (
//     <div className="flex items-start justify-center min-h-screen bg-gray-50 px-4  pb-20 md:items-center md:pt-0">
//       <form className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md" onSubmit={handleSignup}>
//         <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

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

//         <label className="flex items-center mb-4 text-sm">
//           <input
//             type="checkbox"
//             checked={acceptTerms}
//             onChange={(e) => setAcceptTerms(e.target.checked)}
//             className="mr-2"
//           />
//           Accept all terms & Conditions
//         </label>

//         <button className="w-full bg-green-600 text-white py-2 rounded mb-2 hover:bg-green-700 transition-colors">
//           Create Account
//         </button>

//         {message && <p className="text-center text-sm text-red-600 mt-2">{message}</p>}

//         <p className="text-center mt-4 text-sm">
//           Already have an account?{" "}
//           <span
//             className="text-blue-600 cursor-pointer hover:underline"
//             onClick={() => navigate("/login-page")}
//           >
//             Login
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default SignupPage;

import { useState, useContext } from "react";
import { LoginContext } from "../Context/LoginContext";
import { useToken } from "../Context/TokenContext"; // import token context
import { useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const SignupPage = () => {
  const { register } = useContext(LoginContext);
  const { generateToken } = useToken(); // get generateToken
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!acceptTerms) return setMessage("Accept terms & conditions");
    if (password !== confirm) return setMessage("Passwords do not match");

    const res = register({ email, password });
    if (res.success) {
      // ✅ generate token immediately after registration
      generateToken(email);

      setMessage("Account created!");
      navigate("/"); // redirect after signup
    } else {
      setMessage(res.message);
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-50 px-4 pb-20 md:items-center md:pt-0">
      <form
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
        onSubmit={handleSignup}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
          </span>
        </div>

        {/* Confirm Password */}
        <div className="relative mb-4">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
          </span>
        </div>

        {/* Terms & Conditions */}
        <label className="flex items-center mb-4 text-sm">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mr-2"
          />
          Accept all terms & Conditions
        </label>

        {/* Submit Button */}
        <button className="w-full bg-green-600 text-white py-2 rounded mb-2 hover:bg-green-700 transition-colors">
          Create Account
        </button>

        {/* Message */}
        {message && <p className="text-center text-sm text-red-600 mt-2">{message}</p>}

        {/* Login Link */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login-page")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;