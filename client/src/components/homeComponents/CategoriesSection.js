import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../common/apiClient";
import SummaryApi from "../../common/SummaryApi";
const CategoriesSection = () => {

  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
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

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);

    navigate(
      `/category-products?category=${encodeURIComponent(categoryName)}`
    );
  };

  return (
    <div className="container mx-auto bg-white py-4 px-8">
      {/* Heading */}
      <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold mb-8">
        Shop by Categories
      </h2>

      {/* Scroll */}
      <div
        className="flex gap-2 md:gap-4 lg:gap-8 overflow-x-auto scroll-smooth px-4"
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
            onClick={() => handleCategoryClick(item?.name)}
            className="min-w-[30%] sm:min-w-[20%] md:min-w-[100px] flex-shrink-0 text-center cursor-pointer group"
          >
            {/* Image */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden mx-auto transition-transform duration-300 group-hover:scale-105">
              <img
                src={item?.image?.url}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Name */}
            <p
              className={`mt-3 text-xs sm:text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis transition
              ${
                activeCategory === item.name
                  ? "text-green-600"
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
