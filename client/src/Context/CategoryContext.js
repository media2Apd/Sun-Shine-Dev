
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
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [category, setCategory] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await api({
        url: SummaryApi.getAllCategories.url,
        method: SummaryApi.getAllCategories.method,
      });

      setCategory(res.data?.data || []);
    } catch (err) {
      console.log("Category fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ category }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);