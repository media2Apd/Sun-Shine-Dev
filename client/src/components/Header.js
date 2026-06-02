// import React, { useState, useRef, useEffect } from "react";
// import {
//   FiSearch,
//   FiUser,
//   FiHeart,
//   FiShoppingCart,
//   FiRefreshCw,
//   FiLogOut,
//   FiUserCheck,
//   FiMenu,
//   FiX,
// } from "react-icons/fi";

// import logo from "../assets/logo.svg";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useCart } from "../Context/CartContext";
// import { useWishlist } from "../Context/WishlistContext";
// import { useDispatch } from "react-redux";
// import { setUserDetails } from "../store/userSlice";

// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [open, setOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);
//   const headerRef = useRef(null);
//   const mobileSearchInputRef = useRef(null);
//   const user = useSelector((state) => state?.user?.user);
//   const { refreshCart, cartCount } = useCart();
//   const { refreshWishlist, wishlistCount } = useWishlist();
//   const dispatch = useDispatch();
//   const [search, setSearch] = useState("");

//   const handleLogout = async () => {
//     setOpen(false);
//     setMobileMenuOpen(false);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     dispatch(setUserDetails(null));
//     await refreshWishlist();
//     await refreshCart();
//     window.dispatchEvent(new Event("wishlistUpdated"));
//     window.dispatchEvent(new Event("cartUpdated"));
//     navigate("/login");
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearch(value);
//     if (value.trim()) {
//       navigate(`/search?q=${value}`);
//     } else {
//       navigate("/search");
//     }
//   };

//   const toggleMobileSearch = () => {
//     setSearchOpen((prev) => {
//       const next = !prev;
//       if (next) {
//         setMobileMenuOpen(false); // close nav menu if open
//         setTimeout(() => mobileSearchInputRef.current?.focus(), 100);
//       }
//       return next;
//     });
//   };

//   useEffect(() => {
//     setMobileMenuOpen(false);
//     setOpen(false);
//     setSearchOpen(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     if (location.pathname === "/search") {
//       const params = new URLSearchParams(location.search);
//       const q = params.get("q") || "";
//       setSearch(q);
//     } else {
//       setSearch("");
//     }
//   }, [location.pathname, location.search]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const navLinks = [
//     { to: "/about", label: "About" },
//     { to: "/gallery", label: "Gallery" },
//     { to: "/faqs", label: "FAQ" },
//     { to: "/blogs", label: "Blogs" },
//   ];

//   const headerBottom = headerRef.current ? headerRef.current.offsetHeight + "px" : "60px";

//   return (
//     <>
//       <header ref={headerRef} className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 font-sans border-b border-gray-100">
//         <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">

//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <img
//               onClick={() => navigate("/")}
//               src={logo}
//               alt="Sunshine Logo"
//               className="h-8 md:h-10 lg:h-12 w-auto object-contain cursor-pointer"
//             />
//           </div>

//           {/* Desktop Nav — md and above */}
//           <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-700">
//             {navLinks.map(({ to, label }) => (
//               <Link
//                 key={to}
//                 to={to}
//                 className={`hover:text-[#00B207] transition-colors ${
//                   location.pathname === to ? "text-[#00B207]" : ""
//                 }`}
//               >
//                 {label}
//               </Link>
//             ))}
//           </nav>

//           {/* Right Side Icons */}
//           <div className="flex items-center gap-3 sm:gap-4 text-gray-700">

//             {/* Desktop inline search (md+) */}
//             <div className="hidden md:flex items-center gap-2">
//               <div
//                 className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out ${
//                   searchOpen ? "w-[220px] opacity-100" : "w-0 opacity-0"
//                 }`}
//               >
//                 <div className="relative w-full">
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     className="w-full border border-gray-300 rounded-lg py-1.5 px-4 pr-10 focus:outline-none focus:border-[#00B207] text-sm"
//                     value={search}
//                     onChange={handleSearch}
//                     autoFocus={searchOpen}
//                   />
//                   <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
//                 </div>
//               </div>
//               <button
//                 onClick={() => setSearchOpen(!searchOpen)}
//                 className="text-xl cursor-pointer hover:text-[#00B207] transition-colors p-1 rounded-md"
//                 aria-label="Toggle search"
//               >
//                 {searchOpen ? <FiX strokeWidth={1.5} /> : <FiSearch strokeWidth={1.5} />}
//               </button>
//             </div>

//             {/* Desktop User Dropdown (md+) */}
//             <div className="relative hidden md:block" ref={dropdownRef}>
//               <button
//                 onClick={() => {
//                   if (!user) navigate("/login");
//                   else setOpen(!open);
//                 }}
//                 className="text-xl cursor-pointer hover:text-[#00B207] transition-colors p-1 rounded-md"
//                 aria-label="User menu"
//               >
//                 {user ? <FiUserCheck strokeWidth={1.5} /> : <FiUser strokeWidth={1.5} />}
//               </button>

//               {user && (
//                 <div
//                   className={`absolute right-0 top-10 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 transform transition-all duration-200 ${
//                     open
//                       ? "opacity-100 translate-y-0 pointer-events-auto"
//                       : "opacity-0 -translate-y-2 pointer-events-none"
//                   }`}
//                 >
//                   <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
//                     <p className="text-xs text-gray-400">Signed in as</p>
//                     <p className="text-sm font-semibold text-gray-700 truncate">
//                       {user?.name || user?.email || "User"}
//                     </p>
//                   </div>
//                   <Link to="/settings" onClick={() => setOpen(false)}>
//                     <DropdownItem icon={<FiUser />} text="My Profile" open={open} delay="0ms" />
//                   </Link>
//                   <Link to="/order-history" onClick={() => setOpen(false)}>
//                     <DropdownItem icon={<FiRefreshCw />} text="Order History" open={open} delay="40ms" />
//                   </Link>
//                   <Link to="/wishlist" onClick={() => setOpen(false)}>
//                     <div className="relative">
//                       <DropdownItem icon={<FiHeart />} text="Wishlist" open={open} delay="80ms" />
//                       {wishlistCount > 0 && (
//                         <span className="absolute top-1/2 -translate-y-1/2 right-4 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
//                           {wishlistCount}
//                         </span>
//                       )}
//                     </div>
//                   </Link>
//                   <Link to="/cart" onClick={() => setOpen(false)}>
//                     <div className="relative">
//                       <DropdownItem icon={<FiShoppingCart />} text="Shopping Cart" open={open} delay="120ms" />
//                       {cartCount > 0 && (
//                         <span className="absolute top-1/2 -translate-y-1/2 right-4 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
//                           {cartCount}
//                         </span>
//                       )}
//                     </div>
//                   </Link>
//                   {user?.role?.toLowerCase() === "admin" && (
//                     <Link to="/admin-panel/admin-dashboard" onClick={() => setOpen(false)}>
//                       <DropdownItem icon={<FiUser />} text="Admin Panel" open={open} delay="160ms" />
//                     </Link>
//                   )}
//                   <div className="border-t border-gray-100">
//                     <DropdownItem icon={<FiLogOut />} text="Log out" open={open} delay="200ms" onClick={handleLogout} danger />
//                   </div>
//                 </div>
//               )}
//             </div>

           


//             {/* Mobile Search Icon — only on mobile */}
//             <button
//               className="md:hidden text-xl cursor-pointer hover:text-[#00B207] transition-colors p-1"
//               onClick={toggleMobileSearch}
//               aria-label="Toggle search"
//             >
//               {searchOpen ? <FiX strokeWidth={1.5} /> : <FiSearch strokeWidth={1.5} />}
//             </button>
//                    {/* Wishlist — all screens */}
//                         <Link to="/wishlist" className="relative" aria-label="Wishlist">
//               <FiHeart strokeWidth={1.5} className="text-xl cursor-pointer hover:text-[#00B207] transition-colors" />
//               {wishlistCount > 0 && (
//                 <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
//                   {wishlistCount}
//                 </span>
//               )}
//             </Link>

//             {/* Cart — always visible */}
//             <Link to="/cart" className="relative" aria-label="Cart">
//               <FiShoppingCart strokeWidth={1.5} className="text-xl cursor-pointer hover:text-[#00B207] transition-colors" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {/* Mobile Hamburger */}
//             <button
//               className="md:hidden text-xl cursor-pointer hover:text-[#00B207] transition-colors p-1"
//               onClick={() => {
//                 setMobileMenuOpen((prev) => !prev);
//                 setSearchOpen(false); // close search if open
//               }}
//               aria-label="Toggle menu"
//             >
//               {mobileMenuOpen ? <FiX strokeWidth={1.5} /> : <FiMenu strokeWidth={1.5} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile full-width search bar — inside header, slides down */}
//         <div
//           className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
//             searchOpen ? "max-h-[80px] opacity-100" : "max-h-0 opacity-0"
//           }`}
//         >
//           <div className="px-4 pb-3 pt-1">
//             <div className="relative w-full">
//               <input
//                 ref={mobileSearchInputRef}
//                 type="text"
//                 placeholder="What are you looking for..."
//                 className="w-full border border-gray-200 rounded-lg py-2.5 px-4 pr-12 focus:outline-none focus:border-[#00B207] text-sm bg-gray-50"
//                 value={search}
//                 onChange={handleSearch}
//               />
//               <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Overlay for mobile menu */}
//       {mobileMenuOpen && (
//         <div
//           className="fixed inset-0 z-[48] md:hidden"
//           onClick={() => setMobileMenuOpen(false)}
//         />
//       )}

//       {/* Mobile Nav Dropdown — slides down below header */}
//       <div
//         className={`fixed left-0 w-full bg-white z-[49] md:hidden shadow-xl border-t border-gray-100
//           transition-all duration-300 ease-in-out overflow-hidden
//           ${mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
//         `}
//         style={{ top: headerBottom }}
//       >
//         <div className="overflow-y-auto max-h-[80vh] flex flex-col">

//           {/* Nav Links */}
//           <nav className="flex flex-col px-5 pt-2">
//             {navLinks.map(({ to, label }) => (
//               <Link
//                 key={to}
//                 to={to}
//                 onClick={() => setMobileMenuOpen(false)}
//                 className={`text-[16px] font-medium py-3.5 border-b border-gray-100 transition-colors ${
//                   location.pathname === to
//                     ? "text-[#00B207]"
//                     : "text-gray-800 hover:text-[#00B207]"
//                 }`}
//               >
//                 {label}
//               </Link>
//             ))}

//             {user && (
//               <>
//                 <Link
//                   to="/settings"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="text-[16px] font-medium py-3.5 border-b border-gray-100 text-gray-800 hover:text-[#00B207] transition-colors"
//                 >
//                   My Profile
//                 </Link>
//                 <Link
//                   to="/order-history"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="text-[16px] font-medium py-3.5 border-b border-gray-100 text-gray-800 hover:text-[#00B207] transition-colors"
//                 >
//                   Order History
//                 </Link>
//                 <Link
//                   to="/wishlist"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="flex items-center justify-between text-[16px] font-medium py-3.5 border-b border-gray-100 text-gray-800 hover:text-[#00B207] transition-colors"
//                 >
//                   <span>Wishlist</span>
//                   {wishlistCount > 0 && (
//                     <span className="bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
//                       {wishlistCount}
//                     </span>
//                   )}
//                 </Link>
//                 <Link
//                   to="/cart"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="flex items-center justify-between text-[16px] font-medium py-3.5 border-b border-gray-100 text-gray-800 hover:text-[#00B207] transition-colors"
//                 >
//                   <span>Cart</span>
//                   {cartCount > 0 && (
//                     <span className="bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
//                       {cartCount}
//                     </span>
//                   )}
//                 </Link>
//                 {user?.role?.toLowerCase() === "admin" && (
//                   <Link
//                     to="/admin-panel/admin-dashboard"
//                     onClick={() => setMobileMenuOpen(false)}
//                     className="text-[16px] font-medium py-3.5 border-b border-gray-100 text-gray-800 hover:text-[#00B207] transition-colors"
//                   >
//                     Admin Panel
//                   </Link>
//                 )}
//               </>
//             )}
//           </nav>

//           {/* CTA Button */}
//           <div className="px-5 py-5">
//             {user ? (
//               <button
//                 onClick={handleLogout}
//                 className="w-full bg-[#00B207] hover:bg-[#009a06] text-white font-semibold py-3.5 rounded-full text-[15px] transition-colors"
//               >
//                 Log out
//               </button>
//             ) : (
//               <Link
//                 to="/login"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="block w-full bg-[#00B207] hover:bg-[#009a06] text-white font-semibold py-3.5 rounded-full text-[15px] text-center transition-colors"
//               >
//                 Get in Touch
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// function DropdownItem({ icon, text, onClick, delay = "0ms", open, danger }) {
//   return (
//     <div
//       onClick={onClick}
//       style={{ transitionDelay: open ? delay : "0ms" }}
//       className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition-all duration-200 ${
//         open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
//       } ${danger ? "hover:bg-red-50" : "hover:bg-gray-50"}`}
//     >
//       <span className={`text-lg flex-shrink-0 ${danger ? "text-red-400" : "text-gray-400"}`}>
//         {icon}
//       </span>
//       <span className={`text-sm font-medium ${danger ? "text-red-500" : "text-gray-700"}`}>
//         {text}
//       </span>
//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiRefreshCw,
  FiLogOut,
  FiUserCheck,
  FiMenu,
  FiX,
} from "react-icons/fi";

import logo from "../assets/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const headerRef = useRef(null);
  const mobileSearchInputRef = useRef(null);
  const user = useSelector((state) => state?.user?.user);
  const { refreshCart, cartCount } = useCart();
  const { refreshWishlist, wishlistCount } = useWishlist();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleLogout = async () => {
    setOpen(false);
    setMobileMenuOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setUserDetails(null));
    await refreshWishlist();
    await refreshCart();
    window.dispatchEvent(new Event("wishlistUpdated"));
    window.dispatchEvent(new Event("cartUpdated"));
    navigate("/login");
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim()) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  const toggleMobileSearch = () => {
    setSearchOpen((prev) => {
      const next = !prev;
      if (next) {
        setMobileMenuOpen(false); // close nav menu if open
        setTimeout(() => mobileSearchInputRef.current?.focus(), 100);
      }
      return next;
    });
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpen(false);

    if (location.pathname !== "/search") {
      setSearchOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/search") {
      const params = new URLSearchParams(location.search);
      const q = params.get("q") || "";
      setSearch(q);
    } else {
      setSearch("");
    }
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { to: "/about", label: "About" },
    { to: "/shop", label: "Shop" },
    { to: "/gallery", label: "Gallery" },
    { to: "/faqs", label: "FAQ" },
    { to: "/blogs", label: "Blogs" },
  ];

  const headerBottom = headerRef.current ? headerRef.current.offsetHeight + "px" : "60px";

  return (
    <>
      <header ref={headerRef} className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 font-sans border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              onClick={() => navigate("/")}
              src={logo}
              alt="Sunshine Logo"
              className="h-8 md:h-10 lg:h-12 w-auto object-contain cursor-pointer"
            />
          </div>

          {/* Desktop Nav — md and above */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-500">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`hover:text-[#00B207] transition-colors ${
                  location.pathname === to || location.pathname.startsWith(to + '/') ? "text-[#00B207]" : ""
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-3 sm:gap-4 text-gray-500">

            {/* Search icon — all screens, triggers below-header bar */}
            <button
              onClick={toggleMobileSearch}
              className="text-xl cursor-pointer hover:text-[#00B207] transition-colors p-1 rounded-md"
              aria-label="Toggle search"
            >
              {searchOpen ? <FiX strokeWidth={1.5} /> : <FiSearch strokeWidth={1.5} />}
            </button>

            {/* Desktop User Dropdown (md+) */}
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button
                onClick={() => {
                  if (!user) navigate("/login");
                  else setOpen(!open);
                }}
                className="text-xl cursor-pointer hover:text-[#00B207] transition-colors p-1 rounded-md"
                aria-label="User menu"
              >
                {user ? <FiUserCheck strokeWidth={1.5} /> : <FiUser strokeWidth={1.5} />}
              </button>

              {user && (
                <div
                  className={`absolute right-0 top-10 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 transform transition-all duration-200 ${
                    open
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-xs text-gray-400">Signed in as</p>
                    <p className="text-sm font-semibold text-gray-700 truncate">
                      {user?.name || user?.email || "User"}
                    </p>
                  </div>
                  <Link to="/settings" onClick={() => setOpen(false)}>
                    <DropdownItem icon={<FiUser />} text="My Profile" open={open} delay="0ms" />
                  </Link>
                  <Link to="/order-history" onClick={() => setOpen(false)}>
                    <DropdownItem icon={<FiRefreshCw />} text="Order History" open={open} delay="40ms" />
                  </Link>
                  <Link to="/wishlist" onClick={() => setOpen(false)}>
                    <div className="relative">
                      <DropdownItem icon={<FiHeart />} text="Wishlist" open={open} delay="80ms" />
                      {wishlistCount > 0 && (
                        <span className="absolute top-1/2 -translate-y-1/2 right-4 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                          {wishlistCount}
                        </span>
                      )}
                    </div>
                  </Link>
                  <Link to="/cart" onClick={() => setOpen(false)}>
                    <div className="relative">
                      <DropdownItem icon={<FiShoppingCart />} text="Shopping Cart" open={open} delay="120ms" />
                      {cartCount > 0 && (
                        <span className="absolute top-1/2 -translate-y-1/2 right-4 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                          {cartCount}
                        </span>
                      )}
                    </div>
                  </Link>
                  {user?.role?.toLowerCase() === "admin" && (
                    <Link to="/admin-panel/admin-dashboard" onClick={() => setOpen(false)}>
                      <DropdownItem icon={<FiUser />} text="Admin Panel" open={open} delay="160ms" />
                    </Link>
                  )}
                  <div className="border-t border-gray-100">
                    <DropdownItem icon={<FiLogOut />} text="Log out" open={open} delay="200ms" onClick={handleLogout} danger />
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist — all screens */}
            <Link to="/wishlist" className="relative" aria-label="Wishlist">
              <FiHeart strokeWidth={1.5} className="text-xl cursor-pointer hover:text-[#00B207] transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart — always visible */}
            <Link to="/cart" className="relative" aria-label="Cart">
              <FiShoppingCart strokeWidth={1.5} className="text-xl cursor-pointer hover:text-[#00B207] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-xl cursor-pointer hover:text-[#00B207] transition-colors p-1"
              onClick={() => {
                setMobileMenuOpen((prev) => !prev);
                setSearchOpen(false); // close search if open
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX strokeWidth={1.5} /> : <FiMenu strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Full-width search bar — mobile & tablet, slides down */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            searchOpen ? "max-h-[80px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-3 pt-1">
            <div className="relative w-full">
              <input
                ref={mobileSearchInputRef}
                type="text"
                placeholder="What are you looking for..."
                className="w-full border border-gray-200 rounded-lg py-2.5 px-4 pr-12 focus:outline-none focus:border-[#00B207] text-sm bg-gray-50"
                value={search}
                onChange={handleSearch}
              />
              <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            </div>
          </div>
        </div>
      </header>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[48] md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Nav Dropdown — slides down below header */}
      <div
        className={`fixed left-0 w-full bg-white z-[49] md:hidden shadow-xl border-t border-gray-100
          transition-all duration-300 ease-in-out overflow-hidden
          ${mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
        `}
        style={{ top: headerBottom }}
      >
        <div className="overflow-y-auto max-h-[80vh] flex flex-col">

          {/* Nav Links */}
          <nav className="flex flex-col px-5 pt-2">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-[16px] font-medium py-3.5 border-b border-gray-100 transition-colors ${
                  location.pathname === to
                    ? "text-[#00B207]"
                    : "text-gray-800 hover:text-[#00B207]"
                }`}
              >
                {label}
              </Link>
            ))}

            {user && (
              <>
                <Link
                  to="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[16px] font-medium py-3.5 border-b border-gray-100 text-gray-800 hover:text-[#00B207] transition-colors"
                >
                  My Profile
                </Link>
                <Link
                  to="/order-history"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[16px] font-medium py-3.5 border-b border-gray-100 text-gray-800 hover:text-[#00B207] transition-colors"
                >
                  Order History
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-[16px] font-medium py-3.5 border-b border-gray-100 text-gray-800 hover:text-[#00B207] transition-colors"
                >
                  <span>Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-[16px] font-medium py-3.5 border-b border-gray-100 text-gray-800 hover:text-[#00B207] transition-colors"
                >
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                      {cartCount}
                    </span>
                  )}
                </Link>
                {user?.role?.toLowerCase() === "admin" && (
                  <Link
                    to="/admin-panel/admin-dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[16px] font-medium py-3.5 border-b border-gray-100 text-gray-800 hover:text-[#00B207] transition-colors"
                  >
                    Admin Panel
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* CTA Button */}
          <div className="px-5 py-5">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full bg-[#00B207] hover:bg-[#009a06] text-white font-semibold py-3.5 rounded-full text-[15px] transition-colors"
              >
                Log out
              </button>
            ) : (
              <Link
                to="/contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full bg-[#00B207] hover:bg-[#009a06] text-white font-semibold py-3.5 rounded-full text-[15px] text-center transition-colors"
              >
                Get in Touch
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function DropdownItem({ icon, text, onClick, delay = "0ms", open, danger }) {
  return (
    <div
      onClick={onClick}
      style={{ transitionDelay: open ? delay : "0ms" }}
      className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition-all duration-200 ${
        open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } ${danger ? "hover:bg-red-50" : "hover:bg-gray-50"}`}
    >
      <span className={`text-lg flex-shrink-0 ${danger ? "text-red-400" : "text-gray-400"}`}>
        {icon}
      </span>
      <span className={`text-sm font-medium ${danger ? "text-red-500" : "text-gray-700"}`}>
        {text}
      </span>
    </div>
  );
}