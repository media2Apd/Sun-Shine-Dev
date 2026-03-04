import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "./Sidebar"; // Adjust path as needed
import { Outlet } from "react-router-dom";

const Layout = () => {
  // State for Desktop Collapse (Default: Expanded)
  const [collapsed, setCollapsed] = useState(false);
  
  // State for Mobile Drawer (Default: Closed)
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      
      {/* Header (Full Width) */}
      <Header toggleMobileSidebar={toggleMobileSidebar} />

      {/* Main Container (Sidebar + Content) */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Sidebar */}
        <Sidebar 
          collapsed={collapsed} 
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* admin-scroll-area is used in ScrollToTop component Area */}
        <main id="admin-scroll-area" className="flex-1 overflow-auto p-4 md:p-6 bg-white">
          <Outlet /> 
        </main>
        
      </div>
    </div>
  );
};

export default Layout;


// {
//         path: "admin-panel",
//         element: <Layout />,
//         children: [
//           // {
//           //   path: "",
//           //   element: <Dashboard />
//           // },
//           // {
//           //   path: "all-categories",
//           //   element: <Categories />
//           // },
//           // {
//           //   path: "all-products",
//           //   element: <AllProducts />
//           // },
//           // {
//           //   path: "all-products/upload",
//           //   element: <ProductUpload />
//           // },
//           // {
//           //   path: "all-products/upload/:id",
//           //   element: <ProductUpload />
//           // },
//         ]
//       },