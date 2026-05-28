// import React, { useState } from 'react';
// import { Menu, X } from 'lucide-react';

// import Container2 from '../assets/Container2.png';
// import Container1 from '../assets/container1.png';
// import Container3 from '../assets/container3.png';

// import HeroPage from '../components/homeComponents/HeroPage';


// const AgricultureLanding = () => {

//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const marqueeItems = [
//     "Soil Health",
//     "Sustainable Farming",
//     "Crop Nutrition",
//     "Eco-Friendly Solutions",
//     "Root Development",
//     "Natural Agriculture",
//     "Better Yield",
//     "Bio Fertilizers"
//   ];
//   const productList = [
//     { cat: "Bio Fertilizer", title: "Green Gold", desc: "Premium vermicompost enriched with natural nutrients to improve soil fertility, root growth, and crop yield naturally.", icon: "🌿" },
//     { cat: "Bio Control", title: "Controller", desc: "Powerful bio-control agent with Pseudomonas fluorescens that protects crops from fungal diseases and promotes healthy plant growth.", icon: "🛡️" },
//     { cat: "Bio Insecticide", title: "Target", desc: "Eco-friendly biological insecticide with Verticillium lecanii to effectively control sucking pests in crops.", icon: "🎯" },
//     { cat: "Water Soluble", title: "Ferticare NPK 20:20:20", desc: "100% water-soluble balanced fertilizer supporting healthy growth, flowering, and productivity in all crops.", icon: "💧" },
//     { cat: "Soil Health", title: "Humic Rich+", desc: "Liquid humic acid enriched with potassium to stimulate root development and improve nutrient absorption.", icon: "🧪" },
//     { cat: "Soil Conditioner", title: "Active 3G+", desc: "Advanced conditioner with seaweed, humic, and amino acids to enhance soil health and boost crop yield.", icon: "🌱" },
//     { cat: "Micronutrient", title: "Soluber-B", desc: "High-quality boron micronutrient fertilizer enhancing flowering, fruit setting, and overall crop productivity.", icon: "🌸" },
//     { cat: "Neem-Based", title: "Aza Gold", desc: "Neem-based bio insecticide with Azadirachtin for eco-friendly control of sucking and chewing pests across all crops.", icon: "🌰" },
//     { cat: "Bio Insecticide", title: "Namote", desc: "Biological insecticide powered by Metarhizium anisopliae for effective control of soil and foliar insect pests.", icon: "🍄" },
//     { cat: "Bt-Based", title: "Warner 007", desc: "Bt-based insecticide that controls caterpillars and larval pests while remaining safe for beneficial insects.", icon: "🔵" }
//   ];

//   return (

//     <div className="min-h-screen bg-white overflow-x-hidden font-sans text-slate-900">

//       {/* ================= HEADER ================= */}

//       <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">

//         <div className="max-w-[1440px] mx-auto px-5 lg:px-12 h-20 md:h-24 flex items-center justify-between relative">

//           {/* LOGO */}
//           <div className="flex items-center gap-2 z-10">

//             <div className="w-2.5 h-2.5 bg-[#00cc00] rounded-full"></div>

//             <h1 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-[#1a1a1a]">

//               Sunshine <span className="text-[#00cc00]">Agritech</span>

//             </h1>

//           </div>

//           {/* DESKTOP MENU */}
//           <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">

//             {['About', 'Products', 'Why Us', 'FAQ'].map((item) => (

//               <a
//                 key={item}
//                 href={`#${item.toLowerCase()}`}
//                 className="text-gray-500 hover:text-green-600 font-medium text-[15px] transition-colors"
//               >

//                 {item}

//               </a>

//             ))}

//           </div>

//           {/* BUTTON */}
//           <div className="hidden md:block z-10">

//             <button className="bg-[#00cc00] hover:bg-[#00b300] text-white px-8 py-2.5 rounded-full font-semibold text-sm transition-all duration-300">

//               Get in Touch

//             </button>

//           </div>

//           {/* MOBILE MENU */}
//           <button
//             className="md:hidden"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >

//             {isMenuOpen ? <X size={26} /> : <Menu size={26} />}

//           </button>

//         </div>

//       </nav>

//       {/* HEADER SPACE */}


//       {/* ================= HERO ================= */}

//       <main>

//         <HeroPage />

//       </main>

//       {/* ================= MARQUEE ================= */}

//       <div>

//         <div className="bg-[#00a600] py-3 overflow-hidden whitespace-nowrap ">

//           <div className="inline-block animate-marquee">

//             {marqueeItems.concat(marqueeItems).map((item, index) => (

//               <span
//                 key={index}
//                 className="inline-flex items-center text-white text-[10px] md:text-xs font-semibold mx-6 md:mx-8 uppercase tracking-[0.2em]"
//               >

//                 {item}

//                 <span className="mx-5 text-yellow-300">
//                   ✨
//                 </span>

//               </span>

//             ))}

//           </div>

//         </div>

//       </div>

//       {/* ================= SECTION 1 ================= */}

//       <section className="py-5 md:py-14 lg:py-18">

//         <div className="max-w-[1440px] mx-auto px-5 lg:px-12">

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10 xl:gap-6 items-center">

//             {/* ================= LEFT CONTENT ================= */}

//             <div className="space-y-6 max-w-[620px]">

//               {/* TAG */}
//               <span className="inline-flex items-center bg-[#e9f8e9] text-[#00b300] px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wide">

//                 • Premium Bio Fertilizers

//               </span>

//               {/* HEADING */}
//               <div className="space-y-4">

//                 <h1 className="text-[32px] sm:text-[42px] md:text-[52px] lg:text-[62px] leading-[1.5] font-medium tracking-[-0.03em] text-[#111111] ">

//                   Growing Agriculture with

//                   <span className="text-[#00b300]">
//                     {" "}Nature's Power
//                   </span>

//                 </h1>

//                 <p className="text-gray-500 text-sm sm:text-[15px] md:text-[17px] leading-relaxed max-w-md">

//                   High-quality Bio Fertilizers & Agricultural Solutions for
//                   healthier crops, better yield, and sustainable farming.

//                 </p>

//               </div>

//               {/* BUTTONS */}
//               <div className="flex flex-wrap gap-3 pt-1">

//                 <button className="bg-[#00c000] hover:bg-[#00a800] text-white px-6 md:px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 shadow-sm">

//                   Explore Products

//                 </button>

//                 <button className="border border-[#cfe8cf] hover:bg-[#f5fbf5] text-[#00a000] px-6 md:px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300">

//                   Our Story

//                 </button>

//               </div>

//               {/* STATS */}
//               <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#dfeede] max-w-[500px]">

//                 <div>

//                   <h3 className="text-[26px] sm:text-[30px] md:text-[36px] font-medium text-[#00b300]">

//                     10+

//                   </h3>

//                   <p className="text-[10px] sm:text-[11px] text-gray-400 mt-1">

//                     Products

//                   </p>

//                 </div>

//                 <div>

//                   <h3 className="text-[26px] sm:text-[30px] md:text-[36px] font-medium text-[#00b300]">

//                     100%

//                   </h3>

//                   <p className="text-[10px] sm:text-[11px] text-gray-400 mt-1">

//                     Bio-Based

//                   </p>

//                 </div>

//                 <div>

//                   <h3 className="text-[26px] sm:text-[30px] md:text-[36px] font-medium text-[#00b300]">

//                     All

//                   </h3>

//                   <p className="text-[10px] sm:text-[11px] text-gray-400 mt-1">

//                     Crop Types

//                   </p>

//                 </div>

//               </div>

//             </div>


//             {/* ================= RIGHT IMAGE BOX ================= */}
//             <div
//               className="relative w-full max-w-[260px] sm:max-w-[320px] md:max-w-[420px] lg:max-w-[520px] mx-auto">

//               {/* IMAGE */}
//               <img
//                 src={Container1}
//                 alt="Agriculture" className=" w-full h-auto object-contain block" />

//             </div>

//           </div>

//         </div>

//       </section>

//       {/* ================= SECTION 2 ================= */}

//       <section
//         id="approach"
//         className="py-5 md:py-16 lg:py-20"
//       >

//         <div className="max-w-[1440px] mx-auto px-5 lg:px-12">

//           {/* MAIN GRID */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

//             {/* ================= LEFT IMAGE SIDE ================= */}
//             <div className="relative">

//               {/* IMAGE BOX */}
//               <div>

//                 {/* MAIN IMAGE */}
//                 <img
//                   src={Container2}
//                   alt="Agriculture"
//                   className="
//               w-full
//               max-w-[260px]
//               sm:max-w-[340px]
//               md:max-w-[430px]
//               lg:max-w-[500px]
//               h-auto
//               object-contain
//             "
//                 />
//               </div>

//             </div>

//             {/* ================= RIGHT CONTENT ================= */}
//             <div className="space-y-8 md:space-y-10">

//               {/* HEADING */}
//               <div className="space-y-5">

//                 <p className="text-[#00cc00] font-semibold uppercase tracking-[0.2em] text-[11px] md:text-[13px]">

//                   — Our Approach

//                 </p>

// <h1 className="text-[30px] sm:text-[42px] md:text-[52px] lg:text-[62px] leading-[1.5] font-medium tracking-[-0.03em] text-[#111111] "> 
//                    Empowering Farmers with

//                   <span className="text-[#00cc00]">
//                     {" "} Sustainable Solutions
//                   </span>
//                 </h1>

//               </div>

//               {/* DESCRIPTION */}
//               <div className="space-y-5">

//                 <p className="text-gray-500 text-base md:text-lg lg:text-xl font-normal leading-relaxed max-w-xl">

//                   Sunshine Agritech is committed to supporting modern agriculture
//                   with trusted bio-fertilizers and crop nutrition solutions that
//                   improve soil health, strengthen plant growth, and increase
//                   productivity naturally.

//                 </p>

//                 <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xl">

//                   We believe healthy soil creates healthy crops. Our products help
//                   farmers achieve better yield, stronger root development, improved
//                   nutrient absorption, and long-term soil fertility.

//                 </p>

//               </div>

//               {/* FEATURE BOXES */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

//                 {[
//                   {
//                     title: 'Improve Soil Health',
//                     icon: '🌱'
//                   },
//                   {
//                     title: 'Enhance Nutrient Availability',
//                     icon: '💧'
//                   },
//                   {
//                     title: 'Promote Root & Plant Growth',
//                     icon: '🌾'
//                   },
//                   {
//                     title: 'Increase Crop Yield Naturally',
//                     icon: '🌿'
//                   }
//                 ].map((item, i) => (

//                   <div
//                     key={i}
//                     className="flex items-center gap-4 p-4 md:p-5 rounded-2xl border border-[#e4eee2] bg-white hover:border-[#00cc00] hover:shadow-md transition-all duration-300"
//                   >

//                     {/* ICON */}
//                     <div className="w-11 h-11 rounded-xl bg-[#eef8ec] flex items-center justify-center shrink-0 text-lg">

//                       {item.icon}

//                     </div>

//                     {/* TEXT */}
//                     <span className="font-medium text-sm md:text-[15px] text-[#222] leading-snug">

//                       {item.title}

//                     </span>

//                   </div>

//                 ))}

//               </div>

//             </div>

//           </div>

//         </div>

//       </section>

//       {/* ================= SECTION 3 ================= */}

//       <section className="py-5 md:py-24 lg:py-16 bg-white">

//         <div className="max-w-[1440px] mx-auto px-5 lg:px-12">

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

//             {/* ================= LEFT CONTENT ================= */}

//             <div>

//               {/* TOP LABEL */}
//               <p className="text-[#00b300] text-[12px] md:text-[13px] font-semibold tracking-wide mb-5">

//                 — About Us

//               </p>

//               {/* HEADING */}
//               <h2 className="text-[38px] sm:text-5xl lg:text-[64px] leading-[1.08] font-medium tracking-tight text-[#111111] max-w-[10ch]">

//                 Dedicated to

//                 <br />

//                 <span className="text-[#00b300]">
//                   Sustainable
//                 </span>{" "}

//                 Farming

//               </h2>

//               {/* DESCRIPTION */}
//               <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed max-w-[58ch] mt-7">

//                 Sunshine Agritech is an agricultural bio-fertilizer brand delivering
//                 effective and sustainable farming solutions. Our mission is to help
//                 farmers improve crop productivity through eco-friendly and scientifically
//                 developed products that support soil fertility and plant health.

//               </p>

//               {/* FEATURES */}
//               <div className="grid grid-cols-2 gap-x-8 gap-y-8 mt-10">

//                 {[
//                   {
//                     title: "Soil",
//                     desc: "Health focused"
//                   },
//                   {
//                     title: "Natural",
//                     desc: "Eco-friendly inputs"
//                   },
//                   {
//                     title: "Yield",
//                     desc: "Crop productivity"
//                   },
//                   {
//                     title: "Proven",
//                     desc: "Science-backed"
//                   }
//                 ].map((item, index) => (

//                   <div key={index}>

//                     <h3 className="text-[#00b300] text-[26px] md:text-[32px] font-medium leading-none">

//                       {item.title}

//                     </h3>

//                     <p className="text-gray-400 text-[11px] md:text-xs mt-2">

//                       {item.desc}

//                     </p>

//                   </div>

//                 ))}

//               </div>

//               {/* CHECK LIST */}
//               <div className="mt-10 border-t border-[#e7efe7]">

//                 {[
//                   "Improve soil health and long-term fertility",
//                   "Enhance nutrient availability for crops",
//                   "Promote healthy root and plant growth",
//                   "Increase crop yield naturally",
//                   "Support sustainable farming methods"
//                 ].map((item, index) => (

//                   <div
//                     key={index}
//                     className="flex items-center gap-3 py-4 border-b border-[#eef5ee]"
//                   >

//                     <div className="w-4 h-4 rounded-full bg-[#00b300] flex items-center justify-center shrink-0">

//                       <span className="text-white text-[9px]">
//                         ✓
//                       </span>

//                     </div>

//                     <p className="text-[12px] md:text-[13px] text-gray-600">

//                       {item}

//                     </p>

//                   </div>

//                 ))}

//               </div>

//             </div>

//             {/* ================= RIGHT IMAGE ================= */}

//   <div className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden">

//   {/* IMAGE */}
//   <img
//     src={Container3}
//     alt="About Agriculture"
//     className="
//       w-full
//       max-w-[260px]
//       md:max-w-[420px]
//       lg:max-w-[500px]
//       object-contain
//       relative
//       z-10
//       mx-auto
//     "
//   />

//   {/* TOP RIGHT BADGE INSIDE IMAGE */}
// <div
//   className="absolute  top-3  right-3  sm:top-4  sm:right-6  md:top-4  md:right-10  lg:top-4 lg:right-20
//              z-20 px-3 py-2  rounded-xl  bg-white/80  backdrop-blur-sm  border border-[#e6eee5]  shadow-sm"
// >

//     <h4 className="text-[#00b300] text-xs sm:text-sm font-semibold">

//       Sunshine

//     </h4>

//     <p className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5">

//       Agritech Brand

//     </p>

//   </div>

// </div>

//           </div>

//         </div>

//       </section>

//       {/* ================= SECTION 4 ================= */}

//       <section className="py-16 md:py-24 lg:py-28 bg-[#001a05] overflow-hidden">

//         <div className="max-w-[1440px] mx-auto px-5 lg:px-12">

//           {/* TOP AREA */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-14">

//             {/* LEFT */}
//             <div>

//               <p className="text-[#00d12f] text-[12px] md:text-[13px] font-semibold tracking-wide mb-5">

//                 — Why Farmers Trust Us

//               </p>

//               <h2 className="text-[38px] sm:text-5xl lg:text-[62px] leading-[1.08] font-medium tracking-tight text-white max-w-[11ch]">

//                 The Sunshine

//                 <span className="text-[#ffbf00]">
//                   {" "}Difference
//                 </span>

//               </h2>

//             </div>

//             {/* RIGHT */}
//             <p className="text-[#c7d1c5] text-sm md:text-[15px] leading-relaxed max-w-[60ch]">

//               Our commitment to quality, sustainability, and farmer success sets us apart —
//               from formulation to field, every product reflects our dedication to natural agriculture.

//             </p>

//           </div>

//           {/* GRID CARDS */}
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

//             {[
//               {
//                 no: "01",
//                 title: "Quality Products",
//                 desc: "Carefully formulated agricultural solutions designed for effective, consistent crop performance you can rely on season after season."
//               },
//               {
//                 no: "02",
//                 title: "Sustainable Farming Support",
//                 desc: "Eco-friendly products that help maintain long-term soil fertility and environmental balance for future generations of farming."
//               },
//               {
//                 no: "03",
//                 title: "Improved Crop Growth",
//                 desc: "Supports healthier roots, stronger plants, and better nutrient absorption — naturally, without harsh chemicals."
//               },
//               {
//                 no: "04",
//                 title: "Farmer-Focused Approach",
//                 desc: "Committed to understanding real farmer needs and delivering practical solutions that work in the field, every season."
//               },
//               {
//                 no: "05",
//                 title: "Agricultural Expertise",
//                 desc: "Dedicated to supporting modern farming through continuous innovation in crop nutrition and soil science."
//               },
//               {
//                 no: "06",
//                 title: "Proven Field Results",
//                 desc: "Trusted formulations that deliver real, measurable improvements across diverse crop types and growing conditions."
//               }
//             ].map((item, index) => (

//               <div
//                 key={index}
//                 className="bg-[linear-gradient(180deg,rgba(0,255,76,0.06),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.06)] rounded-[1.8rem] p-6 md:p-7 hover:border-[#00d12f]/30 transition-all duration-300"
//               >

//                 {/* NUMBER */}
//                 <h3 className="text-[#00ff3c] text-[44px] md:text-[54px] leading-none font-light">

//                   {item.no}

//                 </h3>

//                 {/* TITLE */}
//                 <h4 className="text-white text-lg md:text-xl font-medium mt-5">

//                   {item.title}

//                 </h4>

//                 {/* DESCRIPTION */}
//                 <p className="text-[#b9c4b7] text-[13px] md:text-sm leading-relaxed mt-4">

//                   {item.desc}

//                 </p>

//               </div>

//             ))}

//           </div>

//         </div>

//       </section>

//       {/* ================= STYLE ================= */}

//       <style jsx>{`

//         @keyframes marquee {

//           0% {
//             transform: translateX(0);
//           }

//           100% {
//             transform: translateX(-50%);
//           }

//         }

//         .animate-marquee {

//           display: inline-block;
//           animation: marquee 35s linear infinite;

//         }

//       `}</style>


//       <div className="bg-[#F8FDF8] w-full min-h-screen text-[#2D2D2D] font-sans overflow-x-hidden">
//         <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-10 md:py-16">

//           {/* Vision & Mission - Stacked on Mobile, Side-by-side on Desktop */}
//           <section className="flex flex-col lg:flex-row w-full mb-16 md:mb-20 border border-[#00B207]/10 rounded-lg overflow-hidden">
//             <div className="flex-1 p-8 md:p-16 bg-[#F8FDF8]">
//               <h2 className="text-[#00B207] font-medium text-sm tracking-widest uppercase mb-4">— Our Vision</h2>
//               <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#00B207]">A Greener, More Productive Future</h1>
//               <p className="text-gray-600 leading-relaxed">To become a trusted agricultural brand that supports sustainable farming and improves farmer productivity.</p>
//             </div>
//             <div className="flex-1 p-8 md:p-16 bg-[#00B207] text-white">
//               <h2 className="font-medium text-sm tracking-widest uppercase mb-4">— Our Mission</h2>
//               <h1 className="text-3xl md:text-4xl font-bold mb-6">Delivering Quality, Every Harvest</h1>
//               <p className="leading-relaxed">To provide high-quality bio-fertilizers and crop nutrition products that help farmers achieve healthier crops.</p>
//             </div>
//           </section>

//           {/* Products Section */}
//           <section className="mb-16 md:mb-24">
//             <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-10 md:mb-16">
//               <div className="flex-1">
//                 <h2 className="text-[#00B207] font-medium text-sm tracking-widest uppercase mb-4">— Our Products</h2>
//                 <h1 className="text-3xl md:text-5xl font-bold leading-tight">A Complete Range of <br /><span className="text-[#00B207]">Natural Solutions</span></h1>
//               </div>
//               <div className="flex-1 lg:mt-auto">
//                 <p className="text-gray-600 text-lg leading-relaxed">Biological fertilizers, crop nutrients, soil conditioners, and bio-control agents — scientifically formulated for every farming need.</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {productList.map((item, index) => (
//                 <div key={index} className="bg-white p-6 md:p-8 border border-[#00B207]/20 rounded-2xl flex flex-col items-start hover:border-[#00B207] transition-all">
//                   <h3 className="text-[#00B207] text-xs font-medium tracking-wide mb-3">{item.cat}</h3>
//                   <div className="w-10 h-10 mb-4 flex items-center justify-center bg-green-50 rounded-lg text-lg">{item.icon}</div>
//                   <h4 className="text-lg md:text-xl font-bold mb-2">{item.title}</h4>
//                   <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Gallery Section */}
//           <section className="mb-16 md:mb-24">
//             <h2 className="text-[#00B207] font-medium mb-3">— Gallery</h2>
//             <h1 className="text-3xl md:text-4xl font-bold mb-8">Our Industry</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="bg-white p-3 border rounded-3xl"><div className="h-64 md:h-96 bg-gray-200 rounded-2xl mb-4"></div><h3 className="font-bold px-2">Product Packaging & Quality Control</h3></div>
//               <div className="bg-white p-3 border rounded-3xl"><div className="h-64 md:h-96 bg-gray-200 rounded-2xl mb-4"></div><h3 className="font-bold px-2">Production & Storage Facility</h3></div>
//             </div>
//             <div className="flex justify-center mt-8 md:mt-12">
//               <div className="w-32 md:w-[180px] flex justify-between">
//                 <button className="w-12 h-12 rounded-full border border-[#00B207] text-[#00B207] hover:bg-[#00B207] hover:text-white transition">&lt;</button>
//                 <button className="w-12 h-12 rounded-full border border-[#00B207] text-[#00B207] hover:bg-[#00B207] hover:text-white transition">&gt;</button>
//               </div>
//             </div>
//           </section>

//           {/* FAQ Section */}
//           <section className="py-10 md:py-20 border-t">
//             <div className="flex flex-col lg:flex-row gap-10 md:gap-20">
//               <div className="lg:w-1/3">
//                 <h2 className="text-[#00B207] font-medium text-sm tracking-widest uppercase mb-4">— FAQ</h2>
//                 <h1 className="text-3xl md:text-5xl font-bold mb-6">Common <span className="text-[#00B207]">Questions</span></h1>
//               </div>
//               <div className="lg:w-2/3">
//                 {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
//                   <div key={i} className="group flex justify-between items-center py-5 border-b cursor-pointer">
//                     <span className="text-gray-700 font-medium group-hover:text-[#00B207] transition">What products does Sunshine Agitech offer?</span>
//                     <span className="text-gray-400 font-bold group-hover:text-[#00B207]">+</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//         </div>
//       </div>

//     </div>

//   );

// };

// export default AgricultureLanding;


import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

import Container2 from '../assets/Container2.png';
import Container1 from '../assets/container1.png';
import Container3 from '../assets/container3.png';

import HeroPage from '../components/homeComponents/HeroPage';
import { useNavigate } from 'react-router-dom';

import img1 from "../assets/gallery1.png";
import img2 from "../assets/gallery2.png";
import img3 from "../assets/gallery3.png";
import img4 from "../assets/gallery4.png";
import img5 from "../assets/gallery5.png";
import img6 from "../assets/gallery6.png";
import img7 from "../assets/gallery7.png";
import img8 from "../assets/gallery8.png";

const AgricultureLanding = () => {

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [page, setPage] = useState(0);

  const marqueeItems = [
    "Soil Health", "Sustainable Farming", "Crop Nutrition",
    "Eco-Friendly Solutions", "Root Development", "Natural Agriculture",
    "Better Yield", "Bio Fertilizers"
  ];

  const productList = [
    { cat: "Bio Fertilizer", title: "Green Gold", desc: "Premium vermicompost enriched with natural nutrients to improve soil fertility, root growth, and crop yield naturally.", icon: "🌿" },
    { cat: "Bio Control", title: "Controller", desc: "Powerful bio-control agent with Pseudomonas fluorescens that protects crops from fungal diseases and promotes healthy plant growth.", icon: "🛡️" },
    { cat: "Bio Insecticide", title: "Target", desc: "Eco-friendly biological insecticide with Verticillium lecanii to effectively control sucking pests in crops.", icon: "🎯" },
    { cat: "Water Soluble", title: "Ferticare NPK 20:20:20", desc: "100% water-soluble balanced fertilizer supporting healthy growth, flowering, and productivity in all crops.", icon: "💧" },
    { cat: "Soil Health", title: "Humic Rich+", desc: "Liquid humic acid enriched with potassium to stimulate root development and improve nutrient absorption.", icon: "🧪" },
    { cat: "Soil Conditioner", title: "Active 3G+", desc: "Advanced conditioner with seaweed, humic, and amino acids to enhance soil health and boost crop yield.", icon: "🌱" },
    { cat: "Micronutrient", title: "Soluber-B", desc: "High-quality boron micronutrient fertilizer enhancing flowering, fruit setting, and overall crop productivity.", icon: "🌸" },
    { cat: "Neem-Based", title: "Aza Gold", desc: "Neem-based bio insecticide with Azadirachtin for eco-friendly control of sucking and chewing pests across all crops.", icon: "🌰" },
    { cat: "Bio Insecticide", title: "Namote", desc: "Biological insecticide powered by Metarhizium anisopliae for effective control of soil and foliar insect pests.", icon: "🍄" },
    { cat: "Bt-Based", title: "Warner 007", desc: "Bt-based insecticide that controls caterpillars and larval pests while remaining safe for beneficial insects.", icon: "🔵" }
  ];

  const faqList = [
    {
      q: "What products does Sunshine Agritech offer?",
      a: "Sunshine Agritech offers bio-fertilizers, organic crop nutrients, soil health solutions, and plant growth promoters designed to support healthy crop growth and sustainable farming."
    },
    {
      q: "What are bio-fertilizers?",
      a: "Bio-fertilizers are natural agricultural inputs containing beneficial microorganisms that improve soil fertility and help plants absorb nutrients effectively."
    },
    {
      q: "Are Sunshine Agritech products safe for crops and soil?",
      a: "Yes. Our products are eco-friendly and developed to improve soil health, support plant growth, and promote sustainable agricultural practices."
    },
    {
      q: "Which crops can use Sunshine Agritech products?",
      a: "Our products are suitable for a wide range of crops including paddy, vegetables, fruits, pulses, cotton, sugarcane, plantation crops, and horticultural crops."
    },
    {
      q: "How do bio-fertilizers benefit farmers?",
      a: null,
      bullets: ["Improve soil fertility", "Enhance root development", "Increase nutrient absorption", "Support better crop yield", "Reduce dependency on chemical fertilizers"]
    },
    {
      q: "How should the products be applied?",
      a: "Depending on the product, applications may include:",
      bullets: ["Soil application", "Drip irrigation", "Seed treatment", "Foliar spray"]
    },
    {
      q: "Are the products suitable for organic farming?",
      a: "Many of our products are developed to support eco-friendly and sustainable farming practices. Please contact us for specific product recommendations for organic cultivation."
    },
    {
      q: "How should the products be stored?",
      a: "Products should be stored in a cool, dry place away from direct sunlight and moisture."
    },
    {
      q: "Why choose Sunshine Agritech?",
      a: "Farmers trust Sunshine Agritech for:",
      bullets: ["Quality agricultural solutions", "Sustainable farming support", "Reliable product performance", "Farmer-focused approach", "Commitment to crop and soil health"]
    },
  ];


  const galleryData = [
    { image: img1, title: "Product Packaging & Quality Control", desc: "Careful packaging, sealing and quality checks.", category: "industry" },
    { image: img2, title: "Production & Storage Facility", desc: "Well equipped facility ensuring product safety.", category: "industry" },
    { image: img3, title: "Field Support Team", desc: "Dedicated team assisting farmers with guidance.", category: "workers" },
    { image: img4, title: "Warehouse & Operations Staff", desc: "Inventory management and dispatch process.", category: "workers" },
    { image: img5, title: "Crop Application", desc: "Farmers applying crop solutions in fields.", category: "field" },
    { image: img6, title: "Soil Treatment", desc: "Improving soil fertility using bio inputs.", category: "field" },
    { image: img7, title: "Healthy Crop Growth", desc: "Visible improvement after product usage.", category: "results" },
    { image: img8, title: "High Yield Harvest", desc: "Better yield achieved through nutrition.", category: "results" },
  ];

  const sectionMeta = [
    { title: "Our Industry", subtitle: "Manufacturing, packaging, quality & infrastructure" },
    { title: "Our Workers", subtitle: "People behind the brand" },
    { title: "Field Work", subtitle: "On-ground application & real usage" },
    { title: "Crop Results", subtitle: "Outcomes & proof" },
  ];

  const itemsPerPage = 2;
  const totalPages = Math.ceil(galleryData.length / itemsPerPage);

  const paginatedIndustry = galleryData.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const currentMeta = sectionMeta[page];

  const prevPage = () => setPage((prev) => (prev <= 0 ? totalPages - 1 : prev - 1));
  const nextPage = () => setPage((prev) => (prev >= totalPages - 1 ? 0 : prev + 1));



  const Card = ({ image, title, desc }) => {
    return (
      <div className="bg-white p-3 border rounded-3xl hover:shadow-md transition">
        <img
          src={image}
          alt={title}
          className="w-full h-64 md:h-96 object-cover rounded-2xl mb-4"
        />
        <h3 className="font-bold px-2">{title}</h3>
        <p className="text-sm text-gray-500 mt-2 px-2">{desc}</p>
      </div>
    );
  };

  const Section = ({ title, subtitle, children }) => {
    return (
      <div className="mb-16 md:mb-24">
        <h2 className="text-[#00B207] font-medium mb-2">
          — {title}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {subtitle}
        </p>
        {children}
      </div>
    );
  };



  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans text-slate-900">

      {/* ===== HEADER ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-16 md:h-20 flex items-center justify-between relative">

          {/* LOGO */}
          <div className="flex items-center gap-2 z-10">
            <div className="w-2.5 h-2.5 bg-[#00cc00] rounded-full"></div>
            <h1 className="text-base sm:text-lg md:text-xl font-semibold tracking-tight text-[#1a1a1a]">
              Sunshine <span className="text-[#00cc00]">Agritech</span>
            </h1>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {['About', 'Shop', 'Why Us', 'FAQ', 'Blogs'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === 'Shop') navigate('/homepage');
                  else if (item === 'About') navigate('/about');
                  else if (item === 'FAQ') navigate('/faqs');
                  else if (item === 'Blogs') navigate('/blogs');
                  else if (item === 'Why Us') {
                    const section = document.getElementById('why-us');
                    if (section) section.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-gray-500 hover:text-green-600 font-medium text-[15px] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          {/* CTA BUTTON */}
          <div className="hidden md:block z-10">
            <button
              onClick={() => navigate('/contact-us')}
              className="bg-[#00cc00] hover:bg-[#00b300] text-white px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300"
            >
              Get in Touch
            </button>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            className="md:hidden p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
            {['About', 'Products', 'Why Us', 'FAQ'].map((item) => (
              <button
                key={item}
                onClick={() => item === 'Products' ? navigate('/homepage') : null}
                className="text-gray-500 hover:text-green-600 font-medium text-[15px] transition-colors"
              >
                {item}
              </button>
            ))}
            <button className="bg-[#00cc00] hover:bg-[#00b300] text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 w-full">
              Get in Touch
            </button>
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <main>
        <HeroPage />
      </main>

      {/* ===== MARQUEE ===== */}
      <div className="bg-[#00a600] py-3 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee">
          {marqueeItems.concat(marqueeItems).map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center text-white text-[10px] md:text-xs font-semibold mx-5 md:mx-8 uppercase tracking-[0.2em]"
            >
              {item}
              <span className="mx-4 text-yellow-300">✨</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== SECTION 1 — HERO CONTENT ===== */}
      <section className="py-10 md:py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-10 xl:gap-16 items-center">

            {/* LEFT CONTENT */}
            <div className="w-full lg:w-1/2 space-y-5">
              <span className="inline-flex items-center bg-[#e9f8e9] text-[#00b300] px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wide">
                • Premium Bio Fertilizers
              </span>

              <div className="space-y-3">
                <h1 className="text-[30px] sm:text-[38px] md:text-[48px] lg:text-[56px] leading-[1.2] font-medium tracking-[-0.02em] text-[#111111]">
                  Growing Agriculture with
                  <span className="text-[#00b300]"> Nature's Power</span>
                </h1>
                <p className="text-gray-500 text-sm sm:text-base md:text-[16px] leading-relaxed max-w-md">
                  High-quality Bio Fertilizers & Agricultural Solutions for
                  healthier crops, better yield, and sustainable farming.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  onClick={() => navigate('/homepage')}
                  className="bg-[#00c000] hover:bg-[#00a800] text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-sm"
                >
                  Explore Products
                </button>

                <button
                  onClick={() => navigate('/about')}
                  className="border border-[#cfe8cf] hover:bg-[#e9f8e9] hover:border-[#00a000] text-[#00a000] px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300"
                >
                  Our Story
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-[#dfeede] max-w-[440px]">
                {[
                  { val: "10+", label: "Products" },
                  { val: "100%", label: "Bio-Based" },
                  { val: "All", label: "Crop Types" },
                ].map((s, i) => (
                  <div key={i}>
                    <h3 className="text-[24px] sm:text-[28px] md:text-[34px] font-medium text-[#00b300]">{s.val}</h3>
                    <p className="text-[10px] sm:text-[11px] text-gray-400 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <img
                src={Container1}
                alt="Agriculture product"
                className="w-full max-w-[260px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[500px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2 — OUR APPROACH ===== */}
      <section id="approach" className="py-10 md:py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center">

            {/* LEFT IMAGE */}
            <div className="w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
              <img
                src={Container2}
                alt="Agriculture approach"
                className="w-full max-w-[260px] sm:max-w-[340px] md:max-w-[430px] lg:max-w-[500px] h-auto object-contain"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className="w-full lg:w-1/2 space-y-6 order-1 lg:order-2">
              <p className="text-[#00cc00] font-semibold uppercase tracking-[0.2em] text-[11px] md:text-[13px]">
                — Our Approach
              </p>
              <h1 className="text-[30px] sm:text-[38px] md:text-[48px] lg:text-[56px] leading-[1.2] font-medium tracking-[-0.02em] text-[#111111]">
                Empowering Farmers with
                <span className="text-[#00cc00]"> Sustainable Solutions</span>
              </h1>
              <div className="space-y-4">
                <p className="text-gray-500 text-sm md:text-base lg:text-[17px] leading-relaxed max-w-xl">
                  Sunshine Agritech is committed to supporting modern agriculture
                  with trusted bio-fertilizers and crop nutrition solutions that
                  improve soil health, strengthen plant growth, and increase
                  productivity naturally.
                </p>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-xl">
                  We believe healthy soil creates healthy crops. Our products help
                  farmers achieve better yield, stronger root development, improved
                  nutrient absorption, and long-term soil fertility.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: 'Improve Soil Health', icon: '🌱' },
                  { title: 'Enhance Nutrient Availability', icon: '💧' },
                  { title: 'Promote Root & Plant Growth', icon: '🌾' },
                  { title: 'Increase Crop Yield Naturally', icon: '🌿' }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-2xl border border-[#e4eee2] bg-white hover:border-[#00cc00] hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#eef8ec] flex items-center justify-center shrink-0 text-lg">
                      {item.icon}
                    </div>
                    <span className="font-medium text-sm md:text-[15px] text-[#222] leading-snug">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3 — ABOUT ===== */}
      <section id="about" className="py-10 md:py-20 lg:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

            {/* LEFT CONTENT */}
            <div className="w-full lg:w-1/2">
              <p className="text-[#00b300] text-[12px] md:text-[13px] font-semibold tracking-wide mb-4">
                — About Us
              </p>
              <h2 className="text-[32px] sm:text-[42px] lg:text-[56px] leading-[1.1] font-medium tracking-tight text-[#111111]">
                Dedicated to<br />
                <span className="text-[#00b300]">Sustainable</span> Farming
              </h2>
              <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed max-w-[58ch] mt-5">
                Sunshine Agritech is an agricultural bio-fertilizer brand delivering
                effective and sustainable farming solutions. Our mission is to help
                farmers improve crop productivity through eco-friendly and scientifically
                developed products that support soil fertility and plant health.
              </p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-8">
                {[
                  { title: "Soil", desc: "Health focused" },
                  { title: "Natural", desc: "Eco-friendly inputs" },
                  { title: "Yield", desc: "Crop productivity" },
                  { title: "Proven", desc: "Science-backed" }
                ].map((item, index) => (
                  <div key={index} className="p-3 rounded-xl hover:bg-[#e9f8e9] transition-all duration-300 cursor-pointer">
                    <h3 className="text-[#00b300] text-[22px] md:text-[28px] font-medium leading-none">{item.title}</h3>
                    <p className="text-gray-400 text-[11px] md:text-xs mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-[#e7efe7]">
                {[
                  "Improve soil health and long-term fertility",
                  "Enhance nutrient availability for crops",
                  "Promote healthy root and plant growth",
                  "Increase crop yield naturally",
                  "Support sustainable farming methods"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 py-3.5 border-b border-[#eef5ee]">
                    <div className="w-4 h-4 rounded-full bg-[#00b300] flex items-center justify-center shrink-0">
                      <span className="text-white text-[9px]">✓</span>
                    </div>
                    <p className="text-[12px] md:text-[13px] text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full lg:w-1/2 flex justify-center relative">
              <div className="relative inline-block">
                <img
                  src={Container3}
                  alt="About Agriculture"
                  className="w-full max-w-[260px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[480px] h-auto object-contain"
                />
                {/* BADGE */}
                <div className="absolute top-3 right-0 sm:right-0 z-20 px-3 py-2 rounded-xl bg-white/90 backdrop-blur-sm border border-[#e6eee5] shadow-sm">
                  <h4 className="text-[#00b300] text-xs sm:text-sm font-semibold">Sunshine</h4>
                  <p className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5">Agritech Brand</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4 — WHY US ===== */}
      <section id="why-us" className="py-14 md:py-20 lg:py-24 bg-[#001a05] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">

          {/* TOP AREA */}
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-end mb-12">
            <div className="lg:w-1/2">
              <p className="text-[#00d12f] text-[12px] md:text-[13px] font-semibold tracking-wide mb-4">
                — Why Farmers Trust Us
              </p>
              <h2 className="text-[32px] sm:text-[42px] lg:text-[56px] leading-[1.1] font-medium tracking-tight text-white">
                The Sunshine<span className="text-[#ffbf00]"> Difference</span>
              </h2>
            </div>
            <p className="lg:w-1/2 text-[#c7d1c5] text-sm md:text-[15px] leading-relaxed">
              Our commitment to quality, sustainability, and farmer success sets us apart —
              from formulation to field, every product reflects our dedication to natural agriculture.
            </p>
          </div>

          {/* CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
            {[
              { no: "01", title: "Quality Products", desc: "Carefully formulated agricultural solutions designed for effective, consistent crop performance you can rely on season after season." },
              { no: "02", title: "Sustainable Farming Support", desc: "Eco-friendly products that help maintain long-term soil fertility and environmental balance for future generations of farming." },
              { no: "03", title: "Improved Crop Growth", desc: "Supports healthier roots, stronger plants, and better nutrient absorption — naturally, without harsh chemicals." },
              { no: "04", title: "Farmer-Focused Approach", desc: "Committed to understanding real farmer needs and delivering practical solutions that work in the field, every season." },
              { no: "05", title: "Agricultural Expertise", desc: "Dedicated to supporting modern farming through continuous innovation in crop nutrition and soil science." },
              { no: "06", title: "Proven Field Results", desc: "Trusted formulations that deliver real, measurable improvements across diverse crop types and growing conditions." }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[linear-gradient(180deg,rgba(0,255,76,0.06),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.06)] rounded-[1.5rem] p-5 md:p-7 hover:border-[#00d12f]/30 transition-all duration-300"
              >
                <h3
                  className="text-[#00ff3c] text-[60px] leading-[44.8px] tracking-[0px]"
                  style={{
                    fontFamily: "'Style Script', cursive",
                    fontWeight: 400,
                    verticalAlign: "middle",
                  }}
                >
                  {item.no}
                </h3>
                <h4 className="text-white text-base md:text-lg font-medium mt-4">{item.title}</h4>
                <p className="text-[#b9c4b7] text-[13px] md:text-sm leading-relaxed mt-3">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VISION & MISSION ===== */}
      <div className="bg-[#F8FDF8] w-full text-[#2D2D2D] font-sans overflow-x-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-16">

          {/* Vision & Mission */}
          <section className="flex flex-col lg:flex-row w-full mb-14 md:mb-20 border border-[#00B207]/10 rounded-2xl overflow-hidden">
            <div className="flex-1 p-6 sm:p-10 md:p-14 bg-[#F8FDF8]">
              <h2 className="text-[#00B207] font-medium text-xs tracking-widest uppercase mb-3">— Our Vision</h2>
              <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#00B207]">A Greener, More Productive Future</h1>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">To become a trusted agricultural brand that supports sustainable farming and improves farmer productivity.</p>
            </div>
            <div className="flex-1 p-6 sm:p-10 md:p-14 bg-[#00B207] text-white">
              <h2 className="font-medium text-xs tracking-widest uppercase mb-3">— Our Mission</h2>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">Delivering Quality, Every Harvest</h1>
              <p className="leading-relaxed text-sm md:text-base">To provide high-quality bio-fertilizers and crop nutrition products that help farmers achieve healthier crops.</p>
            </div>
          </section>

          {/* Products Section */}
          <section id="products" className="mb-14 md:mb-20">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-10 md:mb-14">
              <div className="lg:w-1/2">
                <h2 className="text-[#00B207] font-medium text-xs tracking-widest uppercase mb-3">— Our Products</h2>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                  A Complete Range of <br /><span className="text-[#00B207]">Natural Solutions</span>
                </h1>
              </div>
              <div className="lg:w-1/2 lg:mt-auto">
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  Biological fertilizers, crop nutrients, soil conditioners, and bio-control agents — scientifically formulated for every farming need.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {productList.map((item, index) => (
                <div key={index} className="bg-white p-5 md:p-7 border border-[#00B207]/20 rounded-2xl flex flex-col items-start hover:border-[#00B207] transition-all group cursor-pointer">
                  <h3 className="text-[#00B207] text-xs font-medium tracking-wide mb-3">{item.cat}</h3>
                  <div className="w-10 h-10 mb-3 flex items-center justify-center bg-green-50 group-hover:bg-[#00B207] rounded-lg text-lg transition-all duration-300">{item.icon}</div>
                  <h4 className="text-base md:text-lg  mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Gallery Section */}
          <Section
            title={currentMeta.title}
            subtitle={currentMeta.subtitle}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paginatedIndustry.map((item, i) => (
                <Card key={i} {...item} />
              ))}
            </div>

            <div className="flex justify-center mt-8 gap-12">
              <button
                onClick={prevPage}
                className="w-12 h-12 rounded-full border border-[#00B207] text-[#00B207] hover:bg-[#00B207] hover:text-white transition-all duration-300"
              >
                &lt;
              </button>

              <button
                onClick={nextPage}
                className="w-12 h-12 rounded-full border border-[#00B207] text-[#00B207] hover:bg-[#00B207] hover:text-white transition-all duration-300"
              >
                &gt;
              </button>
            </div>
          </Section>

          {/* FAQ Section */}
          <section id="faq" className="py-10 md:py-16 border-t">
            <div className="flex flex-col lg:flex-row gap-8 md:gap-14">
              <div className="lg:w-1/3">
                <h2 className="text-[#00B207] font-medium text-xs tracking-widest uppercase mb-3">— FAQ</h2>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Common <span className="text-[#00B207]">Questions</span></h1>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">Everything you need to know about our products and services.</p>
              </div>
              <div className="lg:w-2/3">
                {faqList.map((item, i) => (
                  <div
                    key={i}
                    className="border-b cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <div className="flex justify-between items-center py-4 gap-4">
                      <span className={`text-sm md:text-base font-medium transition-colors ${openFaq === i ? 'text-[#00B207]' : 'text-gray-700'}`}>
                        {item.q}
                      </span>
                      <span className="w-7 h-7 rounded-full border border-[#00B207] text-[#00B207]  flex items-center justify-center shrink-0 font-bold text-base">
                        {openFaq === i ? '−' : '+'}
                      </span>
                    </div>
                    {openFaq === i && (
                      <div className="pb-4 text-sm text-gray-500 leading-relaxed pr-8">
                        {item.a && <p className="mb-2">{item.a}</p>}
                        {item.bullets && (
                          <ul className="list-none space-y-1 mt-1">
                            {item.bullets.map((point, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00B207] shrink-0"></span>
                                {point}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* ===== MARQUEE ANIMATION ===== */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 35s linear infinite;
        }
      `}</style>

    </div>
  );
};

export default AgricultureLanding;
