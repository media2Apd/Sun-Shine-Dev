const WISHLIST_KEY = "guest_wishlist";

// 🔹 Get wishlist
export const getLocalWishlist = () => {
  const data = localStorage.getItem(WISHLIST_KEY);
  return data ? JSON.parse(data) : [];
};

// 🔹 Save wishlist
export const setLocalWishlist = (wishlist) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
};

// 🔹 Add to wishlist
export const addToLocalWishlist = (product) => {
  const wishlist = getLocalWishlist();

  const exists = wishlist.find(
    (item) => item.productId === product.id
  );

  if (!exists) {
    wishlist.push({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
    });

    setLocalWishlist(wishlist);
  }
};

// 🔹 Remove
export const removeFromLocalWishlist = (productId) => {
  const updated = getLocalWishlist().filter(
    (item) => item.productId !== productId
  );
  setLocalWishlist(updated);
};

// 🔹 Clear
export const clearLocalWishlist = () => {
  localStorage.removeItem(WISHLIST_KEY);
};