// import React, { useState } from "react";
// import { NavLink, useLocation } from "react-router-dom"; // Import useLocation
// import logo from '../assets/logo.png'; 
// import {
//   FiGrid,
//   FiBox,
//   FiTag,
//   FiShoppingBag,
//   FiHeadphones,
//   FiUsers,
//   FiTruck,
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
//   const location = useLocation(); // Get current URL

//   const isExpanded = !collapsed || (collapsed && hovered);
//   const desktopWidthClass = isExpanded ? "w-64" : "w-20";

//   const navItems = [

//   { label: "Dashboard", icon: <FiGrid className="text-xl" />, to: "/admin-panel" },

//   { label: "Product", icon: <FiBox   className="text-xl" />, to: "/admin-panel/product-list" },

//   { label: "Products Category", icon: <FiShoppingBag className="text-xl" />, to: "/admin-panel/products-category" },

  

//   { label: "Orders", icon: <FiTag className="text-xl" />, to: "/admin-panel/orders" },

//   { label: "Enquiries", icon: <FiHeadphones className="text-xl" />, to: "/admin-panel/enquiries" },

//   { label: "Customers", icon: <FiUsers className="text-xl" />, to: "/admin-panel/customers" },

//   { label: "Inventory", icon: <FiTruck className="text-xl" />, to: "/admin-panel/inventory" },

//   { label: "Content Management", icon: <FiLayers className="text-xl" />, to: "/admin-panel/content-management" },

//   { label: "Settings", icon: <FiSettings className="text-xl" />, to: "/admin-panel/settings" },
// ];

//   // Common Nav Content
//   const NavContent = () => (
//     <nav className="flex-1 py-4 space-y-2 overflow-y-auto">
//       {navItems.map((item) => {
//         // CUSTOM ACTIVE LOGIC
//         // 1. If it's the dashboard (/admin-panel), match exactly.
//         // 2. Otherwise, check if the current URL starts with the item's path.
//         const isActive = item.to === "/admin-panel" 
//           ? location.pathname === "/admin-panel" 
//           : location.pathname.startsWith(item.to);

//         return (
//           <NavLink
//             key={item.label}
//             to={item.to}
//             // Removed 'end' prop to allow sub-path matching
//             onClick={() => setMobileOpen(false)}
//             className={`group relative flex items-center gap-4 px-4 py-3 text-sm font-medium transition-all cursor-pointer whitespace-nowrap
//               ${isActive ? "text-blue-600 bg-blue-50" : "text-slate-700 hover:bg-slate-50"}
//               ${!isExpanded && "justify-center px-0"}`}
//           >
//             <>
//               {isActive && (
//                 <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-blue-500" />
//               )}
//               <span className={`shrink-0 transition-colors ${isActive ? "text-blue-600" : "text-slate-500 group-hover:text-blue-500"}`}>
//                 {item.icon}
//               </span>
              
//               <span className={`transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
//                 {item.label}
//               </span>
//             </>
//           </NavLink>
//         );
//       })}
//     </nav>
//   );

//   return (
//     <>
//       {/* ================= MOBILE SIDEBAR ================= */}
//       {mobileOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

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
//         <div 
//           className="flex-1 w-full overflow-hidden flex flex-col"
//           onMouseEnter={() => collapsed && setHovered(true)}
//           onMouseLeave={() => collapsed && setHovered(false)}
//         >
//            <NavContent />
//         </div>

//         <div className="p-4 border-t border-slate-100 flex justify-end shrink-0">
//           <button
//             onClick={() => {
//               setCollapsed(!collapsed);
//               setHovered(false);
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

    { label: "Content Management", icon: <FiLayers />, to: "/admin-panel/content-management" },

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