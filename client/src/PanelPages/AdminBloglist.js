// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useBlogs } from "../Context/BlogContext";

// const BlogContext = createContext();

// export const BlogProvider = ({ children }) => {

//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const storedBlogs = localStorage.getItem("blogs");

//     if (storedBlogs) {
//       setBlogs(JSON.parse(storedBlogs));
//     }
//   }, []);

//   return (
//     <BlogContext.Provider value={{ blogs, setBlogs }}>
//       {children}
//     </BlogContext.Provider>
//   );
// };

// export const useBlogs = () => useContext(BlogContext);


import React from "react";
import { useBlogs } from "../Context/BlogContext";

function AdminBloglist() {

  const { blogs } = useBlogs();

  return (
    <div>

      <h2>Blog Management</h2>

      <table width="100%" border="0">

        <thead>
          <tr>
            <th>Blog Title</th>
            <th>Category</th>
            <th>Author</th>
            <th>Publish Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {blogs && blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <tr key={index}>
                <td>{blog.title}</td>
                <td>{blog.category}</td>
                <td>{blog.author}</td>
                <td>{blog.publishDate}</td>
                <td>{blog.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No blogs found</td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}

export default AdminBloglist;