import React from "react";

import img1 from "../assets/gallery1.png";
import img2 from "../assets/gallery2.png";
import img3 from "../assets/gallery3.png";
import img4 from "../assets/gallery4.png";
import img5 from "../assets/gallery5.png";
import img6 from "../assets/gallery6.png";
import img7 from "../assets/gallery7.png";
import img8 from "../assets/gallery8.png";

const Card = ({ image, title, desc }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition">

      <img
        src={image}
        alt={title}
        className="w-full h-cover object-cover"
      />

      <div className="p-4 mb-8">
        <h3 className="font-semibold text-gray-800">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mt-3">
          {desc}
        </p>
      </div>

    </div>
  );
};

const Section = ({ title, subtitle, children }) => {
  return (
    <div className="mb-16">

      <div className="text-center mb-8">
        <h1 className="text-xl font-semibold text-gray-800">
          {title}
        </h1>

        <p className=" text-sm">
          {subtitle}
        </p>
      </div>

      {children}

    </div>
  );
};

const GalleryPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen px-5 md:px-10 lg:px-20 py-3">

      {/* INDUSTRY */}
      <Section
        title="Our Industry"
        subtitle="Manufacturing, packaging, quality & infrastructure"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <Card
            image={img1}
            title="Product Packaging & Quality Control"
            desc="Careful packaging, sealing and quality checks."
          />

          <Card
            image={img2}
            title="Production & Storage Facility"
            desc="Well equipped facility ensuring product safety."
          />

        </div>
      </Section>


      {/* WORKERS */}
      <Section
        title="Our Workers"
        subtitle="People behind the brand"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <Card
            image={img3}
            title="Field Support Team"
            desc="Dedicated team assisting farmers with crop nutrition guidance."
          />

          <Card
            image={img4}
            title="Warehouse & Operations Staff"
            desc="Ensuring smooth inventory management and dispatch."
          />

        </div>
      </Section>


      {/* FIELD WORK */}
      <Section
        title="Field Work"
        subtitle="On-ground application & real usage"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <Card
            image={img5}
            title="Product Application in Crops"
            desc="Farmers applying crop solutions across fields."
          />

          <Card
            image={img6}
            title="Soil Preparation & Treatment"
            desc="Improving soil fertility using bio solutions."
          />

        </div>
      </Section>


      {/* CROP RESULTS */}
      <Section
        title="Crop Results"
        subtitle="Outcomes & proof"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <Card
            image={img7}
            title="Healthy Crop Growth Result"
            desc="Visible improvement in crop health after usage."
          />

          <Card
            image={img8}
            title="High Yield Harvest"
            desc="Better yield achieved through balanced nutrition."
          />

        </div>
      </Section>

    </div>
  );
};

export default GalleryPage;