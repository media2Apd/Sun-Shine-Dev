
import { useContext, useState } from "react";
import { CategoryContext } from "../Context/CategoryContext";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import {
  FiCalendar,
  FiSearch,
  FiMoreHorizontal,
} from "react-icons/fi";

const CategoryList = () => {
  const context = useContext(CategoryContext);
  const navigate = useNavigate();

  const category = context?.category || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  // const [openMenuId, setOpenMenuId] = useState(null);

  const visibleProducts = category.filter(
    (item) => item.showOnWebsite === true
  );

  const filteredProducts = visibleProducts
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      selectedDate
        ? item.createdDate === new Date(selectedDate).toLocaleDateString()
        : true
    );

  
  return (
    <div className="p-1">

      {/* TITLE */}
      <div className="text-xl md:text-2xl font-bold pb-4">
        Product Category List
      </div>

      {/* FILTER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3 mb-6">

        {/* DATE */}
        <div className="relative w-full md:w-auto">
          <FiCalendar className="absolute left-3 top-3 text-gray-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* SEARCH */}
        <div className="relative w-full md:w-auto">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

    {/* CREATE PRODUCT BUTTON */}
       {/* Round Icon Button - 430px above */}
<button
  onClick={() => navigate("/admin-panel/create-category")}
  className="bg-green-600 text-white w-10 h-10 items-center justify-center rounded-full hover:bg-green-700 hidden min-[431px]:flex"
>
  <FiPlus size={26} />
</button>

{/* Mobile Button - below 430px */}
<button
  onClick={() => navigate("/admin-panel/create-category")}
  className="bg-green-600 text-white px-3 py-2 rounded-lg w-full max-[430px]:block hidden"
>
  + Add
</button>

      </div>


    {/*TABLE */}      
      
<div className="bg-white rounded-xl overflow-x-auto">

  <table className="min-w-full border-separate border-spacing-y-3">

    {/* HEADER */}
    <thead className="text-sm text-gray-600">
      <tr className="text-center bg-gray-100">
        <th className="py-4 px-4 rounded-l-lg">Name</th>
        <th className="py-4 px-4">Products</th>
        <th className="py-4 px-4">Status</th>
        <th className="py-4 px-4">Visibility</th>
        <th className="py-4 px-4">Created</th>
        <th className="py-4 px-4 rounded-r-lg">Action</th>
      </tr>
    </thead>

    {/* BODY */}
    <tbody>
      {filteredProducts.length === 0 ? (
        <tr>
          <td colSpan="6" className="p-4 text-center text-gray-400">
            No matching category found
          </td>
        </tr>
      ) : (
        filteredProducts.map((item) => (
         
          <tr key={item.id} className="text-sm text-center">

  {/* NAME */}
  <td className="py-4 px-4 bg-white border-y border-l border-gray-200 rounded-l-lg">
    {item.name}
  </td>

  {/* PRODUCTS */}
  <td className="py-4 px-4 bg-white border-y border-gray-200">
    {item.productCount}
  </td>

  {/* STATUS */}
  <td className="py-4 px-4 bg-white border-y border-gray-200">
    {item.status}
  </td>

  {/* VISIBILITY */}
  <td className="py-4 px-4 bg-white border-y border-gray-200">
    {item.showOnWebsite ? "Visible" : "Hidden"}
  </td>

  {/* CREATED */}
  <td className="py-4 px-4 bg-white border-y border-gray-200">
    {item.createdDate}
  </td>

  {/* ACTION */}
  <td className="py-4 px-4 bg-white border-y border-r border-gray-200 rounded-r-lg">
    <FiMoreHorizontal />
  </td>

</tr>
        ))
      )}
    </tbody>

  </table>

</div>

    </div>
  );
};

export default CategoryList;


