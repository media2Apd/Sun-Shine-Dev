// import React, { createContext, useContext, useEffect, useState } from "react";
// import SummaryApi from "../common/SummaryApi";
// import api from "../common/apiClient";
// import { getLocalWishlist } from "../helpers/wishlistHelper";

// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [wishlist, setWishlist] = useState([]); // 🔥 NEW

//   const refreshWishlist = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (token) {
//         // ✅ backend
//         const res = await api({
//           url: SummaryApi.getWishlistItems.url,
//           method: SummaryApi.getWishlistItems.method,
//         });

//         const items = res.data?.items || [];

//         setWishlist(items);              // 🔥 IMPORTANT
//         setWishlistCount(items.length);
//       } else {
//         // ✅ local
//         const local = getLocalWishlist();

//         setWishlist(local);              // 🔥 IMPORTANT
//         setWishlistCount(local.length);
//       }
//     } catch (err) {
//       console.error("Wishlist load failed", err);
//       setWishlist([]);
//       setWishlistCount(0);
//     }
//   };

//   useEffect(() => {
//     refreshWishlist();
//   }, []);

//   useEffect(() => {
//     const sync = () => refreshWishlist();
//     window.addEventListener("storage", sync);
//     return () => window.removeEventListener("storage", sync);
//   }, []);

//   return (
//     <WishlistContext.Provider
//       value={{ wishlistCount, wishlist, refreshWishlist }} // 🔥 expose wishlist
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => useContext(WishlistContext);

import React, { createContext, useContext, useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import api from "../common/apiClient";
import { getLocalWishlist } from "../helpers/wishlistHelper";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlist, setWishlist] = useState([]);

  const refreshWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      // ✅ LOCAL STORAGE (no login)
      if (!token) {
        const local = getLocalWishlist();

        setWishlist(local || []);
        setWishlistCount(local?.length || 0);
        return;
      }

      // ✅ BACKEND
      const res = await api({
        url: SummaryApi.getWishlistItems.url,
        method: SummaryApi.getWishlistItems.method,
      });

      const items = res.data?.items || [];

      const formatted = items.map((item) => ({
        productId: item.productId?._id || item.productId,
        variantId:
          item.productId?.variants?.[0]?._id || item.variantId || null,
      }));

      setWishlist(formatted);
      setWishlistCount(formatted.length);

    } catch (err) {
      console.error("Wishlist load failed", err);
      setWishlist([]);
      setWishlistCount(0);
    }
  };

  // 🔥 initial load
  useEffect(() => {
    refreshWishlist();
  }, []);

  // 🔥 sync (multi-tab + same tab)
  useEffect(() => {
    const sync = () => refreshWishlist();

    window.addEventListener("storage", sync);
    window.addEventListener("wishlistUpdated", sync); // ✅ custom event

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("wishlistUpdated", sync);
    };
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlistCount, wishlist, refreshWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);