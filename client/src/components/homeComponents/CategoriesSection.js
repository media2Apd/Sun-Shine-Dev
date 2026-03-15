import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../../Context/CategoryContext";
const CategoriesSection = () => {

const navigate = useNavigate();
const [activeCategory, setActiveCategory] = useState(null);
const context = useContext(CategoryContext);
const categories = context?.category || [];

const handleCategoryClick = (categoryName) => {


setActiveCategory(categoryName);

navigate(
  `/category-products?category=${encodeURIComponent(categoryName)}`
);


};

return ( <div className="bg-white py-2 px-2">


  {/* Heading */}
  <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold mb-8 px-5">
    Shop by Categories
  </h2>

  {/* Scroll Container */}
  <div
    className="flex gap-2 md:gap-4 lg:gap-8 overflow-x-auto scroll-smooth pl-2 md:pl-10 lg:pl-20"
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
        key={index}
        onClick={() => handleCategoryClick(item?.name)}
        className="min-w-[30%] sm:min-w-[20%] md:min-w-[100px] flex-shrink-0 text-center cursor-pointer group"
      >

        {/* Circle Image */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden mx-auto transition-transform duration-300 group-hover:scale-105">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Category Name */}
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
