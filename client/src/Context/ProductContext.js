
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

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("productContext");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("productContext", JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    setProducts((prev) => [
      ...prev,
      { ...product, showOnWebsite: true }
    ]);
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter((item) => item.id !== id);
    setProducts(updatedProducts);
  };

  const toggleHideProduct = (id) => {

    const updatedProducts = products.map((item) => {

      if (item.id === id) {

        const current = item.showOnWebsite ?? true;

        return {
          ...item,
          showOnWebsite: !current
        };

      }

      return item;

    });

    setProducts(updatedProducts);

  };

  const updateProduct = (updatedProduct) => {

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      )
    );

  };

  return (

    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleHideProduct
      }}
    >

      {children}

    </ProductContext.Provider>

  );

};