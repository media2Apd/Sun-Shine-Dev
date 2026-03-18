import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    // Load wishlist from localStorage on init
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  // Whenever wishlist changes, save to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (item) => {
    // Add date and stock for WishlistPage UI
    const itemWithMeta = {
      ...item,
      date: new Date().toLocaleDateString(),
      stock: item.stock ?? (item.variants?.[0]?.stock > 0)
    };

    setWishlist((prev) => [...prev, itemWithMeta]);
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};