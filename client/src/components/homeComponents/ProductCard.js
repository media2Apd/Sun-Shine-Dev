
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
import { FaHeart } from "react-icons/fa";


const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const { refreshCart } = useCart();
  const { wishlist, refreshWishlist } = useWishlist();
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // ✅ FIX: use _id
  useEffect(() => {
    if (wishlist && wishlist.length > 0) {
      setIsLiked(
        wishlist.some((i) => i.productId === item._id)
      );
    } else {
      const local = getLocalWishlist();
      setIsLiked(
        local.some((i) => i.productId === item._id)
      );
    }
  }, [wishlist, item._id]);

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

    if (loadingWishlist) return; // 🔥 prevent double click

    setLoadingWishlist(true);

    try {
      const token = localStorage.getItem("token");

      if (token) {
        if (isLiked) {
          await api({
            url: SummaryApi.removeWishlist.url,
            method: SummaryApi.removeWishlist.method,
            data: { productId: item._id },
          });

          toast.success("Removed from Wishlist");
          setIsLiked(false);
        } else {
          await api({
            url: SummaryApi.addToWishlist.url,
            method: SummaryApi.addToWishlist.method,
            data: { productId: item._id },
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
            productId: item._id,
            variantId: item.variants?.[0]?._id,
          });
          setIsLiked(true);
        }
      }

      refreshWishlist();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoadingWishlist(false);
    }
  };

  const price = item.variants?.[0]?.price;
  const mrp = item.variants?.[0]?.mrp;

  const handleCardClick = () => {
    navigate(`/category-products/product-overview/${item.slug}`, {
      state: { id: item._id }, // ✅ FIX
    });
  };

 return (
  <div
    onClick={handleCardClick}
    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
  >
    {/* IMAGE SECTION */}
    <div className="relative bg-[#F5F5F5] h-64">
      
      {/* ❤️ Wishlist Top Right */}
      <button
        onClick={handleWishlist}
        disabled={loadingWishlist}
        className="absolute top-3 right-3 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm"
      >
        {loadingWishlist ? (
          <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
        ) : isLiked ? (
          <FaHeart className="text-[#2C742F]" />
        ) : (
          <CiHeart className="text-gray-600" />
        )}
      </button>

      <img
        src={item.images?.[0]?.url}
        alt={item.name}
        className="h-full w-full object-contain"
      />
    </div>

    {/* CONTENT */}
    <div className="p-4">

      {/* TITLE */}
      <h3 className="text-lg font-medium text-gray-700 leading-snug mb-2">
        {item.name}
      </h3>

      {/* PRICE */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl font-semibold text-black">
          Rs.{price}
        </span>
        <span className="text-gray-400 line-through">
          Rs.{mrp}
        </span>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleAddToCart}
        className="w-full py-3 rounded-lg bg-gray-100 text-black font-medium hover:bg-[#2C742F] hover:text-white transition"
      >
        Add to Cart
      </button>

    </div>
  </div>
);
}

export default ProductCard;
