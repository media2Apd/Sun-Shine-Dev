import React, { useState } from "react";
import { useBlog } from "../Context/BlogContext";

const initialState = {
  title: "",
  slug: "",
  category: "",
  author: "",
  publishDate: "",
  summary: "",
  content: "",
  image: ""
};

export default function BlogForm() {

  const { addBlog } = useBlog();
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePublish = () => {
    addBlog(formData);
    alert("Blog Published Successfully");
  };

  const handleSaveAndCreate = () => {
    addBlog(formData);
    setFormData(initialState);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-3 sm:p-5 md:p-8">

      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-6">
        Add New Blog
      </h1>

      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 space-y-6">

        {/* Blog Basic Info */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Blog Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="md:col-span-2">
              <label className="text-xs text-gray-500">Blog Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-md p-2 text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs text-gray-500">Blog Slug</label>
              <input
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full border rounded-md p-2 text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-md p-2 text-sm"
              >
                <option>Fertilizer Guide</option>
                <option>Organic Farming</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-500">Author Name</label>
              <input
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Eg. Julienne Vane"
                className="w-full border rounded-md p-2 text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">Publish Date</label>
              <input
                type="date"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleChange}
                className="w-full border rounded-md p-2 text-sm"
              />
            </div>

          </div>
        </div>

        {/* Image Upload */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Blog Featured Image
          </h3>

          <div className="border-2 border-dashed rounded-lg p-6 sm:p-10 text-center">

            <p className="text-xs sm:text-sm text-gray-500 mb-3">
              Upload high-resolution image
            </p>

            <button className="bg-green-600 text-white text-xs sm:text-sm px-4 py-2 rounded-md">
              Upload Image
            </button>

          </div>
        </div>

        {/* Summary */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Short Description
          </h3>

          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-md p-2 text-sm"
            placeholder="A brief hook for readers..."
          />
        </div>

        {/* Content */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Blog Content
          </h3>

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="6"
            className="w-full border rounded-md p-2 text-sm"
          />
        </div>

      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">

        <button className="w-full sm:w-auto border px-4 py-2 rounded-md text-sm">
          Back
        </button>

        <button
          onClick={handleSaveAndCreate}
          className="w-full sm:w-auto border px-4 py-2 rounded-md text-sm"
        >
          Save & Create Another
        </button>

        <button
          onClick={handlePublish}
          className="w-full sm:w-auto bg-green-600 text-white px-5 py-2 rounded-md text-sm"
        >
          Publish Blog
        </button>

      </div>

    </div>
  );
}