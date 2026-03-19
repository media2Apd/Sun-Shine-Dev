// import React, { useState } from "react";
// import { useBlog } from "../Context/BlogContext";
// import { FiSearch, FiCalendar, FiPlus } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// function AdminBloglist() {

//   const navigate = useNavigate();
//   const { blogs } = useBlog();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");

//   const filteredBlogs = blogs.filter((blog) => {

//     const matchSearch =
//       blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       blog.author?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchDate = selectedDate
//       ? blog.publishDate === selectedDate
//       : true;

//     return matchSearch && matchDate;
//   });

//   return (
//     <div className="p-1">

//       {/* TITLE */}
//       <div className="text-xl md:text-2xl font-bold pb-4">
//         Blog Management
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
//             placeholder="Search blog..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         {/* DESKTOP + BUTTON */}
//         <button
//           onClick={() => navigate("/admin-panel/blog-list/blog-form")}
//           className="bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-green-700 hidden min-[431px]:flex"
//         >
//           <FiPlus size={26} />
//         </button>

//       </div>

//       {/* MOBILE ADD BUTTON */}
//       <button
//         onClick={() => navigate("/admin-panel/blog-list/blog-form")}
//         className="bg-green-600 text-white px-3 py-2 rounded-lg w-full max-[430px]:block hidden mb-4"
//       >
//         + Add
//       </button>

//       {/* TABLE */}
//       <div className="bg-white rounded-xl overflow-x-auto">

//         <table className="min-w-full border-separate border-spacing-y-3">

//           {/* HEADER */}
//           <thead className="text-sm text-gray-600">
//             <tr className="text-center bg-gray-100">
//               <th className="py-4 px-4 rounded-l-lg">Blog Title</th>
//               <th className="py-4 px-4">Category</th>
//               <th className="py-4 px-4">Author</th>
//               <th className="py-4 px-4">Publish Date</th>
//               <th className="py-4 px-4 rounded-r-lg">Status</th>
//             </tr>
//           </thead>

//           {/* BODY */}
//           <tbody>

//             {filteredBlogs.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="p-4 text-center text-gray-400">
//                   No blogs found
//                 </td>
//               </tr>
//             ) : (

//               filteredBlogs.map((blog, index) => (

//                 <tr key={index} className="text-sm text-center">

//                   <td className="py-4 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">
//                     {blog.title}
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {blog.category}
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {blog.author}
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {blog.publishDate}
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg">
//                     <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
//                       {blog.status || "Published"}
//                     </span>
//                   </td>

//                 </tr>

//               ))
//             )}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// }

// export default AdminBloglist;

// import React, { useState, useRef, useEffect } from "react";
// import { useBlog } from "../Context/BlogContext";
// import { FiSearch, FiCalendar, FiPlus, FiMoreHorizontal } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// function AdminBloglist() {

//   const navigate = useNavigate();
//   const { blogs, setBlogs } = useBlog(); // Added setBlogs for updating/deleting

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [openMenuIndex, setOpenMenuIndex] = useState(null);
//   const menuRef = useRef(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setOpenMenuIndex(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const filteredBlogs = blogs.filter((blog) => {
//     const matchSearch =
//       blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       blog.author?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchDate = selectedDate
//       ? blog.publishDate === selectedDate
//       : true;

//     return matchSearch && matchDate;
//   });

//   const handleDelete = (index) => {
//     if (!window.confirm("Are you sure you want to delete this blog?")) return;
//     const updatedBlogs = [...blogs];
//     updatedBlogs.splice(index, 1);
//     setBlogs(updatedBlogs); // update context
//     localStorage.setItem("blogs", JSON.stringify(updatedBlogs)); // update localStorage
//   };

//   const handleEdit = (blog) => {
//     navigate("/admin-panel/blog-list/blog-form", { state: { blog } });
//   };

//   return (
//     <div className="p-1">

//       {/* TITLE */}
//       <div className="text-xl md:text-2xl font-bold pb-4">
//         Blog Management
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
//             placeholder="Search blog..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
//           />
//         </div>

//         {/* DESKTOP + BUTTON */}
//         <button
//           onClick={() => navigate("/admin-panel/blog-list/blog-form")}
//           className="bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-green-700 hidden min-[431px]:flex"
//         >
//           <FiPlus size={26} />
//         </button>

//       </div>

//       {/* MOBILE ADD BUTTON */}
//       <button
//         onClick={() => navigate("/admin-panel/blog-list/blog-form")}
//         className="bg-green-600 text-white px-3 py-2 rounded-lg w-full max-[430px]:block hidden mb-4"
//       >
//         + Add
//       </button>

//       {/* TABLE */}
//       <div className="bg-white rounded-xl overflow-x-auto">

//         <table className="min-w-full border-separate border-spacing-y-3">

//           {/* HEADER */}
//           <thead className="text-sm text-gray-600">
//             <tr className="text-center bg-gray-100">
//               <th className="py-4 px-4 rounded-l-lg">Blog Title</th>
//               <th className="py-4 px-4">Category</th>
//               <th className="py-4 px-4">Author</th>
//               <th className="py-4 px-4">Publish Date</th>
//               <th className="py-4 px-4">Status</th>
//               <th className="py-4 px-4 rounded-r-lg">Action</th>
//             </tr>
//           </thead>

//           {/* BODY */}
//           <tbody>

//             {filteredBlogs.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="p-4 text-center text-gray-400">
//                   No blogs found
//                 </td>
//               </tr>
//             ) : (

//               filteredBlogs.map((blog, index) => (

//                 <tr key={index} className="text-sm text-center relative">

//                   <td className="py-4 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">
//                     {blog.title}
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {blog.category}
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {blog.author}
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     {blog.publishDate}
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-gray-200">
//                     <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
//                       {blog.status || "Published"}
//                     </span>
//                   </td>

//                   <td className="py-4 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg relative">
//                     <button
//                       onClick={() =>
//                         setOpenMenuIndex(openMenuIndex === index ? null : index)
//                       }
//                     >
//                       <FiMoreHorizontal />
//                     </button>

//                     {openMenuIndex === index && (
//                       <div
//                         ref={menuRef}
//                         className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-md text-sm z-50"
//                       >
//                         <button
//                           onClick={() => handleEdit(blog)}
//                           className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(index)}
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
// }

// export default AdminBloglist;

import React, { useState, useRef, useEffect } from "react";
import { useBlog } from "../Context/BlogContext";
import { FiSearch, FiCalendar, FiPlus, FiMoreHorizontal } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function AdminBloglist() {
  const navigate = useNavigate();
  const { blogs, setBlogs } = useBlog(); // Added setBlogs for update/delete

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchSearch =
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchDate = selectedDate
      ? blog.publishDate === selectedDate
      : true;

    return matchSearch && matchDate;
  });

  const handleDelete = (index) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    const updatedBlogs = [...blogs];
    updatedBlogs.splice(index, 1);
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  };

  const handleEdit = (blog) => {
    navigate("/admin-panel/blog-list/blog-form", { state: { blog } });
  };

  return (
    <div className="p-1">

      {/* TITLE */}
      <div className="text-xl md:text-2xl font-bold pb-4">
        Blog Management
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
            placeholder="Search blog..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* DESKTOP + BUTTON */}
        <button
          onClick={() => navigate("/admin-panel/blog-list/blog-form")}
          className="bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-green-700 hidden min-[431px]:flex"
        >
          <FiPlus size={26} />
        </button>
      </div>

      {/* MOBILE ADD BUTTON */}
      <button
        onClick={() => navigate("/admin-panel/blog-list/blog-form")}
        className="bg-green-600 text-white px-3 py-2 rounded-lg w-full max-[430px]:block hidden mb-4"
      >
        + Add
      </button>

      {/* TABLE */}
      <div className="bg-white rounded-xl overflow-x-auto">

        <table className="min-w-full border-separate border-spacing-y-3">

          {/* HEADER */}
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

          {/* BODY */}
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
                    {blog.publishDate}
                  </td>
                  <td className="py-4 px-4 bg-white border-y border-gray-200">
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      {blog.status || "Published"}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="py-4 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg relative">
                    <button
                      onClick={() =>
                        setOpenMenuIndex(openMenuIndex === index ? null : index)
                      }
                    >
                      <FiMoreHorizontal />
                    </button>

                    {openMenuIndex === index && (
                      <div
                        ref={menuRef}
                        className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-md text-sm z-50"
                      >
                        <button
                          onClick={() => handleEdit(blog)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
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
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default AdminBloglist;






