import { useState } from "react";
import { Star, Heart, ShoppingCart, Leaf } from "lucide-react";



export default function ProductOverview() {

const [qty, setQty] = useState(1);
const [selectedPack, setSelectedPack] = useState("4kg");
const [selectedImage, setSelectedImage] = useState("/product.png");
const [activeTab, setActiveTab] = useState("description");

const images = [
"/product.png",
"/product.png",
"/product.png",
"/product.png"
];

const packs = ["2kg","4kg","5kg","10kg"];

const related = new Array(4).fill({
title:"Azospirillum Nitrogen Food Bacteria",
price:"₹850.00",
img:"/product.png"
});

return (

<div className="max-w-7xl mx-auto px-4 md:px-6 py-6">

{/* PRODUCT SECTION */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

{/* PRODUCT GALLERY */}

<div className="flex flex-col md:flex-row gap-4">

<div className="flex-1 bg-gray-50 rounded-xl p-6 flex items-center justify-center">

<img
src={selectedImage}
className="max-h-80 md:max-h-96 object-contain"
/>

</div>

<div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">

{images.map((img,i)=>(

<img
key={i}
src={img}
onClick={()=>setSelectedImage(img)}
className={`w-16 h-16 border rounded-lg cursor-pointer object-cover
${selectedImage===img ? "border-green-600" : ""}`}
/>

))}

</div>

</div>

{/* PRODUCT DETAILS */}

<div>

<h1 className="text-xl md:text-2xl font-semibold">
Azospirillum Nitrogen Food Bacteria
</h1>

{/* RATING */}

<div className="flex items-center gap-2 mt-2">

<div className="flex text-orange-400">

{[...Array(5)].map((_,i)=>(
<Star key={i} size={16} fill="currentColor"/>
))}

</div>

<span className="text-sm text-gray-500">(4 review)</span>

</div>

{/* PRICE */}

<div className="mt-4 flex flex-wrap items-center gap-3">

<span className="text-gray-400 line-through text-sm">
₹1899.00
</span>

<span className="text-2xl text-green-600 font-bold">
₹899.00
</span>

<span className="bg-red-200 text-red-500 text-xs font-bold px-2 py-1 rounded-full">
64% Off
</span>

</div>

<p className="text-gray-500 mt-4 text-sm md:text-base">
GreenGrow Plus is a premium organic fertilizer designed to enhance soil health and boost plant growth naturally.
</p>

{/* PACK SIZE */}

<div className="mt-6">

<p className="font-medium mb-2">Pack Size</p>

<div className="flex flex-wrap gap-3">

{packs.map((pack)=>(

<button
key={pack}
onClick={()=>setSelectedPack(pack)}
className={`px-4 py-2 rounded-full border text-sm
${selectedPack===pack
? "bg-green-600 text-white border-green-600"
: "border-gray-300"
}`}
>

{pack}

</button>

))}

</div>

</div>

{/* QUANTITY + CART */}

<div className="flex flex-wrap items-center gap-4 mt-6">

<div className="flex border rounded-lg">

<button
className="px-3"
onClick={()=>setQty(Math.max(1,qty-1))}
>
-
</button>

<span className="px-4 py-2">{qty}</span>

<button
className="px-3"
onClick={()=>setQty(qty+1)}
>
+
</button>

</div>

<button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full text-sm md:text-base">

<ShoppingCart size={18}/>
Add to Cart

</button>

<button className="border p-3 rounded-full">
<Heart size={18}/>
</button>

</div>

{/* CATEGORY + TAG */}

<div className="mt-6 text-sm text-gray-600 space-y-1">

<p>
<span className="font-semibold text-gray-800">Category:</span>
Soil Nutrition
</p>

<p>
<span className="font-semibold text-gray-800">Tag:</span>
Soil Healthy
<span className="underline ml-1">Chinese</span>
<span className="ml-1">Liquid</span>
</p>

</div>

</div>

</div>

{/* TABS */}

<div className="mt-16">

<div className="flex justify-center gap-8 border-b text-sm md:text-base">

<button
onClick={()=>setActiveTab("description")}
className={`pb-2 ${
activeTab==="description"
? "border-b-2 border-green-600 font-semibold"
: "text-gray-500"
}`}
>
Descriptions
</button>

<button
onClick={()=>setActiveTab("info")}
className={`pb-2 ${
activeTab==="info"
? "border-b-2 border-green-600 font-semibold"
: "text-gray-500"
}`}
>
Additional Information
</button>

<button
onClick={()=>setActiveTab("feedback")}
className={`pb-2 ${
activeTab==="feedback"
? "border-b-2 border-green-600 font-semibold"
: "text-gray-500"
}`}
>
Customer Feedback
</button>

</div>

{/* DESCRIPTION TAB */}

{activeTab==="description" && (

<div className="mt-12 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-4">

{/* LEFT CONTENT */}

<div>

<p className="text-gray-600 mb-6 max-w-2xl">
GreenGrow Plus Organic Fertilizer is formulated using
 natural plant extracts and bio-nutrients to support sustainable
  farming and gardening.
</p>

<ul className="space-y-4 text-gray-600">

{[
"100 g natural plant extracts",
"Bio-nutrients to support sustainable farming",
"Enhances soil microbial activity",
"Improves nutrient absorption"
].map((item,i)=>(

<li key={i} className="flex items-start gap-3">

<span className="w-5 h-5 flex items-center justify-center bg-green-600 text-white rounded-full text-xs">
✓
</span>

{item}

</li>

))}

</ul>
<p className="text-gray-600 mb-6 max-w-2xl pt-10">img elements must have an alt prop, either with 
    meaningful text, or an empty string for decorative images
</p>

</div>

{/* RIGHT CONTENT */}

<div>

{/* VIDEO */}

<div className="bg-gray-100 rounded-xl p-4 shadow-sm h-[320px] flex items-center justify-center">

<img
src="/farmer.png"
className="rounded-lg w-full h-full object-cover"
/>

</div>

{/* FEATURES */}

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">

<div className="flex gap-3 items-center bg-white border p-4 rounded-lg hover:shadow-md transition">

<Leaf className="text-green-600"/>

<div>

<p className="font-semibold text-sm">
ORGANIC FERTILIZER
</p>

<p className="text-xs text-gray-500">
Boost your soil health naturally
</p>

</div>

</div>

<div className="flex gap-3 items-center bg-white border p-4 rounded-lg hover:shadow-md transition">

<Leaf className="text-green-600"/>

<div>

<p className="font-semibold text-sm">
SOIL ENRICHMENT
</p>

<p className="text-xs text-gray-500">
Promote sustainable growth
</p>

</div>

</div>

</div>

</div>

</div>

)}

{/* ADDITIONAL INFO */}

{activeTab==="info" && (

<div className="max-w-4xl mx-auto mt-8 text-gray-600 text-sm space-y-2 px-4">

<p>Weight : 4kg</p>
<p>Type : Organic Fertilizer</p>
<p>Usage : Soil Application</p>

</div>

)}

{/* FEEDBACK */}

{activeTab==="feedback" && (

<div className="max-w-4xl mx-auto mt-8 text-gray-600 text-sm px-4">

<p>No customer feedback yet.</p>

</div>

)}

</div>

{/* RELATED PRODUCTS */}

<div className="mt-16">

<h2 className="text-xl font-semibold mb-6">
Related products
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

{related.map((item,i)=>(

<div
key={i}
className="border rounded-xl p-4 hover:shadow-md transition"
>

<img
src={item.img}
className="h-32 md:h-40 mx-auto mb-4 object-contain"
/>

<h4 className="text-sm font-medium line-clamp-2">
{item.title}
</h4>

<p className="text-green-600 font-semibold mt-2">
{item.price}
</p>

<button className="mt-3 w-full border rounded-lg py-2 text-sm hover:bg-green-600 hover:text-white transition">
Add to Cart
</button>

</div>

))}

</div>

</div>

</div>

);

}