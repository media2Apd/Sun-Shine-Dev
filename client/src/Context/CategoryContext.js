
import { createContext, useState, useEffect } from "react";

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

  // Adding a new product to the list an dupdating state
  const addCategory = (category) => {
    setCategory((prev) => [...prev, category]);
  };

  return (
    <CategoryContext.Provider value={{ category, addCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

