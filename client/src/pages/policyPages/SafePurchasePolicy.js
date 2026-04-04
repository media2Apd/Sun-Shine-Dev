import React from 'react';
import PolicyLayout from '../../components/PolicyLayout';
import { 
  ShieldCheck, Lock, Award, Leaf, 
  CreditCard, EyeOff, Users, Headphones, 
  CheckCircle2, Zap, ShieldAlert 
} from "lucide-react";

export default function SafePurchasePolicy() {
  return (
    <PolicyLayout>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Safe Purchase</h1>
        <p className="text-gray-400 text-xs mb-10 flex items-center gap-2 font-medium">
          Last Updated: April 01, 2026
        </p>

        {/* 1. Secure Shopping Experience */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-green-50 p-2.5 rounded-xl text-[#45A301]">
               <ShieldCheck size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Secure Shopping</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-[15px]">
            At <span className="font-semibold text-gray-900">Sunshine International Agritech</span>, we prioritize your security. We provide a safe and reliable online purchasing experience, ensuring that every transaction you make is protected by industry-leading security protocols.
          </p>
        </section>

        {/* 2. Product Quality Pillars - GRID */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
               <Award size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Product Quality Assurance</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm flex gap-4">
              <div className="bg-green-100 p-3 rounded-xl text-green-700 h-fit">
                <Leaf size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-[15px] mb-1">Eco-Friendly Inputs</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">Our agricultural products are designed to be environmentally sustainable and safe for your soil.</p>
              </div>
            </div>

            <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm flex gap-4">
              <div className="bg-blue-100 p-3 rounded-xl text-blue-700 h-fit">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-[15px] mb-1">Effectiveness Tested</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">Every batch is tested for quality and high-yield effectiveness before reaching your farm.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Payment Security - HIGHLIGHT BOX */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
               <Lock size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Payment Security</h2>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
            {/* Background Decorative Icon */}
            <ShieldAlert size={140} className="absolute -right-10 -bottom-10 text-white/5 rotate-12" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest mb-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                Bank-Grade Protection
              </div>
              <p className="text-gray-300 text-[15px] mb-8 max-w-xl">
                We integrate with secure payment gateways to ensure your financial data is never compromised.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <CreditCard className="text-blue-400" size={20} />
                  <span className="text-sm font-medium">Secure Gateway Integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-blue-400" size={20} />
                  <span className="text-sm font-medium">SSL Encryption Layers</span>
                </div>
                <div className="flex items-center gap-3">
                  <EyeOff className="text-blue-400" size={20} />
                  <span className="text-sm font-medium">No Card Details Stored</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Trust & Reliability */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-50 p-2.5 rounded-xl text-orange-600">
               <Users size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Trust & Reliability</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Users />, label: "Trusted by Farmers", desc: "Serving thousands across the region." },
              { icon: <CheckCircle2 />, label: "Quality Assured", desc: "100% genuine agri-inputs." },
              { icon: <Headphones />, label: "Live Support", desc: "Dedicated team for your queries." }
            ].map((item, i) => (
              <div key={i} className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                 <div className="text-[#45A301] mb-3">{item.icon}</div>
                 <h4 className="text-sm font-bold text-gray-900 mb-1">{item.label}</h4>
                 <p className="text-[11px] text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Protection Note */}
        <div className="mb-20 flex flex-col md:flex-row items-center justify-between p-6 bg-green-50/50 border border-green-100 rounded-2xl gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <ShieldCheck className="text-[#45A301]" size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 leading-tight">100% Safe Checkout</p>
              <p className="text-[11px] text-gray-500 uppercase font-bold tracking-tighter">Your data is safe with us</p>
            </div>
          </div>
          <div className="flex items-center gap-6 grayscale opacity-60">
             <span className="text-xs font-bold text-gray-400">SSL SECURE</span>
             <span className="text-xs font-bold text-gray-400">ENCRYPTED</span>
             <span className="text-xs font-bold text-gray-400">VERIFIED</span>
          </div>
        </div>

      </div>
    </PolicyLayout>
  );
}