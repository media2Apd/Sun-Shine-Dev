

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

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// import api from "../../common/apiClient";
// import SummaryApi from "../../common/SummaryApi";
// import { useCart } from "../../Context/CartContext";
// import { useWishlist } from "../../Context/WishlistContext";
// import { addToLocalWishlist, removeFromLocalWishlist, getLocalWishlist } from "../../helpers/wishlistHelper";

// const ProductCard = ({ item }) => {
//   const navigate = useNavigate();

//   // ✅ Hooks inside the component
//   const { refreshCart } = useCart();
//   const { refreshWishlist } = useWishlist();

//     // ✅ Compute if this item is liked
//   const [isLiked, setIsLiked] = useState(false);

//   useEffect(() => {
//     const local = getLocalWishlist();
//     setIsLiked(local.some((i) => i.productId === item.id));
//   }, [item.id]);


//   const handleAddToCart = async (e) => {
//     e.stopPropagation();

//     try {
//       await api.post(SummaryApi.addToCart.url, {
//         productId: item.id,
//         variantId: firstVariant?.id,
//         quantity: 1,
//       });

//       toast.success("Added to Cart 🛒");

//       refreshCart(); // 🔥 header update
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleWishlist = async (e) => {
//     e.stopPropagation();

//     try {
//       const token = localStorage.getItem("token");

//       if (token) {
//         if (isLiked) {
//           await api.delete("/api/wishlist/remove", {
//             data: { productId: item.id },
//           });

//           toast.info("Removed from Wishlist ❌");
//           setIsLiked(false);
//         } else {
//           await api.post("/api/wishlist/add", {
//             productId: item.id,
//           });

//           toast.success("Added to Wishlist ❤️");
//           setIsLiked(true);
//         }
//       } else {
//         // guest
//         if (isLiked) {
//           removeFromLocalWishlist(item.id);
//           setIsLiked(false);
//         } else {
//           addToLocalWishlist(item);
//           setIsLiked(true);
//         }
//       }

//       refreshWishlist(); // 🔥 header update
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const price = item.price ?? item.variants?.[0]?.price;
//   const mrp = item.oldPrice ?? item.variants?.[0]?.mrp;
//   const firstVariant = item.variants?.[0] ?? null;

//   const handleCardClick = () => {
//     navigate(`/category-products/product-overview`, { state: { id: item.id } });
//   };

//   return (
//     <div
//       onClick={handleCardClick}
//       className="group bg-white border border-[#E6E6E6] rounded-xl shadow-sm hover:shadow-[0_0_15px_rgba(34,197,94,0.35)] hover:ring-2 hover:ring-[#2C742F] transition duration-300 cursor-pointer overflow-hidden"
//     >
//       <img src={item.image?.url} alt={item.name} className="w-full object-contain" />

//       <div className="p-4">
//         <h3 className="text-base text-gray-700 mb-3 leading-relaxed transition group-hover:text-green-600">
//           {item.name}
//         </h3>

//         <div className="flex items-center gap-3 mb-4">
//           <span className="text-xl font-semibold text-gray-900">Rs.{price}</span>
//           <span className="text-sm text-gray-400 line-through">Rs.{mrp}</span>
//         </div>

//         <div className="flex justify-between items-center">
//           {/* Add to Cart */}
//           <button
//             onClick={handleAddToCart}
//             className={`px-6 py-2 text-sm font-medium rounded-md transition bg-gray-200
             
//                 ? "bg-green-600 text-white"
//                 : "bg-gray-200 text-black hover:bg-green-600 hover:text-white"
//             }`}
//           >
//             Add to Cart
//           </button>

//           {/* Heart */}

//           <button
//         onClick={handleWishlist}
//   className={`w-10 h-10 flex items-center justify-center text-xl rounded-md transition ${
//     isLiked
//       ? "bg-green-600 text-white"
//       : "bg-gray-200 text-gray-600 hover:bg-green-600 hover:text-white"
//   }`}
// >
//   ♥
// </button>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;



// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// import api from "../../common/apiClient";
// import SummaryApi from "../../common/SummaryApi";
// import { useCart } from "../../Context/CartContext";
// import { useWishlist } from "../../Context/WishlistContext";
// import { addToLocalWishlist, removeFromLocalWishlist, getLocalWishlist } from "../../helpers/wishlistHelper";
// import { CiHeart } from "react-icons/ci";

// const ProductCard = ({ item }) => {
//   const navigate = useNavigate();

//   const { refreshCart } = useCart();
//   const { refreshWishlist } = useWishlist();

//   const [isLiked, setIsLiked] = useState(false);

//   // ✅ FIX: _id
//   useEffect(() => {
//     const local = getLocalWishlist();
//     setIsLiked(local.some((i) => i.productId === item._id));
//   }, [item._id]);

//   const firstVariant = item.variants?.[0] ?? null;

//   const handleAddToCart = async (e) => {
//     e.stopPropagation();

//     try {
//       await api.post(SummaryApi.addToCart.url, {
//         productId: item._id,          // ✅ FIX
//         variantId: firstVariant?._id, // ✅ FIX
//         quantity: 1,
//       });

//       toast.success("Added to Cart 🛒");
//       refreshCart();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleWishlist = async (e) => {
//     e.stopPropagation();

//     try {
//       const token = localStorage.getItem("token");

//       if (token) {
//         if (isLiked) {
//           await api.delete("/api/wishlist/remove", {
//             data: { productId: item._id }, // ✅ FIX
//           });

//           toast.info("Removed from Wishlist ❌");
//           setIsLiked(false);
//         } else {
//           await api.post("/api/wishlist/add", {
//             productId: item._id, // ✅ FIX
//           });

//           toast.success("Added to Wishlist ❤️");
//           setIsLiked(true);
//         }
//       } else {
//         if (isLiked) {
//           removeFromLocalWishlist(item._id);
//           setIsLiked(false);
//         } else {
//           addToLocalWishlist({
//             productId: item._id,
//             name: item.name,
//             image: item.images?.[0]?.url,
//             price: item.variants?.[0]?.price,
//           });
//           setIsLiked(true);
//         }
//       }

//       refreshWishlist();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const price = item.price ?? item.variants?.[0]?.price;
//   const mrp = item.oldPrice ?? item.variants?.[0]?.mrp;

//   const handleCardClick = () => {
//     navigate(`/category-products/product-overview`, {
//       state: { id: item._id }, // ✅ FIX
//     });
//   };

//   return (
//     <div
//       onClick={handleCardClick}
//       className="group bg-white border border-[#E6E6E6] rounded-xl shadow-sm hover:shadow-[0_0_15px_rgba(34,197,94,0.35)] hover:ring-2 hover:ring-[#2C742F] transition duration-300 cursor-pointer overflow-hidden"
//     >
//       {/* ✅ ONLY FIX IMAGE SOURCE (STYLE SAME) */}
//       <img
//         src={item.images?.[0]?.url}
//         alt={item.name}
//         className="w-full object-contain"
//       />

//       <div className="p-4">
//         <h3 className="text-base text-gray-700 mb-3 leading-relaxed transition group-hover:text-green-600">
//           {item.name}
//         </h3>

//         <div className="flex items-center gap-3 mb-4">
//           <span className="text-xl font-semibold text-gray-900">Rs.{price}</span>
//           <span className="text-sm text-gray-400 line-through">Rs.{mrp}</span>
//         </div>

//         <div className="flex justify-between items-center">
//           {/* ✅ FIX BUTTON CLASS ONLY */}
//           <button
//             onClick={handleAddToCart}
//             className="px-6 py-2 text-sm font-medium rounded-md transition bg-gray-200 text-black hover:bg-green-600 hover:text-white"
//           >
//             Add to Cart
//           </button>

//           {/* ❤️ */}
//           <button
//             onClick={handleWishlist}
//             className={`w-10 h-10 flex items-center justify-center text-xl rounded-md transition ${
//               isLiked
//                 ? "bg-green-600 text-white"
//                 : "bg-gray-200 text-gray-600 hover:bg-green-600 hover:text-white"
//             }`}
//           >
//             ♥
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { addToLocalCart } from "../../helpers/cartHelper";
import api from "../../common/apiClient";
import SummaryApi from "../../common/SummaryApi";
import { useCart } from "../../Context/CartContext";
import { useWishlist } from "../../Context/WishlistContext";
import { addToLocalWishlist, removeFromLocalWishlist, getLocalWishlist } from "../../helpers/wishlistHelper";
import { CiHeart } from "react-icons/ci";


const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const { refreshCart } = useCart();
  const { refreshWishlist } = useWishlist();

  const [isLiked, setIsLiked] = useState(false);

  // ✅ FIX: use _id
  useEffect(() => {
    const local = getLocalWishlist();
    setIsLiked(local.some((i) => i.productId === item._id));
  }, [item._id]);

  const firstVariant = item.variants?.[0] ?? null;

  // 🔥 ADD TO CART
  const handleAddToCart = async (e) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");

    try {
      if (token) {
        // ✅ BACKEND
        await api.post(SummaryApi.addToCart.url, {
          productId: item._id,
          variantId: firstVariant?._id,
          quantity: 1,
        });
      } else {
        // ✅ LOCAL STORAGE
        addToLocalCart(item, firstVariant);
      }

      toast.success("Added to Cart 🛒");
      refreshCart();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 WISHLIST
  const handleWishlist = async (e) => {
    e.stopPropagation();

    try {
      const token = localStorage.getItem("token");

      if (token) {
        if (isLiked) {
          await api.delete("/api/wishlist/remove", {
            data: { productId: item._id }, // ✅ FIX
          });

          toast.info("Removed from Wishlist ❌");
          setIsLiked(false);
        } else {
          await api.post("/api/wishlist/add", {
            productId: item._id, // ✅ FIX
          });

          toast.success("Added to Wishlist ❤️");
          setIsLiked(true);
        }
      } else {
        if (isLiked) {
          removeFromLocalWishlist(item._id);
          setIsLiked(false);
        } else {
          addToLocalWishlist({
            productId: item._id,   // ✅ FIX
            name: item.name,
            image: item.images?.[0]?.url,
            price: item.variants?.[0]?.price,
          });
          setIsLiked(true);
        }
      }

      refreshWishlist();
    } catch (err) {
      console.log(err);
    }
  };

  const price = item.variants?.[0]?.price;
  const mrp = item.variants?.[0]?.mrp;

  const handleCardClick = () => {
    navigate(`/category-products/product-overview`, {
      state: { id: item._id }, // ✅ FIX
    });
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white border border-[#E6E6E6] rounded-xl shadow-sm hover:shadow-[0_0_15px_rgba(34,197,94,0.35)] hover:ring-2 hover:ring-[#2C742F] transition duration-300 cursor-pointer overflow-hidden"
    >
      <div className="bg-[#F2F2F2]">
      {/* ✅ FIX IMAGE */}
      <img
        src={item.images?.[0]?.url}
        alt={item.name}
        className="w-full h-56 object-contain p-2"
      />
      </div>

      <div className="p-4">
        <h3 className="text-base text-gray-700 mb-3 group-hover:text-green-600">
          {item.name}
        </h3>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-semibold text-gray-900">
            Rs.{price}
          </span>
          <span className="text-sm text-gray-400 line-through">
            Rs.{mrp}
          </span>
        </div>

        <div className="flex justify-between items-center">
          {/* ✅ FIX BUTTON */}
          <button
            onClick={handleAddToCart}
            className="px-6 py-2 text-sm font-medium rounded-md bg-[#F2F2F2] text-black hover:bg-green-600 hover:text-white transition"
          >
            Add to Cart
          </button>

          {/* ❤️ Wishlist */}
          <button
            onClick={handleWishlist}
            className={`w-10 h-10 flex items-center justify-center text-xl rounded-md transition ${
              isLiked
                ? "bg-green-600 text-white"
                : "bg-[#F2F2F2] text-gray-600 hover:bg-green-600 hover:text-white"
            }`}
          >
           <CiHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
