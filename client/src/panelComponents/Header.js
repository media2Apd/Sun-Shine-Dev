// import React from 'react';
// import { Search, MapPin, Mic, Camera, User, ShoppingCart, Menu } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useState, useEffect, useRef } from 'react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import logo from '../assets/images/Logo.png';
// import { useCart } from "../context/CartContext";
// import { useDispatch, useSelector } from 'react-redux';
// import ROLE from '../common/role';
// import AddressSelectModal from "./AddressSelectModal";
// import { setUserDetails } from '../store/userSlice';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import SummaryApi from '../common/SummaryApi';


// const SmartSearchBar = ({ className = "" }) => {
//   const navigate = useNavigate();
//   const [query, setQuery] = useState("");
//   const [placeholderIndex, setPlaceholderIndex] = useState(0);
//   const fileInputRef = useRef(null);

//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);


//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition
//   } = useSpeechRecognition();

//   const normalizeVoiceText = (text) => {
//     return text
//       .toLowerCase()
//       .replace(/show me|find|search for|i want|please|products?/g, "")
//       .replace(/\s+/g, " ")
//       .trim();
//   };

//   /* Voice → fill text only */
//   useEffect(() => {
//     if (transcript) {
//       const cleaned = normalizeVoiceText(transcript);
//       setQuery(cleaned);
//     }
//   }, [transcript]);

//   useEffect(() => {
//     if (!listening && query.length > 2) {
//       navigate(`/search?q=${encodeURIComponent(query)}`);
//     }
//   }, [listening]); // eslint-disable-line

//   // useEffect(() => {
//   //   if (transcript) setQuery(transcript);
//   // }, [transcript]);

//   /* Placeholder animation */
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   /* TEXT SEARCH (ENTER) */
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && query.trim()) {
//       navigate(`/search?q=${encodeURIComponent(query.trim())}`);
//     }
//   };

//   /* VOICE BUTTON */
//   const handleVoiceSearch = () => {
//     if (!browserSupportsSpeechRecognition) {
//       alert("Voice search not supported in this browser");
//       return;
//     }

//     if (listening) {
//       SpeechRecognition.stopListening();
//     } else {
//       resetTranscript();
//       SpeechRecognition.startListening({ continuous: false });
//     }
//   };

//   /* IMAGE SEARCH */
//   const handleCameraClick = () => fileInputRef.current?.click();

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     try {
//       const formData = new FormData();
//       formData.append("image", file);

//       const res = await axios({
//         url: SummaryApi.searchImage.url,
//         method: SummaryApi.searchImage.method,
//         data: formData
//       });

//       navigate("/search", {
//         state: {
//           imageResults: res.data?.products || []
//         }
//       });
//     } catch (err) {
//       console.error("Image search failed", err);
//     } finally {
//       e.target.value = "";
//     }
//   };

//   useEffect(() => {
//     if (query.length < 2) {
//       setSuggestions([]);
//       return;
//     }

//     const timeout = setTimeout(async () => {
//       const res = await axios.get(
//         SummaryApi.searchSuggestions.url,
//         { params: { q: query } }
//       );
//       setSuggestions(res.data || []);
//       setShowSuggestions(true);
//     }, 300);

//     return () => clearTimeout(timeout);
//   }, [query]);


//   return (
//     <div
//       className={`relative flex items-center w-full bg-[#eff4ff]
//       rounded-full border border-transparent
//       focus-within:border-blue-300 transition-all ${className}`}
//     >
//       <Search size={18} className="text-gray-400 ml-4 mr-3 flex-shrink-0" />

//       <div className="relative flex-grow h-8 overflow-hidden">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onKeyDown={handleKeyDown}
//           className="absolute inset-0 w-full h-full bg-transparent outline-none
//           text-gray-700 text-sm z-10 px-0"
//         />

//         {query === "" && (
//           <div className="absolute inset-0 flex flex-col justify-center pointer-events-none z-0">
//             <div
//               className="transition-transform duration-500 ease-in-out"
//               style={{
//                 transform: `translateY(-${placeholderIndex * 100}%)`
//               }}
//             >
//               {PLACEHOLDERS.map((text, i) => (
//                 <div
//                   key={i}
//                   className="h-full flex items-center text-sm text-gray-400"
//                 >
//                   {text}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {showSuggestions && suggestions.length > 0 && (
//         <div className="absolute top-full left-0 right-0 bg-white border rounded-xl shadow-lg mt-2 z-50">
//           {suggestions.map((item) => (
//             <div
//               key={item._id}
//               onClick={() => {
//                 navigate(`/search?q=${item.productName}`);
//                 setShowSuggestions(false);
//               }}
//               className="px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer"
//             >
//               <div className="flex items-center gap-2">
//                 <Search size={18} className="text-gray-400" /> {item.productName}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}


//       <div className="flex items-center gap-3 text-gray-500 border-l border-gray-300 pl-3 ml-2 mr-4">
//         <button
//           onClick={handleVoiceSearch}
//           className={`transition ${listening ? "text-red-500 animate-pulse" : "hover:text-blue-600"
//             }`}
//         >
//           <Mic size={18} />
//         </button>

//         <button onClick={handleCameraClick} className="hover:text-blue-600">
//           <Camera size={18} />
//         </button>

//         <input
//           ref={fileInputRef}
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={handleFileChange}
//         />
//       </div>
//     </div>
//   );
// };


// // --- Header Component ---
// const Header = ({ toggleMobileSidebar }) => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state?.user?.user); // Redux store data
//   const isAdminPanel = window.location.pathname.startsWith('/admin-panel');
//   const navigate = useNavigate();
//   const { cartCount, refreshCart } = useCart();
//   const [openAddressModal, setOpenAddressModal] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [openAccountMenu, setOpenAccountMenu] = useState(false);
//   const accountRef = useRef(null);

//   useEffect(() => {
//     const saved = localStorage.getItem("selected_address");
//     if (saved) {
//       setSelectedAddress(JSON.parse(saved));
//     }
//   }, []);


//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (accountRef.current && !accountRef.current.contains(e.target)) {
//         setOpenAccountMenu(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setOpenAccountMenu(false);
//     navigate("/login");
//     refreshCart();
//     toast.success("Logout successful!");
//     dispatch(setUserDetails(null));
//   }

//   return (
//     <header className="w-full bg-white shadow-sm sticky top-0 z-50 font-sans">
//       <div className="mx-auto px-4 py-2 flex items-center justify-between gap-4">

//         {/* 1. Logo Section */}
//         <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
//           <Link to="/">
//             <img src={logo} alt="Logo" className="h-8 md:h-12 object-contain" />
//           </Link>
//         </div>

//         {/* 2. Delivery (Desktop) */}
//         {/* <div className="hidden lg:flex items-center gap-2 min-w-[180px] cursor-pointer hover:bg-gray-50 p-2 rounded-full transition"> */}
//         <div
//           className="hidden md:flex items-center gap-2 min-w-[180px] cursor-pointer
//                       hover:bg-gray-50 p-2 rounded-full transition"
//           onClick={() => setOpenAddressModal(true)}>

//           <div className="bg-gray-100 p-2 rounded-full text-gray-600">
//             <MapPin size={20} />
//           </div>
//           <div className="flex flex-col text-xs leading-tight">
//             <span className="text-gray-500 font-medium">Delivery In</span>
//             <span className="font-bold text-gray-800 truncate max-w-[150px]">
//               {selectedAddress
//                 ? `${selectedAddress.area}, ${selectedAddress.city}`
//                 : "Select Address"}
//             </span>

//           </div>
//         </div>

//         {/* 3. Search Bar (Desktop) */}
//         <div className="hidden md:flex flex-grow max-w-2xl">
//           <SmartSearchBar className="py-1" />
//         </div>

//         {/* 4. Actions & Toggle */}
//         <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
//           <div ref={accountRef} className="relative">
//             {!user ? (
//               /* NOT LOGGED IN */
//               <button
//                 onClick={() => navigate("/login")}
//                 className="flex items-center gap-2 hover:text-blue-600 transition text-gray-700"
//               >
//                 <User size={24} />
//                 <span className="hidden sm:block font-medium text-sm">Login</span>
//               </button>
//             ) : (
//               /* LOGGED IN */
//               <>
//                 <button
//                   onClick={() => setOpenAccountMenu(!openAccountMenu)}
//                   className="p-2 rounded-full hover:bg-gray-100 transition text-gray-700"
//                 >
//                   <User size={24} />
//                 </button>

//                 {openAccountMenu && (
//                   <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border z-50">
//                     <button
//                       onClick={() => {
//                         navigate(
//                           window.innerWidth < 1024 ? "/my-account/menu" : "/my-account"
//                         );
//                         setOpenAccountMenu(false);
//                       }}
//                       className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 rounded-t-xl"
//                     >
//                       My Account
//                     </button>

//                     {/* ADMIN PANEL – ONLY FOR ADMIN */}
//                     {user?.role?.toLowerCase() === ROLE.ADMIN && (
//                       <button
//                         onClick={() => {
//                           navigate("/admin-panel");
//                           setOpenAccountMenu(false);
//                         }}
//                         className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100"
//                       >
//                         Admin Panel
//                       </button>
//                     )}

//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-100 rounded-b-xl"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>

//           <div className="flex items-center gap-2 hover:text-blue-600 transition text-gray-700 relative cursor-pointer"
//             onClick={() => navigate("/cart-page")}
//           >
//             <ShoppingCart size={24} />
//             {cartCount > 0 && (
//               <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
//             <span className="hidden sm:block font-medium text-sm">Cart</span>
//           </div>

//           {/* HAMBURGER MENU (Visible only on Mobile/Tablet < lg) */}
//           {isAdminPanel && <button
//             onClick={toggleMobileSidebar}
//             className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md focus:outline-none"
//           >
//             <Menu size={28} />
//           </button>}
//         </div>
//       </div>
//       <AddressSelectModal
//         open={openAddressModal}
//         onClose={() => {
//           setOpenAddressModal(false);
//           const saved = localStorage.getItem("selected_address");
//           if (saved) setSelectedAddress(JSON.parse(saved));
//         }}
//         onAddNew={() => {
//           setOpenAddressModal(false);
//           navigate("/my-account/address/new");
//         }}
//       />

//       {/* Mobile Search Row */}
//       <div className="md:hidden px-4 pb-3">
//         <SmartSearchBar className="py-1" />
//       </div>
//       {/* MOBILE ADDRESS BAR */}
//       <div
//         className="md:hidden px-4 py-2 flex items-center gap-2
//                 bg-white border-t border-b
//                 cursor-pointer"
//         onClick={() => setOpenAddressModal(true)}
//       >
//         <MapPin size={16} className="text-[#007BFF]" />

//         <div className="flex flex-col text-xs leading-tight">
//           <span className="text-gray-500 font-medium">
//             Delivery In
//           </span>
//           <span className="font-semibold text-gray-800 truncate max-w-[250px]">
//             {selectedAddress
//               ? `${selectedAddress.area}, ${selectedAddress.city}`
//               : "Select delivery address"}
//           </span>
//         </div>
//       </div>

//     </header>
//   );
// };

// export default Header;


import React from 'react'

const Header = () => {
  return (
    <div>Header</div>
  )
}

export default Header