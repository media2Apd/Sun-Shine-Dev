import { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  // ✅ Initialize orderData from localStorage, single source
  const [orderData, setOrderData] = useState(() => {
    try {
      const stored = localStorage.getItem("orders");
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to parse orderData from localStorage:", error);
      return [];
    }
  });

  // ✅ Add new order safely
  const addOrder = newOrder => {
    setOrderData(prev => [...prev, { ...newOrder }]);
  };

  // ✅ Update order status safely with timeline
  const updateOrderStatus = (orderId, newStatus) => {
    const steps = ["Order received", "Processing", "On the way", "Delivered"];

    setOrderData(prev =>
      prev.map(order => {
        if (order.orderId !== orderId) return order;

        const currentIndex = steps.indexOf(order.status || "Order received");
        const newIndex = steps.indexOf(newStatus);

        // ❌ Prevent backward status
        if (newIndex <= currentIndex) return order;

        return {
          ...order,
          status: newStatus,
          statusHistory: [
            ...(order.statusHistory || []),
            { status: newStatus, date: new Date().toLocaleString() },
          ],
        };
      })
    );
  };

  // ✅ Update items for a specific order (deep copy to prevent override)
  const updateOrderItems = (orderId, newItems) => {
    setOrderData(prev =>
      prev.map(order =>
        order.orderId === orderId
          ? { ...order, items: newItems.map(item => ({ ...item })) }
          : { ...order, items: order.items.map(item => ({ ...item })) } // deep copy all orders
      )
    );
  };

  // ✅ Persist to localStorage
  useEffect(() => {
    localStorage.setItem("orderData", JSON.stringify(orderData));
  }, [orderData]);

  return (
    <OrderContext.Provider
      value={{
        orderData,
        setOrderData,
        addOrder,
        updateOrderStatus,
        updateOrderItems,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// ✅ Custom hook
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder must be used within OrderProvider");
  return context;
};