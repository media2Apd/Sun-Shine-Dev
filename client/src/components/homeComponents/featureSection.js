import React from "react";
import { Truck, Headphones, ShieldCheck, Box } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Truck size={28} className="text-green-600" />,
      title: "Free Shipping",
      desc: "Free shipping on all your order",
    },
    {
      icon: <Headphones size={28} className="text-green-600" />,
      title: "Customer Support 24/7",
      desc: "Instant access to Support",
    },
    {
      icon: <ShieldCheck size={28} className="text-green-600" />,
      title: "100% Secure Payment",
      desc: "We ensure your money is safe",
    },
    {
      icon: <Box size={28} className="text-green-600" />,
      title: "Money-Back Guarantee",
      desc: "30 Days Money-Back Guarantee",
    },
  ];

  return (
    <div className="bg-white-100 py-6 px-4">
      <div className="bg-white rounded-2xl shadow-md max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 text-center sm:text-left"
            >
              <div>{item.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-800 ">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">
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