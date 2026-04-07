import React from "react";
import step1 from "../../assets/buying1.png";
import step2 from "../../assets/buying2.png";
import step3 from "../../assets/buying3.png";
import step4 from "../../assets/buying4.png";   


export function SimplifiedBuyingProcess() {
  const steps = [
    { title: "Browse Products", img: step1 },
    { title: "Add to Cart", img: step2 },
    { title: "Payment", img: step3 },
    { title: "Delivery done", img: step4 },
  ];

  return (
    <div className="container mx-auto bg-white py-4  px-4 md:px-8">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold">Simplified Buying Process</h2>
      </div>
      <div className=" grid grid-cols-2 md:grid-cols-4 gap-10">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-white rounded-full p-6 mb-5">
              <img
                src={step.img}
                alt={step.title}
                className="w-22 h-22 object-contain"
              />
            </div>
            <p className="text-sm text-black">Step {index + 1}</p>
            <h3 className="font-medium text-base text-black">{step.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}




