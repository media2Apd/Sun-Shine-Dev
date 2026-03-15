import React, { useState } from "react";
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

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate =useNavigate();
  return (
    <header className="bg-white-100">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between relative">
        
        {/* Logo */}
        <div>
          <img src={logo} alt="Sunshine Logo" className="h-12 object-contain" />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6 text-gray-700 relative">
          <FiSearch className="text-xl cursor-pointer hover:text-orange-500 transition" />

          {/* User Icon with Dropdown */}
          <div className="relative">
            <FiUser
              className="text-xl cursor-pointer hover:text-orange-500 transition"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="absolute right-0 mt-4 w-64 bg-gray-100 shadow-lg rounded-md overflow-hidden z-50">
                
                <Link to="/settings-page">
                <DropdownItem icon={<FiUser />} text="My Profile" />
                </Link>
                <DropdownItem icon={<FiRefreshCw />} text="Order History" />
                {/* <DropdownItem icon={<FiHeart />} text="Wishlist" /> */}
                <Link to="/wishlist-page">
                <DropdownItem icon={<FiHeart />} text="WishList" />
                </Link>
                <Link to="/cart-page">
                <DropdownItem icon={<FiShoppingCart />} text="Shopping Cart" />
                </Link>
                {/* <DropdownItem icon={<FiSettings />} text="Settings" /> */}
                <DropdownItem icon={<FiLogOut />} text="Log-out" />

              </div>
            )}
          </div>

          <FiHeart className="text-xl cursor-pointer hover:text-orange-500 transition" />
      <FiShoppingCart onClick={() => navigate("/cart-page")}
      className="text-xl cursor-pointer hover:text-orange-500 transition"
       />       
   </div>

      </div>
    </header>
  );
};

function DropdownItem({ icon, text }) {
  return (
    <div className="flex items-center gap-4 px-5 py-4 hover:bg-gray-200 cursor-pointer transition">
      <span className="text-gray-500 text-xl">{icon}</span>
      <span className="text-gray-700 text-lg">{text}</span>
    </div>
  );
}

export default Header;