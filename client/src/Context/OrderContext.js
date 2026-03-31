import { createContext, useContext, useState, useEffect } from "react";
import { LoginContext } from "./LoginContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { currentUser } = useContext(LoginContext); // always latest user
  const [orderData, setOrderData] = useState([]);

  // Load orders from localStorage once
  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem("orders");
      if (storedOrders) {
        const parsed = JSON.parse(storedOrders);
        if (Array.isArray(parsed)) setOrderData(parsed);
      }
    } catch (err) {
      console.error("Error loading orders:", err);
    }
  }, []);

  // Add order with current user's customerId
  const addOrder = (newOrder) => {
    if (!currentUser) {
      alert("Please login first!");
      return;
    }

    const orderWithCustomer = {
      ...newOrder,
      customerId: currentUser.customerId,
      orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: "Order received",
      statusHistory: [{ status: "Order received", date: new Date().toLocaleString() }]
    };

    setOrderData((prev) => {
      const updated = [...prev, orderWithCustomer];
      localStorage.setItem("orders", JSON.stringify(updated));
      return updated;
    });
  };

  const updateOrderItems = (orderId, newItems) => {
    setOrderData((prev) => {
      const updated = prev.map((order) =>
        order.orderId === orderId ? { ...order, items: newItems.map((item) => ({ ...item })) } : order
      );
      localStorage.setItem("orders", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <OrderContext.Provider
      value={{ orderData, setOrderData, addOrder, updateOrderItems }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder must be used within OrderProvider");
  return context;
};