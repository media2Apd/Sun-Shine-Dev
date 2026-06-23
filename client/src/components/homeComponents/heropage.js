// import React from "react";

// import HeroImage from '../../assets/HeroImage.webp';
// import HeroImageMobile from '../../assets/HeroImageMobile.webp';
    

// const HeroPage = () => {
//   return (
//     <div className="relative w-full  overflow-hidden padding-0 leading-none">
      
//       {/* Background Image */}
//       <img
//         src={HeroImage}
//         alt="Background"
//         className="relative w-full h-screen overflow-hidden"
//       />

//          {/* Overlay Text */}   
//       <div className="absolute left-10 bottom-10 -translate-y-1/1 bg-black/40 backdrop-blur-sm text-white p-8 rounded-md w-[600px] z-20">
        
//         <h1 className="text-2l font-semibold leading-relaxed mb-4">
//           எரியம் நன்றாக எவிடுகெ கடட்பின் <br />
//           நிரயம் நன்றக காப்பு.
//         </h1>
         
//           <p className="text-sm text-gray-300 text-right">
//           திருக்குறள் - குறள் - 1038
//         </p>

//         <p className="text-lg mb-3">
//           To cast manure is better than to plough; <br />
//           Weed well; to guard is more than watering now.
//         </p>

//         <p className="text-sm text-gray-300 text-right">
//           Thirukkural - Kural - 1038
//         </p>
//       </div>

      

//     </div>

    
//   );
// };

// // export default HeroPage;

// import React, { useMemo } from "react";
// // JSON கோப்பை இம்போர்ட் செய்கிறோம்
// import thirukkuralData from "../../assets/thirukkural.json"; 

// import HeroImage from '../../assets/HeroImage.webp';
// import HeroImageMobile from '../../assets/HeroImageMobile.webp';

// const HeroPage = () => {
//   // இன்றைய நாளுக்கான குறளைக் கண்டறியும் லாஜிக்
//   const dailyKural = useMemo(() => {
//     const kurals = thirukkuralData.kural;
//     const totalKurals = kurals.length; // 1330
    
//     // இன்றைய தேதியை மில்லிசெகண்ட்ஸில் எடுத்து, நாட்களாக மாற்றுகிறோம்
//     const now = new Date();
//     const daysSinceEpoch = Math.floor(now.getTime() / (1000 * 60 * 60 * 24));
    
//     // Modulo (%) பயன்படுத்துவதன் மூலம் 1330 நாட்களுக்குப் பிறகு மீண்டும் 1-ல் இருந்து தொடங்கும்
//     const kuralIndex = daysSinceEpoch % totalKurals;
    
//     return kurals[kuralIndex];
//   }, []);

//   return (
//     <div className="relative w-full h-screen overflow-hidden p-0 leading-none">
      
//       {/* Background Images - Responsive Logic */}
//       <picture>
//         {/* Mobile screens (max-width: 768px) க்கு HeroImageMobile */}
//         <source media="(max-width: 768px)" srcSet={HeroImageMobile} />
//         {/* Larger screens க்கு HeroImage */}
//         <img
//           src={HeroImage}
//           alt="Background"
//           className="w-full h-screen object-cover"
//         />
//       </picture>

//       {/* Overlay Text Container */}
//       <div className="absolute left-4 bottom-10 md:left-10 md:bottom-20 bg-black/50 backdrop-blur-md text-white p-6 md:p-8 rounded-lg w-[90%] md:w-[600px] z-20 shadow-2xl border border-white/10">
        
//         {/* Tamil Kural */}
//         <h1 className="text-xs md:text-sm font-bold leading-relaxed mb-2 text-white">
//           {dailyKural.Line1} <br />
//           {dailyKural.Line2}
//         </h1>
         
//         <p className="text-xs md:text-sm text-gray-300 text-right italic mb-4">
//           திருக்குறள் - குறள் - {dailyKural.Number}
//         </p>

//         <hr className="border-white/20 mb-4" />

//         {/* English Translation */}
//         <p className="text-xs md:text-sm font-medium mb-2 leading-snug">
//           {dailyKural.Translation}
//         </p>

//         <p className="text-xs md:text-sm text-gray-300 text-right italic">
//           Thirukkural - Kural - {dailyKural.Number}
//         </p>
//       </div>

//     </div>
//   );
// };

// export default HeroPage;

import React, { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import thirukkuralData from "../../assets/thirukkural.json";
import HeroImage from "../../assets/HeroImage.webp";
import HeroImageMobile from "../../assets/HeroImageMobile.webp";
import logo from "../../assets/logo.svg"; 

const HeroPage = () => {
  const location = useLocation(); // Get current path
  const isHomePage = location.pathname === "/";
  const [showIntro, setShowIntro] = useState(isHomePage);

  // Smoothly transition from Intro to your original Hero after 4.5 seconds
  useEffect(() => {
    // If not on home page, ensure intro is hidden
    if (!isHomePage) {
      setShowIntro(false);
      return;
    }

    // If on home page, start the timer
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, [isHomePage]); // Re-run if path changes

  const dailyKural = useMemo(() => {
    const kurals = thirukkuralData.kural;
    const totalKurals = kurals.length;

    const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));

    return kurals[daysSinceEpoch % totalKurals];
  }, []);

  // Split slogan for the words reveal effect
  const sloganText = "Sunshine Gives Sunrise In Each Plant";
  const sloganWords = sloganText.split(" ");

  return (
    <div className="w-full bg-white">
      <AnimatePresence mode="wait">
        {isHomePage && showIntro ? (
          /* ================= 1. PREMIUM WHITE INTRO ANIMATION ================= */
          <motion.div
            key="intro-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white p-6 text-center"
          >
            {/* Ambient Sun Rays Rotating behind logo */}
            <div className="relative mb-8">
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-[#facc15]/35"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <svg className="w-48 h-48 filter blur-[1px]" viewBox="0 0 100 100" fill="currentColor">
                  {[...Array(8)].map((_, idx) => (
                    <rect key={idx} x="47" y="2" width="6" height="22" rx="3" transform={`rotate(${idx * 45} 50 50)`} />
                  ))}
                </svg>
              </motion.div>

              {/* Logo from logo.svg with Zoom-in Effect */}
              <motion.img
                src={logo}
                alt="Sunshine International Agritech Logo"
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 60, delay: 0.2 }}
                className="relative z-10 w-28 h-28 object-contain filter drop-shadow-[0_8px_16px_rgba(22,163,74,0.15)]"
              />
            </div>

            {/* Corporate Name Reveal */}
            <motion.h1
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-2xl md:text-3xl font-extrabold tracking-wider uppercase text-[#11381e]"
            >
              Sunshine International Agritech
            </motion.h1>

            {/* Slogan Word Reveal Animation */}
            <div className="mt-4 flex flex-wrap justify-center gap-x-2 text-lg md:text-xl font-bold text-[#f97316]">
              {sloganWords.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.2 + index * 0.15,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Secondary Line */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.6 }}
              className="mt-5 text-sm max-w-md text-neutral-600 font-medium tracking-wide"
            >
              Quality Organic & Inorganic Fertilizers Directly to the Plant Roots
            </motion.p>

            {/* Floating Leaves Animation Background Details */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-[#22c55e]/15 pointer-events-none hidden sm:block"
                style={{
                  top: `${15 + i * 20}%`,
                  left: i % 2 === 0 ? "10%" : "85%",
                }}
                animate={{ y: [0, -20, 0], rotate: [0, 20, 0] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C12,19.8 15.86,16.5 17,13C18,13 22,10 22,5C22,2.5 21,2 20,2C15,2 12,6 12,7C10.5,6.5 7,6.5 4,10C3.2,11 4,12 5,12C7,12 9,9 12,9C11,12 13,17 17,18C18.66,15 19,10 17,8Z" />
                </svg>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* ================= 2. YOUR HERO BANNER ================= */
          <motion.div
            key="hero-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full"
          >
            {/* Hero Image */}
            <picture>
              <source media="(max-width:768px)" srcSet={HeroImageMobile} />

              <img
                src={HeroImage}
                alt="Thiruvalluvar"
                className="w-full h-auto block mt-14"
              />
            </picture>

            {/* ================= MOBILE ================= */}
            <div
              className="
                absolute
                md:hidden
                top-[37%]
                left-[10%]
                w-[72%]
                text-center
                flex flex-col items-center justify-center
              "
            >
              <h2
                className="inline-flex flex-col items-start font-bold text-black text-left leading-tight"
                style={{
                  fontSize: "clamp(7.5px, 2.2vw, 12px)",
                }}
              >
                <div className="whitespace-nowrap">{dailyKural.Line1}</div>
                <div className="whitespace-nowrap">{dailyKural.Line2}</div>
              </h2>

              <p
                className="italic text-black/90 mt-1"
                style={{
                  fontSize: "clamp(6.5px, 1.8vw, 9.5px)",
                }}
              >
                திருக்குறள் - குறள் - {dailyKural.Number}
              </p>

              <div className="w-full h-px bg-white/20 my-2" />

              <p
                className="text-black leading-relaxed max-w-[90%]"
                style={{
                  fontSize: "clamp(7.5px, 2vw, 11px)",
                }}
              >
                {dailyKural.Translation}
              </p>

              <p
                className="italic text-black/90 mt-1"
                style={{
                  fontSize: "clamp(6.5px, 1.8vw, 9.5px)",
                }}
              >
                Thirukkural - Kural - {dailyKural.Number}
              </p>
            </div>

            {/* ================= TABLET ================= */}
            <div
              className="
                hidden md:flex lg:hidden
                absolute
                top-[38%] 
                left-[18%]
                w-[45%]
                text-center
                flex-col items-center justify-center
              "
            >
              <h2
                className="inline-flex flex-col items-start font-bold text-black text-left leading-tight"
                style={{
                  fontSize: "clamp(11px, 1.6vw, 15px)",
                }}
              >
                <div className="whitespace-nowrap">{dailyKural.Line1}</div>
                <div className="whitespace-nowrap">{dailyKural.Line2}</div>
              </h2>

              <p className="italic text-black/90 mt-1.5 text-[11px]">
                திருக்குறள் - குறள் - {dailyKural.Number}
              </p>

              <div className="w-full h-px bg-white/20 my-2.5" />

              <p className="text-black text-[12px] leading-relaxed max-w-[90%]">
                {dailyKural.Translation}
              </p>

              <p className="italic text-black/90 mt-1.5 text-[11px]">
                Thirukkural - Kural - {dailyKural.Number}
              </p>
            </div>

            {/* ================= DESKTOP / LAPTOP ================= */}
            <div
              className="
                hidden lg:flex
                absolute
                top-[25%] 2xl:top-[35%]
                left-[15.3%]
                xl:left-[15%]
                w-[35%]
                text-center
                flex-col items-center justify-center
              "
            >
              <h2
                className="inline-flex flex-col items-start font-bold text-black text-left leading-tight drop-shadow-sm"
                style={{
                  fontSize: "clamp(11px, 1vw, 16px)",
                }}
              >
                <div className="whitespace-nowrap">{dailyKural.Line1}</div>
                <div className="whitespace-nowrap">{dailyKural.Line2}</div>
              </h2>

              <p
                className="italic text-black/90 mt-1.5 text-[11px]"
              >
                திருக்குறள் - குறள் - {dailyKural.Number}
              </p>

              <div className="w-full h-px bg-white/15 my-2.5" />

              <p
                className="text-black leading-relaxed max-w-[95%] text-[12px] drop-shadow-sm px-2"
              >
                {dailyKural.Translation}
              </p>

              <p
                className="italic text-black/90 mt-1.5 text-[11px]"
              >
                Thirukkural - Kural - {dailyKural.Number}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroPage;