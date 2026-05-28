import React from 'react';
import PolicyLayout from '../../components/PolicyLayout';
import { 
  RotateCcw, XCircle, CheckCircle2, AlertCircle, 
  ShieldCheck, Ban, History 
} from "lucide-react";

export default function ReturnAndRefundPolicy() {
  return (
   <PolicyLayout>
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
      Return & Refund Policy
    </h1>
    <p className="text-gray-400 text-xs mb-10 flex items-center gap-2 font-medium">
      Last Updated: April 2026
    </p>

    {/* 1. Eligibility for Return */}
    <section className="mb-14">
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-red-50 p-2.5 rounded-xl text-red-600">
          <Ban size={22} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">
          1. Eligibility for Return
        </h2>
      </div>

      <div className="bg-red-50/30 border border-red-100 rounded-2xl p-6">
        <p className="text-gray-700 text-[15px] leading-relaxed mb-4">
          We accept returns only under the following conditions:
        </p>

        <ul className="space-y-3">
          <li className="flex items-start gap-3 text-sm text-gray-700">
            <CheckCircle2 size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
            <span>Product must be <strong>unused, unopened, and in original condition</strong>.</span>
          </li>

          <li className="flex items-start gap-3 text-sm text-gray-700">
            <CheckCircle2 size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
            <span>Must be returned with <strong>original packaging, labels, and invoice</strong>.</span>
          </li>

          <li className="flex items-start gap-3 text-sm text-gray-700">
            <XCircle size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
            <span>Used, damaged, or tampered products are <strong>not eligible</strong> for return.</span>
          </li>
        </ul>
      </div>
    </section>

    {/* 2. Cancellation & Refund */}
    <section className="mb-14">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
          <ShieldCheck size={22} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">
          2. Cancellation & Refund
        </h2>
      </div>

      <div className="bg-blue-50/20 border border-blue-100 rounded-2xl p-6 space-y-3 text-sm text-gray-700">
        <p>• Orders can be cancelled before processing or dispatch.</p>
        <p>• Once shipped, cancellation will not be accepted.</p>
        <p>
          • Approved refunds will be processed within <strong>2–3 working days</strong>.
        </p>
        <p>
          • Refunds will be credited to the original payment method.
        </p>
      </div>
    </section>

    {/* 3. Return Approval Process */}
    <section className="mb-14">
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-purple-50 p-2.5 rounded-xl text-purple-600">
          <RotateCcw size={22} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">
          3. Return Approval Process
        </h2>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 space-y-3 text-sm text-gray-700">
        <p>• All return requests will be reviewed and verified internally.</p>
        <p>• Company reserves the right to approve or reject returns.</p>
        <p>• Customers may be asked to provide photos or proof for verification.</p>
      </div>
    </section>

    {/* 4. Refund Timeline */}
    <section className="mb-14">
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
          <History size={22} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">
          4. Refund Timeline
        </h2>
      </div>

      <div className="text-sm text-gray-600 leading-relaxed">
        Once the return is approved, refund will be initiated immediately.
        Refunds are typically credited within <strong>2–3 working days</strong>,
        depending on bank/payment gateway processing time.
        Delays caused by banks or payment systems are beyond our control.
      </div>
    </section>

    {/* 5. Important Notes */}
    <section className="mb-14">
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-amber-50 p-2.5 rounded-xl text-amber-600">
          <AlertCircle size={22} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">
          5. Important Notes
        </h2>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
          Non-eligible return products will be sent back to customer.
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
          Shipping and handling charges are non-refundable.
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
          Delays caused by logistics or payment gateways are not company responsibility.
        </div>
      </div>
    </section>

    {/* Contact Section */}
    <section className="mb-20 bg-[#45A301]/5 p-8 rounded-3xl border border-[#45A301]/10">
      <h2 className="text-xl font-bold text-gray-800 mb-8">
        Contact Support
      </h2>

      <div className="space-y-4 text-sm text-gray-700">
        <p className="flex items-center gap-2">
          📧 sunshineagreetech@gmail.com
        </p>
        <p className="flex items-center gap-2">
          📞 +91 8489943666
        </p>
      </div>
    </section>
  </div>
</PolicyLayout>
  );
}