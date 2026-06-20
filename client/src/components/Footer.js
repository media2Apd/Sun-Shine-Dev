// import { useNavigate } from "react-router-dom";
// import logo from "../assets/logo.svg";
// import { useContext } from "react";
// import { CategoryContext } from "../Context/CategoryContext";
// import { useSelector } from "react-redux";

// export default function Footer() {
//   const navigate = useNavigate();
//   const { category } = useContext(CategoryContext); // get categories from context
//   const user = useSelector((state) => state?.user?.user);
//   return (
//     <div className="bg-[#111111] text-gray-300 py-16 px-6">
//       <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-10">

//         {/* Logo + Address */}
//         <div>
//           <img src={logo} alt="logo" className="w-40 mb-4" />

//           <p className="text-sm leading-6 text-gray-400">
//             71/151/1,Door no W2/151, Mariyaponusami Mill Complex,<br/>
//             Annanji Vilakku, Unjampatti, Theni Dist-625531, Tamilnadu.
//           </p>

//           <p className="text-sm mt-4 text-gray-400">
//   <a href="tel:+918489943518" className="hover:underline hover:text-white transition whitespace-nowrap">
//     (+91) 84899 43518
//   </a>,{" "}
//   <a href="tel:+918489435238" className="hover:underline hover:text-white transition whitespace-nowrap">
//     8489 435238
//   </a>
// </p>

// <p className="text-sm mt-2 text-gray-400">
//   <a
//     href="mailto:sunshineagrotech@gmail.com"
//     className="hover:underline"
//   >
//     sunshineagrotech@gmail.com
//   </a>
// </p>
//         </div>

//         {/* My Account */}
//         <div>
//           <h1 className="text-white font-semibold mb-4">My Account</h1>
//           <ul className="space-y-2 text-sm">
//             <li onClick={()=> navigate('./settings')} className="cursor-pointer">Profile</li>
//             <li
//               onClick={() => {
//                 if (user) {
//                   navigate("/order-history");
//                 } else {
//                   navigate("/login", {
//                     state: { redirect: "/order-history" },
//                   });
//                 }
//               }}
//               className="cursor-pointer"
//             >
//               Order History
//             </li>
//             <li onClick={()=> navigate('./cart')} className="cursor-pointer">Shopping Cart</li>
//             <li onClick={()=> navigate('./wishlist')} className="cursor-pointer">Wishlist</li>
//           </ul>
//         </div>

//         {/* Categories (dynamic) */}
//         <div>
//           <h1 className="text-white font-semibold mb-4">Categories</h1>
//           <ul className="space-y-2 text-sm">
//             {category && category.length > 0 ? (
//               category.map((cat) => (
//                 <li
//                   key={cat._id}
//                   onClick={() => navigate(`/category-products?category=${encodeURIComponent(cat.name)}`,
//                   {
//                     state: {
//                       categoryId: cat._id,
//                       categoryName: cat.name,
//                     },
//                   })}
//                   className="cursor-pointer"
//                 >
//                   {cat.name}
//                 </li>
//               ))
//             ) : (
//               <li className="text-gray-500">No categories</li>
//             )}
//           </ul>
//         </div>

//         {/* Proxy */}
//         <div>
//           <h1 className="text-white font-semibold mb-4">Proxy</h1>
//           <ul className="space-y-2 text-sm">
//             <li onClick={()=> navigate('./about')} className="cursor-pointer">About</li>
//             <li onClick={()=> navigate('./category-products')} className="cursor-pointer">Shop</li>
//             <li onClick={()=> navigate('./blogs')} className="cursor-pointer">Blog</li>
//             <li onClick={()=> navigate('./gallery')} className="cursor-pointer">Gallery</li>
//           </ul>
//         </div>

//         {/* Helps */}
//         <div>
//           <h1 className="text-white font-semibold mb-4">Helps</h1>
//           <ul className="space-y-2 text-sm">
//             <li onClick={()=> navigate('./contact-us')} className="cursor-pointer">Contact</li>
//             <li onClick={()=> navigate('./faqs')} className="cursor-pointer">FAQ’s</li>
//             {/* Terms */}
//             <li>
//               <a
//                 href="/policy/terms-conditions"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="cursor-pointer"
//               >
//                 Terms & Condition
//               </a>
//             </li>

//             {/* Privacy */}
//             <li>
//               <a
//                 href="/policy/privacy-policy"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="cursor-pointer"
//               >
//                 Privacy Policy
//               </a>
//             </li>
//           </ul>
//         </div>

//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useContext } from "react";
import { CategoryContext } from "../Context/CategoryContext";
import { useSelector } from "react-redux";

export default function Footer() {
  const navigate = useNavigate();
  const { category } = useContext(CategoryContext); 
  const user = useSelector((state) => state?.user?.user);

  // Common Class for Hover effect
  const linkStyle = "cursor-pointer hover:text-white transition-colors duration-300 ease-in-out";

  return (
    <div className="bg-[#111111] text-gray-300 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">

          {/* Logo + Updated Address & Email */}
          <div>
            <img src={logo} alt="logo" className="w-40 mb-4" />
          <p className="text-sm leading-snug text-gray-400">
              D.No 19, ST-6, WD-12, Company Street, Genguvarpatti,<br/>
              Theni District - 625 203, Tamilnadu, India.
            </p>

            <p className="text-sm mt-4 text-gray-400">
              <a href="tel:+918489943518" className="hover:underline hover:text-white transition whitespace-nowrap">
                (+91) 84899 43518
              </a>,{" "}
              <a href="tel:+918489435238" className="hover:underline hover:text-white transition whitespace-nowrap">
                8489 435238
              </a>
            </p>

            <p className="text-sm mt-2 text-gray-400">
              <a href="mailto:sunshineagreetech@gmail.com" className="hover:underline hover:text-white transition">
                sunshineagreetech@gmail.com
              </a>
            </p>
          </div>

          {/* My Account */}
          <div>
            <h1 className="text-white font-semibold mb-4">My Account</h1>
            <ul className="space-y-2 text-sm">
              <li onClick={() => navigate('/settings')} className={linkStyle}>Profile</li>
              <li
                onClick={() => {
                  if (user) {
                    navigate("/order-history");
                  } else {
                    navigate("/login", { state: { redirect: "/order-history" } });
                  }
                }}
                className={linkStyle}
              >
                Order History
              </li>
              <li onClick={() => navigate('/cart')} className={linkStyle}>Shopping Cart</li>
              <li onClick={() => navigate('/wishlist')} className={linkStyle}>Wishlist</li>
            </ul>
          </div>

          {/* Categories (dynamic) */}
          <div>
            <h1 className="text-white font-semibold mb-4">Categories</h1>
            <ul className="space-y-2 text-sm">
              {category && category.length > 0 ? (
                category.map((cat) => (
                  <li
                    key={cat._id}
                    onClick={() => navigate(`/category-products?category=${encodeURIComponent(cat.name)}`, {
                      state: { categoryId: cat._id, categoryName: cat.name },
                    })}
                    className={linkStyle}
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
              <li onClick={() => navigate('/about')} className={linkStyle}>About</li>
              <li onClick={() => navigate('/category-products')} className={linkStyle}>Shop</li>
              <li onClick={() => navigate('/blogs')} className={linkStyle}>Blog</li>
              <li onClick={() => navigate('/gallery')} className={linkStyle}>Gallery</li>
            </ul>
          </div>

          {/* Helps */}
          <div>
            <h1 className="text-white font-semibold mb-4">Helps</h1>
            <ul className="space-y-2 text-sm">
              <li onClick={() => navigate('/contact-us')} className={linkStyle}>Contact</li>
              <li onClick={() => navigate('/faqs')} className={linkStyle}>FAQ’s</li>
              <li>
                <a href="/policy/privacy-policy" target="_blank" rel="noopener noreferrer" className={linkStyle}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/policy/terms-conditions" target="_blank" rel="noopener noreferrer" className={linkStyle}>
                  Terms & Condition
                </a>
              </li>
              <li>
                <a href="/policy/shipping-policy" target="_blank" rel="noopener noreferrer" className={linkStyle}>
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="/policy/return-refund" target="_blank" rel="noopener noreferrer" className={linkStyle}>
                  Return & Refund Policy
                </a>
              </li>
              <li>
                <a href="/policy/exchange-policy" target="_blank" rel="noopener noreferrer" className={linkStyle}>
                  Exchange Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Sunshine International Agritech. All Rights Reserved. | Developed by{" "}
            <a 
              href="https://www.digida.in/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white font-bold transition-colors"
            >
              Digida
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}