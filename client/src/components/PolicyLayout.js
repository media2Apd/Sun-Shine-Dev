// import React from 'react';
// import { ShieldCheck, FileText, Layout } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";

// const policies = [
//   { id: 'privacy', name: 'Privacy Policy', path: '/policy/privacy-policy', icon: <ShieldCheck size={18} /> },
//   { id: 'terms', name: 'Terms & Conditions', path: '/policy/terms-conditions', icon: <FileText size={18} /> },
// ];

// export default function PolicyLayout({ children }) {
//   const location = useLocation();

//   return (
//     <div className="min-h-screen bg-white flex justify-center py-10 px-4">
//       <div className="max-w-7xl w-full flex flex-col md:flex-row">
        
//         {/* SIDEBAR */}
//         <aside className="w-full md:w-72 flex-shrink-0 md:border-r border-gray-100 pr-8">
//           <div className="md:sticky md:top-28 h-fit">
            
//             {/* Header Info */}
//             <div className="flex items-center gap-3 mb-10 px-4">
//               <div className="bg-green-100 p-2 rounded-lg text-green-600">
//                 <Layout size={22} />
//               </div>
//               <div>
//                 <h2 className="text-sm font-bold text-gray-900 leading-tight tracking-tight">Policy Guide</h2>
//                 <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Sunshine International Agritech</p>
//               </div>
//             </div>

//             {/* Navigation Buttons */}
//             <nav className="space-y-2">
//               {policies.map((item) => {
//                 const isActive = location.pathname === item.path;
//                 return (
//                   <Link
//                     key={item.id}
//                     to={item.path}
//                     className={`w-full flex items-center gap-3 px-5 py-3.5 transition-all duration-300 text-sm font-medium ${
//                       isActive
//                         ? 'bg-[#45A301] text-white rounded-lg shadow-lg shadow-green-100' // Active state: Specific green + rounded-lg
//                         : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-lg' // Inactive hover state
//                     }`}
//                   >
//                     {/* Icon - Active ஆக இருக்கும்போது வெண்மை நிறத்தில் இருக்கும் */}
//                     <span className={`${isActive ? 'text-white' : 'text-gray-400'}`}>
//                         {item.icon}
//                     </span>
//                     {item.name}
//                   </Link>
//                 );
//               })}
//             </nav>
//           </div>
//         </aside>

//         {/* MAIN CONTENT AREA */}
//         <main className="flex-1 md:pl-16 mt-10 md:mt-0">
//           <div className="max-w-3xl">
//             {children}
//           </div>
//         </main>
        
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { 
  ShieldCheck, FileText, Layout, Truck, 
  RotateCcw, ArrowLeftRight, Lock 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const policies = [
  { 
    id: 'privacy', 
    name: 'Privacy Policy', 
    path: '/policy/privacy-policy', 
    icon: <ShieldCheck size={18} /> 
  },
  { 
    id: 'terms', 
    name: 'Terms and Conditions', 
    path: '/policy/terms-conditions', 
    icon: <FileText size={18} /> 
  },
  { 
    id: 'shipping', 
    name: 'Shipping Policy', 
    path: '/policy/shipping-policy', 
    icon: <Truck size={18} /> 
  },
  { 
    id: 'return', 
    name: 'Return & Refund Policy', 
    path: '/policy/return-refund', 
    icon: <RotateCcw size={18} /> 
  },
  { 
    id: 'exchange', 
    name: 'Exchange Policy', 
    path: '/policy/exchange-policy', 
    icon: <ArrowLeftRight size={18} /> 
  },
  { 
    id: 'safe', 
    name: 'Safe Purchase', 
    path: '/policy/safe-purchase', 
    icon: <Lock size={18} /> 
  },
];

export default function PolicyLayout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white flex justify-center py-10 px-4">
      <div className="max-w-7xl w-full flex flex-col md:flex-row">
        
        {/* SIDEBAR */}
        <aside className="w-full md:w-72 flex-shrink-0 md:border-r border-gray-100 pr-8">
          <div className="md:sticky md:top-28 h-fit">
            
            {/* Header Info */}
            <div className="flex items-center gap-3 mb-10 px-4">
              <div className="bg-green-100 p-2 rounded-lg text-[#45A301]">
                <Layout size={22} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900 leading-tight tracking-tight">Policy Guide</h2>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Sunshine International Agritech</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <nav className="space-y-1">
              {policies.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`w-full flex items-center justify-between px-5 py-3.5 transition-all duration-300 text-sm font-medium rounded-full group ${
                      isActive
                        ? 'bg-[#45A301] text-white shadow-lg shadow-green-100' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                        <span className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-900'}`}>
                            {item.icon}
                        </span>
                        {item.name}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 md:pl-16 mt-10 md:mt-0">
          <div className="max-w-3xl">
            {children}
          </div>
        </main>
        
      </div>
    </div>
  );
}