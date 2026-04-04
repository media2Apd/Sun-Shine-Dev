// import React, { useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import logo from '../assets/logo.svg';

// import {
//   FiGrid,
//   FiBox,
//   FiTag,
//   FiShoppingBag,
//   FiHeadphones,
//   FiUsers,
//   FiLayers,
//   FiSettings,
//   FiChevronsLeft,
//   FiChevronsRight,
//   FiX
// } from "react-icons/fi";

// const Sidebar = ({
//   collapsed,
//   setCollapsed,
//   mobileOpen,
//   setMobileOpen
// }) => {

//   const [hovered, setHovered] = useState(false);
//   const location = useLocation();

//   const isExpanded = !collapsed || (collapsed && hovered);
//   const desktopWidthClass = isExpanded ? "w-64" : "w-20";

//   const navItems = [

//     { label: "Dashboard", icon: <FiGrid />, to: "/admin-panel/admin-dashboard" },

//     { label: "Product", icon: <FiBox />, to: "/admin-panel/product-list" },

//     { label: "Products Category", icon: <FiShoppingBag />, to: "/admin-panel/products-category" },

//     { label: "Orders", icon: <FiTag />, to: "/admin-panel/order-list" },

//     { label: "Enquiries", icon: <FiHeadphones />, to: "/admin-panel/enquiry-list" },

//     { label: "Customers", icon: <FiUsers />, to: "/admin-panel/customer-list" },

//     { label: "Blog Management", icon: <FiLayers />, to: "/admin-panel/blog-list" },

//     { label: "Settings", icon: <FiSettings />, to: "/admin-panel/admin-settings" },

//   ];

//   const NavContent = () => (

//     <nav className="flex-1 py-4 space-y-2 overflow-y-auto px-3">

//       {navItems.map((item) => {

//         const isActive =
//           item.to === "/admin-panel"
//             ? location.pathname === "/admin-panel"
//             : location.pathname.startsWith(item.to);

//         return (

//           <NavLink
//             key={item.label}
//             to={item.to}
//             onClick={() => setMobileOpen(false)}

//             className={`group flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-full transition-all cursor-pointer
              
//               ${isActive
//                 ? "bg-green-600 text-white"
//                 : "text-slate-700 hover:bg-green-600 hover:text-white"}
              
//               ${!isExpanded && "justify-center px-0"}
//             `}
//           >

//             <span
//               className={`text-xl transition-colors
//               ${isActive ? "text-white" : "text-slate-500 group-hover:text-white"}`}
//             >
//               {item.icon}
//             </span>

//             <span
//               className={`transition-opacity duration-300
//               ${isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}
//             >
//               {item.label}
//             </span>

//           </NavLink>

//         );
//       })}

//     </nav>

//   );

//   return (
//     <>

//       {/* MOBILE SIDEBAR */}

//       {mobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       <aside
//         className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 lg:hidden flex flex-col
//         ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
//       >

//         <div className="h-16 flex items-center justify-between px-6 border-b">

//           <img src={logo} alt="Logo" className="h-8" />

//           <button onClick={() => setMobileOpen(false)}>
//             <FiX size={24} />
//           </button>

//         </div>

//         <NavContent />

//       </aside>


//       {/* DESKTOP SIDEBAR */}

//       <aside
//         className={`hidden lg:flex flex-col bg-white border-r h-full transition-all duration-300
//         ${desktopWidthClass}`}
//       >

//         <div
//           className="flex-1 overflow-hidden flex flex-col"
//           onMouseEnter={() => collapsed && setHovered(true)}
//           onMouseLeave={() => collapsed && setHovered(false)}
//         >

//           <NavContent />

//         </div>

//         <div className="p-4 border-t flex justify-end">

//           <button
//             onClick={() => {
//               setCollapsed(!collapsed);
//               setHovered(false);
//             }}
//             className="p-2 rounded-lg bg-slate-50 hover:bg-green-100 transition-colors w-full flex justify-center"
//           >

//             {collapsed
//               ? <FiChevronsRight size={20} />
//               : <FiChevronsLeft size={20} />
//             }

//           </button>

//         </div>

//       </aside>

//     </>
//   );
// };

// export default Sidebar;


// import React, { useState } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
// import logo from '../assets/logo.svg';

// import {
//   FiGrid,
//   FiBox,
//   FiTag,
//   FiShoppingBag,
//   FiHeadphones,
//   FiUsers,
//   FiLayers,
//   FiSettings,
//   FiChevronsLeft,
//   FiChevronsRight,
//   FiX,
//   FiLogOut // Added Logout Icon
// } from "react-icons/fi";

// const Sidebar = ({
//   collapsed,
//   setCollapsed,
//   mobileOpen,
//   setMobileOpen
// }) => {

//   const [hovered, setHovered] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate(); // For redirecting after logout

//   const isExpanded = !collapsed || (collapsed && hovered);
//   const desktopWidthClass = isExpanded ? "w-64" : "w-20";

//   const navItems = [
//     { label: "Dashboard", icon: <FiGrid />, to: "/admin-panel/admin-dashboard" },
//     { label: "Product", icon: <FiBox />, to: "/admin-panel/product-list" },
//     { label: "Products Category", icon: <FiShoppingBag />, to: "/admin-panel/products-category" },
//     { label: "Orders", icon: <FiTag />, to: "/admin-panel/order-list" },
//     { label: "Enquiries", icon: <FiHeadphones />, to: "/admin-panel/enquiry-list" },
//     { label: "Customers", icon: <FiUsers />, to: "/admin-panel/customer-list" },
//     { label: "Blog Management", icon: <FiLayers />, to: "/admin-panel/blog-list" },
//     { label: "Settings", icon: <FiSettings />, to: "/admin-panel/admin-settings" },
//   ];

//   // Helper function to handle logout
//   const handleLogout = () => {
//     // 1. Clear the authentication token from storage
//     localStorage.removeItem("token");
//     // If you use cookies or other local storage keys, clear them here:
//     // localStorage.clear(); 
    
//     // 2. Close mobile sidebar if open
//     setMobileOpen(false);
    
//     // 3. Navigate to login page
//     navigate("/login");
//   };

//   const NavContent = () => (
//     <nav className="flex-1 py-4 space-y-2 overflow-y-auto px-3">
//       {navItems.map((item) => {
//         const isActive =
//           item.to === "/admin-panel"
//             ? location.pathname === "/admin-panel"
//             : location.pathname.startsWith(item.to);

//         return (
//           <NavLink
//             key={item.label}
//             to={item.to}
//             onClick={() => setMobileOpen(false)}
//             className={`group flex items-center px-4 py-3 text-sm font-medium rounded-full transition-all cursor-pointer
//               ${isActive
//                 ? "bg-green-600 text-white"
//                 : "text-slate-700 hover:bg-green-600 hover:text-white"}
//               ${!isExpanded ? "justify-center px-0" : "gap-4"}
//             `}
//           >
//             <span
//               className={`text-xl transition-colors
//               ${isActive ? "text-white" : "text-slate-500 group-hover:text-white"}`}
//             >
//               {item.icon}
//             </span>
//             <span
//               className={`transition-opacity duration-300
//               ${isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}
//             >
//               {item.label}
//             </span>
//           </NavLink>
//         );
//       })}

//       {/* LOGOUT BUTTON - Strategically placed below Settings */}
//       <button
//         onClick={handleLogout}
//         className={`group flex items-center px-4 py-3 text-sm font-medium rounded-full transition-all cursor-pointer w-full
//           text-red-600 hover:bg-red-50
//           ${!isExpanded ? "justify-center px-0" : "gap-4"}
//         `}
//       >
//         <span className="text-xl">
//           <FiLogOut />
//         </span>
//         <span
//           className={`transition-opacity duration-300
//           ${isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}
//         >
//           Logout
//         </span>
//       </button>
//     </nav>
//   );

//   return (
//     <>
//       {/* MOBILE SIDEBAR OVERLAY */}
//       {mobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       {/* MOBILE SIDEBAR DRAWER */}
//       <aside
//         className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 lg:hidden flex flex-col
//         ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         <div className="h-16 flex items-center justify-between px-6 border-b">
//           <img src={logo} alt="Logo" className="h-8" />
//           <button onClick={() => setMobileOpen(false)} className="text-slate-500 hover:text-slate-800">
//             <FiX size={24} />
//           </button>
//         </div>
//         <NavContent />
//       </aside>

//       {/* DESKTOP SIDEBAR */}
//       <aside
//         className={`hidden lg:flex flex-col bg-white border-r h-full transition-all duration-300
//         ${desktopWidthClass}`}
//       >
//         <div
//           className="flex-1 overflow-hidden flex flex-col"
//           onMouseEnter={() => collapsed && setHovered(true)}
//           onMouseLeave={() => collapsed && setHovered(false)}
//         >
//           <NavContent />
//         </div>

//         {/* Collapse Toggle Footer */}
//         <div className="p-4 border-t flex justify-end">
//           <button
//             onClick={() => {
//               setCollapsed(!collapsed);
//               setHovered(false);
//             }}
//             className="p-2 rounded-lg bg-slate-50 hover:bg-green-100 transition-colors w-full flex justify-center text-slate-600"
//           >
//             {collapsed
//               ? <FiChevronsRight size={20} />
//               : <FiChevronsLeft size={20} />
//             }
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../assets/logo.svg';

import {
  FiGrid,
  FiBox,
  FiTag,
  FiShoppingBag,
  FiHeadphones,
  FiUsers,
  FiLayers,
  FiChevronsLeft,
  FiChevronsRight,
  FiX,
  FiLogOut
} from "react-icons/fi";

const Sidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen
}) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  // Determine if the sidebar should appear expanded (either not collapsed or currently hovered while collapsed)
  const isExpanded = !collapsed || (collapsed && hovered);
  const desktopWidthClass = isExpanded ? "w-64" : "w-20";

  const navItems = [
    { label: "Dashboard", icon: <FiGrid />, to: "/admin-panel/admin-dashboard" },
    { label: "Product", icon: <FiBox />, to: "/admin-panel/product-list" },
    { label: "Products Category", icon: <FiShoppingBag />, to: "/admin-panel/products-category" },
    { label: "Orders", icon: <FiTag />, to: "/admin-panel/order-list" },
    { label: "Enquiries", icon: <FiHeadphones />, to: "/admin-panel/enquiry-list" },
    { label: "Customers", icon: <FiUsers />, to: "/admin-panel/customer-list" },
    { label: "Blog Management", icon: <FiLayers />, to: "/admin-panel/blog-list" },
    // { label: "Settings", icon: <FiSettings />, to: "/admin-panel/admin-settings" },
  ];

  const handleLogout = () => {
    // Standard Auth teardown
    localStorage.removeItem("token");
    setMobileOpen(false);
    navigate("/login");
  };

  const NavContent = () => (
    <nav className="flex-1 py-6 space-y-2 overflow-y-auto px-3 mt-2">
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.to}
          onClick={() => setMobileOpen(false)}
          // Using the isActive parameter from NavLink to apply styles dynamically
          className={({ isActive }) => `
            group flex items-center transition-all duration-300 rounded-full h-12
            ${isActive 
              ? "bg-green-600 text-white shadow-md shadow-green-200" 
              : "text-slate-600 hover:bg-green-50 hover:text-green-700"}
            ${!isExpanded ? "justify-center w-12 mx-auto" : "px-4 w-full"}
          `}
        >
          {/* Fixed width container for icons ensures alignment and prevents size jumping */}
          <div className={`flex items-center justify-center min-w-[24px] text-xl ${isExpanded ? "mr-4" : ""}`}>
            {item.icon}
          </div>
          
          <span
            className={`whitespace-nowrap font-medium text-sm transition-all duration-300
            ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 w-0 overflow-hidden"}`}
          >
            {item.label}
          </span>
        </NavLink>
      ))}

      {/* Separator and Logout Action */}
      <div className="pt-4 mt-4 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className={`
            group flex items-center transition-all duration-300 rounded-full h-12 w-full
            text-red-500 hover:bg-red-50 hover:text-red-700
            ${!isExpanded ? "justify-center w-12 mx-auto" : "px-4"}
          `}
        >
          <div className={`flex items-center justify-center min-w-[24px] text-xl ${isExpanded ? "mr-4" : ""}`}>
            <FiLogOut />
          </div>
          <span
            className={`whitespace-nowrap font-medium text-sm transition-all duration-300
            ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 w-0 overflow-hidden"}`}
          >
            Logout
          </span>
        </button>
      </div>
    </nav>
  );

  return (
    <>
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* MOBILE DRAWER */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 lg:hidden flex flex-col
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-50">
          <img src={logo} alt="Logo" className="h-9 w-auto" />
          <button 
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 transition-all"
          >
            <FiX size={24} />
          </button>
        </div>
        <NavContent />
      </aside>

      {/* DESKTOP SIDEBAR */}
      <aside
        className={`hidden lg:flex flex-col bg-white border-r border-slate-100 h-full transition-all duration-300 relative
        ${desktopWidthClass}`}
        onMouseEnter={() => collapsed && setHovered(true)}
        onMouseLeave={() => collapsed && setHovered(false)}
      >
        <NavContent />

        {/* BOTTOM TOGGLE BUTTON */}
        <div className="p-4 border-t border-slate-50">
          <button
            onClick={() => {
              setCollapsed(!collapsed);
              setHovered(false);
            }}
            className="group flex items-center justify-center p-2 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-green-600 hover:text-white transition-all duration-300 w-full"
          >
            {isExpanded ? (
              <FiChevronsLeft size={20} />
            ) : (
              <FiChevronsRight size={20} />
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;