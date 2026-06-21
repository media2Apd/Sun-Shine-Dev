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

// import React, { useMemo } from "react";
// // thirukkural.json 
// import thirukkuralData from "../../assets/thirukkural.json"; 

// import HeroImage from '../../assets/HeroImage.png'; // 1696*624px
// import HeroImageMobile from '../../assets/HeroImageMobile.png'; // 410*600px

// const HeroPage = () => {
//   // Daily Kural Logic
//   const dailyKural = useMemo(() => {
//     const kurals = thirukkuralData.kural;
//     const totalKurals = kurals.length; // 1330
    
//     const now = new Date();
//     // calculate days to ensure we get a new kural every day, and it loops back after 1330 days
//     const daysSinceEpoch = Math.floor(now.getTime() / (1000 * 60 * 60 * 24));
//     const kuralIndex = daysSinceEpoch % totalKurals;
    
//     return kurals[kuralIndex];
//   }, []);

//   return (
//     <div className="relative w-full h-[400px] md:h-[600px] lg:h-[91.5vh] overflow-hidden p-0 leading-none">
      
//       {/* Background Image Logic */}
//       <picture>
//         {/* Mobile screen (max-width: 768px) */}
//         <source media="(max-width: 768px)" srcSet={HeroImageMobile} />
        
//         {/* Laptop/Desktop screen */}
//         <img
//           src={HeroImage}
//           alt="Thiruvalluvar"
//           // 'object-contain' ensures the full image is visible, and 'object-center' centers it in the container, preventing cropping.
//           className="w-full h-full object-contain object-center shadow-inner"
//         />
//       </picture>

//       {/* Overlay Text - Responsive */}
//       <div className="absolute left-2 bottom-8 md:left-10 md:bottom-16 bg-black/40 backdrop-blur-sm text-white p-2 md:p-6 rounded-xl w-[95%] md:w-[500px] lg:w-[600px] z-20 border border-white/10 shadow-2xl">
        
//         {/* Tamil Kural */}
//         <h1 className="text-[11px] md:text-sm font-bold leading-relaxed mb-2 drop-shadow-lg">
//           {dailyKural.Line1} <br />
//           {dailyKural.Line2}
//         </h1>
          
//         <p className="text-[10px] md:text-xs text-gray-300 text-right italic mb-4">
//           திருக்குறள் - குறள் - {dailyKural.Number}
//         </p>

//         {/* Divider line */}
//         <div className="h-[1px] w-full bg-white/20 mb-4"></div>

//         {/* English Translation */}
//         <p className="text-[11px] md:text-sm font-medium leading-normal mb-2 opacity-90">
//           {dailyKural.Translation}
//         </p>

//         <p className="text-[10px] md:text-xs text-gray-300 text-right italic">
//           Thirukkural - Kural - {dailyKural.Number}
//         </p>
//       </div>

//     </div>
//   );
// };

// export default HeroPage;

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import thirukkuralData from "../../assets/thirukkural.json";
import HeroImageDesktop from "../../assets/HeroImage.png";
import HeroImageMobile from "../../assets/HeroImageMobile.png";
import logo from "../../assets/logo.svg";

const HeroPage = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const dailyKural = useMemo(() => {
    const kurals = thirukkuralData.kural;
    const totalKurals = kurals.length;

    const now = new Date();
    const daysSinceEpoch = Math.floor(
      now.getTime() / (1000 * 60 * 60 * 24)
    );

    return kurals[daysSinceEpoch % totalKurals];
  }, []);

  return (
    <>
      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-green-950 via-green-900 to-black px-4"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src={logo}
              alt="Sunshine Logo"
              className="w-32 sm:w-40 md:w-52"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: [0.4, 1.1, 1], opacity: 1 }}
              transition={{ duration: 1.8 }}
            />

            <motion.h1
              className="mt-6 text-3xl font-bold text-green-400 sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Sunshine
            </motion.h1>

            <motion.p
              className="mt-3 text-center text-green-300 text-sm sm:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              Gives Sunrise In Each Plant
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      {!showSplash && (
        <section className="relative min-h-screen overflow-hidden">
          {/* Desktop Image */}
          <img
            src={HeroImageDesktop}
            alt="Hero"
            className="hidden md:block absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Mobile Image */}
          <img
            src={HeroImageMobile}
            alt="Hero"
            className="md:hidden absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/45 z-10" />

          {/* Content */}
          <div
            className="
              relative
              z-20
              flex
              justify-center
              items-start
              md:items-center
              min-h-screen
              px-4
              pt-28
              pb-10
              md:pt-0
            "
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="
                w-full
                max-w-[900px]
                rounded-[35px]
                border
                border-green-400/20
                bg-black/50
                backdrop-blur-xl
                shadow-[0_0_40px_rgba(0,0,0,0.5)]
                p-5
                sm:p-8
                md:p-10
                lg:p-12
              "
            >
              <div className="text-center">
                <p
                  className="
                    text-green-200
                    tracking-[0.25em]
                    uppercase
                    text-xs
                    sm:text-sm
                    mb-4
                  "
                >
                  திருக்குறள்
                </p>

                <h1
                  className="
                    text-green-50
                    font-bold
                    leading-tight

                    text-[26px]
                    sm:text-[38px]
                    md:text-[52px]
                    lg:text-[64px]
                  "
                >
                  {dailyKural.Line1}
                  <br />
                  {dailyKural.Line2}
                </h1>

                <p
                  className="
                    mt-4
                    text-right
                    italic
                    text-green-200
                    text-sm
                    md:text-lg
                  "
                >
                  திருக்குறள் - குறள் - {dailyKural.Number}
                </p>

                <div className="w-36 h-px bg-gradient-to-r from-transparent via-green-300 to-transparent mx-auto my-6" />

                <p
                  className="
                    text-green-100
                    leading-relaxed
                    max-w-3xl
                    mx-auto

                    text-base
                    sm:text-lg
                    md:text-xl
                    lg:text-2xl
                  "
                >
                  {dailyKural.Translation}
                </p>

                <p
                  className="
                    mt-5
                    text-right
                    italic
                    text-green-200
                    text-sm
                    md:text-lg
                  "
                >
                  Thirukkural - Kural - {dailyKural.Number}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
};

export default HeroPage;