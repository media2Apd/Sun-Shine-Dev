import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../common/apiClient";
import SummaryApi from "../../common/SummaryApi";
const CategoriesSection = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeCategory = queryParams.get("category");
  const [categories, setCategories] = useState([]);

  // 🔥 FETCH CATEGORIES
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api({
        url: SummaryApi.getAllCategories.url,
        method: SummaryApi.getAllCategories.method,
      });

      setCategories(res.data?.data || res.data || []);
    } catch (err) {
      console.log("Category fetch error:", err);
    }
  };

    const handleCategoryClick = (item) => {

      navigate(
        `/category-products?category=${encodeURIComponent(item.name)}`,
        {
          state: {
            categoryId: item._id,
            categoryName: item.name,
          },
        }
      );
    };

  return (
   <div className="container mx-auto bg-white py-4 px-4 md:px-8">
  {/* Heading */}
  <h2 className="text-2xl lg:text-3xl font-semibold mb-8">
    Shop by Categories
  </h2>

  {/* Scroll */}
  <div
    className="flex items-start gap-3 md:gap-4 lg:gap-8 overflow-x-auto scroll-smooth md:px-4"
    style={{
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    }}
  >
    <style>
      {`
        div::-webkit-scrollbar {
          display: none;
        }
      `}
    </style>

    {categories.map((item, index) => (
      <div
        key={item._id || index}
        onClick={() => handleCategoryClick(item)}
        className="w-[90px] sm:w-[100px] md:w-[110px] flex-shrink-0 text-center cursor-pointer group snap-start"
      >
        {/* Image */}
        <div className="border w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden mx-auto transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
          <img
            src={item?.image?.url}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <p
          className={`mt-2 text-xs sm:text-sm font-medium text-center leading-4 h-10 overflow-hidden ${
            activeCategory === item.name
              ? "text-[#00B207]"
              : "text-black group-hover:text-[#00B207]"
          }`}
        >
          {item.name}
        </p>
      </div>
    ))}
  </div>
</div>
  );
};

export default CategoriesSection;
