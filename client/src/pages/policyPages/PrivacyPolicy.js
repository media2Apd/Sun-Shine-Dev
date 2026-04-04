// import React from 'react';
// import PolicyLayout from '../../components/PolicyLayout';
// import { 
//   Shield, User, Search, Lock, Share2, 
//   Cookie, UserCheck, ExternalLink, RefreshCw, 
//   Mail, Phone, CheckCircle2 
// } from "lucide-react";

// export default function PrivacyPolicy() {
//   return (
//     <PolicyLayout>
//       <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
//         <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Privacy Policy</h1>
//         <p className="text-gray-400 text-xs mb-10 flex items-center gap-2 font-medium">
//           Last Updated: April 2026
//         </p>

//         {/* 1. Introduction */}
//         <section className="mb-14">
//           <div className="flex items-center gap-3 mb-5">
//             <div className="bg-green-50 p-2.5 rounded-xl text-[#45A301]">
//                <Shield size={22} />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">1. Introduction</h2>
//           </div>
//           <p className="text-gray-600 leading-relaxed text-[15px]">
//             At <span className="font-semibold text-gray-900">KL Property</span>, we value your privacy and are committed to protecting your personal information. This policy explains how your data is collected, used, and safeguarded when you interact with our services.
//           </p>
//         </section>

//         {/* 2. Information We Collect - GRID CARDS */}
//         <section className="mb-14">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
//                <User size={22} />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">2. Information We Collect</h2>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//             {[
//               { title: "Personal Details", desc: "Name and contact details provided by you.", color: "bg-blue-600" },
//               { title: "Property Interests", desc: "Your specific property interests and preferences.", color: "bg-purple-600" },
//               { title: "Enquiry Details", desc: "Location and specific enquiry details regarding lands.", color: "bg-orange-600" },
//               { title: "Communication", desc: "Records of communication via calls, emails or forms.", color: "bg-[#45A301]" }
//             ].map((item, index) => (
//               <div key={index} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
//                 <div className={`w-2 h-2 rounded-full ${item.color} mb-4`} />
//                 <h3 className="font-bold text-gray-900 text-[15px] mb-2">{item.title}</h3>
//                 <p className="text-gray-500 text-[13px] leading-relaxed">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* 3. Purpose - CHECKLIST BOX */}
//         <section className="mb-14">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="bg-orange-50 p-2.5 rounded-xl text-orange-600">
//                <Search size={22} />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">3. Purpose of Data Collection</h2>
//           </div>

//           <div className="bg-gray-50/50 rounded-3xl p-8 border border-gray-50 space-y-5">
//             {[
//               'Provide suitable property options based on your needs.',
//               'Respond effectively to your enquiries and site visits.',
//               'Improve our website and overall service quality.',
//               'Maintain communication throughout the property acquisition process.'
//             ].map((text, i) => (
//               <div key={i} className="flex items-start gap-4">
//                 <CheckCircle2 size={18} className="text-blue-500 mt-1 flex-shrink-0" />
//                 <p className="text-gray-600 text-[15px]">{text}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* 4. Security */}
//         <section className="mb-14">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="bg-red-50 p-2.5 rounded-xl text-red-600">
//                <Lock size={22} />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">4. Data Protection & Security</h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="p-4 bg-gray-50 rounded-2xl">
//                <p className="text-gray-700 font-semibold text-sm mb-1">Access Control</p>
//                <p className="text-gray-500 text-xs">Protect data from unauthorized access.</p>
//             </div>
//             <div className="p-4 bg-gray-50 rounded-2xl">
//                <p className="text-gray-700 font-semibold text-sm mb-1">Secure Storage</p>
//                <p className="text-gray-500 text-xs">Store all collected information securely.</p>
//             </div>
//             <div className="p-4 bg-gray-50 rounded-2xl">
//                <p className="text-gray-700 font-semibold text-sm mb-1">Leakage Prevention</p>
//                <p className="text-gray-500 text-xs">Prevent misuse or leakage of personal data.</p>
//             </div>
//           </div>
//         </section>

//         {/* 5. Sharing */}
//         <section className="mb-14">
//           <div className="flex items-center gap-3 mb-5">
//             <div className="bg-purple-50 p-2.5 rounded-xl text-purple-600">
//                <Share2 size={22} />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">5. Sharing of Information</h2>
//           </div>
//           <p className="text-gray-600 text-[15px] mb-4">We do not sell or trade your personal data. Your data may be shared only with:</p>
//           <ul className="space-y-3 ml-2">
//              {['Property owners (for enquiry processing)', 'Legal or financial partners (if required)', 'Authorities when required by law'].map((item, i) => (
//                <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
//                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" /> {item}
//                </li>
//              ))}
//           </ul>
//         </section>

//         {/* 6. Cookies */}
//         <section className="mb-14">
//           <div className="flex items-center gap-3 mb-5">
//             <div className="bg-yellow-50 p-2.5 rounded-xl text-yellow-700">
//                <Cookie size={22} />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">6. Cookies & Website Usage</h2>
//           </div>
//           <p className="text-gray-600 text-[15px] leading-relaxed">
//             Our website may use cookies to enhance user experience, analyze website performance, and improve overall service quality.
//           </p>
//         </section>

//         {/* 7. User Rights */}
//         <section className="mb-14">
//           <div className="flex items-center gap-3 mb-5">
//             <div className="bg-cyan-50 p-2.5 rounded-xl text-cyan-600">
//                <UserCheck size={22} />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">7. User Rights</h2>
//           </div>
//           <div className="flex flex-wrap gap-4">
//              {['Access personal data', 'Request corrections', 'Request deletion'].map((right, i) => (
//                <span key={i} className="px-4 py-2 bg-gray-100 rounded-full text-xs font-semibold text-gray-700">
//                  {right}
//                </span>
//              ))}
//           </div>
//         </section>

//         {/* 8. Third-Party Links */}
//         <section className="mb-14">
//           <div className="flex items-center gap-3 mb-5">
//             <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600">
//                <ExternalLink size={22} />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">8. Third-Party Links</h2>
//           </div>
//           <p className="text-gray-600 text-[15px] leading-relaxed border-l-4 border-indigo-100 pl-4 italic">
//             Our website may include links to external sites. We are not responsible for their privacy practices.
//           </p>
//         </section>

//         {/* 9. Policy Updates */}
//         <section className="mb-14">
//           <div className="flex items-center gap-3 mb-5">
//             <div className="bg-pink-50 p-2.5 rounded-xl text-pink-600">
//                <RefreshCw size={22} />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">9. Policy Updates</h2>
//           </div>
//           <p className="text-gray-600 text-[15px]">
//             This Privacy Policy may be updated from time to time to reflect changes in our practices.
//           </p>
//         </section>

//         {/* 10. Contact */}
//         <section className="mb-20 bg-[#45A301]/5 p-8 rounded-3xl border border-[#45A301]/10">
//           <div className="flex items-center gap-3 mb-6">
//             <h2 className="text-xl font-bold text-gray-800">10. Contact Us</h2>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-8">
//             <a href="mailto:klproperity@gmail.com" className="flex items-center gap-3 text-gray-700 hover:text-[#45A301] transition-colors">
//                <Mail className="text-[#45A301]" size={20} />
//                <span className="text-[15px] font-medium">klproperity@gmail.com</span>
//             </a>
//             <a href="tel:+918946059070" className="flex items-center gap-3 text-gray-700 hover:text-[#45A301] transition-colors">
//                <Phone className="text-[#45A301]" size={20} />
//                <span className="text-[15px] font-medium">+91 89460 59070</span>
//             </a>
//           </div>
//         </section>

//       </div>
//     </PolicyLayout>
//   );
// }

import React from 'react';
import PolicyLayout from '../../components/PolicyLayout';
import { 
  Shield, User, Search, Lock, 
  Cookie, UserCheck, ExternalLink, RefreshCw, 
  Mail, CreditCard, ShoppingBag, 
} from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <PolicyLayout>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Privacy Policy</h1>
        <p className="text-gray-400 text-xs mb-10 flex items-center gap-2 font-medium">
          Last Updated: April 01, 2026
        </p>

        {/* 1. Introduction */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-green-50 p-2.5 rounded-xl text-[#45A301]">
               <Shield size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">1. Introduction</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-[15px]">
            This Privacy Policy describes how <span className="font-semibold text-gray-900">Sunshine International Agritech</span> collects, uses, and safeguards the personal information of users who access or use our website and services. We are committed to ensuring your data remains protected.
          </p>
        </section>

        {/* 2. Information We Collect - GRID CARDS */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
               <User size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">2. Information We Collect</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { title: "Personal Identifiers", desc: "Full name, email address, and phone number for communication.", color: "bg-blue-600" },
              { title: "Shipping & Billing", desc: "Physical addresses required for product delivery and invoicing.", color: "bg-purple-600" },
              { title: "Order History", desc: "Details of your purchases, order status, and transaction IDs.", color: "bg-orange-600" },
              { title: "Technical Data", desc: "IP address, browser type, and device info for analytics.", color: "bg-[#45A301]" }
            ].map((item, index) => (
              <div key={index} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-2 h-2 rounded-full ${item.color} mb-4`} />
                <h3 className="font-bold text-gray-900 text-[15px] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Payment Security - NEW SECTION */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
               <CreditCard size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">3. Payment Information</h2>
          </div>
          <div className="bg-emerald-50/30 border border-emerald-100 rounded-2xl p-6">
            <p className="text-gray-600 text-[15px] leading-relaxed mb-4">
              Your financial security is our priority. All payments are processed through secure and trusted third-party payment gateways.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> No storage of CVV or Card PINs
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> SSL Encryption on all trades
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Secure Gateway Redirection
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Industry-standard practices
              </li>
            </ul>
          </div>
        </section>

        {/* 4. Purpose - CHECKLIST BOX */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-50 p-2.5 rounded-xl text-orange-600">
               <Search size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">4. How We Use Your Information</h2>
          </div>

          <div className="bg-gray-50/50 rounded-3xl p-8 border border-gray-50 space-y-5">
            {[
              'Processing orders and ensuring timely delivery of products.',
              'Providing customer support and resolving technical or order issues.',
              'Sending order updates, invoices, and important notifications.',
              'Improving website performance, catalog relevance, and user experience.',
              'Marketing communication (only if you have provided explicit consent).'
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4">
                <ShoppingBag size={18} className="text-[#45A301] mt-1 flex-shrink-0" />
                <p className="text-gray-600 text-[15px]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Security */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-50 p-2.5 rounded-xl text-red-600">
               <Lock size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">5. Data Protection</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
               <p className="text-gray-700 font-semibold text-sm mb-1 uppercase tracking-wider">Encryption</p>
               <p className="text-gray-500 text-sm">We use SSL encryption to protect data during transmission.</p>
            </div>
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
               <p className="text-gray-700 font-semibold text-sm mb-1 uppercase tracking-wider">Restricted Access</p>
               <p className="text-gray-500 text-sm">Access to your personal data is strictly limited to authorized personnel.</p>
            </div>
          </div>
        </section>

        {/* 6. Cookies */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-yellow-50 p-2.5 rounded-xl text-yellow-700">
               <Cookie size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">6. Cookies Policy</h2>
          </div>
          <p className="text-gray-600 text-[15px] leading-relaxed">
            Our website uses cookies to enhance your experience, remember preferences, and analyze traffic. You can choose to disable cookies through your browser settings, though some site features may become unavailable.
          </p>
        </section>

        {/* 7. Third-Party Services */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600">
               <ExternalLink size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">7. Third-Party Services</h2>
          </div>
          <p className="text-gray-600 text-[15px] leading-relaxed border-l-4 border-indigo-100 pl-4 italic">
            We may use third-party tools for payments and analytics. We are not responsible for their privacy practices; we encourage you to review the policies of these external providers.
          </p>
        </section>

        {/* 8. User Rights */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-cyan-50 p-2.5 rounded-xl text-cyan-600">
               <UserCheck size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">8. User Rights</h2>
          </div>
          <div className="flex flex-wrap gap-4">
             {['Access personal data', 'Request correction', 'Request deletion', 'Opt-out of marketing'].map((right, i) => (
               <span key={i} className="px-4 py-2 bg-gray-100 rounded-full text-xs font-semibold text-gray-700">
                 {right}
               </span>
             ))}
          </div>
        </section>

        {/* 9. Policy Updates */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-pink-50 p-2.5 rounded-xl text-pink-600">
               <RefreshCw size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">9. Policy Updates</h2>
          </div>
          <p className="text-gray-600 text-[15px]">
            We reserve the right to update this Privacy Policy at any time. Continued use of the website following changes implies acceptance of the updated terms.
          </p>
        </section>

        {/* 10. Contact */}
        <section className="mb-20 bg-[#45A301]/5 p-8 rounded-3xl border border-[#45A301]/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">10. Contact Us</h2>
              <p className="text-gray-500 text-sm">Have questions regarding your data? Get in touch.</p>
            </div>
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