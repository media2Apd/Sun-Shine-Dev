// import { useState, useRef ,useEffect } from "react";
// import { useBlog } from "../Context/BlogContext";
// import { useNavigate } from "react-router-dom";
// const [previewMode, setPreviewMode] = useState(false);

// export default function CreateBlog() {
//   const { addBlog } = useBlog();
//   const navigate = useNavigate();
//   const editorRefs = useRef([]);

//   const [dragIndex, setDragIndex] = useState(null);
//   const [activeFormat, setActiveFormat] = useState({
//     bold: false,
//     italic: false,
//     underline: false,
//   });



//   const [blog, setBlog] = useState(() => {
//   const saved = localStorage.getItem("blogDraft");
//   return saved
//     ? JSON.parse(saved)
//     : {
//         title: "",
//         slug: "",
//         category: "",
//         author: "",
//         date: "",
//         metaTitle: "",
//         metaDescription: "",
//         featuredImage: "",
//         status: "Draft",
//         content: [],
//       };
// });

//   useEffect(() => {
//   localStorage.setItem("blogDraft", JSON.stringify(blog));
// }, [blog]);

//   const updateField = (key, value) => {
//     setBlog({ ...blog, [key]: value });
//   };

//   const handlePreview = () => {
//     navigate("/admin-panel/blog-preview", {
//       state: blog,
//     });
//   };

//   const addBlock = (type) => {
//     setBlog({
//       ...blog,
//       content: [...blog.content, { type, value: "" }],
//     });
//   };

//   const updateBlock = (index, html) => {
//     const updated = [...blog.content];
//     updated[index].value = html;
//     setBlog({ ...blog, content: updated });
//   };

//   const clearBlock = (index) => {
//     editorRefs.current[index].innerHTML = "";
//     updateBlock(index, "");
//   };

//   const removeBlock = (index) => {
//     const updated = blog.content.filter((_, i) => i !== index);
//     setBlog({ ...blog, content: updated });
//   };

//   /* TEXT FORMAT */
//   const format = (command) => {
//     document.execCommand(command, false, null);
//     checkFormat();
//   };

//   /* CHECK ACTIVE FORMAT */
//   const checkFormat = () => {
//     setActiveFormat({
//       bold: document.queryCommandState("bold"),
//       italic: document.queryCommandState("italic"),
//       underline: document.queryCommandState("underline"),
//     });
//   };

//   /* DRAG */
//   const handleDragStart = (index) => setDragIndex(index);

//   const handleDrop = (index) => {
//     const items = [...blog.content];
//     const dragged = items[dragIndex];
//     items.splice(dragIndex, 1);
//     items.splice(index, 0, dragged);
//     setBlog({ ...blog, content: items });
//   };

//   /* IMAGE */
//   const handleImageUpload = (e, index) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       updateBlock(index, reader.result);
//     };

//     reader.readAsDataURL(file);
//   };

//   /* FEATURED IMAGE */
//   const handleFeatured = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       updateField("featuredImage", reader.result);
//     };

//     reader.readAsDataURL(file);
//   };

//   const saveBlog = () => {
//     const newBlog = {
//       ...blog,
//       id: Date.now(),
//     };
//     addBlog(newBlog);
//   };

//   return (
//     <div className="p-4 md:p-6 min-h-screen">
//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-4">
//         <h1 className="text-xl font-semibold">Create Blog</h1>

//         <div className="flex gap-3 flex-wrap">
//           <button onClick={handlePreview} className="border px-4 py-2 rounded">
//             Preview
//           </button>

//           <button
//             onClick={saveBlog}
//             className="bg-green-600 text-white px-4 py-2 rounded"
//           >
//             Save Blog
//           </button>
//         </div>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
//         {/* LEFT PANEL */}
//         <div className="bg-white p-4 rounded-xl border">
//           <h2 className="font-medium mb-4">Basic Info</h2>

//           <input placeholder="Blog Title" className="input" onChange={(e)=>updateField("title",e.target.value)} />
//           <input placeholder="Slug" className="input" onChange={(e)=>updateField("slug",e.target.value)} />
//           <input placeholder="Category" className="input" onChange={(e)=>updateField("category",e.target.value)} />
//           <input placeholder="Author" className="input" onChange={(e)=>updateField("author",e.target.value)} />
//           <input type="date" className="input" onChange={(e)=>updateField("date",e.target.value)} />

//           <h2 className="font-medium mt-6 mb-3">SEO</h2>

//           <input placeholder="Meta Title" className="input" onChange={(e)=>updateField("metaTitle",e.target.value)} />
//           <textarea placeholder="Meta Description" className="input" onChange={(e)=>updateField("metaDescription",e.target.value)} />

//           <h2 className="font-medium mt-6 mb-3">Featured Image</h2>
//           <input type="file" onChange={handleFeatured} />

//           <select className="input mt-4" onChange={(e)=>updateField("status",e.target.value)}>
//             <option>Draft</option>
//             <option>Published</option>
//           </select>
//         </div>

//         {/* RIGHT PANEL */}
//         <div className="bg-white rounded-xl border p-4">
//           {/* TOOLBAR */}
//           <div className="flex flex-wrap gap-2 mb-4">
//             <button onClick={()=>addBlock("heading")} className="toolbar" >+ Heading</button>
//             <button onClick={()=>addBlock("paragraph")} className="toolbar">+ Paragraph</button>
//             <button onClick={()=>addBlock("list")} className="toolbar">+ List</button>
//             <button onClick={()=>addBlock("image")} className="toolbar">+ Image</button>
//             <button onClick={()=>addBlock("quote")} className="toolbar">+ Quote</button>
//             <button onClick={()=>addBlock("faq")} className="toolbar">+ FAQ</button>
//             <button onClick={()=>addBlock("tip")} className="toolbar">+ Pro Tip</button>
//           </div>

//           {blog.content.map((block, i) => (
//             <div
//               key={i}
//               draggable
//               onDragStart={()=>handleDragStart(i)}
//               onDragOver={(e)=>e.preventDefault()}
//               onDrop={()=>handleDrop(i)}
//               className="mb-4 border p-3 rounded-lg bg-gray-50"
//             >
//               {block.type !== "image" && (
//                 <div className="flex flex-wrap gap-2 mb-2 items-center">
//                   <button
//                     onClick={()=>format("bold")}
//                     className={`px-2 border rounded font-bold ${
//                       activeFormat.bold ? "bg-gray-200" : ""
//                     }`}
//                   >
//                     B
//                   </button>

//                   <button
//                     onClick={()=>format("italic")}
//                     className={`px-2 border rounded italic ${
//                       activeFormat.italic ? "bg-gray-200" : ""
//                     }`}
//                   >
//                     I
//                   </button>

//                   <button
//                     onClick={()=>format("underline")}
//                     className={`px-2 border rounded underline ${
//                       activeFormat.underline ? "bg-gray-200" : ""
//                     }`}
//                   >
//                     U
//                   </button>

//                   <button onClick={()=>clearBlock(i)} className="ml-auto text-orange-600 text-sm">
//                     Clear
//                   </button>

//                   <button onClick={()=>removeBlock(i)} className="text-red-600 text-sm">
//                     Remove
//                   </button>
//                 </div>
//               )}

//               {block.type !== "image" && (
//                 <div
//   ref={(el)=>(editorRefs.current[i]=el)}
//   contentEditable
//   data-placeholder={
//     block.type === "heading"
//       ? "Enter heading..."
//       : block.type === "paragraph"
//       ? "Write paragraph..."
//       : block.type === "list"
//       ? "Write list..."
//       : block.type === "quote"
//       ? "Write quote..."
//       : block.type === "faq"
//       ? "Enter FAQ..."
//       : "Write tip..."
//   }
//   onKeyUp={checkFormat}
//   onMouseUp={checkFormat}
//   className="input min-h-[80px] editor"
//   onInput={(e)=>updateBlock(i,e.currentTarget.innerHTML)}
// />
//               )}

//               {block.type === "image" && (
//                 <>
//                   <input type="file" onChange={(e)=>handleImageUpload(e,i)} />
//                   <div className="flex justify-end gap-3 mt-2">
//                     <button onClick={()=>clearBlock(i)} className="text-orange-600 text-sm">
//                       Clear
//                     </button>
//                     <button onClick={()=>removeBlock(i)} className="text-red-600 text-sm">
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
// import { useBlog } from "../Context/BlogContext";
// import BlogPreview from "./BlogPreview";

// export default function CreateBlog() {
//   const { addBlog } = useBlog();
//   const editorRefs = useRef([]);

//   const [previewMode, setPreviewMode] = useState(false);
//   const [dragIndex, setDragIndex] = useState(null);
// console.log(previewMode);

//   const [activeFormat, setActiveFormat] = useState({
//     bold: false,
//     italic: false,
//     underline: false,
//   });

//   const [blog, setBlog] = useState(() => {
//     const saved = localStorage.getItem("blogDraft");
//     return saved
//       ? JSON.parse(saved)
//       : {
//           title: "",
//           slug: "",
//           category: "",
//           author: "",
//           date: "",
//           metaTitle: "",
//           metaDescription: "",
//           featuredImage: "",
//           status: "Draft",
//           content: [],
//         };
//   });

//   useEffect(() => {
//     localStorage.setItem("blogDraft", JSON.stringify(blog));
//   }, [blog]);

//   useEffect(() => {
//   blog.content.forEach((block, i) => {
//     if (editorRefs.current[i] && block.value) {
//       editorRefs.current[i].innerHTML = block.value;
//     }
//   });
// }, [blog.content]);
//   const updateField = (key, value) => {
//     setBlog({ ...blog, [key]: value });
//   };

//   const addBlock = (type) => {
//     setBlog({
//       ...blog,
//       content: [...blog.content, { type, value: "" }],
//     });
//   };

//   const updateBlock = (index, html) => {
//     const updated = [...blog.content];
//     updated[index].value = html;
//     setBlog({ ...blog, content: updated });
//   };

//   const clearBlock = (index) => {
//     if (editorRefs.current[index]) {
//       editorRefs.current[index].innerHTML = "";
//     }
//     updateBlock(index, "");
//   };

//   const removeBlock = (index) => {
//     const updated = blog.content.filter((_, i) => i !== index);
//     setBlog({ ...blog, content: updated });
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

//   const handleDragStart = (index) => setDragIndex(index);

//   const handleDrop = (index) => {
//     const items = [...blog.content];
//     const dragged = items[dragIndex];
//     items.splice(dragIndex, 1);
//     items.splice(index, 0, dragged);
//     setBlog({ ...blog, content: items });
//   };

//   const handleImageUpload = (e, index) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       updateBlock(index, reader.result);
//     };

//     reader.readAsDataURL(file);
//   };

//   const handleFeatured = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       updateField("featuredImage", reader.result);
//     };

//     reader.readAsDataURL(file);
//   };

//   const saveBlog = () => {
//     const newBlog = {
//       ...blog,
//       id: Date.now(),
//     };

//     addBlog(newBlog);
//     localStorage.removeItem("blogDraft");
//   };

//   /* PREVIEW MODE */
// if (previewMode) {
//   return (
//     <BlogPreview
//       blog={blog}
//       onBack={() => setPreviewMode(false)}
//     />
//   );
// }
// const handlePreview = () => {
//   // Ensure all blocks are updated from editorRefs
//   const updatedContent = blog.content.map((block, i) => {
//     if (editorRefs.current[i]) {
//       return { ...block, value: editorRefs.current[i].innerHTML };
//     }
//     return block;
//   });

//   setBlog({ ...blog, content: updatedContent });
//   setPreviewMode(true);
// };
//   return (
//     <div className="p-4 md:p-6 min-h-screen">
//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-4">
//         <h1 className="text-xl font-semibold">Create Blog</h1>

//         <div className="flex gap-3 flex-wrap">
//           <button
//             onClick={handlePreview}
//             className="border px-4 py-2 rounded"
//           >
//             Preview
//           </button>

//           <button
//             onClick={saveBlog}
//             className="bg-green-600 text-white px-4 py-2 rounded"
//           >
//             Save Blog
//           </button>
//         </div>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
//         {/* LEFT PANEL */}
//         <div className="bg-white p-4 rounded-xl border">
//           <h2 className="font-medium mb-4">Basic Info</h2>

//           <input placeholder="Blog Title" className="input" onChange={(e)=>updateField("title",e.target.value)} />
//           <input placeholder="Slug" className="input" onChange={(e)=>updateField("slug",e.target.value)} />
//           <input placeholder="Category" className="input" onChange={(e)=>updateField("category",e.target.value)} />
//           <input placeholder="Author" className="input" onChange={(e)=>updateField("author",e.target.value)} />
//           <input type="date" className="input" onChange={(e)=>updateField("date",e.target.value)} />

//           <h2 className="font-medium mt-6 mb-3">SEO</h2>

//           <input placeholder="Meta Title" className="input" onChange={(e)=>updateField("metaTitle",e.target.value)} />
//           <textarea placeholder="Meta Description" className="input" onChange={(e)=>updateField("metaDescription",e.target.value)} />

//           <h2 className="font-medium mt-6 mb-3">Featured Image</h2>
//           <input type="file" onChange={handleFeatured} />

//           <select className="input mt-4" onChange={(e)=>updateField("status",e.target.value)}>
//             <option>Draft</option>
//             <option>Published</option>
//           </select>
//         </div>

//         {/* RIGHT PANEL */}
//         <div className="bg-white rounded-xl border p-4">
//           <div className="flex flex-wrap gap-2 mb-4">
//             <button onClick={()=>addBlock("heading")} className="toolbar">+ Heading</button>
//             <button onClick={()=>addBlock("paragraph")} className="toolbar">+ Paragraph</button>
//             <button onClick={()=>addBlock("list")} className="toolbar">+ List</button>
//             <button onClick={()=>addBlock("image")} className="toolbar">+ Image</button>
//             <button onClick={()=>addBlock("quote")} className="toolbar">+ Quote</button>
//             <button onClick={()=>addBlock("faq")} className="toolbar">+ FAQ</button>
//             <button onClick={()=>addBlock("tip")} className="toolbar">+ Pro Tip</button>
//           </div>

//           {blog.content.map((block, i) => (
//             <div
//               key={i}
//               draggable
//               onDragStart={()=>handleDragStart(i)}
//               onDragOver={(e)=>e.preventDefault()}
//               onDrop={()=>handleDrop(i)}
//               className="mb-4 border p-3 rounded-lg bg-gray-50"
//             >
//               {block.type !== "image" && (
//                 <div className="flex flex-wrap gap-2 mb-2 items-center">
//                   <button onClick={()=>format("bold")} className={`px-2 border rounded font-bold ${activeFormat.bold ? "bg-gray-200" : ""}`}>B</button>
//                   <button onClick={()=>format("italic")} className={`px-2 border rounded italic ${activeFormat.italic ? "bg-gray-200" : ""}`}>I</button>
//                   <button onClick={()=>format("underline")} className={`px-2 border rounded underline ${activeFormat.underline ? "bg-gray-200" : ""}`}>U</button>

//                   <button onClick={()=>clearBlock(i)} className="ml-auto text-orange-600 text-sm">Clear</button>
//                   <button onClick={()=>removeBlock(i)} className="text-red-600 text-sm">Remove</button>
//                 </div>
//               )}

//               {block.type !== "image" && (
//                 <div
//                   ref={(el)=>(editorRefs.current[i]=el)}
//                   contentEditable
//                   data-placeholder={
//                     block.type === "heading" ? "Enter heading..."
//                     : block.type === "paragraph" ? "Write paragraph..."
//                     : block.type === "list" ? "Write list..."
//                     : block.type === "quote" ? "Write quote..."
//                     : block.type === "faq" ? "Enter FAQ..."
//                     : "Write tip..."
//                   }
//                   onKeyUp={checkFormat}
//                   onMouseUp={checkFormat}
//                   className="input min-h-[80px] editor"
//                   onInput={(e)=>updateBlock(i,e.currentTarget.innerHTML)}
//                 />
//               )}

//               {block.type === "image" && (
//                 <>
//                   <input type="file" onChange={(e)=>handleImageUpload(e,i)} />
//                   <div className="flex justify-end gap-3 mt-2">
//                     <button onClick={()=>clearBlock(i)} className="text-orange-600 text-sm">Clear</button>
//                     <button onClick={()=>removeBlock(i)} className="text-red-600 text-sm">Remove</button>
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





// import { useState, useRef } from "react";
// import { useBlog } from "../Context/BlogContext";
// import BlogPreview from "./BlogPreview";

// export default function CreateBlog() {
//   const { addBlog } = useBlog();
//   const editorRefs = useRef([]);

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

//   const updateField = (key, value) => setBlog({ ...blog, [key]: value });

//   const addBlock = (type) => {
//     setBlog({
//       ...blog,
//       content: [...blog.content, { type, value: "" }],
//     });
//   };

//   const updateBlock = (index, html) => {
//     const updated = [...blog.content];
//     updated[index].value = html;
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

//   const handleDragStart = (index) => setDragIndex(index);

//   const handleDrop = (index) => {
//     const items = [...blog.content];
//     const dragged = items[dragIndex];
//     items.splice(dragIndex, 1);
//     items.splice(index, 0, dragged);
//     setBlog({ ...blog, content: items });
//   };

//   const handleImageUpload = (e, index) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => updateBlock(index, reader.result);
//     reader.readAsDataURL(file);
//   };

//   const handleFeatured = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => updateField("featuredImage", reader.result);
//     reader.readAsDataURL(file);
//   };

//   const saveBlog = () => {
//     const newBlog = { ...blog, id: Date.now() };
//     addBlog(newBlog);
//     // Reset after save
//     setBlog({
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
//     });
//   };

// const handlePreview = () => {
//   const updatedContent = blog.content.map((block, i) => {
//     if (block.type !== "image") {
//       return { ...block, value: editorRefs.current[i]?.innerHTML || block.value };
//     }
//     return block; // keep file/preview for image blocks
//   });
//   setBlog({ ...blog, content: updatedContent });
//   setPreviewMode(true);
// };

//   if (previewMode) {
//     return <BlogPreview blog={blog} onBack={() => setPreviewMode(false)} />;
//   }

//   return (
//     <div className="p-4 md:p-6 min-h-screen">
//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-4">
//         <h1 className="text-xl font-semibold">Create Blog</h1>

//         <div className="flex gap-3 flex-wrap">
//           <button onClick={handlePreview} className="border px-4 py-2 rounded">
//             Preview
//           </button>

//           <button
//             onClick={saveBlog}
//             className="bg-green-600 text-white px-4 py-2 rounded"
//           >
//             Save Blog
//           </button>
//         </div>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
//         {/* LEFT PANEL */}
//         <div className="bg-white p-4 rounded-xl border">
//           <h2 className="font-medium mb-4">Basic Info</h2>

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

//           <h2 className="font-medium mt-6 mb-3">SEO</h2>
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

//           <h2 className="font-medium mt-6 mb-3">Featured Image</h2>
//           <input type="file" onChange={handleFeatured} />

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
//               draggable
//               onDragStart={() => handleDragStart(i)}
//               onDragOver={(e) => e.preventDefault()}
//               onDrop={() => handleDrop(i)}
//               className="mb-4 border p-3 rounded-lg bg-gray-50"
//             >
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
//                   suppressContentEditableWarning={true}
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
//                   onKeyUp={checkFormat}
//                   onMouseUp={checkFormat}
//                   className="input min-h-[80px] editor"
//                   onInput={(e) => updateBlock(i, e.currentTarget.innerHTML)}
//                   dangerouslySetInnerHTML={{ __html: block.value }} // <-- bind content here
//                 />
//               )}

//               {block.type === "image" && (
//                 <>
//                   <input
//                     type="file"
//                     onChange={(e) => handleImageUpload(e, i)}
//                   />
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

import { useState, useRef } from "react";
import { useBlog } from "../Context/BlogContext";
import BlogPreview from "./BlogPreview";
import { MdOutlineDragIndicator } from "react-icons/md";

export default function CreateBlog() {
  const { addBlog } = useBlog();
  const editorRefs = useRef([]);

  const [previewMode, setPreviewMode] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);

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
    status: "Draft",
    content: [],
  });

  // ---------------------- FIELD UPDATES ----------------------
  const updateField = (key, value) => setBlog({ ...blog, [key]: value });

  // ---------------------- CONTENT BLOCKS ----------------------
  const addBlock = (type) => {
    setBlog({
      ...blog,
      content: [...blog.content, { type, value: "" }],
    });
  };

  const updateBlock = (index, value) => {
    const updated = [...blog.content];
    updated[index].value = value;
    setBlog({ ...blog, content: updated });
  };

  const clearBlock = (index) => {
    if (editorRefs.current[index]) editorRefs.current[index].innerHTML = "";
    updateBlock(index, "");
  };

  const removeBlock = (index) => {
    setBlog({ ...blog, content: blog.content.filter((_, i) => i !== index) });
  };

  const format = (command) => {
    document.execCommand(command, false, null);
    checkFormat();
  };

  const checkFormat = () => {
    setActiveFormat({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
    });
  };

  // ---------------------- DRAG & DROP ----------------------
  const handleDragStart = (index) => setDragIndex(index);

  const handleDrop = (index) => {
    if (dragIndex === null) return;
    const items = [...blog.content];
    const dragged = items[dragIndex];
    items.splice(dragIndex, 1);
    items.splice(index, 0, dragged);
    setBlog({ ...blog, content: items });
    setDragIndex(null);
  };

  // ---------------------- IMAGE UPLOAD ----------------------
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => updateBlock(index, reader.result);
    reader.readAsDataURL(file);
  };

  const handleFeatured = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => updateField("featuredImage", reader.result);
    reader.readAsDataURL(file);
  };

  // ---------------------- SAVE & PREVIEW ----------------------
  const saveBlog = () => {
    const newBlog = { ...blog, id: Date.now() };
    addBlog(newBlog);
    // Reset after save
    setBlog({
      title: "",
      slug: "",
      category: "",
      author: "",
      date: "",
      metaTitle: "",
      metaDescription: "",
      featuredImage: "",
      status: "Draft",
      content: [],
    });
  };

  const handlePreview = () => {
    const updatedContent = blog.content.map((block, i) => ({
      ...block,
      value: editorRefs.current[i]?.innerHTML || block.value,
    }));
    setBlog({ ...blog, content: updatedContent });
    setPreviewMode(true);
  };

  if (previewMode) {
    return <BlogPreview blog={blog} onBack={() => setPreviewMode(false)} />;
  }

  // ---------------------- JSX ----------------------
  return (
    <div className="p-4 md:p-6 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-4">
        <h1 className="text-xl font-semibold">Create Blog</h1>
        <div className="flex gap-3 flex-wrap">
          <button onClick={handlePreview} className="border px-4 py-2 rounded">
            Preview
          </button>
          <button
            onClick={saveBlog}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Blog
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        {/* LEFT PANEL */}
        <div className="bg-white p-4 rounded-xl border space-y-4">
          <h2 className="font-medium mb-2">Basic Info</h2>
          <input
            placeholder="Blog Title"
            className="input"
            value={blog.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
          <input
            placeholder="Slug"
            className="input"
            value={blog.slug}
            onChange={(e) => updateField("slug", e.target.value)}
          />
          <input
            placeholder="Category"
            className="input"
            value={blog.category}
            onChange={(e) => updateField("category", e.target.value)}
          />
          <input
            placeholder="Author"
            className="input"
            value={blog.author}
            onChange={(e) => updateField("author", e.target.value)}
          />
          <input
            type="date"
            className="input"
            value={blog.date}
            onChange={(e) => updateField("date", e.target.value)}
          />

          <h2 className="font-medium mt-4 mb-2">SEO</h2>
          <input
            placeholder="Meta Title"
            className="input"
            value={blog.metaTitle}
            onChange={(e) => updateField("metaTitle", e.target.value)}
          />
          <textarea
            placeholder="Meta Description"
            className="input"
            value={blog.metaDescription}
            onChange={(e) => updateField("metaDescription", e.target.value)}
          />

          <h2 className="font-medium mt-4 mb-2">Featured Image</h2>
          <input type="file" accept="image/*" onChange={handleFeatured} />
          {blog.featuredImage && (
            <img
              src={blog.featuredImage}
              alt="Featured"
              className="rounded-lg mt-2 max-h-60"
            />
          )}

          <select
            className="input mt-4"
            value={blog.status}
            onChange={(e) => updateField("status", e.target.value)}
          >
            <option>Draft</option>
            <option>Published</option>
          </select>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white rounded-xl border p-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <button onClick={() => addBlock("heading")} className="toolbar">
              + Heading
            </button>
            <button onClick={() => addBlock("paragraph")} className="toolbar">
              + Paragraph
            </button>
            <button onClick={() => addBlock("list")} className="toolbar">
              + List
            </button>
            <button onClick={() => addBlock("image")} className="toolbar">
              + Image
            </button>
            <button onClick={() => addBlock("quote")} className="toolbar">
              + Quote
            </button>
            <button onClick={() => addBlock("faq")} className="toolbar">
              + FAQ
            </button>
            <button onClick={() => addBlock("tip")} className="toolbar">
              + Pro Tip
            </button>
          </div>

          {blog.content.map((block, i) => (
            <div
              key={i}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(i)}
              className="mb-4 border p-3 rounded-lg bg-gray-50 relative"
            >
              {/* Drag Handle */}
              <span
                draggable
                onDragStart={() => handleDragStart(i)}
                className="absolute top-2 right-2 cursor-grab text-gray-400 hover:text-gray-700"
                title="Drag to reorder"
              >
                ☰
              </span>

              {block.type !== "image" && (
                <div className="flex flex-wrap gap-2 mb-2 items-center">
                  <button
                    onClick={() => format("bold")}
                    className={`px-2 border rounded font-bold ${
                      activeFormat.bold ? "bg-gray-200" : ""
                    }`}
                  >
                    B
                  </button>
                  <button
                    onClick={() => format("italic")}
                    className={`px-2 border rounded italic ${
                      activeFormat.italic ? "bg-gray-200" : ""
                    }`}
                  >
                    I
                  </button>
                  <button
                    onClick={() => format("underline")}
                    className={`px-2 border rounded underline ${
                      activeFormat.underline ? "bg-gray-200" : ""
                    }`}
                  >
                    U
                  </button>

                  <button
                    onClick={() => clearBlock(i)}
                    className="ml-auto text-orange-600 text-sm"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => removeBlock(i)}
                    className="text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              )}

              {block.type !== "image" && (
                <div
                  ref={(el) => (editorRefs.current[i] = el)}
                  contentEditable
                  suppressContentEditableWarning
                  data-placeholder={
                    block.type === "heading"
                      ? "Enter heading..."
                      : block.type === "paragraph"
                      ? "Write paragraph..."
                      : block.type === "list"
                      ? "Write list..."
                      : block.type === "quote"
                      ? "Write quote..."
                      : block.type === "faq"
                      ? "Enter FAQ..."
                      : "Write tip..."
                  }
                  onInput={(e) => updateBlock(i, e.currentTarget.innerHTML)}
                  className="input min-h-[80px] editor"
                />
              )}

              {block.type === "image" && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, i)}
                  />
                  {block.value && (
                    <img
                      src={block.value}
                      alt=""
                      className="rounded-lg mt-2 max-h-60"
                    />
                  )}
                  <div className="flex justify-end gap-3 mt-2">
                    <button
                      onClick={() => clearBlock(i)}
                      className="text-orange-600 text-sm"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => removeBlock(i)}
                      className="text-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}