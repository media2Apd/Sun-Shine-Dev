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

const addToCart = (product) => {

setCartItems((prev) => {

const existing = prev.find((item) => item.id === product.id);

if (existing) {

return prev.map((item) =>
item.id === product.id
? { ...item, quantity: item.quantity + 1 }
: item
);

} else {

return [...prev, { id: product.id, quantity: 1 }];

}

});

};

return (
<CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
{children}
</CartContext.Provider>
);

};