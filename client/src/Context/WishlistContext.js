// import { createContext, useState, useEffect } from "react";

// export const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState(() => {
//     // Load wishlist from localStorage on init
//     const storedWishlist = localStorage.getItem("wishlist");
//     return storedWishlist ? JSON.parse(storedWishlist) : [];
//   });

//   // Whenever wishlist changes, save to localStorage
//   useEffect(() => {
//     localStorage.setItem("wishlist", JSON.stringify(wishlist));
//   }, [wishlist]);

//   const addToWishlist = (item) => {
//     // Add date and stock for WishlistPage UI
//     const itemWithMeta = {
//       ...item,
//       date: new Date().toLocaleDateString(),
//       stock: item.stock ?? (item.variants?.[0]?.stock > 0)
//     };

//     setWishlist((prev) => [...prev, itemWithMeta]);
//   };

//   const removeFromWishlist = (id) => {
//     setWishlist((prev) => prev.filter((item) => item.id !== id));
//   };

//   return (
//     <WishlistContext.Provider
//       value={{ wishlist, addToWishlist, removeFromWishlist }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

import React, { createContext, useContext, useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import api from "../common/apiClient";
import { getLocalWishlist } from "../helpers/wishlistHelper";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlist, setWishlist] = useState([]); // 🔥 NEW

  const refreshWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        // ✅ backend
        const res = await api({
          url: SummaryApi.getWishlistItems.url,
          method: SummaryApi.getWishlistItems.method,
        });

        const items = res.data?.items || [];

        setWishlist(items);              // 🔥 IMPORTANT
        setWishlistCount(items.length);
      } else {
        // ✅ local
        const local = getLocalWishlist();

        setWishlist(local);              // 🔥 IMPORTANT
        setWishlistCount(local.length);
      }
    } catch (err) {
      console.error("Wishlist load failed", err);
      setWishlist([]);
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    refreshWishlist();
  }, []);

  useEffect(() => {
    const sync = () => refreshWishlist();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlistCount, wishlist, refreshWishlist }} // 🔥 expose wishlist
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);