
import React, { useState, useRef, useEffect, useContext } from "react";
// import ConfirmModal from "./ConfirmModal";

import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiRefreshCw,
  FiLogOut,
} from "react-icons/fi";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";
import { useToken } from "../Context/TokenContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  // const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { currentUser, logout } = useContext(LoginContext);
  const { clearToken } = useToken();

  const handleLogout = () => {
    if (currentUser) {
      clearToken(currentUser.email);
      logout();
    }
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
    <header className="bg-white-100">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between relative">
        {/* Logo */}
        <div>
          <img onClick={()=> navigate('/')} src={logo} alt="Sunshine Logo" className="h-12 object-contain" />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6 text-gray-700 relative">
          <FiSearch className="text-xl cursor-pointer hover:text-orange-500 transition" />

          {/* User Icon with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <FiUser
              className="text-xl cursor-pointer hover:text-orange-500 transition"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="absolute right-0 mt-4 w-64 bg-gray-100 shadow-lg rounded-md overflow-hidden z-50">
                <Link to="/settings-page" onClick={() => setOpen(false)}>
                  <DropdownItem icon={<FiUser />} text="My Profile" />
                </Link>

                <Link to="/orderhistory-page" onClick={() => setOpen(false)}>
                  <DropdownItem icon={<FiRefreshCw />} text="Order History" />
                </Link>

                <Link to="/wishlist-page" onClick={() => setOpen(false)}>
                  <DropdownItem icon={<FiHeart />} text="WishList" />
                </Link>

                <Link to="/cart-page" onClick={() => setOpen(false)}>
                  <DropdownItem icon={<FiShoppingCart />} text="Shopping Cart" />
                </Link>

                {/* Logout */}
                <DropdownItem icon={<FiLogOut />} text="Log-out" onClick={handleLogout} />
              </div>
            )}
          </div>

          <FiHeart
            onClick={() => navigate("/wishlist-page")}
            className="text-xl cursor-pointer hover:text-orange-500 transition"
          />

          <FiShoppingCart
            onClick={() => navigate("/cart-page")}
            className="text-xl cursor-pointer hover:text-orange-500 transition"
          />
        </div>
      </div>
    </header>
  );
}

function DropdownItem({ icon, text, onClick }) {
  return (
    <div
      className="flex items-center gap-4 px-5 py-4 hover:bg-gray-200 cursor-pointer transition"
      onClick={onClick}
    >
      <span className="text-gray-500 text-xl">{icon}</span>
      <span className="text-gray-700 text-lg">{text}</span>
    </div>
  );
}
