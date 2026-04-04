
// import { createContext, useState, useEffect } from "react";

// export const ProductContext = createContext();

// export const ProductProvider = ({ children }) => {

//   const [products, setProducts] = useState(() => {
//     const saved = localStorage.getItem("productContext");
//     return saved ? JSON.parse(saved) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("productContext", JSON.stringify(products));
//   }, [products]);

//   const addProduct = (product) => {
//     setProducts((prev) => [
//       ...prev,
//       { ...product, showOnWebsite: true }
//     ]);
//   };

//   const deleteProduct = (id) => {
//     const updatedProducts = products.filter((item) => item.id !== id);
//     setProducts(updatedProducts);
//   };

//   const toggleHideProduct = (id) => {

//     const updatedProducts = products.map((item) => {

//       if (item.id === id) {

//         const current = item.showOnWebsite ?? true;

//         return {
//           ...item,
//           showOnWebsite: !current
//         };

//       }

//       return item;

//     });

//     setProducts(updatedProducts);

//   };
// const updateProduct = (updatedProduct) => {

//   setProducts((prevProducts) =>
//     prevProducts.map((p) =>
//       p.id === updatedProduct.id ? updatedProduct : p
//     )
//   );

// };

//   return (
//    <ProductContext.Provider
//   value={{
//     products,
//     addProduct,
//     updateProduct,
//     deleteProduct,
//     toggleHideProduct
//   }}
// >
//       {children}
//     </ProductContext.Provider>
//   );
// };


import { createContext, useState, useEffect } from "react";
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // 🔥 FETCH PRODUCTS FROM API
  const fetchProducts = async () => {
    try {
      const res = await api({
        url: SummaryApi.getAllProducts.url,
        method: SummaryApi.getAllProducts.method,
      });

      setProducts(res.data?.data || res.data || []);
    } catch (err) {
      console.log("Product fetch error:", err);
    }
  };

  // 🔥 LOAD ON START
  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔥 DELETE PRODUCT (API)
  const deleteProduct = async (id) => {
    try {
      await api.delete(SummaryApi.deleteProduct.url, {
        data: { productId: id },
      });

      fetchProducts(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 UPDATE PRODUCT (API)
  const updateProduct = async (updatedProduct) => {
    try {
      await api.put(SummaryApi.updateProduct.url, updatedProduct);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 TOGGLE VISIBILITY (LOCAL OR API)
  const toggleHideProduct = async (id) => {
    try {
      await api.put(SummaryApi.toggleProduct.url, {
        productId: id,
      });

      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        fetchProducts,
        updateProduct,
        deleteProduct,
        toggleHideProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};