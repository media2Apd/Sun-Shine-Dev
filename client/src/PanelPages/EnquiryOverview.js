

// import React, { useState } from "react";

// import { Phone, Mail, FileText } from "lucide-react";
// import { useEnquiry } from "../Context/EnquiryContext";
// import { useLocation } from "react-router-dom";
// import ConfirmModal from "../panelComponents/ConfirmModal"

// const EnquiryOverview = () => {
//   const { enquiries, addNoteToEnquiry, updateEnquiryStatus  } = useEnquiry();
//   const location = useLocation();
//   const id = location.state?.id;
//   const [confirmBox, setConfirmBox] = useState({
//   open: false,
//   type: "",
// });
// const handleConfirm = () => {
//   updateEnquiryStatus(enquiry.id, confirmBox.type);
//   setConfirmBox({ open: false, type: "" });
// };
//   const [note, setNote] = useState("");

//   const enquiry = enquiries.find((e) => e.id === id);

//   if (!enquiry) {
//     return <div className="p-6">No Enquiry Found</div>;
//   }

//   const handleSaveNote = () => {
//     if (!note.trim()) return;
//     addNoteToEnquiry(enquiry.id, note);
//     setNote("");
//   };

  

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
       

//        <ConfirmModal
//   open={confirmBox.open}
//   title="Confirm Status Change"
//   message={`Are you sure you want to mark this enquiry as ${confirmBox.type}?`}
//   onConfirm={handleConfirm}
//   onCancel={() => setConfirmBox({ open: false, type: "" })}
// />

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

//         {/* <div className="flex gap-3">
//           <button className="border border-red-300 text-red-500 px-4 py-2 rounded-md text-sm">
//             Delete
//           </button>
//           <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm">
//             Mark as Contacted
//           </button>
//         </div> */}
//       </div>

//       <div className="grid md:grid-cols-3 gap-6">

//         {/* LEFT SIDE */}
//         <div className="md:col-span-2 space-y-6">

//           {/* CUSTOMER INFO */}
//           <div className="bg-white p-5 rounded-xl border">
//             <h2 className="font-semibold mb-4 flex items-center gap-2">
//               <span className="text-green-600">●</span> Customer Information
//             </h2>

//             <div className="grid md:grid-cols-2 gap-4 text-sm">
//               <div>
//                 <p className="text-gray-400">Company</p>
//                 <p className="font-medium">{enquiry.company}</p>
//               </div>
//               <div>
//                 <p className="text-gray-400">Phone</p>
//                 <p className="font-medium">{enquiry.phone}</p>
//               </div>
//               <div>
//                 <p className="text-gray-400">Email</p>
//                 <p className="font-medium">{enquiry.email}</p>
//               </div>
//               <div>
//                 <p className="text-gray-400">Location</p>
//                 <p className="font-medium">{enquiry.location}</p>
//               </div>
//             </div>
//           </div>

//           {/* ENQUIRY DETAILS */}
//           <div className="bg-white p-5 rounded-xl border">
//             <h2 className="font-semibold mb-4 flex items-center gap-2">
//               <span className="text-green-600">●</span> Enquiry Details
//             </h2>

//             <div className="grid md:grid-cols-2 gap-4 text-sm">
//               <div>
//                 <p className="text-gray-400">Type</p>
//                 <p>{enquiry.enquiryType}</p>
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
//             <h2 className="font-semibold mb-3 flex items-center gap-2">
//               <span className="text-green-600">●</span> Customer Message
//             </h2>

//             <p className="text-gray-600 text-sm bg-gray-100 p-4 rounded-md">
//               {enquiry.message}
//             </p>
//           </div>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="space-y-6">

//           {/* SUMMARY CARD */}
//           <div className="bg-white p-5 rounded-xl border text-sm">
//             <div className="flex justify-between mb-3">
//               <span className="text-gray-400">Enquiry ID</span>
//               <span className="font-medium">#{enquiry.id}</span>
//             </div>

//             <div className="flex justify-between mb-3">
//               <span className="text-gray-400">Status</span>
//               <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs">
//                 New
//               </span>
//             </div>

//             <div className="flex justify-between mb-3">
//               <span className="text-gray-400">Date</span>
//               <span>{new Date(enquiry.createdAt).toLocaleDateString()}</span>
//             </div>

//             <div className="flex justify-between mb-3">
//               <span className="text-gray-400">Type</span>
//               <span>{enquiry.enquiryType}</span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-gray-400">Product</span>
//               <span className="text-green-600">{enquiry.product}</span>
//             </div>
//           </div>

//           {/* ACTIONS */}
//           {/* <div className="bg-white p-5 rounded-xl border space-y-3 text-sm">

//             <button className="flex items-center justify-center gap-2 w-full border py-2 rounded-md hover:bg-gray-50">
//               <Phone size={16} className="text-green-600" />
//               Call Customer
//             </button>

//             <button className="flex items-center justify-center gap-2 w-full border py-2 rounded-md hover:bg-gray-50">
//               <Mail size={16} className="text-green-600" />
//               Send Email
//             </button>

//             <button className="w-full border py-2 rounded-md hover:bg-gray-50">
//               Mark as Contacted
//             </button>

//             <button className="w-full border py-2 rounded-md hover:bg-gray-50">
//               Mark as Closed
//             </button>
//           </div> */}
//           {/* ACTIONS */}
// <div className="bg-white p-5 rounded-xl border text-sm">

//   <div className="grid grid-cols-2 gap-3 mb-3">

//     {/* CALL */}
//     <button className="flex flex-col items-center justify-center gap-2 bg-gray-100 py-4 rounded-lg hover:bg-gray-200 transition">
//       <Phone size={18} className="text-green-600" />
//       <span className="text-xs">Call Customer</span>
//     </button>

//     {/* EMAIL */}
//     <button className="flex flex-col items-center justify-center gap-2 bg-gray-100 py-4 rounded-lg hover:bg-gray-200 transition">
//       <Mail size={18} className="text-green-600" />
//       <span className="text-xs">Send Email</span>
//     </button>

//   </div>

//   {/* <button className="w-full border py-2 rounded-md mb-2 hover:bg-gray-50">
//     Mark as Contacted
//   </button>

//   <button className="w-full border py-2 rounded-md hover:bg-gray-50">
//     Mark as Closed
//   </button> */}


//   {/* <button
//   onClick={() => {
//     if (window.confirm("Mark this enquiry as Contacted?")) {
//       console.log("Contacted clicked", enquiry.id); // debug
//       updateEnquiryStatus(enquiry.id, "Contacted");
//     }
//   }}
//   className="w-full border py-2 rounded-md mb-2 hover:bg-gray-50"
// >
//   Mark as Contacted
// </button>

// <button
//   onClick={() => {
//     if (window.confirm("Mark this enquiry as Closed?")) {
//       console.log("Closed clicked", enquiry.id); // debug
//       updateEnquiryStatus(enquiry.id, "Closed");
//     }
//   }}
//   className="w-full border py-2 rounded-md hover:bg-gray-50"
// >
//   Mark as Closed
// </button> */}

// <button
//   onClick={() => setConfirmBox({ open: true, type: "Contacted" })}
//   className="w-full border py-2 rounded-md mb-2"
// >
//   Mark as Contacted
// </button>

// <button
//   onClick={() => setConfirmBox({ open: true, type: "Closed" })}
//   className="w-full border py-2 rounded-md"
// >
//   Mark as Closed
// </button>

// </div>

//           {/* NOTES (RIGHT SIDE like image) */}
//           <div className="bg-white p-5 rounded-xl border text-sm">
//             <h2 className="font-semibold mb-3">Internal Notes</h2>

//             {enquiry?.notes?.map((n, idx) => (
//               <div
//                 key={idx}
//                 className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-xs mb-3"
//               >
//                 {n.text}
//                 <div className="text-gray-400 text-[10px] mt-1">
//                   Last note • {new Date(n.date).toLocaleString()}
//                 </div>
//               </div>
//             ))}

//             <textarea
//               placeholder="Add note..."
//               className="w-full border rounded-md p-2 mb-3"
//               value={note}
//               onChange={(e) => setNote(e.target.value)}
//             />

//             <button
//               onClick={handleSaveNote}
//               className="bg-green-600 text-white w-full py-2 rounded-md"
//             >
//               Save Note
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnquiryOverview;

import React, { useState } from "react";
import { Phone, Mail, FileText } from "lucide-react";
import { useEnquiry } from "../Context/EnquiryContext";
import { useLocation } from "react-router-dom";
import ConfirmModal from "../panelComponents/ConfirmModal"

const EnquiryOverview = () => {
  const { enquiries, addNoteToEnquiry, updateEnquiryStatus  } = useEnquiry();
  const location = useLocation();
  const id = location.state?.id;

  const [confirmBox, setConfirmBox] = useState({
    open: false,
    type: "",
  });

  const handleConfirm = () => {
    updateEnquiryStatus(enquiry.id, confirmBox.type);
    setConfirmBox({ open: false, type: "" });
  };

  const [note, setNote] = useState("");

  const enquiry = enquiries.find((e) => e.id === id);

  if (!enquiry) {
    return <div className="p-6">No Enquiry Found</div>;
  }

  const handleSaveNote = () => {
    if (!note.trim()) return;
    addNoteToEnquiry(enquiry.id, note);
    setNote("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
       
       <ConfirmModal
        open={confirmBox.open}
        title="Confirm Status Change"
        message={`Are you sure you want to mark this enquiry as ${confirmBox.type}?`}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmBox({ open: false, type: "" })}
      />

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
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6">

          {/* CUSTOMER INFO */}
          <div className="bg-white p-5 rounded-xl border">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <span className="text-green-600">●</span> Customer Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Company</p>
                <p className="font-medium">{enquiry.company}</p>
              </div>
              <div>
                <p className="text-gray-400">Phone</p>
                <p className="font-medium">{enquiry.phone}</p>
              </div>
              <div>
                <p className="text-gray-400">Email</p>
                <p className="font-medium">{enquiry.email}</p>
              </div>
              <div>
                <p className="text-gray-400">Location</p>
                <p className="font-medium">{enquiry.location}</p>
              </div>
            </div>
          </div>

          {/* ENQUIRY DETAILS */}
          <div className="bg-white p-5 rounded-xl border">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <span className="text-green-600">●</span> Enquiry Details
            </h2>

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
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <span className="text-green-600">●</span> Customer Message
            </h2>

            <p className="text-gray-600 text-sm bg-gray-100 p-4 rounded-md">
              {enquiry.message}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* SUMMARY CARD */}
          <div className="bg-white p-5 rounded-xl border text-sm">
            <div className="flex justify-between mb-3">
              <span className="text-gray-400">Enquiry ID</span>
              <span className="font-medium">#{enquiry.id}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span className="text-gray-400">Status</span>
              <span className={`px-2 py-1 rounded text-xs ${
                enquiry.status === "Closed"
                  ? "text-red-600 bg-red-100"
                  : enquiry.status === "Contacted"
                  ? "text-blue-600 bg-blue-100"
                  : "text-green-600 bg-green-100"
              }`}>
                {enquiry.status || "N/A"}
              </span>
            </div>

            <div className="flex justify-between mb-3">
              <span className="text-gray-400">Date</span>
              <span>{new Date(enquiry.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span className="text-gray-400">Type</span>
              <span>{enquiry.enquiryType}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Product</span>
              <span className="text-green-600">{enquiry.product}</span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="bg-white p-5 rounded-xl border text-sm">

            <div className="grid grid-cols-2 gap-3 mb-3">

              {/* CALL */}
              <button className="flex flex-col items-center justify-center gap-2 bg-gray-100 py-4 rounded-lg hover:bg-gray-200 transition">
                <Phone size={18} className="text-green-600" />
                <span className="text-xs">Call Customer</span>
              </button>

              {/* EMAIL */}
              <button className="flex flex-col items-center justify-center gap-2 bg-gray-100 py-4 rounded-lg hover:bg-gray-200 transition">
                <Mail size={18} className="text-green-600" />
                <span className="text-xs">Send Email</span>
              </button>

            </div>

            <button
              onClick={() => setConfirmBox({ open: true, type: "Contacted" })}
              className="w-full border py-2 rounded-md mb-2"
            >
              Mark as Contacted
            </button>

            <button
              onClick={() => setConfirmBox({ open: true, type: "Closed" })}
              className="w-full border py-2 rounded-md"
            >
              Mark as Closed
            </button>

          </div>

          {/* NOTES */}
          <div className="bg-white p-5 rounded-xl border text-sm">
            <h2 className="font-semibold mb-3">Internal Notes</h2>

            {enquiry?.notes?.map((n, idx) => (
              <div
                key={idx}
                className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-xs mb-3"
              >
                {n.text}
                <div className="text-gray-400 text-[10px] mt-1">
                  Last note • {new Date(n.date).toLocaleString()}
                </div>
              </div>
            ))}

            <textarea
              placeholder="Add note..."
              className="w-full border rounded-md p-2 mb-3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <button
              onClick={handleSaveNote}
              className="bg-green-600 text-white w-full py-2 rounded-md"
            >
              Save Note
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EnquiryOverview;