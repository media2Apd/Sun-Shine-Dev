import React from "react";
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";

const BannerSection = () => {
  return (
    <div className="container mx-auto bg-white py-4 px-8">
      <div className="flex flex-col md:flex-row gap-8">

        {/* Left Banner */}
        <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-md">
          <img
            src={banner1}
            alt="Banner1"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Banner */}
        <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-md">
          <img
            src={banner2}
            alt="Banner2"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default BannerSection;