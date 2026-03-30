// import { useState, useRef, useEffect } from "react";
// import BlogPreview from "./BlogPreview";
// import { useLocation } from "react-router-dom";
// import SummaryApi from "../common/SummaryApi";

// export default function CreateBlog() {
//   const editorRefs = useRef([]);
//   const location = useLocation();

//   const editBlog = location.state?.blog || null; // ✅ get blog if editing

//   const [previewMode, setPreviewMode] = useState(false);
//   const [dragIndex, setDragIndex] = useState(null);

//   const [activeFormat, setActiveFormat] = useState({
//     bold: false,
//     italic: false,
//     underline: false,
//   });

//   const [blog, setBlog] = useState(() => {
//     if (editBlog) return { ...editBlog }; // prefill with existing blog data
//     return {
//       title: "",
//       slug: "",
//       category: "",
//       author: "",
//       date: "",
//       metaTitle: "",
//       metaDescription: "",
//       featuredImage: "",
//       status: "Draft",
//       content: [],
//     };
//   });

//   // ---------------------- FIELD UPDATES ----------------------
//   const updateField = (key, value) => setBlog({ ...blog, [key]: value });

//   // ---------------------- CONTENT BLOCKS ----------------------
//   const addBlock = (type) => {
//     setBlog({
//       ...blog,
//       content: [...blog.content, { type, value: "" }],
//     });
//   };

//   const updateBlock = (index, value) => {
//     const updated = [...blog.content];
//     updated[index].value = value;
//     setBlog({ ...blog, content: updated });
//   };

//   const clearBlock = (index) => {
//     if (editorRefs.current[index]) editorRefs.current[index].innerHTML = "";
//     updateBlock(index, "");
//   };

//   const removeBlock = (index) => {
//     setBlog({ ...blog, content: blog.content.filter((_, i) => i !== index) });
//   };

//   const format = (command) => {
//     document.execCommand(command, false, null);
//     checkFormat();
//   };

//   const checkFormat = () => {
//     setActiveFormat({
//       bold: document.queryCommandState("bold"),
//       italic: document.queryCommandState("italic"),
//       underline: document.queryCommandState("underline"),
//     });
//   };

//   // ---------------------- DRAG & DROP ----------------------
//   const handleDragStart = (index) => setDragIndex(index);
//   const handleDrop = (index) => {
//     if (dragIndex === null) return;
//     const items = [...blog.content];
//     const dragged = items[dragIndex];
//     items.splice(dragIndex, 1);
//     items.splice(index, 0, dragged);
//     setBlog({ ...blog, content: items });
//     setDragIndex(null);
//   };

//   // ---------------------- IMAGE UPLOAD ----------------------
// const handleImageUpload = (e, index) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   // preview மட்டும்
//   const reader = new FileReader();
//   reader.onloadend = () => updateBlock(index, reader.result);
//   reader.readAsDataURL(file);

//   // 🔥 actual file store (later upload pannalam)
//   updateBlock(index, file);
// };

//   const handleFeatured = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // preview மட்டும்
//     const reader = new FileReader();
//     reader.onloadend = () =>
//       setBlog((prev) => ({
//         ...prev,
//         featuredImage: reader.result,
//         featuredImageFile: file, // 🔥 important
//       }));

//     reader.readAsDataURL(file);
//   };

//   useEffect(() => {
//     if (blog.content.length > 0) {
//       blog.content.forEach((block, i) => {
//         if (editorRefs.current[i]) {
//           editorRefs.current[i].innerHTML = block.value || "";
//         }
//       });
//     }
//   }, [blog.content]);

//   useEffect(() => {
//     if (blog.content.length > 0) {
//       blog.content.forEach((block, i) => {
//         if (editorRefs.current[i]) {
//           editorRefs.current[i].innerHTML = block.value || "";
//         }
//       });
//     }
//   }, [blog.content, previewMode]); // 🔥 IMPORTANT CHANGE

//   useEffect(() => {
//     const fetchBlog = async () => {
//       if (!editBlog?.slug) return;

//       try {
//         const res = await fetch(
//           SummaryApi.getOneBlog.url(editBlog.slug),
//           {
//             method: SummaryApi.getOneBlog.method,
//           }
//         );

//         const data = await res.json();

//         if (data) {
//           setBlog({
//             ...data,
//             date: data.publishDate
//               ? new Date(data.publishDate).toISOString().split("T")[0]
//               : "",
//           });
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchBlog();
//   }, [editBlog?.slug]); // ✅ FIX

//   // ---------------------- SAVE & PREVIEW ----------------------
//   const saveBlog = async () => {
//     try {
//       const formData = new FormData();

//       formData.append("title", blog.title);
//       formData.append("slug", blog.slug);
//       formData.append("category", blog.category);
//       formData.append("author", blog.author);
//       formData.append("publishDate", blog.date);
//       formData.append("metaTitle", blog.metaTitle);
//       formData.append("metaDescription", blog.metaDescription);
//       formData.append("status", blog.status);

//       // ✅ content fix
//       const updatedContent = blog.content.map((block, i) => ({
//         ...block,
//         value: editorRefs.current[i]?.innerHTML || block.value,
//       }));

//       formData.append("content", JSON.stringify(updatedContent));

//       if (blog.featuredImageFile) {
//         formData.append("featuredImage", blog.featuredImageFile);
//       }

//       const blogId = editBlog?._id;

//       let res;

//       if (editBlog) {
//         res = await fetch(SummaryApi.updateBlog.url(blogId), {
//           method: SummaryApi.updateBlog.method,
//           body: formData,
//         });
//       } else {
//         res = await fetch(SummaryApi.createBlog.url, {
//           method: SummaryApi.createBlog.method,
//           body: formData,
//         });
//       }

//       const data = await res.json();

//       if (data.success || data._id) {
//         alert(editBlog ? "Updated successfully" : "Created successfully");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handlePreview = () => {
//     const updatedContent = blog.content.map((block, i) => ({
//       ...block,
//       value: editorRefs.current[i]?.innerHTML || block.value,
//     }));

//     setBlog((prev) => ({
//       ...prev,
//       content: updatedContent,
//     }));

//     setPreviewMode(true);
//   };;

//   if (previewMode) {
//     return <BlogPreview blog={blog} onBack={() => setPreviewMode(false)} />;
//   }

//   // ---------------------- JSX ----------------------
//   return (
//     <div className="p-4 md:p-6 min-h-screen">
//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-4">
//         <h1 className="text-xl font-semibold">
//           {editBlog ? "Edit Blog" : "Create Blog"}
//         </h1>
//         <div className="flex gap-3 flex-wrap">
//           <button onClick={handlePreview} className="border px-4 py-2 rounded">
//             Preview
//           </button>
//           <button
//             onClick={saveBlog}
//             className="bg-green-600 text-white px-4 py-2 rounded"
//           >
//             {editBlog ? "Update Blog" : "Save Blog"}
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
//         {/* LEFT PANEL */}
//         <div className="bg-white p-4 rounded-xl border space-y-4">
//           <h2 className="font-medium mb-2">Basic Info</h2>
//           <input
//             placeholder="Blog Title"
//             className="input"
//             value={blog.title}
//             onChange={(e) => updateField("title", e.target.value)}
//           />
//           <input
//             placeholder="Slug"
//             className="input"
//             value={blog.slug}
//             onChange={(e) => updateField("slug", e.target.value)}
//           />
//           <input
//             placeholder="Category"
//             className="input"
//             value={blog.category}
//             onChange={(e) => updateField("category", e.target.value)}
//           />
//           <input
//             placeholder="Author"
//             className="input"
//             value={blog.author}
//             onChange={(e) => updateField("author", e.target.value)}
//           />
//           <input
//             type="date"
//             className="input"
//             value={blog.date}
//             onChange={(e) => updateField("date", e.target.value)}
//           />

//           <h2 className="font-medium mt-4 mb-2">SEO</h2>
//           <input
//             placeholder="Meta Title"
//             className="input"
//             value={blog.metaTitle}
//             onChange={(e) => updateField("metaTitle", e.target.value)}
//           />
//           <textarea
//             placeholder="Meta Description"
//             className="input"
//             value={blog.metaDescription}
//             onChange={(e) => updateField("metaDescription", e.target.value)}
//           />

//           <h2 className="font-medium mt-4 mb-2">Featured Image</h2>
//           <input type="file" accept="image/*" onChange={handleFeatured} />
//           {blog.featuredImage && (
//             <img
//                src={blog.featuredImage?.url || blog.featuredImage}
//               alt="Featured"
//               className="rounded-lg mt-2 max-h-60"
//             />
//           )}

//           <select
//             className="input mt-4"
//             value={blog.status}
//             onChange={(e) => updateField("status", e.target.value)}
//           >
//             <option>Draft</option>
//             <option>Published</option>
//           </select>
//         </div>

//         {/* RIGHT PANEL */}
//         <div className="bg-white rounded-xl border p-4">
//           <div className="flex flex-wrap gap-2 mb-4">
//             <button onClick={() => addBlock("heading")} className="toolbar">
//               + Heading
//             </button>
//             <button onClick={() => addBlock("paragraph")} className="toolbar">
//               + Paragraph
//             </button>
//             <button onClick={() => addBlock("list")} className="toolbar">
//               + List
//             </button>
//             <button onClick={() => addBlock("image")} className="toolbar">
//               + Image
//             </button>
//             <button onClick={() => addBlock("quote")} className="toolbar">
//               + Quote
//             </button>
//             <button onClick={() => addBlock("faq")} className="toolbar">
//               + FAQ
//             </button>
//             <button onClick={() => addBlock("tip")} className="toolbar">
//               + Pro Tip
//             </button>
//           </div>

//           {blog.content.map((block, i) => (
//             <div
//               key={i}
//               onDragOver={(e) => e.preventDefault()}
//               onDrop={() => handleDrop(i)}
//               className="mb-4 border p-3 rounded-lg bg-gray-50 relative"
//             >
//               {/* Drag Handle */}
//               <span
//                 draggable
//                 onDragStart={() => handleDragStart(i)}
//                 className="absolute top-2 right-2 cursor-grab text-gray-400 hover:text-gray-700"
//                 title="Drag to reorder"
//               >
//                 ☰
//               </span>

//               {block.type !== "image" && (
//                 <div className="flex flex-wrap gap-2 mb-2 items-center">
//                   <button
//                     onClick={() => format("bold")}
//                     className={`px-2 border rounded font-bold ${
//                       activeFormat.bold ? "bg-gray-200" : ""
//                     }`}
//                   >
//                     B
//                   </button>
//                   <button
//                     onClick={() => format("italic")}
//                     className={`px-2 border rounded italic ${
//                       activeFormat.italic ? "bg-gray-200" : ""
//                     }`}
//                   >
//                     I
//                   </button>
//                   <button
//                     onClick={() => format("underline")}
//                     className={`px-2 border rounded underline ${
//                       activeFormat.underline ? "bg-gray-200" : ""
//                     }`}
//                   >
//                     U
//                   </button>

//                   <button
//                     onClick={() => clearBlock(i)}
//                     className="ml-auto text-orange-600 text-sm"
//                   >
//                     Clear
//                   </button>
//                   <button
//                     onClick={() => removeBlock(i)}
//                     className="text-red-600 text-sm"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               )}

//               {block.type !== "image" && (
//                 <div
//                   ref={(el) => (editorRefs.current[i] = el)}
//                   contentEditable
//                   suppressContentEditableWarning
//                   data-placeholder={
//                     block.type === "heading"
//                       ? "Enter heading..."
//                       : block.type === "paragraph"
//                       ? "Write paragraph..."
//                       : block.type === "list"
//                       ? "Write list..."
//                       : block.type === "quote"
//                       ? "Write quote..."
//                       : block.type === "faq"
//                       ? "Enter FAQ..."
//                       : "Write tip..."
//                   }
//                   onInput={(e) => updateBlock(i, e.currentTarget.innerHTML)}
//                   className="input min-h-[80px] editor"
//                 />
//               )}

//               {block.type === "image" && (
//                 <>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => handleImageUpload(e, i)}
//                   />
//                   {block.value && (
//                     <img
//                       src={block.value}
//                       alt=""
//                       className="rounded-lg mt-2 max-h-60"
//                     />
//                   )}
//                   <div className="flex justify-end gap-3 mt-2">
//                     <button
//                       onClick={() => clearBlock(i)}
//                       className="text-orange-600 text-sm"
//                     >
//                       Clear
//                     </button>
//                     <button
//                       onClick={() => removeBlock(i)}
//                       className="text-red-600 text-sm"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState, useRef, useEffect } from "react";
// import BlogPreview from "./BlogPreview";
// import { useLocation, useNavigate } from "react-router-dom";
// import SummaryApi from "../common/SummaryApi";
// import toast from "react-hot-toast";

// export default function CreateBlog() {
//   const editorRefs = useRef([]);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const editBlog = location.state?.blog || null;

//   const [previewMode, setPreviewMode] = useState(false);
//   const [dragIndex, setDragIndex] = useState(null);

//   const [activeFormat, setActiveFormat] = useState({
//     bold: false,
//     italic: false,
//     underline: false,
//   });

//   const [blog, setBlog] = useState({
//     title: "",
//     slug: "",
//     category: "",
//     author: "",
//     date: "",
//     metaTitle: "",
//     metaDescription: "",
//     featuredImage: "",
//     status: "Draft",
//     content: [],
//   });

//   // Prefill data if editing
//   useEffect(() => {
//     if (editBlog) {
//       setBlog({
//         ...editBlog,
//         date: editBlog.publishDate ? new Date(editBlog.publishDate).toISOString().split("T")[0] : "",
//       });
//     }
//   }, [editBlog]);

//   // ---------------------- FIELD UPDATES ----------------------
//   const updateField = (key, value) => setBlog((prev) => ({ ...prev, [key]: value }));

//   // ---------------------- CONTENT BLOCKS ----------------------
//   const addBlock = (type) => {
//     setBlog((prev) => ({
//       ...prev,
//       content: [...prev.content, { type, value: "" }],
//     }));
//   };

//   const updateBlock = (index, value) => {
//     // We update the state, but we DON'T re-sync the innerHTML in a useEffect 
//     // while the user is typing to prevent cursor jumping.
//     const updated = [...blog.content];
//     updated[index].value = value;
//     setBlog((prev) => ({ ...prev, content: updated }));
//   };

//   const clearBlock = (index) => {
//     if (editorRefs.current[index]) editorRefs.current[index].innerHTML = "";
//     updateBlock(index, "");
//   };

//   const removeBlock = (index) => {
//     setBlog((prev) => ({ ...prev, content: prev.content.filter((_, i) => i !== index) }));
//   };

//   // Formatting
//   const format = (command) => {
//     document.execCommand(command, false, null);
//     checkFormat();
//   };

//   const checkFormat = () => {
//     setActiveFormat({
//       bold: document.queryCommandState("bold"),
//       italic: document.queryCommandState("italic"),
//       underline: document.queryCommandState("underline"),
//     });
//   };

//   // ---------------------- DRAG & DROP ----------------------
//   const handleDragStart = (index) => setDragIndex(index);
//   const handleDrop = (index) => {
//     if (dragIndex === null) return;
//     const items = [...blog.content];
//     const dragged = items[dragIndex];
//     items.splice(dragIndex, 1);
//     items.splice(index, 0, dragged);
//     setBlog((prev) => ({ ...prev, content: items }));
//     setDragIndex(null);
//   };

//   // ---------------------- IMAGE UPLOAD ----------------------
//   const handleImageUpload = (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const updated = [...blog.content];
//       updated[index].value = reader.result; // preview
//       updated[index].file = file; // actual file for upload
//       setBlog((prev) => ({ ...prev, content: updated }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleFeatured = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () =>
//       setBlog((prev) => ({
//         ...prev,
//         featuredImage: reader.result,
//         featuredImageFile: file,
//       }));
//     reader.readAsDataURL(file);
//   };

//   // Initialize refs content only on first load or manual preview toggle
//   useEffect(() => {
//     blog.content.forEach((block, i) => {
//       if (editorRefs.current[i] && editorRefs.current[i].innerHTML !== block.value) {
//         editorRefs.current[i].innerHTML = block.value || "";
//       }
//     });
//   }, [previewMode]); // Only sync when coming back from preview

//   // ---------------------- SAVE & PREVIEW ----------------------
//   const saveBlog = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("title", blog.title);
//       formData.append("slug", blog.slug);
//       formData.append("category", blog.category);
//       formData.append("author", blog.author);
//       formData.append("publishDate", blog.date);
//       formData.append("metaTitle", blog.metaTitle);
//       formData.append("metaDescription", blog.metaDescription);
//       formData.append("status", blog.status);

//       const updatedContent = blog.content.map((block, i) => ({
//         ...block,
//         value: block.type === "image" ? block.value : (editorRefs.current[i]?.innerHTML || block.value),
//       }));

//       formData.append("content", JSON.stringify(updatedContent));

//       if (blog.featuredImageFile) {
//         formData.append("featuredImage", blog.featuredImageFile);
//       }

//       let url = editBlog ? SummaryApi.updateBlog.url(editBlog._id) : SummaryApi.createBlog.url;
//       let method = editBlog ? SummaryApi.updateBlog.method : SummaryApi.createBlog.method;

//       const res = await fetch(url, { method, body: formData });
//       const data = await res.json();

//       if (data.success) {
//         toast.success(editBlog ? "Blog Updated" : "Blog Created");
//         navigate("/admin-panel/blog-list");
//       }
//     } catch (err) {
//       toast.error("Error saving blog");
//     }
//   };

//   if (previewMode) {
//     return <BlogPreview blog={blog} onBack={() => setPreviewMode(false)} />;
//   }

//   return (
//     <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border">
//         <h1 className="text-xl font-bold text-gray-800">
//           {editBlog ? "Edit Blog" : "Create Blog"}
//         </h1>
//         <div className="flex gap-3">
//           <button onClick={() => setPreviewMode(true)} className="px-4 py-2 border rounded-lg hover:bg-gray-50 font-medium">
//             Preview
//           </button>
//           <button onClick={saveBlog} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-medium shadow-sm transition-all">
//             {editBlog ? "Update Blog" : "Save Blog"}
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
//         {/* LEFT PANEL: METADATA */}
//         <div className="space-y-6">
//           <div className="bg-white p-5 rounded-xl border shadow-sm">
//             <h2 className="font-bold text-gray-700 mb-4 border-b pb-2">Basic Info</h2>
//             <div className="space-y-3">
//               <label className="block text-xs font-bold text-gray-500 uppercase">Title</label>
//               <input className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" value={blog.title} onChange={(e) => updateField("title", e.target.value)} />
              
//               <label className="block text-xs font-bold text-gray-500 uppercase">Slug</label>
//               <input className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" value={blog.slug} onChange={(e) => updateField("slug", e.target.value)} />
              
//               <label className="block text-xs font-bold text-gray-500 uppercase">Category</label>
//               <input className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" value={blog.category} onChange={(e) => updateField("category", e.target.value)} />
              
//               <label className="block text-xs font-bold text-gray-500 uppercase">Author</label>
//               <input className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" value={blog.author} onChange={(e) => updateField("author", e.target.value)} />
              
//               <label className="block text-xs font-bold text-gray-500 uppercase">Date</label>
//               <input type="date" className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" value={blog.date} onChange={(e) => updateField("date", e.target.value)} />
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-xl border shadow-sm">
//             <h2 className="font-bold text-gray-700 mb-4 border-b pb-2">SEO & Status</h2>
//             <div className="space-y-3">
//               <input placeholder="Meta Title" className="w-full border p-2.5 rounded-lg outline-none" value={blog.metaTitle} onChange={(e) => updateField("metaTitle", e.target.value)} />
//               <textarea placeholder="Meta Description" className="w-full border p-2.5 rounded-lg outline-none h-24 resize-none" value={blog.metaDescription} onChange={(e) => updateField("metaDescription", e.target.value)} />
              
//               <label className="block text-xs font-bold text-gray-500 uppercase">Featured Image</label>
//               <input type="file" accept="image/*" className="text-xs" onChange={handleFeatured} />
//               {blog.featuredImage && (
//                 <img src={blog.featuredImage?.url || blog.featuredImage} alt="Preview" className="w-full rounded-lg border mt-2 shadow-sm" />
//               )}
              
//               <select className="w-full border p-2.5 rounded-lg bg-gray-50 font-medium" value={blog.status} onChange={(e) => updateField("status", e.target.value)}>
//                 <option>Draft</option>
//                 <option>Published</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT PANEL: EDITOR */}
//         <div className="bg-white rounded-xl border shadow-sm p-6">
//           <div className="flex flex-wrap gap-2 mb-6 p-2 bg-gray-50 rounded-lg border border-dashed">
//             {["heading", "paragraph", "list", "image", "quote", "faq", "tip"].map((type) => (
//               <button key={type} onClick={() => addBlock(type)} className="px-3 py-1.5 bg-white border rounded-md text-sm font-medium hover:border-green-500 hover:text-green-600 transition-all capitalize shadow-sm">
//                 + {type}
//               </button>
//             ))}
//           </div>

//           <div className="space-y-4">
//             {blog.content.map((block, i) => (
//               <div key={i} onDragOver={(e) => e.preventDefault()} onDrop={() => handleDrop(i)} className="group border rounded-xl bg-white hover:border-green-200 transition-all shadow-sm">
//                 {/* BLOCK HEADER */}
//                 <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b rounded-t-xl">
//                   <div className="flex items-center gap-3">
//                     <span draggable onDragStart={() => handleDragStart(i)} className="cursor-grab text-gray-400 hover:text-gray-700">☰</span>
//                     <span className="text-[10px] font-black tracking-widest text-green-600 uppercase bg-green-50 px-2 py-0.5 rounded">
//                       {block.type}
//                     </span>
//                   </div>
                  
//                   <div className="flex items-center gap-4">
//                     {block.type !== "image" && (
//                       <div className="flex gap-1 border-r pr-4">
//                         <button onClick={() => format("bold")} className={`w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 ${activeFormat.bold ? "bg-gray-200" : ""}`}>B</button>
//                         <button onClick={() => format("italic")} className={`w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 ${activeFormat.italic ? "bg-gray-200" : ""}`}>I</button>
//                         <button onClick={() => format("underline")} className={`w-7 h-7 flex items-center justify-center rounded hover:bg-gray-200 ${activeFormat.underline ? "bg-gray-200" : ""}`}>U</button>
//                       </div>
//                     )}
//                     <button onClick={() => clearBlock(i)} className="text-xs font-bold text-orange-500 hover:text-orange-700">Clear</button>
//                     <button onClick={() => removeBlock(i)} className="text-xs font-bold text-red-500 hover:text-red-700">Remove</button>
//                   </div>
//                 </div>

//                 {/* BLOCK CONTENT */}
//                 <div className="p-4">
//                   {block.type !== "image" ? (
//                     <div
//                       ref={(el) => (editorRefs.current[i] = el)}
//                       contentEditable
//                       suppressContentEditableWarning
//                       onInput={(e) => updateBlock(i, e.currentTarget.innerHTML)}
//                       onFocus={checkFormat}
//                       onMouseUp={checkFormat}
//                       className={`outline-none min-h-[60px] prose max-w-none ${block.type === 'heading' ? 'text-2xl font-bold' : 'text-base'}`}
//                       placeholder={`Enter ${block.type} here...`}
//                     />
//                   ) : (
//                     <div className="space-y-3">
//                       <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, i)} className="text-sm" />
//                       {block.value && <img src={block.value} alt="Content" className="max-h-80 rounded-lg border" />}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {blog.content.length === 0 && (
//             <div className="py-20 text-center border-2 border-dashed rounded-2xl text-gray-400">
//               Your blog is empty. Click buttons above to add content sections.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useState, useRef, useEffect } from "react";
// import BlogPreview from "./BlogPreview";
// import { useLocation } from "react-router-dom";
// import SummaryApi from "../common/SummaryApi";
// import { FiMove, FiTrash2, FiRefreshCw, FiImage, FiType, FiList, FiMessageSquare, FiHelpCircle, FiStar } from "react-icons/fi";

// const BlogForm = () => {
//   const editorRefs = useRef([]);
//   const location = useLocation();

//   const editBlog = location.state?.blog || null;

//   const [previewMode, setPreviewMode] = useState(false);
//   const [dragIndex, setDragIndex] = useState(null);
//   const [activeFormat, setActiveFormat] = useState({
//     bold: false,
//     italic: false,
//     underline: false,
//   });

//   const [blog, setBlog] = useState({
//     title: "",
//     slug: "",
//     category: "",
//     author: "",
//     date: "",
//     metaTitle: "",
//     metaDescription: "",
//     featuredImage: "",
//     status: "Draft",
//     content: [],
//   });

//   // ---------------------- FETCH DATA ----------------------
//   useEffect(() => {
//     const fetchBlog = async () => {
//       if (!editBlog?.slug) return;
//       try {
//         const res = await fetch(SummaryApi.getOneBlog.url(editBlog.slug), {
//           method: SummaryApi.getOneBlog.method,
//         });
//         const data = await res.json();
//         if (data) {
//           setBlog({
//             ...data,
//             date: data.publishDate ? new Date(data.publishDate).toISOString().split("T")[0] : "",
//           });
//         }
//       } catch (err) {
//         console.error("Fetch Error:", err);
//       }
//     };
//     fetchBlog();
//   }, [editBlog?.slug]);

//   // Sync content to editors ONLY when blocks are added or initially loaded
//   // We avoid syncing during typing to prevent cursor jump
//   useEffect(() => {
//     blog.content.forEach((block, i) => {
//       if (editorRefs.current[i] && editorRefs.current[i].innerHTML !== block.value) {
//         // Only update if it's different and not currently focused
//         if (document.activeElement !== editorRefs.current[i]) {
//             editorRefs.current[i].innerHTML = block.value || "";
//         }
//       }
//     });
//   }, [blog.content]); // Only trigger when block count changes

//   // ---------------------- HELPERS ----------------------
//   const updateField = (key, value) => setBlog({ ...blog, [key]: value });

//   const getBlockIcon = (type) => {
//     switch (type) {
//       case "heading": return <FiType />;
//       case "list": return <FiList />;
//       case "image": return <FiImage />;
//       case "quote": return <FiMessageSquare />;
//       case "faq": return <FiHelpCircle />;
//       case "tip": return <FiStar />;
//       default: return <FiType />;
//     }
//   };

//   // ---------------------- CONTENT BLOCKS ----------------------
//   const addBlock = (type) => {
//     setBlog(prev => ({
//       ...prev,
//       content: [...prev.content, { type, value: "" }],
//     }));
//   };

//   const updateBlockValue = (index, htmlValue) => {
//     // We update the state silently so preview/save works
//     // but we don't trigger a re-render that overwrites the innerHTML
//     const updatedContent = [...blog.content];
//     updatedContent[index].value = htmlValue;
//     setBlog(prev => ({ ...prev, content: updatedContent }));
//   };

//   const clearBlock = (index) => {
//     if (editorRefs.current[index]) editorRefs.current[index].innerHTML = "";
//     updateBlockValue(index, "");
//   };

//   const removeBlock = (index) => {
//     const newContent = blog.content.filter((_, i) => i !== index);
//     setBlog({ ...blog, content: newContent });
//     // Cleanup refs
//     editorRefs.current.splice(index, 1);
//   };

//   const format = (command) => {
//     document.execCommand(command, false, null);
//     checkFormat();
//   };

//   const checkFormat = () => {
//     setActiveFormat({
//       bold: document.queryCommandState("bold"),
//       italic: document.queryCommandState("italic"),
//       underline: document.queryCommandState("underline"),
//     });
//   };

//   // ---------------------- DRAG & DROP ----------------------
//   const handleDragStart = (index) => setDragIndex(index);
//   const handleDrop = (index) => {
//     if (dragIndex === null) return;
//     const items = [...blog.content];
//     const dragged = items[dragIndex];
//     items.splice(dragIndex, 1);
//     items.splice(index, 0, dragged);
//     setBlog({ ...blog, content: items });
//     setDragIndex(null);
//   };

//   // ---------------------- UPLOADS ----------------------
//   const handleImageUpload = (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//         const updated = [...blog.content];
//         updated[index].value = reader.result; // preview string
//         updated[index].file = file; // actual file for upload
//         setBlog({ ...blog, content: updated });
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleFeatured = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () =>
//       setBlog((prev) => ({
//         ...prev,
//         featuredImage: reader.result,
//         featuredImageFile: file,
//       }));
//     reader.readAsDataURL(file);
//   };

//   // ---------------------- SAVE ----------------------
//   const saveBlog = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("title", blog.title);
//       formData.append("slug", blog.slug);
//       formData.append("category", blog.category);
//       formData.append("author", blog.author);
//       formData.append("publishDate", blog.date);
//       formData.append("metaTitle", blog.metaTitle);
//       formData.append("metaDescription", blog.metaDescription);
//       formData.append("status", blog.status);

//       // Make sure we have the latest values from the DOM refs
//       const finalContent = blog.content.map((block, i) => ({
//         type: block.type,
//         value: block.type === 'image' ? block.value : (editorRefs.current[i]?.innerHTML || block.value)
//       }));

//       formData.append("content", JSON.stringify(finalContent));

//       if (blog.featuredImageFile) {
//         formData.append("featuredImage", blog.featuredImageFile);
//       }

//       const url = editBlog ? SummaryApi.updateBlog.url(editBlog._id) : SummaryApi.createBlog.url;
//       const method = editBlog ? SummaryApi.updateBlog.method : SummaryApi.createBlog.method;

//       const res = await fetch(url, { method, body: formData });
//       const data = await res.json();

//       if (data.success || data._id) {
//         alert(editBlog ? "Blog updated successfully!" : "Blog created successfully!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error saving blog");
//     }
//   };

//   if (previewMode) {
//     return <BlogPreview blog={blog} onBack={() => setPreviewMode(false)} />;
//   }

//   return (
//     <div className="min-h-screen">
//       {/* HEADER SECTION */}
//       <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">
//             {editBlog ? "Edit Article" : "Create New Article"}
//           </h1>
//           <p className="text-sm text-gray-500">Draft your content and manage SEO settings</p>
//         </div>
//         <div className="flex gap-3">
//           <button 
//             onClick={() => setPreviewMode(true)} 
//             className="px-6 py-2 rounded-lg border border-gray-300 font-medium hover:bg-gray-50 transition-all"
//           >
//             Preview
//           </button>
//           <button
//             onClick={saveBlog}
//             className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 shadow-lg shadow-green-100 transition-all"
//           >
//             {editBlog ? "Update Publication" : "Publish Blog"}
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">
        
//         {/* LEFT SIDEBAR: METADATA */}
//         <div className="space-y-6">
//           <div className="bg-white p-5 rounded-2xl shadow-sm border">
//             <h2 className="font-bold text-gray-700 mb-4 pb-2 border-b">Basic Information</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="text-xs font-bold text-gray-400 uppercase">Title</label>
//                 <input
//                   className="input-field mt-1"
//                   value={blog.title}
//                   onChange={(e) => updateField("title", e.target.value)}
//                   placeholder="Enter blog title"
//                 />
//               </div>
//               <div>
//                 <label className="text-xs font-bold text-gray-400 uppercase">Slug (URL)</label>
//                 <input
//                   className="input-field mt-1"
//                   value={blog.slug}
//                   onChange={(e) => updateField("slug", e.target.value)}
//                   placeholder="e.g. how-to-start-coding"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="text-xs font-bold text-gray-400 uppercase">Category</label>
//                   <input
//                     className="input-field mt-1"
//                     value={blog.category}
//                     onChange={(e) => updateField("category", e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="text-xs font-bold text-gray-400 uppercase">Author</label>
//                   <input
//                     className="input-field mt-1"
//                     value={blog.author}
//                     onChange={(e) => updateField("author", e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="text-xs font-bold text-gray-400 uppercase">Publish Date</label>
//                 <input
//                   type="date"
//                   className="input-field mt-1"
//                   value={blog.date}
//                   onChange={(e) => updateField("date", e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-2xl shadow-sm border">
//             <h2 className="font-bold text-gray-700 mb-4 pb-2 border-b">SEO Settings</h2>
//             <div className="space-y-4">
//               <input
//                 placeholder="Meta Title"
//                 className="input-field"
//                 value={blog.metaTitle}
//                 onChange={(e) => updateField("metaTitle", e.target.value)}
//               />
//               <textarea
//                 placeholder="Meta Description"
//                 className="input-field h-24 resize-none"
//                 value={blog.metaDescription}
//                 onChange={(e) => updateField("metaDescription", e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-2xl shadow-sm border">
//             <h2 className="font-bold text-gray-700 mb-4 pb-2 border-b">Media & Status</h2>
//             <label className="text-xs font-bold text-gray-400 uppercase">Featured Image</label>
//             <div className="mt-2 border-2 border-dashed border-gray-200 rounded-xl p-2 text-center">
//                 <input type="file" accept="image/*" onChange={handleFeatured} className="hidden" id="featured-upload" />
//                 <label htmlFor="featured-upload" className="cursor-pointer text-blue-600 text-sm hover:underline">
//                     {blog.featuredImage ? "Change Image" : "Upload Image"}
//                 </label>
//                 {blog.featuredImage && (
//                     <img
//                         src={blog.featuredImage?.url || blog.featuredImage}
//                         alt="Featured"
//                         className="rounded-lg mt-2 w-full object-cover max-h-40"
//                     />
//                 )}
//             </div>
            
//             <div className="mt-6">
//                 <label className="text-xs font-bold text-gray-400 uppercase">Visibility</label>
//                 <select
//                     className="input-field mt-1 font-medium text-gray-700"
//                     value={blog.status}
//                     onChange={(e) => updateField("status", e.target.value)}
//                 >
//                     <option>Draft</option>
//                     <option>Published</option>
//                 </select>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT PANEL: CONTENT EDITOR */}
//         <div className="space-y-6">
//           {/* STICKY TOOLBAR - Updated with top-0 and horizontal scroll */}
//           <div className="bg-white rounded-xl shadow-sm border p-3 sticky top-0 z-[30] -mx-1 md:mx-0">
//             <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide scroll-smooth">
              
//               <button 
//                 onClick={() => addBlock("heading")} 
//                 className="shrink-0 px-4 py-2 bg-gray-800 text-white rounded-lg flex items-center gap-2 hover:bg-black transition-all text-sm font-medium"
//               >
//                 <FiType /> Heading
//               </button>

//               <button 
//                 onClick={() => addBlock("paragraph")} 
//                 className="shrink-0 px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all text-sm font-medium"
//               >
//                 <FiType /> Paragraph
//               </button>

//               <button 
//                 onClick={() => addBlock("list")} 
//                 className="shrink-0 px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all text-sm font-medium"
//               >
//                 <FiList /> List
//               </button>

//               <button 
//                 onClick={() => addBlock("image")} 
//                 className="shrink-0 px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all text-sm font-medium"
//               >
//                 <FiImage /> Image
//               </button>

//               <button 
//                 onClick={() => addBlock("quote")} 
//                 className="shrink-0 px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all text-sm font-medium"
//               >
//                 <FiMessageSquare /> Quote
//               </button>

//               <button 
//                 onClick={() => addBlock("faq")} 
//                 className="shrink-0 px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all text-sm font-medium"
//               >
//                 <FiHelpCircle /> FAQ
//               </button>

//               <button 
//                 onClick={() => addBlock("tip")} 
//                 className="shrink-0 px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all text-sm font-medium"
//               >
//                 <FiStar /> Pro Tip
//               </button>

//             </div>
//           </div>

//           <div className="space-y-4">
//             {blog.content.length === 0 && (
//                 <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
//                     <p className="text-gray-400">No content blocks added yet. Use the toolbar above to start writing.</p>
//                 </div>
//             )}

//             {blog.content.map((block, i) => (
//               <div
//                 key={i}
//                 onDragOver={(e) => e.preventDefault()}
//                 onDrop={() => handleDrop(i)}
//                 className="group relative bg-white border rounded-2xl p-5 hover:shadow-md transition-shadow"
//               >
//                 {/* BLOCK HEADER */}
//                 <div className="flex items-center justify-between mb-4 border-b pb-3">
//                   <div className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-wider">
//                     <span className="text-blue-500">{getBlockIcon(block.type)}</span>
//                     {block.type} Block
//                   </div>
                  
//                   <div className="flex items-center gap-3">
//                     <div className="flex items-center bg-gray-50 rounded-lg p-1 mr-4">
//                         <button
//                             onClick={() => format("bold")}
//                             className={`px-3 py-1 rounded font-bold hover:bg-white hover:shadow-sm transition-all ${activeFormat.bold ? "text-blue-600 bg-white shadow-sm" : "text-gray-400"}`}
//                         >B</button>
//                         <button
//                             onClick={() => format("italic")}
//                             className={`px-3 py-1 rounded italic hover:bg-white hover:shadow-sm transition-all ${activeFormat.italic ? "text-blue-600 bg-white shadow-sm" : "text-gray-400"}`}
//                         >I</button>
//                         <button
//                             onClick={() => format("underline")}
//                             className={`px-3 py-1 rounded underline hover:bg-white hover:shadow-sm transition-all ${activeFormat.underline ? "text-blue-600 bg-white shadow-sm" : "text-gray-400"}`}
//                         >U</button>
//                     </div>

//                     <div className="flex items-center gap-2 border-l pl-3">
//                         <button onClick={() => clearBlock(i)} title="Clear Content" className="p-2 text-orange-400 hover:text-orange-600">
//                             <FiRefreshCw />
//                         </button>
//                         <button onClick={() => removeBlock(i)} title="Remove Block" className="p-2 text-red-400 hover:text-red-600">
//                             <FiTrash2 />
//                         </button>
//                         <div
//                             draggable
//                             onDragStart={() => handleDragStart(i)}
//                             className="p-2 cursor-grab text-gray-300 hover:text-gray-600"
//                         >
//                             <FiMove />
//                         </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* EDITOR CONTENT */}
//                 {block.type !== "image" ? (
//                   <div
//                     ref={(el) => (editorRefs.current[i] = el)}
//                     contentEditable
//                     suppressContentEditableWarning
//                     data-placeholder={`Type your ${block.type} content here...`}
//                     onInput={(e) => updateBlockValue(i, e.currentTarget.innerHTML)}
//                     className={`editor outline-none text-gray-700 min-h-[60px] leading-relaxed 
//                         ${block.type === 'heading' ? 'text-2xl font-bold' : ''}
//                         ${block.type === 'quote' ? 'border-l-4 border-blue-500 pl-4 italic text-lg text-gray-500' : ''}
//                         ${block.type === 'tip' ? 'bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-400' : ''}
//                         ${block.type === 'faq' ? 'font-semibold' : ''}
//                     `}
//                   />
//                 ) : (
//                   <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200">
//                     <input
//                       type="file"
//                       id={`file-${i}`}
//                       accept="image/*"
//                       className="hidden"
//                       onChange={(e) => handleImageUpload(e, i)}
//                     />
//                     <label htmlFor={`file-${i}`} className="flex flex-col items-center cursor-pointer">
//                         <FiImage size={32} className="text-gray-300 mb-2" />
//                         <span className="text-sm text-gray-500">Click to upload image</span>
//                     </label>
//                     {block.value && (
//                       <div className="mt-4 relative group/img">
//                         <img
//                           src={block.value}
//                           alt="Block Content"
//                           className="rounded-xl w-full max-h-[400px] object-contain bg-white border shadow-sm"
//                         />
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BlogForm;


// import React, { useState, useRef, useEffect } from "react";
// import BlogPreview from "./BlogPreview";
// import { useLocation, useNavigate } from "react-router-dom";
// import SummaryApi from "../common/SummaryApi";
// import { 
//   FiMove, FiTrash2, FiRefreshCw, FiImage, 
//   FiType, FiList, FiMessageSquare, FiHelpCircle, FiStar 
// } from "react-icons/fi";

// // --- DND KIT IMPORTS ---
// import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
// import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { v4 as uuidv4 } from "uuid";

// // ----------------------------------------------------------------------
// // SORTABLE WRAPPER COMPONENT
// // ----------------------------------------------------------------------
// const SortableBlockWrapper = ({ id, children }) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging
//   } = useSortable({ id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     zIndex: isDragging ? 50 : "auto",
//     opacity: isDragging ? 0.6 : 1,
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes}>
//       {children({ listeners })}
//     </div>
//   );
// };

// const BlogForm = () => {
//   const editorRefs = useRef({}); // Changed to object to map by ID
//   const location = useLocation();
//   const navigate = useNavigate();

//   const editBlog = location.state?.blog || null;

//   const [previewMode, setPreviewMode] = useState(false);
//   const [activeFormat, setActiveFormat] = useState({
//     bold: false,
//     italic: false,
//     underline: false,
//   });

//   const [blog, setBlog] = useState({
//     title: "",
//     slug: "",
//     category: "",
//     author: "",
//     date: "",
//     metaTitle: "",
//     metaDescription: "",
//     featuredImage: "",
//     status: "Draft",
//     content: [], // Format: { id, type, value, file? }
//   });

//   // ---------------------- DND SENSORS ----------------------
//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
//     useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
//   );

//   // ---------------------- FETCH DATA ----------------------
//   useEffect(() => {
//     const fetchBlog = async () => {
//       if (!editBlog?.slug) return;
//       try {
//         const res = await fetch(SummaryApi.getOneBlog.url(editBlog.slug), {
//           method: SummaryApi.getOneBlog.method,
//         });
//         const data = await res.json();
//         if (data) {
//           // Ensure every block from DB gets a unique ID for DND-kit
//           const contentWithIds = (data.content || []).map(block => ({
//             ...block,
//             id: block.id || uuidv4()
//           }));

//           setBlog({
//             ...data,
//             content: contentWithIds,
//             date: data.publishDate ? new Date(data.publishDate).toISOString().split("T")[0] : "",
//           });
//         }
//       } catch (err) {
//         console.error("Fetch Error:", err);
//       }
//     };
//     fetchBlog();
//   }, [editBlog?.slug]);

//   // Sync content to editors
//   useEffect(() => {
//     blog.content.forEach((block) => {
//       const el = editorRefs.current[block.id];
//       if (el && el.innerHTML !== block.value) {
//         if (document.activeElement !== el) {
//           el.innerHTML = block.value || "";
//         }
//       }
//     });
//   }, [blog.content]);

//   // ---------------------- HELPERS ----------------------
//   const updateField = (key, value) => setBlog({ ...blog, [key]: value });

//   const getBlockIcon = (type) => {
//     switch (type) {
//       case "heading": return <FiType />;
//       case "list": return <FiList />;
//       case "image": return <FiImage />;
//       case "quote": return <FiMessageSquare />;
//       case "faq": return <FiHelpCircle />;
//       case "tip": return <FiStar />;
//       default: return <FiType />;
//     }
//   };

//   // ---------------------- CONTENT BLOCKS ----------------------
//   const addBlock = (type) => {
//     setBlog(prev => ({
//       ...prev,
//       content: [...prev.content, { id: uuidv4(), type, value: "" }],
//     }));
//   };

//   const updateBlockValue = (id, htmlValue) => {
//     setBlog(prev => ({
//       ...prev,
//       content: prev.content.map(b => b.id === id ? { ...b, value: htmlValue } : b)
//     }));
//   };

//   const clearBlock = (id) => {
//     if (editorRefs.current[id]) editorRefs.current[id].innerHTML = "";
//     updateBlockValue(id, "");
//   };

//   const removeBlock = (id) => {
//     setBlog(prev => ({
//       ...prev,
//       content: prev.content.filter(b => b.id !== id)
//     }));
//     delete editorRefs.current[id];
//   };

//   // ---------------------- DRAG & DROP HANDLER ----------------------
//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (!over || active.id === over.id) return;

//     setBlog((prev) => {
//       const oldIndex = prev.content.findIndex((b) => b.id === active.id);
//       const newIndex = prev.content.findIndex((b) => b.id === over.id);
//       return {
//         ...prev,
//         content: arrayMove(prev.content, oldIndex, newIndex),
//       };
//     });
//   };

//   // ---------------------- RICH TEXT ----------------------
//   const format = (command) => {
//     document.execCommand(command, false, null);
//     checkFormat();
//   };

//   const checkFormat = () => {
//     setActiveFormat({
//       bold: document.queryCommandState("bold"),
//       italic: document.queryCommandState("italic"),
//       underline: document.queryCommandState("underline"),
//     });
//   };

//   // ---------------------- UPLOADS ----------------------
//   const handleImageUpload = (e, id) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setBlog(prev => ({
//         ...prev,
//         content: prev.content.map(b => b.id === id ? { ...b, value: reader.result, file: file } : b)
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleFeatured = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () =>
//       setBlog((prev) => ({
//         ...prev,
//         featuredImage: reader.result,
//         featuredImageFile: file,
//       }));
//     reader.readAsDataURL(file);
//   };

//   // ---------------------- SAVE ----------------------
//   const saveBlog = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("title", blog.title);
//       formData.append("slug", blog.slug);
//       formData.append("category", blog.category);
//       formData.append("author", blog.author);
//       formData.append("publishDate", blog.date);
//       formData.append("metaTitle", blog.metaTitle);
//       formData.append("metaDescription", blog.metaDescription);
//       formData.append("status", blog.status);

//       const finalContent = blog.content.map((block) => ({
//         type: block.type,
//         value: block.type === 'image' ? block.value : (editorRefs.current[block.id]?.innerHTML || block.value)
//       }));

//       formData.append("content", JSON.stringify(finalContent));

//       if (blog.featuredImageFile) {
//         formData.append("featuredImage", blog.featuredImageFile);
//       }

//       const url = editBlog ? SummaryApi.updateBlog.url(editBlog._id) : SummaryApi.createBlog.url;
//       const method = editBlog ? SummaryApi.updateBlog.method : SummaryApi.createBlog.method;

//       const res = await fetch(url, { method, body: formData });
//       const data = await res.json();

//       if (data.success || data._id) {
//         alert(editBlog ? "Blog updated successfully!" : "Blog created successfully!");
//         navigate('/admin-panel/blog-list');
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error saving blog");
//     }
//   };

//   if (previewMode) {
//     return <BlogPreview blog={blog} onBack={() => setPreviewMode(false)} />;
//   }

//   return (
//     <div className="min-h-screen pb-20">
//       {/* HEADER SECTION */}
//       <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">
//             {editBlog ? "Edit Article" : "Create New Article"}
//           </h1>
//           <p className="text-sm text-gray-500">Draft your content and manage SEO settings</p>
//         </div>
//         <div className="flex gap-3">
//           <button 
//             onClick={() => setPreviewMode(true)} 
//             className="px-6 py-2 rounded-lg border border-gray-300 font-medium hover:bg-gray-50 transition-all"
//           >
//             Preview
//           </button>
//           <button
//             onClick={saveBlog}
//             className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 shadow-lg shadow-green-100 transition-all"
//           >
//             {editBlog ? "Update Publication" : "Publish Blog"}
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">
        
//         {/* LEFT SIDEBAR: METADATA */}
//         <div className="space-y-6">
//           <div className="bg-white p-5 rounded-2xl shadow-sm border">
//             <h2 className="font-bold text-gray-700 mb-4 pb-2 border-b">Basic Information</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="text-xs font-bold text-gray-400 uppercase">Title</label>
//                 <input
//                   className="input-field mt-1"
//                   value={blog.title}
//                   onChange={(e) => updateField("title", e.target.value)}
//                   placeholder="Enter blog title"
//                 />
//               </div>
//               <div>
//                 <label className="text-xs font-bold text-gray-400 uppercase">Slug (URL)</label>
//                 <input
//                   className="input-field mt-1"
//                   value={blog.slug}
//                   onChange={(e) => updateField("slug", e.target.value)}
//                   placeholder="e.g. how-to-start-coding"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="text-xs font-bold text-gray-400 uppercase">Category</label>
//                   <input
//                     className="input-field mt-1"
//                     value={blog.category}
//                     onChange={(e) => updateField("category", e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="text-xs font-bold text-gray-400 uppercase">Author</label>
//                   <input
//                     className="input-field mt-1"
//                     value={blog.author}
//                     onChange={(e) => updateField("author", e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="text-xs font-bold text-gray-400 uppercase">Publish Date</label>
//                 <input
//                   type="date"
//                   className="input-field mt-1"
//                   value={blog.date}
//                   onChange={(e) => updateField("date", e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-2xl shadow-sm border">
//             <h2 className="font-bold text-gray-700 mb-4 pb-2 border-b">SEO Settings</h2>
//             <div className="space-y-4">
//               <input
//                 placeholder="Meta Title"
//                 className="input-field"
//                 value={blog.metaTitle}
//                 onChange={(e) => updateField("metaTitle", e.target.value)}
//               />
//               <textarea
//                 placeholder="Meta Description"
//                 className="input-field h-24 resize-none"
//                 value={blog.metaDescription}
//                 onChange={(e) => updateField("metaDescription", e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-2xl shadow-sm border">
//             <h2 className="font-bold text-gray-700 mb-4 pb-2 border-b">Media & Status</h2>
//             <label className="text-xs font-bold text-gray-400 uppercase">Featured Image</label>
//             <div className="mt-2 border-2 border-dashed border-gray-200 rounded-xl p-2 text-center">
//                 <input type="file" accept="image/*" onChange={handleFeatured} className="hidden" id="featured-upload" />
//                 <label htmlFor="featured-upload" className="cursor-pointer text-blue-600 text-sm hover:underline">
//                     {blog.featuredImage ? "Change Image" : "Upload Image"}
//                 </label>
//                 {blog.featuredImage && (
//                     <img
//                         src={blog.featuredImage}
//                         alt="Featured"
//                         className="rounded-lg mt-2 w-full object-cover max-h-40"
//                     />
//                 )}
//             </div>
            
//             <div className="mt-6">
//                 <label className="text-xs font-bold text-gray-400 uppercase">Visibility</label>
//                 <select
//                     className="input-field mt-1 font-medium text-gray-700"
//                     value={blog.status}
//                     onChange={(e) => updateField("status", e.target.value)}
//                 >
//                     <option>Draft</option>
//                     <option>Published</option>
//                 </select>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT PANEL: CONTENT EDITOR */}
//         <div className="space-y-6">
//           <div className="bg-white rounded-xl shadow-sm border p-3 sticky top-0 z-[30]">
//             <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
//               <button onClick={() => addBlock("heading")} className="shrink-0 px-4 py-2 bg-gray-800 text-white rounded-lg flex items-center gap-2 text-sm font-medium"><FiType /> Heading</button>
//               <button onClick={() => addBlock("paragraph")} className="shrink-0 px-4 py-2 bg-white border rounded-lg flex items-center gap-2 text-sm font-medium"><FiType /> Paragraph</button>
//               <button onClick={() => addBlock("list")} className="shrink-0 px-4 py-2 bg-white border rounded-lg flex items-center gap-2 text-sm font-medium"><FiList /> List</button>
//               <button onClick={() => addBlock("image")} className="shrink-0 px-4 py-2 bg-white border rounded-lg flex items-center gap-2 text-sm font-medium"><FiImage /> Image</button>
//               <button onClick={() => addBlock("quote")} className="shrink-0 px-4 py-2 bg-white border rounded-lg flex items-center gap-2 text-sm font-medium"><FiMessageSquare /> Quote</button>
//               <button onClick={() => addBlock("faq")} className="shrink-0 px-4 py-2 bg-white border rounded-lg flex items-center gap-2 text-sm font-medium"><FiHelpCircle /> FAQ</button>
//               <button onClick={() => addBlock("tip")} className="shrink-0 px-4 py-2 bg-white border rounded-lg flex items-center gap-2 text-sm font-medium"><FiStar /> Pro Tip</button>
//             </div>
//           </div>

//           <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//             <SortableContext items={blog.content.map(b => b.id)} strategy={verticalListSortingStrategy}>
//               <div className="space-y-4">
//                 {blog.content.length === 0 && (
//                   <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
//                     <p className="text-gray-400">No content blocks added yet.</p>
//                   </div>
//                 )}

//                 {blog.content.map((block) => (
//                   <SortableBlockWrapper key={block.id} id={block.id}>
//                     {({ listeners }) => (
//                       <div className="group relative bg-white border rounded-2xl p-5 hover:shadow-md transition-shadow">
//                         {/* BLOCK HEADER */}
//                         <div className="flex items-center justify-between mb-4 border-b pb-3">
//                           <div className="flex items-center gap-2 text-gray-400 font-bold text-xs">
//                             <span className="text-blue-500">{getBlockIcon(block.type)}</span>
//                             {block.type}
//                           </div>
                          
//                           <div className="flex items-center gap-3">
//                             <div className="flex items-center bg-gray-50 rounded-lg p-1 mr-4">
//                                 <button onClick={() => format("bold")} className={`px-3 py-1 rounded font-bold ${activeFormat.bold ? "text-blue-600 bg-white" : "text-gray-400"}`}>B</button>
//                                 <button onClick={() => format("italic")} className={`px-3 py-1 rounded italic ${activeFormat.italic ? "text-blue-600 bg-white" : "text-gray-400"}`}>I</button>
//                                 <button onClick={() => format("underline")} className={`px-3 py-1 rounded underline ${activeFormat.underline ? "text-blue-600 bg-white" : "text-gray-400"}`}>U</button>
//                             </div>

//                             <div className="flex items-center gap-2 border-l pl-3">
//                                 <button onClick={() => clearBlock(block.id)} className="p-2 text-orange-400 hover:text-orange-600"><FiRefreshCw /></button>
//                                 <button onClick={() => removeBlock(block.id)} className="p-2 text-red-400 hover:text-red-600"><FiTrash2 /></button>
//                                 <div {...listeners} className="p-2 cursor-grab text-gray-300 hover:text-gray-600"><FiMove /></div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* EDITOR CONTENT */}
//                         {block.type !== "image" ? (
//                           <div
//                             ref={(el) => (editorRefs.current[block.id] = el)}
//                             contentEditable
//                             suppressContentEditableWarning
//                             onInput={(e) => updateBlockValue(block.id, e.currentTarget.innerHTML)}
//                             onKeyUp={checkFormat}
//                             onMouseUp={checkFormat}
//                             className={`editor outline-none text-gray-700 min-h-[60px] leading-relaxed 
//                                 ${block.type === 'heading' ? 'text-2xl font-bold' : ''}
//                                 ${block.type === 'quote' ? 'border-l-4 border-blue-500 pl-4 italic text-lg text-gray-500' : ''}
//                                 ${block.type === 'tip' ? 'bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-400' : ''}
//                             `}
//                           />
//                         ) : (
//                           <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200">
//                             <input
//                               type="file"
//                               id={`file-${block.id}`}
//                               accept="image/*"
//                               className="hidden"
//                               onChange={(e) => handleImageUpload(e, block.id)}
//                             />
//                             <label htmlFor={`file-${block.id}`} className="flex flex-col items-center cursor-pointer">
//                                 <FiImage size={32} className="text-gray-300 mb-2" />
//                                 <span className="text-sm text-gray-500">Click to upload image</span>
//                             </label>
//                             {block.value && (
//                               <div className="mt-4">
//                                 <img src={block.value} alt="Content" className="rounded-xl w-full max-h-[400px] object-contain bg-white border" />
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </SortableBlockWrapper>
//                 ))}
//               </div>
//             </SortableContext>
//           </DndContext>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BlogForm;


// import React, { useState, useRef, useEffect } from "react";
// import BlogPreview from "./BlogPreview";
// import { useLocation, useNavigate } from "react-router-dom";
// import SummaryApi from "../common/SummaryApi";
// import { 
//   FiMove, FiTrash2, FiRefreshCw, FiImage, 
//   FiType, FiList, FiMessageSquare, FiHelpCircle, FiStar 
// } from "react-icons/fi";

// // --- DND KIT IMPORTS ---
// import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
// import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { v4 as uuidv4 } from "uuid";
// import toast from "react-hot-toast";

// // ----------------------------------------------------------------------
// // SORTABLE WRAPPER COMPONENT
// // ----------------------------------------------------------------------
// const SortableBlockWrapper = ({ id, children }) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging
//   } = useSortable({ id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     zIndex: isDragging ? 50 : "auto",
//     opacity: isDragging ? 0.6 : 1,
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes}>
//       {children({ listeners })}
//     </div>
//   );
// };

// const BlogForm = () => {
//   const editorRefs = useRef({}); 
//   const location = useLocation();
//   const navigate = useNavigate();

//   const editBlog = location.state?.blog || null;

//   const [previewMode, setPreviewMode] = useState(false);
//   const [focusedBlockId, setFocusedBlockId] = useState(null); // Track which block is active
//   const [activeFormat, setActiveFormat] = useState({
//     bold: false,
//     italic: false,
//     underline: false,
//   });

//   const [blog, setBlog] = useState({
//     title: "",
//     slug: "",
//     category: "",
//     author: "",
//     date: "",
//     metaTitle: "",
//     metaDescription: "",
//     featuredImage: "",
//     status: "Draft",
//     content: [], 
//   });

//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
//     useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
//   );

//   // ---------------------- FETCH DATA ----------------------
//   useEffect(() => {
//     const fetchBlog = async () => {
//       if (!editBlog?.slug) return;
//       try {
//         const res = await fetch(SummaryApi.getOneBlog.url(editBlog.slug), {
//           method: SummaryApi.getOneBlog.method,
//         });
//         const data = await res.json();
//         if (data) {
//           const contentWithIds = (data.content || []).map(block => ({
//             ...block,
//             id: block.id || uuidv4()
//           }));

//           setBlog({
//             ...data,
//             content: contentWithIds,
//             date: data.publishDate ? new Date(data.publishDate).toISOString().split("T")[0] : "",
//           });
//         }
//       } catch (err) {
//         console.error("Fetch Error:", err);
//       }
//     };
//     fetchBlog();
//   }, [editBlog?.slug]);

//   // ---------------------- PERSISTENCE FIX ----------------------
//   // Re-hydrate contentEditable divs whenever previewMode is turned off
//   // and whenever content is initially loaded.
//   useEffect(() => {
//     if (!previewMode) {
//       // Small timeout ensures the refs are attached to the new DOM elements after remount
//       const timer = setTimeout(() => {
//         blog.content.forEach((block) => {
//           const el = editorRefs.current[block.id];
//           if (el && el.innerHTML !== block.value) {
//             el.innerHTML = block.value || "";
//           }
//         });
//       }, 50);
//       return () => clearTimeout(timer);
//     }
//   }, [previewMode, blog.content]);

//   // ---------------------- HELPERS ----------------------
//   const updateField = (key, value) => setBlog({ ...blog, [key]: value });

//   const getBlockIcon = (type) => {
//     switch (type) {
//       case "heading": return <FiType />;
//       case "paragraph": return <FiType />;
//       case "list": return <FiList />;
//       case "image": return <FiImage />;
//       case "quote": return <FiMessageSquare />;
//       case "faq": return <FiHelpCircle />;
//       case "tip": return <FiStar />;
//       default: return <FiType />;
//     }
//   };

//   const addBlock = (type) => {
//     const newId = uuidv4();
//     setBlog(prev => ({
//       ...prev,
//       content: [...prev.content, { id: newId, type, value: "" }],
//     }));
//   };

//   const updateBlockValue = (id, htmlValue) => {
//     // Note: We update state but don't force hydration in this direction 
//     // to avoid cursor resets while typing.
//     setBlog(prev => ({
//       ...prev,
//       content: prev.content.map(b => b.id === id ? { ...b, value: htmlValue } : b)
//     }));
//   };

//   const clearBlock = (id) => {
//     if (editorRefs.current[id]) editorRefs.current[id].innerHTML = "";
//     updateBlockValue(id, "");
//   };

//   const removeBlock = (id) => {
//     setBlog(prev => ({
//       ...prev,
//       content: prev.content.filter(b => b.id !== id)
//     }));
//     delete editorRefs.current[id];
//   };

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (!over || active.id === over.id) return;

//     setBlog((prev) => {
//       const oldIndex = prev.content.findIndex((b) => b.id === active.id);
//       const newIndex = prev.content.findIndex((b) => b.id === over.id);
//       return {
//         ...prev,
//         content: arrayMove(prev.content, oldIndex, newIndex),
//       };
//     });
//   };

//   // ---------------------- FORMATTING LOGIC ----------------------
//   const format = (command, id) => {
//     if (focusedBlockId !== id) return; // Only allow formatting on focused block
//     document.execCommand(command, false, null);
//     checkFormat();
//   };

//   const checkFormat = (id) => {
//     setFocusedBlockId(id);
//     setActiveFormat({
//       bold: document.queryCommandState("bold"),
//       italic: document.queryCommandState("italic"),
//       underline: document.queryCommandState("underline"),
//     });
//   };

//   // ---------------------- UPLOADS ----------------------
//   const handleImageUpload = (e, id) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setBlog(prev => ({
//         ...prev,
//         content: prev.content.map(b => b.id === id ? { ...b, value: reader.result, file: file } : b)
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleFeatured = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () =>
//       setBlog((prev) => ({
//         ...prev,
//         featuredImage: reader.result,
//         featuredImageFile: file,
//       }));
//     reader.readAsDataURL(file);
//   };

//   const saveBlog = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("title", blog.title);
//       formData.append("slug", blog.slug);
//       formData.append("category", blog.category);
//       formData.append("author", blog.author);
//       formData.append("publishDate", blog.date);
//       formData.append("metaTitle", blog.metaTitle);
//       formData.append("metaDescription", blog.metaDescription);
//       formData.append("status", blog.status);

//       const finalContent = blog.content.map((block) => ({
//         type: block.type,
//         value: block.type === 'image' ? block.value : (editorRefs.current[block.id]?.innerHTML || block.value)
//       }));

//       formData.append("content", JSON.stringify(finalContent));

//       if (blog.featuredImageFile) {
//         formData.append("featuredImage", blog.featuredImageFile);
//       }

//       const url = editBlog ? SummaryApi.updateBlog.url(editBlog._id) : SummaryApi.createBlog.url;
//       const method = editBlog ? SummaryApi.updateBlog.method : SummaryApi.createBlog.method;

//       const res = await fetch(url, { method, body: formData });
//       const data = await res.json();

//       if (data.success || data._id) {
//         toast.success(editBlog ? "Blog updated successfully!" : "Blog created successfully!");
//         navigate('/admin-panel/blog-list');
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error saving blog");
//     }
//   };

//   if (previewMode) {
//     return <BlogPreview blog={blog} onBack={() => setPreviewMode(false)} />;
//   }

//   return (
//     <div className="min-h-screen pb-20">
//       {/* HEADER SECTION */}
//       <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">
//             {editBlog ? "Edit Article" : "Create New Article"}
//           </h1>
//           <p className="text-sm text-gray-500">Draft your content and manage SEO settings</p>
//         </div>
//         <div className="flex gap-3">
//           <button 
//             onClick={() => setPreviewMode(true)} 
//             className="px-6 py-2 rounded-lg border border-gray-300 font-semibold text-gray-600 hover:bg-gray-50 transition-all"
//           >
//             Preview
//           </button>
//           <button
//             onClick={saveBlog}
//             className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 shadow-lg shadow-green-100 transition-all"
//           >
//             {editBlog ? "Update Publication" : "Publish Blog"}
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">
        
//         {/* LEFT SIDEBAR: METADATA */}
//         <div className="space-y-6">
//           <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
//             <h2 className="font-bold text-gray-700 mb-4 pb-2 border-b">Basic Information</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Title</label>
//                 <input
//                   className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-400 transition-all"
//                   value={blog.title}
//                   onChange={(e) => updateField("title", e.target.value)}
//                   placeholder="Enter blog title"
//                 />
//               </div>
//               <div>
//                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Slug (URL)</label>
//                 <input
//                   className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-400 transition-all"
//                   value={blog.slug}
//                   onChange={(e) => updateField("slug", e.target.value)}
//                   placeholder="e.g. how-to-start-coding"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
//                   <input
//                     className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-400 transition-all"
//                     value={blog.category}
//                     onChange={(e) => updateField("category", e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Author</label>
//                   <input
//                     className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-400 transition-all"
//                     value={blog.author}
//                     onChange={(e) => updateField("author", e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Publish Date</label>
//                 <input
//                   type="date"
//                   className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-400 transition-all text-gray-600"
//                   value={blog.date}
//                   onChange={(e) => updateField("date", e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
//             <h2 className="font-bold text-gray-700 mb-4 pb-2 border-b">SEO Settings</h2>
//             <div className="space-y-4">
//               <input
//                 placeholder="Meta Title"
//                 className="w-full p-2 border rounded-lg outline-none focus:border-blue-400 transition-all"
//                 value={blog.metaTitle}
//                 onChange={(e) => updateField("metaTitle", e.target.value)}
//               />
//               <textarea
//                 placeholder="Meta Description"
//                 className="w-full p-2 border rounded-lg outline-none focus:border-blue-400 transition-all h-24 resize-none"
//                 value={blog.metaDescription}
//                 onChange={(e) => updateField("metaDescription", e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
//             <h2 className="font-bold text-gray-700 mb-4 pb-2 border-b">Media & Status</h2>
//             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Featured Image</label>
//             <div className="mt-2 border-2 border-dashed border-gray-100 rounded-xl p-4 text-center hover:border-blue-200 transition-all">
//                 <input type="file" accept="image/*" onChange={handleFeatured} className="hidden" id="featured-upload" />
//                 <label htmlFor="featured-upload" className="cursor-pointer text-blue-600 text-sm font-semibold hover:text-blue-700">
//                     {blog.featuredImage ? "Change Image" : "Upload Featured Image"}
//                 </label>
//                 {blog.featuredImage && (
//                     <img
//                         src={blog.featuredImage}
//                         alt="Featured"
//                         className="rounded-lg mt-4 w-full object-cover max-h-40 shadow-sm"
//                     />
//                 )}
//             </div>
            
//             <div className="mt-6">
//                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Visibility</label>
//                 <select
//                     className="w-full mt-1 p-2 border rounded-lg outline-none font-medium text-gray-700"
//                     value={blog.status}
//                     onChange={(e) => updateField("status", e.target.value)}
//                 >
//                     <option>Draft</option>
//                     <option>Published</option>
//                 </select>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT PANEL: CONTENT EDITOR */}
//         <div className="space-y-6">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sticky top-0 z-[30]">
//             <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide p-1">
//               <button onClick={() => addBlock("heading")} className="shrink-0 px-4 py-2 bg-gray-800 text-white rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-black transition-all"><FiType /> Heading</button>
//               <button onClick={() => addBlock("paragraph")} className="shrink-0 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all"><FiType /> Paragraph</button>
//               <button onClick={() => addBlock("list")} className="shrink-0 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all"><FiList /> List</button>
//               <button onClick={() => addBlock("image")} className="shrink-0 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all"><FiImage /> Image</button>
//               <button onClick={() => addBlock("quote")} className="shrink-0 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all"><FiMessageSquare /> Quote</button>
//               <button onClick={() => addBlock("faq")} className="shrink-0 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all"><FiHelpCircle /> FAQ</button>
//               <button onClick={() => addBlock("tip")} className="shrink-0 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all"><FiStar /> Pro Tip</button>
//             </div>
//           </div>

//           <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//             <SortableContext items={blog.content.map(b => b.id)} strategy={verticalListSortingStrategy}>
//               <div className="space-y-6">
//                 {blog.content.length === 0 && (
//                   <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100 shadow-inner">
//                     <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <FiType className="text-gray-300 text-2xl" />
//                     </div>
//                     <p className="text-gray-400 font-medium">Start your story. Select a block from the toolbar above.</p>
//                   </div>
//                 )}

//                 {blog.content.map((block) => (
//                   <SortableBlockWrapper key={block.id} id={block.id}>
//                     {({ listeners }) => (
//                       <div className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
//                         {/* BLOCK HEADER */}
//                         <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-3">
//                           <div className="flex items-center gap-2 text-gray-400 text-sm">
//                             <span className="bg-blue-50 p-1.5 rounded-lg text-blue-600">{getBlockIcon(block.type)}</span>
//                             {block.type}
//                           </div>
                          
//                           <div className="flex items-center gap-3">
//                             {/* BLOCK SPECIFIC FORMATTING UI FIX */}
//                             <div className="flex items-center bg-gray-50 rounded-xl p-1">
//                                 <button 
//                                     onMouseDown={(e) => { e.preventDefault(); format("bold", block.id); }} 
//                                     className={`w-9 h-8 rounded-lg font-bold transition-all ${activeFormat.bold && focusedBlockId === block.id ? "bg-white text-blue-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
//                                 >B</button>
//                                 <button 
//                                     onMouseDown={(e) => { e.preventDefault(); format("italic", block.id); }} 
//                                     className={`w-9 h-8 rounded-lg italic transition-all ${activeFormat.italic && focusedBlockId === block.id ? "bg-white text-blue-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
//                                 >I</button>
//                                 <button 
//                                     onMouseDown={(e) => { e.preventDefault(); format("underline", block.id); }} 
//                                     className={`w-9 h-8 rounded-lg underline transition-all ${activeFormat.underline && focusedBlockId === block.id ? "bg-white text-blue-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
//                                 >U</button>
//                             </div>

//                             <div className="flex items-center gap-1 border-l border-gray-100 pl-3">
//                                 <button onClick={() => clearBlock(block.id)} title="Reset Block" className="p-2 text-orange-300 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"><FiRefreshCw /></button>
//                                 <button onClick={() => removeBlock(block.id)} title="Delete Block" className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><FiTrash2 /></button>
//                                 <div {...listeners} className="p-2 cursor-grab text-gray-300 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all"><FiMove /></div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* EDITOR CONTENT */}
//                         {block.type !== "image" ? (
//                           <div
//                             ref={(el) => (editorRefs.current[block.id] = el)}
//                             contentEditable
//                             suppressContentEditableWarning
//                             onInput={(e) => updateBlockValue(block.id, e.currentTarget.innerHTML)}
//                             onFocus={() => checkFormat(block.id)}
//                             onKeyUp={() => checkFormat(block.id)}
//                             onMouseUp={() => checkFormat(block.id)}
//                             className={`editor outline-none text-gray-800 min-h-[60px] leading-relaxed 
//                                 ${block.type === 'heading' ? 'text-2xl font-black text-gray-900' : 'text-lg'}
//                                 ${block.type === 'quote' ? 'border-l-4 border-blue-500 pl-6 italic text-xl text-gray-500 py-2' : ''}
//                                 ${block.type === 'tip' ? 'bg-green-50 p-5 rounded-2xl border-l-4 border-green-400 text-green-900' : ''}
//                                 ${block.type === 'faq' ? 'font-bold text-gray-900 bg-gray-50 p-4 rounded-xl' : ''}
//                             `}
//                           />
//                         ) : (
//                           <div className="bg-gray-50/50 rounded-2xl p-8 border-2 border-dashed border-gray-100 flex flex-col items-center justify-center">
//                             <input
//                               type="file"
//                               id={`file-${block.id}`}
//                               accept="image/*"
//                               className="hidden"
//                               onChange={(e) => handleImageUpload(e, block.id)}
//                             />
//                             {!block.value ? (
//                                 <label htmlFor={`file-${block.id}`} className="flex flex-col items-center cursor-pointer group/upload">
//                                     <div className="bg-white p-4 rounded-2xl shadow-sm mb-3 group-hover/upload:scale-110 transition-transform">
//                                         <FiImage size={32} className="text-blue-500" />
//                                     </div>
//                                     <span className="text-sm font-bold text-gray-500">Select an image for this block</span>
//                                 </label>
//                             ) : (
//                               <div className="relative w-full">
//                                 <img src={block.value} alt="Content" className="rounded-2xl w-full max-h-[500px] object-contain bg-white shadow-sm border border-gray-100" />
//                                 <label htmlFor={`file-${block.id}`} className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-xl shadow-lg cursor-pointer hover:bg-white text-gray-600 transition-all">
//                                     <FiRefreshCw />
//                                 </label>
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </SortableBlockWrapper>
//                 ))}
//               </div>
//             </SortableContext>
//           </DndContext>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BlogForm;


// import React, { useState, useRef, useEffect } from "react";
// import BlogPreview from "./BlogPreview";
// import { useLocation, useNavigate } from "react-router-dom";
// import SummaryApi from "../common/SummaryApi";
// import { 
//   FiMove, FiTrash2, FiRefreshCw, FiImage, 
//   FiType, FiList, FiMessageSquare, FiHelpCircle, FiStar 
// } from "react-icons/fi";

// // --- DND KIT IMPORTS ---
// import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
// import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { v4 as uuidv4 } from "uuid";
// import toast from "react-hot-toast";

// // ----------------------------------------------------------------------
// // SORTABLE WRAPPER COMPONENT
// // ----------------------------------------------------------------------
// const SortableBlockWrapper = ({ id, children }) => {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging
//   } = useSortable({ id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     zIndex: isDragging ? 50 : "auto",
//     opacity: isDragging ? 0.6 : 1,
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes}>
//       {children({ listeners })}
//     </div>
//   );
// };

// const BlogForm = () => {
//   const editorRefs = useRef({}); 
//   const location = useLocation();
//   const navigate = useNavigate();

//   const editBlog = location.state?.blog || null;

//   const [previewMode, setPreviewMode] = useState(false);
//   const [focusedBlockId, setFocusedBlockId] = useState(null); 
//   const [activeFormat, setActiveFormat] = useState({
//     bold: false,
//     italic: false,
//     underline: false,
//   });

//   // FIXED: Added featuredImageFile to initial state to prevent "Property may not exist" error
//   const [blog, setBlog] = useState({
//     title: "",
//     slug: "",
//     category: "",
//     author: "",
//     date: "",
//     metaTitle: "",
//     metaDescription: "",
//     featuredImage: "",
//     featuredImageFile: null, // Track the binary file for the featured image
//     status: "Draft",
//     content: [], 
//   });

//   const sensors = useSensors(
//     useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
//     useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
//   );

//   // ---------------------- FETCH DATA ----------------------
//   useEffect(() => {
//     const fetchBlog = async () => {
//       if (!editBlog?.slug) return;
//       try {
//         const res = await fetch(SummaryApi.getOneBlog.url(editBlog.slug), {
//           method: SummaryApi.getOneBlog.method,
//         });
//         const data = await res.json();
//         if (data) {
//           const contentWithIds = (data.content || []).map(block => ({
//             ...block,
//             id: block.id || uuidv4()
//           }));

//           setBlog({
//             ...data,
//             content: contentWithIds,
//             featuredImageFile: null, // Reset file state on fetch
//             date: data.publishDate ? new Date(data.publishDate).toISOString().split("T")[0] : "",
//           });
//         }
//       } catch (err) {
//         console.error("Fetch Error:", err);
//       }
//     };
//     fetchBlog();
//   }, [editBlog?.slug]);

//   // ---------------------- PERSISTENCE FIX ----------------------
//   useEffect(() => {
//     if (!previewMode) {
//       const timer = setTimeout(() => {
//         blog.content.forEach((block) => {
//           const el = editorRefs.current[block.id];
//           if (el && block.type !== 'image' && el.innerHTML !== block.value) {
//             el.innerHTML = block.value || "";
//           }
//         });
//       }, 50);
//       return () => clearTimeout(timer);
//     }
//   }, [previewMode, blog.content]);

//   // ---------------------- HELPERS ----------------------
//   const updateField = (key, value) => setBlog({ ...blog, [key]: value });

//   const getBlockIcon = (type) => {
//     switch (type) {
//       case "heading": return <FiType />;
//       case "paragraph": return <FiType />;
//       case "list": return <FiList />;
//       case "image": return <FiImage />;
//       case "quote": return <FiMessageSquare />;
//       case "faq": return <FiHelpCircle />;
//       case "tip": return <FiStar />;
//       default: return <FiType />;
//     }
//   };

//   const addBlock = (type) => {
//     const newId = uuidv4();
//     setBlog(prev => ({
//       ...prev,
//       content: [...prev.content, { id: newId, type, value: "" }],
//     }));
//   };

//   const updateBlockValue = (id, htmlValue) => {
//     setBlog(prev => ({
//       ...prev,
//       content: prev.content.map(b => b.id === id ? { ...b, value: htmlValue } : b)
//     }));
//   };

//   const clearBlock = (id) => {
//     if (editorRefs.current[id]) editorRefs.current[id].innerHTML = "";
//     updateBlockValue(id, "");
//   };

//   const removeBlock = (id) => {
//     setBlog(prev => ({
//       ...prev,
//       content: prev.content.filter(b => b.id !== id)
//     }));
//     delete editorRefs.current[id];
//   };

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (!over || active.id === over.id) return;

//     setBlog((prev) => {
//       const oldIndex = prev.content.findIndex((b) => b.id === active.id);
//       const newIndex = prev.content.findIndex((b) => b.id === over.id);
//       return {
//         ...prev,
//         content: arrayMove(prev.content, oldIndex, newIndex),
//       };
//     });
//   };

//   // ---------------------- FORMATTING LOGIC ----------------------
//   const format = (command, id) => {
//     if (focusedBlockId !== id) return; 
//     document.execCommand(command, false, null);
//     checkFormat(id);
//   };

//   const checkFormat = (id) => {
//     setFocusedBlockId(id);
//     setActiveFormat({
//       bold: document.queryCommandState("bold"),
//       italic: document.queryCommandState("italic"),
//       underline: document.queryCommandState("underline"),
//     });
//   };

//   // ---------------------- UPLOADS ----------------------
//   const handleImageUpload = (e, id) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // We keep the Base64 only for local preview in the UI
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setBlog(prev => ({
//         ...prev,
//         content: prev.content.map(b => 
//           b.id === id ? { ...b, value: reader.result, file: file } : b
//         )
//       }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleFeatured = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () =>
//       setBlog((prev) => ({
//         ...prev,
//         featuredImage: reader.result,
//         featuredImageFile: file, // Fixed: This now exists in state
//       }));
//     reader.readAsDataURL(file);
//   };

//   // ---------------------- SAVE LOGIC (BINARY FIX) ----------------------
//   const saveBlog = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("title", blog.title);
//       formData.append("slug", blog.slug);
//       formData.append("category", blog.category);
//       formData.append("author", blog.author);
//       formData.append("publishDate", blog.date);
//       formData.append("metaTitle", blog.metaTitle);
//       formData.append("metaDescription", blog.metaDescription);
//       formData.append("status", blog.status);

//       // Binary Logic: Extract files from content and replace with placeholders
//       // This prevents the "Field value too long" error because the JSON string
//       // will only contain small placeholder strings instead of huge Base64 strings.
//       const processedContent = blog.content.map((block) => {
//         // If it's an image block and has a new file attached
//         if (block.type === 'image' && block.file) {
//           const fileIdentifier = `contentImage_${block.id}`;
//           formData.append("contentImages", block.file); // Append binary file
//           // We send the ID so the backend knows which file belongs to which block
//           formData.append("contentImageIds", block.id); 
//           return {
//             id: block.id,
//             type: block.type,
//             value: fileIdentifier // Placeholder for backend replacement
//           };
//         }
        
//         // For text blocks, get current innerHTML from refs
//         return {
//           id: block.id,
//           type: block.type,
//           value: block.type === 'image' ? block.value : (editorRefs.current[block.id]?.innerHTML || block.value)
//         };
//       });

//       formData.append("content", JSON.stringify(processedContent));

//       if (blog.featuredImageFile) {
//         formData.append("featuredImage", blog.featuredImageFile);
//       }

//       const url = editBlog ? SummaryApi.updateBlog.url(editBlog._id) : SummaryApi.createBlog.url;
//       const method = editBlog ? SummaryApi.updateBlog.method : SummaryApi.createBlog.method;

//       const res = await fetch(url, { method, body: formData });
//       const data = await res.json();

//       if (data.success || data._id) {
//         toast.success(editBlog ? "Blog updated successfully!" : "Blog created successfully!");
//         navigate('/admin-panel/blog-list');
//       } else {
//         toast.error(data.message || "Failed to save blog");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error saving blog");
//     }
//   };

//   if (previewMode) {
//     return <BlogPreview blog={blog} onBack={() => setPreviewMode(false)} />;
//   }

//   return (
//     <div className="min-h-screen pb-20">
//       {/* HEADER SECTION */}
//       <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">
//             {editBlog ? "Edit Article" : "Create New Article"}
//           </h1>
//           <p className="text-sm text-gray-500">Draft your content and manage SEO settings</p>
//         </div>
//         <div className="flex gap-3">
//           <button 
//             onClick={() => setPreviewMode(true)} 
//             className="px-6 py-2 rounded-lg border border-gray-300 font-semibold text-gray-600 hover:bg-gray-50 transition-all"
//           >
//             Preview
//           </button>
//           <button
//             onClick={saveBlog}
//             className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 shadow-lg shadow-green-100 transition-all"
//           >
//             {editBlog ? "Update Publication" : "Publish Blog"}
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">
        
//         {/* LEFT SIDEBAR: METADATA */}
//         <div className="space-y-6">
//           <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
//             <h2 className="font-bold text-gray-700 mb-4 pb-2 border-b">Basic Information</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Title</label>
//                 <input
//                   className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-400 transition-all"
//                   value={blog.title}
//                   onChange={(e) => updateField("title", e.target.value)}
//                   placeholder="Enter blog title"
//                 />
//               </div>
//               <div>
//                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Slug (URL)</label>
//                 <input
//                   className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-400 transition-all"
//                   value={blog.slug}
//                   onChange={(e) => updateField("slug", e.target.value)}
//                   placeholder="e.g. how-to-start-coding"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
//                   <input
//                     className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-400 transition-all"
//                     value={blog.category}
//                     onChange={(e) => updateField("category", e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Author</label>
//                   <input
//                     className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-400 transition-all"
//                     value={blog.author}
//                     onChange={(e) => updateField("author", e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Publish Date</label>
//                 <input
//                   type="date"
//                   className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-400 transition-all text-gray-600"
//                   value={blog.date}
//                   onChange={(e) => updateField("date", e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
//             <h2 className="font-bold text-gray-700 mb-4 pb-2 border-b">SEO Settings</h2>
//             <div className="space-y-4">
//               <input
//                 placeholder="Meta Title"
//                 className="w-full p-2 border rounded-lg outline-none focus:border-blue-400 transition-all"
//                 value={blog.metaTitle}
//                 onChange={(e) => updateField("metaTitle", e.target.value)}
//               />
//               <textarea
//                 placeholder="Meta Description"
//                 className="w-full p-2 border rounded-lg outline-none focus:border-blue-400 transition-all h-24 resize-none"
//                 value={blog.metaDescription}
//                 onChange={(e) => updateField("metaDescription", e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
//             <h2 className="font-bold text-gray-700 mb-4 pb-2 border-b">Media & Status</h2>
//             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Featured Image</label>
//             <div className="mt-2 border-2 border-dashed border-gray-100 rounded-xl p-4 text-center hover:border-blue-200 transition-all">
//                 <input type="file" accept="image/*" onChange={handleFeatured} className="hidden" id="featured-upload" />
//                 <label htmlFor="featured-upload" className="cursor-pointer text-blue-600 text-sm font-semibold hover:text-blue-700">
//                     {blog.featuredImage ? "Change Image" : "Upload Featured Image"}
//                 </label>
//                 {blog.featuredImage && (
//                     <img
//                         src={blog.featuredImage}
//                         alt="Featured"
//                         className="rounded-lg mt-4 w-full object-cover max-h-40 shadow-sm"
//                     />
//                 )}
//             </div>
            
//             <div className="mt-6">
//                 <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Visibility</label>
//                 <select
//                     className="w-full mt-1 p-2 border rounded-lg outline-none font-medium text-gray-700"
//                     value={blog.status}
//                     onChange={(e) => updateField("status", e.target.value)}
//                 >
//                     <option>Draft</option>
//                     <option>Published</option>
//                 </select>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT PANEL: CONTENT EDITOR */}
//         <div className="space-y-6">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sticky top-0 z-[30]">
//             <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide p-1">
//               <button onClick={() => addBlock("heading")} className="shrink-0 px-4 py-2 bg-gray-800 text-white rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-black transition-all"><FiType /> Heading</button>
//               <button onClick={() => addBlock("paragraph")} className="shrink-0 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all"><FiType /> Paragraph</button>
//               <button onClick={() => addBlock("list")} className="shrink-0 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all"><FiList /> List</button>
//               <button onClick={() => addBlock("image")} className="shrink-0 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all"><FiImage /> Image</button>
//               <button onClick={() => addBlock("quote")} className="shrink-0 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all"><FiMessageSquare /> Quote</button>
//               <button onClick={() => addBlock("faq")} className="shrink-0 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all"><FiHelpCircle /> FAQ</button>
//               <button onClick={() => addBlock("tip")} className="shrink-0 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all"><FiStar /> Pro Tip</button>
//             </div>
//           </div>

//           <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//             <SortableContext items={blog.content.map(b => b.id)} strategy={verticalListSortingStrategy}>
//               <div className="space-y-6">
//                 {blog.content.length === 0 && (
//                   <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100 shadow-inner">
//                     <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <FiType className="text-gray-300 text-2xl" />
//                     </div>
//                     <p className="text-gray-400 font-medium">Start your story. Select a block from the toolbar above.</p>
//                   </div>
//                 )}

//                 {blog.content.map((block) => (
//                   <SortableBlockWrapper key={block.id} id={block.id}>
//                     {({ listeners }) => (
//                       <div className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
//                         {/* BLOCK HEADER */}
//                         <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-3">
//                           <div className="flex items-center gap-2 text-gray-400 text-sm">
//                             <span className="bg-blue-50 p-1.5 rounded-lg text-blue-600">{getBlockIcon(block.type)}</span>
//                             {block.type}
//                           </div>
                          
//                           <div className="flex items-center gap-3">
//                             <div className="flex items-center bg-gray-50 rounded-xl p-1">
//                                 <button 
//                                     onMouseDown={(e) => { e.preventDefault(); format("bold", block.id); }} 
//                                     className={`w-9 h-8 rounded-lg font-bold transition-all ${activeFormat.bold && focusedBlockId === block.id ? "bg-white text-blue-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
//                                 >B</button>
//                                 <button 
//                                     onMouseDown={(e) => { e.preventDefault(); format("italic", block.id); }} 
//                                     className={`w-9 h-8 rounded-lg italic transition-all ${activeFormat.italic && focusedBlockId === block.id ? "bg-white text-blue-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
//                                 >I</button>
//                                 <button 
//                                     onMouseDown={(e) => { e.preventDefault(); format("underline", block.id); }} 
//                                     className={`w-9 h-8 rounded-lg underline transition-all ${activeFormat.underline && focusedBlockId === block.id ? "bg-white text-blue-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
//                                 >U</button>
//                             </div>

//                             <div className="flex items-center gap-1 border-l border-gray-100 pl-3">
//                                 <button onClick={() => clearBlock(block.id)} title="Reset Block" className="p-2 text-orange-300 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"><FiRefreshCw /></button>
//                                 <button onClick={() => removeBlock(block.id)} title="Delete Block" className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><FiTrash2 /></button>
//                                 <div {...listeners} className="p-2 cursor-grab text-gray-300 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all"><FiMove /></div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* EDITOR CONTENT */}
//                         {block.type !== "image" ? (
//                           <div
//                             ref={(el) => (editorRefs.current[block.id] = el)}
//                             contentEditable
//                             suppressContentEditableWarning
//                             onInput={(e) => updateBlockValue(block.id, e.currentTarget.innerHTML)}
//                             onFocus={() => checkFormat(block.id)}
//                             onKeyUp={() => checkFormat(block.id)}
//                             onMouseUp={() => checkFormat(block.id)}
//                             className={`editor outline-none text-gray-800 min-h-[60px] leading-relaxed 
//                                 ${block.type === 'heading' ? 'text-2xl font-black text-gray-900' : 'text-lg'}
//                                 ${block.type === 'quote' ? 'border-l-4 border-blue-500 pl-6 italic text-xl text-gray-500 py-2' : ''}
//                                 ${block.type === 'tip' ? 'bg-green-50 p-5 rounded-2xl border-l-4 border-green-400 text-green-900' : ''}
//                                 ${block.type === 'faq' ? 'font-bold text-gray-900 bg-gray-50 p-4 rounded-xl' : ''}
//                             `}
//                           />
//                         ) : (
//                           <div className="bg-gray-50/50 rounded-2xl p-8 border-2 border-dashed border-gray-100 flex flex-col items-center justify-center">
//                             <input
//                               type="file"
//                               id={`file-${block.id}`}
//                               accept="image/*"
//                               className="hidden"
//                               onChange={(e) => handleImageUpload(e, block.id)}
//                             />
//                             {!block.value ? (
//                                 <label htmlFor={`file-${block.id}`} className="flex flex-col items-center cursor-pointer group/upload">
//                                     <div className="bg-white p-4 rounded-2xl shadow-sm mb-3 group-hover/upload:scale-110 transition-transform">
//                                         <FiImage size={32} className="text-blue-500" />
//                                     </div>
//                                     <span className="text-sm font-bold text-gray-500">Select an image for this block</span>
//                                 </label>
//                             ) : (
//                               <div className="relative w-full">
//                                 <img src={block.value} alt="Content" className="rounded-2xl w-full max-h-[500px] object-contain bg-white shadow-sm border border-gray-100" />
//                                 <label htmlFor={`file-${block.id}`} className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-xl shadow-lg cursor-pointer hover:bg-white text-gray-600 transition-all">
//                                     <FiRefreshCw />
//                                 </label>
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </SortableBlockWrapper>
//                 ))}
//               </div>
//             </SortableContext>
//           </DndContext>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BlogForm;
import React, { useState, useRef, useEffect } from "react";
import BlogPreview from "./BlogPreview";
import { useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import { 
  FiMove, FiTrash2, FiRefreshCw, FiImage, 
  FiType, FiList, FiMessageSquare, FiHelpCircle, FiStar 
} from "react-icons/fi";

// --- DND KIT IMPORTS ---
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

// ----------------------------------------------------------------------
// SORTABLE WRAPPER COMPONENT
// ----------------------------------------------------------------------
const SortableBlockWrapper = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {children({ listeners })}
    </div>
  );
};

const BlogForm = () => {
  const editorRefs = useRef({}); 
  const location = useLocation();
  const navigate = useNavigate();

  const editBlog = location.state?.blog || null;

  const [previewMode, setPreviewMode] = useState(false);
  const [focusedBlockId, setFocusedBlockId] = useState(null); 
  const [activeFormat, setActiveFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const [blog, setBlog] = useState({
    title: "",
    slug: "",
    category: "",
    author: "",
    date: "",
    metaTitle: "",
    metaDescription: "",
    featuredImage: "",
    featuredImageFile: null, // 🔥 Added to fix the property error
    status: "Draft",
    content: [], 
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // ---------------------- FETCH DATA ----------------------
  useEffect(() => {
    const fetchBlog = async () => {
      if (!editBlog?.slug) return;
      try {
        const res = await fetch(SummaryApi.getOneBlog.url(editBlog.slug), {
          method: SummaryApi.getOneBlog.method,
        });
        const data = await res.json();
        if (data) {
          const contentWithIds = (data.content || []).map(block => ({
            ...block,
            id: block.id || uuidv4()
          }));

          setBlog({
            ...data,
            featuredImage: data.featuredImage?.url || "", // Map from object to string for preview
            featuredImageFile: null,
            content: contentWithIds,
            date: data.publishDate ? new Date(data.publishDate).toISOString().split("T")[0] : "",
          });
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchBlog();
  }, [editBlog?.slug]);

  // ---------------------- PERSISTENCE FIX ----------------------
  useEffect(() => {
    if (!previewMode) {
      const timer = setTimeout(() => {
        blog.content.forEach((block) => {
          const el = editorRefs.current[block.id];
          if (el && block.type !== 'image' && el.innerHTML !== block.value) {
            el.innerHTML = block.value || "";
          }
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [previewMode, blog.content]);

  // ---------------------- HELPERS ----------------------
  const updateField = (key, value) => setBlog({ ...blog, [key]: value });

  const getBlockIcon = (type) => {
    switch (type) {
      case "heading": return <FiType />;
      case "paragraph": return <FiType />;
      case "list": return <FiList />;
      case "image": return <FiImage />;
      case "quote": return <FiMessageSquare />;
      case "faq": return <FiHelpCircle />;
      case "tip": return <FiStar />;
      default: return <FiType />;
    }
  };

  const addBlock = (type) => {
    const newId = uuidv4();
    setBlog(prev => ({
      ...prev,
      content: [...prev.content, { id: newId, type, value: "", file: null }],
    }));
  };

  const updateBlockValue = (id, htmlValue) => {
    setBlog(prev => ({
      ...prev,
      content: prev.content.map(b => b.id === id ? { ...b, value: htmlValue } : b)
    }));
  };

  const clearBlock = (id) => {
    if (editorRefs.current[id]) editorRefs.current[id].innerHTML = "";
    updateBlockValue(id, "");
  };

  const removeBlock = (id) => {
    setBlog(prev => ({
      ...prev,
      content: prev.content.filter(b => b.id !== id)
    }));
    delete editorRefs.current[id];
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setBlog((prev) => {
      const oldIndex = prev.content.findIndex((b) => b.id === active.id);
      const newIndex = prev.content.findIndex((b) => b.id === over.id);
      return {
        ...prev,
        content: arrayMove(prev.content, oldIndex, newIndex),
      };
    });
  };

  const format = (command, id) => {
    if (focusedBlockId !== id) return;
    document.execCommand(command, false, null);
    checkFormat(id);
  };

  const checkFormat = (id) => {
    setFocusedBlockId(id);
    setActiveFormat({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
    });
  };

  // ---------------------- UPLOADS ----------------------
  const handleImageUpload = (e, id) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // We store the binary file for uploading and a preview URL for the UI
    const previewUrl = URL.createObjectURL(file);
    
    setBlog(prev => ({
      ...prev,
      content: prev.content.map(b => 
        b.id === id ? { ...b, value: previewUrl, file: file, isNewFile: true } : b
      )
    }));
  };

  const handleFeatured = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setBlog((prev) => ({
      ...prev,
      featuredImage: previewUrl,
      featuredImageFile: file,
    }));
  };

  // ---------------------- SAVE LOGIC ----------------------
  const saveBlog = async () => {
    const toastId = toast.loading("Saving article...");
    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("slug", blog.slug);
      formData.append("category", blog.category);
      formData.append("author", blog.author);
      formData.append("publishDate", blog.date);
      formData.append("metaTitle", blog.metaTitle);
      formData.append("metaDescription", blog.metaDescription);
      formData.append("status", blog.status);

      // We need to handle the content blocks carefully.
      // If it's an image block and has a new 'file', we append it to FormData.
      // We'll replace the 'value' with a placeholder so the backend knows which file belongs where.
      const processedContent = blog.content.map((block) => {
        let finalValue = block.type === 'image' ? block.value : (editorRefs.current[block.id]?.innerHTML || block.value);
        
        if (block.type === 'image' && block.file && block.isNewFile) {
          formData.append("contentImages", block.file);
          // Set value to a special marker so backend can replace it with the Cloudinary URL
          finalValue = "__NEW_IMAGE__"; 
        }

        return {
          type: block.type,
          value: finalValue
        };
      });

      formData.append("content", JSON.stringify(processedContent));

      if (blog.featuredImageFile) {
        formData.append("featuredImage", blog.featuredImageFile);
      }

      const url = editBlog ? SummaryApi.updateBlog.url(editBlog._id) : SummaryApi.createBlog.url;
      const method = editBlog ? SummaryApi.updateBlog.method : SummaryApi.createBlog.method;

      const res = await fetch(url, { 
        method, 
        body: formData 
        // Note: fetch automatically sets the correct Content-Type with boundary for FormData
      });
      
      const data = await res.json();

      if (data.success || data._id) {
        toast.success(editBlog ? "Blog updated successfully!" : "Blog created successfully!", { id: toastId });
        navigate('/admin-panel/blog-list');
      } else {
        throw new Error(data.message || "Failed to save");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error saving blog", { id: toastId });
    }
  };

  if (previewMode) {
    return <BlogPreview blog={blog} onBack={() => setPreviewMode(false)} />;
  }

  return (
    <div className="min-h-screen pb-20">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {editBlog ? "Edit Article" : "Create New Article"}
          </h1>
          <p className="text-sm text-gray-500">Draft your content and manage SEO settings</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setPreviewMode(true)} 
            className="px-6 py-2 rounded-lg border border-gray-300 font-semibold text-gray-600 hover:bg-gray-50 transition-all"
          >
            Preview
          </button>
          <button
            onClick={saveBlog}
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 shadow-lg shadow-green-100 transition-all"
          >
            {editBlog ? "Update Publication" : "Publish Blog"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">
        
        {/* LEFT SIDEBAR: METADATA */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-700 mb-4 pb-2 border-b">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Title</label>
                <input
                  className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-400 transition-all"
                  value={blog.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Enter blog title"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Slug (URL)</label>
                <input
                  className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-400 transition-all"
                  value={blog.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                  placeholder="e.g. how-to-start-coding"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
                  <input
                    className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-400 transition-all"
                    value={blog.category}
                    onChange={(e) => updateField("category", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Author</label>
                  <input
                    className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-400 transition-all"
                    value={blog.author}
                    onChange={(e) => updateField("author", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Publish Date</label>
                <input
                  type="date"
                  className="w-full mt-1 p-2 border rounded-lg outline-none focus:border-blue-400 transition-all text-gray-600"
                  value={blog.date}
                  onChange={(e) => updateField("date", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-700 mb-4 pb-2 border-b">SEO Settings</h2>
            <div className="space-y-4">
              <input
                placeholder="Meta Title"
                className="w-full p-2 border rounded-lg outline-none focus:border-blue-400 transition-all"
                value={blog.metaTitle}
                onChange={(e) => updateField("metaTitle", e.target.value)}
              />
              <textarea
                placeholder="Meta Description"
                className="w-full p-2 border rounded-lg outline-none focus:border-blue-400 transition-all h-24 resize-none"
                value={blog.metaDescription}
                onChange={(e) => updateField("metaDescription", e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-700 mb-4 pb-2 border-b">Media & Status</h2>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Featured Image</label>
            <div className="mt-2 border-2 border-dashed border-gray-100 rounded-xl p-4 text-center hover:border-blue-200 transition-all">
                <input type="file" accept="image/*" onChange={handleFeatured} className="hidden" id="featured-upload" />
                <label htmlFor="featured-upload" className="cursor-pointer text-blue-600 text-sm font-semibold hover:text-blue-700">
                    {blog.featuredImage ? "Change Image" : "Upload Featured Image"}
                </label>
                {blog.featuredImage && (
                    <img
                        src={blog.featuredImage}
                        alt="Featured"
                        className="rounded-lg mt-4 w-full object-cover max-h-40 shadow-sm"
                    />
                )}
            </div>
            
            <div className="mt-6">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Visibility</label>
                <select
                    className="w-full mt-1 p-2 border rounded-lg outline-none font-medium text-gray-700"
                    value={blog.status}
                    onChange={(e) => updateField("status", e.target.value)}
                >
                    <option>Draft</option>
                    <option>Published</option>
                </select>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: CONTENT EDITOR */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sticky top-0 z-[30]">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide p-1">
              <button onClick={() => addBlock("heading")} className="shrink-0 px-4 py-2 bg-gray-800 text-white rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-black transition-all"><FiType /> Heading</button>
              <button onClick={() => addBlock("paragraph")} className="shrink-0 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all"><FiType /> Paragraph</button>
              <button onClick={() => addBlock("list")} className="shrink-0 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all"><FiList /> List</button>
              <button onClick={() => addBlock("image")} className="shrink-0 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all"><FiImage /> Image</button>
              <button onClick={() => addBlock("quote")} className="shrink-0 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all"><FiMessageSquare /> Quote</button>
              <button onClick={() => addBlock("faq")} className="shrink-0 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all"><FiHelpCircle /> FAQ</button>
              <button onClick={() => addBlock("tip")} className="shrink-0 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition-all"><FiStar /> Pro Tip</button>
            </div>
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={blog.content.map(b => b.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-6">
                {blog.content.length === 0 && (
                  <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100 shadow-inner">
                    <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiType className="text-gray-300 text-2xl" />
                    </div>
                    <p className="text-gray-400 font-medium">Start your story. Select a block from the toolbar above.</p>
                  </div>
                )}

                {blog.content.map((block) => (
                  <SortableBlockWrapper key={block.id} id={block.id}>
                    {({ listeners }) => (
                      <div className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                        {/* BLOCK HEADER */}
                        <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-3">
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <span className="bg-blue-50 p-1.5 rounded-lg text-blue-600">{getBlockIcon(block.type)}</span>
                            {block.type}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center bg-gray-50 rounded-xl p-1">
                                <button 
                                    onMouseDown={(e) => { e.preventDefault(); format("bold", block.id); }} 
                                    className={`w-9 h-8 rounded-lg font-bold transition-all ${activeFormat.bold && focusedBlockId === block.id ? "bg-white text-blue-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                                >B</button>
                                <button 
                                    onMouseDown={(e) => { e.preventDefault(); format("italic", block.id); }} 
                                    className={`w-9 h-8 rounded-lg italic transition-all ${activeFormat.italic && focusedBlockId === block.id ? "bg-white text-blue-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                                >I</button>
                                <button 
                                    onMouseDown={(e) => { e.preventDefault(); format("underline", block.id); }} 
                                    className={`w-9 h-8 rounded-lg underline transition-all ${activeFormat.underline && focusedBlockId === block.id ? "bg-white text-blue-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                                >U</button>
                            </div>

                            <div className="flex items-center gap-1 border-l border-gray-100 pl-3">
                                <button onClick={() => clearBlock(block.id)} title="Reset Block" className="p-2 text-orange-300 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"><FiRefreshCw /></button>
                                <button onClick={() => removeBlock(block.id)} title="Delete Block" className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><FiTrash2 /></button>
                                <div {...listeners} className="p-2 cursor-grab text-gray-300 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all"><FiMove /></div>
                            </div>
                          </div>
                        </div>

                        {/* EDITOR CONTENT */}
                        {block.type !== "image" ? (
                          <div
                            ref={(el) => (editorRefs.current[block.id] = el)}
                            contentEditable
                            suppressContentEditableWarning
                            onInput={(e) => updateBlockValue(block.id, e.currentTarget.innerHTML)}
                            onFocus={() => checkFormat(block.id)}
                            onKeyUp={() => checkFormat(block.id)}
                            onMouseUp={() => checkFormat(block.id)}
                            className={`editor outline-none text-gray-800 min-h-[60px] leading-relaxed 
                                ${block.type === 'heading' ? 'text-2xl font-black text-gray-900' : 'text-lg'}
                                ${block.type === 'quote' ? 'border-l-4 border-blue-500 pl-6 italic text-xl text-gray-500 py-2' : ''}
                                ${block.type === 'tip' ? 'bg-green-50 p-5 rounded-2xl border-l-4 border-green-400 text-green-900' : ''}
                                ${block.type === 'faq' ? 'font-bold text-gray-900 bg-gray-50 p-4 rounded-xl' : ''}
                            `}
                          />
                        ) : (
                          <div className="bg-gray-50/50 rounded-2xl p-8 border-2 border-dashed border-gray-100 flex flex-col items-center justify-center">
                            <input
                              type="file"
                              id={`file-${block.id}`}
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageUpload(e, block.id)}
                            />
                            {!block.value ? (
                                <label htmlFor={`file-${block.id}`} className="flex flex-col items-center cursor-pointer group/upload">
                                    <div className="bg-white p-4 rounded-2xl shadow-sm mb-3 group-hover/upload:scale-110 transition-transform">
                                        <FiImage size={32} className="text-blue-500" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-500">Select an image for this block</span>
                                </label>
                            ) : (
                              <div className="relative w-full">
                                <img src={block.value} alt="Content" className="rounded-2xl w-full max-h-[500px] object-contain bg-white shadow-sm border border-gray-100" />
                                <label htmlFor={`file-${block.id}`} className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-xl shadow-lg cursor-pointer hover:bg-white text-gray-600 transition-all">
                                    <FiRefreshCw />
                                </label>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </SortableBlockWrapper>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}

export default BlogForm;