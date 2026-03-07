

import React, { useEffect, useState } from "react";

import ProductCard from "../components/homeComponents/ProductCard";
import { useSearchParams } from "react-router-dom";

const ProductListing = () => {

  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const stockFilter = searchParams.get("stock");

  // ✅ PRICE STATES
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(1500);

  // ✅ NEW STATE (dynamic max price)
  const [maxPriceLimit, setMaxPriceLimit] = useState(0);

  useEffect(() => {

    const storedProducts = JSON.parse(localStorage.getItem("productContext")) || [];

    setProducts(storedProducts);

    // ✅ FIND HIGHEST PRICE FROM PRODUCTS
    const highestPrice = Math.max(...storedProducts.map(p => Number(p.price)));

    setMaxPriceLimit(highestPrice);
    setMaxPrice(highestPrice);

  }, []);

  const filteredProducts = products.filter((item) => {

    // stock filter
    if (stockFilter === "out" && Number(item.stock) >= 1) {
      return false;
    }

    if (stockFilter === "in" && Number(item.stock) < 1) {
      return false;
    }

    // ✅ price filter
    if (Number(item.price) < minPrice || Number(item.price) > maxPrice) {
      return false;
    }

    return true;
  });

  return (
    <div className="bg-[#f5f5f5] min-h-screen px-6 py-6">

      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">

        <button className="bg-green-600 text-white px-5 py-2 rounded-full text-sm">
          Filter
        </button>

        <div className="flex items-center gap-6">

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Sort by:</span>

            <select className="border rounded px-3 py-1 text-sm">
              <option>Latest</option>
            </select>
          </div>

          <span className="text-sm text-gray-500">
            {filteredProducts.length} Results Found
          </span>

        </div>

      </div>

      <div className="flex gap-6">

        {/* Sidebar */}
        <div className="w-[250px] bg-white p-5 rounded-lg">

          <h3 className="font-semibold mb-3">Availability</h3>

          <label className="flex items-center gap-2 text-sm mb-2">
            <input
              type="radio"
              name="stock"
              checked={stockFilter === "out"}
              onChange={() => setSearchParams({ stock: "out" })}
            />
            Out of Stock
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="stock"
              checked={stockFilter === "in"}
              onChange={() => setSearchParams({ stock: "in" })}
            />
            In Stock
          </label>

          {/* ✅ PRICE FILTER */}
          <div className="mt-6">

            <h3 className="font-semibold mb-3">Price</h3>

            <input
              type="range"
              min="0"
              max={maxPriceLimit}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full"
            />

            <input
              type="range"
              min="0"
              max={maxPriceLimit}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full mt-2"
            />

            <p className="text-sm mt-2">
              Price: {minPrice} - {maxPrice}
            </p>

          </div>

        </div>

        {/* Products Grid */}
        <div className="flex-1">

          <div className="grid grid-cols-4 gap-6">

            {filteredProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductListing;