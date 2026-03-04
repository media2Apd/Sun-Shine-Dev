import React from "react";
import productImg from "../../assets/organicproduct.png";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Azospirillum Nitrogen Food Bacteria",
    price: 650,
    oldPrice: 850,
    image: productImg,
    category: "organic",
  },
  {
    id: 2,
    name: "Azospirillum Nitrogen Food Bacteria",
    price: 650,
    oldPrice: 850,
    image: productImg,
  },
  {
    id: 3,
    name: "Azospirillum Nitrogen Food Bacteria",
    price: 650,
    oldPrice: 850,
    image: productImg,
  },
  {
    id: 4,
    name: "Azospirillum Nitrogen Food Bacteria",
    price: 650,
    oldPrice: 850,
    image: productImg,
  },
  

];

const OrganicProducts = () => {
  return (
    <div className="bg-white-100 px-10 py-2">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
  
  <h2 className="text-2xl md:text-2xl lg:text-3xl sm:text-2xl font-semibold sm:px-5">
   Organic Products
  </h2>

  <button className="text-green-700 font-medium hover:underline self-start sm:self-auto">
    View all
  </button>

</div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((item) => (
        <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default OrganicProducts;