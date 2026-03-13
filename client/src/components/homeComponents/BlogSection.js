import React from "react";
import BlogCard from "./BlogCard";

import blog1 from "../../assets/blog1.png";
import blog2 from "../../assets/blog2.png";
import blog3 from "../../assets/blog3.png";
import blog4 from "../../assets/blog4.png";

const BlogsSection = () => {

  const blogs = [
    {
      id: 1,
      image: blog1,
      category: "Fertilizer Guide",
      title: "How to Choose the Right Fertilizer for Your Crop",
      desc: "Choosing the right fertilizer is essential for healthy crop growth and better yield."
    },
    {
      id: 2,
      image: blog2,
      category: "Crop Care",
      title: "Best Organic Nutrients for Sustainable Farming",
      desc: "Organic nutrients improve soil fertility and crop productivity."
    },
    {
      id: 3,
      image: blog3,
      category: "Soil Health",
      title: "Improve Soil Health for Better Harvest",
      desc: "Healthy soil leads to stronger crops and higher yields."
    },
    {
      id: 4,
      image: blog4,
      category: "Farming Tips",
      title: "Modern Techniques for Smart Farming",
      desc: "Modern agricultural practices improve productivity and sustainability."
    }
  ];

  return (
    <div className="bg-white-100 py-5 pb-10 px-4 md:px-8 lg:px-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-semibold">Blogs</h2>

        <button className="text-green-700 font-medium hover:underline">
          View all
        </button>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {blogs.map((item) => (
          <BlogCard
            key={item.id}
            image={item.image}
            category={item.category}
            title={item.title}
            desc={item.desc}
          />
        ))}

      </div>

    </div>
  );
};

export default BlogsSection;