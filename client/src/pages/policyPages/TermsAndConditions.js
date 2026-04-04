// import React from 'react';
// import PolicyLayout from '../../components/PolicyLayout';
// import { 
//   Info, TreePine, Search, Users, UserCheck, 
//   FileText, Wallet, ExternalLink, AlertTriangle, 
//   XCircle, RefreshCw, Mail, Phone, CheckCircle2 
// } from "lucide-react";

// export default function TermsAndConditions() {
//   return (
//     <PolicyLayout>
//       <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
//         <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Terms & Conditions</h1>
//         <p className="text-gray-400 text-xs mb-10 flex items-center gap-2 font-medium">
//           Last Updated: April 2026
//         </p>

//         {/* 1. Introduction */}
//         <section className="mb-14">
//           <div className="flex items-center gap-3 mb-5">
//             <div className="bg-green-50 p-2.5 rounded-xl text-[#45A301]">
//                <Info size={22} />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">1. Introduction</h2>
//           </div>
//           <p className="text-gray-600 leading-relaxed text-[15px] mb-4">
//             Welcome to <span className="font-semibold text-gray-900">KL Property</span>. These Terms and Conditions outline the rules and guidelines for using our services. By accessing our website or engaging with our services, you agree to comply with these terms.
//           </p>
//           <p className="text-gray-600 leading-relaxed text-[15px]">
//             KL Property operates as a <span className="font-semibold text-gray-900">trusted real estate service provider</span> in <span className="text-gray-900 font-medium">Thekkady, Kumily, and Idukki region</span>, with strong roots in agriculture and land development.
//           </p>
//         </section>

//         {/* 2. Nature of Our Services */}
//         <section className="mb-14">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
//                <TreePine size={22} />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">2. Nature of Our Services</h2>
//           </div>
//           <p className="text-gray-600 text-[15px] mb-6">KL Property acts as a property facilitator and advisor, helping clients in:</p>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//             {[
//               "Buying and selling agricultural lands",
//               "Plantation property transactions",
//               "Residential plots and houses",
//               "Investment land opportunities",
//               "Rental property assistance"
//             ].map((service, index) => (
//               <div key={index} className="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm flex items-center gap-3">
//                 <CheckCircle2 size={16} className="text-[#45A301]" />
//                 <span className="text-gray-700 text-sm font-medium">{service}</span>
//               </div>
//             ))}
//           </div>
//           <p className="text-[#45A301] bg-green-50 p-4 rounded-2xl text-sm font-medium border border-green-100">
//             "We focus on honest guidance, genuine property options, and long-term trust, rather than just brokerage."
//           </p>
//         </section>

//         {/* 3. Property Information & Accuracy */}
//         <section className="mb-14">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
//                <Search size={22} />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">3. Property Information & Accuracy</h2>
//           </div>
//           <div className="space-y-4 mb-6">
//             <p className="text-gray-600 text-[15px]">Property details are collected from landowners, local sources, and market knowledge. While we strive to provide accurate and updated information, we do not guarantee absolute accuracy.</p>
//           </div>
//           <div className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100">
//             <p className="text-gray-900 font-bold text-sm mb-4">Clients are strongly advised to independently verify:</p>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                {['Land ownership documents', 'Legal clearances', 'Survey and boundary details', 'Government approvals'].map((item, i) => (
//                  <div key={i} className="flex items-center gap-3 text-gray-600 text-sm">
//                     <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> {item}
//                  </div>
//                ))}
//             </div>
//           </div>
//         </section>

//         {/* 4. Role of KL Property */}
//         <section className="mb-14">
//           <div className="flex items-center gap-3 mb-5">
//             <div className="bg-purple-50 p-2.5 rounded-xl text-purple-600">
//                <Users size={22} />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">4. Role of KL Property</h2>
//           </div>
//           <p className="text-gray-600 text-[15px] leading-relaxed border-l-4 border-purple-100 pl-4">
//             KL Property acts as a <span className="font-bold text-gray-900 underline decoration-purple-200">mediator</span> between buyers and sellers. We do not own or directly sell properties unless explicitly mentioned. Final decisions and agreements are solely between the involved parties.
//           </p>
//         </section>

//         {/* 5. Client Responsibilities */}
//         <section className="mb-14">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="bg-orange-50 p-2.5 rounded-xl text-orange-600">
//                <UserCheck size={22} />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">5. Client Responsibilities</h2>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//             {[
//               { title: "Personal Details", desc: "Provide accurate personal and transaction details." },
//               { title: "Verification", desc: "Verify all property-related documents before purchase." },
//               { title: "Information Misuse", desc: "Not misuse any information shared by KL Property." },
//               { title: "Legal Compliance", desc: "Follow all applicable legal and regulatory requirements." }
//             ].map((item, i) => (
//               <div key={i} className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
//                 <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
//                 <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* 6. Documentation Support */}
//         <section className="mb-14">
//           <div className="flex items-center gap-3 mb-5">
//             <div className="bg-cyan-50 p-2.5 rounded-xl text-cyan-600">
//                <FileText size={22} />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">6. Documentation Support</h2>
//           </div>
//           <p className="text-gray-600 text-[15px] mb-4">
//             We provide guidance and assistance for documentation processes. However, <span className="font-semibold text-gray-800">we are not a legal authority</span>.
//           </p>
//           <div className="flex items-center gap-2 text-sm text-gray-600 bg-cyan-50/50 p-3 rounded-lg border border-cyan-100">
//              <AlertTriangle size={16} className="text-cyan-600" />
//              <span>Clients must consult: Legal professionals & Government offices for final verification.</span>
//           </div>
//         </section>

//         {/* 7. Payments & Financial Dealings */}
//         <section className="mb-14">
//           <div className="flex items-center gap-3 mb-5">
//             <div className="bg-red-50 p-2.5 rounded-xl text-red-600">
//                <Wallet size={22} />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">7. Payments & Financial Dealings</h2>
//           </div>
//           <p className="text-gray-600 text-[15px] mb-4 font-medium">All financial transactions are handled directly between buyer and seller.</p>
//           <p className="text-gray-600 text-[15px] mb-4">KL Property is not responsible for:</p>
//           <div className="flex flex-wrap gap-3">
//              {['Payment delays', 'Third-party financial issues', 'Any financial disputes'].map((tag, i) => (
//                <span key={i} className="px-4 py-2 bg-red-50 text-red-700 text-xs font-bold rounded-lg border border-red-100">{tag}</span>
//              ))}
//           </div>
//         </section>

//         {/* 8. Third-Party Services */}
//         <section className="mb-14">
//           <div className="flex items-center gap-3 mb-5">
//             <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600">
//                <ExternalLink size={22} />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">8. Third-Party Services</h2>
//           </div>
//           <p className="text-gray-600 text-[15px] mb-4">We may connect clients with:</p>
//           <div className="flex gap-4">
//              {['Legal advisors', 'Financial institutions', 'Local agents'].map((item, i) => (
//                <div key={i} className="px-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">{item}</div>
//              ))}
//           </div>
//           <p className="mt-4 text-gray-500 text-xs italic underline">KL Property does not take responsibility for services provided by third parties.</p>
//         </section>

//         {/* 9. Limitation of Liability */}
//         <section className="mb-14">
//           <div className="flex items-center gap-3 mb-5">
//             <div className="bg-yellow-50 p-2.5 rounded-xl text-yellow-700">
//                <AlertTriangle size={22} />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">9. Limitation of Liability</h2>
//           </div>
//           <p className="text-gray-600 text-[15px] mb-4">KL Property shall not be held liable for:</p>
//           <ul className="space-y-3 ml-2">
//              {[
//                'Any loss due to incorrect or incomplete information',
//                'Legal disputes between buyers and sellers',
//                'Delays in registration or approvals',
//                'Financial losses arising from transactions'
//              ].map((item, i) => (
//                <li key={i} className="flex items-center gap-3 text-[14px] text-gray-600">
//                  <XCircle size={14} className="text-yellow-600" /> {item}
//                </li>
//              ))}
//           </ul>
//         </section>

//         {/* 10. Service Termination */}
//         <section className="mb-14">
//           <div className="flex items-center gap-3 mb-5">
//             <div className="bg-gray-100 p-2.5 rounded-xl text-gray-700">
//                <XCircle size={22} />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">10. Service Termination</h2>
//           </div>
//           <p className="text-gray-600 text-[15px]">
//             We reserve the right to refuse or terminate service or restrict access if <span className="font-bold text-gray-800">misuse or false information</span> is detected.
//           </p>
//         </section>

//         {/* 11. Updates to Terms */}
//         <section className="mb-14">
//           <div className="flex items-center gap-3 mb-5">
//             <div className="bg-pink-50 p-2.5 rounded-xl text-pink-600">
//                <RefreshCw size={22} />
//             </div>
//             <h2 className="text-xl font-bold text-gray-800">11. Updates to Terms</h2>
//           </div>
//           <p className="text-gray-600 text-[15px]">
//             These Terms may be updated periodically. Continued use of our services implies acceptance of the updated terms.
//           </p>
//         </section>

//         {/* 12. Contact Information */}
//         <section className="mb-20 bg-[#45A301]/5 p-8 rounded-3xl border border-[#45A301]/10">
//           <h2 className="text-xl font-bold text-gray-800 mb-6 text-center sm:text-left">12. Contact Us</h2>
//           <div className="flex flex-col sm:flex-row gap-8 justify-center sm:justify-start">
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
  Info, TreePine, ShoppingBag, Tag, CreditCard, 
  UserCheck, AlertTriangle, ShieldAlert, XCircle, 
  RefreshCw, Mail, CheckCircle2 
} from "lucide-react";

export default function TermsAndConditions() {
  return (
    <PolicyLayout>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Terms & Conditions</h1>
        <p className="text-gray-400 text-xs mb-10 flex items-center gap-2 font-medium">
          Last Updated: April 01, 2026
        </p>

        {/* 1. General Terms */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-green-50 p-2.5 rounded-xl text-[#45A301]">
               <Info size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">1. General Terms</h2>
          </div>
          <div className="text-gray-600 leading-relaxed text-[15px] space-y-4">
            <p>
              By accessing this website, you agree to comply with these Terms and Conditions. These terms govern your use of the website operated by <span className="font-semibold text-gray-900">Sunshine International Agritech</span>.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#45A301] mt-0.5 flex-shrink-0" />
                <span>All products listed on our platform are subject to availability.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-[#45A301] mt-0.5 flex-shrink-0" />
                <span>We reserve the right to modify or discontinue any product or service without prior notice.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 2. Product Information */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
               <TreePine size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">2. Product Information</h2>
          </div>
          <p className="text-gray-600 text-[15px] mb-6">
            Our products are specialized <span className="font-semibold text-gray-900">eco-friendly agricultural inputs</span> designed for sustainable farming.
          </p>
          <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl flex items-start gap-3">
            <AlertTriangle size={20} className="text-orange-600 mt-0.5 flex-shrink-0" />
            <p className="text-orange-800 text-sm font-medium">
              Note: Product images are for reference purposes only. Slight variations in packaging or appearance may occur between the website display and the actual product.
            </p>
          </div>
        </section>

        {/* 3. Orders & Acceptance */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
               <ShoppingBag size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">3. Orders & Acceptance</h2>
          </div>
          <p className="text-gray-600 text-[15px] leading-relaxed border-l-4 border-blue-100 pl-4">
            Placing an order on our website is considered an <span className="font-bold text-gray-900">offer to purchase</span>. Orders are officially confirmed and binding only after successful payment verification and product dispatch.
          </p>
        </section>

        {/* 4. Pricing */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-purple-50 p-2.5 rounded-xl text-purple-600">
               <Tag size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">4. Pricing</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <p className="text-gray-700 text-[14px]">Prices for our agricultural products are subject to change without prior notice based on market conditions.</p>
            </div>
            <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <p className="text-gray-700 text-[14px]">In the event of a pricing error on the website, we reserve the right to cancel any orders placed at the incorrect price.</p>
            </div>
          </div>
        </section>

        {/* 5. Payment Terms */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-cyan-50 p-2.5 rounded-xl text-cyan-600">
               <CreditCard size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">5. Payment Terms</h2>
          </div>
          <div className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100 space-y-4">
            <p className="text-gray-600 text-[15px]">Payments must be made through approved payment methods provided at checkout.</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" /> Refunds will be processed only to the original payment method.
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" /> We are not responsible for delays caused by payment gateways, banks, or third-party services.
              </li>
            </ul>
          </div>
        </section>

        {/* 6. User Responsibilities */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-50 p-2.5 rounded-xl text-orange-600">
               <UserCheck size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">6. User Responsibilities</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <h4 className="font-bold text-gray-900 text-sm mb-1">Accurate Billing</h4>
              <p className="text-gray-500 text-xs leading-relaxed">Users must provide accurate and complete billing and shipping information for all orders.</p>
            </div>
            <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <h4 className="font-bold text-gray-900 text-sm mb-1">Account Confidentiality</h4>
              <p className="text-gray-500 text-xs leading-relaxed">Users are responsible for maintaining the confidentiality of their account credentials and activity.</p>
            </div>
          </div>
        </section>

        {/* 7. Unauthorized Transactions */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-red-50 p-2.5 rounded-xl text-red-600">
               <AlertTriangle size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">7. Unauthorized Transactions</h2>
          </div>
          <p className="text-gray-600 text-[15px] mb-4">
            Any unauthorized or suspicious transaction must be reported to our support team immediately. 
          </p>
          <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50/50 p-3 rounded-lg border border-red-100 font-medium">
             <XCircle size={16} />
             <span>Important: Delayed reporting of suspicious activity may limit our ability to assist or rectify the transaction.</span>
          </div>
        </section>

        {/* 8. Limitation of Liability */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-yellow-50 p-2.5 rounded-xl text-yellow-700">
               <ShieldAlert size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">8. Limitation of Liability</h2>
          </div>
          <p className="text-gray-600 text-[15px] mb-4">Sunshine International Agritech is not liable for:</p>
          <ul className="space-y-3 ml-2">
             {[
               'Delivery delays due to courier issues, weather, or external factors beyond our control.',
               'Any losses or damages caused by incorrect information provided by the user.',
               'Indirect or consequential damages arising from the use of our website.'
             ].map((item, i) => (
               <li key={i} className="flex items-center gap-3 text-[14px] text-gray-600">
                 <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full" /> {item}
               </li>
             ))}
          </ul>
        </section>

        {/* 9. Termination */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-gray-100 p-2.5 rounded-xl text-gray-700">
               <XCircle size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">9. Termination</h2>
          </div>
          <p className="text-gray-600 text-[15px] mb-4">
            We reserve the right to suspend or terminate accounts and access to our services in the following cases:
          </p>
          <div className="flex flex-wrap gap-3">
             {['Fraudulent activity', 'Violation of terms', 'Abusive behavior'].map((tag, i) => (
               <span key={i} className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg border border-gray-200">{tag}</span>
             ))}
          </div>
        </section>

        {/* 10. Updates to Terms */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-pink-50 p-2.5 rounded-xl text-pink-600">
               <RefreshCw size={22} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">10. Updates to Terms</h2>
          </div>
          <p className="text-gray-600 text-[15px]">
            We reserve the right to update these Terms and Conditions at any time. Continued use of the website following changes implies acceptance of the updated terms.
          </p>
        </section>

        {/* 11. Contact Information */}
        <section className="mb-20 bg-[#45A301]/5 p-8 rounded-3xl border border-[#45A301]/10">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center sm:text-left">11. Contact Us</h2>
          <div className="flex flex-col sm:flex-row gap-8 justify-center sm:justify-start">
            <a href="mailto:sunshineagreetech@gmail.com" className="flex items-center gap-3 text-gray-700 hover:text-[#45A301] transition-colors group">
               <Mail className="text-[#45A301] group-hover:scale-110 transition-transform" size={20} />
               <span className="text-[15px] font-medium">sunshineagreetech@gmail.com</span>
            </a>
          </div>
        </section>

      </div>
    </PolicyLayout>
  );
}