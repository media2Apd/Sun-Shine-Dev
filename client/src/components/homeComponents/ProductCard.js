

// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { CartContext } from "../../Context/CartContext";
// import { WishlistContext } from "../../Context/WishlistContext";


// const { addToWishlist, removeFromWishlist, wishlist } = useContext(WishlistContext);

// const isLiked = wishlist.some((i) => i.id === item.id);
// const ProductCard = ({ item }) => {

// const navigate = useNavigate();
// const { addToCart } = useContext(CartContext);

// const [added, setAdded] = useState(false);
// const [liked, setLiked] = useState(false);

// const price = item.price ?? item.variants?.[0]?.price;
// const mrp = item.oldPrice ?? item.variants?.[0]?.mrp;
// const firstVariant = item.variants?.[0] ?? null;

// const handlecardClick = () => {
//   navigate(`/category-products/product-overview`, {
//     state: { id: item.id }
//   });
// };

// return (

// <div
// onClick={handlecardClick}
// className="group bg-white border border-[#E6E6E6] rounded-xl shadow-sm hover:shadow-[0_0_15px_rgba(34,197,94,0.35)] hover:ring-2 hover:ring-[#2C742F] transition duration-300 cursor-pointer overflow-hidden">

// <img
// src={item.image}
// alt={item.name}
// className="w-full object-contain"
// />

// <div className="p-4">

// <h3 className="text-base text-gray-700 mb-3 leading-relaxed transition group-hover:text-green-600">
// {item.name}
// </h3>

// <div className="flex items-center gap-3 mb-4">

// <span className="text-xl font-semibold text-gray-900">
// Rs.{price}
// </span>

// <span className="text-sm text-gray-400 line-through">
// Rs.{mrp}
// </span>

// </div>

// <div className="flex justify-between items-center">

// {/* Add to Cart */}

// <button
// onClick={(e) => {
// e.stopPropagation();
// setAdded(!added);
// addToCart(item, firstVariant);
// }}
// className={`px-6 py-2 text-sm font-medium rounded-md transition
// ${added 
// ? "bg-green-600 text-white" 
// : "bg-gray-200 text-black hover:bg-green-600 hover:text-white"}`}
// >
// Add to Cart
// </button>

// {/* Heart */}

// {/* <button
// onClick={(e) => {
// e.stopPropagation();
// setLiked(!liked);
// }}
// className={`w-10 h-10 flex items-center justify-center text-xl rounded-md transition
// ${liked 
// ? "bg-green-600 text-white" 
// : "bg-gray-200 text-gray-600 hover:bg-green-600 hover:text-white"}`}
// >
// ♡
// </button> */}

// <button
// onClick={(e) => {
//   e.stopPropagation();

//   if (isLiked) {
//     removeFromWishlist(item.id);
//   } else {
//     addToWishlist(item);
//   }
// }}
// className={`w-10 h-10 flex items-center justify-center text-xl rounded-md transition
// ${isLiked 
// ? "bg-green-600 text-white" 
// : "bg-gray-200 text-gray-600 hover:bg-green-600 hover:text-white"}`}
// >
// ♥
// </button>

// </div>

// </div>

// </div>

// );
// };

// export default ProductCard;

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import { toast } from "react-toastify";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();

  // ✅ Hooks inside the component
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlist } = useContext(WishlistContext);

  const [added, setAdded] = useState(false);

  // ✅ Compute if this item is liked
  const isLiked = wishlist.some((i) => i.id === item.id);

  const price = item.price ?? item.variants?.[0]?.price;
  const mrp = item.oldPrice ?? item.variants?.[0]?.mrp;
  const firstVariant = item.variants?.[0] ?? null;

  const handleCardClick = () => {
    navigate(`/category-products/product-overview`, { state: { id: item.id } });
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white border border-[#E6E6E6] rounded-xl shadow-sm hover:shadow-[0_0_15px_rgba(34,197,94,0.35)] hover:ring-2 hover:ring-[#2C742F] transition duration-300 cursor-pointer overflow-hidden"
    >
      <img src={item.image} alt={item.name} className="w-full object-contain" />

      <div className="p-4">
        <h3 className="text-base text-gray-700 mb-3 leading-relaxed transition group-hover:text-green-600">
          {item.name}
        </h3>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-semibold text-gray-900">Rs.{price}</span>
          <span className="text-sm text-gray-400 line-through">Rs.{mrp}</span>
        </div>

        <div className="flex justify-between items-center">
          {/* Add to Cart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setAdded(!added);
              addToCart(item, firstVariant);
              toast.success("Added to Cart 🛒");
            }} 
            className={`px-6 py-2 text-sm font-medium rounded-md transition bg-gray-200
             
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-black hover:bg-green-600 hover:text-white"
            }`}
          >
            Add to Cart
          </button>

          {/* Heart */}
          {/* <button
            onClick={(e) => {
              e.stopPropagation();
              if (isLiked) removeFromWishlist(item.id);
              else addToWishlist(item);
            }}
            className={`w-10 h-10 flex items-center justify-center text-xl rounded-md transition ${
              isLiked
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-green-600 hover:text-white"
            }`}
          >
            ♥
          </button> */}

          <button
  onClick={(e) => {
    e.stopPropagation();
    if (isLiked){ removeFromWishlist(item.id);
    toast.info("Removed from Wishlist");}
    else{ addToWishlist(item);
    toast.success("Added to Wishlist");}
  }}
  className={`w-10 h-10 flex items-center justify-center text-xl rounded-md transition ${
    isLiked
      ? "bg-green-600 text-white"
      : "bg-gray-200 text-gray-600 hover:bg-green-600 hover:text-white"
  }`}
>
  ♥
</button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;
