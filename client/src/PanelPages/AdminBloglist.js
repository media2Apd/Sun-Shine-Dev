import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiCalendar, FiPlus, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../panelComponents/ConfirmModal";
import SummaryApi from "../common/SummaryApi";
import { formatDateTime } from "../helpers/formatDateTime";
import { CiEdit } from "react-icons/ci";
import api from "../common/apiClient";

export default function AdminBloglist() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const buttonRefs = useRef({});
  const DROPDOWN_HEIGHT = 100;
  const menuRef = useRef(null);

  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await api({
        url: SummaryApi.getAllBlogs.url,
        method: SummaryApi.getAllBlogs.method,
      });

      // 🔥 IMPORTANT (based on your API)
      setBlogs(response.data);
    } catch (err) {
      console.error("Blog fetch error:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const confirmDelete = async () => {
    try {
      const blogId = blogs[deleteIndex]._id;

      await fetch(SummaryApi.deleteBlog.url(blogId), {
        method: "DELETE",
      });

      await fetchBlogs(); // 🔥 refresh
    } catch (err) {
      console.error(err);
    }

    setShowModal(false);
  };

  const handleToggle = (e, id) => {
    e.stopPropagation();

    const rect = buttonRefs.current[id].getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < DROPDOWN_HEIGHT;

    setMenuPos({
      top: openUp ? rect.top - DROPDOWN_HEIGHT - 6 : rect.bottom + 6,
      left: rect.right - 140,
    });

    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const close = () => setOpenMenuId(null);
    document.addEventListener("click", close);
    window.addEventListener("scroll", close, true);

    return () => {
      document.removeEventListener("click", close);
      window.removeEventListener("scroll", close, true);
    };
  }, []);

  // Close menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter blogs based on search and date
  const filteredBlogs = blogs.filter((blog) => {
    const matchSearch =
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchDate = selectedDate
      ? new Date(blog.publishDate).toISOString().split("T")[0] === selectedDate
      : true;

    return matchSearch && matchDate;
  });

  // Open delete modal
  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowModal(true);
    setOpenMenuId(null);
  };

  // Edit blog → navigate to BlogForm with state
  const handleEdit = (blog) => {
    navigate("/admin-panel/blog-list/blog-form", { state: { blog } });
  };

  return (
    <div className="">
      {/* HEADER */}
      <div className="text-2xl md:text-3xl font-bold mb-6">Blog Management</div>

      {/* FILTER & ADD */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-3">
          {/* Date */}
          <div className="relative w-full md:w-auto">
            <FiCalendar className="absolute left-3 top-3 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search blog..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* ADD BUTTON */}
        <button
          onClick={() => navigate("/admin-panel/blog-list/blog-form")}
          className="bg-green-600 text-white w-10 h-10 items-center justify-center rounded-full hover:bg-green-700 hidden min-[431px]:flex"
        >
          <FiPlus size={26} />
        </button>
      </div>

      {/* MOBILE ADD */}
      <button
        onClick={() => navigate("/admin-panel/blog-list/blog-form")}
        className="bg-green-600 text-white px-4 py-2 rounded-lg w-full max-[430px]:block hidden mb-4"
      >
        + Add Blog
      </button>

      {/* BLOG TABLE */}
      <div className="bg-white rounded-xl overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead className="text-sm text-gray-600">
            <tr className="text-center bg-gray-100">
              <th className="py-4 px-4 rounded-l-lg">Blog Title</th>
              <th className="py-4 px-4">Category</th>
              <th className="py-4 px-4">Author</th>
              <th className="py-4 px-4">Publish Date</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4 rounded-r-lg">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredBlogs.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-400">
                  No blogs found
                </td>
              </tr>
            ) : (
              filteredBlogs.map((blog, index) => (
                <tr key={index} className="text-sm text-center relative">
                  <td className="py-4 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">
                    {blog.title}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-200">
                    {blog.category}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-200">
                    {blog.author}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-200">
                    {formatDateTime(blog.publishDate, false)}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-200">
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      {blog.status || "Published"}
                    </span>
                  </td>

                  {/* ACTION MENU */}
                  <td className="py-4 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg relative">
                    <button
                      ref={(el) => (buttonRefs.current[blog._id] = el)}
                      onClick={(e) => handleToggle(e, blog._id)}
                    >
                      <FiMoreHorizontal />
                    </button>

                    {openMenuId === blog._id && (
                      <div
                        style={{
                          position: "fixed",
                          top: menuPos.top,
                          left: menuPos.left,
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-36 bg-white rounded-lg shadow-lg border z-[9999]"
                      >
                        <button
                          onClick={() => {
                            handleEdit(blog);
                            setOpenMenuId(null);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-green-600 hover:bg-gray-50"
                        >
                          <CiEdit size={16} />
                          Edit
                        </button>

                        <div className="border-t"></div>

                        <button
                          onClick={() => handleDeleteClick(index)}
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

      {/* CONFIRM MODAL */}
      <ConfirmModal
        open={showModal}
        title="Delete Blog"
        message="Are you sure you want to delete this blog?"
        confirmText="Yes, Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}





