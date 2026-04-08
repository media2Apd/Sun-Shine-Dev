import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import { formatDateTime } from "../helpers/formatDateTime";
import ConfirmModal from "../panelComponents/ConfirmModal";
import { GoStarFill } from "react-icons/go";
import { X } from "lucide-react";
import { IoCameraOutline } from "react-icons/io5";
import toast from "react-hot-toast";
export default function OrderDetails() {
  const location = useLocation();
  const id = location.state?.orderId;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const navigate = useNavigate();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const fetchOrder = useCallback(async () => {
    try {
      const res = await api({
        url: SummaryApi.getOrderById.url(id),
        method: SummaryApi.getOrderById.method,
      });

      setOrder(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchOrder();
  }, [fetchOrder, id]);

  const handleAddReview = (item) => {
    resetReviewForm(); // 🔥 important
    setSelectedItem(item);
    setShowReviewModal(true);
  };

  const handleEditReview = (item) => {
    resetReviewForm(); // 🔥 add this

    setSelectedItem(item);
    setRating(item.review?.rating || 0);
    setComment(item.review?.comment || "");

    const existingImages = (item.review?.images || []).map((img) => ({
      url: img.url,
      isOld: true,
    }));

    setImages(existingImages);
    setShowReviewModal(true);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > 2) {
      alert("Only 2 images allowed");
      return;
    }

    const preview = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      isOld: false,
    }));

    setImages((prev) => [...prev, ...preview]);
  };

  const resetReviewForm = () => {
    setSelectedItem(null);
    setRating(0);
    setComment("");
    setImages([]);
  };

  const removeImage = (index) => {
    const img = images[index];

    if (!img.isOld) {
      URL.revokeObjectURL(img.url);
    }

    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (showReviewModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showReviewModal]);
  const handleSubmitReview = async () => {
    if (!rating) {
      alert("Please select rating");
      return;
    }

    try {
      setReviewLoading(true);

      const formData = new FormData();
      formData.append("productId", selectedItem.productId._id);
      formData.append("orderId", order._id);
      formData.append("rating", rating);
      formData.append("comment", comment);

      // 🖼️ separate old & new images
      const oldImages = images
        .filter((img) => img.isOld)
        .map((img) => img.url);

      const newImages = images.filter((img) => !img.isOld);

      formData.append("oldImages", JSON.stringify(oldImages));

      newImages.forEach((img) => {
        formData.append("images", img.file);
      });

      const res = await api({
        url: SummaryApi.addReview.url,
        method: SummaryApi.addReview.method,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Review saved successfully");
        setShowReviewModal(false);

        setOrder((prev) => ({
          ...prev,
          items: prev.items.map((item) =>
            item.productId._id === selectedItem.productId._id
              ? {
                ...item,
                isReviewed: true,
                review: {
                  rating,
                  comment,
                  images: res.data.data.images,
                },
              }
              : item
          ),
        }));

        resetReviewForm(); // ✅ already good
      }

    } catch (err) {
      console.log(err);
    } finally {
      setReviewLoading(false);
    }
  };

  const items = order?.items || [];
  const billingAddress = order?.billingAddress || {};
  const shippingAddress = order?.shippingAddress || {};
  const paymentMethod = order?.paymentMethod || "";
  const orderId = order?.orderId || "";
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = order?.total || subtotal;

  const stepMap = {
    Placed: 0,
    Packaged: 1,
    Shipped: 2,
    Delivered: 3,
  };

  const steps = [
    "Order received",
    "Packaged",
    "On the way",
    "Delivered",
  ];
  const currentStep = stepMap[order?.status] ?? 0;
  const cancelStep = currentStep;
  const canCancel = ["Placed", "Packaged"].includes(order?.status);

  const handleCancelOrder = async () => {
    try {
      const res = await api({
        url: SummaryApi.cancelOrder.url(order._id),
        method: SummaryApi.cancelOrder.method,
      });

      if (res.data.success) {
        setOrder((prev) => ({
          ...prev,
          status: "Cancelled",
        }));
        await fetchOrder();
      }

    } catch (err) {
      console.log(err);
    } finally {
      setShowCancelModal(false); // 🔥 close modal
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!order) {
    return <div className="p-6 text-red-500">Order not found</div>;
  }

  return (
    <div className="container mx-auto bg-white min-h-screen px-8 py-10">
      <div className="container mx-auto border border-[#E5E5E5] bg-white rounded-xl">

        {/* HEADER */}
        <div className="px-4 py-2 border-b border-[#E5E5E5] flex flex-col md:flex-row md:items-center md:justify-between gap-2">

          {/* LEFT SIDE */}
          <div className="text-sm py-2.5 px-4 text-[#4D4D4D] pb-3 flex items-center gap-2 flex-wrap">

            <span className="font-semibold text-black">
              Order Details
            </span>

            <span className="text-[#4D4D4D]">•</span>

            <span>
              {formatDateTime(order.createdAt, false)}
            </span>

            <span className="text-[#4D4D4D]">•</span>

            <span>
              {items.length} Products
            </span>

          </div>

          {/* RIGHT SIDE */}
          <div className="text-left md:text-right flex gap-3 justify-end">

            {/* Cancel Button */}
            {canCancel && (
              <button
                onClick={() => setShowCancelModal(true)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-md"
              >
                Cancel Order
              </button>
            )}

            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="text-[#00B207] text-sm font-semibold"
            >
              Back to List
            </button>

          </div>

        </div>


        {/* Cards */}
        {/* TOP GRID */}
        <div className="md:m-6 grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* LEFT (BILLING + SHIPPING COMBINED) */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 border rounded-lg divide-y md:divide-y-0 md:divide-x">
            {/* BILLING */}
            <div className="p-5">
              <div className="border-b mb-2">
                <h3 className="text-xs text-[#999999] mb-3 tracking-wide">
                  BILLING ADDRESS
                </h3>
              </div>

              <p className="font-medium text-black">
                {billingAddress.firstName} {billingAddress.lastName}
              </p>

              <p className="text-sm text-[#666666] mt-1">
                {billingAddress.street}, {billingAddress.city}, {billingAddress.state} - {billingAddress.zip}
              </p>

              <div className="mt-4 text-sm">
                <p className="text-[#999999] text-xs">EMAIL</p>
                <p>{billingAddress.email}</p>
              </div>

              <div className="mt-3 text-sm">
                <p className="text-[#999999] text-xs">PHONE</p>
                <p>{billingAddress.phone}</p>
              </div>
            </div>


            {/* SHIPPING */}
            <div className="p-5">
              <div className="border-b mb-2">

                <h3 className="text-xs text-gray-400 mb-3 tracking-wide">
                  SHIPPING ADDRESS
                </h3>
              </div>
              <p className="font-medium text-black">
                {shippingAddress.firstName} {shippingAddress.lastName}
              </p>

              <p className="text-sm text-[#666666] mt-1">
                {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.zip}
              </p>

              <div className="mt-4 text-sm">
                <p className="text-[#999999] text-xs">EMAIL</p>
                <p>{shippingAddress.email}</p>
              </div>

              <div className="mt-3 text-sm">
                <p className="text-[#999999] text-xs">PHONE</p>
                <p>{shippingAddress.phone}</p>
              </div>
            </div>

          </div>

          {/* RIGHT (SUMMARY) */}
          <div className="border rounded-lg p-5 space-y-3 border-[#E5E5E5]">

            <div className="flex justify-between text-sm">
              <span className="text-[#999999] font-medium">ORDER ID:</span>
              <span className="font-medium text-black">{orderId}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-[#999999]">PAYMENT METHOD:</span>
              <span className="font-medium text-black">{paymentMethod}</span>
            </div>

            <div className="border-t border-[#E6E6E6] pt-3 space-y-2 text-sm">

              <div className="flex justify-between">
                <span className="text-[#666666]">Subtotal</span>
                <span>₹{total}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#666666]">Discount</span>
                <span>0%</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#666666]">Shipping</span>
                <span>Free</span>
              </div>

              <div className="flex justify-between font-semibold text-[#1A1A1A] pt-2">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

            </div>
          </div>

        </div>

        {/* Stepper */}
        <div className="overflow-x-auto mb-6 p-6">
          <div className="min-w-[500px] flex justify-between relative">

            {/* BASE LINE */}
            {/* BASE LINE */}
            <div className="absolute top-4 left-1 right-0 mx-6 h-[6px] bg-gray-200"></div>

            {/* PROGRESS LINE */}
            {order.status !== "Cancelled" && (
              <div
                className="absolute top-4 h-[6px] mx-6 bg-[#00B207] transition-all"
                style={{
                  left: "16px",
                  right: `${(steps.length - 1 - currentStep) * (100 / (steps.length - 1))}%`,
                }}
              ></div>
            )}

            {/* ❌ CANCEL LINE */}
            {order.status === "Cancelled" && (
              <div
                className="absolute top-4 h-[6px] mx-6 bg-red-500"
                style={{
                  left: "16px",
                  right: `${(steps.length - 1 - cancelStep) * (100 / (steps.length - 1))}%`,
                }}
              ></div>
            )}

            {steps.map((label, index) => {
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;

              return (
                <div key={index} className="flex flex-col items-center relative z-10">

                  {/* 🔘 STEP CIRCLE */}
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-xs border-2 transition-all

                  ${order.status === "Cancelled"
                        ? index < cancelStep
                          ? "bg-[#00B207] text-white bg-[#00B207]" // completed
                          : index === cancelStep
                            ? "bg-red-500 text-white border-red-500" // cancelled point
                            : "border-gray-300 text-gray-400 bg-white" // future steps
                        : isCompleted
                          ? "bg-[#00B207] text-white bg-[#00B207]"
                          : isCurrent
                            ? "bg-[#00B207] text-white bg-[#00B207]"
                            : "bg-[#00B207] text-green-600 bg-white border-dashed"
                      }
                  `}
                  >
                    {(order.status === "Cancelled"
                      ? index < cancelStep
                      : index <= currentStep)
                      ? "✓"
                      : (index + 1).toString().padStart(2, "0")}
                  </div>

                  {/* 📝 LABEL */}
                  <p
                    className={`text-xs mt-2 text-center

                    ${order.status === "Cancelled"
                        ? index < cancelStep
                          ? "text-green-600 font-medium"
                          : index === cancelStep
                            ? "text-red-500 font-semibold"
                            : "text-gray-400"
                        : index <= currentStep
                          ? "text-green-600 font-medium"
                          : "text-gray-400"
                      }
                  `}
                  >
                    {label}
                  </p>

                </div>
              );
            })}

          </div>

          {/* ❌ CANCEL TEXT */}
          {order.status === "Cancelled" && (
            <p className="text-center text-sm text-red-500 mt-4 font-medium">
              Order Cancelled at "{steps[cancelStep]}"
            </p>
          )}
        </div>

        {/* Table */}
        <div className="">
          <div className="overflow-x-auto rounded-b-lg">

            <table className="w-full min-w-[600px] text-sm">

              {/* HEADER */}
              <thead className="bg-[#F2F2F2] text-gray-500 text-xs uppercase">
                <tr>
                  <th className="py-3 px-4 text-left">Product</th>
                  <th className="px-4 text-center">Price</th>
                  <th className="px-4 text-center">Quantity</th>
                  <th className="px-4 text-right">Subtotal</th>
                  <th className="px-4 text-center">Review</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {items.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >

                    {/* PRODUCT */}
                    <td className="py-4 px-4 flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12" />
                      <span>{item.name}</span>
                    </td>

                    {/* PRICE */}
                    <td className="px-4 text-center">
                      ₹{item.price}
                    </td>

                    {/* QTY */}
                    <td className="px-4 text-center">
                      x{item.quantity}
                    </td>

                    {/* SUBTOTAL */}
                    <td className="px-4 text-right">
                      ₹{item.price * item.quantity}
                    </td>

                    {/* 🔥 ADD THIS HERE */}
                    <td className="px-4 text-center">
                      {order.status === "Delivered" && (
                        item.isReviewed ? (
                          <button
                            onClick={() => handleEditReview(item)}
                            className="text-blue-600 text-xs"
                          >
                            Edit Review
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddReview(item)}
                            className="text-green-600 text-xs"
                          >
                            Add Review
                          </button>
                        )
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/40 z-50 overflow-y-auto">

          <div className="min-h-screen flex items-center justify-center px-3 py-6">

            <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-5 sm:p-6 max-h-[90vh] overflow-y-auto">

              {/* HEADER */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-green-600">
                    Write a Review
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Share your experience with the AgriGrowth community.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setShowReviewModal(false);
                    resetReviewForm();
                  }}
                  className="text-gray-400 hover:text-black text-lg"
                >
                  <X />
                </button>
              </div>

              {/* ⭐ RATING */}
              <div className="mt-5">
                <p className="text-sm font-medium mb-2">Overall Rating</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setRating(star)}
                      className={`cursor-pointer text-3xl ${star <= rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                    >
                      <GoStarFill />
                    </span>
                  ))}
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Review Description</p>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What did you like or dislike about the product/service?"
                  className="w-full border rounded-md px-3 py-2 text-sm h-24 resize-none focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>

              {/* IMAGE UPLOAD */}
              <div className="mt-5">
                <p className="text-sm font-medium mb-2">Add Photos</p>

                <div className="border-2 border-dashed rounded-xl p-6 text-center hover:bg-gray-50 transition">

                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="upload"
                  />

                  <label htmlFor="upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-gray-400 text-2xl"><IoCameraOutline /></div>
                      <p className="text-sm">
                        <span className="text-green-600 font-medium">
                          Click to upload
                        </span>
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG or WEBP (MAX. 1MB)
                      </p>
                    </div>
                  </label>

                </div>

                {/* PREVIEW */}
                <div className="flex gap-3 mt-4 flex-wrap">
                  {images.map((img, i) => (
                    <div key={i} className="relative">
                      <img
                        src={img.url}
                        alt="img"
                        className="w-16 h-16 rounded-md object-cover border"
                      />
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full"
                      >
                        <X size />
                      </button>
                    </div>
                  ))}

                  {/* Empty slot (like UI) */}
                  {images.length < 2 && (
                    <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center text-gray-400">

                    </div>
                  )}
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end items-center gap-5 mt-6">
                <button
                  onClick={() => {
                    setShowReviewModal(false);
                    resetReviewForm();
                  }}
                  className="text-base text-[#00B207] font-semibold"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmitReview}
                  disabled={reviewLoading || rating === 0}
                  className="bg-[#00B207] text-white text-sm px-6 py-2 rounded-full disabled:opacity-50"
                >
                  {reviewLoading ? "Submitting..." : "Submit Review"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
      <ConfirmModal
        open={showCancelModal}
        title="Cancel Order"
        message="Are you sure you want to cancel this order?"
        confirmText="Yes, Cancel"
        cancelText="No"
        onConfirm={handleCancelOrder}
        onCancel={() => setShowCancelModal(false)}
      />
    </div>
  );
}

