import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlog } from "../Context/BlogContext";

export default function BlogOverview() {
  const { slug } = useParams(); // get slug from URL
  const { blogs } = useBlog();
  const navigate = useNavigate();

  // Find the blog by slug (or fallback to id if you prefer)
  const blog = blogs.find(
    (b) => b.slug === slug || b.id.toString() === slug
  );

  if (!blog) {
    return (
      <div className="p-6 text-center text-gray-500">
        Blog not found.
        <button
          onClick={() => navigate(-1)}
          className="block mt-4 text-green-600 hover:underline"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-lg shadow-md min-h-screen">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 border px-4 py-2 rounded hover:bg-gray-100"
      >
        ← Back
      </button>

      {/* TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>

      {/* AUTHOR & DATE */}
      {blog.author && blog.date && (
        <p className="text-gray-500 mb-6">
          {blog.author} • {blog.date}
        </p>
      )}

      {/* FEATURED IMAGE */}
      {blog.featuredImage && (
        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="w-full rounded-lg mb-8 object-cover max-h-96"
        />
      )}

      {/* CONTENT */}
      <div className="space-y-6">
        {blog.content?.map((block, i) => {
          switch (block.type) {
            case "heading":
              return (
                <h2
                  key={i}
                  className="text-2xl font-semibold"
                  dangerouslySetInnerHTML={{ __html: block.value }}
                />
              );
            case "paragraph":
              return (
                <p
                  key={i}
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: block.value }}
                />
              );
            case "list":
              return (
                <ul
                  key={i}
                  className="pl-6 list-disc text-gray-700"
                  dangerouslySetInnerHTML={{ __html: block.value }}
                />
              );
            case "quote":
              return (
                <blockquote
                  key={i}
                  className="border-l-4 pl-4 italic text-gray-600"
                  dangerouslySetInnerHTML={{ __html: block.value }}
                />
              );
            case "faq":
              return (
                <div
                  key={i}
                  className="bg-gray-50 p-4 rounded-lg"
                  dangerouslySetInnerHTML={{ __html: block.value }}
                />
              );
            case "tip":
              return (
                <div
                  key={i}
                  className="bg-green-50 border-l-4 border-green-500 p-4 rounded"
                  dangerouslySetInnerHTML={{ __html: block.value }}
                />
              );
            case "image":
              return (
                <img
                  key={i}
                  src={block.value}
                  alt=""
                  className="w-full rounded-lg"
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}