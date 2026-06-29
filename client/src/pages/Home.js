import React from "react";

// Home sections
import HeroPage from "../components/homeComponents/HeroPage";
import FeaturesSection from "../components/homeComponents/featureSection";
import CategoriesSection from "../components/homeComponents/CategoriesSection";
import BannerSection from "../components/homeComponents/BannerSection";
import FeaturedProducts from "../components/homeComponents/FeaturedProducts";
import BannerSection2 from "../components/homeComponents/BannerSection2";
import HomeProducts from "../components/homeComponents/HomeProducts";
import BlogsSection from "../components/homeComponents/BlogSection";
import { SimplifiedBuyingProcess } from "../components/homeComponents/SimplifiedBuying";
import { OurCertificates } from "../components/homeComponents/OurCertificates";
// import Newsletter from "../components/homeComponents/NewsLetter";

function Home() {
  return (
    <div className="min-h-screen">
      <HeroPage />
      <FeaturesSection />
      <CategoriesSection />
      <BannerSection />
      <div className="container mx-auto">
        <FeaturedProducts />
      </div>
      <BannerSection2 />
      <HomeProducts />
     
      <BlogsSection />
      <SimplifiedBuyingProcess />
      <OurCertificates />
      {/* <Newsletter /> */}
    </div>
  );
}

export default Home;