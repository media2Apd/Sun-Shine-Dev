import { useContext, useEffect, useState } from "react";
import { X } from "lucide-react";
import { ProductContext } from "../Context/ProductContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getLocalCart, removeFromLocalCart } from "../helpers/cartHelper";
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import { useCart } from "../Context/CartContext";
import { useSelector } from "react-redux";
export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const { refreshCart } = useCart();
  const { products } = useContext(ProductContext);
  const [loadingItemId, setLoadingItemId] = useState(null);
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
    navigate("/login", {
      state: {
        redirectTo: "/cart",
        orderSummary: { items: cartProducts, subtotal, total },
      },
    });
    return;
  }

  // ✅ No token logic here
  navigate("/cart/checkout", {
    state: {
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
        data: { cartId: id, productId, variantId },
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
    setLoadingItemId(item.cartId);

    try {
      const token = localStorage.getItem("token");

      if (token) {
        await api.put(SummaryApi.updateCartItem.url, {
          cartId: item.cartId,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.qty + 1,
        });
      } else {
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
    } finally {
      setLoadingItemId(null);
    }
  };

  const handleDecrease = async (item) => {
    if (item.qty <= 1) return;

    setLoadingItemId(item.cartId);

    try {
      const token = localStorage.getItem("token");

      if (token) {
        await api.put(SummaryApi.updateCartItem.url, {
          cartId: item.cartId,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.qty - 1,
        });
      } else {
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

      await fetchCart();
      await refreshCart();
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingItemId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 bg-white border border-[#E6E6E6] rounded-lg overflow-hidden">
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] p-4 border-b text-black text-base font-medium">
            <p>Product</p>
            <p className="text-center">Price</p>
            <p className="text-center">Quantity</p>
            <p className="text-center">Subtotal</p>
          </div>

          {cartProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              
              {/* ICON */}
              <div className="w-24 h-24 mb-6">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                  alt="empty cart"
                  className="w-full h-full object-contain opacity-70"
                />
              </div>

              {/* TITLE */}
              <h2 className="text-xl font-semibold mb-2">
                Your cart is empty 
              </h2>

              {/* DESCRIPTION */}
              <p className="text-gray-500 mb-6 max-w-sm">
                Looks like you haven’t added anything yet. Start exploring products and add items to your cart.
              </p>

              {/* BUTTON */}
              <button
                onClick={() => navigate("/")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition"
              >
                Continue Shopping →
              </button>

            </div>
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
                    <div className="flex flex-col space-y-1">


                    <p className="text-sm text-black font-medium">{item.name}</p>
                    <p className="text-sm text-[#A9A9A9] font-medium">{item.category?.name}</p>
                    </div>
                  </div>
                  <div className="flex justify-between md:justify-center text-sm">
                    <span className="md:hidden font-medium">Price</span>
                    <span className="text-base text-black font-semibold">Rs.{item.price}</span>
                  </div>

                  <div className="flex justify-between md:justify-center items-center">
                    <span className="md:hidden font-medium">Qty</span>

                    <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">

                      {/* MINUS */}
                      <button
                        onClick={() => handleDecrease(item)}
                        disabled={loadingItemId === item.cartId || item.qty <= 1}
                        className={`px-4 py-1.5 text-lg border-r ${
                          loadingItemId === item.cartId
                            ? "cursor-not-allowed opacity-50"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        -
                      </button>

                      {/* VALUE */}
                      <span className="px-5 py-1.5 text-lg font-medium text-gray-800 border-r">
                        {item.qty}
                      </span>

                      {/* PLUS */}
                      <button
                        onClick={() => handleIncrease(item)}
                        disabled={loadingItemId === item.cartId}
                        className={`px-4 py-1.5 text-lg ${
                          loadingItemId === item.cartId
                            ? "cursor-not-allowed opacity-50"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        +
                      </button>

                    </div>
                  </div>

                  <div className="flex justify-between md:justify-center text-sm">
                    <span className="md:hidden font-medium">Subtotal</span>
                    <span className="text-base text-black font-semibold">Rs.{itemSubtotal}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="bg-white border border-[#E6E6E6] rounded-lg p-6 h-fit">
          <h2 className="font-semibold text-lg mb-2">Order summary</h2>
          <hr className="mb-6 border-t border-[#E3E3E3]" />
          <div className="space-y-4 text-sm text-[#A9A9A9]">
            <div className="flex justify-between">
              <span>Items</span>
              <span className="text-black text-sm font-semibold">{cartProducts.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Sub Total</span>
              <span className="text-black text-sm font-semibold">Rs.{subtotal}</span>
            </div>
            <hr />

            <div className="flex justify-between font-semibold text-black">
              <span className="text-black text-base font-semibold">Total</span>
              <span className="text-black text-base font-semibold">Rs.{total}</span>
            </div>
          </div>

          <button
            disabled={cartProducts.length === 0}
            className={`mt-6 w-full py-3 rounded-full font-medium transition ${
              cartProducts.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
            onClick={handleCheckout}
          >
            Proceed to checkout
          </button>
        </div>

      </div>
    </div>
  );
}
