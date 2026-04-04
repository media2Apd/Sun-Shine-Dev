import React from 'react';
import PolicyLayout from '../../components/PolicyLayout';
import { 
  RotateCcw, XCircle, CheckCircle2, CreditCard, 
  Clock, AlertCircle, MapPin, Phone, Mail, 
  ShieldCheck, Ban, History 
} from "lucide-react";

export default function ReturnAndRefundPolicy() {
  return (
    <PolicyLayout>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Return & Refund Policy</h1>
        <p className="text-gray-400 text-xs mb-10 flex items-center gap-2 font-medium">
          Last Updated: April 01, 2026
        </p>

        {/* 1. Order Cancellation */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-red-50 p-2.5 rounded-xl text-red-600">
               <Ban size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">1. Order Cancellation</h2>
          </div>
          <div className="bg-red-50/30 border border-red-100 rounded-2xl p-6">
            <p className="text-gray-700 text-[15px] leading-relaxed mb-4">
              We understand that plans change. However, our cancellation window is strictly limited:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-700">
                <CheckCircle2 size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                <span>Orders can be cancelled <strong>only before</strong> they are processed or dispatched.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700">
                <XCircle size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <span>Once an order has been shipped, cancellation requests will <strong>not</strong> be accepted.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 2. Refund Eligibility - GRID CARDS */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
               <ShieldCheck size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">2. Refund Eligibility</h2>
          </div>
          
          <p className="text-gray-600 text-[15px] mb-6">Refunds will be considered only under the following specific circumstances:</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Damaged Goods", desc: "Product was damaged during delivery.", icon: <AlertCircle size={20}/>, color: "text-orange-600" },
              { title: "Wrong Product", desc: "Received an item different from your order.", icon: <RotateCcw size={20}/>, color: "text-blue-600" },
              { title: "24h Window", desc: "Issue reported within 24 hours of delivery.", icon: <Clock size={20}/>, color: "text-[#45A301]" }
            ].map((item, index) => (
              <div key={index} className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm">
                <div className={`${item.color} mb-3`}>{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Refund Process & Timeline */}
        <section className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-purple-50 p-2.5 rounded-xl text-purple-600">
                 <CreditCard size={22} />
              </div>
              <h2 className="text-lg font-bold text-gray-800">3. Refund Process</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Refunds are processed back to the <strong>original payment method</strong> used during purchase. All requests are subject to internal verification and approval of the returned goods.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                 <History size={22} />
              </div>
              <h2 className="text-lg font-bold text-gray-800">4. Refund Timeline</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Approved refunds are typically processed within <strong>5–10 business days</strong>. Note that bank processing times may vary and are beyond our control.
            </p>
          </div>
        </section>

        {/* 5. Important Notes */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-amber-50 p-2.5 rounded-xl text-amber-600">
               <AlertCircle size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">5. Important Notes</h2>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
             <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" /> 
                We are not responsible for delays caused by payment gateways or banking systems.
             </div>
             <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" /> 
                Shipping and handling charges are strictly non-refundable.
             </div>
          </div>
        </section>

        {/* Contact Section - WITH ADDRESS */}
        <section className="mb-20 bg-[#45A301]/5 p-8 rounded-3xl border border-[#45A301]/10">
          <h2 className="text-xl font-bold text-gray-800 mb-8">Contact Our Support Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Address */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#45A301] mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1">Sunshine International Agritech</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    D.No19, WD-12, ST-6,<br />
                    Company Street, Genguvarpatti,<br />
                    Theni - 625203
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Contact */}
            <div className="space-y-4">
              <a href="tel:+918489943666" className="flex items-center gap-3 text-gray-700 hover:text-[#45A301] transition-colors group">
                <div className="bg-white p-2 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                  <Phone className="text-[#45A301]" size={18} />
                </div>
                <span className="text-sm font-medium">+91 84899 43666</span>
              </a>

              <a href="mailto:sunshineagreetech@gmail.com" className="flex items-center gap-3 text-gray-700 hover:text-[#45A301] transition-colors group">
                <div className="bg-white p-2 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                  <Mail className="text-[#45A301]" size={18} />
                </div>
                <span className="text-sm font-medium">sunshineagreetech@gmail.com</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </PolicyLayout>
  );
}