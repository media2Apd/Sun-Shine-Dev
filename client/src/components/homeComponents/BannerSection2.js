import React from "react";
import banner3 from "../../assets/banner3.png";
import banner4 from "../../assets/banner4.png";

const BannerSection2 = () => {
  return (
    <div className="container mx-auto bg-white py-4  px-4 md:px-8">
      <div className="flex flex-col md:flex-row gap-8">

        {/* Left Banner */}
        <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-md">
          <img
            src={banner3}
            alt="Banner3"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Banner */}
        <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-md">
          <img
            src={banner4}
            alt="Banner4"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default BannerSection2;