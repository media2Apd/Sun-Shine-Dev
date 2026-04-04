


// import React, { useContext, useState, useEffect } from "react";
// import { ProductContext } from "../Context/ProductContext";
// import ProductCard from "../components/homeComponents/ProductCard";

// const ProductListing = () => {

//   const { products } = useContext(ProductContext);
//   console.log("Products:", products);
//   const [showFilter, setShowFilter] = useState(false);
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const [stock, setStock] = useState("all"); // ✅ FIX
//   const [price, setPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(0);

//   const [sortBy, setSortBy] = useState("latest");

//   // ✅ SET PRICE RANGE (CORRECT)
//   useEffect(() => {
//     if (products.length > 0) {

//       const prices = products.map(p =>
//         Number(p?.variants?.[0]?.price || 0)
//       );

//       const max = Math.max(...prices);

//       setMaxPrice(max || 0);
//       setPrice(max || 0);

//     }
//   }, [products]);

//   // ✅ FILTER LOGIC (FULL FIXED)
//   useEffect(() => {

//     let temp = [...products];

//     // ✅ STOCK (SAFE)
//     if (stock === "in") {
//       temp = temp.filter(p => Number(p?.stock ?? 1) > 0);
//     } else if (stock === "out") {
//       temp = temp.filter(p => Number(p?.stock ?? 0) === 0);
//     }

//     // ✅ PRICE (FROM VARIANTS)
//     temp = temp.filter(p => {
//       const productPrice = Number(p?.variants?.[0]?.price || 0);
//       return productPrice <= price;
//     });

//     // ✅ SORT (FROM VARIANTS)
//     if (sortBy === "low") {
//       temp.sort((a, b) => {
//         const aPrice = Number(a?.variants?.[0]?.price || 0);
//         const bPrice = Number(b?.variants?.[0]?.price || 0);
//         return aPrice - bPrice;
//       });
//     } else if (sortBy === "high") {
//       temp.sort((a, b) => {
//         const aPrice = Number(a?.variants?.[0]?.price || 0);
//         const bPrice = Number(b?.variants?.[0]?.price || 0);
//         return bPrice - aPrice;
//       });
//     }

//     setFilteredProducts(temp);

//   }, [products, stock, price, sortBy]);

//   return (

//     <div className="bg-[#f6f6f6] min-h-screen p-5">

//       {/* 🔝 TOP BAR */}
//       <div className="flex justify-between items-center mb-5">

//         <button
//           onClick={() => setShowFilter(!showFilter)}
//           className="bg-green-600 text-white px-5 py-2 rounded-full"
//         >
//           Filter
//         </button>

//         <div className="flex items-center gap-5">

//           <select
//             className="border px-3 py-2 rounded-md text-sm"
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="latest">Sort by: Latest</option>
//             <option value="low">Price: Low to High</option>
//             <option value="high">Price: High to Low</option>
//           </select>

//           <span className="text-sm text-gray-500">
//             {filteredProducts.length} Results Found
//           </span>

//         </div>

//       </div>

//       <div className="flex gap-6">

//         {/* 🟢 SIDEBAR */}
//         {showFilter && (
//           <div className="w-[260px] bg-white p-5 rounded-xl shadow-sm">

//             {/* AVAILABILITY */}
//             <div className="mb-6">
//               <h3 className="font-semibold mb-3">Availability</h3>

//               <label className="flex gap-2 mb-2 text-sm">
//                 <input
//                   type="radio"
//                   checked={stock === "all"}
//                   onChange={() => setStock("all")}
//                 />
//                 All
//               </label>

//               <label className="flex gap-2 mb-2 text-sm">
//                 <input
//                   type="radio"
//                   checked={stock === "in"}
//                   onChange={() => setStock("in")}
//                 />
//                 In Stock
//               </label>

//               <label className="flex gap-2 text-sm">
//                 <input
//                   type="radio"
//                   checked={stock === "out"}
//                   onChange={() => setStock("out")}
//                 />
//                 Out of Stock
//               </label>
//             </div>

//             {/* PRICE */}
//             <div className="mb-6">
//               <h3 className="font-semibold mb-3">Price</h3>

//               <input
//                 type="range"
//                 min={0}
//                 max={maxPrice || 0}
//                 value={price || 0}
//                 onChange={(e) => setPrice(Number(e.target.value))}
//                 className="w-full accent-green-600"
//               />

//               <p className="text-sm mt-2">
//                 ₹0 - ₹{price}
//               </p>
//             </div>

//           </div>
//         )}

//         {/* 🟢 PRODUCT GRID */}
//         <div className="flex-1">

//           {filteredProducts.length === 0 ? (
//             <p className="text-center mt-10 text-gray-500">
//               No Products Found
//             </p>
//           ) : (
//             <div className={`grid gap-5 
//               ${showFilter 
//                 ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" 
//                 : "grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"}
//             `}>

//               {filteredProducts.map((item) => (
//                 <ProductCard key={item._id} item={item} />
//               ))}

//             </div>
//           )}

//         </div>

//       </div>

//     </div>

//   );

// };

// export default ProductListing;


// import React, { useContext, useState, useEffect } from "react";
// import { ProductContext } from "../Context/ProductContext";
// import ProductCard from "../components/homeComponents/ProductCard";

// const ProductListing = () => {

//   const { products } = useContext(ProductContext);

//   const [showFilter, setShowFilter] = useState(false);
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const [price, setPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(0);

//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedRating, setSelectedRating] = useState(null);
//   const [selectedDiscount, setSelectedDiscount] = useState(null);

//   const [sortBy, setSortBy] = useState("latest");

//   // 🔥 GET UNIQUE CATEGORIES
//   const categories = [
//     ...new Set(products.map(p => p?.category?.name).filter(Boolean))
//   ];

//   // 🔥 SET PRICE RANGE
//   useEffect(() => {
//     if (products.length > 0) {
//       const prices = products.map(p =>
//         Number(p?.variants?.[0]?.price || 0)
//       );
//       const max = Math.max(...prices);
//       setMaxPrice(max || 0);
//       setPrice(max || 0);
//     }
//   }, [products]);

//   // 🔥 FILTER LOGIC
//   useEffect(() => {

//     let temp = [...products];

//     // ✅ CATEGORY
//     if (selectedCategory) {
//       temp = temp.filter(
//         p => p?.category?.name === selectedCategory
//       );
//     }

//     // ✅ PRICE
//     temp = temp.filter(p => {
//       const productPrice = Number(p?.variants?.[0]?.price || 0);
//       return productPrice <= price;
//     });

//     // ✅ DISCOUNT
//     if (selectedDiscount !== null) {
//       temp = temp.filter(p => {
//         const v = p?.variants?.[0];
//         const oldPrice = Number(v?.oldPrice || 0);
//         const price = Number(v?.price || 0);

//         if (!oldPrice) return false;

//         const discount = Math.round(((oldPrice - price) / oldPrice) * 100);

//         if (selectedDiscount === 10) return discount <= 10;
//         if (selectedDiscount === 30) return discount >= 11 && discount <= 30;
//         if (selectedDiscount === 50) return discount >= 31 && discount <= 50;
//         if (selectedDiscount === 70) return discount > 50;

//         return true;
//       });
//     }

//     // ✅ RATING (dummy fallback if no rating field)
//     if (selectedRating) {
//       temp = temp.filter(p => (p.rating || 4) >= selectedRating);
//     }

//     // ✅ SORT
//     if (sortBy === "low") {
//       temp.sort((a, b) => {
//         const aPrice = Number(a?.variants?.[0]?.price || 0);
//         const bPrice = Number(b?.variants?.[0]?.price || 0);
//         return aPrice - bPrice;
//       });
//     } else if (sortBy === "high") {
//       temp.sort((a, b) => {
//         const aPrice = Number(a?.variants?.[0]?.price || 0);
//         const bPrice = Number(b?.variants?.[0]?.price || 0);
//         return bPrice - aPrice;
//       });
//     }

//     setFilteredProducts(temp);

//   }, [products, price, selectedCategory, selectedDiscount, selectedRating, sortBy]);

//   return (

//     <div className="bg-[#f6f6f6] min-h-screen p-4 md:p-6">

//       {/* 🔝 TOP BAR */}
//       <div className="flex flex-wrap justify-between items-center gap-3 mb-5">

//         <button
//           onClick={() => setShowFilter(!showFilter)}
//           className="bg-green-600 text-white px-5 py-2 rounded-full text-sm"
//         >
//           Filter
//         </button>

//         <div className="flex items-center gap-4 flex-wrap">

//           <select
//             className="border px-3 py-2 rounded-md text-sm"
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="latest">Sort by: Latest</option>
//             <option value="low">Price: Low to High</option>
//             <option value="high">Price: High to Low</option>
//           </select>

//           <span className="text-sm text-gray-500">
//             {filteredProducts.length} Results
//           </span>

//         </div>

//       </div>

//       <div className="flex flex-col lg:flex-row gap-6">

//         {/* 🟢 SIDEBAR */}
//         {showFilter && (
//           <div className="w-full lg:w-[260px] bg-white p-5 rounded-xl shadow-sm space-y-6">

//             {/* CATEGORY */}
//             <div>
//               <h3 className="font-semibold mb-3">Category</h3>
//               {categories.map(cat => (
//                 <label key={cat} className="flex gap-2 text-sm mb-2">
//                   <input
//                     type="radio"
//                     checked={selectedCategory === cat}
//                     onChange={() => setSelectedCategory(cat)}
//                   />
//                   {cat}
//                 </label>
//               ))}
//             </div>

//             {/* PRICE */}
//             <div>
//               <h3 className="font-semibold mb-3">Price</h3>
//               <input
//                 type="range"
//                 min={0}
//                 max={maxPrice || 0}
//                 value={price || 0}
//                 onChange={(e) => setPrice(Number(e.target.value))}
//                 className="w-full accent-green-600"
//               />
//               <p className="text-sm mt-2">₹0 - ₹{price}</p>
//             </div>

//             {/* DISCOUNT */}
//             <div>
//               <h3 className="font-semibold mb-3">Discount</h3>
//               {[10, 30, 50, 70].map(d => (
//                 <label key={d} className="flex gap-2 text-sm mb-2">
//                   <input
//                     type="radio"
//                     checked={selectedDiscount === d}
//                     onChange={() => setSelectedDiscount(d)}
//                   />
//                   {d === 10 && "0–10%"}
//                   {d === 30 && "11–30%"}
//                   {d === 50 && "31–50%"}
//                   {d === 70 && "50%+"}
//                 </label>
//               ))}
//             </div>

//             {/* RATING */}
//             <div>
//               <h3 className="font-semibold mb-3">Rating</h3>
//               {[4, 3, 2].map(r => (
//                 <label key={r} className="flex gap-2 text-sm mb-2">
//                   <input
//                     type="radio"
//                     checked={selectedRating === r}
//                     onChange={() => setSelectedRating(r)}
//                   />
//                   ⭐ {r} & above
//                 </label>
//               ))}
//             </div>

//           </div>
//         )}

//         {/* 🟢 PRODUCT GRID */}
//         <div className="flex-1">

//           {filteredProducts.length === 0 ? (
//             <p className="text-center mt-10 text-gray-500">
//               No Products Found
//             </p>
//           ) : (
//             <div className={`grid gap-4 
//               ${showFilter
//                 ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
//                 : "grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"}
//             `}>

//               {filteredProducts.map(item => (
//                 <ProductCard key={item._id} item={item} />
//               ))}

//             </div>
//           )}

//         </div>

//       </div>

//     </div>
//   );
// };

// export default ProductListing;

import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../Context/ProductContext";
import ProductCard from "../components/homeComponents/ProductCard";
import { FaStar } from "react-icons/fa";

const ProductListing = () => {

  const { products } = useContext(ProductContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [price, setPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  // 🔥 categories
  const categories = [
    ...new Set(products.map(p => p?.category?.name).filter(Boolean))
  ];

  // 🔥 price setup
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map(p =>
        Number(p?.variants?.[0]?.price || 0)
      );
      const max = Math.max(...prices);
      setMaxPrice(max || 0);
      setPrice(max || 0);
    }
  }, [products]);

  // 🔥 filter logic
  useEffect(() => {
    let temp = [...products];

    if (selectedCategory.length > 0) {
      temp = temp.filter(p =>
        selectedCategory.includes(p?.category?.name)
      );
    }

    temp = temp.filter(p => {
      const productPrice = Number(p?.variants?.[0]?.price || 0);
      return productPrice <= price;
    });

    if (selectedDiscount !== null) {
      temp = temp.filter(p => {
        const v = p?.variants?.[0];
        const oldPrice = Number(v?.oldPrice || 0);
        const price = Number(v?.price || 0);
        if (!oldPrice) return false;

        const discount = Math.round(((oldPrice - price) / oldPrice) * 100);

        if (selectedDiscount === 10) return discount <= 10;
        if (selectedDiscount === 30) return discount >= 11 && discount <= 30;
        if (selectedDiscount === 50) return discount >= 31 && discount <= 50;
        if (selectedDiscount === 70) return discount > 50;

        return true;
      });
    }

    if (selectedRating) {
      temp = temp.filter(p => (p.rating || 4) >= selectedRating);
    }

    setFilteredProducts(temp);

  }, [products, price, selectedCategory, selectedDiscount, selectedRating]);

  // toggle category
  const toggleCategory = (cat) => {
    setSelectedCategory(prev =>
      prev.includes(cat)
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
  };

  return (
    <div className="bg-[#f6f6f6] min-h-screen p-4 md:p-6">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">

        <button
          onClick={() => setShowFilter(!showFilter)}
          className="bg-green-600 text-white px-5 py-2 rounded-full text-sm shadow"
        >
          Filters
        </button>

        <span className="text-sm text-gray-500">
          {filteredProducts.length} Results
        </span>

      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* FILTER SIDEBAR */}
        {showFilter && (
          <div className="w-full lg:w-[270px] bg-white p-5 rounded-xl shadow-sm space-y-6">

            {/* CATEGORY */}
            <div>
              <h3 className="font-semibold mb-3 text-sm">Category</h3>

              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-2 mb-2 cursor-pointer text-sm">

                  {/* custom checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="w-4 h-4 accent-green-600"
                  />

                  {cat}
                </label>
              ))}
            </div>

            {/* PRICE (CENTER LINE STYLE) */}
            <div>
              <h3 className="font-semibold mb-3 text-sm">
                Price: ₹0 – ₹{price}
              </h3>

              <div className="relative">

                {/* full line */}
                <div className="h-[2px] bg-gray-300 absolute top-1/2 w-full -translate-y-1/2"></div>

                {/* slider */}
                <input
                  type="range"
                  min={0}
                  max={maxPrice || 0}
                  value={price || 0}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full appearance-none bg-transparent z-10 relative"
                />

              </div>
            </div>

            {/* DISCOUNT */}
            <div>
              <h3 className="font-semibold mb-3 text-sm">Discount</h3>

              {[10, 30, 50, 70].map(d => (
                <label key={d} className="flex items-center gap-2 mb-2 text-sm cursor-pointer">

                  <input
                    type="checkbox"
                    checked={selectedDiscount === d}
                    onChange={() => setSelectedDiscount(d)}
                    className="w-4 h-4 accent-green-600"
                  />

                  {d === 10 && "0–10%"}
                  {d === 30 && "11–30%"}
                  {d === 50 && "31–50%"}
                  {d === 70 && "50%+"}

                </label>
              ))}
            </div>

            {/* RATING */}
            <div>
              <h3 className="font-semibold mb-3 text-sm">Rating</h3>

              {[5, 4, 3].map(r => (
                <label key={r} className="flex items-center gap-2 mb-2 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={selectedRating === r}
                    onChange={() => setSelectedRating(r)}
                    className="w-4 h-4 accent-green-600"
                  />

                  <div className="flex items-center gap-1 text-orange-500 text-sm">

                    {Array.from({ length: r }).map((_, i) => (
                      <FaStar key={i} />
                    ))}

                    <span className="text-gray-600 ml-1">
                      {r}.0 & up
                    </span>

                  </div>

                </label>
              ))}
            </div>

          </div>
        )}

        {/* PRODUCT GRID */}
        <div className="flex-1">

          {filteredProducts.length === 0 ? (
            <p className="text-center mt-10 text-gray-500">
              No Products Found
            </p>
          ) : (
            <div className={`grid gap-4 
              ${showFilter
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                : "grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"}
            `}>

              {filteredProducts.map(item => (
                <ProductCard key={item._id} item={item} />
              ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ProductListing;