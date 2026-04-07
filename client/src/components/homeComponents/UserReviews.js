import React, { useEffect, useState } from "react";
import api from "../../common/apiClient";
import SummaryApi from "../../common/SummaryApi";
import { ChevronDown, ChevronUp } from "lucide-react";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await api({
        url: SummaryApi.getAllReviews.url,
        method: SummaryApi.getAllReviews.method,
      });
      setReviews(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const visibleReviews = showAll ? reviews : reviews.slice(0, 6);

  if (loading) {
    return <div className="text-center py-10">Loading reviews...</div>;
  }

  return (
    <div className="container  py-10 px-6">

      {/* Header */}
      <h2 className="text-3xl font-semibold mb-8">User Reviews</h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {visibleReviews.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-[#E6E6E6] rounded-xl p-5 hover:shadow-md transition duration-300"
          >
            {/* Profile */}
            <div className="flex items-center gap-3 mb-3">
              
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
                {item.userId?.firstName?.charAt(0)}
              </div>

              <div>
                <h3 className="font-semibold text-[#212121] text-sm">
                  {item.userId?.firstName} {item.userId?.lastName}
                </h3>
                <p className="text-xs text-gray-500">
                  {item.productId?.name}
                </p>
              </div>
            </div>

            {/* Title (bold first line feel) */}
            {/* <p className="font-semibold text-sm mb-1">
              “{item.comment || "Good Product"}”
            </p> */}

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
              {item.comment || "No detailed comment available."}
            </p>
          </div>
        ))}
      </div>

      {/* View More / Show Less */}
      {reviews.length > 6 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 text-[#556B2F] font-medium transition"
          >
            {showAll ? "Show less" : "View more"}
            {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      )}

    </div>
  );
};

export default UserReviews;