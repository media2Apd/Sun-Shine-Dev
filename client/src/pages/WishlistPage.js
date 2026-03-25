// import { useContext } from "react";
// import { X } from "lucide-react";
// import { WishlistContext } from "../Context/WishlistContext";
// import { CartContext } from "../Context/CartContext";
// import { toast } from "react-toastify";

// export default function WishlistPage() {
//   const { wishlist, removeFromWishlist } = useContext(WishlistContext);
//   const { addToCart } = useContext(CartContext);

//   const handleRemove = (id) => {
//     removeFromWishlist(id);
//     toast.success("Removed from Wishlist ❌");
//   };

//   const handleAddToCart = (item) => {
//     // Add to cart only if in stock
//     if (item.stock && item.stock > 0) {
//       addToCart(item);
//          toast.success("Added to Cart 🛒");
//   } else {
//     toast.error("Out of Stock ❌");
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
//       <div className="bg-white border rounded-xl overflow-hidden">

//         {/* Header */}
//         <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] p-4 border-b text-black-500 text-sm font-medium">
//           <p>Product</p>
//           <p>Price</p>
//           <p>Date Added</p>
//           <p>Stock Status</p>
//           <p></p>
//           <p></p>
//         </div>

//         {/* Empty Wishlist */}
//         {wishlist.length === 0 && (
//           <p className="text-center py-10 text-gray-500">
//             Your Wishlist is Empty 💔
//           </p>
//         )}

//         {/* Wishlist Items */}
//         {wishlist.map((item) => {
//           // Check stock
//           const inStock = item.stock && item.stock > 0;

//           return (
//             <div
//               key={item.id}
//               className="relative grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 md:gap-0 p-4 border-b"
//             >
//               {/* Product */}
//               <div className="flex items-center gap-4">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="h-16 w-16 object-contain"
//                 />
//                 <div>
//                   <p className="font-medium text-sm">{item.name}</p>
//                   <p className="text-xs text-gray-400">{item.name}</p>
//                 </div>
//               </div>

//               {/* Price */}
//               <div className="flex justify-between md:block text-sm">
//                 <span className="md:hidden font-medium">Price :</span>
//                 <span>Rs.{item.price}</span>
//               </div>

//               {/* Date Added */}
//               <div className="flex justify-between md:block text-sm text-gray-600">
//                 <span className="md:hidden font-medium">Date :</span>
//                 <span>{item.date}</span>
//               </div>

//               {/* Stock Status */}
//               <div className="flex justify-between md:block">
//                 <span className="md:hidden font-medium">Stock :</span>
//                 {inStock ? (
//                   <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-md">
//                     In Stock
//                   </span>
//                 ) : (
//                   <span className="bg-red-100 text-red-500 text-xs px-3 py-1 rounded-md">
//                     Out of Stock
//                   </span>
//                 )}
//               </div>

//               {/* Add to Cart Button */}
//               <div>
//                 <button
//                   disabled={!inStock}
//                   onClick={() => handleAddToCart(item)}
//                   className={`px-4 py-2 md:px-3 md:py-1.5 lg:px-5 lg:py-2 
//                     rounded-full text-sm font-medium whitespace-nowrap transition
//                     ${inStock
//                       ? "bg-green-600 text-white hover:bg-green-700"
//                       : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                     }`}
//                 >
//                   Add to Cart
//                 </button>
//               </div>

//               {/* Remove from Wishlist */}
//               <button
//                 onClick={() => handleRemove(item.id)}
//                 className="absolute top-4 right-4 md:static text-gray-400 hover:text-red-500"
//               >
//                 <X size={18} />
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { X } from "lucide-react";
// import { toast } from "react-hot-toast";
// import api from "../common/apiClient";
// import { useWishlist } from "../Context/WishlistContext";
// import { useCart } from "../Context/CartContext";
// import SummaryApi from "../common/SummaryApi";
// import { getLocalWishlist, removeFromLocalWishlist } from "../helpers/wishlistHelper";
// import { addToLocalCart } from "../helpers/cartHelper";

// export default function WishlistPage() {
//   const [wishlist, setWishlist] = useState([]);

//   const { refreshWishlist } = useWishlist();
//   const { refreshCart } = useCart();

//   // 🔥 FETCH WISHLIST
//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   const fetchWishlist = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (token) {
//         const res = await api({
//           url: SummaryApi.getWishlistItems.url,
//           method: SummaryApi.getWishlistItems.method,
//         });

//         setWishlist(res.data?.items || []);
//       } else {
//         const local = getLocalWishlist();
//         setWishlist(local);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleRemove = async (item) => {
//     const token = localStorage.getItem("token");

//     try {
//       if (token) {
//         await api({
//           url: SummaryApi.removeWishlistItem.url,   // ✅ USE THIS
//           method: SummaryApi.removeWishlistItem.method,
//           data: {
//             productId: item.productId || item._id,
//           },
//         });
//       } else {
//         removeFromLocalWishlist(item.productId);
//       }

//       toast.success("Removed from Wishlist ❌");

//       fetchWishlist();
//       refreshWishlist();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//     // 🔥 ADD TO CART
//   const handleAddToCart = async (item) => {
//     const token = localStorage.getItem("token");

//     try {
//       if (token) {
//         await api.post(SummaryApi.addToCart.url, {
//           productId: item.productId || item._id,
//           quantity: 1,
//         });
//       } else {
//         addToLocalCart({
//           _id: item.productId,
//           name: item.name,
//           images: [{ url: item.image }],
//         }, null);
//       }

//       toast.success("Added to Cart 🛒");
//       refreshCart();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
//       <div className="bg-white border rounded-xl overflow-hidden">

//         {/* Header */}
//         <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] p-4 border-b text-black-500 text-sm font-medium">
//           <p>Product</p>
//           <p>Price</p>
//           <p>Date Added</p>
//           <p>Stock Status</p>
//           <p></p>
//           <p></p>
//         </div>

//         {/* Empty */}
//         {wishlist.length === 0 && (
//           <p className="text-center py-10 text-gray-500">
//             Your Wishlist is Empty 💔
//           </p>
//         )}

//         {/* Items */}
//         {wishlist.map((item) => {
//           const variant =
//             item.product?.variants?.find(
//               (v) => String(v._id) === String(item.variantId)
//             ) || null;

//           const stock = variant?.stock ?? 0;
//           const inStock = stock > 0;
//           console.log(stock,inStock);
          
//           return (
//             <div
//               key={item.productId}
//               className="relative grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 md:gap-0 p-4 border-b"
//             >
//               {/* Product */}
//               <div className="flex items-center gap-4">
//                 <img
//                   src={item.image || item.product?.images?.[0]?.url}
//                   alt={item.name}
//                   className="h-16 w-16 object-contain"
//                 />
//                 <div>
//                   <p className="font-medium text-sm">{item.name}</p>
//                   <p className="text-xs text-gray-400">{item.name}</p>
//                 </div>
//               </div>

//               {/* Price */}
//               <div className="flex justify-between md:block text-sm">
//                 <span className="md:hidden font-medium">Price :</span>
//                 <span>Rs.{item.price}</span>
//               </div>

//               {/* Date */}
//               <div className="flex justify-between md:block text-sm text-gray-600">
//                 <span className="md:hidden font-medium">Date :</span>
//                 <span>{item.date || "-"}</span>
//               </div>

//               {/* Stock */}
//               <div className="flex justify-between md:block">
//                 <span className="md:hidden font-medium">Stock :</span>
//                 {inStock ? (
//                   <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-md">
//                     In Stock
//                   </span>
//                 ) : (
//                   <span className="bg-red-100 text-red-500 text-xs px-3 py-1 rounded-md">
//                     Out of Stock
//                   </span>
//                 )}
//               </div>

//               {/* Add to Cart */}
//               <div>
//                 <button
//                   disabled={!inStock}
//                   onClick={() => handleAddToCart(item)}
//                   className={`px-4 py-2 md:px-3 md:py-1.5 lg:px-5 lg:py-2 
//                   rounded-full text-sm font-medium whitespace-nowrap transition
//                   ${
//                     inStock
//                       ? "bg-green-600 text-white hover:bg-green-700"
//                       : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   }`}
//                 >
//                   Add to Cart
//                 </button>
//               </div>

//               {/* Remove */}
//               <button
//                 onClick={() => handleRemove(item)}
//                 className="absolute top-4 right-4 md:static text-gray-400 hover:text-red-500"
//               >
//                 <X size={18} />
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import api from "../common/apiClient";
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";
import { ProductContext } from "../Context/ProductContext"; // 🔥 IMPORTANT
import SummaryApi from "../common/SummaryApi";
import { getLocalWishlist, removeFromLocalWishlist } from "../helpers/wishlistHelper";
import { addToLocalCart } from "../helpers/cartHelper";
import { MdOutlineCancel } from "react-icons/md";
export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  const { products } = useContext(ProductContext); // 🔥 IMPORTANT
  const { refreshWishlist } = useWishlist();
  const { refreshCart } = useCart();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const res = await api({
          url: SummaryApi.getWishlistItems.url,
          method: SummaryApi.getWishlistItems.method,
        });

        setWishlist(res.data?.items || []);
      } else {
        setWishlist(getLocalWishlist());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (item) => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        await api({
          url: SummaryApi.removeWishlistItem.url,
          method: SummaryApi.removeWishlistItem.method,
          data: {
            productId: item.productId,
          },
        });
      } else {
        removeFromLocalWishlist(item.productId);
      }

      toast.success("Removed from Wishlist ❌");
      fetchWishlist();
      refreshWishlist();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = async (item, variant) => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        await api.post(SummaryApi.addToCart.url, {
          productId: item.productId,
          variantId: item.variantId,
          quantity: 1,
        });
      } else {
        addToLocalCart(
          {
            _id: item.productId,
          },
          variant
        );
      }

      toast.success("Added to Cart 🛒");
      refreshCart();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="bg-white border rounded-xl overflow-hidden">

        {/* Header */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] p-4 border-b text-sm font-medium">
          <p>Product</p>
          <p>Price</p>
          <p>Stock Status</p>
          <p></p>
          <p></p>
        </div>

        {/* Empty */}
        {wishlist.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            Your Wishlist is Empty 💔
          </p>
        )}

        {/* Items */}
        {wishlist.map((item) => {
          // 🔥 MATCH PRODUCT
          const product = products.find(
            (p) => String(p._id) === String(item.productId)
          );

          // 🔥 MATCH VARIANT
          const variant = product?.variants?.find(
            (v) => String(v._id) === String(item.variantId)
          );

          if (!product || !variant) return null;

          const name = product.name;
          const image = product.images?.[0]?.url;
          const price = variant.price;
          const stock = variant.stock ?? 0;
          const inStock = stock > 0;

          return (
<div
  key={item.productId}
  className="border-b p-4 flex flex-col gap-4 md:grid md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:items-center"
>
  {/* 🔴 REMOVE BUTTON (top right mobile) */}
  <div className="flex justify-end md:hidden">
    <button
      onClick={() => handleRemove(item)}
      className="text-gray-400 hover:text-red-500"
    >
      <MdOutlineCancel className="w-5 h-5" />
    </button>
  </div>

  {/* PRODUCT */}
  <div className="flex items-center gap-4">
    <img
      src={image}
      alt={name}
      className="h-16 w-16 object-contain rounded"
    />
    <div>
      <p className="font-medium text-sm">{name}</p>
    </div>
  </div>

  {/* PRICE */}
  <div className="flex justify-between md:block text-sm">
    <span className="md:hidden font-medium">Price:</span>
    <span>Rs.{price}</span>
  </div>

  {/* STOCK */}
  <div className="flex justify-between md:block">
    <span className="md:hidden font-medium">Stock:</span>
    {inStock ? (
      <span className="bg-green-100 text-green-600 px-3 py-1 rounded text-xs">
        In Stock
      </span>
    ) : (
      <span className="bg-red-100 text-red-500 px-3 py-1 rounded text-xs">
        Out of Stock
      </span>
    )}
  </div>

  {/* ADD TO CART */}
  <div className="flex justify-between md:block">
    <span className="md:hidden font-medium">Action:</span>
    <button
      disabled={!inStock}
      onClick={() => handleAddToCart(item, variant)}
      className={`px-4 py-2 rounded-full text-sm ${
        inStock
          ? "bg-green-600 text-white"
          : "bg-gray-300 text-gray-500"
      }`}
    >
      Add to Cart
    </button>
  </div>

  {/* REMOVE (desktop) */}
  <div className="hidden md:block">
    <button
      onClick={() => handleRemove(item)}
      className="text-gray-400 hover:text-red-500"
    >
      <MdOutlineCancel className="w-5 h-5" />
    </button>
  </div>
</div>
          );
        })}
      </div>
    </div>
  );
}