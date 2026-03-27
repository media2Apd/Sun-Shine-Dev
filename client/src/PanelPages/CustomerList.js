// import { useState, useRef, useEffect, useContext } from "react";
// import { FiMoreHorizontal } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { LoginContext } from "../Context/LoginContext";
// import { useOrder } from "../Context/OrderContext";

// const CustomerList = () => {
//   const { users } = useContext(LoginContext);
//   const { orderData } = useOrder();
//   const navigate = useNavigate();

//   const [customers, setCustomers] = useState([]);
//   const [openMenuId, setOpenMenuId] = useState(null);
//   const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

//   const btnRefs = useRef({});
//   const menuRef = useRef(null);

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
//        mail: user.name || user.email || "User",
//         customerType: totalOrders > 5 ? "VIP" : "Regular",
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
//     setCustomers(customers.filter((c) => c.id !== id));
//   };

//   const handleView = (customerId) => {
//     navigate("/admin-panel/customer-list/customer-detail", {
//       state: { customerId },
//     });
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
//               <th className="py-4 px-4">Mail Id</th>
//               <th className="py-4 px-4">Customer Type</th>
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
//                   {c.customerType}
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
//                         onClick={() => handleView(c.id)}
//                         className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                       >
//                         View
//                       </button>

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


// import React, { useState, useRef, useEffect } from "react";
// import { FiMoreHorizontal, FiUser, FiMail, FiShield, FiX, FiInbox } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import ROLE from "../common/role";
// import toast from "react-hot-toast";

// const CustomerList = () => {
//   const navigate = useNavigate();
  
//   // States
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [openMenuId, setOpenMenuId] = useState(null);
//   const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  
//   // Role Modal States
//   const [showRoleModal, setShowRoleModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [newRole, setNewRole] = useState("");

//   const btnRefs = useRef({});
//   const menuRef = useRef(null);

//   // --- FETCH USERS ---
//   const fetchAllUsers = async () => {
//     setLoading(true);
//     try {
//       const response = await api({
//         url: SummaryApi.getAllUsers.url,
//         method: SummaryApi.getAllUsers.method,
//       });
//       if (response.data.success) {
//         setUsers(response.data.data);
//       }
//     } catch (error) {
//       toast.error("Failed to fetch users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllUsers();
//   }, []);

//   // --- ROLE UPDATE HANDLER ---
//   const handleUpdateRole = async () => {
//     if (!newRole) return toast.error("Please select a role");
    
//     try {
//       const response = await api({
//         url: SummaryApi.updateUserRole.url(selectedUser._id),
//         method: SummaryApi.updateUserRole.method,
//         data: { role: newRole }
//       });

//       if (response.data.success) {
//         toast.success("User role updated successfully");
//         setShowRoleModal(false);
//         fetchAllUsers(); // Refresh list
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Error updating role");
//     }
//   };

//   // --- DROPDOWN LOGIC ---
//   const handleToggle = (id) => {
//     if (openMenuId === id) {
//       setOpenMenuId(null);
//     } else {
//       const rect = btnRefs.current[id].getBoundingClientRect();
//       const menuHeight = 120;
//       const spaceBelow = window.innerHeight - rect.bottom;
      
//       const top = spaceBelow < menuHeight ? rect.top - menuHeight - 5 : rect.bottom + 5;
//       const left = rect.right - 140;

//       setMenuPosition({ top, left });
//       setOpenMenuId(id);
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => setOpenMenuId(null);
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target) && 
//           !Object.values(btnRefs.current).some((btn) => btn?.contains(event.target))) {
//         setOpenMenuId(null);
//       }
//     };
//     window.addEventListener("scroll", handleScroll, true);
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       window.removeEventListener("scroll", handleScroll, true);
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="p-1">
//       <div className="text-xl md:text-2xl font-bold pb-4">Customer Management</div>

//       <div className="bg-white rounded-xl overflow-x-auto min-h-[400px]">
//         <table className="min-w-full border-separate border-spacing-y-3 px-2">
//           <thead className="text-sm">
//             <tr className="text-center bg-gray-100">
//               <th className="py-4 px-4 rounded-l-lg font-semibold text-gray-600">User</th>
//               <th className="py-4 px-4 font-semibold text-gray-600">Email</th>
//               <th className="py-4 px-4 font-semibold text-gray-600">Role</th>
//               <th className="py-4 px-4 font-semibold text-gray-600">Contact</th>
//               <th className="py-4 px-4 font-semibold text-gray-600">Joined Date</th>
//               <th className="py-4 px-4 rounded-r-lg font-semibold text-gray-600">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="6" className="py-20 text-center">
//                   <div className="flex flex-col items-center gap-2">
//                     <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//                     <p className="text-gray-500 text-sm animate-pulse">Fetching Customers...</p>
//                   </div>
//                 </td>
//               </tr>
//             ) : users.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="py-20 text-center">
//                   <div className="flex flex-col items-center text-gray-400">
//                     <FiInbox size={48} className="opacity-20 mb-2" />
//                     <p>No customers found</p>
//                   </div>
//                 </td>
//               </tr>
//             ) : (
//               users.map((user) => (
//                 <tr key={user._id} className="text-sm text-center group">
//                   <td className="py-4 px-4 bg-white border-y border-l border-gray-100 rounded-l-xl font-medium text-gray-700">
//                     <div className="flex items-center justify-center gap-2">
//                       <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
//                         <FiUser size={14} />
//                       </div>
//                       {user.name || "N/A"}
//                     </div>
//                   </td>
//                   <td className="py-4 px-4 bg-white border-y border-gray-100 text-gray-500">
//                     {user.email}
//                   </td>
//                   <td className="py-4 px-4 bg-white border-y border-gray-100">
//                     <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.role === ROLE.ADMIN ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
//                       {user.role}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4 bg-white border-y border-gray-100 text-gray-500">
//                     {user.phone || "No Contact"}
//                   </td>
//                   <td className="py-4 px-4 bg-white border-y border-gray-100 text-gray-400 italic">
//                     {new Date(user.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="py-4 px-4 bg-white border-y border-r border-gray-100 rounded-r-xl relative">
//                     <button
//                       ref={(el) => (btnRefs.current[user._id] = el)}
//                       onClick={() => handleToggle(user._id)}
//                       className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-800 transition-colors"
//                     >
//                       <FiMoreHorizontal size={20} />
//                     </button>

//                     {openMenuId === user._id && (
//                       <div
//                         ref={menuRef}
//                         className="fixed w-40 bg-white border border-gray-100 rounded-xl shadow-xl text-sm z-[9999] overflow-hidden"
//                         style={{ top: menuPosition.top, left: menuPosition.left }}
//                       >
//                         <button 
//                           onClick={() => {
//                             setSelectedUser(user);
//                             setNewRole(user.role);
//                             setShowRoleModal(true);
//                             setOpenMenuId(null);
//                           }}
//                           className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 transition-colors flex items-center gap-2"
//                         >
//                           <FiShield className="text-blue-500" /> Change Role
//                         </button>
//                         <button className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors font-medium">
//                           Delete User
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

//       {/* --- UPDATE ROLE MODAL --- */}
//       {showRoleModal && selectedUser && (
//         <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//           <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
//             <div className="p-6 border-b flex justify-between items-center">
//               <h3 className="text-lg font-bold text-gray-800">Change User Role</h3>
//               <button onClick={() => setShowRoleModal(false)} className="text-gray-400 hover:text-red-500 transition-colors">
//                 <FiX size={24} />
//               </button>
//             </div>
            
//             <div className="p-8">
//               <div className="flex flex-col items-center mb-6">
//                 <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-3">
//                   <FiUser size={32} />
//                 </div>
//                 <p className="font-bold text-gray-700">{selectedUser.name}</p>
//                 <p className="text-sm text-gray-400 flex items-center gap-1"><FiMail /> {selectedUser.email}</p>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Role</label>
//                 <select 
//                   value={newRole} 
//                   onChange={(e) => setNewRole(e.target.value)}
//                   className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-green-500 transition-all font-medium"
//                 >
//                   {Object.values(ROLE).map((role) => (
//                     <option key={role} value={role}>
//                       {role.charAt(0).toUpperCase() + role.slice(1)}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <button 
//                 onClick={handleUpdateRole}
//                 className="w-full bg-green-600 text-white font-bold py-3 rounded-xl mt-8 shadow-lg hover:bg-green-700 active:scale-95 transition-all"
//               >
//                 Update Role
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomerList;



import React, { useState, useRef, useEffect } from "react";
import { FiMoreHorizontal, FiUser, FiMail, FiShield, FiX, FiInbox, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import ROLE from "../common/role";
import toast from "react-hot-toast";

const CustomerList = () => {
  const navigate = useNavigate();
  
  // States
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  
  // Role Modal States
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  const btnRefs = useRef({});
  const menuRef = useRef(null);

  // --- FETCH USERS ---
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await api({
        url: SummaryApi.getAllUsers.url,
        method: SummaryApi.getAllUsers.method,
      });
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // --- ROLE UPDATE HANDLER ---
  const handleUpdateRole = async () => {
    if (!newRole) return toast.error("Please select a role");
    
    try {
      const response = await api({
        url: SummaryApi.updateUserRole.url(selectedUser._id),
        method: SummaryApi.updateUserRole.method,
        data: { role: newRole }
      });

      if (response.data.success) {
        toast.success("User role updated successfully");
        setShowRoleModal(false);
        fetchAllUsers(); 
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error updating role");
    }
  };

  // --- NAVIGATION ---
  const handleViewDetail = (userId) => {
    setOpenMenuId(null);
    navigate(`/admin-panel/customer-list/customer-detail/${userId}`);
  };

  // --- DROPDOWN POSITIONING LOGIC ---
  const handleToggle = (id) => {
    if (openMenuId === id) {
      setOpenMenuId(null);
    } else {
      const rect = btnRefs.current[id].getBoundingClientRect();
      const menuHeight = 110; // Approx height for 2 buttons
      const spaceBelow = window.innerHeight - rect.bottom;
      
      const top = spaceBelow < menuHeight ? rect.top - menuHeight - 5 : rect.bottom + 5;
      const left = rect.right - 140;

      setMenuPosition({ top, left });
      setOpenMenuId(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => setOpenMenuId(null);
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          !Object.values(btnRefs.current).some((btn) => btn?.contains(event.target))) {
        setOpenMenuId(null);
      }
    };
    window.addEventListener("scroll", handleScroll, true);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-1">
      <div className="text-xl md:text-2xl font-bold pb-4">Customer List</div>

      <div className="bg-white rounded-xl overflow-x-auto min-h-[400px]">
        <table className="min-w-full border-separate border-spacing-y-3 px-2">
          <thead className="text-sm">
            <tr className="text-center bg-gray-100">
              <th className="py-4 px-4 rounded-l-lg font-semibold text-gray-600">User</th>
              <th className="py-4 px-4 font-semibold text-gray-600">Email</th>
              <th className="py-4 px-4 font-semibold text-gray-600">Role</th>
              <th className="py-4 px-4 font-semibold text-gray-600">Contact</th>
              <th className="py-4 px-4 font-semibold text-gray-600">Joined</th>
              <th className="py-4 px-4 rounded-r-lg font-semibold text-gray-600">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-20 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 text-sm animate-pulse">Fetching Data...</p>
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-20 text-center">
                  <div className="flex flex-col items-center text-gray-400">
                    <FiInbox size={48} className="opacity-20 mb-2" />
                    <p>No customers found</p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="text-sm text-center group">
                  <td className="py-4 px-4 bg-white border-y border-l border-gray-100 rounded-l-xl font-medium text-gray-700">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                        <FiUser size={14} />
                      </div>
                      {user.name || "N/A"}
                    </div>
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-100 text-gray-500">
                    {user.email}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-100">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${user.role === ROLE.ADMIN ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-100 text-gray-500">
                    {user.phone || "N/A"}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-100 text-gray-400 italic">
                    {new Date(user.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-r border-gray-100 rounded-r-xl relative">
                    <button
                      ref={(el) => (btnRefs.current[user._id] = el)}
                      onClick={() => handleToggle(user._id)}
                      className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-800 transition-colors"
                    >
                      <FiMoreHorizontal size={20} />
                    </button>

                    {openMenuId === user._id && (
                      <div
                        ref={menuRef}
                        className="fixed w-36 bg-white border border-gray-100 rounded-xl shadow-xl text-sm z-[9999] overflow-hidden"
                        style={{ top: menuPosition.top, left: menuPosition.left }}
                      >
                        <button 
                          onClick={() => handleViewDetail(user._id)} 
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 transition-colors flex items-center gap-2"
                        >
                          <FiEye className="text-green-600" /> View Detail
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedUser(user);
                            setNewRole(user.role);
                            setShowRoleModal(true);
                            setOpenMenuId(null);
                          }} 
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                          <FiShield className="text-blue-500" /> Change Role
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

      {/* --- UPDATE ROLE MODAL --- */}
      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-800 tracking-tight">Modify Permissions</h3>
              <button onClick={() => setShowRoleModal(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <FiX size={24} />
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-3 border border-green-100">
                  <FiUser size={32} />
                </div>
                <p className="font-bold text-gray-800 text-lg">{selectedUser.name || "User Profile"}</p>
                <p className="text-sm text-gray-400 flex items-center gap-1"><FiMail /> {selectedUser.email}</p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Select Access Level</label>
                <select 
                  value={newRole} 
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full border border-gray-200 p-3.5 rounded-2xl outline-none focus:border-green-500 transition-all font-bold text-gray-700 bg-gray-50"
                >
                  {Object.values(ROLE).map((role) => (
                    <option key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)} Access
                    </option>
                  ))}
                </select>
              </div>

              <button 
                onClick={handleUpdateRole}
                className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl mt-10 shadow-lg shadow-green-100 hover:bg-green-700 active:scale-95 transition-all tracking-wide"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;