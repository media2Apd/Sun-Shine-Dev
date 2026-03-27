// import React, { useContext } from "react";
// import { useSearchParams } from "react-router-dom";
// import CategoriesSection from "../components/homeComponents/CategoriesSection";
// import banner from "../assets/ProductsBanner.png";
// import ProductCard from "../components/homeComponents/ProductCard";
// import { ProductContext } from "../Context/ProductContext";



// const CategoryProducts = () => {
//   const [searchParams] = useSearchParams();
//   const category = searchParams.get("category");
//   const { products } = useContext(ProductContext);

//   const filteredProducts = category
//     ? products.filter(
//         (item) =>
//           String(item.category?._id) === String(category)
//       )
//     : products;

//   return (
//     <div >
//       <img src={banner} alt="Banner" className="relative w-full h-full overflow-hidden leading-none" />
//      <div className="px-6 py-10">
//       <CategoriesSection/>
//       <div className="px-10">

//       <h2 className="text-2xl font-semibold mb-8 capitalize mt-10">
//         {category ? `${category} Products` : "All Products"}
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((item) => (
//             <ProductCard key={item.id} item={item} />
//           ))
//         ) : (
//             <p className="text-gray-500">No products found in this category.</p>
           
//         )}
//       </div>
   
//       </div>
//     </div>
//     </div>

    
//   );
// };

// export default CategoryProducts;

import React, { useContext } from "react";
import CategoriesSection from "../components/homeComponents/CategoriesSection";
import banner from "../assets/ProductsBanner.png";
import ProductCard from "../components/homeComponents/ProductCard";
import { ProductContext } from "../Context/ProductContext";
import { useLocation } from "react-router-dom";
import NewLaunch from "../components/homeComponents/NewLaunch";
import FeaturedProducts from "../components/homeComponents/FeaturedProducts";
const CategoryProducts = () => {
  const { products } = useContext(ProductContext);
  const location = useLocation();
  const categoryId = location.state?.categoryId;
  const queryParams = new URLSearchParams(location.search);
  const categoryName = queryParams.get("category");
  
  // ✅ FILTER
const filteredProducts = categoryId
  ? products.filter(
      (item) =>
        String(item.category?._id) === String(categoryId)
    )
  : products;

  // ✅ GET CATEGORY NAME
  // const selectedCategoryName = filteredProducts[0]?.category?.name;
  return (
    <div>
      <img src={banner} alt="Banner" className="w-full" />

      <div className="px-8 py-10">
        
        <CategoriesSection />

        <div className="container mx-auto px-8">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-8 mt-10">
            {categoryName || "All Products"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <ProductCard key={item._id} item={item} /> 
              ))
            ) : (
              <p className="text-gray-500">
                No products found in this category.
              </p>
            )}
          </div>
        </div>
      <div className="container mx-auto px">
        <NewLaunch 
          categoryName={categoryName} 
          isCategoryPage={true}
        />
        {/* <div className="container mx-auto px-8"> */}
        <FeaturedProducts 
          categoryName={categoryName} 
          isCategoryPage={true}
        />
        {/* </div> */}
      </div>
      </div>
    </div>
  );
};

export default CategoryProducts;