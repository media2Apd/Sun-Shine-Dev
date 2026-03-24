// import { createContext, useState, useEffect } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(() => {
//     const storedCart = localStorage.getItem("cartItems");
//     return storedCart ? JSON.parse(storedCart) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   // ✅ ADD TO CART (supports variant)
//   const addToCart = (product, variant = null) => {
//     const price = variant ? Number(variant.price) : Number(product.price) || 0;
//     const variantId = variant ? variant.id : null;

//     // Check if same product + variant exists
//     const existing = cartItems.find(
//       (item) => item.productId === product.id && item.variantId === variantId
//     );

//     if (existing) {
//       // increase quantity
//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.productId === product.id && item.variantId === variantId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } else {
//       // add new item
//       setCartItems((prev) => [
//         ...prev,
//         {
//           id: Date.now(),        // unique cart item id
//           productId: product.id,
//           variantId,             // store variant id
//           quantity: 1,
//           price,                 // store correct price
//         },
//       ]);
//     }
//   };

//   // ✅ INCREASE QTY
//   const increaseQty = (cartId) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === cartId
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//   };

//   // ✅ DECREASE QTY
//   const decreaseQty = (cartId) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === cartId && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   // ✅ REMOVE ITEM
//   const removeItem = (cartId) => {
//     setCartItems((prev) =>
//       prev.filter((item) => item.id !== cartId)
//     );
//   };
//   const clearCart = () => {
//     setCartItems([]);
//     localStorage.removeItem("cartItems");
//   };
//   return (
//     <CartContext.Provider
//       value={{
//         setCartItems,
//         cartItems,
//         addToCart,
//         increaseQty,
//         decreaseQty,
//         removeItem,
//         clearCart
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };



// import { createContext, useState, useEffect } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(() => {
//     const storedCart = localStorage.getItem("cartItems");
//     return storedCart ? JSON.parse(storedCart) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   // ✅ ADD TO CART (supports variant)
//   const addToCart = (product, variant = null) => {
//     const price = variant ? Number(variant.price) : Number(product.price) || 0;
//     const variantId = variant ? variant.id : null;

//     // Check if same product + variant exists
//     const existing = cartItems.find(
//       (item) => item.productId === product.id && item.variantId === variantId
//     );

//     if (existing) {
//       // increase quantity
//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.productId === product.id && item.variantId === variantId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         )
//       );
//     } else {
//       // add new item
//       setCartItems((prev) => [
//         ...prev,
//         {
//           id: Date.now(),        // unique cart item id
//           productId: product.id,
//           variantId,             // store variant id
//           quantity: 1,
//           price,                 // store correct price
//         },
//       ]);
//     }
//   };

//   // ✅ INCREASE QTY
//   const increaseQty = (cartId) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === cartId
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//   };

//   // ✅ DECREASE QTY
//   const decreaseQty = (cartId) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === cartId && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   // ✅ REMOVE ITEM
//   const removeItem = (cartId) => {
//     setCartItems((prev) =>
//       prev.filter((item) => item.id !== cartId)
//     );
//   };

//   // ✅ CLEAR CART
//   const clearCart = () => {
//     setCartItems([]);
//     localStorage.removeItem("cartItems");
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         setCartItems,
//         cartItems,
//         addToCart,
//         increaseQty,
//         decreaseQty,
//         removeItem,
//         clearCart
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// import { createContext, useState, useEffect } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(() => {
//     const storedCart = localStorage.getItem("cartItems");
//     return storedCart ? JSON.parse(storedCart) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   // ✅ ADD TO CART (supports variant + qty)
//   const addToCart = (product, variant = null, qty = 1) => {
//     const price = variant ? Number(variant.price) : Number(product.price) || 0;
//     const variantId = variant ? variant.id : null;

//     const existing = cartItems.find(
//       (item) => item.productId === product.id && item.variantId === variantId
//     );

//     if (existing) {
//       // increase quantity by selected qty
//       setCartItems(prev =>
//         prev.map(item =>
//           item.productId === product.id && item.variantId === variantId
//             ? { ...item, quantity: item.quantity + qty }
//             : item
//         )
//       );
//     } else {
//       // add new item with qty
//       setCartItems(prev => [
//         ...prev,
//         {
//           id: Date.now(), // unique cart item id
//           productId: product.id,
//           variantId,
//           name: product.name,
//           image: product.image,
//           price,
//           quantity: qty,
//         },
//       ]);
//     }
//   };

//   const increaseQty = (cartId) => {
//     setCartItems(prev =>
//       prev.map(item =>
//         item.id === cartId ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const decreaseQty = (cartId) => {
//     setCartItems(prev =>
//       prev.map(item =>
//         item.id === cartId && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   const removeItem = (cartId) => {
//     setCartItems(prev => prev.filter(item => item.id !== cartId));
//   };

//   const clearCart = () => {
//     setCartItems([]);
//     localStorage.removeItem("cartItems");
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         setCartItems,
//         addToCart,
//         increaseQty,
//         decreaseQty,
//         removeItem,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, { createContext, useContext, useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import { getLocalCart } from "../helpers/cartHelper";
import api from "../common/apiClient";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        // ✅ LOGGED IN → API CALL
        const res = await api({
          url: SummaryApi.getCartItems.url,
          method: SummaryApi.getCartItems.method,
        });

        // 🔥 BEST: quantity based count (not length)
        const totalQty =
          res.data?.items?.reduce(
            (sum, item) => sum + (item.quantity || 1),
            0
          ) || 0;

        setCartCount(totalQty);

      } else {
        // ✅ GUEST → localStorage
        const guestCart = getLocalCart();

        const totalQty = guestCart.reduce(
          (sum, item) => sum + (item.quantity || 1),
          0
        );

        setCartCount(totalQty);
      }
    } catch (err) {
      console.error("Cart count load failed", err);
      setCartCount(0);
    }
  };

  // 🔥 INITIAL LOAD
  useEffect(() => {
    refreshCart();
  }, []);

  // 🔥 SYNC (login/logout across tabs)
  useEffect(() => {
    const syncCart = () => refreshCart();
    window.addEventListener("storage", syncCart);
    return () => window.removeEventListener("storage", syncCart);
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);