import React from 'react';
import PolicyLayout from '../../components/PolicyLayout';
import { 
  Truck, Clock, Package, MapPin, 
  CloudLightning, AlertCircle, ShieldCheck, 
  Smartphone, Mail, CheckCircle2 
} from "lucide-react";

export default function ShippingPolicy() {
  return (
    <PolicyLayout>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Shipping Policy</h1>
        <p className="text-gray-400 text-xs mb-10 flex items-center gap-2 font-medium">
          Last Updated: April 01, 2026
        </p>

        {/* 1. Delivery Timeline - GRID CARDS */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-50 p-2.5 rounded-xl text-[#45A301]">
               <Clock size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">1. Processing & Delivery</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Package size={20} />
              </div>
              <h3 className="font-bold text-gray-900 text-[15px] mb-2">Order Processing</h3>
              <p className="text-gray-500 text-[13px] leading-relaxed">
                All orders are processed within <span className="font-semibold text-gray-800">24–48 hours</span> (excluding Sundays and Public Holidays).
              </p>
            </div>

            <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <Truck size={20} />
              </div>
              <h3 className="font-bold text-gray-900 text-[15px] mb-2">Delivery Time</h3>
              <p className="text-gray-500 text-[13px] leading-relaxed">
                Most orders reach their destination within <span className="font-semibold text-gray-800">3–7 business days</span> depending on your location.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Shipping Details */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
               <ShieldCheck size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">2. Shipping Details</h2>
          </div>

          <div className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <Smartphone size={18} className="text-blue-500" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold text-[15px]">Real-time Tracking</h4>
                  <p className="text-gray-600 text-sm">Tracking details are automatically shared via <span className="font-medium">SMS and Email</span> once the order is dispatched.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <Package size={18} className="text-[#45A301]" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold text-[15px]">Secure Packaging</h4>
                  <p className="text-gray-600 text-sm">Products are packed securely with industrial-grade materials to avoid any damage during transit.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <CheckCircle2 size={18} className="text-orange-500" />
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold text-[15px]">Free Delivery</h4>
                  <p className="text-gray-600 text-sm">Free delivery is available on all eligible orders (subject to order value and promotional offers).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Delivery Delays - IMPORTANT NOTE */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-50 p-2.5 rounded-xl text-orange-600">
               <AlertCircle size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">3. Potential Delays</h2>
          </div>
          
          <div className="p-6 bg-orange-50/30 border border-orange-100 rounded-2xl">
            <p className="text-gray-700 text-sm mb-6 font-medium">
              While we strive for on-time delivery, please note that delays may occur due to:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-orange-50">
                <MapPin size={18} className="text-orange-500" />
                <span className="text-gray-600 text-xs font-semibold uppercase">Remote Locations</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-orange-50">
                <CloudLightning size={18} className="text-orange-500" />
                <span className="text-gray-600 text-xs font-semibold uppercase">Weather Conditions</span>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-orange-50">
                <AlertCircle size={18} className="text-orange-500" />
                <span className="text-gray-600 text-xs font-semibold uppercase">Courier Issues</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Contact for Shipping Queries */}
        <section className="mb-20 bg-[#45A301]/5 p-8 rounded-3xl border border-[#45A301]/10 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Track Your Order</h2>
          <p className="text-gray-500 text-sm mb-6">Need help with your delivery status? Reach out to our logistics team.</p>
          <div className="flex justify-center">
            <a 
              href="mailto:sunshineagreetech@gmail.com" 
              className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 hover:border-[#45A301] transition-all group"
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