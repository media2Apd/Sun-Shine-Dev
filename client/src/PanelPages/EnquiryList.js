// import { useState, useRef, useEffect } from "react";
// import { FiCalendar, FiSearch, FiMoreHorizontal, FiEye, FiTrash2 } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import { toast } from "react-hot-toast";
// import { formatDateTime } from "../helpers/formatDateTime";

// const EnquiryList = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);
//   const [enquiries, setEnquiries] = useState([]);
//   const menuRef = useRef(null); // Ref for dropdown menu

//   const [openMenuId, setOpenMenuId] = useState(null);
//   const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

//   const buttonRefs = useRef({});
//   const DROPDOWN_HEIGHT = 120;

//   const handleToggle = (e, id) => {
//     e.stopPropagation();

//     const rect = buttonRefs.current[id].getBoundingClientRect();
//     const spaceBelow = window.innerHeight - rect.bottom;
//     const openUp = spaceBelow < DROPDOWN_HEIGHT;

//     setMenuPos({
//       top: openUp
//         ? rect.top - DROPDOWN_HEIGHT - 6
//         : rect.bottom + 6,
//       left: rect.right - 160,
//     });

//     setOpenMenuId((prev) => (prev === id ? null : id));
//   };

//   useEffect(() => {
//     const close = () => setOpenMenuId(null);
//     document.addEventListener("click", close);
//     return () => document.removeEventListener("click", close);
//   }, []);

//   useEffect(() => {
//     const close = () => setOpenMenuId(null);
//     window.addEventListener("scroll", close, true);
//     return () => window.removeEventListener("scroll", close, true);
//   }, []);

//   const fetchEnquiries = async () => {
//     try {
//       const response = await api({
//         url: SummaryApi.getAllEnquiries.url,
//         method: SummaryApi.getAllEnquiries.method,
//       });

//       if (response.data.success) {
//         setEnquiries(response.data.data);
//       }
//     } catch (error) {
//       console.log("Fetch error", error);
//     }
//   };

//   useEffect(() => {
//     fetchEnquiries();
//   }, []);

// const filteredData = (enquiries || []).filter((item) => {
//   // 🔍 SEARCH FILTER
//   const search = searchTerm.toLowerCase();

//   const matchSearch =
//     item.firstName?.toLowerCase().includes(search) ||
//     item.lastName?.toLowerCase().includes(search) ||
//     item.productId?.name?.toLowerCase().includes(search) ||
//     item.enquiryType?.toLowerCase().includes(search) ||
//     item.contactMethod?.toLowerCase().includes(search);

//   // 📅 DATE FILTER
//   let matchDate = true;

//   if (selectedDate) {
//     const itemDate = new Date(item.createdAt);
//     const selected = new Date(selectedDate);

//     matchDate =
//       itemDate.getFullYear() === selected.getFullYear() &&
//       itemDate.getMonth() === selected.getMonth() &&
//       itemDate.getDate() === selected.getDate();
//   }

//   return matchSearch && matchDate;
// });

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setOpenMenuId(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//     const handleDelete = async () => {
//     try {
//       const response = await api({
//         url: SummaryApi.deleteEnquiry.url(selectedId),
//         method: SummaryApi.deleteEnquiry.method,
//       });

//       if (response.data.success) {
//         toast.success("Enquiry deleted");

//         // remove from UI (no reload needed)
//         setShowDeleteModal(false);
//         setOpenMenuId(null);

//         // optional: refresh page OR filter state
//         fetchEnquiries(); // simple way
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error("Delete failed");
//     }
//   };

//   return (
//     <div className="p-1">

//       {/* TITLE */}
//       <div className="text-xl md:text-2xl font-bold pb-4">
//         Enquiry List
//       </div>

//       {/* FILTER SECTION */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 mb-6">

//         {/* DATE */}
//         <div className="relative w-full md:w-auto">
//           <FiCalendar className="absolute left-3 top-3 text-gray-400" />
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         {/* SEARCH */}
//         <div className="relative w-full md:w-auto">
//           <FiSearch className="absolute left-3 top-3 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-xl overflow-x-auto">

//         <table className="min-w-full border-separate border-spacing-y-3">

//           {/* HEADER */}
//           <thead className="text-sm text-gray-600">
//             <tr className="text-left bg-gray-100">
//               <th className="py-4 px-4 rounded-l-lg">Name</th>
//               <th className="py-4 px-4">Type</th>
//               <th className="py-4 px-4">Product</th>
//               <th className="py-4 px-4">Contact</th>
//               <th className="py-4 px-4">Date</th>
//               <th className="py-4 px-4">Status</th>
//               <th className="py-4 px-4 rounded-r-lg text-center">Action</th>
//             </tr>
//           </thead>

//           {/* BODY */}
//           <tbody>
//             {filteredData.length === 0 ? (
//               <tr>
//                 <td colSpan="8" className="p-4 text-center text-gray-400">
//                   No Enquiries Found
//                 </td>
//               </tr>
//             ) : (
//               filteredData.map((item) => (

//                 <tr key={item._id} className="text-sm text-left relative ">

//                   <td className="py-4 px-4 bg-white border-y border-l rounded-l-lg border-gray-200 whitespace-nowrap">
//                     {item.firstName} {item.lastName}
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {item.enquiryType}
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {item.productId?.name}
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {item.contactMethod}
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-gray-200 whitespace-nowrap">
//                     {formatDateTime(item.createdAt, false)}
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     <div className="flex items-center justify-center gap-2">
                      
//                       {/* Dot */}
//                       <span
//                         className={`w-2.5 h-2.5 rounded-full 
//                         ${
//                           item.currentStatus === "New"
//                             ? "bg-blue-500"
//                             : item.currentStatus === "Contacted"
//                             ? "bg-yellow-500"
//                             : item.currentStatus === "Closed"
//                             ? "bg-green-500"
//                             : "bg-gray-400"
//                         }`}
//                       ></span>

//                       {/* Text */}
//                       <span className="text-sm text-gray-600">
//                         {item.currentStatus || "N/A"}
//                       </span>

//                     </div>
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg relative text-center">

//                 <button
//                   ref={(el) => (buttonRefs.current[item._id] = el)}
//                   onClick={(e) => handleToggle(e, item._id)}
//                 >
//                   <FiMoreHorizontal />
//                 </button>

//                 {openMenuId === item._id && (
//                   <div
//                     style={{
//                       position: "fixed",
//                       top: menuPos.top,
//                       left: menuPos.left,
//                     }}
//                     onClick={(e) => e.stopPropagation()}
//                     className="w-40 bg-white rounded-lg shadow-lg border z-[9999] overflow-hidden"
//                   >
//                   {/* View */}
//                   <button
//                     onClick={() => {
//                       navigate("enquiry-overview", { state: { id: item._id } });
//                       setOpenMenuId(null);
//                     }}
//                     className="w-full flex items-center gap-3 px-4 py-3 text-green-600 hover:bg-gray-50"
//                   >
//                     <FiEye size={16} />
//                     View
//                   </button>

//                   <div className="border-t"></div>

//                   {/* Delete */}
//                   <button
//                     onClick={() => {
//                       setSelectedId(item._id);
//                       setShowDeleteModal(true);
//                       setOpenMenuId(null);
//                     }}
//                     className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-gray-50"
//                   >
//                     <FiTrash2 size={16} />
//                     Delete
//                   </button>
//                   </div>
//                 )}

//                   </td>

//                 </tr>

//               ))
//             )}
//           </tbody>

//         </table>

//       </div>
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl w-[300px] text-center">

//             <h2 className="text-lg font-semibold mb-2">
//               Delete Enquiry?
//             </h2>

//             <p className="text-sm text-gray-500 mb-4">
//               Are you sure you want to delete this enquiry?
//             </p>

//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="px-4 py-2 border rounded-md"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleDelete}
//                 className="px-4 py-2 bg-red-600 text-white rounded-md"
//               >
//                 Delete
//               </button>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EnquiryList;


import { useState, useRef, useEffect } from "react";
import { FiCalendar, FiSearch, FiMoreHorizontal, FiEye, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-hot-toast";
import { formatDateTime } from "../helpers/formatDateTime";

const EnquiryList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const menuRef = useRef(null); // Ref for dropdown menu

  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const buttonRefs = useRef({});
  const DROPDOWN_HEIGHT = 120;

  const handleToggle = (e, id) => {
    e.stopPropagation();

    const rect = buttonRefs.current[id].getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < DROPDOWN_HEIGHT;

    setMenuPos({
      top: openUp
        ? rect.top - DROPDOWN_HEIGHT - 6
        : rect.bottom + 6,
      left: rect.right - 160,
    });

    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const close = () => setOpenMenuId(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  useEffect(() => {
    const close = () => setOpenMenuId(null);
    window.addEventListener("scroll", close, true);
    return () => window.removeEventListener("scroll", close, true);
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await api({
        url: SummaryApi.getAllEnquiries.url,
        method: SummaryApi.getAllEnquiries.method,
      });

      if (response.data.success) {
        setEnquiries(response.data.data);
      }
    } catch (error) {
      console.log("Fetch error", error);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

const filteredData = (enquiries || []).filter((item) => {
  // 🔍 SEARCH FILTER
  const search = searchTerm.toLowerCase();

  const matchSearch =
    item.firstName?.toLowerCase().includes(search) ||
    item.lastName?.toLowerCase().includes(search) ||
    item.productId?.name?.toLowerCase().includes(search) ||
    item.enquiryType?.toLowerCase().includes(search) ||
    item.contactMethod?.toLowerCase().includes(search);

  // 📅 DATE FILTER
  let matchDate = true;

  if (selectedDate) {
    const itemDate = new Date(item.createdAt);
    const selected = new Date(selectedDate);

    matchDate =
      itemDate.getFullYear() === selected.getFullYear() &&
      itemDate.getMonth() === selected.getMonth() &&
      itemDate.getDate() === selected.getDate();
  }

  return matchSearch && matchDate;
});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    const handleDelete = async () => {
    try {
      const response = await api({
        url: SummaryApi.deleteEnquiry.url(selectedId),
        method: SummaryApi.deleteEnquiry.method,
      });

      if (response.data.success) {
        toast.success("Enquiry deleted");

        // remove from UI (no reload needed)
        setShowDeleteModal(false);
        setOpenMenuId(null);

        // optional: refresh page OR filter state
        fetchEnquiries(); // simple way
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-1">

      {/* TITLE */}
      <div className="text-xl md:text-2xl font-bold pb-4">
        Enquiry List
      </div>

      {/* FILTER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 mb-6">

        {/* DATE */}
        <div className="relative w-full md:w-auto">
          <FiCalendar className="absolute left-3 top-3 text-gray-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* SEARCH */}
        <div className="relative w-full md:w-auto">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

      </div>

      {/* TABLE */}
      <div className="rounded-xl overflow-x-auto">

        <table className="min-w-full border-separate border-spacing-y-3">

          {/* HEADER */}
          <thead className="text-sm text-gray-600">
            <tr className="text-left bg-gray-100">
              <th className="py-4 px-4 rounded-l-lg whitespace-nowrap">S. No</th>
              <th className="py-4 px-4">Name</th>
              <th className="py-4 px-4">Type</th>
              <th className="py-4 px-4">Product</th>
              <th className="py-4 px-4">Contact</th>
              <th className="py-4 px-4">Date</th>
              <th className="py-4 px-4 text-center">Status</th>
              <th className="py-4 px-4 rounded-r-lg text-center">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-400">
                  No Enquiries Found
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (

                <tr key={item._id} className="text-sm text-left relative ">

                  <td className="py-4 px-4 bg-white border-y border-l rounded-l-lg border-gray-200 whitespace-nowrap">
                    {index + 1}
                  </td>

                  <td className="py-4 px-4 bg-white border-y border-gray-200 whitespace-nowrap">
                    {item.firstName} {item.lastName}
                  </td>

                  <td className="py-4 px-4 bg-white border-y border-gray-200">
                    {item.enquiryType}
                  </td>

                  <td className="py-4 px-4 bg-white border-y border-gray-200">
                    {item.productId?.name}
                  </td>

                  <td className="py-4 px-4 bg-white border-y border-gray-200">
                    {item.contactMethod}
                  </td>

                  <td className="py-4 px-4 bg-white border-y border-gray-200 whitespace-nowrap">
                    {formatDateTime(item.createdAt, false)}
                  </td>

                  <td className="py-4 px-4 bg-white border-y border-gray-200">
                    <div className="flex items-center justify-center gap-2">
                      
                      {/* Dot */}
                      <span
                        className={`w-2.5 h-2.5 rounded-full 
                        ${
                          item.currentStatus === "New"
                            ? "bg-blue-500"
                            : item.currentStatus === "Contacted"
                            ? "bg-yellow-500"
                            : item.currentStatus === "Closed"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      ></span>

                      {/* Text */}
                      <span className="text-sm text-gray-600">
                        {item.currentStatus || "N/A"}
                      </span>

                    </div>
                  </td>

                  <td className="py-4 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg relative text-center">

                <button
                  ref={(el) => (buttonRefs.current[item._id] = el)}
                  onClick={(e) => handleToggle(e, item._id)}
                >
                  <FiMoreHorizontal />
                </button>

                {openMenuId === item._id && (
                  <div
                    style={{
                      position: "fixed",
                      top: menuPos.top,
                      left: menuPos.left,
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-40 bg-white rounded-lg shadow-lg border z-[9999] overflow-hidden"
                  >
                  {/* View */}
                  <button
                    onClick={() => {
                      navigate("enquiry-overview", { state: { id: item._id } });
                      setOpenMenuId(null);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-green-600 hover:bg-gray-50"
                  >
                    <FiEye size={16} />
                    View
                  </button>

                  <div className="border-t"></div>

                  {/* Delete */}
                  <button
                    onClick={() => {
                      setSelectedId(item._id);
                      setShowDeleteModal(true);
                      setOpenMenuId(null);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-gray-50"
                  >
                    <FiTrash2 size={16} />
                    Delete
                  </button>
                  </div>
                )}

                  </td>

                </tr>

              ))
            )}
          </tbody>

        </table>

      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[300px] text-center">

            <h2 className="text-lg font-semibold mb-2">
              Delete Enquiry?
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete this enquiry?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiryList;