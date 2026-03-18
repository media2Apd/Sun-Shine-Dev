// import React from "react";
// import { Phone, Mail, FileText } from "lucide-react";

// const EnquiryOverview = () => {
//   const enquiry = {
//     id: "ORD-1023",
//     status: "New",
//     date: "12-07-2025",
//     type: "Product",
//     product: "Bio Fertilizers",
//     firstName: "Ramesh",
//     company: "Ramesh Farms",
//     email: "rameshfarms@email.com",
//     phone: "8778239060",
//     location: "Coimbatore, Tamil Nadu",
//     quantity: "500 kg",
//     contactMethod: "Phone",
//     message:
//       "We are interested in purchasing bio fertilizers in bulk for our farm. Please provide product details, pricing, and delivery availability.",
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="flex items-center gap-3">
//           <div className="bg-green-100 p-2 rounded-md">
//             <FileText className="text-green-600" />
//           </div>
//           <div>
//             <h1 className="text-xl font-semibold">Enquiry Details</h1>
//             <p className="text-sm text-gray-500">
//               View and manage customer enquiry information
//             </p>
//           </div>
//         </div>

//         <div className="flex gap-3">
//           <button className="border px-4 py-2 rounded-md text-red-500">
//             Delete
//           </button>
//           <button className="bg-green-600 text-white px-4 py-2 rounded-md">
//             Mark as Contacted
//           </button>
//         </div>
//       </div>

//       <div className="grid md:grid-cols-3 gap-6">

//         {/* LEFT SIDE */}
//         <div className="md:col-span-2 space-y-6">

//           {/* CUSTOMER INFO */}
//           <div className="bg-white p-5 rounded-xl border">
//             <h2 className="font-semibold mb-4">Customer Information</h2>

//             <div className="grid md:grid-cols-2 gap-4 text-sm">
//               <div>
//                 <p className="text-gray-400">Company</p>
//                 <p>{enquiry.company}</p>
//               </div>

//               <div>
//                 <p className="text-gray-400">Phone</p>
//                 <p>{enquiry.phone}</p>
//               </div>

//               <div>
//                 <p className="text-gray-400">Email</p>
//                 <p>{enquiry.email}</p>
//               </div>

//               <div>
//                 <p className="text-gray-400">Location</p>
//                 <p>{enquiry.location}</p>
//               </div>
//             </div>
//           </div>

//           {/* ENQUIRY DETAILS */}
//           <div className="bg-white p-5 rounded-xl border">
//             <h2 className="font-semibold mb-4">Enquiry Details</h2>

//             <div className="grid md:grid-cols-2 gap-4 text-sm">
//               <div>
//                 <p className="text-gray-400">Type</p>
//                 <p>{enquiry.type}</p>
//               </div>

//               <div>
//                 <p className="text-gray-400">Product Interested</p>
//                 <p>{enquiry.product}</p>
//               </div>

//               <div>
//                 <p className="text-gray-400">Quantity</p>
//                 <p>{enquiry.quantity}</p>
//               </div>

//               <div>
//                 <p className="text-gray-400">Preferred Contact Method</p>
//                 <p>{enquiry.contactMethod}</p>
//               </div>
//             </div>
//           </div>

//           {/* MESSAGE */}
//           <div className="bg-white p-5 rounded-xl border">
//             <h2 className="font-semibold mb-3">Customer Message</h2>
//             <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-md">
//               {enquiry.message}
//             </p>
//           </div>

//         </div>

//         {/* RIGHT SIDE */}
//         <div className="space-y-6">

//           {/* SUMMARY */}
//           <div className="bg-white p-5 rounded-xl border text-sm">
//             <div className="flex justify-between mb-2">
//               <span className="text-gray-400">Enquiry ID</span>
//               <span className="font-medium">#{enquiry.id}</span>
//             </div>

//             <div className="flex justify-between mb-2">
//               <span className="text-gray-400">Status</span>
//               <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">
//                 {enquiry.status}
//               </span>
//             </div>

//             <div className="flex justify-between mb-2">
//               <span className="text-gray-400">Date</span>
//               <span>{enquiry.date}</span>
//             </div>

//             <div className="flex justify-between mb-2">
//               <span className="text-gray-400">Type</span>
//               <span>{enquiry.type}</span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-gray-400">Product</span>
//               <span className="text-green-600">{enquiry.product}</span>
//             </div>
//           </div>

//           {/* ACTIONS */}
//           <div className="bg-white p-5 rounded-xl border space-y-3 text-sm">

//             <button className="flex items-center justify-center gap-2 w-full border py-2 rounded-md">
//               <Phone size={16} /> Call Customer
//             </button>

//             <button className="flex items-center justify-center gap-2 w-full border py-2 rounded-md">
//               <Mail size={16} /> Send Email
//             </button>

//             <button className="w-full border py-2 rounded-md">
//               Mark as Contacted
//             </button>

//             <button className="w-full border py-2 rounded-md">
//               Mark as Closed
//             </button>

//           </div>

//           {/* NOTES */}
//           <div className="bg-white p-5 rounded-xl border text-sm">
//             <h2 className="font-semibold mb-3">Internal Notes</h2>

//             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-xs mb-3">
//               Customer wants bulk order. Follow up with pricing details.
//             </div>

//             <textarea
//               placeholder="Add note..."
//               className="w-full border rounded-md p-2 mb-3"
//             />

//             <button className="bg-green-600 text-white w-full py-2 rounded-md">
//               Save Note
//             </button>
//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default EnquiryOverview;

import React from "react";
import { Phone, Mail, FileText } from "lucide-react";
import { useEnquiry } from "../Context/EnquiryContext";
import { useLocation } from "react-router-dom";

const EnquiryOverview = () => {

  const { enquiries } = useEnquiry();
  const location = useLocation();
  const id = location.state?.id;

  const enquiry = enquiries.find((e) => e.id === id);


//   ✅ safety check
  if (!enquiry) {
    return <div className="p-6">No Enquiry Found</div>;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-md">
            <FileText className="text-green-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Enquiry Details</h1>
            <p className="text-sm text-gray-500">
              View and manage customer enquiry information
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="border px-4 py-2 rounded-md text-red-500">
            Delete
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md">
            Mark as Contacted
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">

          {/* CUSTOMER */}
          <div className="bg-white p-5 rounded-xl border">
            <h2 className="font-semibold mb-4">Customer Information</h2>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Company</p>
                <p>{enquiry.company}</p>
              </div>

              <div>
                <p className="text-gray-400">Phone</p>
                <p>{enquiry.phone}</p>
              </div>

              <div>
                <p className="text-gray-400">Email</p>
                <p>{enquiry.email}</p>
              </div>

              <div>
                <p className="text-gray-400">Location</p>
                <p>{enquiry.location}</p>
              </div>
            </div>
          </div>

          {/* ENQUIRY DETAILS */}
          <div className="bg-white p-5 rounded-xl border">
            <h2 className="font-semibold mb-4">Enquiry Details</h2>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Type</p>
                <p>{enquiry.enquiryType}</p>
              </div>

              <div>
                <p className="text-gray-400">Product Interested</p>
                <p>{enquiry.product}</p>
              </div>

              <div>
                <p className="text-gray-400">Quantity</p>
                <p>{enquiry.quantity}</p>
              </div>

              <div>
                <p className="text-gray-400">Preferred Contact Method</p>
                <p>{enquiry.contactMethod}</p>
              </div>
            </div>
          </div>

          {/* MESSAGE */}
          <div className="bg-white p-5 rounded-xl border">
            <h2 className="font-semibold mb-3">Customer Message</h2>
            <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-md">
              {enquiry.message}
            </p>
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* SUMMARY */}
          <div className="bg-white p-5 rounded-xl border text-sm">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Enquiry ID</span>
              <span className="font-medium">#{enquiry.id}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Status</span>
              <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded">
                New
              </span>
            </div>

            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Date</span>
              <span>
                {new Date(enquiry.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Type</span>
              <span>{enquiry.enquiryType}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Product</span>
              <span className="text-green-600">{enquiry.product}</span>
            </div>
          </div>
         
<div className="bg-white p-5 rounded-xl border space-y-3 text-sm">

             <button className="flex items-center justify-center gap-2 w-full border py-2 rounded-md">
               <Phone size={16} /> Call Customer
            </button>

             <button className="flex items-center justify-center gap-2 w-full border py-2 rounded-md">
               <Mail size={16} /> Send Email
             </button>

             <button className="w-full border py-2 rounded-md">
               Mark as Contacted
             </button>

             <button className="w-full border py-2 rounded-md">
               Mark as Closed
             </button>

          </div>

 <div className="bg-white p-5 rounded-xl border text-sm">
            <h2 className="font-semibold mb-3">Internal Notes</h2>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-xs mb-3">
               Customer wants bulk order. Follow up with pricing details.
             </div>

             <textarea
              placeholder="Add note..."
              className="w-full border rounded-md p-2 mb-3"
            />

            <button className="bg-green-600 text-white w-full py-2 rounded-md">
              Save Note
            </button>
          </div>

        </div>

         

          {/* NOTES */}
         

        </div>
       </div>
  

 
  );
};

export default EnquiryOverview;