// import { useState, useContext } from "react";

// import { LoginContext } from "../Context/LoginContext"; // uppercase C
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const { login } = useContext(LoginContext);
//   const navigate = useNavigate();
  
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const res = login({ email, password });
//     if (res.success) {
//       setMessage("Logged in successfully!");
//       navigate("/dashboard"); // example redirect
//     } else {
//       setMessage(res.message);
//     }
//   };

//   return (
// <div className="flex items-start justify-center min-h-screen bg-gray-50 px-4 pt-8">      <form
//     onSubmit={handleLogin}
//     className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
//   >
//     <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

//     <input
//       type="email"
//       placeholder="Email"
//       className="input mb-4 w-full border border-gray-300 rounded px-3 py-2"
//       value={email}
//       onChange={(e) => setEmail(e.target.value)}
//       required
//     />

//     <input
//       type="password"
//       placeholder="Password"
//       className="input mb-4 w-full border border-gray-300 rounded px-3 py-2"
//       value={password}
//       onChange={(e) => setPassword(e.target.value)}
//       required
//     />

//     <button
//       type="submit"
//       className="w-full bg-green-600 text-white py-2 rounded mb-2 hover:bg-green-700"
//     >
//       Login
//     </button>

//     {message && (
//       <p className="text-center text-sm text-red-600 mt-2">{message}</p>
//     )}

//     <p className="text-center mt-4 text-sm">
//       Don't have an account?{" "}
//       <span
//         className="text-blue-600 cursor-pointer hover:underline"
//         onClick={() => navigate("/signup-page")}
//       >
//         Register
//       </span>
//     </p>
//   </form>
// </div>
//   );
// };

// export default LoginPage;

import { useState, useContext } from "react";
import { LoginContext } from "../Context/LoginContext";
import { useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useToken } from "../Context/TokenContext"; // import token context 

const LoginPage = () => {
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();
 const { generateToken } = useToken(); // get generateToken
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");

 

  const handleLogin = (e) => {
    e.preventDefault();
    const res = login({ email, password });
    if (res.success) {
      generateToken(email);
      setMessage("Logged in successfully!");
      navigate("/");
    } else {
      setMessage(res.message);
    }
  };

  

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-50 px-4 pb-20 md:items-center md:pt-0">
      <form className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

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

        <div className="flex items-center justify-between mb-4 text-sm">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2"
            />
            Remember me
          </label>
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/change-password")}
          >
            Forgot password?
          </span>
        </div>

        <button className="w-full bg-green-600 text-white py-2 rounded mb-2 hover:bg-green-700 transition-colors">
          Login
        </button>

        {message && <p className="text-center text-sm text-red-600 mt-2">{message}</p>}

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/signup-page")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;