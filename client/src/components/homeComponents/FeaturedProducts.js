// import React, { useContext } from "react";

// import productImg from "../../assets/product1.png";
// import ProductCard from "./ProductCard";
// import { ProductContext } from "../../Context/ProductContext";



// const FeaturedProducts = () => {
//     const { products } = useContext(ProductContext);
  
//   return (
//     <div className="bg-white-100 px-10 ">
      
      
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
  
//   <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold">
//     Featured Products
//   </h2>

//   <button className="text-green-700 font-medium hover:underline self-start sm:self-auto ">
//     View all
//   </button>

// </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {products.map((item) => (
//         <ProductCard key={item.id} item={item} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeaturedProducts;

import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import { ProductContext } from "../../Context/ProductContext";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {

  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  // 🔥 SAFE FILTER
  const featuredProducts = (products || []).filter(
    (item) => item.featuredProduct === true && item.showOnWebsite === true
  );

  // ❌ no products → hide
  if (featuredProducts.length === 0) return null;

  return (
    <div className="container mx-auto bg-white py-4 px-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
  
        <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold">
          Featured Products
        </h2>

        <button
          onClick={() => navigate("/category-products?type=featured")}
          className="text-green-700 font-medium hover:underline self-start sm:self-auto"
        >
          View all
        </button>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {featuredProducts.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>

    </div>
  );
};

export default FeaturedProducts;