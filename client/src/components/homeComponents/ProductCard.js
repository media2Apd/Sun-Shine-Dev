
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {

const navigate = useNavigate();
const [added, setAdded] = useState(false);
const [liked, setLiked] = useState(false);

const handlecardClick = () => {
// navigate(`/category-products/product-overview/${item.id}`);
navigate(`/category-products/product-overview`);

};

return (

<div
  onClick={handlecardClick}
className="group bg-white border border-[#E6E6E6] rounded-xl shadow-sm hover:shadow-[0_0_15px_rgba(34,197,94,0.35)] hover:ring-2 hover:ring-[#2C742F] transition duration-300 cursor-pointer overflow-hidden">

  {/* Image */}

  <img
    src={item.image}
    alt={item.name}
    className="w-full object-contain"
  />

  {/* Content */}

  <div className="p-4">

    <h3 className="text-base text-gray-700 mb-3 leading-relaxed transition group-hover:text-green-600">
      {item.name}
    </h3>

    <div className="flex items-center gap-3 mb-4">

      <span className="text-xl font-semibold text-gray-900">
        Rs.{item.price}
      </span>

      <span className="text-sm text-gray-400 line-through">
        Rs.{item.oldPrice}
      </span>

    </div>

    <div className="flex justify-between items-center">

      {/* Add to Cart */}

      <button
        onClick={(e) => {
          e.stopPropagation();
          setAdded(!added);
        }}
        className={`px-6 py-2 text-sm font-medium rounded-md transition
        ${added 
          ? "bg-green-600 text-white" 
          : "bg-gray-200 text-black hover:bg-green-600 hover:text-white"}`}
      >
        Add to Cart
      </button>

      {/* Heart */}

      <button
        onClick={(e) => {
          e.stopPropagation();
          setLiked(!liked);
        }}
        className={`w-10 h-10 flex items-center justify-center text-xl rounded-md transition
        ${liked 
          ? "bg-green-600 text-white" 
          : "bg-gray-200 text-gray-600 hover:bg-green-600 hover:text-white"}`}
      >
        ♡
      </button>

    </div>

  </div>

</div>


);
};

export default ProductCard;
