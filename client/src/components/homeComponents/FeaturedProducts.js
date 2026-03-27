import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import { ProductContext } from "../../Context/ProductContext";
// import { useNavigate } from "react-router-dom";

const FeaturedProducts = ({ categoryName, isCategoryPage }) => {
  const { products } = useContext(ProductContext);
  // const navigate = useNavigate();

  const featuredProducts = (products || []).filter((item) => {
    const categoryMatch = categoryName
      ? item.category?.name?.toLowerCase() === categoryName.toLowerCase()
      : true;

    return categoryMatch && item.featuredProduct && item.showOnWebsite;
  });

  if (featuredProducts.length === 0) return null;

  return (
    <div className="bg-white md:px-8 py-4 mt-4">
      <div className="flex flex-row items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold">
          Featured Products
        </h2>

        {/* 🔥 only show button in home */}
        {/* {!isCategoryPage && (
          <button
            onClick={() => navigate("/category-products?type=featured")}
            className="text-[#354A10] font-medium whitespace-nowrap"
          >
            View all
          </button>
        )} */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {featuredProducts.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;