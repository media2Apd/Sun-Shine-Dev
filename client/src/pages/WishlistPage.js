import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import api from "../common/apiClient";
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";
import { ProductContext } from "../Context/ProductContext"; // 🔥 IMPORTANT
import SummaryApi from "../common/SummaryApi";
import { removeFromLocalWishlist } from "../helpers/wishlistHelper";
import { addToLocalCart } from "../helpers/cartHelper";
import { MdOutlineCancel } from "react-icons/md";
export default function WishlistPage() {

  const { products } = useContext(ProductContext); // 🔥 IMPORTANT
  const { wishlist, refreshWishlist } = useWishlist();
  const { refreshCart } = useCart();

  const handleRemove = async (item) => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        await api({
          url: SummaryApi.removeWishlist.url,
          method: SummaryApi.removeWishlist.method,
          data: {
            productId: item.productId,
          },
        });
      } else {
        removeFromLocalWishlist(item.productId);
      }

      toast.success("Removed from Wishlist ❌");
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