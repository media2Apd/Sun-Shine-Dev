
// import React, { useContext, useState, useEffect } from "react";
// import { ProductContext } from "../Context/ProductContext";
// import ProductCard from "../components/homeComponents/ProductCard";
// import { IoStarSharp } from "react-icons/io5";
// import { IoIosArrowDown } from "react-icons/io";

// const ProductListing = () => {
//   const { products } = useContext(ProductContext);

//   const [filteredProducts, setFilteredProducts] = useState([]);

//   // 🔽 DROPDOWN (ALL OPEN DEFAULT)
//   const [openCategory, setOpenCategory] = useState(true);
//   const [openPrice, setOpenPrice] = useState(true);
//   const [openDiscount, setOpenDiscount] = useState(true);
//   const [openRating, setOpenRating] = useState(true);
//   const [openStock, setOpenStock] = useState(true);

//   // 🔥 PRICE
//   const [priceRange, setPriceRange] = useState([0, 1000]);
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(1000);

//   // 🔥 FILTERS
//   const [selectedCategory, setSelectedCategory] = useState([]);
//   const [selectedDiscount, setSelectedDiscount] = useState(null);
//   const [selectedRating, setSelectedRating] = useState(null);
//   const [stock, setStock] = useState("in"); // in / out

//   // 🔥 categories
//   const categories = [
//     ...new Set(products.map(p => p?.category?.name).filter(Boolean))
//   ];

//   // 🔥 SET PRICE RANGE
//   useEffect(() => {
//     if (products.length > 0) {
//       const prices = products.map(p =>
//         Number(p?.variants?.[0]?.price || 0)
//       );

//       const min = Math.min(...prices);
//       const max = Math.max(...prices);

//       setMinPrice(min);
//       setMaxPrice(max);
//       setPriceRange([min, max]);
//     }
//   }, [products]);

//   // 🔥 FILTER LOGIC
//   useEffect(() => {
//     let temp = [...products];

//     // CATEGORY
//     if (selectedCategory.length > 0) {
//       temp = temp.filter(p =>
//         selectedCategory.includes(p?.category?.name)
//       );
//     }

//     // PRICE
//     temp = temp.filter(p => {
//       const price = Number(p?.variants?.[0]?.price || 0);
//       return price >= priceRange[0] && price <= priceRange[1];
//     });

//     // STOCK
//     if (stock === "in") {
//       temp = temp.filter(p => p?.inStock !== false);
//     }

//     // DISCOUNT
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

//     // RATING
//     if (selectedRating) {
//       temp = temp.filter(p => (p.rating || 4) >= selectedRating);
//     }

//     setFilteredProducts(temp);

//   }, [products, priceRange, selectedCategory, selectedDiscount, selectedRating, stock]);

//   const toggleCategory = (cat) => {
//     setSelectedCategory(prev =>
//       prev.includes(cat)
//         ? prev.filter(c => c !== cat)
//         : [...prev, cat]
//     );
//   };

//   // 🔥 PRICE HANDLERS
//   const handleMinChange = (e) => {
//     const value = Math.min(Number(e.target.value), priceRange[1] - 1);
//     setPriceRange([value, priceRange[1]]);
//   };

//   const handleMaxChange = (e) => {
//     const value = Math.max(Number(e.target.value), priceRange[0] + 1);
//     setPriceRange([priceRange[0], value]);
//   };

//   return (
//     <div className="min-h-screen  p-4 md:p-6">

//       {/* TOP */}
//       <div className="flex justify-between mb-6">
//         <h2 className="font-semibold text-lg">Products</h2>
//         <span className="text-sm text-gray-500">
//           {filteredProducts.length} Results
//         </span>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-6">

//         {/* SIDEBAR */}
//         <div className="w-full lg:w-[280px] bg-white p-5 rounded-xl space-y-5 h-fit">

//           {/* 🔥 AVAILABILITY */}
//           <div>
//             <button onClick={() => setOpenStock(!openStock)}
//               className="flex justify-between w-full font-semibold">
//               Availability
//               <IoIosArrowDown className={`${openStock && "rotate-180"}`} />
//             </button>

//             {openStock && (
//               <div className="mt-3 space-y-2">
//                 <label className="flex items-center gap-2 text-sm">
//                   <input
//                     type="radio"
//                     checked={stock === "out"}
//                     onChange={() => setStock("out")}
//                   />
//                   Out of Stock
//                 </label>

//                 <label className="flex items-center gap-2 text-sm">
//                   <input
//                     type="radio"
//                     checked={stock === "in"}
//                     onChange={() => setStock("in")}
//                     className="accent-green-600"
//                   />
//                   In Stock
//                 </label>
//               </div>
//             )}
//           </div>

//           <hr />

//           {/* CATEGORY */}
//           <div>
//             <button onClick={() => setOpenCategory(!openCategory)}
//               className="flex justify-between w-full font-semibold">
//               Category
//               <IoIosArrowDown className={`${openCategory && "rotate-180"}`} />
//             </button>

//             {openCategory && (
//               <div className="mt-3 space-y-2">
//                 {categories.map(cat => (
//                   <label key={cat} className="flex gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       checked={selectedCategory.includes(cat)}
//                       onChange={() => toggleCategory(cat)}
//                       className="accent-green-600"
//                     />
//                     {cat}
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>

//           <hr />

//           {/* 🔥 PRICE */}
//           <div>
//             <button onClick={() => setOpenPrice(!openPrice)}
//               className="flex justify-between w-full font-semibold">
//               Price
//               <IoIosArrowDown className={`${openPrice && "rotate-180"}`} />
//             </button>

//             {openPrice && (
//               <div className="mt-4">

//                 <p className="text-sm text-gray-600 mb-3">
//                   Price: ₹{priceRange[0]} – ₹{priceRange[1]}
//                 </p>

//                 <div className="relative h-6 flex items-center">

//                   {/* full line */}
//                   <div className="absolute w-full h-[4px] bg-gray-300 rounded-full" />

//                   {/* active line */}
//                   <div
//                     className="absolute h-[4px] bg-green-500 rounded-full"
//                     style={{
//                       left: `${((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
//                       right: `${100 - ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%`
//                     }}
//                   />

//                   {/* MIN */}
//                   <input
//                     type="range"
//                     min={minPrice}
//                     max={maxPrice}
//                     value={priceRange[0]}
//                     onChange={handleMinChange}
//                     className="range-thumb"
//                   />

//                   {/* MAX */}
//                   <input
//                     type="range"
//                     min={minPrice}
//                     max={maxPrice}
//                     value={priceRange[1]}
//                     onChange={handleMaxChange}
//                     className="range-thumb"
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           <hr />

//           {/* DISCOUNT */}
//           <div>
//             <button onClick={() => setOpenDiscount(!openDiscount)}
//               className="flex justify-between w-full font-semibold">
//               Discount
//               <IoIosArrowDown className={`${openDiscount && "rotate-180"}`} />
//             </button>

//             {openDiscount && (
//               <div className="mt-3 space-y-2">
//                 {[10, 30, 50, 70].map(d => (
//                   <label key={d} className="flex gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       checked={selectedDiscount === d}
//                       onChange={() => setSelectedDiscount(d)}
//                       className="accent-green-600"
//                     />
//                     {d}%
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>

//           <hr />

//           {/* RATING */}
//           <div>
//             <button onClick={() => setOpenRating(!openRating)}
//               className="flex justify-between w-full font-semibold">
//               Rating
//               <IoIosArrowDown className={`${openRating && "rotate-180"}`} />
//             </button>

//             {openRating && (
//               <div className="mt-3 space-y-2">
//                 {[5, 4, 3].map(r => (
//                   <label key={r} className="flex gap-2 items-center">
//                     <input
//                       type="checkbox"
//                       checked={selectedRating === r}
//                       onChange={() => setSelectedRating(r)}
//                       className="accent-green-600"
//                     />

//                     <div className="flex text-green-600">
//                       {Array.from({ length: r }).map((_, i) => (
//                         <IoStarSharp key={i} />
//                       ))}
//                     </div>

//                     <span className="text-sm text-gray-600">
//                       {r}.0 & up
//                     </span>
//                   </label>
//                 ))}
//               </div>
//             )}
//           </div>

//         </div>

//         {/* PRODUCTS */}
//         <div className="flex-1">
//           {filteredProducts.length === 0 ? (
//             <p className="text-center mt-10 text-gray-500">
//               No Products Found
//             </p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//               {filteredProducts.map(item => (
//                 <ProductCard key={item._id} item={item} />
//               ))}
//             </div>
//           )}
//         </div>

//       </div>

//       {/* 🔥 FIXED SLIDER THUMB STYLE */}
//       <style>{`
//         .range-thumb {
//           position: absolute;
//           width: 100%;
//           appearance: none;
//           background: transparent;
//           pointer-events: none;
//         }

//         .range-thumb::-webkit-slider-thumb {
//           appearance: none;
//           pointer-events: all;
//           width: 16px;
//           height: 16px;
//           background: white;
//           border: 3px solid #22c55e;
//           border-radius: 50%;
//           margin-top: -6px;
//         }

//         .range-thumb::-moz-range-thumb {
//           pointer-events: all;
//           width: 16px;
//           height: 16px;
//           background: white;
//           border: 3px solid #22c55e;
//           border-radius: 50%;
//         }
//       `}</style>

//     </div>
//   );
// };

// export default ProductListing;


import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../Context/ProductContext";
import ProductCard from "../components/homeComponents/ProductCard";
import { IoStarSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import SelectDropdown from "../customStyles/SelectDropdown";

const ProductListing = () => {
  const { products } = useContext(ProductContext);

  const [filteredProducts, setFilteredProducts] = useState([]);

  // ✅ FILTER SIDEBAR TOGGLE
  const [showFilter, setShowFilter] = useState(false);

  // 🔽 DROPDOWN
  const [openCategory, setOpenCategory] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [openDiscount, setOpenDiscount] = useState(true);
  const [openRating, setOpenRating] = useState(true);
  const [openStock, setOpenStock] = useState(true);

  // 🔥 PRICE
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // 🔥 FILTERS
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [stock, setStock] = useState("in");

  const categories = [
    ...new Set(products.map(p => p?.category?.name).filter(Boolean))
  ];
const sortOptions = [
  { id: "low", label: "Price: Low to High" },
  { id: "high", label: "Price: High to Low" },
  { id: "rating", label: "Top Rated" }
];

const [sortValue, setSortValue] = useState("");
// SORT
useEffect(() => {
  let temp = [...products];

  // filters...

  // ✅ SORT ONLY HERE
  if (sortValue === "low") {
    temp.sort((a, b) =>
      (a?.variants?.[0]?.price || 0) -
      (b?.variants?.[0]?.price || 0)
    );
  }

  if (sortValue === "high") {
    temp.sort((a, b) =>
      (b?.variants?.[0]?.price || 0) -
      (a?.variants?.[0]?.price || 0)
    );
  }

  if (sortValue === "rating") {
    temp.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  setFilteredProducts(temp);

}, [products, priceRange, selectedCategory, stock, sortValue]);

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map(p =>
        Number(p?.variants?.[0]?.price || 0)
      );

      const min = Math.min(...prices);
      const max = Math.max(...prices);

      setMinPrice(min);
      setMaxPrice(max);
      setPriceRange([min, max]);
    }
  }, [products]);

 useEffect(() => {
  let temp = [...products];

  // FILTERS...

  if (selectedCategory.length > 0) {
    temp = temp.filter(p =>
      selectedCategory.includes(p?.category?.name)
    );
  }

  // PRICE
  temp = temp.filter(p => {
    const price = Number(p?.variants?.[0]?.price || 0);
    return price >= priceRange[0] && price <= priceRange[1];
  });

  // STOCK
  if (stock === "in") {
    temp = temp.filter(p => p?.inStock !== false);
  }

  // 🔥 SORT (ADD HERE ONLY)
  if (sortValue === "low") {
    temp.sort((a, b) =>
      (a?.variants?.[0]?.price || 0) -
      (b?.variants?.[0]?.price || 0)
    );
  }

  if (sortValue === "high") {
    temp.sort((a, b) =>
      (b?.variants?.[0]?.price || 0) -
      (a?.variants?.[0]?.price || 0)
    );
  }

  if (sortValue === "rating") {
    temp.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  setFilteredProducts(temp);

}, [
  products,
  priceRange,
  selectedCategory,
  selectedDiscount,
  selectedRating,
  stock,
  sortValue   // ✅ include pannum
]);

  // ✅ CATEGORY TOGGLE (checkbox fix)
  const toggleCategory = (cat) => {
    setSelectedCategory(prev =>
      prev.includes(cat)
        ? prev.filter(c => c !== cat) // deselect
        : [...prev, cat] // select
    );
  };

  // 🔥 PRICE HANDLERS
  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), priceRange[1] - 1);
    setPriceRange([value, priceRange[1]]);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), priceRange[0] + 1);
    setPriceRange([priceRange[0], value]);
  };

  return (
    <div className="min-h-screen p-4 md:p-6">

      {/* 🔥 TOP BAR */}
<div className="mb-6">

  <div className="flex justify-between items-start md:items-center gap-3">

    {/* LEFT - FILTER */}
    <button
      onClick={() => setShowFilter(prev => !prev)}
      className="flex items-center gap-2 bg-[#00B207] text-white px-4 py-2 rounded-md text-sm"
    >
      <HiOutlineAdjustmentsHorizontal size={18} />
      Filter
    </button>

    {/* RIGHT SIDE */}
    <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-3">

      {/* SORT */}
      <div className="w-[150px] md:w-[200px]">
        <SelectDropdown
          options={sortOptions}
          value={sortValue}
          onChange={setSortValue}
          placeholder="Sort By"
        />
      </div>

      {/* RESULTS */}
      <span className="text-sm text-gray-500">
        {filteredProducts.length} Results
      </span>

    </div>

  </div>

</div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* ✅ SIDEBAR */}
        {showFilter && (
          <div className="w-full lg:w-[280px] bg-white p-5 rounded-xl space-y-5 h-fit">

            {/* AVAILABILITY */}
            <div>
              <button onClick={() => setOpenStock(!openStock)}
                className="flex justify-between w-full font-semibold">
                Availability
                <IoIosArrowDown className={`${openStock && "rotate-180"}`} />
              </button>

              {openStock && (
                <div className="mt-3 space-y-2">
                  <label className="flex gap-2 text-sm">
                    <input
                      type="radio"
                      checked={stock === "out"}
                      onChange={() => setStock("out")}
                    />
                    Out of Stock
                  </label>

                  <label className="flex gap-2 text-sm">
                    <input
                      type="radio"
                      checked={stock === "in"}
                      onChange={() => setStock("in")}
                      className="accent-green-600"
                    />
                    In Stock
                  </label>
                </div>
              )}
            </div>

            <hr />

            {/* CATEGORY */}
            <div>
              <button onClick={() => setOpenCategory(!openCategory)}
                className="flex justify-between w-full font-semibold">
                Category
                <IoIosArrowDown className={`${openCategory && "rotate-180"}`} />
              </button>

              {openCategory && (
                <div className="mt-3 space-y-2">
                  {categories.map(cat => (
                    <label key={cat} className="flex gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedCategory.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="accent-green-600"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <hr />

            {/* PRICE */}
            <div>
              <button onClick={() => setOpenPrice(!openPrice)}
                className="flex justify-between w-full font-semibold">
                Price
                <IoIosArrowDown className={`${openPrice && "rotate-180"}`} />
              </button>

              {openPrice && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-3">
                    ₹{priceRange[0]} – ₹{priceRange[1]}
                  </p>

                  <div className="relative h-6 flex items-center">
                    <div className="absolute w-full h-[4px] bg-gray-300 rounded-full" />

                    <div
                      className="absolute h-[4px] bg-[#00B207] rounded-full"
                      style={{
                        left: `${((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
                        right: `${100 - ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%`
                      }}
                    />

                    <input type="range" min={minPrice} max={maxPrice}
                      value={priceRange[0]} onChange={handleMinChange}
                      className="range-thumb" />

                    <input type="range" min={minPrice} max={maxPrice}
                      value={priceRange[1]} onChange={handleMaxChange}
                      className="range-thumb" />
                  </div>
                </div>
              )}
            </div>

            <hr />

            {/* DISCOUNT */}
            <div>
              <button onClick={() => setOpenDiscount(!openDiscount)}
                className="flex justify-between w-full font-semibold">
                Discount
                <IoIosArrowDown className={`${openDiscount && "rotate-180"}`} />
              </button>

              {openDiscount && (
                <div className="mt-3 space-y-2">
                  {[10, 30, 50, 70].map(d => (
                    <label key={d} className="flex gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedDiscount === d}
                        onChange={() =>
                          setSelectedDiscount(prev => prev === d ? null : d) // ✅ toggle
                        }
                        className="accent-green-600"
                      />
                      {d}%
                    </label>
                  ))}
                </div>
              )}
            </div>

            <hr />

            {/* RATING */}
            <div>
              <button onClick={() => setOpenRating(!openRating)}
                className="flex justify-between w-full font-semibold">
                Rating
                <IoIosArrowDown className={`${openRating && "rotate-180"}`} />
              </button>

              {openRating && (
                <div className="mt-3 space-y-2">
                  {[5, 4, 3].map(r => (
                    <label key={r} className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        checked={selectedRating === r}
                        onChange={() =>
                          setSelectedRating(prev => prev === r ? null : r) // ✅ toggle
                        }
                        className="accent-green-600"
                      />

                      <div className="flex text-green-600">
                        {Array.from({ length: r }).map((_, i) => (
                          <IoStarSharp key={i} />
                        ))}
                      </div>

                      <span className="text-sm text-gray-600">
                        {r}.0 & up
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* PRODUCTS */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <p className="text-center mt-10 text-gray-500">
              No Products Found
            </p>
          ) : (
            <div className={`grid gap-4 
              ${showFilter 
                ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" 
                : "grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
              }`}
            >
              {filteredProducts.map(item => (
                <ProductCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* SLIDER STYLE */}
      <style>{`
        .range-thumb {
          position: absolute;
          width: 100%;
          appearance: none;
          background: transparent;
          pointer-events: none;
        }

        .range-thumb::-webkit-slider-thumb {
          appearance: none;
          pointer-events: all;
          width: 16px;
          height: 16px;
          background: white;
          border: 3px solid #22c55e;
          border-radius: 50%;
          margin-top: -6px;
        }

        .range-thumb::-moz-range-thumb {
          pointer-events: all;
          width: 16px;
          height: 16px;
          background: white;
          border: 3px solid #22c55e;
          border-radius: 50%;
        }
      `}</style>

    </div>
  );
};

export default ProductListing;