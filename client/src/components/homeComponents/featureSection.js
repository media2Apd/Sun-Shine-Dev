import React from "react";
import { Truck, Headphones, ShieldCheck, Box } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Truck size={28} className="text-[#00B207]" />,
      title: "Free Shipping",
      desc: "Free shipping on all your order",
    },
    {
      icon: <Headphones size={28} className="text-[#00B207]" />,
      title: "Customer Support 24/7",
      desc: "Instant access to Support",
    },
    {
      icon: <ShieldCheck size={28} className="text-[#00B207]" />,
      title: "100% Secure Payment",
      desc: "We ensure your money is safe",
    },
    {
      icon: <Box size={28} className="text-[#00B207]" />,
      title: "Money-Back Guarantee",
      desc: "30 Days Money-Back Guarantee",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto bg-white py-4 px-4 md:px-8 ">
      <div className="bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.08)] p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 text-center sm:text-left"
            >
              <div >{item.icon}</div>
              <div>
                <h3 className="font-semibold text-[#1A1A1A] ">
                  {item.title}
                </h3>
                <p className="text-sm text-[#999999]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;