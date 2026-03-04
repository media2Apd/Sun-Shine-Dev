import React from "react";
import { useSearchParams } from "react-router-dom";
import productImg1 from "../assets/product1.png";
import productImg2 from "../assets/organicproduct.png";
import CategoriesSection from "../components/homeComponents/CategoriesSection";
import banner from "../assets/ProductsBanner.png";
import BiobasedProducts from "../components/homeComponents/BiobasedProduct";
import NewLaunch from "../components/homeComponents/NewLaunch";

//  Product Data
const products = [
  {
    id: 1,
    name: "Azospirillum Nitrogen Food Bacteria",
    price: 650,
    oldPrice: 850,
    image: productImg1,
    category: "Organic Manures",
  },
  {
    id: 2,
    name: "Azospirillum Nitrogen Food Bacteria",
    price: 650,
    oldPrice: 850,
    image: productImg1,
    category: "water Soluble Fertilizers",
  },
  {
    id: 5,
    name: "Azospirillum Nitrogen Food Bacteria",
    price: 650,
    oldPrice: 850,
    image: productImg2,
    category: "plant Growth Promoters",
  },
  {
    id: 6,
    name: "Azospirillum Nitrogen Food Bacteria",
    price: 650,
    oldPrice: 850,
    image: productImg2,
    category: "bio Pesticides",
  },
   {
    id: 7,
    name: "Azospirillum Nitrogen Food Bacteria",
    price: 650,
    oldPrice: 850,
    image: productImg2,
    category: "bio Fertilizers",
  },
   {
    id: 8,
    name: "Azospirillum Nitrogen Food Bacteria",
    price: 650,
    oldPrice: 850,
    image: productImg2,
    category: "Micronutrients",
  },
];

const CategoryProducts = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

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
      
      <h2 className="text-2xl font-semibold mb-8 capitalize mt-10">
        {category ? `${category} Products` : "All Products"}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-contain mb-4 "
              />
              <h3 className="text-sm font-medium">
                {item.name}
              </h3>
              <p className="text-green-600 font-semibold">
                ₹{item.price}
              </p>
               
     
            </div>
          ))
        ) : (
            <p className="text-gray-500">No products found in this category.</p>
           
        )}
   
      </div>
      <NewLaunch/>
      <BiobasedProducts/>
    </div>
    </div>

    
  );
};

export default CategoryProducts;