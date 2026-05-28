import React, { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FAQPage = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

const faqData = [
  {
    question: "What products does Sunshine Agritech offer?",
    answer: "Sunshine Agritech offers bio-fertilizers, organic crop nutrients, soil health solutions, and plant growth promoters designed to support healthy crop growth and sustainable farming."
  },
  {
    question: "What are bio-fertilizers?",
    answer: "Bio-fertilizers are natural agricultural inputs containing beneficial microorganisms that improve soil fertility and help plants absorb nutrients effectively."
  },
  {
    question: "Are Sunshine Agritech products safe for crops and soil?",
    answer: "Yes. Our products are eco-friendly and developed to improve soil health, support plant growth, and promote sustainable agricultural practices."
  },
  {
    question: "Which crops can use Sunshine Agritech products?",
    answer: "Our products are suitable for a wide range of crops including paddy, vegetables, fruits, pulses, cotton, sugarcane, plantation crops, and horticultural crops."
  },
  {
    question: "How do bio-fertilizers benefit farmers?",
    answer: "Bio-fertilizers help:",
    bullets: ["Improve soil fertility", "Enhance root development", "Increase nutrient absorption", "Support better crop yield", "Reduce dependency on chemical fertilizers"]
  },
  {
    question: "How should the products be applied?",
    answer: "Depending on the product, applications may include:",
    bullets: ["Soil application", "Drip irrigation", "Seed treatment", "Foliar spray"]
  },
  {
    question: "Can Sunshine Agritech products improve crop yield?",
    answer: "Yes. Our products are designed to support healthier plant growth, stronger roots, improved nutrient uptake, and better overall crop productivity."
  },
  {
    question: "Are the products suitable for organic farming?",
    answer: "Many of our products are developed to support eco-friendly and sustainable farming practices. Please contact us for specific product recommendations."
  },
  {
    question: "How should the products be stored?",
    answer: "Products should be stored in a cool, dry place away from direct sunlight and moisture."
  },
  {
    question: "Why choose Sunshine Agritech?",
    answer: "Farmers trust Sunshine Agritech for:",
    bullets: ["Quality agricultural solutions", "Sustainable farming support", "Reliable product performance", "Farmer-focused approach", "Commitment to crop and soil health"]
  },
];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-5 md:px-10 lg:px-24 py-10">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-500 mb-8 hover:text-green-700 transition-colors"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about Sunshine products and how they can help improve your farming and harvest.
        </p>
      </div>

      {/* FAQ Accordion List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((item, index) => (
          <div 
            key={index} 
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
            >
              <div className="flex items-center gap-3">
                <HelpCircle size={20} className="text-green-600 shrink-0" />
                <span className=" text-gray-800 md:text-lg">
                  {item.question}
                </span>
              </div>
              {openIndex === index ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </button>

            {/* Answer with Animation */}
            <div 
             className={`overflow-hidden transition-all duration-300 ease-in-out ${
  openIndex === index ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
}`}
            >
              <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
  {item.answer && <p className="mb-2">{item.answer}</p>}
  {item.bullets && (
    <ul className="list-none space-y-1 mt-1">
      {item.bullets.map((point, idx) => (
        <li key={idx} className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00B207] shrink-0"></span>
          {point}
        </li>
      ))}
    </ul>
  )}
</div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Support Section */}
      <div className="mt-16 text-center bg-green-50 p-8 rounded-2xl border border-green-100">
        <h3 className="text-xl font-bold text-green-800 mb-2">
          Still have questions?
        </h3>
        <p className="text-green-700 mb-6">
          Our agricultural experts are here to help you choose the best solution for your farm.
        </p>
        <button 
          onClick={() => navigate("/contact-us")}
          className="bg-[#00B207] text-white px-8 py-3 rounded-full font-semibold transition shadow-lg "
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default FAQPage;