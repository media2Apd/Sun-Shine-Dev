
// import React from "react";
// import { ArrowLeft, Leaf, Headphones, ShieldCheck, Truck, Package } from "lucide-react";

// import farm1 from "../assets/about1.png";
// import farm2 from "../assets/about2.png";
// import farm3 from "../assets/about3.png";
// import UserReviews from "../components/homeComponents/UserReviews";
// // import Newsletter from "../components/homeComponents/NewsLetter";
// import { useNavigate } from "react-router-dom";

// const AboutPage = () => {
//   const navigate = useNavigate();

//   return (
//     <>

//       {/* ABOUT PAGE CONTENT */}
//       <div className="min-h-screen px-5 md:px-10 lg:px-24 py-6">

//         {/* Back Button */}
//         <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 mb-8 hover:text-black">
//           <ArrowLeft size={18} /> Back
//         </button>

//         {/* SECTION 1 */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
//               100% Trusted Agricultural Solutions Provider
//             </h1>

//             <p className="text-gray-600 mb-4 leading-relaxed">
//               Sunshine is a trusted provider of high-quality agricultural inputs, offering a wide range of organic manures, bio fertilizers, bio pesticides, plant growth promoters and specialty nutrient solutions.
//             </p>

//             <p className="text-gray-600 leading-relaxed">
//               We focus on improving soil fertility, crop health, and farm productivity through eco-friendly and sustainable products that support modern agriculture.
//             </p>
//           </div>

//           <img
//             src={farm1}
//             alt="farm"
//             className="rounded-xl shadow-md w-full"
//           />

//         </div>

//         {/* SECTION 2 */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-14">

//           {/* CONTENT */}
//           <div className="order-1 md:order-2">

//             <h2 className="text-3xl font-bold text-green-700 mb-3">
//               Our Mission
//             </h2>

//             <p className="text-gray-600 mb-6 leading-relaxed">
//               To support farmers with safe, effective, and sustainable agricultural solutions that enhance soil health, improve crop yield, and promote long-term farming success.
//             </p>

//             <h3 className="text-2xl font-semibold text-gray-800 mb-5">
//               Why Choose Us?
//             </h3>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">

//               <div className="flex gap-3 items-start">
//                 <Leaf size={22} className="text-green-600 min-w-[22px]" />
//                 <p className="text-sm text-gray-600">
//                   Eco-friendly and safe products supporting sustainable agriculture
//                 </p>
//               </div>

//               <div className="flex gap-3 items-start">
//                 <Headphones size={22} className="text-green-600 min-w-[22px]" />
//                 <p className="text-sm text-gray-600">
//                   Direct Support 24/7
//                 </p>
//               </div>

//               <div className="flex gap-3 items-start">
//                 <ShieldCheck size={22} className="text-green-600 min-w-[22px]" />
//                 <p className="text-sm text-gray-600">
//                   Trusted by farmers for consistent quality
//                 </p>
//               </div>

//               <div className="flex gap-3 items-start">
//                 <Package size={22} className="text-green-600 min-w-[22px]" />
//                 <p className="text-sm text-gray-600">
//                   100% Secure Payment
//                 </p>
//               </div>

//               <div className="flex gap-3 items-start">
//                 <Truck size={22} className="text-green-600 min-w-[22px]" />
//                 <p className="text-sm text-gray-600">
//                   Free Shipping
//                 </p>
//               </div>

//               <div className="flex gap-3 items-start">
//                 <Leaf size={22} className="text-green-600 min-w-[22px]" />
//                 <p className="text-sm text-gray-600">
//                   Highly tested solutions developed through research
//                 </p>
//               </div>

//             </div>

//           </div>

//           {/* IMAGE */}
//           <img
//             src={farm2}
//             alt="plant"
//             className="rounded-xl shadow-md w-full order-2 md:order-1"
//           />

//         </div>

//         {/* SECTION 3 */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-16">

//           <div>

//             <h2 className="text-3xl font-bold text-gray-800 mb-4">
//               We Deliver Quality, You Enjoy Better Harvests
//             </h2>

//             <p className="text-gray-600 mb-6 leading-relaxed">
//               At Sunshine, quality is our priority. We ensure every product is developed with carefully selected ingredients and proven formulations to deliver consistent results in the field.
//               Our commitment is to provide safe, eco-friendly, and performance-driven solutions that meet the needs of farmers and support sustainable agriculture.
//             </p>

//             <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition" onClick={() => navigate("/")}>
//               Shop Now →
//             </button>

//           </div>

//           <img
//             src={farm3}
//             alt="harvest"
//             className="rounded-xl shadow-md w-full"
//           />

//         </div>

//       </div>

//       {/* USER REVIEWS (FULL WIDTH) */}
//       <div className="w-full py-10">
//         <UserReviews />
//         {/* <Newsletter/> */}
//       </div>

//     </>
//   );
// };

// export default AboutPage;


import React from "react";
import { ArrowLeft, Leaf, Headphones, ShieldCheck, Truck, Package, Eye, Target } from "lucide-react"; // Eye மற்றும் Target ஐகான்கள் சேர்க்கப்பட்டுள்ளன

import farm1 from "../assets/about1.png";
import farm2 from "../assets/about2.png";
import farm3 from "../assets/about3.png";
import UserReviews from "../components/homeComponents/UserReviews";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen px-5 md:px-10 lg:px-24 py-6">

        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 mb-8 hover:text-black">
          <ArrowLeft size={18} /> Back
        </button>

        {/* SECTION 1 - Introduction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              100% Trusted Agricultural Solutions Provider
            </h1>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Sunshine is a trusted provider of high-quality agricultural inputs, offering a wide range of organic manures, bio fertilizers, bio pesticides, plant growth promoters and specialty nutrient solutions.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We focus on improving soil fertility, crop health, and farm productivity through eco-friendly and sustainable products that support modern agriculture.
            </p>
          </div>
          <img src={farm1} alt="farm" className="rounded-xl shadow-md w-full" />
        </div>

        {/* SECTION 2 - Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-20">
          
          {/* IMAGE */}
          <img
            src={farm2}
            alt="plant"
            className="rounded-xl shadow-md w-full order-2 md:order-1"
          />

          {/* CONTENT */}
          <div className="order-1 md:order-2">
            
            {/* Mission & Vision Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-3">
                   <Target className="text-green-700" size={24} />
                   <h2 className="text-2xl font-bold text-green-700">Our Mission</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed border-l-4 border-green-600 pl-3">
                  To support farmers with safe, effective, and sustainable agricultural solutions that enhance soil health, improve crop yield, and promote long-term farming success.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                   <Eye className="text-green-700" size={24} />
                   <h2 className="text-2xl font-bold text-green-700">Our Vision</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed border-l-4 border-green-600 pl-3">
                  To become a leading agricultural brand by delivering reliable organic and biological products that contribute to healthy farming, greener cultivation, and better future harvests.
                </p>
              </div>
            </div>

            {/* Why Choose Us Section */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-5">
              Why Choose Us?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex gap-3 items-start">
                <Leaf size={22} className="text-green-600 min-w-[22px]" />
                <p className="text-sm text-gray-600">Eco-friendly and safe products</p>
              </div>
              <div className="flex gap-3 items-start">
                <Headphones size={22} className="text-green-600 min-w-[22px]" />
                <p className="text-sm text-gray-600">Direct Support 24/7</p>
              </div>
              <div className="flex gap-3 items-start">
                <ShieldCheck size={22} className="text-green-600 min-w-[22px]" />
                <p className="text-sm text-gray-600">Trusted by farmers for quality</p>
              </div>
              <div className="flex gap-3 items-start">
                <Package size={22} className="text-green-600 min-w-[22px]" />
                <p className="text-sm text-gray-600">100% Secure Payment</p>
              </div>
              <div className="flex gap-3 items-start">
                <Truck size={22} className="text-green-600 min-w-[22px]" />
                <p className="text-sm text-gray-600">Free Shipping</p>
              </div>
              <div className="flex gap-3 items-start">
                <Leaf size={22} className="text-green-600 min-w-[22px]" />
                <p className="text-sm text-gray-600">Research-backed solutions</p>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 3 - Call to Action */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-16 pb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              We Deliver Quality, You Enjoy Better Harvests
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At Sunshine, quality is our priority. We ensure every product is developed with carefully selected ingredients and proven formulations to deliver consistent results in the field.
            </p>
            <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition" onClick={() => navigate("/")}>
              Shop Now →
            </button>
          </div>
          <img src={farm3} alt="harvest" className="rounded-xl shadow-md w-full" />
        </div>
      </div>

      {/* USER REVIEWS */}
      <div className="w-full py-10 bg-gray-50">
        <UserReviews />
      </div>
    </>
  );
};

export default AboutPage;