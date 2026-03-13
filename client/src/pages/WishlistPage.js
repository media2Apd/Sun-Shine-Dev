import { useState } from "react";
import { X } from "lucide-react";

export default function WishlistPage() {

const [wishlist, setWishlist] = useState([
{
id:1,
name:"Azospirillum",
price:650,
date:"18 October 2024",
stock:true,
image:"/product.png"
},
{
id:2,
name:"Azospirillum",
price:650,
date:"18 October 2024",
stock:true,
image:"/product.png"
},
{
id:3,
name:"Azospirillum",
price:650,
date:"18 October 2024",
stock:true,
image:"/product.png"
},
{
id:4,
name:"Azospirillum",
price:650,
date:"18 October 2024",
stock:false,
image:"/product.png"
}
]);

const removeItem = (id)=>{
setWishlist(wishlist.filter(item => item.id !== id));
};

const addToCart = (item)=>{
console.log("Added to cart", item);
};

return (

<div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">

<div className="bg-white border rounded-xl overflow-hidden">

{/* Header */}

<div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] p-4 border-b text-black-500 text-sm font-medium">

<p>Product</p>
<p>Price</p>
<p>Date Added</p>
<p>Stock Status</p>
<p></p>
<p></p>

</div>

{/* Items */}

{wishlist.map((item)=>(

<div
key={item.id}
className="relative grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 md:gap-0 p-4 border-b">

{/* Product */}

<div className="flex items-center gap-4">

<img
src={item.image}
alt={item.name}
className="h-16 w-16 object-contain"
/>

<div>

<p className="font-medium text-sm">
{item.name}
</p>

<p className="text-xs text-gray-400">
{item.name}
</p>

</div>

</div>

{/* Price */}

<div className="flex justify-between md:block text-sm">

<span className="md:hidden font-medium">Price :</span>

<span>Rs.{item.price}</span>

</div>

{/* Date */}

<div className="flex justify-between md:block text-sm text-gray-600">

<span className="md:hidden font-medium">Date :</span>

<span>{item.date}</span>

</div>

{/* Stock */}

<div className="flex justify-between md:block">

<span className="md:hidden font-medium">Stock :</span>

{item.stock ? (

<span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-md">
In Stock
</span>

) : (

<span className="bg-red-100 text-red-500 text-xs px-3 py-1 rounded-md">
Out of Stock
</span>

)}

</div>

{/* Add to Cart */}

<div>

<button
disabled={!item.stock}
onClick={()=>addToCart(item)}
className={`px-4 py-2 md:px-3 md:py-1.5 lg:px-5 lg:py-2 
rounded-full text-sm font-medium whitespace-nowrap transition
${
item.stock
? "bg-green-600 text-white hover:bg-green-700"
: "bg-gray-200 text-gray-400 cursor-not-allowed"
}`}
>
Add to Cart
</button>

</div>

{/* Remove */}

<button
onClick={()=>removeItem(item.id)}
className="absolute top-4 right-4 md:static text-gray-400 hover:text-red-500"
>
<X size={18}/>
</button>

</div>

))}

</div>

</div>

);
}

