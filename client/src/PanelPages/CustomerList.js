// import React, { useState, useRef, useEffect } from "react";
// import { FiMoreHorizontal, FiUser, FiMail, FiShield, FiX, FiInbox, FiEye } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import ROLE from "../common/role";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";

// const CustomerList = () => {
//   const navigate = useNavigate();
  
//   // Get logged-in user details from Redux store
//   const loggedInUser = useSelector((state) => state?.user?.user);
  
//   // States
//   const [usersList, setUsersList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [openMenuId, setOpenMenuId] = useState(null);
//   const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  
//   // Role Modal States
//   const [showRoleModal, setShowRoleModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [newRole, setNewRole] = useState("");

//   const btnRefs = useRef({});
//   const menuRef = useRef(null);

//   // --- FETCH ALL USERS ---
//   const fetchAllUsers = async () => {
//     setLoading(true);
//     try {
//       const response = await api({
//         url: SummaryApi.getAllUsers.url,
//         method: SummaryApi.getAllUsers.method,
//       });
//       if (response.data.success) {
//         setUsersList(response.data.data);
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

//   // --- ROLE UPDATE HANDLER WITH SECURITY CONDITIONS ---
//   const handleUpdateRole = async () => {
//     if (!newRole) return toast.error("Please select a role");

//     // CONDITION 1: Prevent user from changing their own role
//     if (selectedUser._id === loggedInUser?._id) {
//       toast.error("Security Restriction: You cannot change your own administrative role.");
//       return;
//     }

//     // CONDITION 2: Ensure at least one Admin remains in the system
//     // We check if the user being changed is currently an Admin and the new role is NOT Admin
//     if (selectedUser.role === ROLE.ADMIN && newRole !== ROLE.ADMIN) {
//       const adminCount = usersList.filter(u => u.role === ROLE.ADMIN).length;
      
//       if (adminCount <= 1) {
//         toast.error("Action Denied: System must have at least one Admin account.");
//         return;
//       }
//     }
    
//     try {
//       const response = await api({
//         url: SummaryApi.updateUserRole.url(selectedUser._id),
//         method: SummaryApi.updateUserRole.method,
//         data: { role: newRole }
//       });

//       if (response.data.success) {
//         toast.success("User role updated successfully");
//         setShowRoleModal(false);
//         fetchAllUsers(); // Refresh list to see changes
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Error updating role");
//     }
//   };

//   // --- NAVIGATION ---
//   const handleViewDetail = (userId) => {
//     setOpenMenuId(null);
//     navigate(`/admin-panel/customer-list/customer-detail/${userId}`);
//   };

//   // --- DROPDOWN POSITIONING LOGIC ---
//   const handleToggle = (id) => {
//     if (openMenuId === id) {
//       setOpenMenuId(null);
//     } else {
//       const rect = btnRefs.current[id].getBoundingClientRect();
//       const menuHeight = 110; 
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
//     <div>
//       <div className="text-xl md:text-2xl font-bold pb-4">Customer List</div>

//       <div className="bg-white rounded-xl overflow-x-auto ">
//         <table className="min-w-full border-separate border-spacing-y-3 px-2">
//           <thead className="text-sm">
//             <tr className="text-left bg-gray-100">
//               <th className="py-4 px-4 rounded-l-lg font-semibold text-gray-600">User</th>
//               <th className="py-4 px-4 font-semibold text-gray-600">Email</th>
//               <th className="py-4 px-4 font-semibold text-gray-600">Role</th>
//               <th className="py-4 px-4 font-semibold text-gray-600">Contact</th>
//               <th className="py-4 px-4 font-semibold text-gray-600">Joined</th>
//               <th className="py-4 px-4 rounded-r-lg font-semibold text-gray-600">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="6" className="py-20 text-center">
//                   <div className="flex flex-col items-center gap-2">
//                     <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//                     <p className="text-gray-500 text-sm animate-pulse">Fetching Data...</p>
//                   </div>
//                 </td>
//               </tr>
//             ) : usersList.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="py-20 text-center">
//                   <div className="flex flex-col items-center text-gray-400">
//                     <FiInbox size={48} className="opacity-20 mb-2" />
//                     <p>No customers found</p>
//                   </div>
//                 </td>
//               </tr>
//             ) : (
//               usersList.map((userItem) => (
//                 <tr key={userItem._id} className="text-sm text-left group">
//                   <td className="py-4 px-4 bg-white border-y border-l border-gray-100 rounded-l-xl font-medium text-gray-700">
//                     <div className="flex items-center gap-2">
//                       <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
//                         <FiUser size={14} />
//                       </div>
//                       {userItem.firstName ? `${userItem.firstName} ${userItem.lastName}` : "N/A"}
//                     </div>
//                   </td>
//                   <td className="py-4 px-4 bg-white border-y border-gray-100 text-gray-500">
//                     {userItem.email}
//                     {userItem._id === loggedInUser?._id && (
//                         <span className="ml-2 text-[10px] bg-gray-200 text-gray-600 px-1 rounded">You</span>
//                     )}
//                   </td>
//                   <td className="py-4 px-4 bg-white border-y border-gray-100">
//                     <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${userItem.role === ROLE.ADMIN ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
//                       {userItem.role}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4 bg-white border-y border-gray-100 text-gray-500">
//                     {userItem.phone || "N/A"}
//                   </td>
//                   <td className="py-4 px-4 bg-white border-y border-gray-100 text-gray-400 italic whitespace-nowrap">
//                     {new Date(userItem.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
//                   </td>
//                   <td className="py-4 px-4 bg-white border-y border-r border-gray-100 rounded-r-xl relative">
//                     <button
//                       ref={(el) => (btnRefs.current[userItem._id] = el)}
//                       onClick={() => handleToggle(userItem._id)}
//                       className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-800 transition-colors text-center"
//                     >
//                       <FiMoreHorizontal size={20} />
//                     </button>

//                     {openMenuId === userItem._id && (
//                       <div
//                         ref={menuRef}
//                         className="fixed w-36 bg-white border border-gray-100 rounded-xl shadow-xl text-sm z-[9999] overflow-hidden"
//                         style={{ top: menuPosition.top, left: menuPosition.left }}
//                       >
//                         <button 
//                           onClick={() => handleViewDetail(userItem._id)} 
//                           className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 transition-colors flex items-center gap-2"
//                         >
//                           <FiEye className="text-green-600" /> View Detail
//                         </button>
                        
//                         {/* Disable or style differently if it's the current user */}
//                         <button 
//                           onClick={() => {
//                             if(userItem._id === loggedInUser?._id) {
//                                 toast.error("You cannot modify your own role.");
//                                 setOpenMenuId(null);
//                                 return;
//                             }
//                             setSelectedUser(userItem);
//                             setNewRole(userItem.role);
//                             setShowRoleModal(true);
//                             setOpenMenuId(null);
//                           }} 
//                           className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-2 ${userItem._id === loggedInUser?._id ? 'opacity-50 cursor-not-allowed' : ''}`}
//                         >
//                           <FiShield className="text-blue-500" /> Change Role
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
//           <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
//             <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
//               <h3 className="text-lg font-bold text-gray-800 tracking-tight">Modify Permissions</h3>
//               <button onClick={() => setShowRoleModal(false)} className="text-gray-400 hover:text-red-500 transition-colors">
//                 <FiX size={24} />
//               </button>
//             </div>
            
//             <div className="p-8">
//               <div className="flex flex-col items-center mb-8">
//                 <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-3 border border-green-100">
//                   <FiUser size={32} />
//                 </div>
//                 <p className="font-bold text-gray-800 text-lg">
//                     {selectedUser.firstName ? `${selectedUser.firstName} ${selectedUser.lastName}` : "User Profile"}
//                 </p>
//                 <p className="text-sm text-gray-400 flex items-center gap-1"><FiMail /> {selectedUser.email}</p>
//               </div>

//               <div className="space-y-3">
//                 <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Select Access Level</label>
//                 <select 
//                   value={newRole} 
//                   onChange={(e) => setNewRole(e.target.value)}
//                   className="w-full border border-gray-200 p-3.5 rounded-2xl outline-none focus:border-green-500 transition-all font-bold text-gray-700 bg-gray-50"
//                 >
//                   {Object.values(ROLE).map((role) => (
//                     <option key={role} value={role}>
//                       {role.charAt(0).toUpperCase() + role.slice(1)} Access
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <button 
//                 onClick={handleUpdateRole}
//                 className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl mt-10 shadow-lg shadow-green-100 hover:bg-green-700 active:scale-95 transition-all tracking-wide"
//               >
//                 Apply Changes
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
import { useSelector } from "react-redux";
import { formatDateTime } from "../helpers/formatDateTime";

const CustomerList = () => {
  const navigate = useNavigate();
  
  // Get logged-in user details from Redux store
  const loggedInUser = useSelector((state) => state?.user?.user);
  
  // States
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  
  // Role Modal States
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  const btnRefs = useRef({});
  const menuRef = useRef(null);

  // --- FETCH ALL USERS ---
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await api({
        url: SummaryApi.getAllUsers.url,
        method: SummaryApi.getAllUsers.method,
      });
      if (response.data.success) {
        setUsersList(response.data.data);
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

  // --- ROLE UPDATE HANDLER WITH SECURITY CONDITIONS ---
  const handleUpdateRole = async () => {
    if (!newRole) return toast.error("Please select a role");

    // CONDITION 1: Prevent user from changing their own role
    if (selectedUser._id === loggedInUser?._id) {
      toast.error("Security Restriction: You cannot change your own administrative role.");
      return;
    }

    // CONDITION 2: Ensure at least one Admin remains in the system
    if (selectedUser.role === ROLE.ADMIN && newRole !== ROLE.ADMIN) {
      const adminCount = usersList.filter(u => u.role === ROLE.ADMIN).length;
      
      if (adminCount <= 1) {
        toast.error("Action Denied: System must have at least one Admin account.");
        return;
      }
    }
    
    try {
      const response = await api({
        url: SummaryApi.updateUserRole.url(selectedUser._id),
        method: SummaryApi.updateUserRole.method,
        data: { role: newRole }
      });

      if (response.data.success) {
        toast.success("User role updated successfully");
        setShowRoleModal(false);
        fetchAllUsers(); // Refresh list to see changes
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
      const menuHeight = 110; 
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
    <div>
      <div className="text-xl md:text-2xl font-bold pb-4">Customer List</div>

      <div className="rounded-xl overflow-x-auto ">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead className="text-sm">
            <tr className="text-left bg-gray-100">
              <th className="py-4 px-4 rounded-l-lg font-semibold text-gray-600">S. No</th>
              <th className="py-4 px-4 font-semibold text-gray-600">User</th>
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
                <td colSpan="7" className="py-20 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 text-sm animate-pulse">Fetching Data...</p>
                  </div>
                </td>
              </tr>
            ) : usersList.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-20 text-center">
                  <div className="flex flex-col items-center text-gray-400">
                    <FiInbox size={48} className="opacity-20 mb-2" />
                    <p>No customers found</p>
                  </div>
                </td>
              </tr>
            ) : (
              usersList.map((userItem, index) => (
                <tr key={userItem._id} className="text-sm text-left group">
                  <td className="py-4 px-4 bg-white border-y border-l border-gray-100 rounded-l-xl font-medium text-gray-700">
                    {index + 1}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-100 font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                        <FiUser size={14} />
                      </div>
                      {userItem.firstName ? `${userItem.firstName} ${userItem.lastName}` : "N/A"}
                    </div>
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-100 text-gray-500">
                    {userItem.email}
                    {userItem._id === loggedInUser?._id && (
                        <span className="ml-2 text-[10px] bg-gray-200 text-gray-600 px-1 rounded">You</span>
                    )}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-100">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${userItem.role === ROLE.ADMIN ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                      {userItem.role}
                    </span>
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-100 text-gray-500">
                    {userItem.phone || "N/A"}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-100 text-gray-400 italic whitespace-nowrap">
                    {formatDateTime(userItem.createdAt, false)}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-r border-gray-100 rounded-r-xl relative">
                    <button
                      ref={(el) => (btnRefs.current[userItem._id] = el)}
                      onClick={() => handleToggle(userItem._id)}
                      className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-800 transition-colors text-center"
                    >
                      <FiMoreHorizontal size={20} />
                    </button>

                    {openMenuId === userItem._id && (
                      <div
                        ref={menuRef}
                        className="fixed w-36 bg-white border border-gray-100 rounded-xl shadow-xl text-sm z-[9999] overflow-hidden"
                        style={{ top: menuPosition.top, left: menuPosition.left }}
                      >
                        <button 
                          onClick={() => handleViewDetail(userItem._id)} 
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 transition-colors flex items-center gap-2"
                        >
                          <FiEye className="text-green-600" /> View Detail
                        </button>
                        
                        <button 
                          onClick={() => {
                            if(userItem._id === loggedInUser?._id) {
                                toast.error("You cannot modify your own role.");
                                setOpenMenuId(null);
                                return;
                            }
                            setSelectedUser(userItem);
                            setNewRole(userItem.role);
                            setShowRoleModal(true);
                            setOpenMenuId(null);
                          }} 
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-2 ${userItem._id === loggedInUser?._id ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                <p className="font-bold text-gray-800 text-lg">
                    {selectedUser.firstName ? `${selectedUser.firstName} ${selectedUser.lastName}` : "User Profile"}
                </p>
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
                className="w-full bg-[#00B207] text-white font-bold py-4 rounded-2xl mt-10 shadow-lg shadow-green-100 active:scale-95 transition-all tracking-wide"
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