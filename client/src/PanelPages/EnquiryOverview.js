

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
//             <FileText className="text-[#00B207]" />
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
//           <button className="bg-[#00B207] text-white px-4 py-2 rounded-md text-sm">
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
//               <span className="text-[#00B207]">●</span> Customer Information
//             </h2>

//             <div className="grid md:grid-cols-2 gap-4 text-sm">
//               <div>
//                 <p className="text-[#747484]">Company</p>
//                 <p className="font-medium">{enquiry.company}</p>
//               </div>
//               <div>
//                 <p className="text-[#747484]">Phone</p>
//                 <p className="font-medium">{enquiry.phone}</p>
//               </div>
//               <div>
//                 <p className="text-[#747484]">Email</p>
//                 <p className="font-medium">{enquiry.email}</p>
//               </div>
//               <div>
//                 <p className="text-[#747484]">Location</p>
//                 <p className="font-medium">{enquiry.location}</p>
//               </div>
//             </div>
//           </div>

//           {/* ENQUIRY DETAILS */}
//           <div className="bg-white p-5 rounded-xl border">
//             <h2 className="font-semibold mb-4 flex items-center gap-2">
//               <span className="text-[#00B207]">●</span> Enquiry Details
//             </h2>

//             <div className="grid md:grid-cols-2 gap-4 text-sm">
//               <div>
//                 <p className="text-[#747484]">Type</p>
//                 <p>{enquiry.enquiryType}</p>
//               </div>
//               <div>
//                 <p className="text-[#747484]">Product Interested</p>
//                 <p>{enquiry.product}</p>
//               </div>
//               <div>
//                 <p className="text-[#747484]">Quantity</p>
//                 <p>{enquiry.quantity}</p>
//               </div>
//               <div>
//                 <p className="text-[#747484]">Preferred Contact Method</p>
//                 <p>{enquiry.contactMethod}</p>
//               </div>
//             </div>
//           </div>

//           {/* MESSAGE */}
//           <div className="bg-white p-5 rounded-xl border">
//             <h2 className="font-semibold mb-3 flex items-center gap-2">
//               <span className="text-[#00B207]">●</span> Customer Message
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
//               <span className="text-[#747484]">Enquiry ID</span>
//               <span className="font-medium">#{enquiry.id}</span>
//             </div>

//             <div className="flex justify-between mb-3">
//               <span className="text-[#747484]">Status</span>
//               <span className="text-[#00B207] bg-green-100 px-2 py-1 rounded text-xs">
//                 New
//               </span>
//             </div>

//             <div className="flex justify-between mb-3">
//               <span className="text-[#747484]">Date</span>
//               <span>{new Date(enquiry.createdAt).toLocaleDateString()}</span>
//             </div>

//             <div className="flex justify-between mb-3">
//               <span className="text-[#747484]">Type</span>
//               <span>{enquiry.enquiryType}</span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-[#747484]">Product</span>
//               <span className="text-[#00B207]">{enquiry.product}</span>
//             </div>
//           </div>

//           {/* ACTIONS */}
//           {/* <div className="bg-white p-5 rounded-xl border space-y-3 text-sm">

//             <button className="flex items-center justify-center gap-2 w-full border py-2 rounded-md hover:bg-gray-50">
//               <Phone size={16} className="text-[#00B207]" />
//               Call Customer
//             </button>

//             <button className="flex items-center justify-center gap-2 w-full border py-2 rounded-md hover:bg-gray-50">
//               <Mail size={16} className="text-[#00B207]" />
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
//       <Phone size={18} className="text-[#00B207]" />
//       <span className="text-xs">Call Customer</span>
//     </button>

//     {/* EMAIL */}
//     <button className="flex flex-col items-center justify-center gap-2 bg-gray-100 py-4 rounded-lg hover:bg-gray-200 transition">
//       <Mail size={18} className="text-[#00B207]" />
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
//                 <div className="text-[#747484] text-[10px] mt-1">
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
//               className="bg-[#00B207] text-white w-full py-2 rounded-md"
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
import { Phone, Mail, FileText, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import ConfirmModal from "../panelComponents/ConfirmModal"
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import { useEffect } from "react";
import { AiOutlineFileUnknown } from "react-icons/ai";
import { FaRegMessage } from "react-icons/fa6";
import { AiOutlineHistory } from "react-icons/ai";
import toast from "react-hot-toast";
import { formatDateTime } from "../helpers/formatDateTime";

const EnquiryOverview = () => {
  const location = useLocation();
  const id = location.state?.id;
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmBox, setConfirmBox] = useState({
    open: false,
    type: "",
  });
  const [statusNote, setStatusNote] = useState("");

  useEffect(() => {
  const fetchEnquiry = async () => {
    try {
      const res = await api({
        url: SummaryApi.getOneEnquiry.url(id),
        method: SummaryApi.getOneEnquiry.method,
      });

      if (res.data.success) {
        setEnquiry(res.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (id) fetchEnquiry();
  }, [id]);

  const handleConfirm = async () => {
    try {
      // ❌ Prevent direct close
      if (
        confirmBox.type === "Closed" &&
        enquiry.currentStatus !== "Contacted"
      ) {
        toast.error("First mark as Contacted");
        return;
      }

      // ❌ Note required only for Contacted
      if (confirmBox.type === "Contacted" && !statusNote.trim()) {
        toast.error("Please add note before marking Contacted");
        return;
      }

      const res = await api({
        url: SummaryApi.updateStatusEnquiry.url(enquiry._id),
        method: SummaryApi.updateStatusEnquiry.method,
        data: {
          status: confirmBox.type,
          note:
            confirmBox.type === "Contacted"
              ? statusNote
              : "Marked as Closed",
        },
      });

      if (res.data.success) {
        toast.success("Status updated");

        // update UI
        setEnquiry((prev) => ({
          ...prev,
          currentStatus: confirmBox.type,
          statusHistory: [
            ...prev.statusHistory,
            {
              status: confirmBox.type,
              note:
                confirmBox.type === "Contacted"
                  ? statusNote
                  : "Marked as Closed",
              updatedAt: new Date(),
            },
          ],
        }));

        setStatusNote("");
        setConfirmBox({ open: false, type: "" });
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

if (loading) return <div className="p-6">Loading...</div>;
if (!enquiry) return <div className="p-6">No Enquiry Found</div>;

  return (
    <div className="min-h-screen bg-white">
       
    <ConfirmModal
      open={confirmBox.open}
      title="Confirm Status Change"
      message={`Mark as ${confirmBox.type}?`}
      onConfirm={handleConfirm}
      onCancel={() => {
        setConfirmBox({ open: false, type: "" });
        setStatusNote("");
      }}
    >

      {/* 🔥 SHOW ONLY FOR CONTACTED */}
      {confirmBox.type === "Contacted" && (
        <textarea
          placeholder="Enter note (required)..."
          className="w-full border rounded-md p-2 mt-2"
          value={statusNote}
          onChange={(e) => setStatusNote(e.target.value)}
        />
      )}

    </ConfirmModal>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-md">
            <FileText className="text-[#00B207]" />
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
          <div className="bg-white rounded-xl border border-[#E2E8F0]">
            <div className="border-b border-[#E2E8F0] p-3">
            <h2 className="font-semibold flex items-center gap-2">
              <span className="text-[#00B207]"><User/></span> Customer Information
            </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm p-5">
              <div>
                <p className="text-[#747484]">Company</p>
                <p className="font-semibold text-base text-black">{enquiry.company}</p>
              </div>
              <div>
                <p className="text-[#747484]">Phone</p>
                <p className="font-semibold text-base text-black">{enquiry.phone}</p>
              </div>
              <div>
                <p className="text-[#747484]">Email</p>
                <p className="font-semibold text-base text-black">{enquiry.email}</p>
              </div>
              <div>
                <p className="text-[#747484]">Location</p>
                <p className="font-semibold text-base text-black">{enquiry.location}</p>
              </div>
            </div>
          </div>

          {/* ENQUIRY DETAILS */}
          <div className="bg-white rounded-xl border border-[#E2E8F0]">
            <div className="border-b border-[#E2E8F0] p-3">

            <h2 className="font-semibold flex items-center gap-2">
              <span className="text-[#00B207]"><AiOutlineFileUnknown  className="w-5 h-5" /></span> Enquiry Details
            </h2>
              </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm p-5">
              <div>
                <p className="text-[#747484]">Type</p>
                <p className="font-semibold text-base text-black">{enquiry.enquiryType}</p>
              </div>
              <div>
                <p className="text-[#747484]">Product Interested</p>
                <p className="font-semibold text-base text-black">{enquiry.productId?.name}</p>
              </div>
              <div>
                <p className="text-[#747484]">Quantity</p>
                <p className="font-semibold text-base text-black">{enquiry.quantity}</p>
              </div>
              <div>
                <p className="text-[#747484]">Preferred Contact Method</p>
                <p className="font-semibold text-base text-black">{enquiry.contactMethod}</p>
              </div>
            </div>
          </div>

          {/* MESSAGE */}
          <div className="bg-white rounded-xl border border-[#E2E8F0]">
            <div className="border-b border-[#E2E8F0] p-3">
            <h2 className="font-semibold flex items-center gap-2">
              <span className="text-[#00B207]"><FaRegMessage /></span> Customer Message
            </h2>
            </div>
            <div className="bg-[#1C5F200D] rounded-b-lg py-3">
            <p className="text-gray-600 text-sm p-4">
              {enquiry.message}
            </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* SUMMARY CARD */}
          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] text-sm">


            <div className="flex justify-between mb-3">
              <span className="text-[#747484]">Status</span>
              <span className={`px-2 py-1 rounded text-sm ${
                enquiry.currentStatus === "Closed"
                  ? "text-red-600 bg-red-100"
                  : enquiry.currentStatus === "Contacted"
                  ? "text-blue-600 bg-blue-100"
                  : "text-[#00B207] bg-[#DCFCE7]"
              }`}>
                {enquiry.currentStatus || "N/A"}
              </span>
            </div>

            <div className="flex justify-between mb-3">
              <span className="text-[#747484] text-sm">Date</span>
              <span className="text-black font-semibold">{formatDateTime(enquiry.createdAt, false)}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span className="text-[#747484] text-sm">Type</span>
              <span className="text-black font-semibold">{enquiry.enquiryType}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#747484] text-sm">Product</span>
              <span className="text-[#00B207] font-semibold">{enquiry.productId?.name}</span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] text-sm">

            <div className="grid grid-cols-2 gap-3 mb-3">

              {/* CALL */}
              <button className="flex flex-col items-center justify-center gap-2 bg-[#F8FAFC] py-4 rounded-lg hover:bg-[#f5f8fc] transition">
                <Phone size={18} className="text-[#00B207]" />
                <span className="text-xs">Call Customer</span>
              </button>

              {/* EMAIL */}
              <button className="flex flex-col items-center justify-center gap-2 bg-[#F8FAFC] py-4 rounded-lg hover:bg-[#f5f8fc] transition">
                <Mail size={18} className="text-[#00B207]" />
                <span className="text-xs">Send Email</span>
              </button>

            </div>

            <button
              onClick={() => setConfirmBox({ open: true, type: "Contacted" })}
              disabled={enquiry.currentStatus !== "New"}
              className={`w-full border py-2 rounded-md mb-2 ${
                enquiry.currentStatus !== "New"
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Mark as Contacted
            </button>
            <button
              onClick={() => setConfirmBox({ open: true, type: "Closed" })}
              disabled={enquiry.currentStatus !== "Contacted"}
              className={`w-full border py-2 rounded-md ${
                enquiry.currentStatus !== "Contacted"
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Mark as Closed
            </button>

          </div>

          {/* STATUS HISTORY / NOTES */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] text-sm">
            <div className="border-b border-[#E2E8F0] p-3">
            <h2 className="font-semibold flex items-center gap-2">
            <span className="text-[#00B207]"><AiOutlineHistory  className="w-5 h-5" /></span> Status History
            </h2>
            </div>
            <div className="p-3">
              {enquiry?.statusHistory?.length > 0 ? (
                enquiry.statusHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 text-xs mb-3 border-l-4 rounded 
                    ${
                      item.status === "New"
                        ? "bg-blue-50 border-blue-400"
                        : item.status === "Contacted"
                        ? "bg-yellow-50 border-yellow-400"
                        : item.status === "Closed"
                        ? "bg-green-50 border-green-400"
                        : "bg-gray-50 border-gray-300"
                    }`}
                  >
                    {/* STATUS */}
                    <div
                      className={`font-medium 
                      ${
                        item.status === "New"
                          ? "text-blue-600"
                          : item.status === "Contacted"
                          ? "text-yellow-600"
                          : item.status === "Closed"
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {item.status}
                    </div>

                    {/* NOTE */}
                    <div className="text-gray-600 mt-1">
                      {item.note}
                    </div>

                    {/* DATE */}
                    <div className="text-[#747484] text-[10px] mt-1">
                      {formatDateTime(item.updatedAt)}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No history available</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EnquiryOverview;