const WISHLIST_KEY = "guest_wishlist";

// 🔹 Get wishlist
export const getLocalWishlist = () => {
  const data = localStorage.getItem(WISHLIST_KEY);
  return data ? JSON.parse(data) : [];
};

// 🔹 Save
export const setLocalWishlist = (wishlist) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
};

// 🔹 Add
export const addToLocalWishlist = (product) => {
  const wishlist = getLocalWishlist();

  const exists = wishlist.find(
    (item) => item.productId === product.productId
  );

  if (!exists) {
    wishlist.push({
      productId: product.productId,
      variantId: product.variantId,
    });

    setLocalWishlist(wishlist);

    // 🔥 trigger same tab update
    window.dispatchEvent(new Event("wishlistUpdated"));
  }
};

// 🔹 Remove
export const removeFromLocalWishlist = (productId) => {
  const updated = getLocalWishlist().filter(
    (item) => item.productId !== productId
  );

  setLocalWishlist(updated);

  // 🔥 trigger same tab update
  window.dispatchEvent(new Event("wishlistUpdated"));
};

// 🔹 Clear
export const clearLocalWishlist = () => {
  localStorage.removeItem(WISHLIST_KEY);

  // 🔥 trigger update
  window.dispatchEvent(new Event("wishlistUpdated"));
};