

// import React from "react";

// function BlogCard({ blog }) {

//   // 🛡️ Safety check
//   if (!blog) return null;

//   return (
//     <div className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition">

//       {/* IMAGE */}
//       {blog?.image && (
//         <img
//           src={blog.image}
//           alt={blog.title}
//           className="w-full h-56 object-cover"
//         />
//       )}

//       <div className="p-5">

//         {/* CATEGORY */}
//         <p className="text-sm text-gray-500 mb-2">
//           {blog?.category}
//         </p>

//         {/* TITLE */}
//         <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 leading-snug">
//           {blog?.title}
//         </h2>

//         {/* SUMMARY */}
//         <p className="text-gray-600 text-sm md:text-base mb-4">
//           {blog?.summary}
//         </p>

//         {/* READ MORE */}
//         <div className="flex justify-end">
//           <button className="text-green-600 text-sm font-medium hover:underline">
//             Read more
//           </button>
//         </div>

//       </div>

//     </div>
//   );
// }

// export default BlogCard;

// import React from "react";

// function BlogCard({ blog }) {
//   if (!blog) return null;

//   return (
//     <div className="bg-white rounded-xl border border-[#E6E6E6] overflow-hidden hover:shadow-lg transition max-h-[400px] flex flex-col">
      
//       {/* IMAGE */}
//       {blog?.image && (
//         <img
//           src={blog.image}
//           alt={blog.title}
//           className="w-full h-40 sm:h-48 md:h-52 object-cover"
//         />
//       )}

//       <div className="p-4 flex flex-col flex-1">
//         {/* CATEGORY */}
//         <p className="text-sm text-black mb-1 truncate">
//           {blog?.category}
//         </p>

//         {/* TITLE */}
//         <h2 className="text-lg md:text-xl font-semibold text-black mb-2 truncate">
//           {blog?.title}
//         </h2>

//         {/* SUMMARY */}
//         <p className="text-black text-sm md:text-base mb-2 flex-1 overflow-hidden line-clamp-3">
//           {blog?.summary}
//         </p>

//         {/* READ MORE */}
//         <div className="flex justify-end mt-auto">
//           <button className="text-[#00B207] text-sm font-medium underline">
//             Read more
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BlogCard;

import React from "react";
import { useNavigate } from "react-router-dom";

function BlogCard({ blog }) {
  const navigate = useNavigate();

  if (!blog) return null;
console.log(blog);

  const handleClick = () => {
    navigate(`/blog-overview/${blog.slug}`); // ✅ slug based navigation
  };

  return (
    <div className="bg-white rounded-xl border border-[#E6E6E6] overflow-hidden hover:shadow-lg transition max-h-[400px] flex flex-col">
      
      {/* IMAGE */}
      {blog?.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-40 sm:h-48 md:h-52 object-cover cursor-pointer"
          onClick={handleClick}
        />
      )}

      <div className="p-4 flex flex-col flex-1">
        {/* CATEGORY */}
        <p className="text-sm text-black mb-1 truncate">
          {blog?.category}
        </p>

        {/* TITLE */}
        <h2
          className="text-lg md:text-xl font-semibold text-black mb-2 truncate cursor-pointer"
          onClick={handleClick}
        >
          {blog?.title}
        </h2>

        {/* SUMMARY */}
        <p className="text-black text-sm md:text-base mb-2 flex-1 overflow-hidden line-clamp-3">
          {blog?.summary}
        </p>

        {/* READ MORE */}
        <div className="flex justify-end mt-auto">
          <button
            onClick={handleClick}
            className="text-[#00B207] text-sm font-medium underline"
          >
            Read more
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;