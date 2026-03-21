// import { createContext, useContext, useState, useEffect } from "react";

// const OrderContext = createContext();

// export const OrderProvider = ({ children }) => {
//   // ✅ Initialize orderData from localStorage, single source
//   const [orderData, setOrderData] = useState(() => {
//     try {
//       const stored = localStorage.getItem("orders");
//       const parsed = stored ? JSON.parse(stored) : [];
//       return Array.isArray(parsed) ? parsed : [];
//     } catch (error) {
//       console.error("Failed to parse orderData from localStorage:", error);
//       return [];
//     }
//   });

//   // ✅ Add new order safely
//   const addOrder = newOrder => {
//     setOrderData(prev => [...prev, { ...newOrder }]);
//   };

//   // ✅ Update order status safely with timeline
//   const updateOrderStatus = (orderId, newStatus) => {
//     const steps = ["Order received", "Processing", "On the way", "Delivered"];

//     setOrderData(prev =>
//       prev.map(order => {
//         if (order.orderId !== orderId) return order;

//         const currentIndex = steps.indexOf(order.status || "Order received");
//         const newIndex = steps.indexOf(newStatus);

//         // ❌ Prevent backward status
//         if (newIndex <= currentIndex) return order;

//         return {
//           ...order,
//           status: newStatus,
//           statusHistory: [
//             ...(order.statusHistory || []),
//             { status: newStatus, date: new Date().toLocaleString() },
//           ],
//         };
//       })
//     );
//   };

//   // ✅ Update items for a specific order (deep copy to prevent override)
//   const updateOrderItems = (orderId, newItems) => {
//     setOrderData(prev =>
//       prev.map(order =>
//         order.orderId === orderId
//           ? { ...order, items: newItems.map(item => ({ ...item })) }
//           : { ...order, items: order.items.map(item => ({ ...item })) } // deep copy all orders
//       )
//     );
//   };

//   // ✅ Persist to localStorage
//   useEffect(() => {
//     localStorage.setItem("orderData", JSON.stringify(orderData));
//   }, [orderData]);

//   return (
//     <OrderContext.Provider
//       value={{
//         orderData,
//         setOrderData,
//         addOrder,
//         updateOrderStatus,
//         updateOrderItems,
//       }}
//     >
//       {children}
//     </OrderContext.Provider>
//   );
// };

// // ✅ Custom hook
// export const useOrder = () => {
//   const context = useContext(OrderContext);
//   if (!context) throw new Error("useOrder must be used within OrderProvider");
//   return context;
// };
// import { createContext, useContext, useState, useEffect } from "react";

// const OrderContext = createContext();

// export const OrderProvider = ({ children }) => {
//   const [orderData, setOrderData] = useState(() => {
//     try {
//       const stored = localStorage.getItem("orders");
//       const parsed = stored ? JSON.parse(stored) : [];
//       return Array.isArray(parsed) ? parsed : [];
//     } catch (error) {
//       console.error("Failed to parse orderData:", error);
//       return [];
//     }
//   });

//   const addOrder = newOrder => {
//     setOrderData(prev => [...prev, { ...newOrder }]);
//   };

//   const updateOrderStatus = (orderId, newStatus) => {
//     const steps = ["Order received", "Processing", "On the way", "Delivered"];

//     setOrderData(prev =>
//       prev.map(order => {
//         if (order.orderId !== orderId) return order;

//         const currentIndex = steps.indexOf(order.status || "Order received");
//         const newIndex = steps.indexOf(newStatus);

//         if (newIndex <= currentIndex) return order;

//         return {
//           ...order,
//           status: newStatus,
//           statusHistory: [
//             ...(order.statusHistory || []),
//             { status: newStatus, date: new Date().toLocaleString() },
//           ],
//         };
//       })
//     );
//   };

//   const updateOrderItems = (orderId, newItems) => {
//     setOrderData(prev =>
//       prev.map(order =>
//         order.orderId === orderId
//           ? { ...order, items: newItems.map(item => ({ ...item })) }
//           : order
//       )
//     );
//   };

//   // ✅ Only one storage now
//   useEffect(() => {
//     localStorage.setItem("orders", JSON.stringify(orderData));
//   }, [orderData]);

//   return (
//     <OrderContext.Provider
//       value={{
//         orderData,
//         setOrderData,
//         addOrder,
//         updateOrderStatus,
//         updateOrderItems,
//       }}
//     >
//       {children}
//     </OrderContext.Provider>
//   );
// };

// export const useOrder = () => {
//   const context = useContext(OrderContext);
//   if (!context) throw new Error("useOrder must be used within OrderProvider");
//   return context;
// };

// import { createContext, useContext, useState, useEffect } from "react";

// const OrderContext = createContext();

// export const OrderProvider = ({ children }) => {
//   const [orderData, setOrderData] = useState([]);

//   // Load orders only once
//   useEffect(() => {
//     try {
//       const storedOrders = localStorage.getItem("orders");
//       if (storedOrders) {
//         const parsed = JSON.parse(storedOrders);
//         if (Array.isArray(parsed)) {
//           setOrderData(parsed);
//         }
//       }
//     } catch (err) {
//       console.error("Error loading orders:", err);
//     }
//   }, []);

//   const addOrder = (newOrder) => {
//     setOrderData((prev) => {
//       const updated = [...prev, { ...newOrder }];
//       localStorage.setItem("orders", JSON.stringify(updated));
//       return updated;
//     });
//   };

//   const updateOrderStatus = (orderId, newStatus) => {
//     const steps = ["Order received", "Processing", "On the way", "Delivered"];

//     setOrderData((prev) => {
//       const updated = prev.map((order) => {
//         if (order.orderId !== orderId) return order;

//         const currentIndex = steps.indexOf(order.status || "Order received");
//         const newIndex = steps.indexOf(newStatus);

//         if (newIndex <= currentIndex) return order;

//         return {
//           ...order,
//           status: newStatus,
//           statusHistory: [
//             ...(order.statusHistory || []),
//             { status: newStatus, date: new Date().toLocaleString() },
//           ],
//         };
//       });

//       localStorage.setItem("orders", JSON.stringify(updated));
//       return updated;
//     });
//   };

//   const updateOrderItems = (orderId, newItems) => {
//     setOrderData((prev) => {
//       const updated = prev.map((order) =>
//         order.orderId === orderId
//           ? { ...order, items: newItems.map((item) => ({ ...item })) }
//           : order
//       );

//       localStorage.setItem("orders", JSON.stringify(updated));
//       return updated;
//     });
//   };

//   return (
//     <OrderContext.Provider
//       value={{
//         orderData,
//         setOrderData,
//         addOrder,
//         updateOrderStatus,
//         updateOrderItems,
//       }}
//     >
//       {children}
//     </OrderContext.Provider>
//   );
// };

// export const useOrder = () => {
//   const context = useContext(OrderContext);
//   if (!context) throw new Error("useOrder must be used within OrderProvider");
//   return context;
// };

// import { createContext, useContext, useState, useEffect } from "react";
// import { LoginContext } from "./LoginContext"; // <-- import LoginContext

// const OrderContext = createContext();

// export const OrderProvider = ({ children }) => {
//   const { currentUser } = useContext(LoginContext); // <-- get current logged-in user
//   const [orderData, setOrderData] = useState([]);

//   // Load orders only once
//   useEffect(() => {
//     try {
//       const storedOrders = localStorage.getItem("orders");
//       if (storedOrders) {
//         const parsed = JSON.parse(storedOrders);
//         if (Array.isArray(parsed)) {
//           setOrderData(parsed);
//         }
//       }
//     } catch (err) {
//       console.error("Error loading orders:", err);
//     }
//   }, []);

//   // Add order, automatically include customerId
//   const addOrder = (newOrder) => {
//     if (!currentUser) {
//       console.error("No logged-in user! Cannot add order.");
//       return;
//     }

//     setOrderData((prev) => {
//       const updated = [
//         ...prev,
//         {
//           ...newOrder,
//           customerId: currentUser.customerId, // <-- automatically set
//           orderId:
//             newOrder.orderId ||
//             `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
//           status: newOrder.status || "Order received",
//           statusHistory: newOrder.statusHistory || [
//             { status: "Order received", date: new Date().toLocaleString() },
//           ],
//         },
//       ];
//       localStorage.setItem("orders", JSON.stringify(updated));
//       return updated;
//     });
//   };

//   const updateOrderStatus = (orderId, newStatus) => {
//     const steps = ["Order received", "Processing", "On the way", "Delivered"];

//     setOrderData((prev) => {
//       const updated = prev.map((order) => {
//         if (order.orderId !== orderId) return order;

//         const currentIndex = steps.indexOf(order.status || "Order received");
//         const newIndex = steps.indexOf(newStatus);

//         if (newIndex <= currentIndex) return order;

//         return {
//           ...order,
//           status: newStatus,
//           statusHistory: [
//             ...(order.statusHistory || []),
//             { status: newStatus, date: new Date().toLocaleString() },
//           ],
//         };
//       });

//       localStorage.setItem("orders", JSON.stringify(updated));
//       return updated;
//     });
//   };

//   const updateOrderItems = (orderId, newItems) => {
//     setOrderData((prev) => {
//       const updated = prev.map((order) =>
//         order.orderId === orderId
//           ? { ...order, items: newItems.map((item) => ({ ...item })) }
//           : order
//       );

//       localStorage.setItem("orders", JSON.stringify(updated));
//       return updated;
//     });
//   };

//   return (
//     <OrderContext.Provider
//       value={{
//         orderData,
//         setOrderData,
//         addOrder,
//         updateOrderStatus,
//         updateOrderItems,
//       }}
//     >
//       {children}
//     </OrderContext.Provider>
//   );
// };

// export const useOrder = () => {
//   const context = useContext(OrderContext);
//   if (!context)
//     throw new Error("useOrder must be used within OrderProvider");
//   return context;
// };

// import { createContext, useContext, useState, useEffect } from "react";
// import { LoginContext } from "./LoginContext";

// const OrderContext = createContext();

// export const OrderProvider = ({ children }) => {
//   const { currentUser } = useContext(LoginContext); // always latest user
//   const [orderData, setOrderData] = useState([]);

//   // Load orders once
//   useEffect(() => {
//     try {
//       const storedOrders = localStorage.getItem("orders");
//       if (storedOrders) {
//         const parsed = JSON.parse(storedOrders);
//         if (Array.isArray(parsed)) setOrderData(parsed);
//       }
//     } catch (err) {
//       console.error("Error loading orders:", err);
//     }
//   }, []);

//   // Add order with latest customerId
//   const addOrder = (newOrder) => {
//     if (!currentUser) {
//       alert("Please login first!");
//       return;
//     }

//     setOrderData((prev) => {
//       const updated = [
//         ...prev,
//         {
//           ...newOrder,
//           customerId: currentUser.customerId, // <-- now always comes
//           orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
//           status: "Order received",
//           statusHistory: [{ status: "Order received", date: new Date().toLocaleString() }],
//         },
//       ];
//       localStorage.setItem("orders", JSON.stringify(updated));
//       return updated;
//     });
//   };

//   const updateOrderStatus = (orderId, newStatus) => {
//     const steps = ["Order received", "Processing", "On the way", "Delivered"];

//     setOrderData((prev) => {
//       const updated = prev.map((order) => {
//         if (order.orderId !== orderId) return order;

//         const currentIndex = steps.indexOf(order.status || "Order received");
//         const newIndex = steps.indexOf(newStatus);
//         if (newIndex <= currentIndex) return order;

//         return {
//           ...order,
//           status: newStatus,
//           statusHistory: [...(order.statusHistory || []), { status: newStatus, date: new Date().toLocaleString() }],
//         };
//       });

//       localStorage.setItem("orders", JSON.stringify(updated));
//       return updated;
//     });
//   };

//   const updateOrderItems = (orderId, newItems) => {
//     setOrderData((prev) => {
//       const updated = prev.map((order) =>
//         order.orderId === orderId ? { ...order, items: newItems.map((item) => ({ ...item })) } : order
//       );
//       localStorage.setItem("orders", JSON.stringify(updated));
//       return updated;
//     });
//   };

//   return (
//     <OrderContext.Provider
//       value={{
//         orderData,
//         setOrderData,
//         addOrder,
//         updateOrderStatus,
//         updateOrderItems,
//       }}
//     >
//       {children}
//     </OrderContext.Provider>
//   );
// };

// export const useOrder = () => {
//   const context = useContext(OrderContext);
//   if (!context) throw new Error("useOrder must be used within OrderProvider");
//   return context;
// };

// import { createContext, useContext, useState, useEffect } from "react";
// import { LoginContext } from "./LoginContext";

// const OrderContext = createContext();

// export const OrderProvider = ({ children }) => {
//   const { currentUser } = useContext(LoginContext); // always latest logged-in user
//   const [orderData, setOrderData] = useState([]);

//   // Load orders from localStorage once
//   useEffect(() => {
//     try {
//       const storedOrders = localStorage.getItem("orders");
//       if (storedOrders) {
//         const parsed = JSON.parse(storedOrders);
//         if (Array.isArray(parsed)) setOrderData(parsed);
//       }
//     } catch (err) {
//       console.error("Error loading orders:", err);
//     }
//   }, []);

//   // Add order with current user's customerId
//   const addOrder = (newOrder) => {
//     if (!currentUser) {
//       alert("Please login first!");
//       return;
//     }

//     const orderWithId = {
//       ...newOrder,
//       customerId: currentUser.customerId, // attach customerId here
//       orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
//       status: "Order received",
//       statusHistory: [{ status: "Order received", date: new Date().toLocaleString() }],
//     };

//     setOrderData((prev) => {
//       const updated = [...prev, orderWithId];
//       localStorage.setItem("orders", JSON.stringify(updated)); // save to localStorage
//       return updated;
//     });
//   };

//   const updateOrderStatus = (orderId, newStatus) => {
//     const steps = ["Order received", "Processing", "On the way", "Delivered"];

//     setOrderData((prev) => {
//       const updated = prev.map((order) => {
//         if (order.orderId !== orderId) return order;

//         const currentIndex = steps.indexOf(order.status || "Order received");
//         const newIndex = steps.indexOf(newStatus);
//         if (newIndex <= currentIndex) return order;

//         return {
//           ...order,
//           status: newStatus,
//           statusHistory: [...(order.statusHistory || []), { status: newStatus, date: new Date().toLocaleString() }],
//         };
//       });

//       localStorage.setItem("orders", JSON.stringify(updated));
//       return updated;
//     });
//   };

//   const updateOrderItems = (orderId, newItems) => {
//     setOrderData((prev) => {
//       const updated = prev.map((order) =>
//         order.orderId === orderId ? { ...order, items: newItems.map((item) => ({ ...item })) } : order
//       );
//       localStorage.setItem("orders", JSON.stringify(updated));
//       return updated;
//     });
//   };

//   return (
//     <OrderContext.Provider
//       value={{
//         orderData,
//         setOrderData,
//         addOrder,
//         updateOrderStatus,
//         updateOrderItems,
//       }}
//     >
//       {children}
//     </OrderContext.Provider>
//   );
// };

// export const useOrder = () => {
//   const context = useContext(OrderContext);
//   if (!context) throw new Error("useOrder must be used within OrderProvider");
//   return context;
// };

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

  const updateOrderStatus = (orderId, newStatus) => {
    const steps = ["Order received", "Processing", "On the way", "Delivered"];

    setOrderData((prev) => {
      const updated = prev.map((order) => {
        if (order.orderId !== orderId) return order;

        const currentIndex = steps.indexOf(order.status || "Order received");
        const newIndex = steps.indexOf(newStatus);
        if (newIndex <= currentIndex) return order;

        return {
          ...order,
          status: newStatus,
          statusHistory: [...(order.statusHistory || []), { status: newStatus, date: new Date().toLocaleString() }]
        };
      });

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
      value={{ orderData, setOrderData, addOrder, updateOrderStatus, updateOrderItems }}
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