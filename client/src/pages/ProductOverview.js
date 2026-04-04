import { useState, useEffect, useContext } from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";
import ProductCard from "../components/homeComponents/ProductCard";
import { toast } from "react-hot-toast";
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import { addToLocalWishlist, getLocalWishlist, removeFromLocalWishlist } from "../helpers/wishlistHelper";
import { formatDateTime } from "../helpers/formatDateTime";
import { GiLindenLeaf } from "react-icons/gi";
import { CiDiscount1 } from "react-icons/ci";
import UserImage from '.././assets/User.png';
export default function ProductOverview() {

  const location = useLocation();
  const id = location.state?.id;
  const { slug } = useParams();

  const { refreshCart } = useCart();
  const { wishlist, refreshWishlist } = useWishlist();
  const { products } = useContext(ProductContext);
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState(null);
  const [selectedPack, setSelectedPack] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const currentQty = 1;
  const [liked, setLiked] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(false);

  useEffect(() => {
    if (!product) return;

    const token = localStorage.getItem("token");

    if (token) {
      setLiked(wishlist?.some((i) => i.productId === product._id));
    } else {
      const local = getLocalWishlist();
      setLiked(local.some((i) => i.productId === product._id));
    }
  }, [product, wishlist]);

  useEffect(() => {
    if (!id || !slug) return;

    const fetchProduct = async () => {
      try {
        const res = await api({
          url: SummaryApi.getOneProduct.url(id || slug),
          method: SummaryApi.getOneProduct.method,
        });

        const data = res.data?.data;

        setProduct(data);
        setSelectedImage(data?.images?.[0]?.url);

        if (data?.variants?.length) {
          const firstPack = `${data.variants[0].capacity}${data.variants[0].unit}`;
          setSelectedPack(firstPack);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id, slug]);

  useEffect(() => {
    if (!product?._id) return;

    const fetchReviews = async () => {
      try {
        const res = await api({
          url: SummaryApi.getReviewsByProduct.url(product._id),
          method: SummaryApi.getReviewsByProduct.method,
        });

        setReviews(res?.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchReviews();
  }, [product?._id]);

  if (!product) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  const images = product.images?.length ? product.images : [];
  const packs = product.variants?.map((v) => `${v.capacity}${v.unit}`);

  const selectedVariant = product.variants?.find(
    (v) => `${v.capacity}${v.unit}` === selectedPack
  );

  // 🔥 WISHLIST FIX
  const handleWishlistToggle = async () => {
    if (loadingWishlist) return;

    setLoadingWishlist(true);

    try {
      const token = localStorage.getItem("token");

      if (token) {
        if (liked) {
          await api({
            url: SummaryApi.removeWishlist.url,
            method: SummaryApi.removeWishlist.method,
            data: { productId: product._id },
          });

          setLiked(false);
          toast.success("Removed from Wishlist");
        } else {
          await api({
            url: SummaryApi.addToWishlist.url,
            method: SummaryApi.addToWishlist.method,
            data: { productId: product._id },
          });

          setLiked(true);
          setAnimateHeart(true);
          setTimeout(() => setAnimateHeart(false), 300);

          toast.success("Added to Wishlist ❤️");
        }
      } else {
        if (liked) {
          removeFromLocalWishlist(product._id);
          setLiked(false);
        } else {
          addToLocalWishlist({
            productId: product._id,
            variantId: selectedVariant?._id,
          });

          setLiked(true);
          setAnimateHeart(true);
          setTimeout(() => setAnimateHeart(false), 300);
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

  // 🔥 CART FIX
  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    try {
      await api.post(SummaryApi.addToCart.url, {
        productId: product._id,
        variantId: selectedVariant._id,
        quantity: currentQty,
      });

      toast.success(`${product.name} added to cart ✅`);
      refreshCart();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 RELATED FIX
  const related = products
    .filter(
      (p) =>
        p.category?._id === product.category?._id &&
        p._id !== product._id
    )
    .slice(0, 4);
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + (r.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : 0;
  return (
    <div className="container mx-auto px-4 md:px-6 py-6">

      {/* PRODUCT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* PRODUCT GALLERY */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
            {images.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt="product"
                onClick={() => setSelectedImage(img.url)}
                className={`w-16 h-16 border rounded-lg cursor-pointer object-cover ${
                  selectedImage === img.url ? "border-green-600" : ""
                }`}
              />
            ))}
          </div>
          <div className="flex-1 bg-gray-50 rounded-xl p-6 flex items-center justify-center">
            <img
              src={selectedImage}
              alt={product.name}
              className="max-h-80 md:max-h-110 object-contain"
            />
          </div>
        </div>

        {/* PRODUCT DETAILS */}
<div>
  {/* TITLE + STOCK */}
<div className="flex items-center justify-between">
  <h1 className="text-xl md:text-2xl font-semibold">
    {product.name}
  </h1>

  {/* STOCK STATUS */}
  {selectedVariant?.stock > 0 ? (
    <span className="bg-[#20B526]/20 text-[#2C742F] text-sm px-2 py-1 rounded">
      In Stock
    </span>
  ) : (
    <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded">
      Out of Stock
    </span>
  )}
</div>

  {/* RATING */}
  <div className="flex items-center gap-2 mt-2">
<div className="flex text-orange-400">
  {[1,2,3,4,5].map((star) => (
    <Star
      key={star}
      size={16}
      fill={star <= Math.round(avgRating) ? "currentColor" : "none"}
    />
  ))}
</div>
    <span className="text-sm text-gray-500">
  ({reviews.length} review{reviews.length > 1 ? "s" : ""})
</span>
  </div>

  {/* PRICE SECTION */}
  <div className="mt-4 flex items-center gap-3 flex-wrap">
    <span className="text-[#B3B3B3] line-through text-xl">
      ₹{selectedVariant?.mrp}
    </span>

    <span className="text-2xl text-[#2C742F] font-bold">
      ₹{selectedVariant?.price}
    </span>

    {/* % OFF */}
    {selectedVariant?.mrp && selectedVariant?.price && (
      <span className="bg-[#EA4B48]/10 text-[#EA4B48] text-xs px-2 py-1 rounded-full">
        {Math.round(
          ((selectedVariant.mrp - selectedVariant.price) /
            selectedVariant.mrp) *
            100
        )}
        % Off
      </span>
    )}
  </div>

  {/* DIVIDER */}
  <hr className="my-5 border-[1px] border-[#E6E6E6]" />

  {/* DESCRIPTION */}
  <p className="text-[#808080] my-3 text-sm md:text-base leading-relaxed">
    {product.shortDescription}
  </p>



  {/* PACK SIZE */}
  <div>
    <p className="font-medium mb-3">Pack Size</p>

    <div className="flex flex-wrap gap-3">
      {packs?.map((pack) => (
        <button
          key={pack}
          onClick={() => setSelectedPack(pack)}
          className={`px-5 py-2 rounded-full border text-sm transition ${
            selectedPack === pack
              ? "bg-green-600 text-white border-green-600"
              : "border-gray-300 hover:border-green-600"
          }`}
        >
          {pack}
        </button>
      ))}
    </div>
  </div>

<div className="flex items-center gap-4 mt-6">

  {/* ADD TO CART */}
  <button
    onClick={handleAddToCart}
    className="w-[300px] md:w-[380px] flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-full text-sm md:text-base hover:bg-green-700 transition"
  >
    <ShoppingCart size={18} />
    Add to Cart
  </button>

  {/* WISHLIST */}
  <button
    onClick={handleWishlistToggle}
    disabled={loadingWishlist}
    className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 ${
      liked
        ? "bg-green-600 text-white border-green-600 scale-110"
        : "text-gray-600 hover:bg-green-600 hover:text-white"
    } ${loadingWishlist ? "opacity-60 cursor-not-allowed" : ""}`}
  >
    {loadingWishlist ? (
      <span className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
    ) : (
      <Heart
        size={18}
        className={`${animateHeart ? "animate-[scaleIn_0.3s_ease]" : ""}`}
        fill={liked ? "currentColor" : "none"}
      />
    )}
  </button>

</div>
</div>
      </div>

      {/* TABS */}
      <div className="mt-16">
        <div className="flex justify-center gap-8 border-b text-sm md:text-base">

          <button
            onClick={() => setActiveTab("description")}
            className={`pb-2 ${
              activeTab === "description"
                ? "border-b-2 border-green-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Descriptions
          </button>

          <button
            onClick={() => setActiveTab("info")}
            className={`pb-2 ${
              activeTab === "info"
                ? "border-b-2 border-green-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Additional Information
          </button>

          <button
            onClick={() => setActiveTab("feedback")}
            className={`pb-2 ${
              activeTab === "feedback"
                ? "border-b-2 border-green-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            Customer Feedback
          </button>
        </div>

        {/* DESCRIPTION */}
        {activeTab === "description" && (
          <div className="mt-8 px-4 max-w-6xl mx-auto">

            <div className="grid md:grid-cols-2 gap-8 items-start">

              {/* LEFT */}
              <div className="text-gray-600 text-sm space-y-3">
                <p>{product.detailDescription}</p>
              </div>

              {/* RIGHT */}
              <div>
                <div>
                  {product.video?.url ? (
                    <video
                      src={product.video.url}
                      controls
                      className="w-full h-56 object-cover rounded-xl"
                    />
                  ) : (
                    <img
                      src={product.images?.[0]?.url || selectedImage}
                      alt={product.name}
                      className="w-full h-56 object-cover rounded-xl"
                    />
                  )}
                </div>

              <div className="border rounded-xl p-6 mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <div className="text-green-600 text-3xl"><CiDiscount1/></div>

                  <div>
                    <p className="font-semibold text-base tracking-wide">
                      {product.category?.name?.toUpperCase()}
                    </p>

                    {/* <p className="text-sm text-gray-500 mt-1">
                      {product.shortDescription || "Boost your soil health naturally"}
                    </p> */}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">
                  <div className="text-green-600 text-3xl"><GiLindenLeaf/></div>

                  <div>
                    <p className="font-semibold text-base tracking-wide">
                      {product.name?.toUpperCase()}
                    </p>

                    {/* <p className="text-sm text-gray-500 mt-1">
                      Promote sustainable growth
                    </p> */}
                  </div>
                </div>

              </div>
              </div>

            </div>
          </div>
        )}

        {/* INFO */}
        {activeTab === "info" && (
          <div className="max-w-6xl mx-auto mt-8 px-4">

            <div className="grid md:grid-cols-2 gap-8 items-start">

              <div className="text-gray-600 text-sm space-y-2">
                <p>Weight : {selectedVariant?.capacity} {selectedVariant?.unit}</p>
                <p>Category : {product.category?.name}</p>
                <p>Stock : {selectedVariant?.stock}</p>

                {/* 🔥 Dynamic Additional Info */}
                {selectedVariant?.additionalInfo?.map((info) => (
                  <p key={info._id}>
                    {info.key} : {info.value}
                  </p>
                ))}
              </div>

              <div>
                <div>
                  {product.video?.url ? (
                    <video
                      src={product.video.url}
                      controls
                      className="w-full h-56 object-cover rounded-xl"
                    />
                  ) : (
                    <img
                      src={product.images?.[0]?.url || selectedImage}
                      alt={product.name}
                      className="w-full h-56 object-cover rounded-xl"
                    />
                  )}
                </div>

              <div className="border rounded-xl p-6 mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <div className="text-green-600 text-3xl"><CiDiscount1/></div>

                  <div>
                    <p className="font-semibold text-base tracking-wide">
                      {product.category?.name?.toUpperCase()}
                    </p>

                    {/* <p className="text-sm text-gray-500 mt-1">
                      {product.shortDescription || "Boost your soil health naturally"}
                    </p> */}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">
                  <div className="text-green-600 text-3xl"><GiLindenLeaf/></div>

                  <div>
                    <p className="font-semibold text-base tracking-wide">
                      {product.name?.toUpperCase()}
                    </p>

                    {/* <p className="text-sm text-gray-500 mt-1">
                      Promote sustainable growth
                    </p> */}
                  </div>
                </div>

              </div>
              </div>

            </div>
          </div>
        )}

        {/* FEEDBACK */}
        {activeTab === "feedback" && (
          <div className="max-w-4xl mx-auto mt-8 px-4">

{reviews.length > 0 ? (
  <div className="space-y-6">

    {reviews.map((rev) => (
      <div key={rev._id} className="border-b pb-4 flex gap-4">

        {/* PROFILE */}
        <img
          src={rev.userId?.profileImage?.url || UserImage}
          className="w-10 h-10 rounded-full object-cover"
          alt="user"
        />

        <div className="flex-1">

          {/* NAME + TIME */}
          <div className="flex justify-between items-center">
            <p className="font-medium text-black">
              {rev.userId
                ? `${rev.userId.firstName} ${rev.userId.lastName}`
                : "User"}
            </p>

            <span className="text-xs text-gray-400">
              {formatDateTime(rev.createdAt, true)}
            </span>
          </div>

          {/* ⭐ RATING */}
          <div className="flex text-orange-400 mt-1">
            {[1,2,3,4,5].map((star) => (
              <Star
                key={star}
                size={14}
                fill={star <= rev.rating ? "currentColor" : "none"}
              />
            ))}
          </div>

          {/* COMMENT */}
          {rev.comment && (
            <p className="text-sm text-gray-500 mt-1">
              {rev.comment}
            </p>
          )}

          {/* 🔥 IMAGES */}
          {rev.images?.length > 0 && (
            <div className="flex gap-2 mt-2">
              {rev.images.map((img) => (
                <img
                  key={img._id}
                  src={img.url}
                  alt="review"
                  className="w-16 h-16 rounded object-cover border"
                />
              ))}
            </div>
          )}

          {/* ✅ VERIFIED */}
          {rev.isVerifiedPurchase && (
            <span className="text-xs text-green-600 mt-2 inline-block">
              ✔ Verified Purchase
            </span>
          )}

        </div>
      </div>
    ))}

  </div>
) : (
  <p className="text-center text-gray-400">
    No customer feedback yet.
  </p>
)}

          </div>
        )}
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-6">Related products</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}