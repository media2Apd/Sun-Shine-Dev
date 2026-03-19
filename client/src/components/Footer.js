// import { useNavigate } from "react-router-dom";
// import logo from "../assets/footerimage.png";

// export default function Footer() {
//   const navigate = useNavigate();
//   return (
//     <div className="bg-[#111111] text-gray-300 py-16 px-6">
//       <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-10">

//         {/* Logo + Address */}
//         <div>
//           <img src={logo} alt="logo" className="w-40 mb-4" />

//           <p className="text-sm leading-6 text-gray-400">
//             71/151/1,Door no W2/151, Mariyaponusami Mill Complex,<br/>
//             Annanji Vilakku, Unjampatti, Theni Dist-625 531,<br/>
//             Tamilnadu.
//           </p>

//           <p className="text-sm mt-4 text-gray-400">
//             (+91) 84899 43518, 8489 435238
//           </p>

//           <p className="text-sm mt-2 text-gray-400">
//             sunshineagrotech@gmail.com
//           </p>
//         </div>

//         {/* My Account */}
//         <div>
//           <h1 className="text-white font-semibold mb-4">My Account</h1>
//           <ul className="space-y-2 text-sm">
//             <li onClick={()=> navigate('./settings-page')} className="cursor-pointer">Profile</li>
//             <li>Order History</li>
//             <li onClick={()=> navigate('./cart-page')} className="cursor-pointer">Shopping Cart</li>
//             <li onClick={()=> navigate('./wishlist-page')} className="cursor-pointer">Wishlist</li>
//           </ul>
//         </div>

//         {/* Categories */}
//         <div>
//           <h1 className="text-white font-semibold mb-4">Categories</h1>
//           <ul className="space-y-2 text-sm">
//             <li>Organic manures</li>
//             <li>Bio fertilizers</li>
//             <li>Bio pesticides</li>
//             <li>Growth promoter</li>
//           </ul>
//         </div>

//         {/* Proxy */}
//         <div>
//           <h1 className="text-white font-semibold mb-4">Proxy</h1>
//           <ul className="space-y-2 text-sm">
//             <li onClick={()=> navigate('./about-page')} className="cursor-pointer">About</li>
//             <li onClick={()=> navigate('./category-products')} className="cursor-pointer" >Shop</li>
//             <li onClick={()=> navigate('./blog-page')} className="cursor-pointer">Blog</li>
//             <li onClick={()=> navigate('./gallery-page')} className="cursor-pointer">Gallery</li>
//           </ul>
//         </div>

//         {/* Helps */}
//         <div>
//           <h1 className="text-white font-semibold mb-4">Helps</h1>
//           <ul className="space-y-2 text-sm">
//             <li  onClick={()=> navigate('./contact-page')} className="cursor-pointer">Contact</li>
//             <li>FAQ’s</li>
//             <li>Terms & Condition</li>
//             <li>Privacy Policy</li>
//           </ul>
//         </div>

//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import logo from "../assets/footerimage.png";
import { useContext } from "react";
import { CategoryContext } from "../Context/CategoryContext";

export default function Footer() {
  const navigate = useNavigate();
  const { category } = useContext(CategoryContext); // get categories from context

  return (
    <div className="bg-[#111111] text-gray-300 py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-10">

        {/* Logo + Address */}
        <div>
          <img src={logo} alt="logo" className="w-40 mb-4" />

          <p className="text-sm leading-6 text-gray-400">
            71/151/1,Door no W2/151, Mariyaponusami Mill Complex,<br/>
            Annanji Vilakku, Unjampatti, Theni Dist-625 531,<br/>
            Tamilnadu.
          </p>

          <p className="text-sm mt-4 text-gray-400">
            (+91) 84899 43518, 8489 435238
          </p>

          <p className="text-sm mt-2 text-gray-400">
            sunshineagrotech@gmail.com
          </p>
        </div>

        {/* My Account */}
        <div>
          <h1 className="text-white font-semibold mb-4">My Account</h1>
          <ul className="space-y-2 text-sm">
            <li onClick={()=> navigate('./settings-page')} className="cursor-pointer">Profile</li>
            <li>Order History</li>
            <li onClick={()=> navigate('./cart-page')} className="cursor-pointer">Shopping Cart</li>
            <li onClick={()=> navigate('./wishlist-page')} className="cursor-pointer">Wishlist</li>
          </ul>
        </div>

        {/* Categories (dynamic) */}
        <div>
          <h1 className="text-white font-semibold mb-4">Categories</h1>
          <ul className="space-y-2 text-sm">
            {category && category.length > 0 ? (
              category.map((cat) => (
                <li
                  key={cat.id}
                  onClick={() => navigate(`/category-products/${cat.id}`)}
                  className="cursor-pointer"
                >
                  {cat.name}
                </li>
              ))
            ) : (
              <li className="text-gray-500">No categories</li>
            )}
          </ul>
        </div>

        {/* Proxy */}
        <div>
          <h1 className="text-white font-semibold mb-4">Proxy</h1>
          <ul className="space-y-2 text-sm">
            <li onClick={()=> navigate('./about-page')} className="cursor-pointer">About</li>
            <li onClick={()=> navigate('./category-products')} className="cursor-pointer">Shop</li>
            <li onClick={()=> navigate('./blog-page')} className="cursor-pointer">Blog</li>
            <li onClick={()=> navigate('./gallery-page')} className="cursor-pointer">Gallery</li>
          </ul>
        </div>

        {/* Helps */}
        <div>
          <h1 className="text-white font-semibold mb-4">Helps</h1>
          <ul className="space-y-2 text-sm">
            <li onClick={()=> navigate('./contact-page')} className="cursor-pointer">Contact</li>
            <li>FAQ’s</li>
            <li>Terms & Condition</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

      </div>
    </div>
  );
}