
// export default Sidebar;

import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from '../assets/logo.png';

import {
  FiGrid,
  FiBox,
  FiTag,
  FiShoppingBag,
  FiHeadphones,
  FiUsers,
  FiTruck,
  FiLayers,
  FiSettings,
  FiChevronsLeft,
  FiChevronsRight,
  FiX
} from "react-icons/fi";

const Sidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen
}) => {

  const [hovered, setHovered] = useState(false);
  const location = useLocation();

  const isExpanded = !collapsed || (collapsed && hovered);
  const desktopWidthClass = isExpanded ? "w-64" : "w-20";

  const navItems = [

    { label: "Dashboard", icon: <FiGrid />, to: "/admin-panel" },

    { label: "Product", icon: <FiBox />, to: "/admin-panel/product-list" },

    { label: "Products Category", icon: <FiShoppingBag />, to: "/admin-panel/products-category" },

    { label: "Orders", icon: <FiTag />, to: "/admin-panel/orders" },

    { label: "Enquiries", icon: <FiHeadphones />, to: "/admin-panel/enquiries" },

    { label: "Customers", icon: <FiUsers />, to: "/admin-panel/customers" },

    { label: "Inventory", icon: <FiTruck />, to: "/admin-panel/inventory" },

    { label: "Blog Management", icon: <FiLayers />, to: "/admin-panel/blog-list" },

    { label: "Settings", icon: <FiSettings />, to: "/admin-panel/settings" },

  ];

  const NavContent = () => (

    <nav className="flex-1 py-4 space-y-2 overflow-y-auto px-3">

      {navItems.map((item) => {

        const isActive =
          item.to === "/admin-panel"
            ? location.pathname === "/admin-panel"
            : location.pathname.startsWith(item.to);

        return (

          <NavLink
            key={item.label}
            to={item.to}
            onClick={() => setMobileOpen(false)}

            className={`group flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-full transition-all cursor-pointer
              
              ${isActive
                ? "bg-green-600 text-white"
                : "text-slate-700 hover:bg-green-600 hover:text-white"}
              
              ${!isExpanded && "justify-center px-0"}
            `}
          >

            <span
              className={`text-xl transition-colors
              ${isActive ? "text-white" : "text-slate-500 group-hover:text-white"}`}
            >
              {item.icon}
            </span>

            <span
              className={`transition-opacity duration-300
              ${isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}
            >
              {item.label}
            </span>

          </NavLink>

        );
      })}

    </nav>

  );

  return (
    <>

      {/* MOBILE SIDEBAR */}

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 lg:hidden flex flex-col
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >

        <div className="h-16 flex items-center justify-between px-6 border-b">

          <img src={logo} alt="Logo" className="h-8" />

          <button onClick={() => setMobileOpen(false)}>
            <FiX size={24} />
          </button>

        </div>

        <NavContent />

      </aside>


      {/* DESKTOP SIDEBAR */}

      <aside
        className={`hidden lg:flex flex-col bg-white border-r h-full transition-all duration-300
        ${desktopWidthClass}`}
      >

        <div
          className="flex-1 overflow-hidden flex flex-col"
          onMouseEnter={() => collapsed && setHovered(true)}
          onMouseLeave={() => collapsed && setHovered(false)}
        >

          <NavContent />

        </div>

        <div className="p-4 border-t flex justify-end">

          <button
            onClick={() => {
              setCollapsed(!collapsed);
              setHovered(false);
            }}
            className="p-2 rounded-lg bg-slate-50 hover:bg-green-100 transition-colors w-full flex justify-center"
          >

            {collapsed
              ? <FiChevronsRight size={20} />
              : <FiChevronsLeft size={20} />
            }

          </button>

        </div>

      </aside>

    </>
  );
};

export default Sidebar;