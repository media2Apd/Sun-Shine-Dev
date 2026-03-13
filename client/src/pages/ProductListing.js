import React, { useEffect, useState } from "react";
import ProductCard from "../components/homeComponents/ProductCard";
import { useSearchParams } from "react-router-dom";

const ProductListing = () => {

  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const stockFilter = searchParams.get("stock");

  const [price, setPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPriceLimit, setMaxPriceLimit] = useState(0);

  const [selectedDiscount, setSelectedDiscount] = useState(null);

  // CHANGE 1
  const [openSection, setOpenSection] = useState({
    availability: true,
    price: true,
    discount: true
  });

  useEffect(() => {

    const storedProducts =
      JSON.parse(localStorage.getItem("productContext")) || [];

    setProducts(storedProducts);

    if (storedProducts.length > 0) {

      const prices = storedProducts.map((p) => Number(p.price));

      const lowestPrice = Math.min(...prices);
      const highestPrice = Math.max(...prices);

      setMinPrice(lowestPrice);
      setMaxPriceLimit(highestPrice);
      setPrice(highestPrice);

    }

  }, []);

  // CHANGE 2
  const toggleSection = (section) => {
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleDiscountChange = (value) => {

    if (selectedDiscount === value) {
      setSelectedDiscount(null);
    } else {
      setSelectedDiscount(value);
    }

  };

  const filteredProducts = products.filter((item) => {

    if (stockFilter === "out" && Number(item.stock) >= 1) return false;
    if (stockFilter === "in" && Number(item.stock) < 1) return false;

    if (Number(item.price) > price) return false;

    if (selectedDiscount !== null) {

      const oldPrice = Number(item.oldPrice || 0);
      const sellingPrice = Number(item.price || 0);

      const productDiscount = Math.round(
        ((oldPrice - sellingPrice) / oldPrice) * 100
      );

      if (productDiscount < selectedDiscount) return false;

    }

    return true;

  });

  return (

    <div className="bg-[#f5f5f5] min-h-screen px-4 lg:px-6 py-6">

      <div className="flex justify-between items-center mb-6">

        <button className="bg-green-600 text-white px-5 py-2 rounded-full text-sm">
          Filter
        </button>

        <span className="text-sm text-gray-500">
          {filteredProducts.length} Results Found
        </span>

      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        <div className="w-full lg:w-[260px] bg-white p-5 rounded-lg">

          {/* AVAILABILITY */}

          <div className="border-b pb-4">

            <div
              onClick={() => toggleSection("availability")}
              className="flex justify-between items-center cursor-pointer"
            >
              <h3 className="font-semibold">Availability</h3>
              <span>{openSection.availability ? "−" : "+"}</span>
            </div>

            {openSection.availability && (
              <div className="mt-3">

                <label className="flex items-center gap-2 text-sm mb-2">
                  <input
                    type="radio"
                    className="accent-green-600"
                    name="stock"
                    checked={stockFilter === "out"}
                    onChange={() => setSearchParams({ stock: "out" })}
                  />
                  Out of Stock
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    className="accent-green-600"
                    name="stock"
                    checked={stockFilter === "in"}
                    onChange={() => setSearchParams({ stock: "in" })}
                  />
                  In Stock
                </label>

              </div>
            )}

          </div>

          {/* PRICE */}

          <div className="border-b py-4">

            <div
              onClick={() => toggleSection("price")}
              className="flex justify-between items-center cursor-pointer"
            >
              <h3 className="font-semibold">Price</h3>
              <span>{openSection.price ? "−" : "+"}</span>
            </div>

            {openSection.price && (

              <div className="mt-4">

                <input
                  type="range"
                  min={minPrice}
                  max={maxPriceLimit}
                  value={price}
                  onChange={(e) =>
                    setPrice(Number(e.target.value))
                  }
                  className="w-full accent-green-600"
                />

                <p className="text-sm mt-2">
                  ₹{minPrice} – ₹{price}
                </p>

              </div>

            )}

          </div>

          {/* DISCOUNT */}

          <div className="py-4">

            <div
              onClick={() => toggleSection("discount")}
              className="flex justify-between items-center cursor-pointer"
            >
              <h3 className="font-semibold">Discount</h3>
              <span>{openSection.discount ? "−" : "+"}</span>
            </div>

            {openSection.discount && (

              <div className="mt-3">

                {[70, 50, 30, 10].map((d) => (

                  <label
                    key={d}
                    className="flex items-center gap-2 text-sm mb-2"
                  >

                    <input
                      type="checkbox"
                      className="accent-green-600"
                      checked={selectedDiscount === d}
                      onChange={() => handleDiscountChange(d)}
                    />

                    {d}% or more

                  </label>

                ))}

              </div>

            )}

          </div>

        </div>

        <div className="flex-1">

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

            {filteredProducts.map((item) => (

              <ProductCard
                key={item.id}
                item={item}
              />

            ))}

          </div>

        </div>

      </div>

    </div>

  );

};

export default ProductListing;


