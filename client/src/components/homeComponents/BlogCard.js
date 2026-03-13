

import React from "react";

const BlogCard = ({ image, category, title, desc }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition">

      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">

        <p className="text-xs text-gray-500 mb-2">
          {category}
        </p>

        <h3 className="font-semibold text-sm mb-2">
          {title}
        </h3>

        <p className="text-xs text-gray-600 mb-4">
          {desc}
        </p>

        <button className="text-green-600 text-sm hover:underline">
          Read more
        </button>

      </div>

    </div>
  );
};

export default BlogCard;