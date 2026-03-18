
// import { createContext, useState, useEffect } from "react";

// export const CategoryContext = createContext();

// export const CategoryProvider = ({ children }) => {

//   // Load from localStorage first
//   const [category, setCategory] = useState(() => {
//     const savedProducts = localStorage.getItem("categoryContext");
//     return savedProducts ? JSON.parse(savedProducts) : [];
//   });

//   // Save to localStorage whenever category change
//   useEffect(() => {
//     localStorage.setItem("categoryContext", JSON.stringify(category));
//   }, [category]);

//   // Adding a new product to the list an dupdating state
//   const addCategory = (category) => {
//     setCategory((prev) => [...prev, category]);
//   };

//   return (
//     <CategoryContext.Provider value={{ category, addCategory }}>
//       {children}
//     </CategoryContext.Provider>
//   );
// };

import { createContext, useState, useEffect, useContext } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {

  // Load from localStorage first
  const [category, setCategory] = useState(() => {
    const savedProducts = localStorage.getItem("categoryContext");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  // Save to localStorage whenever category change
  useEffect(() => {
    localStorage.setItem("categoryContext", JSON.stringify(category));
  }, [category]);

  // ADD CATEGORY
  const addCategory = (newCategory) => {
    setCategory((prev) => [...prev, newCategory]);
  };

  // UPDATE CATEGORY
  const updateCategory = (updatedCategory) => {
    setCategory(
      category.map((c) =>
        c.id === updatedCategory.id ? updatedCategory : c
      )
    );
  };

  // DELETE CATEGORY
  const deleteCategory = (id) => {
    setCategory(category.filter((c) => c.id !== id));
  };

  // HIDE / SHOW CATEGORY
  const toggleHideCategory = (id) => {
    setCategory(
      category.map((c) =>
        c.id === id
          ? { ...c, showOnWebsite: !c.showOnWebsite }
          : c
      )
    );
  };

  return (
    <CategoryContext.Provider
      value={{
        category,
        addCategory,
        updateCategory,
        deleteCategory,
        toggleHideCategory
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);