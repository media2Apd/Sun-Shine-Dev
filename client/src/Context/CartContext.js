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

import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ ADD TO CART (supports variant + qty)
  const addToCart = (product, variant = null, qty = 1) => {
    const price = variant ? Number(variant.price) : Number(product.price) || 0;
    const variantId = variant ? variant.id : null;

    const existing = cartItems.find(
      (item) => item.productId === product.id && item.variantId === variantId
    );

    if (existing) {
      // increase quantity by selected qty
      setCartItems(prev =>
        prev.map(item =>
          item.productId === product.id && item.variantId === variantId
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      );
    } else {
      // add new item with qty
      setCartItems(prev => [
        ...prev,
        {
          id: Date.now(), // unique cart item id
          productId: product.id,
          variantId,
          name: product.name,
          image: product.image,
          price,
          quantity: qty,
        },
      ]);
    }
  };

  const increaseQty = (cartId) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === cartId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (cartId) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === cartId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (cartId) => {
    setCartItems(prev => prev.filter(item => item.id !== cartId));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};