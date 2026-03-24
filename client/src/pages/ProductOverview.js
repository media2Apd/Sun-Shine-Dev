
// import { useState, useEffect, useContext } from "react";
// import { Star, Heart, ShoppingCart } from "lucide-react";
// import { useLocation } from "react-router-dom";
// import { ProductContext } from "../Context/ProductContext";
// import ProductCard from "../components/homeComponents/ProductCard";
// import { CartContext } from "../Context/CartContext";

// export default function ProductOverview() {
//   const location = useLocation();
//   const id = location.state?.id;
//   const { addToCart } = useContext(CartContext);
//   const { products } = useContext(ProductContext);

//   const [product, setProduct] = useState(null);
//   const [selectedPack, setSelectedPack] = useState("");
//   const [selectedImage, setSelectedImage] = useState("");
//   const [activeTab, setActiveTab] = useState("description");

//   // Track quantity per variant
//   const [variantQty, setVariantQty] = useState({});

//   useEffect(() => {
//     const foundProduct = products.find((p) => p.id === Number(id));
//     if (foundProduct) {
//       setProduct(foundProduct);
//       setSelectedImage(foundProduct.image);

//       if (foundProduct.variants?.length) {
//         const firstPack = `${foundProduct.variants[0].capacity}${foundProduct.variants[0].unit}`;
//         setSelectedPack(firstPack);
//       }
//     }
//   }, [id, products]);

//   if (!product) {
//     return <div className="p-10 text-center">Product not found</div>;
//   }

//   const images = product.images?.length ? product.images : [product.image];
//   const packs = product.variants?.map((v) => `${v.capacity}${v.unit}`);
//   const selectedVariant = product.variants?.find(
//     (v) => `${v.capacity}${v.unit}` === selectedPack
//   );

//   const currentQty = variantQty[selectedPack] || 1;

//   const related = products
//     .filter((p) => p.category === product.category && p.id !== product.id)
//     .slice(0, 4);

//   return (
//     <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
//       {/* PRODUCT SECTION */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//         {/* PRODUCT GALLERY */}
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1 bg-gray-50 rounded-xl p-6 flex items-center justify-center">
//             <img
//               src={selectedImage}
//               alt={product.name}
//               className="max-h-80 md:max-h-96 object-contain"
//             />
//           </div>

//           <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
//             {images.map((img, i) => (
//               <img
//                 key={i}
//                 src={img}
//                 alt="product"
//                 onClick={() => setSelectedImage(img)}
//                 className={`w-16 h-16 border rounded-lg cursor-pointer object-cover ${
//                   selectedImage === img ? "border-green-600" : ""
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* PRODUCT DETAILS */}
//         <div>
//           <h1 className="text-xl md:text-2xl font-semibold">{product.name}</h1>

//           {/* RATING */}
//           <div className="flex items-center gap-2 mt-2">
//             <div className="flex text-orange-400">
//               {[...Array(5)].map((_, i) => (
//                 <Star key={i} size={16} fill="currentColor" />
//               ))}
//             </div>
//             <span className="text-sm text-gray-500">(4 review)</span>
//           </div>

//           {/* PRICE */}
//           <div className="mt-4 flex flex-wrap items-center gap-3">
//             <span className="text-gray-400 line-through text-sm">
//               ₹{selectedVariant?.mrp}
//             </span>
//             <span className="text-2xl text-green-600 font-bold">
//               ₹{selectedVariant?.price}
//             </span>
//           </div>

//           <p className="text-gray-500 mt-4 text-sm md:text-base">
//             {product.shortDescription}
//           </p>

//           {/* PACK SIZE */}
//           <div className="mt-6">
//             <p className="font-medium mb-2">Pack Size</p>
//             <div className="flex flex-wrap gap-3">
//               {packs?.map((pack) => (
//                 <button
//                   key={pack}
//                   onClick={() => setSelectedPack(pack)}
//                   className={`px-4 py-2 rounded-full border text-sm ${
//                     selectedPack === pack
//                       ? "bg-green-600 text-white border-green-600"
//                       : "border-gray-300"
//                   }`}
//                 >
//                   {pack}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* QUANTITY */}
//           <div className="flex flex-wrap items-center gap-4 mt-6">
//             <div className="flex border rounded-lg">
//               <button
//                 className="px-3"
//                 onClick={() =>
//                   setVariantQty((prev) => ({
//                     ...prev,
//                     [selectedPack]: Math.max(1, currentQty - 1),
//                   }))
//                 }
//               >
//                 -
//               </button>
//               <span className="px-4 py-2">{currentQty}</span>
//               <button
//                 className="px-3"
//                 onClick={() =>
//                   setVariantQty((prev) => ({
//                     ...prev,
//                     [selectedPack]: currentQty + 1,
//                   }))
//                 }
//               >
//                 +
//               </button>
//             </div>

//             {/* ADD TO CART */}
//             <button
//               onClick={() => {
//                 if (!selectedVariant) return;
//                 addToCart(product, selectedVariant, currentQty);
//                 // optional: reset qty for this variant
//                 // setVariantQty((prev) => ({ ...prev, [selectedPack]: 1 }));
//               }}
//               className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full text-sm md:text-base"
//             >
//               <ShoppingCart size={18} />
//               Add to Cart
//             </button>

//             <button className="border p-3 rounded-full">
//               <Heart size={18} />
//             </button>
//           </div>

//           {/* CATEGORY */}
//           <div className="mt-6 text-sm text-gray-600 space-y-1">
//             <p>
//               <span className="font-semibold text-gray-800">Category:</span>
//               {product.category}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* TABS */}
//       <div className="mt-16">
//         <div className="flex justify-center gap-8 border-b text-sm md:text-base">
//           <button
//             onClick={() => setActiveTab("description")}
//             className={`pb-2 ${
//               activeTab === "description"
//                 ? "border-b-2 border-green-600 font-semibold"
//                 : "text-gray-500"
//             }`}
//           >
//             Descriptions
//           </button>
//           <button
//             onClick={() => setActiveTab("info")}
//             className={`pb-2 ${
//               activeTab === "info"
//                 ? "border-b-2 border-green-600 font-semibold"
//                 : "text-gray-500"
//             }`}
//           >
//             Additional Information
//           </button>
//           <button
//             onClick={() => setActiveTab("feedback")}
//             className={`pb-2 ${
//               activeTab === "feedback"
//                 ? "border-b-2 border-green-600 font-semibold"
//                 : "text-gray-500"
//             }`}
//           >
//             Customer Feedback
//           </button>
//         </div>

//         {activeTab === "description" && (
//           <div className="mt-8 text-gray-600 text-sm px-4 max-w-4xl mx-auto">
//             <p>{product.detailDescription}</p>
//           </div>
//         )}

//         {/* {activeTab === "info" && (
//   <div className="max-w-4xl mx-auto mt-8 text-gray-600 text-sm space-y-2 px-4">

//     <p>Weight : {product.Capacity || "-"}</p>
//     <p>Type : {selectedVariant?.type || "-"}</p>
//     <p>Usage : {product.usage || "-"}</p>

//     <p>Tags : {selectedVariant?.tags || "-"}</p>
//     <p>Category : {selectedVariant?.category || product.category}</p>
//     <p>Stock : {selectedVariant?.stockStatus || "-"}</p>

//   </div>
// )} */}

// {activeTab === "info" && (
//   <div className="max-w-4xl mx-auto mt-8 text-gray-600 text-sm space-y-2 px-4">

//     <p>Weight : {selectedVariant?.capacity} {selectedVariant?.unit}</p>

//     <p>Type : {selectedVariant?.type || "-"}</p>

//    <p>Color: {selectedVariant?.color || product?.color || "-"}</p>

   

//     <p>Category : {selectedVariant?.category || product.category}</p>

//     <p>Stock : {selectedVariant?.stockStatus || "-"}</p>

//      <p>Tags : {selectedVariant?.tags || "-"}</p>

//   </div>
// )}

//         {activeTab === "feedback" && (
//           <div className="max-w-4xl mx-auto mt-8 text-gray-600 text-sm px-4">
//             <p>No customer feedback yet.</p>
//           </div>
//         )}
//       </div>

//       {/* RELATED PRODUCTS */}
//       <div className="mt-16">
//         <h2 className="text-xl font-semibold mb-6">Related products</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {related.map((item) => (
//             <ProductCard key={item.id} item={item} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useContext } from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useLocation } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";
import ProductCard from "../components/homeComponents/ProductCard";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import { toast } from "react-toastify";

export default function ProductOverview() {
  const location = useLocation();
  const id = location.state?.id;
  const { addToCart } = useContext(CartContext);
  const { products } = useContext(ProductContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const [product, setProduct] = useState(null);
  const [selectedPack, setSelectedPack] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [variantQty, setVariantQty] = useState({});
  const [liked, setLiked] = useState(
  wishlist.some((item) => item.id === product.id)
);
const handleWishlistToggle = () => {
  if (!product) return;

  if (liked) {
    removeFromWishlist(product.id);
    toast.info(`${product.name} removed from wishlist ❌`);
    setLiked(false);
  } else {
    addToWishlist(product);
    toast.success(`${product.name} added to wishlist ❤️`);
    setLiked(true);
  }
};
  const handleAddToCart = () => {
  if (!selectedVariant) return;
  addToCart(product, selectedVariant, currentQty);
  toast.success(`${product.name} added to cart ✅`);
};

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.image);

      if (foundProduct.variants?.length) {
        const firstPack = `${foundProduct.variants[0].capacity}${foundProduct.variants[0].unit}`;
        setSelectedPack(firstPack);
      }
    }
  }, [id, products]);

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  const images = product.images?.length ? product.images : [product.image];
  const packs = product.variants?.map((v) => `${v.capacity}${v.unit}`);
  const selectedVariant = product.variants?.find(
    (v) => `${v.capacity}${v.unit}` === selectedPack
  );

  const currentQty = variantQty[selectedPack] || 1;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">

      {/* PRODUCT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* PRODUCT GALLERY */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-gray-50 rounded-xl p-6 flex items-center justify-center">
            <img
              src={selectedImage}
              alt={product.name}
              className="max-h-80 md:max-h-96 object-contain"
            />
          </div>

          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="product"
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 border rounded-lg cursor-pointer object-cover ${
                  selectedImage === img ? "border-green-600" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">{product.name}</h1>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex text-orange-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <span className="text-sm text-gray-500">(4 review)</span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-gray-400 line-through text-sm">
              ₹{selectedVariant?.mrp}
            </span>
            <span className="text-2xl text-green-600 font-bold">
              ₹{selectedVariant?.price}
            </span>
          </div>

          <p className="text-gray-500 mt-4 text-sm md:text-base">
            {product.shortDescription}
          </p>

          {/* PACK SIZE */}
          <div className="mt-6">
            <p className="font-medium mb-2">Pack Size</p>
            <div className="flex flex-wrap gap-3">
              {packs?.map((pack) => (
                <button
                  key={pack}
                  onClick={() => setSelectedPack(pack)}
                  className={`px-4 py-2 rounded-full border text-sm ${
                    selectedPack === pack
                      ? "bg-green-600 text-white border-green-600"
                      : "border-gray-300"
                  }`}
                >
                  {pack}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <div className="flex border rounded-lg">
              <button
                className="px-3"
                onClick={() =>
                  setVariantQty((prev) => ({
                    ...prev,
                    [selectedPack]: Math.max(1, currentQty - 1),
                  }))
                }
              >-</button>

              <span className="px-4 py-2">{currentQty}</span>

              <button
                className="px-3"
                onClick={() =>
                  setVariantQty((prev) => ({
                    ...prev,
                    [selectedPack]: currentQty + 1,
                  }))
                }
              >+</button>
            </div>

            {/* <button
              onClick={() => {
                if (!selectedVariant) return;
                addToCart(product, selectedVariant, currentQty);
              }}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full text-sm md:text-base"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>

            <button className="border p-3 rounded-full">
              <Heart size={18} />
            </button> */}

            {/* ADD TO CART */}
      <button
        onClick={handleAddToCart}
        className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full text-sm md:text-base hover:bg-green-700 transition"
      >
        <ShoppingCart size={18} />
        Add to Cart
      </button>

      {/* WISHLIST HEART */}
      <button
        onClick={handleWishlistToggle}
        className={`border p-3 rounded-full transition ${
          liked ? "bg-green-600 text-white" : "text-gray-600 hover:bg-green-600 hover:text-white"
        }`}
      >
        <Heart size={18} />
      </button>
          </div>

          <div className="mt-6 text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-semibold text-gray-800">Category:</span>
              {product.category}
            </p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="mt-16">
        <div className="flex justify-center gap-8 border-b text-sm md:text-base">

          <button onClick={() => setActiveTab("description")}
            className={`pb-2 ${activeTab === "description" ? "border-b-2 border-green-600 font-semibold" : "text-gray-500"}`}>
            Descriptions
          </button>

          <button onClick={() => setActiveTab("info")}
            className={`pb-2 ${activeTab === "info" ? "border-b-2 border-green-600 font-semibold" : "text-gray-500"}`}>
            Additional Information
          </button>

          <button onClick={() => setActiveTab("feedback")}
            className={`pb-2 ${activeTab === "feedback" ? "border-b-2 border-green-600 font-semibold" : "text-gray-500"}`}>
            Customer Feedback
          </button>

        </div>

        {/* DESCRIPTION */}
        {/* {activeTab === "description" && (
          <div className="mt-8 px-4 max-w-6xl mx-auto">

            <div className="grid md:grid-cols-2 gap-8 items-center">

              <div className="text-gray-600 text-sm space-y-3">
                <p>{product.detailDescription}</p>
              </div>

              <div>
                {product.video ? (
                  <video src={product.video} controls className="w-full h-64 object-cover rounded-xl" />
                ) : (
                  <div className="h-64 bg-gray-100 flex items-center justify-center">No Video</div>
                )}
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">

              <div className="flex items-center gap-3 border p-4 rounded-lg">
                <div className="text-green-600 text-2xl">🌿</div>
                <div>
                  <p className="font-semibold text-sm">ORGANIC FERTILIZER</p>
                  <p className="text-xs text-gray-500">Boost your soil health naturally</p>
                </div>
              </div>

              <div className="flex items-center gap-3 border p-4 rounded-lg">
                <div className="text-green-600 text-2xl">🍃</div>
                <div>
                  <p className="font-semibold text-sm">SOIL ENRICHMENT</p>
                  <p className="text-xs text-gray-500">Promote sustainable growth</p>
                </div>
              </div>

            </div>

          </div>
        )} */}

        {activeTab === "description" && (
  <div className="mt-8 px-4 max-w-6xl mx-auto">

    {/* 🔥 TWO COLUMN LAYOUT */}
    <div className="grid md:grid-cols-2 gap-8 items-start">

      {/* LEFT SIDE - DESCRIPTION */}
      <div className="text-gray-600 text-sm space-y-3">
        <p>{product.detailDescription}</p>
      </div>

      {/* RIGHT SIDE - VIDEO + BOXES */}
      <div>

        {/* VIDEO */}
        <div>
          {product.video ? (
            <video
              src={product.video}
              controls
              className="w-full h-56 object-cover rounded-xl"
            />
          ) : (
            <div className="h-56 bg-gray-100 flex items-center justify-center rounded-xl">
              No Video
            </div>
          )}
        </div>

        {/* BOXES BELOW VIDEO */}
        <div className="grid grid-cols-1 gap-4 mt-4">

          <div className="flex items-center gap-3 border p-4 rounded-lg">
            <div className="text-green-600 text-2xl">🌿</div>
            <div>
              <p className="font-semibold text-sm">ORGANIC FERTILIZER</p>
              <p className="text-xs text-gray-500">
                Boost your soil health naturally
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border p-4 rounded-lg">
            <div className="text-green-600 text-2xl">🍃</div>
            <div>
              <p className="font-semibold text-sm">SOIL ENRICHMENT</p>
              <p className="text-xs text-gray-500">
                Promote sustainable growth
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>
)}

        

        {activeTab === "info" && (
  <div className="max-w-6xl mx-auto mt-8 px-4">

    {/* 🔥 TWO COLUMN LAYOUT */}
    <div className="grid md:grid-cols-2 gap-8 items-start">

      {/* LEFT SIDE - DATA */}
      <div className="text-gray-600 text-sm space-y-2">

        <p>Weight : {selectedVariant?.capacity} {selectedVariant?.unit}</p>
        <p>Type : {selectedVariant?.type || "-"}</p>
        <p>Color : {selectedVariant?.color || "-"}</p>
        <p>Category : {selectedVariant?.category || product.category}</p>
        <p>Stock : {selectedVariant?.stockStatus || "-"}</p>
        <p>Tags : {selectedVariant?.tags || "-"}</p>

      </div>

      {/* RIGHT SIDE - VIDEO + BOXES */}
      <div>

        {/* VIDEO */}
        <div>
          {product.video ? (
            <video
              src={product.video}
              controls
              className="w-full h-56 object-cover rounded-xl"
            />
          ) : (
            <div className="h-56 bg-gray-100 flex items-center justify-center rounded-xl">
              No Video
            </div>
          )}
        </div>

        {/* BOXES BELOW VIDEO */}
        <div className="grid grid-cols-1 gap-4 mt-4">

          <div className="flex items-center gap-3 border p-4 rounded-lg">
            <div className="text-green-600 text-2xl">🌿</div>
            <div>
              <p className="font-semibold text-sm">ORGANIC FERTILIZER</p>
              <p className="text-xs text-gray-500">
                Boost your soil health naturally
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border p-4 rounded-lg">
            <div className="text-green-600 text-2xl">🍃</div>
            <div>
              <p className="font-semibold text-sm">SOIL ENRICHMENT</p>
              <p className="text-xs text-gray-500">
                Promote sustainable growth
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>
)}

        {activeTab === "feedback" && (
          <div className="max-w-4xl mx-auto mt-8 text-gray-600 text-sm px-4">
            <p>No customer feedback yet.</p>
          </div>

          
        )}
      </div>

      

      {/* RELATED PRODUCTS */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-6">Related products</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>

    </div>
  );
}