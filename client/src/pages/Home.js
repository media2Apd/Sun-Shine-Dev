import React from "react";

import HeroPage  from "../components/homeComponents/heropage";
import FeaturesSection from "../components/homeComponents/featureSection";
import CategoriesSection from "../components/homeComponents/CategoriesSection";
import BannerSection from "../components/homeComponents/BannerSection";
import FeaturedProducts from "../components/homeComponents/FeaturedProducts";
import BannerSection2 from "../components/homeComponents/BannerSection2";
import BlogsSection from "../components/homeComponents/BlogSection";
import UserReviews from "../components/homeComponents/UserReviews";
import { SimplifiedBuyingProcess } from "../components/homeComponents/SimplifiedBuying";
import { OurCertificates } from "../components/homeComponents/OurCertificates";
import Newsletter from "../components/homeComponents/NewsLetter";
import { ProductProvider } from "../Context/ProductContext";
import HomeProducts from "../components/homeComponents/HomeProducts";

function Home() {
  return (
 


   <div>
   <HeroPage/>
   <FeaturesSection/>
     <CategoriesSection/>
    <BannerSection/>  
    <FeaturedProducts/>
    <BannerSection2/>
   <HomeProducts/>
  
    <UserReviews/>
    <BlogsSection/> 
    <SimplifiedBuyingProcess/>
    <OurCertificates/>
    <Newsletter/>
    <ProductProvider/>
    <ProductProvider/>
 

  </div>
  );
}

export default Home;
