import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import productImg1 from "../assets/product1.png";
import productImg2 from "../assets/organicproduct.png";
import CategoriesSection from "../components/homeComponents/CategoriesSection";
import banner from "../assets/ProductsBanner.png";
import BiobasedProducts from "../components/homeComponents/BiobasedProduct";
import NewLaunch from "../components/homeComponents/NewLaunch";
import ProductCard from "../components/homeComponents/ProductCard";
import { ProductContext } from "../Context/ProductContext";



const CategoryProducts = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { products } = useContext(ProductContext);

  //  Filter Logic
  const filteredProducts = category
    ? products.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      )
    : products;

  return (
    <div >
      <img src={banner} alt="Banner" className="relative w-full h-full overflow-hidden leading-none" />
     <div className="px-6 py-10">
      <CategoriesSection/>
      <div className="px-10">

      <h2 className="text-2xl font-semibold mb-8 capitalize mt-10">
        {category ? `${category} Products` : "All Products"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))
        ) : (
            <p className="text-gray-500">No products found in this category.</p>
           
        )}
      </div>
   
      </div>
    </div>
    </div>

    
  );
};

export default CategoryProducts;