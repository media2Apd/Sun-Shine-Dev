

// import React, { useState } from "react";
// import { useBlog } from "../Context/BlogContext";
// import { useNavigate } from "react-router-dom";

// const initialState = {
//   title: "",
//   slug: "",
//   category: "",
//   author: "",
//   publishDate: "",
//   summary: "",
//   content: "",
//   image: ""
// };

// export default function BlogForm() {

//   const navigate = useNavigate();
//   const { addBlog } = useBlog();
//   const [formData, setFormData] = useState(initialState);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();

//     reader.onloadend = () => {
//       setFormData({
//         ...formData,
//         image: reader.result
//       });
//     };

//     reader.readAsDataURL(file);
//   };

//   const handlePublish = () => {
//     addBlog({ ...formData, status: "Published" });
//     navigate("/admin-panel/blog-list");
//   };

//   const handleSaveAndCreate = () => {
//     addBlog(formData);
//     setFormData(initialState);
//   };

//   return (
//     <div className="min-h-screen p-4 md:p-4 sm:p-1">

//       <div className="w-full max-w-[900px] mx-auto px-2 sm:px-4">

//         <h1 className="text-xl md:text-2xl font-semibold mb-6">
//           Add New Blog
//         </h1>

//         <div className="bg-white rounded-xl shadow-sm p-6 space-y-8">

//           {/* BLOG BASIC INFO */}
//           <div>

//             <h3 className="text-sm font-semibold text-gray-700 mb-5">
//               Blog Basic Information
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//               <div className="md:col-span-2">
//                 <label className="text-sm text-gray-500">Blog Title</label>
//                 <input
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   className="w-full border rounded-lg p-3 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>

//               <div className="md:col-span-2">
//                 <label className="text-sm text-gray-500">Blog Slug</label>
//                 <input
//                   name="slug"
//                   value={formData.slug}
//                   onChange={handleChange}
//                   className="w-full border rounded-lg p-3 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm text-gray-500">Category</label>
//                 <select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   className="w-full border rounded-lg p-3 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//                 >
//                   <option value="">Select Category</option>
//                   <option>Fertilizer Guide</option>
//                   <option>Organic Farming</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="text-sm text-gray-500">Author Name</label>
//                 <input
//                   name="author"
//                   value={formData.author}
//                   onChange={handleChange}
//                   placeholder="e.g. Julienne Vane"
//                   className="w-full border rounded-lg p-3 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm text-gray-500">Publish Date</label>
//                 <input
//                   type="date"
//                   name="publishDate"
//                   value={formData.publishDate}
//                   onChange={handleChange}
//                   className="w-full border rounded-lg p-3 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//               </div>

//             </div>

//           </div>

//           {/* IMAGE UPLOAD */}
//           <div>

//             <h3 className="text-sm font-semibold text-gray-700 mb-3">
//               Blog Featured Image
//             </h3>

//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">

//               <p className="text-sm text-gray-500 mb-4">
//                 Upload high-resolution image
//               </p>

//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="hidden"
//                 id="blogImage"
//               />

//               <label
//                 htmlFor="blogImage"
//                 className="bg-green-600 text-white px-5 py-2 rounded-full text-sm cursor-pointer hover:bg-green-700"
//               >
//                 Upload Image
//               </label>

//               {formData.image && (
//                 <div className="mt-6 flex justify-center">
//                   <img
//                     src={formData.image}
//                     alt="preview"
//                     className="w-40 h-40 object-cover rounded-lg"
//                   />
//                 </div>
//               )}

//             </div>

//           </div>

//           {/* SUMMARY */}
//           <div>

//             <h3 className="text-sm font-semibold text-gray-700 mb-2">
//               Short Description
//             </h3>

//             <textarea
//               name="summary"
//               value={formData.summary}
//               onChange={handleChange}
//               rows="3"
//               className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="A brief hook for readers (80–200 characters)..."
//             />

//           </div>

//           {/* CONTENT */}
//           <div>

//             <h3 className="text-sm font-semibold text-gray-700 mb-2">
//               Blog Content
//             </h3>

//             <textarea
//               name="content"
//               value={formData.content}
//               onChange={handleChange}
//               rows="7"
//               className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//             />

//           </div>

//         </div>

//         {/* ACTION BUTTONS */}
//         <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">

//           <button className="px-6 py-2 rounded-full border text-gray-600 hover:bg-gray-100">
//             ← Back
//           </button>

//           <button
//             onClick={handleSaveAndCreate}
//             className="px-6 py-2 rounded-full border text-gray-600 hover:bg-gray-100"
//           >
//             Save & Create Another
//           </button>

//           <button
//             onClick={handlePublish}
//             className="px-6 py-2 rounded-full bg-green-600 text-white hover:bg-green-700"
//           >
//             Publish Blog
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }

import React, { useState } from "react";
import { useBlog } from "../Context/BlogContext";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const { addBlog } = useBlog();
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  const handlePublish = () => {
    addBlog({ ...formData, status: "Published" });
    navigate("/admin-panel/blog-list");
  };

  const handleSaveAndCreate = () => {
    addBlog(formData);
    setFormData(initialState);
  };

  return (

    <div className="min-h-screen  py-2 sm:px-1">

      <div className="w-full max-w-[900px]">

        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 pl-5">
          Add New Blog
        </h1>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 md:p-8 space-y-8">

          {/* BLOG BASIC INFO */}
          <div>

            <h3 className="text-sm font-semibold text-gray-700 mb-5">
              Blog Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

              <div className="md:col-span-2">
                <label className="text-md">Blog Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-md">Blog Slug</label>
                <input
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="text-md">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Category</option>
                  <option>Fertilizer Guide</option>
                  <option>Organic Farming</option>
                </select>
              </div>

              <div>
                <label className="text-md">Author Name</label>
                <input
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="e.g. Julienne Vane"
                  className="w-full border rounded-lg p-3 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="text-md">Publish Date</label>
                <input
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

            </div>

          </div>


          {/* IMAGE UPLOAD */}

          <div>

            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Blog Featured Image
            </h3>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6  text-center">

              <p className="text-sm text-gray-500 mb-4">
                Upload high-resolution image
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="blogImage"
              />

              <label
                htmlFor="blogImage"
                className="bg-green-600 text-white px-5 py-2 rounded-full text-sm cursor-pointer hover:bg-green-700"
              >
                Upload Image
              </label>

              {formData.image && (
                <div className="mt-6 flex justify-center">
                  <img
                    src={formData.image}
                    alt="preview"
                    className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-lg"
                  />
                </div>
              )}

            </div>

          </div>


          {/* SUMMARY */}

          <div>

            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Short Description
            </h3>

            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="A brief hook for readers (80–200 characters)..."
            />

          </div>


          {/* CONTENT */}

          <div>

            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Blog Content
            </h3>

            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="7"
              className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

        </div>


        {/* BUTTONS */}

        <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">

          <button className="w-full sm:w-auto px-6 py-2 rounded-full border text-gray-600 hover:bg-gray-100">
            ← Back
          </button>

          <button
            onClick={handleSaveAndCreate}
            className="w-full sm:w-auto px-6 py-2 rounded-full border text-gray-600 hover:bg-gray-100"
          >
            Save & Create Another
          </button>

          <button
            onClick={handlePublish}
            className="w-full sm:w-auto px-6 py-2 rounded-full bg-green-600 text-white hover:bg-green-700"
          >
            Publish Blog
          </button>

        </div>

      </div>

    </div>

  );
}

