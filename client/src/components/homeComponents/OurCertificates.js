import React from "react";
import tnpcb from "../../assets/certificate1.png";
import nsic from "../../assets/certificate2.png";
import iaf from "../../assets/certificate3.png";    



export function OurCertificates() {
  const certificates = [
    tnpcb,
    nsic,
    iaf,
  ];

  return (
    
<div className="container mx-auto bg-white py-4 px-4">
    <div className="flex justify-between items-center mb-10">
    <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold">
      Our Certificates
    </h2>
    </div>
    <div className="bg-white border border-[#E6E6E6] rounded-xl max-w-5xl mx-auto shadow-[0_0_10px_rgba(0,0,0,0.08)] py-10 flex flex-col md:flex-row justify-center items-center gap-10">
      {certificates.map((logo, index) => (
        <img
          key={index}
          src={logo}
          alt="certificate"
          className="h-28  px-4 object-contain"
        />
      ))}
  </div>
</div>
  );
}