// import { useContext, useState } from "react";
// import { CategoryContext } from "../Context/CategoryContext";
// import { useNavigate } from "react-router-dom";
// import { FiPlus } from "react-icons/fi";
// import {
//   FiCalendar,
//   FiSearch,
//   FiMoreHorizontal,
// } from "react-icons/fi";

// const OrderlistPage = () => {
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

// export default OrderlistPage;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiSearch, FiMoreHorizontal } from "react-icons/fi";
import { useOrder } from "../Context/OrderContext";

const OrderlistPage = () => {
  const { orderData, setOrderData } = useOrder();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  // Filter orders safely
  const filteredOrders = orderData
    .filter(
      (order) =>
        (order.customer?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (order.id?.toString() || "").includes(searchTerm)
    )
    .filter((order) =>
      selectedDate
        ? order.orderDate === new Date(selectedDate).toLocaleDateString()
        : true
    );

  // Delete order
  const deleteOrder = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrderData(orderData.filter((order) => order.id !== id));
    }
  };

  // Toggle status
  const toggleOrderStatus = (id) => {
    const updated = orderData.map((order) =>
      order.id === id
        ? {
            ...order,
            status: order.status === "Pending" ? "Completed" : "Pending",
          }
        : order
    );
    setOrderData(updated);
  };

  return (
    <div className="p-1">

      {/* TITLE */}
      <div className="text-xl md:text-2xl font-bold pb-4">
        Orders List
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
              <th className="py-4 px-4 rounded-l-lg">Order ID</th>
              <th className="py-4 px-4">Customer</th>
              <th className="py-4 px-4">Items</th>
              <th className="py-4 px-4">Amount</th>
              <th className="py-4 px-4">Order Date</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4 rounded-r-lg">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          {/* <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-400">
                  No matching orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id || Math.random()} className="text-sm text-center">
                  <td className="py-4 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">
                    {order.id || "N/A"}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-200">
                    {order.customer || "Unknown"}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-200">
                    {order.items?.length || 0}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-200">
                    ${order.amount?.toFixed(2) || "0.00"}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-200">
                    {order.orderDate || "N/A"}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-200">
                    {order.status || "Pending"}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === order.id ? null : order.id)
                      }
                    >
                      <FiMoreHorizontal />
                    </button>

                    {openMenuId === order.id && (
                      <div className="absolute right-3 mt-2 w-32 bg-white border rounded-lg shadow-md text-sm z-10">
                        <button
                          onClick={() => navigate(`/admin-panel/view-order/${order.id}`)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          View
                        </button>
                        <button
                          onClick={() => navigate(`/admin-panel/edit-order/${order.id}`)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => toggleOrderStatus(order.id)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          {order.status === "Pending" ? "Mark Completed" : "Mark Pending"}
                        </button>
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody> */}
          <tbody>
  {filteredOrders.length === 0 ? (
    <tr>
      <td colSpan="7" className="p-4 text-center text-gray-400">
        No matching orders found
      </td>
    </tr>
  ) : (
    filteredOrders.map((order) => (
      <tr key={order.orderId} className="text-sm text-center">
        <td className="py-4 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">
          {order.orderId || "N/A"}
        </td>
        <td className="py-4 px-4 bg-white border-y border-gray-200">
          {order.billingAddress
            ? `${order.billingAddress.firstName} ${order.billingAddress.lastName}`
            : "Unknown"}
        </td>
        <td className="py-4 px-4 bg-white border-y border-gray-200">
          {order.items?.length || 0}
        </td>
        <td className="py-4 px-4 bg-white border-y border-gray-200">
          ${order.total?.toFixed(2) || "0.00"}
        </td>
        <td className="py-4 px-4 bg-white border-y border-gray-200">
          {order.createdAt
            ? new Date(order.createdAt).toLocaleDateString()
            : "N/A"}
        </td>
        <td className="py-4 px-4 bg-white border-y border-gray-200">
          {order.status ? "Completed" : "Pending"}
        </td>
        <td className="py-4 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg relative">
          {/* Your action buttons like View/Edit/Delete */}
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

export default OrderlistPage;
