// import { useContext, useState, useRef, useEffect } from "react";

// import { ProductContext } from "../Context/ProductContext";
// import { FiSearch, FiPlus } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { MoreHorizontal  } from "lucide-react";

// /* ================= ACTION MENU ================= */

// const ActionMenu = ({ item, openMenuId, setOpenMenuId }) => {

//   const { deleteProduct, toggleHideProduct } = useContext(ProductContext);
//   const navigate = useNavigate();

//   const isOpen = openMenuId === item.id;
//   const btnRef = useRef(null);

//   const [position, setPosition] = useState({ top: 0, left: 0 });

//   const handleToggle = () => {
//     if (isOpen) {
//       setOpenMenuId(null);
//     } else {
//       const rect = btnRef.current.getBoundingClientRect();

//       // smart position
//       let top = rect.bottom + 5;
//       let left = rect.right - 150;

//       // if near bottom → open மேல
//       if (window.innerHeight - rect.bottom < 150) {
//         top = rect.top - 150;
//       }

//       // if near right edge → adjust
//       if (window.innerWidth - rect.right < 150) {
//         left = rect.left - 120;
//       }

//       setPosition({ top, left });
//       setOpenMenuId(item.id);
//     }
//   };

//   return (
//     <>
//       <button
//         ref={btnRef}
//         onClick={handleToggle}
//         className="p-1 hover:bg-gray-100 rounded"
//       >
//         < MoreHorizontal size={20} />
//       </button>

//       {isOpen && (
//         <div
//           className="fixed w-40 bg-white border rounded-lg shadow-lg text-sm z-[9999]"
//           style={{ top: position.top, left: position.left }}
//         >
//           <button
//             onClick={() => deleteProduct(item.id)}
//             className="block w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100 border-b"
//           >
//             Delete
//           </button>

//           <button
//             onClick={() => toggleHideProduct(item.id)}
//             className="block w-full text-left px-3 py-2 hover:bg-gray-100 border-b"
//           >
//             {item.showOnWebsite ? "Hide" : "Show"}
//           </button>

//           <button
//             onClick={() => navigate(`/admin-panel/edit-product/${item.id}`)}
//             className="block w-full text-left px-3 py-2 hover:bg-gray-100 border-b"
//           >
//             Edit
//           </button>

//           <button
//             onClick={() => navigate(`/admin-panel/view-product/${item.id}`)}
//             className="block w-full text-left px-3 py-2 text-green-600 hover:bg-gray-100"
//           >
//             View
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// /* ================= PRODUCT LIST ================= */

// const ProductList = () => {

//   const { products } = useContext(ProductContext);
//   const navigate = useNavigate();

//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [subCategory] = useState("");
//   const [status, setStatus] = useState("");
//   const [openMenuId, setOpenMenuId] = useState(null);

//   const categories = [...new Set(products.map((p) => p.category))];

//   const filteredProducts = products
//     .filter((item) =>
//       item.name.toLowerCase().includes(search.toLowerCase())
//     )
//     .filter((item) =>
//       category ? item.category === category : true
//     )
//     .filter((item) =>
//       subCategory ? item.subCategory === subCategory : true
//     )
//     .filter((item) =>
//       status
//         ? status === "Show"
//           ? item.showOnWebsite === true
//           : item.showOnWebsite === false
//         : true
//     );

//   return (
//     <div className="p-1">

//       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
//         <h2 className="text-xl md:text-2xl font-bold">Products</h2>

//         <button className="bg-green-600 text-white px-3 py-1 rounded-lg w-full md:w-auto">
//           Export
//         </button>
//       </div>

//       <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-6">

//         <div className="flex flex-col md:flex-row gap-3 w-full">

//           <select
//             className="border px-3 py-2 rounded-lg w-full md:w-auto"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">All Categories</option>
//             {categories.map((cat, i) => (
//               <option key={i}>{cat}</option>
//             ))}
//           </select>

//           <select
//             className="border px-3 py-2 rounded-lg w-full md:w-auto"
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//           >
//             <option value="">All Status</option>
//             <option value="Hide">Hide</option>
//             <option value="Show">Show</option>
//           </select>

//         </div>

//         <div className="flex gap-2">

//           <div className="relative">
//             <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           <button
//             onClick={() => navigate("/admin-panel/product-list/create-product")}
//             className="bg-green-600 text-white px-3 py-2 rounded-lg"
//           >
//             <FiPlus />
//           </button>

//         </div>

//       </div>

//       <div className="bg-white rounded-xl overflow-x-auto">

//         <table className="min-w-full border-separate border-spacing-y-3 text-sm">

//           <thead>
//             <tr className="bg-gray-100 text-center">
//               <th className="py-3 px-4 rounded-l-lg">Category</th>
//               <th className="py-3 px-4">Product</th>
//               <th className="py-3 px-4">Stock</th>
//               <th className="py-3 px-4">Date</th>
//               <th className="py-3 px-4">Status</th>
//               <th className="py-3 px-4 rounded-r-lg">Action</th>
//             </tr>
//           </thead>

//           <tbody>

//             {filteredProducts.map((item) => (

//               <tr key={item.id} className="text-center">

//                 <td className="py-3 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">
//                   {item.category}
//                 </td>

//                 <td className="py-3 px-4 bg-white border-y border-gray-200">
//                   {item.name}
//                 </td>

//                 <td className="py-3 px-4 bg-white border-y border-gray-200">
//                   {item.variants?.reduce(
//                     (t, v) => t + Number(v.stock || 0), 0
//                   )}
//                 </td>

//                 <td className="py-3 px-4 bg-white border-y border-gray-200">
//                   {item.date}
//                 </td>

//                 <td className="py-3 px-4 bg-white border-y border-gray-200">
//                   {item.showOnWebsite ? (
//                     <span className="text-green-600">● Show</span>
//                   ) : (
//                     <span className="text-red-500">● Hide</span>
//                   )}
//                 </td>

//                 <td className="py-3 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg">
//                   <ActionMenu
//                     item={item}
//                     openMenuId={openMenuId}
//                     setOpenMenuId={setOpenMenuId}
//                   />
//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// };

// export default ProductList;

import { useContext, useState, useRef, useEffect } from "react";
import { ProductContext } from "../Context/ProductContext";
import { FiSearch, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";

/* ================= ACTION MENU ================= */

const ActionMenu = ({ item, openMenuId, setOpenMenuId }) => {

  const { deleteProduct, toggleHideProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const isOpen = openMenuId === item.id;
  const btnRef = useRef(null);
  const menuRef = useRef(null); // ✅ NEW

  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleToggle = () => {
    if (isOpen) {
      setOpenMenuId(null);
    } else {
      const rect = btnRef.current.getBoundingClientRect();

      let top = rect.bottom + 5;
      let left = rect.right - 150;

      if (window.innerHeight - rect.bottom < 150) {
        top = rect.top - 150;
      }

      if (window.innerWidth - rect.right < 150) {
        left = rect.left - 120;
      }

      setPosition({ top, left });
      setOpenMenuId(item.id);
    }
  };

  // ✅ OUTSIDE CLICK CLOSE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !btnRef.current.contains(event.target)
      ) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenMenuId]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleToggle}
        className="p-1 hover:bg-gray-100 rounded"
      >
        <MoreHorizontal size={20} />
      </button>

      {isOpen && (
        <div
          ref={menuRef} // ✅ IMPORTANT
          className="fixed w-40 bg-white border rounded-lg shadow-lg text-sm z-[9999]"
          style={{ top: position.top, left: position.left }}
        >
          <button
            onClick={() => deleteProduct(item.id)}
            className="block w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100 border-b"
          >
            Delete
          </button>

          <button
            onClick={() => toggleHideProduct(item.id)}
            className="block w-full text-left px-3 py-2 hover:bg-gray-100 border-b"
          >
            {item.showOnWebsite ? "Hide" : "Show"}
          </button>

          <button
            onClick={() => navigate(`/admin-panel/edit-product/${item.id}`)}
            className="block w-full text-left px-3 py-2 hover:bg-gray-100 border-b"
          >
            Edit
          </button>

          <button
            onClick={() => navigate(`/admin-panel/view-product/${item.id}`)}
            className="block w-full text-left px-3 py-2 text-green-600 hover:bg-gray-100"
          >
            View
          </button>
        </div>
      )}
    </>
  );
};

/* ================= PRODUCT LIST ================= */

const ProductList = () => {

  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory] = useState("");
  const [status, setStatus] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = products
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) =>
      category ? item.category === category : true
    )
    .filter((item) =>
      subCategory ? item.subCategory === subCategory : true
    )
    .filter((item) =>
      status
        ? status === "Show"
          ? item.showOnWebsite === true
          : item.showOnWebsite === false
        : true
    );

  return (
    <div className="p-1">

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Products</h2>

        <button className="bg-green-600 text-white px-3 py-1 rounded-lg w-full md:w-auto">
          Export
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-6">

        <div className="flex flex-col md:flex-row gap-3 w-full">

          <select
            className="border px-3 py-2 rounded-lg w-full md:w-auto"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat, i) => (
              <option key={i}>{cat}</option>
            ))}
          </select>

          <select
            className="border px-3 py-2 rounded-lg w-full md:w-auto"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Hide">Hide</option>
            <option value="Show">Show</option>
          </select>

        </div>

        <div className="flex gap-2">

          <div className="relative">
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            onClick={() => navigate("/admin-panel/product-list/create-product")}
            className="bg-green-600 text-white px-3 py-2 rounded-lg"
          >
            <FiPlus />
          </button>

        </div>

      </div>

      <div className="bg-white rounded-xl overflow-x-auto">

        <table className="min-w-full border-separate border-spacing-y-3 text-sm">

          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="py-3 px-4 rounded-l-lg">Category</th>
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 rounded-r-lg">Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredProducts.map((item) => (

              <tr key={item.id} className="text-center">

                <td className="py-3 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">
                  {item.category}
                </td>

                <td className="py-3 px-4 bg-white border-y border-gray-200">
                  {item.name}
                </td>

                <td className="py-3 px-4 bg-white border-y border-gray-200">
                  {item.variants?.reduce(
                    (t, v) => t + Number(v.stock || 0), 0
                  )}
                </td>

                <td className="py-3 px-4 bg-white border-y border-gray-200">
                  {item.date}
                </td>

                <td className="py-3 px-4 bg-white border-y border-gray-200">
                  {item.showOnWebsite ? (
                    <span className="text-green-600">● Show</span>
                  ) : (
                    <span className="text-red-500">● Hide</span>
                  )}
                </td>

                <td className="py-3 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg">
                  <ActionMenu
                    item={item}
                    openMenuId={openMenuId}
                    setOpenMenuId={setOpenMenuId}
                  />
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ProductList;