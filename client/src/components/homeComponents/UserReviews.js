import React from "react";

const reviews = [
  {
    id: 1,
    name: "Ramesh Kumar",
    role: "Vegetable Farmer",
    review:
      "Very good results in crop growth. I used Sunshine Agritech water soluble fertilizer for my vegetable crops. The growth was faster and leaves looked healthier within a few days.",
  },
  {
    id: 2,
    name: "Suresh Patil",
    role: "Progressive Farmer",
    review:
      "Trusted products for regular use. I regularly buy micronutrients and bio fertilizers from Sunshine Agritech. The products are genuine and give consistent results.",
  },
  {
    id: 3,
    name: "Mahesh Reddy",
    role: "Horticulture Farmer",
    review:
      "Good yield and healthy crops. After using their plant growth promoters, flowering and fruit setting improved a lot.",
  },
  {
    id: 4,
    name: "Anand Singh",
    role: "Organic Farmer",
    review:
      "Eco-friendly and effective. I prefer bio pesticides because they are safe and effective without damaging soil.",
  },
  {
    id: 5,
    name: "Prakash Naik",
    role: "Farmer",
    review:
      "Quick delivery and good support. The support team helped me choose the right product for my crop.",
  },
  {
    id: 6,
    name: "Venkatesh Rao",
    role: "Agriculture Grower",
    review:
      "Quality products at reasonable price. The organic manure improved soil condition and crop health.",
  },
];

const UserReviews = () => {
  return (
    <div className="bg-white-100 px-5 py-3">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-semibold">User Reviews</h2>
        <button className="text-green-700 font-medium hover:underline">
          View all
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"> 
        {reviews.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition duration-300"
          >
            {/* Profile Section */}
            <div className="flex items-center gap-4 mb-4">
              
              {/* Default User Icon */}
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
                  />
                </svg>
              </div>

              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </div>

            {/* Review Text */}
            <p className="text-sm text-gray-600 leading-relaxed">
              "{item.review}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;