
// import React from "react";

// function BlogCard({ blog }) {
//   return (
//     <div className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition">

//       {/* IMAGE */}
//       {blog.image && (
//         <img
//           src={blog.image}
//           alt={blog.title}
//           className="w-full h-56 object-cover"
//         />
//       )}

//       <div className="p-5">

//         {/* CATEGORY */}
//         <p className="text-sm text-gray-500 mb-2">
//           {blog.category}
//         </p>

//         {/* TITLE */}
//         <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 leading-snug">
//           {blog.title}
//         </h2>

//         {/* SUMMARY */}
//         <p className="text-gray-600 text-sm md:text-base mb-4">
//           {blog.summary}
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

import React from "react";

function BlogCard({ blog }) {

  // 🛡️ Safety check
  if (!blog) return null;

  return (
    <div className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition">

      {/* IMAGE */}
      {blog?.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-56 object-cover"
        />
      )}

      <div className="p-5">

        {/* CATEGORY */}
        <p className="text-sm text-gray-500 mb-2">
          {blog?.category}
        </p>

        {/* TITLE */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 leading-snug">
          {blog?.title}
        </h2>

        {/* SUMMARY */}
        <p className="text-gray-600 text-sm md:text-base mb-4">
          {blog?.summary}
        </p>

        {/* READ MORE */}
        <div className="flex justify-end">
          <button className="text-green-600 text-sm font-medium hover:underline">
            Read more
          </button>
        </div>

      </div>

    </div>
  );
}

export default BlogCard;