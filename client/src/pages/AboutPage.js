
import React from "react";
import { ArrowLeft, Leaf, Headphones, ShieldCheck, Truck, Package } from "lucide-react";

import farm1 from "../assets/about1.png";
import farm2 from "../assets/about2.png";
import farm3 from "../assets/about3.png";
import UserReviews from "../components/homeComponents/UserReviews";
// import Newsletter from "../components/homeComponents/NewsLetter";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <>

      {/* ABOUT PAGE CONTENT */}
      <div className="min-h-screen px-5 md:px-10 lg:px-24 py-6">

        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 mb-8 hover:text-black">
          <ArrowLeft size={18} /> Back
        </button>

        {/* SECTION 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              100% Trusted Agricultural Solutions Provider
            </h1>

            <p className="text-gray-600 mb-4 leading-relaxed">
              Sunshine Agritech is a trusted name in agricultural inputs,
              committed to supporting farmers with high-quality fertilizers,
              bio products, and crop protection solutions.
            </p>

            <p className="text-gray-600 leading-relaxed">
              With a deep understanding of modern farming challenges,
              we offer a wide range of solutions designed to improve
              productivity while maintaining environmental sustainability.
            </p>
          </div>

          <img
            src={farm1}
            alt="farm"
            className="rounded-xl shadow-md w-full"
          />

        </div>

        {/* SECTION 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-14">

          {/* CONTENT */}
          <div className="order-1 md:order-2">

            <h2 className="text-3xl font-bold text-green-700 mb-3">
              Our Mission
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Our mission is to empower farmers with effective,
              eco-friendly, and affordable agricultural solutions.
              We aim to enhance productivity while ensuring
              sustainable farming practices.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 mb-5">
              Why Choose Us?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">

              <div className="flex gap-3 items-start">
                <Leaf size={22} className="text-green-600 min-w-[22px]" />
                <p className="text-sm text-gray-600">
                  Eco-friendly and safe products supporting sustainable agriculture
                </p>
              </div>

              <div className="flex gap-3 items-start">
                <Headphones size={22} className="text-green-600 min-w-[22px]" />
                <p className="text-sm text-gray-600">
                  Direct Support 24/7
                </p>
              </div>

              <div className="flex gap-3 items-start">
                <ShieldCheck size={22} className="text-green-600 min-w-[22px]" />
                <p className="text-sm text-gray-600">
                  Trusted by farmers for consistent quality
                </p>
              </div>

              <div className="flex gap-3 items-start">
                <Package size={22} className="text-green-600 min-w-[22px]" />
                <p className="text-sm text-gray-600">
                  100% Secure Payment
                </p>
              </div>

              <div className="flex gap-3 items-start">
                <Truck size={22} className="text-green-600 min-w-[22px]" />
                <p className="text-sm text-gray-600">
                  Free Shipping
                </p>
              </div>

              <div className="flex gap-3 items-start">
                <Leaf size={22} className="text-green-600 min-w-[22px]" />
                <p className="text-sm text-gray-600">
                  Highly tested solutions developed through research
                </p>
              </div>

            </div>

          </div>

          {/* IMAGE */}
          <img
            src={farm2}
            alt="plant"
            className="rounded-xl shadow-md w-full order-2 md:order-1"
          />

        </div>

        {/* SECTION 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-16">

          <div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              We Deliver Quality, You Enjoy Better Harvests
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              At Sunshine Agritech we believe long-term partnerships
              with farmers are the key to success. Our commitment
              to quality and innovation ensures every farmer
              achieves better productivity.
            </p>

            <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
              Shop Now →
            </button>

          </div>

          <img
            src={farm3}
            alt="harvest"
            className="rounded-xl shadow-md w-full"
          />

        </div>

      </div>

      {/* USER REVIEWS (FULL WIDTH) */}
      <div className="w-full py-10">
        <UserReviews />
        {/* <Newsletter/> */}
      </div>

    </>
  );
};

export default AboutPage;