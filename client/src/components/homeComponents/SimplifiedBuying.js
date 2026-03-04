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
    <div className="w-full bg-white-100 py-2 px-4 ">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-8 px-6">
  Simplified Buying Process
</h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-white rounded-full p-6 shadow-sm mb-5">
              <img
                src={step.img}
                alt={step.title}
                className="w-22 h-22 object-contain"
              />
            </div>
            <p className="text-sm text-gray-500">Step {index + 1}</p>
            <h3 className="font-medium">{step.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}




