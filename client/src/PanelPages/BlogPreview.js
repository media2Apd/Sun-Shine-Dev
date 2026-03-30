import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function BlogPreview({ blog, onBack }) {
  if (!blog) {
    return (
      <div className="p-6">
        <button
          onClick={onBack}
          className="mb-6 border px-4 py-2 rounded hover:bg-gray-100 flex items-center gap-1 text-gray-600"
        >
          <FaArrowLeftLong/> Back to Editor
        </button>

        <p>No preview data available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-lg bg-white min-h-screen mx-auto">
      {/* BACK BUTTON */}
      <button
        onClick={onBack}
        className="mb-6 border px-4 py-2 rounded hover:bg-gray-100 flex items-center gap-1 text-gray-600"
      >
        <FaArrowLeftLong/> Back to Editor
      </button>

      {/* TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>

      {/* AUTHOR + DATE */}
      {blog.author && (
        <div className="text-gray-500 mb-6">
          {blog.author} • {blog.date}
        </div>
      )}

      {/* FEATURED IMAGE */}
      {blog.featuredImage && (
        <img
          src={blog.featuredImage?.url || blog.featuredImage}
          alt="blog featured"
          className="w-full rounded-xl mb-8"
        />
      )}

      {/* BLOG CONTENT */}
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
                <ul key={i} className="pl-6 list-disc text-gray-700 space-y-1">
                  {(block.value || "")
                    .split("\n")
                    .filter((item) => item.trim() !== "")
                    .map((item, idx) => (
                      <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                </ul>
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
                  alt="blog"
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