// import { createContext, useContext, useState, useEffect } from "react";

// const OrderContext = createContext();

// export const OrderProvider = ({ children }) => {
//   const [orderData, setOrderData] = useState(() => {
//     const stored = localStorage.getItem("orderData");
//     return stored ? JSON.parse(stored) : null;
//   });

//   // localStorage sync
//   useEffect(() => {
//     if (orderData) {
//       localStorage.setItem("orderData", JSON.stringify(orderData));
//     }
//   }, [orderData]);

//   return (
//     <OrderContext.Provider value={{ orderData, setOrderData }}>
//       {children}
//     </OrderContext.Provider>
//   );
// };

// // custom hook
// export const useOrder = () => useContext(OrderContext);

// import { createContext, useContext, useState, useEffect } from "react";

// const OrderContext = createContext();

// export const OrderProvider = ({ children }) => {
//   const [orderData, setOrderData] = useState(() => {
//     const stored = localStorage.getItem("orderData");
//     return stored ? JSON.parse(stored) : []; // <-- changed null to empty array
//   });

//   // localStorage sync
//   useEffect(() => {
//     localStorage.setItem("orderData", JSON.stringify(orderData)); // always sync
//   }, [orderData]);

//   return (
//     <OrderContext.Provider value={{ orderData, setOrderData }}>
//       {children}
//     </OrderContext.Provider>
//   );
// };

// // custom hook
// export const useOrder = () => useContext(OrderContext);

// import { createContext, useContext, useState, useEffect } from "react";

// // Create context
// const OrderContext = createContext();

// // Provider component
// export const OrderProvider = ({ children }) => {
//   const [orderData, setOrderData] = useState(() => {
//     const stored = localStorage.getItem("orderData");
//     try {
//       const parsed = stored ? JSON.parse(stored) : [];
//       return Array.isArray(parsed) ? parsed : []; // Ensure it's always an array
//     } catch (error) {
//       return []; // Fallback to empty array if JSON.parse fails
//     }
//   });

//   // Sync orderData to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("orderData", JSON.stringify(orderData));
//   }, [orderData]);

//   return (
//     <OrderContext.Provider value={{ orderData, setOrderData }}>
//       {children}
//     </OrderContext.Provider>
//   );
// };

// // Custom hook to use OrderContext
// export const useOrder = () => useContext(OrderContext);

import { createContext, useContext, useState, useEffect } from "react";

// Create context
const OrderContext = createContext();

// Provider component
export const OrderProvider = ({ children }) => {
  const [orderData, setOrderData] = useState(() => {
    try {
      // First try to read "orderData"
      const stored = localStorage.getItem("orderData");
      let parsed = stored ? JSON.parse(stored) : [];

      // If "orderData" is empty, fallback to "orders" key
      if (!Array.isArray(parsed) || parsed.length === 0) {
        const oldOrders = localStorage.getItem("orders");
        parsed = oldOrders ? JSON.parse(oldOrders) : [];
      }

      // Ensure it's always an array
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  });

  // Sync orderData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("orderData", JSON.stringify(orderData));
  }, [orderData]);

  return (
    <OrderContext.Provider value={{ orderData, setOrderData }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use OrderContext
export const useOrder = () => useContext(OrderContext);