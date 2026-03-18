// import { useContext, useState } from "react";
// import { CategoryContext } from "../Context/CategoryContext";
// import { useNavigate } from "react-router-dom";
// import { FiPlus } from "react-icons/fi";
// import {
//   FiCalendar,
//   FiSearch,
//   FiMoreHorizontal,
// } from "react-icons/fi";

// const EnquiryList = () => {
//   const { category, deleteCategory, toggleHideCategory } = useContext(CategoryContext);
//   const navigate = useNavigate();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [openMenuId, setOpenMenuId] = useState(null);

//   const visibleProducts = category;

//   const filteredProducts = visibleProducts
//     .filter(
//       (item) =>
//         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.category?.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .filter((item) =>
//       selectedDate
//         ? item.createdDate === new Date(selectedDate).toLocaleDateString()
//         : true
//     );

//   return (
//     <div className="p-1">

//       {/* TITLE */}
//       <div className="text-xl md:text-2xl font-bold pb-4">
//         Product Category List
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

//         {/* ADD CATEGORY BUTTON */}
//         <button
//           onClick={() => navigate("/admin-panel/create-category")}
//           className="bg-green-600 text-white w-10 h-10 items-center justify-center rounded-full hover:bg-green-700 hidden min-[431px]:flex"
//         >
//           <FiPlus size={26} />
//         </button>

//         <button
//           onClick={() => navigate("/admin-panel/create-category")}
//           className="bg-green-600 text-white px-3 py-2 rounded-lg w-full max-[430px]:block hidden"
//         >
//           + Add
//         </button>

//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-xl overflow-x-auto">

//         <table className="min-w-full border-separate border-spacing-y-3">

//           {/* HEADER */}
//           <thead className="text-sm text-gray-600">
//             <tr className="text-center bg-gray-100">
//               <th className="py-4 px-4 rounded-l-lg">Name</th>
//               <th className="py-4 px-4">Products</th>
//               <th className="py-4 px-4">Status</th>
//               <th className="py-4 px-4">Visibility</th>
//               <th className="py-4 px-4">Created</th>
//               <th className="py-4 px-4 rounded-r-lg">Action</th>
//             </tr>
//           </thead>

//           {/* BODY */}
//           <tbody>
//             {filteredProducts.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="p-4 text-center text-gray-400">
//                   No matching category found
//                 </td>
//               </tr>
//             ) : (
//               filteredProducts.map((item) => (

//                 <tr key={item.id} className="text-sm text-center">

//                   {/* NAME */}
//                   <td className="py-4 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">
//                     {item.name}
//                   </td>

//                   {/* PRODUCTS */}
//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {item.productCount}
//                   </td>

//                   {/* STATUS */}
//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {item.status}
//                   </td>

//                   {/* VISIBILITY */}
//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {item.showOnWebsite ? "Visible" : "Hidden"}
//                   </td>

//                   {/* CREATED */}
//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {item.createdDate}
//                   </td>

//                   {/* ACTION */}
//                   <td className="py-4 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg relative">

//                     <button
//                       onClick={() =>
//                         setOpenMenuId(openMenuId === item.id ? null : item.id)
//                       }
//                     >
//                       <FiMoreHorizontal />
//                     </button>

//                     {openMenuId === item.id && (
//                       <div className="absolute right-3 mt-2 w-32 bg-white border rounded-lg shadow-md text-sm z-10">

//                         <button
//                           onClick={() => navigate(`/admin-panel/view-category/${item.id}`)}
//                           className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                         >
//                           View
//                         </button>

//                         <button
//                           onClick={() => navigate(`/admin-panel/edit-category/${item.id}`)}
//                           className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                         >
//                           Edit
//                         </button>

//                         <button
//                           onClick={() => toggleHideCategory(item.id)}
//                           className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                         >
//                           {item.showOnWebsite ? "Hide" : "Show"}
//                         </button>

//                         <button
//                           onClick={() => deleteCategory(item.id)}
//                           className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
//                         >
//                           Delete
//                         </button>

//                       </div>
//                     )}

//                   </td>

//                 </tr>

//               ))
//             )}
//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// };

// export default EnquiryList;

// import { useState } from "react";
// import { useEnquiry } from "../Context/EnquiryContext";
// import { FiSearch, FiMoreHorizontal } from "react-icons/fi";

// const EnquiryList = () => {
//   const { enquiry } = useEnquiry(); // ✅ use enquiry data

//   const [searchTerm, setSearchTerm] = useState("");
//   const [openMenuId, setOpenMenuId] = useState(null);

//   const filteredData = enquiry.filter(
//     (item) =>
//       item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.product.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-1">

//       <div className="text-xl md:text-2xl font-bold pb-4">
//         Enquiry List
//       </div>

//       {/* SEARCH */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="px-4 py-2 border rounded-lg w-full md:w-64"
//         />
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-xl overflow-x-auto">

//         <table className="min-w-full border-separate border-spacing-y-3">

//           {/* HEADER */}
//           <thead>
//             <tr className="text-center bg-gray-100 text-sm">
//               <th className="py-3 px-3 rounded-l-lg">Enquiry ID</th>
//               <th className="py-3 px-3">Name</th>
//               <th className="py-3 px-3">Type</th>
//               <th className="py-3 px-3">Product</th>
//               <th className="py-3 px-3">Contact</th>
//               <th className="py-3 px-3">Date</th>
//               <th className="py-3 px-3">Status</th>
//               <th className="py-3 px-3 rounded-r-lg">Action</th>
//             </tr>
//           </thead>

//           {/* BODY */}
//           <tbody>
//             {filteredData.length === 0 ? (
//               <tr>
//                 <td colSpan="8" className="text-center py-4 text-gray-400">
//                   No Enquiries Found
//                 </td>
//               </tr>
//             ) : (
//               filteredData.map((item, index) => (

//                 <tr key={index} className="text-center text-sm">

//                   <td className="py-3 px-3 bg-white border-y border-l rounded-l-lg">
//                     {item.id || index + 1}
//                   </td>

//                   <td className="py-3 px-3 bg-white border-y">
//                     {item.firstName} {item.lastName}
//                   </td>

//                   <td className="py-3 px-3 bg-white border-y">
//                     {item.enquiryType}
//                   </td>

//                   <td className="py-3 px-3 bg-white border-y">
//                     {item.product}
//                   </td>

//                   <td className="py-3 px-3 bg-white border-y">
//                     {item.contactMethod}
//                   </td>

//                   <td className="py-3 px-3 bg-white border-y">
//                     {new Date().toLocaleDateString()}
//                   </td>

//                   <td className="py-3 px-3 bg-white border-y">
//                     Pending
//                   </td>

//                   <td className="py-3 px-3 bg-white border-y border-r rounded-r-lg relative">

//                     <button
//                       onClick={() =>
//                         setOpenMenuId(openMenuId === index ? null : index)
//                       }
//                     >
//                       <FiMoreHorizontal />
//                     </button>

//                     {openMenuId === index && (
//                       <div className="absolute right-3 mt-2 w-28 bg-white border rounded-lg shadow-md text-sm">

//                         <button className="block w-full text-left px-3 py-2 hover:bg-gray-100">
//                           View
//                         </button>

//                         <button className="block w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100">
//                           Delete
//                         </button>

//                       </div>
//                     )}

//                   </td>

//                 </tr>

//               ))
//             )}
//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// };

// export default EnquiryList;

// import { useState } from "react";
// import { useEnquiry } from "../Context/EnquiryContext";
// import { FiSearch, FiMoreHorizontal } from "react-icons/fi";

// const EnquiryList = () => {
//   const { enquiries } = useEnquiry(); // ✅ FIX
//   const [searchTerm, setSearchTerm] = useState("");
//   const [openMenuId, setOpenMenuId] = useState(null);

//   const filteredData = (enquiries || []).filter(
//     (item) =>
//       item.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.product?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-1">

//       {/* TITLE */}
//       <div className="text-xl md:text-2xl font-bold pb-4">
//         Enquiry List
//       </div>

//       {/* SEARCH */}
//       <div className="mb-6">
//         <div className="relative w-full md:w-64">
//           <FiSearch className="absolute left-3 top-3 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-9 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-xl overflow-x-auto">

//         <table className="min-w-full border-separate border-spacing-y-3">

//           {/* HEADER */}
//           <thead className="text-sm text-gray-600">
//             <tr className="text-center bg-gray-100">
//               <th className="py-4 px-4 rounded-l-lg">Enquiry ID</th>
//               <th className="py-4 px-4">Name</th>
//               <th className="py-4 px-4">Type</th>
//               <th className="py-4 px-4">Product</th>
//               <th className="py-4 px-4">Contact</th>
//               <th className="py-4 px-4">Date</th>
//               <th className="py-4 px-4">Status</th>
//               <th className="py-4 px-4 rounded-r-lg">Action</th>
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

//                 <tr key={item.id} className="text-sm text-center">

//                   {/* ID */}
//                   <td className="py-4 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">
//                     {item.id}
//                   </td>

//                   {/* NAME */}
//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {item.firstName} {item.lastName}
//                   </td>

//                   {/* TYPE */}
//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {item.enquiryType}
//                   </td>

//                   {/* PRODUCT */}
//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {item.product}
//                   </td>

//                   {/* CONTACT */}
//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {item.contactMethod}
//                   </td>

//                   {/* DATE */}
//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {new Date(item.createdAt).toLocaleDateString()}
//                   </td>

//                   {/* STATUS */}
//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     <span className="text-yellow-600 font-medium">
//                       Pending
//                     </span>
//                   </td>

//                   {/* ACTION */}
//                   <td className="py-4 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg relative">

//                     <button
//                       onClick={() =>
//                         setOpenMenuId(openMenuId === item.id ? null : item.id)
//                       }
//                     >
//                       <FiMoreHorizontal />
//                     </button>

//                     {openMenuId === item.id && (
//                       <div className="absolute right-3 mt-2 w-32 bg-white border rounded-lg shadow-md text-sm z-10">

//                         <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
//                           View
//                         </button>

//                         <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
//                           Delete
//                         </button>

//                       </div>
//                     )}

//                   </td>

//                 </tr>

//               ))
//             )}
//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// };

// export default EnquiryList;


import { useState } from "react";
import { useEnquiry } from "../Context/EnquiryContext";
import { FiCalendar, FiSearch, FiMoreHorizontal } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const EnquiryList = () => {
  const { enquiries } = useEnquiry(); // ✅ FIX
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  const filteredData = (enquiries || [])
    .filter(
      (item) =>
        item.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.product?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      selectedDate
        ? new Date(item.createdAt).toLocaleDateString() ===
          new Date(selectedDate).toLocaleDateString()
        : true
    );

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
      <div className="bg-white rounded-xl overflow-x-auto">

        <table className="min-w-full border-separate border-spacing-y-3">

          {/* HEADER */}
          <thead className="text-sm text-gray-600">
            <tr className="text-center bg-gray-100">
              <th className="py-4 px-4 rounded-l-lg">Enquiry ID</th>
              <th className="py-4 px-4">Name</th>
              <th className="py-4 px-4">Type</th>
              <th className="py-4 px-4">Product</th>
              <th className="py-4 px-4">Contact</th>
              <th className="py-4 px-4">Date</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4 rounded-r-lg">Action</th>
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
              filteredData.map((item) => (

                <tr key={item.id} className="text-sm text-center">

                  <td className="py-4 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">
                    {item.id}
                  </td>

                  <td className="py-4 px-4 bg-white border-y border-gray-200">
                    {item.firstName} {item.lastName}
                  </td>

                  <td className="py-4 px-4 bg-white border-y border-gray-200">
                    {item.enquiryType}
                  </td>

                  <td className="py-4 px-4 bg-white border-y border-gray-200">
                    {item.product}
                  </td>

                  <td className="py-4 px-4 bg-white border-y border-gray-200">
                    {item.contactMethod}
                  </td>

                  <td className="py-4 px-4 bg-white border-y border-gray-200">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-4 px-4 bg-white border-y border-gray-200">
                    <span className="text-yellow-600 font-medium">
                      {item.status || "N/A"}
                    </span>
                  </td>

                  <td className="py-4 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg relative">

                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === item.id ? null : item.id)
                      }
                    >
                      <FiMoreHorizontal />
                    </button>

                    {openMenuId === item.id && (
                      <div className="absolute right-3 mt-2 w-32 bg-white border rounded-lg shadow-md text-sm z-10">

                        <button onClick={()=> navigate("enquiry-overview",{ state: { id: item.id } })} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                          View
                        </button>

                        <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
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

    </div>
  );
};

export default EnquiryList;