

// import React, { useContext, useState, useEffect } from "react";
// import { ProductContext } from "../Context/ProductContext";
// import ProductCard from "../components/homeComponents/ProductCard";
// import { IoStar } from "react-icons/io5";
// import { IoIosArrowDown } from "react-icons/io";
// import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
// import SelectDropdown from "../customStyles/SelectDropdown";

// const ProductListing = () => {
//   const { products } = useContext(ProductContext);

//   const [filteredProducts, setFilteredProducts] = useState([]);

//   // ✅ FILTER SIDEBAR TOGGLE
//   const [showFilter, setShowFilter] = useState(false);

//   // 🔽 DROPDOWN
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
//   const [stock, setStock] = useState("in");

//   const categories = [
//     ...new Set(products.map(p => p?.category?.name).filter(Boolean))
//   ];
// const sortOptions = [
//   { id: "low", label: "Price: Low to High" },
//   { id: "high", label: "Price: High to Low" },
//   { id: "rating", label: "Top Rated" }
// ];

// const [sortValue, setSortValue] = useState("");
// // SORT
// useEffect(() => {
//   let temp = [...products];

//   // filters...

//   // ✅ SORT ONLY HERE
//   if (sortValue === "low") {
//     temp.sort((a, b) =>
//       (a?.variants?.[0]?.price || 0) -
//       (b?.variants?.[0]?.price || 0)
//     );
//   }

//   if (sortValue === "high") {
//     temp.sort((a, b) =>
//       (b?.variants?.[0]?.price || 0) -
//       (a?.variants?.[0]?.price || 0)
//     );
//   }

//   if (sortValue === "rating") {
//     temp.sort((a, b) => (b.rating || 0) - (a.rating || 0));
//   }

//   setFilteredProducts(temp);

// }, [products, priceRange, selectedCategory, stock, sortValue]);

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

// useEffect(() => {
//   let temp = [...products];

//   // CATEGORY
//   if (selectedCategory.length > 0) {
//     temp = temp.filter(p =>
//       selectedCategory.includes(p?.category?.name)
//     );
//   }

//   // DISCOUNT
//   if (selectedDiscount) {
//     temp = temp.filter(p => (p?.variants?.[0]?.discount || 0) >= selectedDiscount);
//   }

//   // PRICE
//   temp = temp.filter(p => {
//     const price = Number(p?.variants?.[0]?.price || 0);
//     return price >= priceRange[0] && price <= priceRange[1];
//   });

//   // STOCK
//   if (stock === "in") {
//     temp = temp.filter(p => p?.inStock !== false);
//   }

//   // 🔥 RATING
//   if (selectedRating) {
//     temp = temp.filter(p => (p.averageRating || 0) >= selectedRating);
//   }

//   // SORT
//   if (sortValue === "low") {
//     temp.sort((a, b) =>
//       (a?.variants?.[0]?.price || 0) - (b?.variants?.[0]?.price || 0)
//     );
//   } else if (sortValue === "high") {
//     temp.sort((a, b) =>
//       (b?.variants?.[0]?.price || 0) - (a?.variants?.[0]?.price || 0)
//     );
//   } else if (sortValue === "rating") {
//     temp.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
//   }

//   setFilteredProducts(temp);

// }, [
//   products,
//   priceRange,
//   selectedCategory,
//   selectedDiscount,
//   selectedRating,
//   stock,
//   sortValue
// ]);

//   // ✅ CATEGORY TOGGLE (checkbox fix)
//   const toggleCategory = (cat) => {
//     setSelectedCategory(prev =>
//       prev.includes(cat)
//         ? prev.filter(c => c !== cat) // deselect
//         : [...prev, cat] // select
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
//     <div className="min-h-screen p-4 md:p-6">

//       {/* 🔥 TOP BAR */}
// <div className="mb-6">

//   <div className="flex justify-between items-start md:items-center gap-3">

//     {/* LEFT - FILTER */}
//     <button
//       onClick={() => setShowFilter(prev => !prev)}
//       className="flex items-center gap-2 bg-[#00B207] text-white px-4 py-2 rounded-md text-sm"
//     >
//       <HiOutlineAdjustmentsHorizontal size={18} />
//       Filter
//     </button>

//     {/* RIGHT SIDE */}
//     <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-3">

//       {/* SORT */}
//       <div className="w-[150px] md:w-[200px]">
//         <SelectDropdown
//           options={sortOptions}
//           value={sortValue}
//           onChange={setSortValue}
//           placeholder="Sort By"
//         />
//       </div>

//       {/* RESULTS */}
//       <span className="text-sm text-gray-500">
//         {filteredProducts.length} Results
//       </span>

//     </div>

//   </div>

// </div>

//       <div className="flex flex-col lg:flex-row gap-6">

//         {/* ✅ SIDEBAR */}
//         {showFilter && (
//           <div className="w-full lg:w-[280px] bg-white p-5 rounded-xl space-y-5 h-fit">

//             {/* AVAILABILITY */}
//             <div>
//               <button onClick={() => setOpenStock(!openStock)}
//                 className="flex justify-between w-full font-semibold">
//                 Availability
//                 <IoIosArrowDown className={`${openStock && "rotate-180"}`} />
//               </button>

//               {openStock && (
//                 <div className="mt-3 space-y-2">
//                   <label className="flex gap-2 text-sm">
//                     <input
//                       type="radio"
//                       checked={stock === "out"}
//                       onChange={() => setStock("out")}
//                     />
//                     Out of Stock
//                   </label>

//                   <label className="flex gap-2 text-sm">
//                     <input
//                       type="radio"
//                       checked={stock === "in"}
//                       onChange={() => setStock("in")}
//                       className="accent-green-600"
//                     />
//                     In Stock
//                   </label>
//                 </div>
//               )}
//             </div>

//             <hr />

//             {/* CATEGORY */}
//             <div>
//               <button onClick={() => setOpenCategory(!openCategory)}
//                 className="flex justify-between w-full font-semibold">
//                 Category
//                 <IoIosArrowDown className={`${openCategory && "rotate-180"}`} />
//               </button>

//               {openCategory && (
//                 <div className="mt-3 space-y-2">
//                   {categories.map(cat => (
//                     <label key={cat} className="flex gap-2 text-sm">
//                       <input
//                         type="checkbox"
//                         checked={selectedCategory.includes(cat)}
//                         onChange={() => toggleCategory(cat)}
//                         className="accent-green-600"
//                       />
//                       {cat}
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <hr />

//             {/* PRICE */}
//             <div>
//               <button onClick={() => setOpenPrice(!openPrice)}
//                 className="flex justify-between w-full font-semibold">
//                 Price
//                 <IoIosArrowDown className={`${openPrice && "rotate-180"}`} />
//               </button>

//               {openPrice && (
//                 <div className="mt-4">
//                   <p className="text-sm text-gray-600 mb-3">
//                     ₹{priceRange[0]} – ₹{priceRange[1]}
//                   </p>

//                   <div className="relative h-6 flex items-center">
//                     <div className="absolute w-full h-[4px] bg-gray-300 rounded-full" />

//                     <div
//                       className="absolute h-[4px] bg-[#00B207] rounded-full"
//                       style={{
//                         left: `${((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%`,
//                         right: `${100 - ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%`
//                       }}
//                     />

//                     <input type="range" min={minPrice} max={maxPrice}
//                       value={priceRange[0]} onChange={handleMinChange}
//                       className="range-thumb" />

//                     <input type="range" min={minPrice} max={maxPrice}
//                       value={priceRange[1]} onChange={handleMaxChange}
//                       className="range-thumb" />
//                   </div>
//                 </div>
//               )}
//             </div>

//             <hr />

//             {/* DISCOUNT */}
//             <div>
//               <button onClick={() => setOpenDiscount(!openDiscount)}
//                 className="flex justify-between w-full font-semibold">
//                 Discount
//                 <IoIosArrowDown className={`${openDiscount && "rotate-180"}`} />
//               </button>

//               {openDiscount && (
//                 <div className="mt-3 space-y-2">
//                   {[10, 30, 50, 70].map(d => (
//                     <label key={d} className="flex gap-2 text-sm">
//                       <input
//                         type="checkbox"
//                         checked={selectedDiscount === d}
//                         onChange={() =>
//                           setSelectedDiscount(prev => prev === d ? null : d) // ✅ toggle
//                         }
//                         className="accent-green-600"
//                       />
//                       {d}%
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <hr />

//             {/* RATING */}
//    <div>
//   <button onClick={() => setOpenRating(!openRating)}
//     className="flex justify-between w-full font-semibold">
//     Rating
//     <IoIosArrowDown className={`${openRating && "rotate-180"}`} />
//   </button>

//   {openRating && (
//     <div className="mt-3 space-y-2">
//       {[5, 4, 3, 2, 1].map(r => (
//         <label key={r} className="flex gap-2 items-center cursor-pointer">
//           <input
//             type="checkbox"
//             checked={selectedRating === r}
//             onChange={() =>
//               setSelectedRating(prev => prev === r ? null : r)
//             }
//             className="accent-green-600"
//           />

//           <div className="flex gap-1"> {/* gap added here */}
//             {Array.from({ length: 5 }).map((_, i) => (
//               <IoStar
//                 key={i}
//                 className={i < r ? "text-[#FF8A00]" : "text-gray-300"}
//               />
//             ))}
//           </div>

//           <span className="text-sm text-gray-600">
//             {r}.0 & up
//           </span>
//         </label>
//       ))}
//     </div>
//   )}
// </div>

//           </div>
//         )}

//         {/* PRODUCTS */}
//         <div className="flex-1">
//           {filteredProducts.length === 0 ? (
//             <p className="text-center mt-10 text-gray-500">
//               No Products Found
//             </p>
//           ) : (
//             <div className={`grid gap-4 
//               ${showFilter 
//                 ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" 
//                 : "grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
//               }`}
//             >
//               {filteredProducts.map(item => (
//                 <ProductCard key={item._id} item={item} />
//               ))}
//             </div>
//           )}
//         </div>

//       </div>

//       {/* SLIDER STYLE */}
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
import { IoStar } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import SelectDropdown from "../customStyles/SelectDropdown";

const ProductListing = () => {
  const { products } = useContext(ProductContext);

  const [filteredProducts, setFilteredProducts] = useState([]);

  // FILTER SIDEBAR
  const [showFilter, setShowFilter] = useState(false);

  // DROPDOWNS
  const [openCategory, setOpenCategory] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [openDiscount, setOpenDiscount] = useState(true);
  const [openRating, setOpenRating] = useState(true);
  const [openStock, setOpenStock] = useState(true);

  // PRICE
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // FILTERS
  const [selectedCategory, setSelectedCategory] = useState([]);
 const [selectedDiscount, setSelectedDiscount] = useState([]);
const [selectedRating, setSelectedRating] = useState([]);
  const [stock, setStock] = useState("in");

  // SORT
  const [sortValue, setSortValue] = useState("");
  const sortOptions = [
    { id: "low", label: "Price: Low to High" },
    { id: "high", label: "Price: High to Low" },
    { id: "rating", label: "Top Rated" },
  ];

  // UNIQUE CATEGORIES
  const categories = [
    ...new Set(products.map(p => p?.category?.name).filter(Boolean))
  ];

  // PRICE RANGE SETUP
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map(p => Number(p?.variants?.[0]?.price || 0));
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setMinPrice(min);
      setMaxPrice(max);
      setPriceRange([min, max]);
    }
  }, [products]);

  // FILTER + SORT USEEFFECT
  useEffect(() => {
    let temp = [...products];

    // CATEGORY
    if (selectedCategory.length > 0) {
      temp = temp.filter(p => selectedCategory.includes(p?.category?.name));
    }

    // DISCOUNT
if (selectedDiscount.length > 0) {
  temp = temp.filter(p =>
    selectedDiscount.some(d => (p?.variants?.[0]?.discount || 0) >= d)
  );
}


    // PRICE
    temp = temp.filter(p => {
      const price = Number(p?.variants?.[0]?.price || 0);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // STOCK
    if (stock === "in") temp = temp.filter(p => p?.inStock !== false);
    if (stock === "out") temp = temp.filter(p => p?.inStock === false);

    // RATING
if (selectedRating.length > 0) {
  temp = temp.filter(p =>
    selectedRating.some(r => (p.averageRating || 0) >= r)
  );
}

    // SORT
    if (sortValue === "low") {
      temp.sort(
        (a, b) => (a?.variants?.[0]?.price || 0) - (b?.variants?.[0]?.price || 0)
      );
    } else if (sortValue === "high") {
      temp.sort(
        (a, b) => (b?.variants?.[0]?.price || 0) - (a?.variants?.[0]?.price || 0)
      );
    } else if (sortValue === "rating") {
      temp.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
    }

    setFilteredProducts(temp);
  }, [
    products,
    priceRange,
    selectedCategory,
    selectedDiscount,
    selectedRating,
    stock,
    sortValue
  ]);

  // TOGGLE CATEGORY
  const toggleCategory = (cat) => {
    setSelectedCategory(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // PRICE HANDLERS
  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), priceRange[1] - 1);
    setPriceRange([value, priceRange[1]]);
  };
  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), priceRange[0] + 1);
    setPriceRange([priceRange[0], value]);
  };
 // Toggle discount
const toggleDiscount = (d) => {
  setSelectedDiscount(prev =>
    prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
  );
};

// Toggle rating
const toggleRating = (r) => {
  setSelectedRating(prev =>
    prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]
  );
};

  return (
    <div className="min-h-screen p-4 md:p-6">

      {/* TOP BAR */}
      <div className="mb-6 flex justify-between items-start md:items-center gap-3">
        <button
          onClick={() => setShowFilter(prev => !prev)}
          className="flex items-center gap-2 bg-[#00B207] text-white px-4 py-2 rounded-md text-sm"
        >
          <HiOutlineAdjustmentsHorizontal size={18} />
          Filter
        </button>

        <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-3">
          <div className="w-[150px] md:w-[200px]">
            <SelectDropdown
              options={sortOptions}
              value={sortValue}
              onChange={setSortValue}
              placeholder="Sort By"
            />
          </div>
          <span className="text-sm text-gray-500">
            {filteredProducts.length} Results
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* SIDEBAR */}
        {showFilter && (
          <div className="w-full lg:w-[280px] bg-white p-5 rounded-xl space-y-5 h-fit">

            {/* STOCK */}
            <div>
              <button
                onClick={() => setOpenStock(!openStock)}
                className="flex justify-between w-full font-semibold"
              >
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
              <button
                onClick={() => setOpenCategory(!openCategory)}
                className="flex justify-between w-full font-semibold"
              >
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
              <button
                onClick={() => setOpenPrice(!openPrice)}
                className="flex justify-between w-full font-semibold"
              >
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
              <button
                onClick={() => setOpenDiscount(!openDiscount)}
                className="flex justify-between w-full font-semibold"
              >
                Discount
                <IoIosArrowDown className={`${openDiscount && "rotate-180"}`} />
              </button>
              {openDiscount && (
                <div className="mt-3 space-y-2">
                 {[10, 30, 50, 70].map(d => (
  <label key={d} className="flex gap-2 text-sm">
    <input
      type="checkbox"
      checked={selectedDiscount.includes(d)}
      onChange={() => toggleDiscount(d)}
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
              <button
                onClick={() => setOpenRating(!openRating)}
                className="flex justify-between w-full font-semibold"
              >
                Rating
                <IoIosArrowDown className={`${openRating && "rotate-180"}`} />
              </button>
              {openRating && (
                <div className="mt-3 space-y-2">
                 {[5, 4, 3, 2, 1].map(r => (
  <label key={r} className="flex gap-2 items-center cursor-pointer">
    <input
      type="checkbox"
      checked={selectedRating.includes(r)}
      onChange={() => toggleRating(r)}
      className="accent-green-600"
    />
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <IoStar
          key={i}
          className={i < r ? "text-[#FF8A00]" : "text-gray-300"}
        />
      ))}
    </div>
    <span className="text-sm text-gray-600">{r}.0 & up</span>
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