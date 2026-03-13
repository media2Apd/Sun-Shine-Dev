// import React from "react";

// import { useBlog } from "../Context/BlogContext";
// import BlogCard from "../components/homeComponents/BlogCard"

// function BlogPage() {

//   const { blogs } = useBlog();

//   return (
//     <div className="max-w-7xl mx-auto p-4">

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

//         {blogs.map((blog, index) => (
//           <BlogCard key={index} blog={blog} />
//         ))}

//       </div>

//     </div>
//   );
// }

// export default BlogPage;


import React from "react";
import { useBlog } from "../Context/BlogContext";
import BlogCard from "../components/homeComponents/BlogCard";
import Blog from "../assets/Blogpageimage.png";

function BlogPage() {

  const { blogs } = useBlog();

  return (

    <div className="max-w-7xl mx-auto px-8 py-5">

      {/* PAGE TITLE */}

      <div className="text-center mb-6">

        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          Blogs
        </h1>

        <p className="text-gray-500 text-sm md:text-base">
          Expert insights, crop care tips, and fertilizer guidance for better yield
        </p>

      </div>


      {/* HERO BLOG */}

      <div className="relative rounded-xl overflow-hidden mb-10">

        <img
          src={Blog}
          alt="hero"
          className="w-full h-[220px] md:h-[350px] object-cover"
        />

        <div className="absolute inset-0 bg-black/30 flex items-center">

          <div className="text-white p-6 md:p-10 max-w-lg">

            <p className="text-sm mb-2 opacity-90">
              Fertilizer Guide
            </p>

            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              How to Choose the Right Fertilizer for Your Crop
            </h2>

            <p className="text-sm opacity-80 mb-4">
              Choosing the right fertilizer plays a key role in healthy crop growth and higher yield.
            </p>

            <button className="text-sm underline">
              Read Full Guide →
            </button>

          </div>

        </div>

      </div>


      {/* FILTER BAR */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">

        <div className="flex items-center gap-3">

          <span className="text-sm text-gray-600">
            Category:
          </span>

          <select className="border rounded-md px-3 py-1 text-sm">

            <option>All</option>
            <option>Fertilizer Guide</option>
            <option>Crop Nutrition</option>
            <option>Crop Protection</option>

          </select>

        </div>


        <div className="flex items-center gap-3">

          <span className="text-sm text-gray-600">
            Sort by:
          </span>

          <select className="border rounded-md px-3 py-1 text-sm">

            <option>Latest</option>
            <option>Oldest</option>

          </select>

        </div>

      </div>


      {/* BLOG CARDS (YOUR EXISTING LOGIC) */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {blogs.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}

      </div>

    </div>

  );
}

export default BlogPage;

