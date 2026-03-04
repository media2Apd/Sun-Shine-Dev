// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FiGrid, FiShoppingBag, FiBox, FiUsers, FiLayers, FiSettings, FiChevronsLeft, FiChevronsRight, FiX
// } from "react-icons/fi";
// import { IoImageOutline } from "react-icons/io5";
// import { RiCoupon3Line } from "react-icons/ri";
// import logo from '../assets/images/Logo.png'; 

// const Sidebar = ({ 
//   collapsed, 
//   setCollapsed, 
//   mobileOpen, 
//   setMobileOpen 
// }) => {
//   // State for hover-expansion when collapsed (Desktop only)
//   const [hovered, setHovered] = useState(false);

//   // Determine effective width based on state (Desktop)
//   const isExpanded = !collapsed || (collapsed && hovered);
//   const desktopWidthClass = isExpanded ? "w-64" : "w-20";

//   const navItems = [
//     { label: "Dashboard", icon: <FiGrid className="text-xl" />, to: `/admin-panel` },
//     { label: "Orders", icon: <FiShoppingBag className="text-xl" />, to: `/admin-panel/all-orders` },
//     { label: "Products", icon: <FiBox className="text-xl" />, to: `/admin-panel/all-products` },
//     { label: "Coupons", icon: <RiCoupon3Line className="text-xl" />, to: `/admin-panel/all-coupons` },
//     { label: "Customers", icon: <FiUsers className="text-xl" />, to: `/admin-panel/all-users` },
//     { label: "Categories", icon: <FiLayers className="text-xl" />, to: `/admin-panel/all-categories` },
//     { label: "Banners", icon: <IoImageOutline className="text-xl" />, to: `/admin-panel/all-banners` },
//     { label: "Settings", icon: <FiSettings className="text-xl" />, to: `/admin-panel/settings` },
//   ];

//   // Common Nav Content
//   const NavContent = () => (
//     <nav className="flex-1 py-4 space-y-2 overflow-y-auto">
//       {navItems.map((item) => (
//         <NavLink
//           key={item.label}
//           to={item.to}
//           end
//           onClick={() => setMobileOpen(false)} // Close sidebar on click (Mobile)
//           className={({ isActive }) =>
//             `group relative flex items-center gap-4 px-4 py-3 text-sm font-medium transition-all cursor-pointer whitespace-nowrap
//             ${isActive ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:bg-slate-50"}
//             ${!isExpanded && "justify-center px-0"}` // Center icons when collapsed
//           }
//         >
//           {({ isActive }) => (
//             <>
//               {isActive && (
//                 <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-blue-500" />
//               )}
//               <span className={`shrink-0 transition-colors ${isActive ? "text-blue-600" : "text-slate-500 group-hover:text-blue-500"}`}>
//                 {item.icon}
//               </span>
              
//               {/* Show label if Expanded or (Mobile) */}
//               <span className={`transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
//                 {item.label}
//               </span>
//             </>
//           )}
//         </NavLink>
//       ))}
//     </nav>
//   );

//   return (
//     <>
//       {/* ================= MOBILE SIDEBAR (Drawer) ================= */}
//       {/* Overlay */}
//       {mobileOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       {/* Drawer */}
//       <aside
//         className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col
//           ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
//            <img src={logo} alt="Logo" className="h-8 object-contain" />
//            <button onClick={() => setMobileOpen(false)} className="text-slate-500 hover:text-red-500">
//              <FiX size={24} />
//            </button>
//         </div>
//         <NavContent />
//       </aside>

//       {/* ================= DESKTOP SIDEBAR ================= */}
//       <aside
//         className={`hidden lg:flex flex-col bg-white border-r border-slate-200 h-full transition-all duration-300 ease-in-out relative
//           ${desktopWidthClass}`}
//       >
//         {/* 
//             WRAPPER FOR NAV CONTENT 
//             Only hovering over this section triggers the expansion.
//         */}
//         <div 
//           className="flex-1 w-full overflow-hidden flex flex-col"
//           onMouseEnter={() => collapsed && setHovered(true)}
//           onMouseLeave={() => collapsed && setHovered(false)}
//         >
//            <NavContent />
//         </div>

//         {/* 
//             BOTTOM TOGGLE AREA 
//             No hover events here, so sidebar stays collapsed when cursor is here.
//         */}
//         <div className="p-4 border-t border-slate-100 flex justify-end shrink-0">
//           <button
//             onClick={() => {
//               setCollapsed(!collapsed);
//               setHovered(false); // Reset hover state immediately
//             }}
//             className="p-2 rounded-lg bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors w-full flex justify-center"
//           >
//             {collapsed ? <FiChevronsRight size={20} /> : <FiChevronsLeft size={20} />}
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom"; // Import useLocation
import {
  FiGrid, FiShoppingBag, FiBox, FiUsers, FiLayers, FiChevronsLeft, FiChevronsRight, FiX
} from "react-icons/fi";
import { IoImageOutline } from "react-icons/io5";
import { RiCoupon3Line } from "react-icons/ri";
import logo from '../assets/images/Logo.png'; 

const Sidebar = ({ 
  collapsed, 
  setCollapsed, 
  mobileOpen, 
  setMobileOpen 
}) => {
  const [hovered, setHovered] = useState(false);
  const location = useLocation(); // Get current URL

  const isExpanded = !collapsed || (collapsed && hovered);
  const desktopWidthClass = isExpanded ? "w-64" : "w-20";

  const navItems = [
    { label: "Dashboard", icon: <FiGrid className="text-xl" />, to: `/admin-panel` },
    { label: "Orders", icon: <FiShoppingBag className="text-xl" />, to: `/admin-panel/all-orders` },
    { label: "Return Orders", icon: <FiShoppingBag className="text-xl" />, to: `/admin-panel/return-orders` },
    { label: "Products", icon: <FiBox className="text-xl" />, to: `/admin-panel/all-products` },
    { label: "Coupons", icon: <RiCoupon3Line className="text-xl" />, to: `/admin-panel/all-coupons` },
    { label: "Customers", icon: <FiUsers className="text-xl" />, to: `/admin-panel/all-users` },
    { label: "Categories", icon: <FiLayers className="text-xl" />, to: `/admin-panel/all-categories` },
    { label: "Banners", icon: <IoImageOutline className="text-xl" />, to: `/admin-panel/all-banners` },
    // { label: "Settings", icon: <FiSettings className="text-xl" />, to: `/admin-panel/settings` },
  ];

  // Common Nav Content
  const NavContent = () => (
    <nav className="flex-1 py-4 space-y-2 overflow-y-auto">
      {navItems.map((item) => {
        // CUSTOM ACTIVE LOGIC
        // 1. If it's the dashboard (/admin-panel), match exactly.
        // 2. Otherwise, check if the current URL starts with the item's path.
        const isActive = item.to === "/admin-panel" 
          ? location.pathname === "/admin-panel" 
          : location.pathname.startsWith(item.to);

        return (
          <NavLink
            key={item.label}
            to={item.to}
            // Removed 'end' prop to allow sub-path matching
            onClick={() => setMobileOpen(false)}
            className={`group relative flex items-center gap-4 px-4 py-3 text-sm font-medium transition-all cursor-pointer whitespace-nowrap
              ${isActive ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:bg-slate-50"}
              ${!isExpanded && "justify-center px-0"}`}
          >
            <>
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-blue-500" />
              )}
              <span className={`shrink-0 transition-colors ${isActive ? "text-blue-600" : "text-slate-500 group-hover:text-blue-500"}`}>
                {item.icon}
              </span>
              
              <span className={`transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
                {item.label}
              </span>
            </>
          </NavLink>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* ================= MOBILE SIDEBAR ================= */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
           <img src={logo} alt="Logo" className="h-8 object-contain" />
           <button onClick={() => setMobileOpen(false)} className="text-slate-500 hover:text-red-500">
             <FiX size={24} />
           </button>
        </div>
        <NavContent />
      </aside>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className={`hidden lg:flex flex-col bg-white border-r border-slate-200 h-full transition-all duration-300 ease-in-out relative
          ${desktopWidthClass}`}
      >
        <div 
          className="flex-1 w-full overflow-hidden flex flex-col"
          onMouseEnter={() => collapsed && setHovered(true)}
          onMouseLeave={() => collapsed && setHovered(false)}
        >
           <NavContent />
        </div>

        <div className="p-4 border-t border-slate-100 flex justify-end shrink-0">
          <button
            onClick={() => {
              setCollapsed(!collapsed);
              setHovered(false);
            }}
            className="p-2 rounded-lg bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors w-full flex justify-center"
          >
            {collapsed ? <FiChevronsRight size={20} /> : <FiChevronsLeft size={20} />}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;