
// import { useState, useRef, useEffect, useContext } from "react";

// import { FiMoreHorizontal } from "react-icons/fi";
// import { LoginContext } from "../Context/LoginContext";
// import { useOrder } from "../Context/OrderContext";

// const CustomerList = () => {
//   const { users } = useContext(LoginContext);
//   const { orderData } = useOrder();

//   const [customers, setCustomers] = useState([]);
//   const [openMenuId, setOpenMenuId] = useState(null);
//   const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

//   const btnRefs = useRef({});
//   const menuRef = useRef(null);

//   // 🔹 Build customers dynamically
//   useEffect(() => {
//     if (!users) return;

//     const customerList = users.map((user) => {
//       const userOrders = orderData.filter(
//         (order) => order.customerId === user.customerId
//       );

//       const totalOrders = userOrders.length;

//       const lastOrder =
//         totalOrders > 0
//           ? userOrders[userOrders.length - 1]?.createdAt?.slice(0, 10)
//           : "N/A";

//       const totalSpend =
//         totalOrders > 0
//           ? "₹" +
//             userOrders.reduce(
//               (sum, order) => sum + Number(order.total || 0),
//               0
//             )
//           : "N/A";

//       return {
//         id: user.customerId,
//         name: user.name || user.email || "User",
//         contact: user.phone || "N/A",
//         totalOrders: totalOrders || "N/A",
//         lastOrder,
//         totalSpend,
//       };
//     });

//     setCustomers(customerList);
//   }, [users, orderData]);

//   const handleToggle = (id) => {
//     if (openMenuId === id) {
//       setOpenMenuId(null);
//     } else {
//       const rect = btnRefs.current[id].getBoundingClientRect();
//       let top = rect.bottom + 5;
//       let left = rect.right - 140;

//       if (window.innerHeight - rect.bottom < 150) top = rect.top - 150;
//       if (window.innerWidth - rect.right < 150) left = rect.left - 120;

//       setMenuPosition({ top, left });
//       setOpenMenuId(id);
//     }
//   };

//   const handleDelete = (id) => {
//     if (!window.confirm("Are you sure you want to delete this customer?")) return;

//     const updatedCustomers = customers.filter((c) => c.id !== id);
//     setCustomers(updatedCustomers);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target) &&
//         !Object.values(btnRefs.current).some((btn) =>
//           btn?.contains(event.target)
//         )
//       ) {
//         setOpenMenuId(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="p-4">
//       <div className="text-xl md:text-2xl font-bold pb-4">Customer List</div>

//       <div className="bg-white rounded-xl overflow-x-auto">
//         <table className="min-w-full border-separate border-spacing-y-3">
//           <thead className="text-sm text-gray-600">
//             <tr className="text-center bg-gray-100">
//               <th className="py-4 px-4 rounded-l-lg">Customer ID</th>
//               <th className="py-4 px-4">Name</th>
//               <th className="py-4 px-4">Contact</th>
//               <th className="py-4 px-4">Total Orders</th>
//               <th className="py-4 px-4">Last Order</th>
//               <th className="py-4 px-4">Total Spend</th>
//               <th className="py-4 px-4 rounded-r-lg">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {customers.map((c) => (
//               <tr key={c.id} className="text-sm text-center">
//                 <td className="py-4 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">
//                   {c.id}
//                 </td>
//                 <td className="py-4 px-4 bg-white border-y border-gray-200">
//                   {c.name}
//                 </td>
               
//                 <td className="py-4 px-4 bg-white border-y border-gray-200">
//                   {c.contact}
//                 </td>
//                 <td className="py-4 px-4 bg-white border-y border-gray-200">
//                   {c.totalOrders}
//                 </td>
//                 <td className="py-4 px-4 bg-white border-y border-gray-200">
//                   {c.lastOrder}
//                 </td>
//                 <td className="py-4 px-4 bg-white border-y border-gray-200">
//                   {c.totalSpend}
//                 </td>
//                 <td className="py-4 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg relative">
//                   <button
//                     ref={(el) => (btnRefs.current[c.id] = el)}
//                     onClick={() => handleToggle(c.id)}
//                   >
//                     <FiMoreHorizontal />
//                   </button>

//                   {openMenuId === c.id && (
//                     <div
//                       ref={menuRef}
//                       className="fixed w-28 bg-white border rounded-lg shadow-lg text-sm z-[9999]"
//                       style={{ top: menuPosition.top, left: menuPosition.left }}
//                     >
//                       <button
//                         onClick={() => handleDelete(c.id)}
//                         className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CustomerList;

import { useState, useRef, useEffect, useContext } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";
import { useOrder } from "../Context/OrderContext";

const CustomerList = () => {
  const { users } = useContext(LoginContext);
  const { orderData } = useOrder();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const btnRefs = useRef({});
  const menuRef = useRef(null);

  useEffect(() => {
    if (!users) return;

    const customerList = users.map((user) => {
      const userOrders = orderData.filter(
        (order) => order.customerId === user.customerId
      );

      const totalOrders = userOrders.length;

      const lastOrder =
        totalOrders > 0
          ? userOrders[userOrders.length - 1]?.createdAt?.slice(0, 10)
          : "N/A";

      const totalSpend =
        totalOrders > 0
          ? "₹" +
            userOrders.reduce(
              (sum, order) => sum + Number(order.total || 0),
              0
            )
          : "N/A";

      return {
        id: user.customerId,
       mail: user.name || user.email || "User",
        customerType: totalOrders > 5 ? "VIP" : "Regular",
        contact: user.phone || "N/A",
        totalOrders: totalOrders || "N/A",
        lastOrder,
        totalSpend,
      };
    });

    setCustomers(customerList);
  }, [users, orderData]);

  const handleToggle = (id) => {
    if (openMenuId === id) {
      setOpenMenuId(null);
    } else {
      const rect = btnRefs.current[id].getBoundingClientRect();
      let top = rect.bottom + 5;
      let left = rect.right - 140;

      if (window.innerHeight - rect.bottom < 150) top = rect.top - 150;
      if (window.innerWidth - rect.right < 150) left = rect.left - 120;

      setMenuPosition({ top, left });
      setOpenMenuId(id);
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;
    setCustomers(customers.filter((c) => c.id !== id));
  };

  const handleView = (customerId) => {
    navigate("/admin-panel/customer-list/customer-detail", {
      state: { customerId },
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !Object.values(btnRefs.current).some((btn) =>
          btn?.contains(event.target)
        )
      ) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-4">
      <div className="text-xl md:text-2xl font-bold pb-4">Customer List</div>

      <div className="bg-white rounded-xl overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead className="text-sm text-gray-600">
            <tr className="text-center bg-gray-100">
              <th className="py-4 px-4 rounded-l-lg">Customer ID</th>
              <th className="py-4 px-4">Mail Id</th>
              <th className="py-4 px-4">Customer Type</th>
              <th className="py-4 px-4">Contact</th>
              <th className="py-4 px-4">Total Orders</th>
              <th className="py-4 px-4">Last Order</th>
              <th className="py-4 px-4">Total Spend</th>
              <th className="py-4 px-4 rounded-r-lg">Action</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="text-sm text-center">
                <td className="py-4 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">
                  {c.id}
                </td>
                <td className="py-4 px-4 bg-white border-y border-gray-200">
                  {c.name}
                </td>
                <td className="py-4 px-4 bg-white border-y border-gray-200">
                  {c.customerType}
                </td>
                <td className="py-4 px-4 bg-white border-y border-gray-200">
                  {c.contact}
                </td>
                <td className="py-4 px-4 bg-white border-y border-gray-200">
                  {c.totalOrders}
                </td>
                <td className="py-4 px-4 bg-white border-y border-gray-200">
                  {c.lastOrder}
                </td>
                <td className="py-4 px-4 bg-white border-y border-gray-200">
                  {c.totalSpend}
                </td>
                <td className="py-4 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg relative">
                  <button
                    ref={(el) => (btnRefs.current[c.id] = el)}
                    onClick={() => handleToggle(c.id)}
                  >
                    <FiMoreHorizontal />
                  </button>

                  {openMenuId === c.id && (
                    <div
                      ref={menuRef}
                      className="fixed w-28 bg-white border rounded-lg shadow-lg text-sm z-[9999]"
                      style={{ top: menuPosition.top, left: menuPosition.left }}
                    >
                      <button
                        onClick={() => handleView(c.id)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleDelete(c.id)}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;