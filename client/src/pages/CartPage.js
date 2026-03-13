import { useState } from "react";
import { X } from "lucide-react";
import blog1 from "../assets/blog1.png";

export default function CartPage() {

const [cartItems, setCartItems] = useState([
{ id:1, name:"A", price:650, qty:1, image:blog1 },
{ id:2, name:"A", price:650, qty:1, image:blog1 },
{ id:3, name:"A", price:650, qty:1, image:blog1 },
{ id:4, name:"Azospirillum", price:650, qty:1, image:blog1 }
]);

// Increase Qty
const increaseQty = (id)=>{
setCartItems(prev =>
prev.map(item =>
item.id === id ? {...item, qty:item.qty + 1} : item
));
};

// Decrease Qty
const decreaseQty = (id)=>{
setCartItems(prev =>
prev.map(item =>
item.id === id && item.qty > 1
? {...item, qty:item.qty - 1}
: item
));
};

// Remove
const removeItem = (id)=>{
setCartItems(cartItems.filter(item => item.id !== id));
};

const subtotal = cartItems.reduce(
(total,item)=> total + item.price * item.qty,0
);

const shipping = 50;
const tax = 30;
const total = subtotal + shipping + tax;

return (

<div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">

<div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

{/* CART TABLE */}

<div className="lg:col-span-2 bg-white border rounded-xl overflow-hidden">

{/* HEADER */}

<div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] p-4 border-b text-gray-500 text-sm font-medium">

<p>Product</p>
<p className="text-center">Price</p>
<p className="text-center">Quantity</p>
<p className="text-center">Subtotal</p>

</div>

{/* ITEMS */}

{cartItems.map((item)=>{

const itemSubtotal = item.price * item.qty;

return(

<div
key={item.id}
className="relative grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] items-center gap-4 md:gap-0 p-4 border-b"
>

{/* REMOVE BUTTON */}

<button
onClick={()=>removeItem(item.id)}
className="absolute top-4 right-4 md:hidden text-gray-400 hover:text-red-500"
>
<X size={18}/>
</button>

{/* PRODUCT */}

<div className="flex items-center gap-4">

<button
onClick={()=>removeItem(item.id)}
className="hidden md:block text-gray-400 hover:text-red-500"
>
<X size={18}/>
</button>

<img
src={item.image}
alt={item.name}
className="h-16 w-16 object-cover rounded"
/>

<p className="text-sm font-medium">
{item.name}
</p>

</div>

{/* PRICE */}

<div className="flex justify-between md:justify-center text-sm">

<span className="md:hidden font-medium">
Price
</span>

<span>
Rs.{item.price}
</span>

</div>

{/* QUANTITY */}

<div className="flex justify-between md:justify-center items-center">

<span className="md:hidden font-medium">
Qty
</span>

<div className="flex items-center border rounded-full px-3 py-1 gap-4">

<button
onClick={()=>decreaseQty(item.id)}
className="text-gray-600"
>
-
</button>

<span>{item.qty}</span>

<button
onClick={()=>increaseQty(item.id)}
className="text-gray-600"
>
+
</button>

</div>

</div>

{/* SUBTOTAL */}

<div className="flex justify-between md:justify-center text-sm">

<span className="md:hidden font-medium">
Subtotal
</span>

<span className="font-medium">
Rs.{itemSubtotal}
</span>

</div>

</div>

)

})}

</div>

{/* ORDER SUMMARY */}

<div className="bg-white border rounded-xl p-6 h-fit">

<h2 className="font-semibold text-lg mb-6">
Order summary
</h2>

<div className="space-y-4 text-sm text-gray-600">

<div className="flex justify-between">
<span>Items</span>
<span>{cartItems.length}</span>
</div>

<div className="flex justify-between">
<span>Sub Total</span>
<span>Rs.{subtotal}</span>
</div>

<div className="flex justify-between">
<span>Shipping</span>
<span>Rs.{shipping}</span>
</div>

<div className="flex justify-between">
<span>Taxes</span>
<span>Rs.{tax}</span>
</div>

<div className="flex justify-between">
<span>Coupon discount</span>
<span>Rs.0</span>
</div>

<hr/>

<div className="flex justify-between font-semibold text-black">

<span>Total</span>
<span>Rs.{total}</span>

</div>

</div>

<button className="mt-6 w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition">
Proceed to checkout
</button>

</div>

</div>

</div>

);
}