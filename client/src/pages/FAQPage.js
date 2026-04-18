import React, { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FAQPage = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "What is Sunshine?",
      answer: "Sunshine is an agricultural brand offering organic manures, bio fertilizers, bio pesticides, plant growth promoters and specialty nutrients for better crop growth and soil health."
    },
    {
      question: "Are Sunshine products safe for organic farming?",
      answer: "Yes, Sunshine products are eco-friendly and support sustainable farming practices."
    },
    {
      question: "Which crops are suitable for Sunshine products?",
      answer: "Sunshine products are suitable for all crops, including field crops, vegetables, fruits, flowers, plantation crops, and horticultural crops."
    },
    {
      question: "How do bio fertilizers help crops?",
      answer: "Bio fertilizers improve plant growth by increasing nutrient availability like nitrogen and phosphorus naturally and improving root development."
    },
    {
      question: "What is the use of Vermicompost Green Gold?",
      answer: "Green Gold Vermicompost improves soil fertility, soil structure, and crop productivity by adding natural nutrients and beneficial microorganisms."
    },
    {
      question: "How can I apply Sunshine products?",
      answer: "Sunshine products can be applied through soil application, seed treatment, root dipping, drip irrigation, or foliar spray, based on the product type."
    },
    {
      question: "What are bio pesticides used for?",
      answer: "Bio pesticides help control pests and diseases naturally without harming beneficial insects and maintaining soil microbial balance."
    },
    {
      question: "Can I use Sunshine products with chemical fertilizers?",
      answer: "Yes, most Sunshine products can be used along with chemical fertilizers, but for best results, follow recommended usage instructions."
    },
    {
      question: "How do plant growth promoters help plants?",
      answer: "Plant growth promoters improve flowering, fruit setting, plant vigor, and stress tolerance for better yield and crop performance."
    },
    {
      question: "How do I choose the right Sunshine product for my crop?",
      answer: "You can choose products based on your crop needs such as soil improvement, nitrogen support, pest control, disease control, or growth boosting. Our team can guide you to select the best solution."
    }
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
                openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                {item.answer}
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