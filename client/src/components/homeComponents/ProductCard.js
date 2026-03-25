
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

    try {
      const token = localStorage.getItem("token");

      if (token) {
        if (isLiked) {
          await api.delete("/api/wishlist/remove", {
            data: { productId: item._id }, // ✅ FIX
          });

          toast.success("Removed from Wishlist ");
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
            productId: item._id,
            variantId: item.variants?.[0]?._id,
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
      className="group bg-white border border-[#E6E6E6] rounded-xl hover:shadow-[0_0_15px_rgba(34,197,94,0.35)] hover:ring-2 hover:ring-[#2C742F] transition duration-300 cursor-pointer overflow-hidden"
    >
    <div className="bg-[#F3F3F3] flex items-center justify-center h-64 p-4">
      <img
        src={item.images?.[0]?.url}
        alt={item.name}
        className="h-full object-contain"
      />
    </div>

      <div className="px-4 py-3">
        <h3 className="text-base text-[#4D4D4D] font-medium mb-3 group-hover:text-[#2C742F]">
          {item.name}
        </h3>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xl font-semibold text-black">
            Rs.{price}
          </span>
          <span className="text-lg text-black line-through">
            Rs.{mrp}
          </span>
        </div>

        <div className="flex justify-between items-center">
          {/* ✅ FIX BUTTON */}
          <button
            onClick={handleAddToCart}
            className="px-6 py-2 text-sm font-semibold rounded-md bg-[#F2F2F2] text-black hover:bg-[#2C742F] hover:text-white transition"
          >
            Add to Cart
          </button>

          {/* ❤️ Wishlist */}
          <button
            onClick={handleWishlist}
            className={`w-9 h-9 flex items-center justify-center text-xl rounded-md transition ${
              isLiked
                ? "text-[#2C742F] bg-[#F2F2F2]"
                : "bg-[#F2F2F2] text-gray-600 hover:bg-[#2C742F] hover:text-white"
            }`}
          >
            {isLiked ? <FaHeart /> : <CiHeart />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
