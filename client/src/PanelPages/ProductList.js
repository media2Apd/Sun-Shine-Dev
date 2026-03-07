import { useContext, useState } from "react";
import { ProductContext } from "../Context/ProductContext";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

const ProductList = () => {

  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [status, setStatus] = useState("");

  const categories = [...new Set(products.map((p) => p.category))];
  const subCategories = [...new Set(products.map((p) => p.subCategory))];

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
        ? status === "Published"
          ? item.status === true
          : item.status === false
        : true
    );

  return (
    <div className="p-1">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">

        <h2 className="text-xl md:text-2xl font-bold">Products</h2>

        <button className="bg-green-600 text-white px-3 py-1 rounded-lg w-full md:w-auto">
          Export
        </button>

      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">

        {/* LEFT FILTERS */}
        <div className="flex flex-col md:flex-row gap-3 w-full">

          {/* CATEGORY */}
          <select
            className="border px-1 py-2 rounded-lg w-full md:w-auto"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>

            {categories.map((cat, index) => (
              <option key={index}>{cat}</option>
            ))}

          </select>

          {/* SUB CATEGORY */}
          <select
            className="border px-3 py-2 rounded-lg w-full md:w-auto"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="">Sub Categories</option>

            {subCategories.map((sub, index) => (
              <option key={index}>{sub}</option>
            ))}

          </select>

          {/* STATUS */}
          <select
            className="border px-3 py-2 rounded-lg w-full md:w-auto"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Published">Published</option>
            <option value="Deleted">Deleted</option>
          </select>

        </div>   



         {/* SEARCH BAR + Add Button */}    
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <div className="relative flex-1">
       <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
       <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="pl-9 pr-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  </div>
  {/* ADD BUTTON */}
  {/* Round Icon Button - 430px above */}
<button
  onClick={() => navigate("/admin-panel/create-product")}
  className="bg-green-600 text-white w-10 h-10 items-center justify-center rounded-full hover:bg-green-700 hidden min-[431px]:flex"
>
  <FiPlus size={26} />
</button>

{/* Mobile Button - below 430px */}
<button
  onClick={() => navigate("/admin-panel/create-product")}
  className="bg-green-600 text-white px-3 py-2 rounded-lg w-full max-[430px]:block hidden"
>
  + Add
</button>
        </div>
        </div>

      
      {/* TABLE */}
      {/* <div className="bg-white rounded-xl shadow overflow-x-auto">
  <table className="min-w-[800px] w-full text-sm border-separate border-spacing-y-3">
    
    <thead className="bg-[#F9FCFF]">
      <tr>
        <th className="p-3 text-left text-[#000000] rounded-l-lg">ID</th>
        <th className="p-3 text-left text-[#000000]">Category</th>
        <th className="p-3 text-left text-[#000000]">Product Name</th>
        <th className="p-3 text-left text-[#000000]">Price</th>
        <th className="p-3 text-left text-[#000000]">Stock</th>
        <th className="p-3 text-left text-[#000000]">Date</th>
        <th className="p-3 text-left text-[#000000]">Status</th>
        <th className="p-3 text-left text-[#000000] rounded-r-lg">Action</th>
      </tr>
    </thead>

    <tbody>
      {filteredProducts.map((item) => (
        <tr key={item.id} className="bg-white shadow-sm">

          <td className="p-3 border border-gray-200 border-r-0 rounded-l-lg">
            {item.id}
          </td>

          <td className="p-3 border border-gray-200 border-x-0">
            {item.category}
          </td>

          <td className="p-3 border border-gray-200 border-x-0">
            {item.name}
          </td>

          <td className="p-3 border border-gray-200 border-x-0">
            ₹{item.price}
          </td>

          <td className="p-3 border border-gray-200 border-x-0">
            {item.stock === 0 ? (
              <span className="text-red-500">Out of Stock</span>
            ) : (
              <span>In Stock</span>
            )}
          </td>

          <td className="p-3 border border-gray-200 border-x-0">
            {item.date}
          </td>

          <td className="p-3 border border-gray-200 border-x-0">
            {item.status ? (
              <span className="text-green-600">● Published</span>
            ) : (
              <span className="text-red-500">● Deleted</span>
            )}
          </td>

          <td className="p-3 border border-gray-200 border-l-0 rounded-r-lg">
            ...
          </td>

        </tr>
      ))}
    </tbody>

  </table>
</div> */}

{/* <div className="bg-white rounded-xl shadow overflow-x-auto">
  <table className="min-w-[800px] w-full text-sm border-separate border-spacing-y-3">

    <thead className="bg-[#F9FCFF]">
      <tr>
        <th className="p-3 text-left text-[#000000] rounded-l-lg">ID</th>
        <th className="p-3 text-left text-[#000000]">Category</th>
        <th className="p-3 text-left text-[#000000]">Product Name</th>
        <th className="p-3 text-left text-[#000000]">Price</th>
        <th className="p-3 text-left text-[#000000]">Stock</th>
        <th className="p-3 text-left text-[#000000]">Date</th>
        <th className="p-3 text-left text-[#000000]">Status</th>
        <th className="p-3 text-left text-[#000000] rounded-r-lg">Action</th>
      </tr>
    </thead>

    <tbody>
      {filteredProducts.map((item) => (
        <tr
          key={item.id}
          className="bg-white border border-gray-200 shadow-sm rounded-lg"
        >

          <td className="p-3 rounded-l-lg">{item.id}</td>

          <td className="p-3">{item.category}</td>

          <td className="p-3">{item.name}</td>

          <td className="p-3">₹{item.price}</td>

          <td className="p-3">
            {item.stock === 0 ? (
              <span className="text-red-500">Out of Stock</span>
            ) : (
              <span>In Stock</span>
            )}
          </td>

          <td className="p-3">{item.date}</td>

          <td className="p-3">
            {item.status ? (
              <span className="text-green-600">● Published</span>
            ) : (
              <span className="text-red-500">● Deleted</span>
            )}
          </td>

          <td className="p-3 rounded-r-lg">...</td>

        </tr>
      ))}
    </tbody>

  </table>
</div> */}

<div className="bg-white rounded-xl shadow overflow-x-auto">
  <table className="min-w-[800px] w-full text-sm border-separate border-spacing-y-3">
    
    <thead className="bg-[#F9FCFF]">
      <tr>
        <th className="p-3 text-left text-[#000000] rounded-l-lg">ID</th>
        <th className="p-3 text-left text-[#000000]">Category</th>
        <th className="p-3 text-left text-[#000000]">Product Name</th>
        <th className="p-3 text-left text-[#000000]">Price</th>
        <th className="p-3 text-left text-[#000000]">Stock</th>
        <th className="p-3 text-left text-[#000000]">Date</th>
        <th className="p-3 text-left text-[#000000]">Status</th>
        <th className="p-3 text-left text-[#000000] rounded-r-lg">Action</th>
      </tr>
    </thead>

    <tbody>
      {filteredProducts.map((item) => (
        <tr key={item.id} className="bg-white shadow-sm">

          <td className="p-3 border border-gray-200 border-r-0 rounded-l-lg">
            {item.id}
          </td>

          <td className="p-3 border border-gray-200 border-x-0">
            {item.category}
          </td>

          <td className="p-3 border border-gray-200 border-x-0">
            {item.name}
          </td>

          <td className="p-3 border border-gray-200 border-x-0">
            ₹{item.price}
          </td>

          <td className="p-3 border border-gray-200 border-x-0">
            {item.stock === 0 ? (
              <span className="text-red-500">Out of Stock</span>
            ) : (
              <span>In Stock</span>
            )}
          </td>

          <td className="p-3 border border-gray-200 border-x-0">
            {item.date}
          </td>

          <td className="p-3 border border-gray-200 border-x-0">
            {item.status ? (
              <span className="text-green-600">● Published</span>
            ) : (
              <span className="text-red-500">● Deleted</span>
            )}
          </td>

          <td className="p-3 border border-gray-200 border-l-0 rounded-r-lg">
            ...
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