import React from 'react';
import PolicyLayout from '../../components/PolicyLayout';
import { 
  ArrowLeftRight, PackageCheck, Clock, ShieldCheck, 
  Mail, AlertCircle, Package, UserCheck 
} from "lucide-react";

export default function ExchangePolicy() {
  return (
    <PolicyLayout>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Exchange Policy</h1>
        <p className="text-gray-400 text-xs mb-10 flex items-center gap-2 font-medium">
          Last Updated: April 01, 2026
        </p>

        {/* Introduction */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-green-50 p-2.5 rounded-xl text-[#45A301]">
               <ShieldCheck size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Our Commitment</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-[15px]">
            At <span className="font-semibold text-gray-900">Sunshine International Agritech</span>, customer satisfaction is our top priority. We understand that sometimes an exchange is necessary to ensure you have the right products for your agricultural needs.
          </p>
        </section>

        {/* Exchange Conditions - GRID */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
               <PackageCheck size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Exchange Conditions</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { 
                title: "Unused Condition", 
                desc: "The product must be completely unused and in the same condition as received.", 
                icon: <Package size={20} />, 
                color: "bg-blue-600" 
              },
              { 
                title: "Original Packaging", 
                desc: "All original packaging, labels, and seals must be intact and undamaged.", 
                icon: <PackageCheck size={20} />, 
                color: "bg-purple-600" 
              },
              { 
                title: "7-Day Window", 
                desc: "Exchange requests must be submitted within 7 days of the delivery date.", 
                icon: <Clock size={20} />, 
                color: "bg-orange-600" 
              },
              { 
                title: "Damage Reporting", 
                desc: "Any physical damage must be reported within 24 hours of receiving the product.", 
                icon: <AlertCircle size={20} />, 
                color: "bg-red-600" 
              }
            ].map((item, index) => (
              <div key={index} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4 ${item.color}`}>
                   {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-[15px] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process Flow */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600">
               <ArrowLeftRight size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">The Exchange Process</h2>
          </div>

          <div className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="flex-1 space-y-4">
                <div className="flex items-start gap-4">
                   <div className="bg-[#45A301] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                   <p className="text-gray-600 text-sm">Submit your exchange request via email with photos of the product and packaging.</p>
                </div>
                <div className="flex items-start gap-4">
                   <div className="bg-[#45A301] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                   <p className="text-gray-600 text-sm">Our quality control team will review your request based on the conditions above.</p>
                </div>
                <div className="flex items-start gap-4">
                   <div className="bg-[#45A301] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                   <p className="text-gray-600 text-sm">Once approved, we will provide instructions for returning the original item and shipping the replacement.</p>
                </div>
              </div>
              
              <div className="w-full md:w-64 bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm flex flex-col items-center text-center">
                 <div className="bg-indigo-50 p-3 rounded-full text-indigo-600 mb-3">
                    <UserCheck size={24} />
                 </div>
                 <h4 className="text-sm font-bold text-gray-900 mb-1">Approval Required</h4>
                 <p className="text-[11px] text-gray-500">Exchanges are only processed after a formal approval from our team.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="mb-20 bg-[#45A301]/5 p-8 rounded-3xl border border-[#45A301]/10 text-center">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Initiate an Exchange</h2>
            <p className="text-gray-500 text-sm mb-6">Please send your order ID and the reason for exchange to our support email.</p>
            <a 
              href="mailto:sunshineagreetech@gmail.com" 
              className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-2xl shadow-sm border border-gray-100 hover:border-[#45A301] transition-all group"
            >
               <Mail className="text-[#45A301] group-hover:scale-110 transition-transform" size={20} />
               <span className="text-[15px] font-semibold text-gray-700">sunshineagreetech@gmail.com</span>
            </a>
          </div>
        </section>

      </div>
    </PolicyLayout>
  );
}