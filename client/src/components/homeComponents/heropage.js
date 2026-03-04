import React from "react";

import HeroImage from '../../assets/HeroImage.webp'   
    

const HeroPage = () => {
  return (
    <div className="relative w-full  overflow-hidden padding-0 leading-none">
      
      {/* Background Image */}
      <img
        src={HeroImage}
        alt="Background"
        className="relative w-full h-screen overflow-hidden leading-none"
      />

         {/* Overlay Text */}   
      <div className="absolute left-10 bottom-10 -translate-y-1/1 bg-black/40 backdrop-blur-sm text-white p-8 rounded-md w-[600px] z-20">
        
        <h1 className="text-2l font-semibold leading-relaxed mb-4">
          எரியம் நன்றாக எவிடுகெ கடட்பின் <br />
          நிரயம் நன்றக காப்பு.
        </h1>
         
          <p className="text-sm text-gray-300 text-right">
          திருக்குறள் - குறள் - 1038
        </p>

        <p className="text-lg mb-3">
          To cast manure is better than to plough; <br />
          Weed well; to guard is more than watering now.
        </p>

        <p className="text-sm text-gray-300 text-right">
          Thirukkural - Kural - 1038
        </p>
      </div>

      

    </div>

    
  );
};

export default HeroPage;