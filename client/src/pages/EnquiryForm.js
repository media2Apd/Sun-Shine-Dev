
import React, { useState } from "react";
import { ArrowLeft, MapPin, Mail, Phone } from "lucide-react";
import { useCategory } from "../Context/CategoryContext";
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SelectDropdown from "../customStyles/SelectDropdown";

const EnquiryForm = () => {
  const { category } = useCategory(); // ✅ FIX
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleReset = () => {
  setFormData({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    enquiryType: "Product",
    product: "",
    quantity: "",
    message: "",
    contactMethod: "Email",
  });
};

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    enquiryType: "Product",
    product: "",
    quantity: "",
    message: "",
    contactMethod: "Email",
    status: "New"
  });

  const validate = () => {
    let newErrors = {};

    // First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Email
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    // Phone
    if (!formData.phone) {
      newErrors.phone = "Phone number required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter valid 10-digit number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const response = await api.post(
        SummaryApi.createEnquiry.url,
        formData
      );

      if (response.data.success) {
        setShowSuccess(true); // 🔥 popup trigger
        handleReset();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };
const categoryOptions = category
  ?.filter((cat) => cat.showOnWebsite)
  .map((cat) => ({
    id: cat.name,
    label: cat.name,
  }));

  return (
    <div className="min-h-screen bg-white px-4 md:px-10 lg:px-24 py-8">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-black mb-6 hover:text-black"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="mb-6">
        <h1 className="text-2xl mb-4 lg:text-3xl font-semibold text-balck ">Enquiry Details</h1>
        <p className="text-[#64748B] text-sm lg:text-base">
          Fill the form below and our team will contact you shortly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.08)] border border-[#F1F5F9] p-8">
        <h2 className="text-base lg:text-lg font-semibold text-black mb-4">
          Personal Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="label">First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Ex: John"
              className={`input ${errors.firstName ? "border-red-500" : ""}`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="label">Last Name</label>
            <input name="lastName" placeholder="Ex: Doe" value={formData.lastName} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="label">Email Address</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`input ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="label">Phone Number</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your number"
              className={`input ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="label">Company / Farm Name</label>
            <input name="company" placeholder="Enter your company name" value={formData.company} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="label">Location</label>
            <input name="location" placeholder="Enter your location" value={formData.location} onChange={handleChange} className="input" />
          </div>

        </div>
      </div>
      <div className="bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.08)] border border-[#F1F5F9] p-8">

        <h2 className="text-base lg:text-lg font-semibold text-black mb-4">
          Enquiry Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="label">Enquiry Type</label>
            <SelectDropdown
  options={categoryOptions}
  value={formData.product}
  onChange={(val) =>
    setFormData((prev) => ({
      ...prev,
      product: val,
    }))
  }
  placeholder="Select Category"
  searchable={true}
  parentClassName="w-full "
  ChildClassName="input"
/>
          </div>

          <div>
            <label className="label">Product Interested</label>

            {/* ✅ FIXED DROPDOWN */}
            <SelectDropdown
  options={
    category && category.length > 0
      ? category
          .filter((cat) => cat.showOnWebsite)
          .map((cat) => ({
            id: cat.name,   // value
            label: cat.name // display
          }))
      : []
  }
  value={formData.product}
  onChange={(val) =>
    setFormData((prev) => ({
      ...prev,
      product: val
    }))
  }
  placeholder="Select Category"
  parentClassName="w-full"
  ChildClassName="input"
/>

          </div>

        </div>

        <div className="mt-5">
          <label className="label">Quantity</label>
          <input name="quantity" placeholder="Enter your quantity" value={formData.quantity} onChange={handleChange} className="input" />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.08)] border border-[#F1F5F9] p-8">

        <h2 className="text-base lg:text-lg font-semibold text-black mb-4">
          Message
        </h2>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className="input"
          placeholder="Tell us your requirement..."
        />
      </div>
      <div className="bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.08)] border border-[#F1F5F9] p-8">

        <h2 className="text-base lg:text-lg font-semibold text-black mb-4">
          Preferred Contact Method
        </h2>

      <div className="flex flex-wrap gap-6 text-sm">

        {/* Phone */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="contactMethod"
            value="Phone"
            checked={formData.contactMethod === "Phone"}
            onChange={handleChange}
            className="hidden"
          />
          <span className={`w-4 h-4 flex items-center justify-center rounded-full border 
            ${formData.contactMethod === "Phone" ? "border-[#22C55E]" : "border-gray-400"}`}>
            
            {formData.contactMethod === "Phone" && (
              <span className="w-2.5 h-2.5 bg-[#22C55E] rounded-full"></span>
            )}
          </span>
          Phone
        </label>

        {/* Email */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="contactMethod"
            value="Email"
            checked={formData.contactMethod === "Email"}
            onChange={handleChange}
            className="hidden"
          />
          <span className={`w-4 h-4 flex items-center justify-center rounded-full border 
            ${formData.contactMethod === "Email" ? "border-[#22C55E]" : "border-gray-400"}`}>
            
            {formData.contactMethod === "Email" && (
              <span className="w-2.5 h-2.5 bg-[#22C55E] rounded-full"></span>
            )}
          </span>
          Email
        </label>

        {/* WhatsApp */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="contactMethod"
            value="WhatsApp"
            checked={formData.contactMethod === "WhatsApp"}
            onChange={handleChange}
            className="hidden"
          />
          <span className={`w-4 h-4 flex items-center justify-center rounded-full border 
            ${formData.contactMethod === "WhatsApp" ? "border-[#22C55E]" : "border-gray-400"}`}>
            
            {formData.contactMethod === "WhatsApp" && (
              <span className="w-2.5 h-2.5 bg-[#22C55E] rounded-full"></span>
            )}
          </span>
          WhatsApp
        </label>

      </div>
      </div>

      <div className="flex justify-between items-center mt-8">

      <button
        type="button"
        onClick={handleReset}
        disabled={loading}
        className="px-8 py-2 rounded-full border text-black transition"
      >
        Reset
      </button>

      <button
        type="submit"
        disabled={loading}
        className={`px-8 py-2 rounded-full text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#00B207]"
        }`}
      >
        {loading ? "Submitting..." : "Submit Enquiry"}
      </button>

      </div>

      </form>

    <div className="mt-10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.08)] rounded-lg py-8">
      <div className="flex flex-col md:flex-row items-center justify-between text-center">

        {/* 📍 Address */}
        <div className="flex-1 px-6">
          <MapPin strokeWidth={1} className="mx-auto text-[#00B207] mb-3" size={26} />
          <p className="text-sm text-gray-600 leading-relaxed">
            71/151/1, Door no W2/15/11,<br />
            Mariyaponusami Mill Complex, Annanji Vilakku,<br />
            Unjampatti, Theni Dist - 625 531,<br />
            Tamilnadu.
          </p>
        </div>

        {/* Divider */}
        {/* <div className="hidden md:block h-20 w-px bg-gray-300"></div> */}

        {/* 📧 Email */}
        <div className="flex-1 px-6 mt-6 md:mt-0">
          <Mail strokeWidth={1} className="mx-auto text-[#00B207] mb-3" size={26} />
          <p className="text-sm text-gray-600 break-all">
            sunshineagriteech@gmail.com
          </p>
        </div>

        {/* Divider */}
        {/* <div className="hidden md:block h-20 w-px bg-gray-300"></div> */}

        {/* 📞 Phone */}
        <div className="flex-1 px-6 mt-6 md:mt-0">
          <Phone strokeWidth={1} className="mx-auto text-[#00B207] mb-3" size={26} />
          <p className="text-sm text-gray-600 leading-relaxed">
            (91) 84899 43519 <br />
            (91) 84899 43523
          </p>
        </div>

      </div>
    </div>
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-8 rounded-xl text-center animate-scaleIn">
            <div className="text-green-600 text-5xl mb-3">✔</div>
            <h2 className="text-lg font-semibold">Enquiry Submitted!</h2>
            <p className="text-gray-500 text-sm mt-1">
              Our team will contact you soon.
            </p>

            <button
              onClick={() => setShowSuccess(false)}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnquiryForm;