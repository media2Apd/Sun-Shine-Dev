import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";

const CART_KEY = "guest_cart";

// 🔥 Get cart
export const getLocalCart = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

// 🔥 Save cart
export const setLocalCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// 🔥 Add to cart (UPDATED)
export const addToLocalCart = (product, variant, qty = 1) => {
  const cart = getLocalCart();

  const existing = cart.find(
    (item) =>
      item.productId === product._id &&
      item.variantId === variant?._id
  );

  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({
      productId: product._id,                     // ✅ FIX
      variantId: variant?._id,                    // ✅ NEW
      name: product.name,
      image: product.images?.[0]?.url,            // ✅ FIX
      price: variant?.price,                      // ✅ FIX
      quantity: qty,
    });
  }

  setLocalCart(cart);
};

// 🔥 Remove item
export const removeFromLocalCart = (productId, variantId) => {
  const cart = getLocalCart().filter(
    (item) =>
      item.productId !== productId ||
      item.variantId !== variantId
  );
  setLocalCart(cart);
};

// 🔥 Clear cart
export const clearLocalCart = () => {
  localStorage.removeItem(CART_KEY);
};

export const mergeLocalCartToBackend = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const localCart = getLocalCart();

  try {
    for (let item of localCart) {
      await api.post(SummaryApi.addToCart.url, {
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
      });
    }

    // ✅ clear local after merge
    clearLocalCart();

    console.log("Cart merged successfully");
  } catch (err) {
    console.log("Merge error:", err);
  }
};

// import { mergeLocalCartToBackend } from "../helpers/cartHelper";

// const handleLogin = async () => {
//   // login success...

//   await mergeLocalCartToBackend(); // 🔥 முக்கியம்
// };