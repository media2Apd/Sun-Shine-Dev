
// import { createContext, useContext, useEffect, useState } from "react";

// const BlogContext = createContext();

// export const BlogProvider = ({ children }) => {
//   const [blogs, setBlogs] = useState(() => {
//     const saved = localStorage.getItem("blogs");
//     return saved ? JSON.parse(saved) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("blogs", JSON.stringify(blogs));
//   }, [blogs]);

//   const addBlog = (blog) => {
//     setBlogs((prev) => [...prev, blog]);
//   };

//   return (
//     <BlogContext.Provider value={{ blogs, addBlog }}>
//       {children}
//     </BlogContext.Provider>
//   );
// };

// export const useBlog = () => useContext(BlogContext);

import { createContext, useContext, useEffect, useState } from "react";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState(() => {
    const saved = localStorage.getItem("blogs");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  const addBlog = (blog) => {
    setBlogs((prev) => [...prev, blog]);
  };

  const updateBlog = (updatedBlog) => {
    setBlogs((prev) =>
      prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
    );
  };

  const deleteBlog = (id) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <BlogContext.Provider value={{ blogs, setBlogs, addBlog, updateBlog, deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);