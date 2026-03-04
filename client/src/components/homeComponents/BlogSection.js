import React from "react";
import blog1 from "../../assets/blog1.png";
import blog2 from "../../assets/blog2.png";
import blog3 from "../../assets/blog3.png";
import blog4 from "../../assets/blog4.png";

const blogs = [
  {
    id: 1,
    category: "Fertilizer Guide",
    title: "How to Choose the Right Fertilizer for Your Crop",
    desc: "Choosing the right fertilizer is essential for healthy crop growth and better yield.",
    image: blog1,
  },
  {
    id: 2,
    category: "Crop Nutrition",
    title: "Importance of Micronutrients in Improving Crop Yield",
    desc: "Micronutrients play a key role in improving plant health and productivity.",
    image: blog2,
  },
  {
    id: 3,
    category: "Crop Protection",
    title: "Why Bio Pesticides Are Better for Sustainable Farming",
    desc: "Bio pesticides are eco-friendly and safe for long term soil health.",
    image: blog3,
  },
  {
    id: 4,
    category: "Soil Health",
    title: "How Organic Manures Improve Soil Health and Crop Growth",
    desc: "Organic manures enhance soil fertility and microbial activity.",
    image: blog4,
  },
];

const BlogsSection = () => {
  return (
    <div className="bg-white-100 px-10 py-5 pb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-semibold">Blogs</h2>
        <button className="text-green-700 font-medium hover:underline">
          View all
        </button>
      </div>

      {/* Blog Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">        {blogs.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <p className="text-xs text-gray-500 mb-2">
                {item.category}
              </p>

              <h3 className="font-semibold text-sm mb-2">
                {item.title}
              </h3>

              <p className="text-xs text-gray-600 mb-4">
                {item.desc}
              </p>

              <button className="text-green-600 text-sm hover:underline">
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsSection;