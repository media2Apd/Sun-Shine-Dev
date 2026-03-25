import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import { ProductContext } from "../../Context/ProductContext";
import { CategoryContext } from "../../Context/CategoryContext";
import { useNavigate } from "react-router-dom";

const HomeProducts = () => {

  const { products } = useContext(ProductContext);
    const context = useContext(CategoryContext);
    const category = context?.category || [];
    const navigate = useNavigate();
  
  return (
    <div className="px-10 py-5">

      {category.map((cat, index) => {

        const categoryProducts = products
          .filter(
            (p) =>
              String(p.category?._id) === String(cat._id) &&
              p.showOnWebsite === true
          )
          .slice(0, 4);

        if (categoryProducts.length === 0) {
          return null;
        }

        return (
          <div key={cat._id || index} className="container mx-auto py-4 px-8">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold">{cat.name}</h2>

              <button
                onClick={() =>
                  navigate(`/category-products?category=${cat._id}`)
                }
                className="text-[#354A10] font-medium"
              >
                View all
              </button>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoryProducts.map((item) => (
                <ProductCard key={item._id} item={item} />
              ))}
            </div>

          </div>
        );
      })}

    </div>
  );
};

export default HomeProducts;