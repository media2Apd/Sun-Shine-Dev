import { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderData, setOrderData] = useState(() => {
    const stored = localStorage.getItem("orderData");
    return stored ? JSON.parse(stored) : null;
  });

  // localStorage sync
  useEffect(() => {
    if (orderData) {
      localStorage.setItem("orderData", JSON.stringify(orderData));
    }
  }, [orderData]);

  return (
    <OrderContext.Provider value={{ orderData, setOrderData }}>
      {children}
    </OrderContext.Provider>
  );
};

// custom hook
export const useOrder = () => useContext(OrderContext);