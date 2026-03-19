import { useState, useRef, useEffect } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

const CustomerList = () => {
  const [customers, setCustomers] = useState([
    { id: 1, orderId: "ORD-1001", name: "John Doe", customerType: "Regular", contact: "9876543210", totalOrders: 5, lastOrder: "2026-03-15", totalSpend: "$250" },
    { id: 2, orderId: "ORD-1002", name: "Jane Smith", customerType: "VIP", contact: "9876543211", totalOrders: 12, lastOrder: "2026-03-16", totalSpend: "$980" },
    { id: 3, orderId: "ORD-1003", name: "Alice Johnson", customerType: "Regular", contact: "9876543212", totalOrders: 3, lastOrder: "2026-03-10", totalSpend: "$120" },
    { id: 4, orderId: "ORD-1004", name: "Bob Brown", customerType: "VIP", contact: "9876543213", totalOrders: 20, lastOrder: "2026-03-18", totalSpend: "$2000" },
    { id: 5, orderId: "ORD-1005", name: "Charlie Davis", customerType: "Regular", contact: "9876543214", totalOrders: 2, lastOrder: "2026-03-12", totalSpend: "$75" },
    { id: 6, orderId: "ORD-1006", name: "Eve Miller", customerType: "Regular", contact: "9876543215", totalOrders: 4, lastOrder: "2026-03-14", totalSpend: "$180" },
    { id: 7, orderId: "ORD-1007", name: "Frank Wilson", customerType: "VIP", contact: "9876543216", totalOrders: 15, lastOrder: "2026-03-17", totalSpend: "$1500" },
    { id: 8, orderId: "ORD-1008", name: "Grace Lee", customerType: "Regular", contact: "9876543217", totalOrders: 1, lastOrder: "2026-03-11", totalSpend: "$50" },
    { id: 9, orderId: "ORD-1009", name: "Hank Green", customerType: "VIP", contact: "9876543218", totalOrders: 8, lastOrder: "2026-03-16", totalSpend: "$700" },
    { id: 10, orderId: "ORD-1010", name: "Ivy White", customerType: "Regular", contact: "9876543219", totalOrders: 6, lastOrder: "2026-03-13", totalSpend: "$300" },
  ]);

  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const btnRefs = useRef({});
  const menuRef = useRef(null);

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
    setCustomers(customers.filter(c => c.id !== id));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !Object.values(btnRefs.current).some((btn) => btn?.contains(event.target))
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
              <th className="py-4 px-4 rounded-l-lg">Order ID</th>
              <th className="py-4 px-4">Name</th>
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
                <td className="py-4 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">{c.orderId}</td>
                <td className="py-4 px-4 bg-white border-y border-gray-200">{c.name}</td>
                <td className="py-4 px-4 bg-white border-y border-gray-200">{c.customerType}</td>
                <td className="py-4 px-4 bg-white border-y border-gray-200">{c.contact}</td>
                <td className="py-4 px-4 bg-white border-y border-gray-200">{c.totalOrders}</td>
                <td className="py-4 px-4 bg-white border-y border-gray-200">{c.lastOrder}</td>
                <td className="py-4 px-4 bg-white border-y border-gray-200">{c.totalSpend}</td>
                <td className="py-4 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg relative">
                  <button ref={(el) => (btnRefs.current[c.id] = el)} onClick={() => handleToggle(c.id)}>
                    <FiMoreHorizontal />
                  </button>

                  {openMenuId === c.id && (
                    <div
                      ref={menuRef}
                      className="fixed w-28 bg-white border rounded-lg shadow-lg text-sm z-[9999]"
                      style={{ top: menuPosition.top, left: menuPosition.left }}
                    >
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