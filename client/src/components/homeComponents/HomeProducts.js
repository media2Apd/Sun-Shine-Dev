import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import { ProductContext } from "../../Context/ProductContext";
import { CategoryContext } from "../../Context/CategoryContext";

const HomeProducts = () => {

  const { products } = useContext(ProductContext);
    const context = useContext(CategoryContext);
  const category = context?.category || [];
  
  return (
    <div className="px-10 py-5">

      {category.map((cat, index) => {

        // filter products by category
        const categoryProducts = products
       .filter((p) => p.category === cat.name && p.showOnWebsite === true)
          .slice(0, 4);
   
// if no products in this category, don't show section
    if (categoryProducts.length === 0) {
    return null;
  }

        return (
          <div key={index} className="mb-10">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">{cat.name}</h2>

              <button className="text-green-700 hover:underline">
                View all
              </button>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoryProducts.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>

          </div>
        );
      })}

    </div>
  );
};

export default HomeProducts;