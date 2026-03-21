// import { useContext } from "react";
// import { X } from "lucide-react";
// import { CartContext } from "../Context/CartContext";
// import { ProductContext } from "../Context/ProductContext";
// import { useNavigate } from "react-router-dom";

// import { LoginContext } from "../Context/LoginContext";
// import { useToken } from "../Context/TokenContext";


// const CartPage = ({ cartProducts, subtotal, total }) => {
//   const navigate = useNavigate();
//   const { currentUser } = useContext(LoginContext);
//   const { getToken, generateToken } = useToken();

//   const handleCheckout = () => {
//     if (!currentUser) {
//       // User not logged in → redirect to login page
//       navigate("/login-page");
//       return;
//     }

//     let token = getToken(currentUser.email);
//     if (!token) {
//       // Generate a token for this user
//       token = generateToken(currentUser.email);
//     }

//     // Proceed to checkout with token and cart info
//     navigate("/cart-page/checkout-page", {
//       state: {
//         token,
//         orderSummary: { items: cartProducts, subtotal, total }
//       }
//     });
//   };

// export default function CartPage() {
// const navigate = useNavigate();
// const { cartItems, increaseQty, decreaseQty, removeItem } = useContext(CartContext);
// const { products } = useContext(ProductContext);

// // merge cart + product
// const cartProducts = cartItems
// .map((cartItem) => {

//   const product = products.find(
//     (p) => String(p.id) === String(cartItem.productId)
//   );

//   if (!product) return null;

//   return {
//     ...product,
//     cartId: cartItem.id,
//     productId: cartItem.productId,
//     qty: cartItem.quantity,
//     price: Number(cartItem.price)  // ✅ use stored price
//   };

// })
// .filter(Boolean);

// // subtotal, shipping, tax, total
// const subtotal = cartProducts.reduce(
//   (total,item)=> total + Number(item.price) * item.qty,
// 0
// );


// const total = subtotal ;

// return (

// <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">

// <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

// {/* CART TABLE */}
// <div className="lg:col-span-2 bg-white border rounded-xl overflow-hidden">

// <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] p-4 border-b text-gray-500 text-sm font-medium">

// <p>Product</p>
// <p className="text-center">Price</p>
// <p className="text-center">Quantity</p>
// <p className="text-center">Subtotal</p>

// </div>

// {cartProducts.length === 0 ? (

// <p className="p-6 text-center text-gray-500">
// Cart is empty
// </p>

// ) : (

// cartProducts.map((item)=>{

// const itemSubtotal = Number(item.price)* item.qty;

// return(

// <div
// key={item.cartId}
// className="relative grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 md:gap-0 p-4 border-b"
// >

// <button
// onClick={()=>removeItem(item.cartId)}
// className="absolute top-4 right-4 md:hidden text-gray-400 hover:text-red-500"
// >
// <X size={18}/>
// </button>

// <div className="flex items-center gap-4">

// <button
// onClick={()=>removeItem(item.cartId)}
// className="hidden md:block text-gray-400 hover:text-red-500"
// >
// <X size={18}/>
// </button>

// <img
// src={item.image}
// alt={item.name}
// className="h-16 w-16 object-cover rounded"
// />

// <p className="text-sm font-medium">
// {item.name}
// </p>

// </div>

// <div className="flex justify-between md:justify-center text-sm">

// <span className="md:hidden font-medium">Price</span>

// <span>
//   Rs.{Number(item.price)}
// </span>

// </div>

// <div className="flex justify-between md:justify-center items-center">

// <span className="md:hidden font-medium">Qty</span>

// <div className="flex items-center border rounded-full px-3 py-1 gap-4">

// <button
// onClick={()=>decreaseQty(item.cartId)}
// className="text-gray-600"
// >
// -
// </button>

// <span>{item.qty}</span>

// <button
// onClick={()=>increaseQty(item.cartId)}
// className="text-gray-600"
// >
// +
// </button>

// </div>

// </div>

// <div className="flex justify-between md:justify-center text-sm">

// <span className="md:hidden font-medium">
// Subtotal
// </span>

// <span className="font-medium">
// Rs.{itemSubtotal}
// </span>

// </div>

// </div>

// )

// })

// )}

// </div>

// {/* ORDER SUMMARY */}
// <div className="bg-white border rounded-xl p-6 h-fit">

// <h2 className="font-semibold text-lg mb-6">
// Order summary
// </h2>

// <div className="space-y-4 text-sm text-gray-600">

// <div className="flex justify-between">
// <span>Items</span>
// <span>{cartProducts.length}</span>
// </div>

// <div className="flex justify-between">
// <span>Sub Total</span>
// <span>Rs.{subtotal}</span>
// </div>
// <hr/>

// <div className="flex justify-between font-semibold text-black">

// <span>Total</span>
// <span>Rs.{total}</span>
// </div>
// </div>

//   <button
//       className="mt-6 w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition"
//       onClick={handleCheckout}
//     >
//       Proceed to checkout
//     </button>

// </div>

// </div>

// </div>

// );

// }
import { useContext } from "react";
import { X } from "lucide-react";
import { CartContext } from "../Context/CartContext";
import { ProductContext } from "../Context/ProductContext";
import { useNavigate } from "react-router-dom";

import { LoginContext } from "../Context/LoginContext";
import { useToken } from "../Context/TokenContext";

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, increaseQty, decreaseQty, removeItem } = useContext(CartContext);
  const { products } = useContext(ProductContext);
  const { currentUser } = useContext(LoginContext);
  const { getToken, generateToken } = useToken();

  // Merge cart + product info
  const cartProducts = cartItems
    .map((cartItem) => {
      const product = products.find((p) => String(p.id) === String(cartItem.productId));
      if (!product) return null;
      return {
        ...product,
        cartId: cartItem.id,
        productId: cartItem.productId,
        qty: cartItem.quantity,
        price: Number(cartItem.price), // use stored price
      };
    })
    .filter(Boolean);

  // Subtotal & total
  const subtotal = cartProducts.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const total = subtotal; // Add shipping/tax later if needed

  // Checkout button handler
  const handleCheckout = () => {
    if (!currentUser) {
      // User not logged in → redirect to login page
      navigate("/login-page");
      return;
    }

    let token = getToken(currentUser.email);
    if (!token) {
      // Generate token for this user
      token = generateToken(currentUser.email);
    }

    // Navigate to checkout with token + order summary
    navigate("/cart-page/checkout-page", {
      state: {
        token,
        orderSummary: { items: cartProducts, subtotal, total },
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* CART TABLE */}
        <div className="lg:col-span-2 bg-white border rounded-xl overflow-hidden">
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] p-4 border-b text-gray-500 text-sm font-medium">
            <p>Product</p>
            <p className="text-center">Price</p>
            <p className="text-center">Quantity</p>
            <p className="text-center">Subtotal</p>
          </div>

          {cartProducts.length === 0 ? (
            <p className="p-6 text-center text-gray-500">Cart is empty</p>
          ) : (
            cartProducts.map((item) => {
              const itemSubtotal = item.price * item.qty;
              return (
                <div
                  key={item.cartId}
                  className="relative grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 md:gap-0 p-4 border-b"
                >
                  {/* Mobile remove button */}
                  <button
                    onClick={() => removeItem(item.cartId)}
                    className="absolute top-4 right-4 md:hidden text-gray-400 hover:text-red-500"
                  >
                    <X size={18} />
                  </button>

                  {/* Product info */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => removeItem(item.cartId)}
                      className="hidden md:block text-gray-400 hover:text-red-500"
                    >
                      <X size={18} />
                    </button>

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                    <p className="text-sm font-medium">{item.name}</p>
                  </div>

                  {/* Price */}
                  <div className="flex justify-between md:justify-center text-sm">
                    <span className="md:hidden font-medium">Price</span>
                    <span>Rs.{item.price}</span>
                  </div>

                  {/* Quantity */}
                  <div className="flex justify-between md:justify-center items-center">
                    <span className="md:hidden font-medium">Qty</span>
                    <div className="flex items-center border rounded-full px-3 py-1 gap-4">
                      <button onClick={() => decreaseQty(item.cartId)} className="text-gray-600">
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => increaseQty(item.cartId)} className="text-gray-600">
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="flex justify-between md:justify-center text-sm">
                    <span className="md:hidden font-medium">Subtotal</span>
                    <span className="font-medium">Rs.{itemSubtotal}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white border rounded-xl p-6 h-fit">
          <h2 className="font-semibold text-lg mb-6">Order summary</h2>

          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{cartProducts.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>Rs.{subtotal}</span>
            </div>

            <hr />

            <div className="flex justify-between font-semibold text-black">
              <span>Total</span>
              <span>Rs.{total}</span>
            </div>
          </div>

          <button
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition"
            onClick={handleCheckout}
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
}
