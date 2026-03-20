// import React, { createContext, useContext, useEffect, useState } from "react";

// const BlogContext = createContext();

// export const BlogProvider = ({ children }) => {

//   const [blogs, setBlogs] = useState(() => {
//     const storedBlogs = localStorage.getItem("blogs");
//     return storedBlogs ? JSON.parse(storedBlogs) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("blogs", JSON.stringify(blogs));
//   }, [blogs]);

//   const addBlog = (blog) => {
//     setBlogs((prevBlogs) => [
//       ...prevBlogs,
//       { ...blog, status: "Published" }
//     ]);
//   };

//   return (
//     <BlogContext.Provider value={{ blogs, addBlog }}>
//       {children}
//     </BlogContext.Provider>
//   );
// };

// export const useBlog = () => useContext(BlogContext);
import React, { createContext, useContext, useEffect, useState } from "react";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {

  const [blogs, setBlogs] = useState(() => {
    const storedBlogs = localStorage.getItem("blogs");
    return storedBlogs ? JSON.parse(storedBlogs) : [];
  });

  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  const addBlog = (blog) => {
    setBlogs((prevBlogs) => [
      ...prevBlogs,
      { ...blog, status: "Published" }
    ]);
  };

  return (
    <BlogContext.Provider value={{ blogs, setBlogs, addBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);