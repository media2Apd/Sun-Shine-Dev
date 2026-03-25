

// import React, { useContext } from "react";

// import { ProductContext } from "../../Context/ProductContext";
// import ProductCard from "./ProductCard";


// const NewLaunch = () => {

//   const { products } = useContext(ProductContext);
//   const [searchParams] = useSearchParams();
// const category = searchParams.get("category");

//   // filter new launch products
//  const newLaunchProducts = products.filter((item) => {
//   return (
//     item.category?.toLowerCase() === category?.toLowerCase() &&
//     item.newLaunch === true &&
//     item.showOnWebsite === true
//   );
// });

//   return (
//     <div className="bg-white-100 px-10 py-10 ">

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
  
//         <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold">
//           New Launch Products
//         </h2>

//         <button className="text-green-700 font-medium hover:underline self-start sm:self-auto ">
//           View all
//         </button>

//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

//         {newLaunchProducts.length > 0 ? (
//           newLaunchProducts.map((item) => (
//             <ProductCard key={item.id} item={item} />
//           ))
//         ) : (
//           <p className="text-gray-500">No new launch products</p>
//         )}

//       </div>

//     </div>
//   );
// };

// export default NewLaunch;

// import React, { useContext } from "react";
// import { ProductContext } from "../../Context/ProductContext";
// import { useSearchParams } from "react-router-dom";
// import ProductCard from "./ProductCard";

// const NewLaunch = () => {

//   const { products } = useContext(ProductContext);

//   const [searchParams] = useSearchParams();
//   const category = searchParams.get("category");

//   // filter new launch products based on category
//   const newLaunchProducts = products.filter((item) => {

//     const categoryMatch = category
//       ? item.category?.toLowerCase() === category.toLowerCase()
//       : true;

//     return categoryMatch && item.newLaunch === true && item.showOnWebsite === true;

//   });

//   return (
//     <div className="bg-white-100 px-10 py-10">

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
  
//         <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold">
//           New Launch Products
//         </h2>

//         <button className="text-green-700 font-medium hover:underline self-start sm:self-auto">
//           View all
//         </button>

//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

//         {newLaunchProducts.length > 0 ? (
//           newLaunchProducts.map((item) => (
//             <ProductCard key={item.id} item={item} />
//           ))
//         ) : (
//           <p className="text-gray-500">No new launch products</p>
//         )}

//       </div>

//     </div>
//   );
// };

// export default NewLaunch;

// import React, { useContext } from "react";
// import { ProductContext } from "../../Context/ProductContext";
// import { useLocation } from "react-router-dom";
// import ProductCard from "./ProductCard";

// const NewLaunch = () => {

//   const { products } = useContext(ProductContext);

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const categoryName = queryParams.get("category");

//   const newLaunchProducts = (products || []).filter((item) => {
//     const categoryMatch = categoryName
//       ? item.category?.name?.toLowerCase() === categoryName.toLowerCase()
//       : true;

//     return categoryMatch && item.newLaunch && item.showOnWebsite;
//   });

//   // ❗ products இல்லனா section render ஆகாது
//   if (newLaunchProducts.length === 0) return null;

//   return (
//     <div className="bg-white-100 px-10 py-10">

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
  
//         <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold">
//           New Launch Products
//         </h2>

//         <button className="text-green-700 font-medium hover:underline self-start sm:self-auto">
//           View all
//         </button>

//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

//         {newLaunchProducts.map((item) => (
//           <ProductCard key={item._id} item={item} />
//         ))}

//       </div>

//     </div>
//   );
// };

// export default NewLaunch;

import React, { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

const NewLaunch = ({ categoryName, isCategoryPage }) => {
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  const newLaunchProducts = (products || []).filter((item) => {
    const categoryMatch = categoryName
      ? item.category?.name?.toLowerCase() === categoryName.toLowerCase()
      : true;

    return categoryMatch && item.newLaunch && item.showOnWebsite;
  });

  // ❗ hide if empty
  if (newLaunchProducts.length === 0) return null;

  return (
    <div className="bg-white-100 md:px-10 py-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold">
          New Launch Products
        </h2>

        {/* 🔥 only show in home */}
        {!isCategoryPage && (
          <button
            onClick={() => navigate("/category-products?type=new")}
            className="text-green-700 font-medium hover:underline"
          >
            View all
          </button>
        )}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {newLaunchProducts.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default NewLaunch;