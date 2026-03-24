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
    
    // <div className="w-full bg-white-100 py-10 px-10">
      
    //   <div className="max-w-5xl mx-auto">
    //     <h1 className="text-3xl font-semibold mb-6 px-2">Our Certificates</h1>
<div className="container mx-auto bg-white py-4 px-8">
  <div>
    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-8 px-6">
      Our Certificates
    </h2>

    <div className="bg-white rounded-2xl max-w-5xl mx-auto shadow-[0_10px_30px_rgba(0,0,0,0.05)] py-10 flex flex-col md:flex-row justify-center items-center gap-10">
      {certificates.map((logo, index) => (
        <img
          key={index}
          src={logo}
          alt="certificate"
          className="h-20 object-contain"
        />
      ))}
    </div>
  </div>
</div>
  );
}