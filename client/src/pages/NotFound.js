// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { ShoppingBag, ArrowLeft } from "lucide-react";

// const NotFound = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 flex items-center justify-center px-4 sm:px-6">
      
//       <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
        
//         <div className="grid grid-cols-1 md:grid-cols-2">
          
//           {/* CONTENT */}
//           <div className="p-6 sm:p-10 lg:p-14 flex flex-col justify-center">
//             <span className="inline-block text-xs sm:text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
//               404 Error
//             </span>

//             <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
//               Page not found
//             </h1>

//             <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-md">
//               The page you’re looking for doesn’t exist or was moved.
//               Don’t worry — our store has plenty to explore.
//             </p>

//             {/* BUTTONS */}
//             <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white text-sm sm:text-base font-medium hover:bg-blue-700 transition"
//               >
//                 <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
//                 Back
//               </button>

//               <button
//                 onClick={() => navigate("/")}
//                 className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-gray-300 text-gray-700 text-sm sm:text-base font-medium hover:bg-gray-50 transition"
//               >
//                 <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
//                 Shop
//               </button>
//             </div>

//             {/* <button
//               onClick={() => navigate(-1)}
//               className="mt-4 inline-flex items-center gap-1 text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition w-fit"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               Go back
//             </button> */}
//           </div>

//           {/* VISUAL (hidden on mobile, visible on md+) */}
//           <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//             <div className="text-center px-6">
//               <div className="text-[100px] lg:text-[140px] select-none">🛍️</div>
//               <p className="mt-2 text-sm text-gray-500">
//                 Shopping never stops
//               </p>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default NotFound;



// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Sprout, ArrowLeft, Home, Tractor } from "lucide-react";

// const NotFound = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4 sm:px-6">
      
//       <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
        
//         <div className="grid grid-cols-1 md:grid-cols-2">
          
//           {/* CONTENT */}
//           <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
//             <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full w-fit">
//               <Sprout className="w-4 h-4" />
//               தவறான வழி (404 Error)
//             </span>

//             <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
//               இந்த நிலம் <span className="text-green-600">காலியாக</span> உள்ளது!
//             </h1>

//             <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-md leading-relaxed">
//               நீங்கள் தேடும் பக்கம் இன்னும் பயிரிடப்படவில்லை அல்லது வேறு இடத்திற்கு மாற்றப்பட்டுள்ளது. கவலைப்படாதீர்கள், எமது தோட்டத்தில் இன்னும் நிறைய விளைச்சல்கள் உள்ளன.
//             </p>

//             {/* BUTTONS */}
//             <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
//               <button
//                 onClick={() => navigate("/")}
//                 className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white text-sm sm:text-base font-semibold hover:bg-green-700 shadow-lg shadow-green-200 transition-all active:scale-95"
//               >
//                 <Home className="w-4 h-4 sm:w-5 sm:h-5" />
//                 முகப்பு பக்கம்
//               </button>

//               <button
//                 onClick={() => navigate(-1)}
//                 className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-green-600 text-green-700 text-sm sm:text-base font-semibold hover:bg-green-50 transition-all active:scale-95"
//               >
//                 <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
//                 பின்னால் செல்ல
//               </button>
//             </div>

//             <div className="mt-10 flex items-center gap-4 text-gray-400">
//                 <Tractor className="w-6 h-6 opacity-50" />
//                 <div className="h-px bg-gray-200 flex-1"></div>
//             </div>
//           </div>

//           {/* VISUAL - Farm Related */}
//           <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-emerald-200 relative overflow-hidden">
//             {/* Background Decorative Circles */}
//             <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
//             <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-green-300/20 rounded-full blur-3xl"></div>

//             <div className="relative text-center px-6 z-10">
//               <div className="text-[120px] lg:text-[160px] select-none animate-bounce duration-1000">
//                 🚜
//               </div>
//               <h2 className="text-2xl font-bold text-green-800">இயற்கை விவசாயம்</h2>
//               <p className="mt-2 text-green-700/70 font-medium">
//                 விதைப்போம்... அறுப்போம்...
//               </p>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default NotFound;


import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowLeft, Sprout } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4 sm:px-6">
      
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* CONTENT SECTION */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full w-fit">
              <Sprout className="w-4 h-4" />
              404 Error
            </span>

            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              Page <span className="text-green-600">not found</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-md leading-relaxed">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back to the field.
            </p>

            {/* ACTION BUTTONS */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => navigate("/")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white text-sm sm:text-base font-semibold hover:bg-green-700 shadow-lg shadow-green-200 transition-all active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                Shop
              </button>

              <button
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-green-600 text-green-700 text-sm sm:text-base font-semibold hover:bg-green-50 transition-all active:scale-95"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                Back
              </button>
            </div>
          </div>

          {/* VISUAL SECTION (Agriculture Illustration/Theme) */}
          <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-emerald-200 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-green-300/20 rounded-full blur-3xl"></div>

            <div className="relative text-center px-6 z-10">
              {/* Using a Tractor or Plant Emoji for a clean look */}
              <div className="text-[120px] lg:text-[150px] select-none filter drop-shadow-xl animate-pulse">
                🚜
              </div>
              <h2 className="text-2xl font-bold text-green-800 mt-4 italic">
                Fresh From the Farm
              </h2>
              <p className="mt-1 text-green-700/70 font-medium">
                Quality seeds, tools & produce.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NotFound;