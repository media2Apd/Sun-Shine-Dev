// import React from "react";

// import HeroPage  from "../components/homeComponents/heropage";
// import FeaturesSection from "../components/homeComponents/featureSection";
// import CategoriesSection from "../components/homeComponents/CategoriesSection";
// import BannerSection from "../components/homeComponents/BannerSection";
// import FeaturedProducts from "../components/homeComponents/FeaturedProducts";
// import BannerSection2 from "../components/homeComponents/BannerSection2";
// import BlogsSection from "../components/homeComponents/BlogSection";
// import UserReviews from "../components/homeComponents/UserReviews";
// import { SimplifiedBuyingProcess } from "../components/homeComponents/SimplifiedBuying";
// import { OurCertificates } from "../components/homeComponents/OurCertificates";
// import Newsletter from "../components/homeComponents/NewsLetter";
// import { ProductProvider } from "../Context/ProductContext";
// import HomeProducts from "../components/homeComponents/HomeProducts";

// function Home() {
//   return (
 


//    <div>
//    <HeroPage/>
//    <FeaturesSection/>
//      <CategoriesSection/>
//     <BannerSection/>  
//     <FeaturedProducts/>
//     <BannerSection2/>
//    <HomeProducts/>
  
//     <UserReviews/>
//     <BlogsSection/> 
//     <SimplifiedBuyingProcess/>
//     <OurCertificates/>
//     <Newsletter/>
//     <ProductProvider/>
   
 

//   </div>
//   );
// }

// export default Home;

// import React from "react";

// import HeroPage from "../components/homeComponents/heropage";
// import FeaturesSection from "../components/homeComponents/featureSection";
// import CategoriesSection from "../components/homeComponents/CategoriesSection";
// import BannerSection from "../components/homeComponents/BannerSection";
// import FeaturedProducts from "../components/homeComponents/FeaturedProducts";
// import BannerSection2 from "../components/homeComponents/BannerSection2";
// import BlogsSection from "../components/homeComponents/BlogSection";
// import UserReviews from "../components/homeComponents/UserReviews";
// import { SimplifiedBuyingProcess } from "../components/homeComponents/SimplifiedBuying";
// import { OurCertificates } from "../components/homeComponents/OurCertificates";
// import Newsletter from "../components/homeComponents/NewsLetter";
// import { ProductProvider } from "../Context/ProductContext";
// import HomeProducts from "../components/homeComponents/HomeProducts";

// function Home() {
//   return (
//     <div>
//       <HeroPage />
//       <FeaturesSection />
//       <CategoriesSection />
//       <BannerSection />

//       {/* Wrap products in context */}
//       <ProductProvider>
//         <FeaturedProducts />
//         <BannerSection2 />
//         <HomeProducts />
//       </ProductProvider>

//       <UserReviews />
//       <BlogsSection />
//       <SimplifiedBuyingProcess />
//       <OurCertificates />
//       <Newsletter />
//     </div>
//   );
// }

// export default Home;

// import React from "react";

// import HeroPage from "../components/homeComponents/heropage";
// import FeaturesSection from "../components/homeComponents/featureSection";
// import CategoriesSection from "../components/homeComponents/CategoriesSection";
// import BannerSection from "../components/homeComponents/BannerSection";
// import FeaturedProducts from "../components/homeComponents/FeaturedProducts";
// import BannerSection2 from "../components/homeComponents/BannerSection2";
// import BlogsSection from "../components/homeComponents/BlogSection";
// import UserReviews from "../components/homeComponents/UserReviews";
// import { SimplifiedBuyingProcess } from "../components/homeComponents/SimplifiedBuying";
// import { OurCertificates } from "../components/homeComponents/OurCertificates";
// import Newsletter from "../components/homeComponents/NewsLetter";
// import { ProductProvider } from "../Context/ProductContext";
// import HomeProducts from "../components/homeComponents/HomeProducts";

// function Home() {
//   return (
//     <div>
//       <HeroPage />
//       <FeaturesSection />
//       <CategoriesSection />
//       <BannerSection />

//       {/* Wrap only the product-related components */}
//       <ProductProvider>
//         <FeaturedProducts />
//         <BannerSection2 />
//         <HomeProducts />
//       </ProductProvider>

//       <UserReviews />

//       {/* Wrap BlogsSection safely */}
//       <BlogsSection />

//       <SimplifiedBuyingProcess />
//       <OurCertificates />
//       <Newsletter />
//     </div>
//   );
// }

// export default Home;

import React from "react";

// Home sections
import HeroPage from "../components/homeComponents/heropage";
import FeaturesSection from "../components/homeComponents/featureSection";
import CategoriesSection from "../components/homeComponents/CategoriesSection";
import BannerSection from "../components/homeComponents/BannerSection";
import FeaturedProducts from "../components/homeComponents/FeaturedProducts";
import BannerSection2 from "../components/homeComponents/BannerSection2";
import HomeProducts from "../components/homeComponents/HomeProducts";
import UserReviews from "../components/homeComponents/UserReviews";
import BlogsSection from "../components/homeComponents/BlogSection";
import { SimplifiedBuyingProcess } from "../components/homeComponents/SimplifiedBuying";
import { OurCertificates } from "../components/homeComponents/OurCertificates";
import Newsletter from "../components/homeComponents/NewsLetter";

function Home() {
  return (
    <div className="min-h-screen">
      <HeroPage />
      <FeaturesSection />
      <CategoriesSection />
      <BannerSection />
      <FeaturedProducts />
      <BannerSection2 />
      <HomeProducts />
      <UserReviews />
      <BlogsSection />
      <SimplifiedBuyingProcess />
      <OurCertificates />
      <Newsletter />
    </div>
  );
}

export default Home;