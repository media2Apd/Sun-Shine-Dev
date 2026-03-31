import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  FiSearch, FiCalendar, FiDownload, FiMoreHorizontal, 
  FiChevronLeft, FiChevronRight, FiAlertCircle, FiChevronDown 
} from "react-icons/fi";
import * as XLSX from 'xlsx'; // Import the Excel library
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { formatDateTime } from "../helpers/formatDateTime";

const OrderlistPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [startDate, setStartDate] = useState(searchParams.get("start") || "");
  const [endDate, setEndDate] = useState(searchParams.get("end") || "");
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "All Orders");
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);

  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const btnRefs = useRef({});
  const menuRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [statusUpdateData, setStatusUpdateData] = useState({ id: null, newStatus: "" });

  const tabs = [
    "All Orders",
    "Placed",
    "Packaged",
    "Shipped",
    "Delivered",
    "Pending",
    "Cancelled",
  ];

  // --- Dropdown Logic ---
  useEffect(() => {
    const handleScroll = () => setOpenMenuId(null);
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          !Object.values(btnRefs.current).some((btn) => btn?.contains(event.target))) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (id) => {
    if (openMenuId === id) {
      setOpenMenuId(null);
    } else {
      const rect = btnRefs.current[id].getBoundingClientRect();
      const menuHeight = 50;
      const spaceBelow = window.innerHeight - rect.bottom;
      const top = spaceBelow < menuHeight ? rect.top - menuHeight - 5 : rect.bottom + 5;
      const left = rect.right - 150;
      setMenuPosition({ top, left });
      setOpenMenuId(id);
    }
  };

  // --- Fetch Data ---
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      let statusParam = "";
      
      // Status mapping logic
      if (activeTab === "All Orders") {
        statusParam = "";
      } else {
        statusParam = activeTab;
      }

      const response = await api({
        url: SummaryApi.getAllOrders.url,
        method: SummaryApi.getAllOrders.method,
        params: {
          page: currentPage,
          limit: itemsPerPage,
          startDate: startDate,
          endDate: endDate,
          status: statusParam
        }
      });

      if (response.data.success) {
        setOrders(response.data.data);
        setTotalPages(response.data.totalPages || 1); 
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [currentPage, startDate, endDate, activeTab]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  // --- Sync State to URL ---
  useEffect(() => {
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (startDate) params.start = startDate;
    if (endDate) params.end = endDate;
    if (activeTab !== "All orders") params.tab = activeTab;
    if (currentPage > 1) params.page = currentPage;
    setSearchParams(params, { replace: true });
  }, [searchTerm, startDate, endDate, activeTab, currentPage, setSearchParams]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const customerName = `${order.billingAddress?.firstName || ""} ${order.billingAddress?.lastName || ""}`.toLowerCase();
      const orderId = (order.orderId || "").toLowerCase();
      const search = searchTerm.toLowerCase();
      return customerName.includes(search) || orderId.includes(search);
    });
  }, [orders, searchTerm]);

  // --- Excel Export with Column Width Auto-Adjustment ---
  const handleExportExcel = () => {
    if (filteredOrders.length === 0) return toast.error("No data to export");

    // Prepare the data
    const exportData = filteredOrders.map((o, index) => ({
      "S.No": `${index + 1}`,
      "Order ID": o.orderId,
      "Customer Name": `${o.billingAddress?.firstName || "N/A"} ${o.billingAddress?.lastName || ""}`.trim(),
      "Contact": `${o.billingAddress?.phone || "N/A"}`,
      "Total Amount": `${o.total}`,
      "Items Count": `${o.items?.length || 0}`,
      "Payment Method": o.paymentMethod,
      "Payment Status": o.paymentStatus,
      "Status": o.status,
      "Order Date": new Date(o.createdAt).toLocaleDateString('en-GB')
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // --- Dynamic Column Width Calculation ---
    const objectMaxLength = [];
    exportData.forEach((row) => {
        Object.keys(row).forEach((key, i) => {
            const value = row[key] ? row[key].toString() : "";
            const currentWidth = Math.max(key.length, value.length);
            objectMaxLength[i] = Math.max(objectMaxLength[i] || 0, currentWidth);
        });
    });

    // Set width (adding 2 for padding)
    worksheet["!cols"] = objectMaxLength.map(w => ({ wch: w + 2 }));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders Report");

    // Download file
    XLSX.writeFile(workbook, `Orders_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
    toast.success("Excel file generated!");
  };

  const handleStatusUpdate = async () => {
    try {
      const response = await api({
        url: SummaryApi.updateOrderStatus.url(statusUpdateData.id),
        method: SummaryApi.updateOrderStatus.method,
        data: { status: statusUpdateData.newStatus }
      });
      setOrders(prev => prev.map(o => o._id === statusUpdateData.id ? { ...o, status: response.data.status } : o));
      setShowModal(false);
      toast.success("Status updated");
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-50 text-green-600 border-green-100";
      case "Cancelled": return "bg-red-50 text-red-600 border-red-100";
      default: return "bg-orange-50 text-orange-600 border-orange-100";
    }
  };

  return (
    <div className="p-1">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Order List</h1>
        <button 
          onClick={handleExportExcel} 
          className="bg-green-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold hover:bg-[#5da70a] transition-all shadow-md"
        >
          <FiDownload size={16} /> Export
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-100 mb-6 overflow-x-auto scrollbar-hide scroll-smooth">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => { 
              setActiveTab(tab); 
              setCurrentPage(1); 
            }}
            className={`pb-3 text-sm font-bold transition-all relative whitespace-nowrap shrink-0 ${
              activeTab === tab ? "text-green-600" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-green-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Filters (Date & Search) Code remains same as yours... */}
      <div className="flex flex-col xl:flex-row items-end gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
          <div className="flex flex-col gap-1 sm:w-48">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Start Date</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="date" className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full outline-none focus:border-green-600" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
          </div>
          <div className="flex flex-col gap-1 sm:w-48">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">End Date</label>
            <div className="relative">
              <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="date" className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full outline-none focus:border-green-600" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="relative flex-1 w-full">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search by Order ID or Name..." className="pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm w-full outline-none focus:border-green-600 shadow-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full border-separate border-spacing-y-3 min-w-[1100px]">
          <thead>
            <tr className="text-[14px] font-bold text-gray-500 bg-gray-100">
              <th className="px-4 py-4 text-left w-16 rounded-l-lg whitespace-nowrap">S.No</th>
              <th className="px-4 py-4 text-left">Order ID</th>
              <th className="px-4 py-4 text-left">Customer</th>
              <th className="px-4 py-4 text-center">Items</th>
              <th className="px-4 py-4 text-left">Amount</th>
              <th className="px-4 py-4 text-left">Date</th>
              <th className="px-4 py-4 text-left">Status</th>
              <th className="px-4 py-4 text-center rounded-r-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && filteredOrders.map((order, index) => (
              <tr key={order._id} className="text-sm group">
                {/* Serial Number */}
                <td className="px-4 py-5 bg-white border-y border-l border-gray-100 rounded-l-2xl font-bold">
                  {((currentPage - 1) * itemsPerPage) + index + 1}
                </td>

                <td className="px-4 py-5 bg-white border-y border-gray-100 font-bold text-gray-700">
                   #{order.orderId}
                </td>

                <td className="px-4 py-5 bg-white border-y border-gray-100">
                  <div className="font-bold text-gray-800 truncate max-w-[180px]">
                    {order.billingAddress?.firstName ? `${order.billingAddress.firstName} ${order.billingAddress.lastName}` : "Guest Customer"}
                  </div>
                  <div className="text-[11px] text-gray-400">{order.billingAddress?.phone || "No Phone"}</div>
                </td>

                <td className="px-4 py-5 bg-white border-y border-gray-100 text-center font-bold text-gray-600">
                  {order.items?.length || 0}
                </td>

                <td className="px-4 py-5 bg-white border-y border-gray-100">
                  <div className="font-black text-gray-800">₹{order.total?.toLocaleString()}</div>
                  <div className="text-[10px] font-bold text-green-600 uppercase">{order.paymentMethod}</div>
                </td>

                <td className="px-4 py-5 bg-white border-y border-gray-100 text-gray-500 font-medium">
                  {formatDateTime(order.createdAt, false)}
                </td>

                <td className="px-4 py-5 bg-white border-y border-gray-100">
                   <div className="relative w-[130px]">
                    <select 
                      value={order.status} 
                      onChange={(e) => { setStatusUpdateData({ id: order._id, newStatus: e.target.value }); setShowModal(true); }}
                      className={`w-full px-3 py-1.5 rounded-lg border text-[11px] font-bold outline-none cursor-pointer appearance-none ${getStatusStyle(order.status)}`}
                    >
                      <option value="Placed">Placed</option>
                      <option value="Packaged">Packaged</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                   </div>
                </td>

                <td className="px-4 py-5 bg-white border-y border-r border-gray-100 rounded-r-2xl text-center relative">
                   <button ref={(el) => (btnRefs.current[order._id] = el)} onClick={() => handleToggle(order._id)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-800 transition-all">
                      <FiMoreHorizontal size={20} />
                    </button>
                    {openMenuId === order._id && (
                      <div ref={menuRef} className="fixed w-40 bg-white border border-gray-100 rounded-xl shadow-2xl text-xs font-bold z-[9999] overflow-hidden" style={{ top: menuPosition.top, left: menuPosition.left }}>
                        <button onClick={() => { setOpenMenuId(null); navigate(`/admin-panel/order-list/order-overview/${order._id}`); }} className="block w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 text-gray-700">
                          VIEW ORDER
                        </button>
                      </div>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <div className="text-center py-20 text-gray-400 font-bold animate-pulse">Fetching Orders...</div>}
        {!loading && filteredOrders.length === 0 && <div className="py-20 text-center text-gray-400 font-medium border-2 border-dashed rounded-3xl">No matching orders found.</div>}
      </div>

      {/* Pagination & Status Modal code... */}
      {/* ... keeping your existing pagination/modal logic below ... */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mt-8">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-2 text-gray-400 hover:text-green-600 disabled:opacity-30"><FiChevronLeft size={22} /></button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${currentPage === i + 1 ? "bg-green-600 text-white shadow-lg" : "text-gray-400 bg-white border border-gray-100 hover:border-gray-300"}`}>{i + 1}</button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="p-2 text-gray-400 hover:text-green-600 disabled:opacity-30"><FiChevronRight size={22} /></button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in duration-200">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"><FiAlertCircle size={32} /></div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Update Status?</h3>
              <p className="text-sm text-gray-500">Change order status to <span className="font-bold text-green-600">{statusUpdateData.newStatus}</span>?</p>
            </div>
            <div className="flex border-t border-gray-100">
              <button onClick={() => setShowModal(false)} className="flex-1 py-4 text-sm font-bold text-gray-400 hover:bg-gray-50 transition-colors border-r border-gray-100">Cancel</button>
              <button onClick={handleStatusUpdate} className="flex-1 py-4 text-sm font-bold text-green-600 hover:bg-green-50 transition-colors">Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderlistPage;