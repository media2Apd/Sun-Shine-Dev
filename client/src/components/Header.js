
import React, { useState, useRef, useEffect, } from "react";

import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiRefreshCw,
  FiLogOut,
  FiUserCheck,
} from "react-icons/fi";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice"; // adjust path

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state?.user?.user); // Redux store data
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const dispatch = useDispatch();

  const handleLogout = () => {
    setOpen(false);

    localStorage.removeItem("token");

    dispatch(setUserDetails(null)); // 🔥 THIS IS KEY FIX

    navigate("/login-page");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 font-sans">
      <div className="container mx-auto px-8 py-4 flex items-center justify-between relative">
        {/* Logo */}
        <div>
          <img onClick={()=> navigate('/')} src={logo} alt="Sunshine Logo" className="h-12 object-contain" />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6 text-gray-700 relative">
          <FiSearch className="text-xl cursor-pointer hover:text-orange-500 transition" />

          {/* User Icon with Dropdown */}
          <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => {
              if (!user) navigate("/login-page");
              else setOpen(!open);
            }}
            className={`text-xl cursor-pointer hover:text-orange-500 transition`}
          >
            {user ? (
              <FiUserCheck className="text-xl" />
            ) : (
              <FiUser className="text-xl" />
            )}
          </div>

            {user && (
            <div
              className={`absolute -right-24 top-8 mt-4 w-64 bg-white border border-[#E6E6E6] rounded-md overflow-y-auto max-h-[80vh] z-50 transform ${
                open
                  ? "opacity-100 translate-y-0 transition-all duration-300 ease-out"
                  : "opacity-0 -translate-y-5 pointer-events-none transition-none"
              }`}
            >
              <Link to="/settings-page" onClick={() => setOpen(false)}>
                <DropdownItem delay="0ms" open={open} icon={<FiUser />} text="My Profile" />
              </Link>

              <Link to="/orderhistory-page" onClick={() => setOpen(false)}>
                <DropdownItem delay="50ms" open={open} icon={<FiRefreshCw />} text="Order History" />
              </Link>

              <Link to="/wishlist-page" onClick={() => setOpen(false)}>
                <div className="relative">
                  <DropdownItem delay="100ms" open={open} icon={<FiHeart />} text="WishList" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-5 right-4 bg-[#FF3B30] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </div>
              </Link>

              <Link to="/cart-page" onClick={() => setOpen(false)}>
                <div className="relative">
                  <DropdownItem delay="150ms" open={open} icon={<FiShoppingCart />} text="Shopping Cart" />
                  {cartCount > 0 && (
                    <span className="absolute top-5 right-4 bg-[#FF3B30] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>

              {/* ADMIN PANEL */}
              {user?.role?.toLowerCase() === "admin" && (
                <Link to="/admin-panel" onClick={() => setOpen(false)}>
                  <DropdownItem delay="200ms" open={open} icon={<FiUser />} text="Admin Panel" />
                </Link>
              )}

              {/* Logout */}
              <DropdownItem delay="250ms" open={open} icon={<FiLogOut />} text="Log-out" onClick={handleLogout} />
            </div>
          )}
          </div>

          <div className="relative">
            <FiHeart
              onClick={() => navigate("/wishlist-page")}
              className="text-xl cursor-pointer hover:text-orange-500 transition"
            />

            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#FF3B30] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </div>

          <div className="relative">
            <FiShoppingCart
              onClick={() => navigate("/cart-page")}
              className="text-xl cursor-pointer hover:text-orange-500 transition"
            />

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#FF3B30] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function DropdownItem({ icon, text, onClick, delay = "0ms", open }) {
  return (
    <div
      onClick={onClick}
      style={{ transitionDelay: delay }}
      className={`flex items-center gap-4 px-5 py-4 cursor-pointer 
      ${
        open
          ? "opacity-100 translate-y-0 transition-all duration-300 ease-out"
          : "opacity-0 translate-y-3 transition-none"
      }
      hover:bg-gray-200`}
    >
      <span className="text-[#CCCCCC] text-xl">{icon}</span>
      <span className="text-[#666666] text-lg">{text}</span>
    </div>
  );
}
