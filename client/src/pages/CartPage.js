import { useContext, useEffect, useState } from "react";
import { X } from "lucide-react";
import { ProductContext } from "../Context/ProductContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getLocalCart, removeFromLocalCart } from "../helpers/cartHelper";
import { useToken } from "../Context/TokenContext";
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import { useCart } from "../Context/CartContext";
import { useSelector } from "react-redux";
export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const { refreshCart } = useCart();
  const { products } = useContext(ProductContext);
  const { getToken, generateToken } = useToken();
  const user = useSelector((state) => state?.user?.user);
  const cartProducts = cartItems
    .map((cartItem) => {
      const product = products.find(
        (p) => String(p._id) === String(cartItem.productId)
      );

      if (!product) return null;

      const variant = product.variants?.find(
        (v) => String(v._id) === String(cartItem.variantId)
      );

      if (!variant) return null;

      return {
        ...product,
        cartId: cartItem.cartId,
        productId: cartItem.productId,
        variantId: cartItem.variantId,
        qty: cartItem.quantity,
        price: variant.price,
        image: product.images?.[0]?.url,
      };
    })
    .filter(Boolean);

  const subtotal = cartProducts.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const total = subtotal;

  const handleCheckout = () => {
    if (!user) {
      navigate("/login-page", {
        state: {
          redirectTo: "/cart-page/checkout-page",
          orderSummary: { items: cartProducts, subtotal, total },
        },
      });
      return;
    }

    let token = getToken(user.email);

    if (!token) {
      token = generateToken(user.email);
    }

    navigate("/cart-page/checkout-page", {
      state: {
        token,
        orderSummary: { items: cartProducts, subtotal, total },
      },
    });
  };

  useEffect(() => {
    fetchCart();
  }, []);

const fetchCart = async () => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const res = await api({
        url: SummaryApi.getCartItems.url,
        method: SummaryApi.getCartItems.method,
      });

      // 🔥 NORMALIZE DATA
      const items = (res.data?.items || []).map((item) => ({
        productId: item.productId?._id || item.productId,
        variantId:
          item.variantId ||
          item.productId?.variants?.[item.variantIndex]?._id ||
          null,
        quantity: item.quantity,
        cartId: item._id,
      }));

      setCartItems(items);
    } else {
      setCartItems(getLocalCart());
    }
  } catch (err) {
    console.log(err);
  }
};

const handleRemove = async (id, productId, variantId) => {
  const token = localStorage.getItem("token");

  try {
    if (token) {
      await api.delete(SummaryApi.deleteCartItem.url, {
        data: { cartId: id },
      });
    } else {
      removeFromLocalCart(productId, variantId);
    }

    toast.success("Removed from Cart");

    fetchCart();
    refreshCart();
  } catch (err) {
    console.log(err);
  }
};

  const handleIncrease = async (item) => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        // ✅ BACKEND
        await api.put(SummaryApi.updateCartItem.url, {
          cartId: item.cartId,
          quantity: item.qty + 1,
        });
      } else {
        // ✅ LOCAL
        const cart = getLocalCart();

        const updated = cart.map((c) => {
          if (
            c.productId === item.productId &&
            c.variantId === item.variantId
          ) {
            return { ...c, quantity: c.quantity + 1 };
          }
          return c;
        });

        localStorage.setItem("guest_cart", JSON.stringify(updated));
      }

      fetchCart();
      refreshCart();
    } catch (err) {
      console.log(err);
    }
  };

const handleDecrease = async (item) => {
  if (item.qty <= 1) return;

  const token = localStorage.getItem("token");

  try {
    if (token) {
      // ✅ BACKEND
      await api.put(SummaryApi.updateCartItem.url, {
        cartId: item.cartId,
        quantity: item.qty - 1,
      });
    } else {
      // ✅ LOCAL
      const cart = getLocalCart();

      const updated = cart.map((c) => {
        if (
          c.productId === item.productId &&
          c.variantId === item.variantId
        ) {
          return { ...c, quantity: c.quantity - 1 };
        }
        return c;
      });

      localStorage.setItem("guest_cart", JSON.stringify(updated));
    }

    fetchCart();
    refreshCart();
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
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
                   key={item.cartId || `${item.productId}-${item.variantId}`} // ✅ SAFE KEY
                  className="relative grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 md:gap-0 p-4 border-b"
                >
                  
                  {/* Mobile remove button */}
                  <button
                    onClick={() => {
                      handleRemove(item.cartId, item.productId, item.variantId);
                    }}
                    className="absolute top-4 right-4 md:hidden text-gray-400 hover:text-red-500"
                  >
                    <X size={18} />
                  </button>

                  {/* Product info */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        handleRemove(item.cartId, item.productId, item.variantId);
                      }}
                      className="hidden md:block text-gray-400 hover:text-red-500"
                    >
                      <X size={18} />
                    </button>

                    <img
                      src={item.image || item.images?.[0]?.url}
                      alt={item.name}
                      className="h-16 w-16 object-contain rounded"
                    />
                    <p className="text-sm font-medium">{item.name}</p>
                  </div>

                  <div className="flex justify-between md:justify-center text-sm">
                    <span className="md:hidden font-medium">Price</span>
                    <span>Rs.{item.price}</span>
                  </div>

                  <div className="flex justify-between md:justify-center items-center">
                    <span className="md:hidden font-medium">Qty</span>
                    <div className="flex items-center border rounded-full px-3 py-1 gap-4">
                      <button onClick={() => handleDecrease(item)} className="text-gray-600">
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => handleIncrease(item)} className="text-gray-600">
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between md:justify-center text-sm">
                    <span className="md:hidden font-medium">Subtotal</span>
                    <span className="font-medium">Rs.{itemSubtotal}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

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
