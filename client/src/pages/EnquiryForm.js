
// import React, { useState } from "react";

// import { ArrowLeft, MapPin, Mail, Phone } from "lucide-react";
// import { useEnquiry } from "../Context/EnquiryContext";
// import { useCategory } from "../Context/CategoryContext";

// const EnquiryForm = () => {
//   const { category } = useCategory();
//   const { addEnquiry } = useEnquiry();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     company: "",
//     location: "",
//     enquiryType: "Product",
//     product: "",
//     quantity: "",
//     message: "",
//     contactMethod: "Email",
//   });

//   // HANDLE CHANGE
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // SUBMIT
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     addEnquiry(formData);

//     alert("Enquiry Submitted ✅");

//     setFormData({
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       company: "",
//       location: "",
//       enquiryType: "Product",
//       product: "",
//       quantity: "",
//       message: "",
//       contactMethod: "Email",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 md:px-10 lg:px-24 py-8">

//       {/* BACK */}
//       <button className="flex items-center gap-2 text-gray-600 mb-6 hover:text-black">
//         <ArrowLeft size={18} />
//         Back
//       </button>

//       {/* HEADER */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-semibold">Enquiry Details</h1>
//         <p className="text-gray-500 text-sm">
//           Fill the form below and our team will contact you shortly.
//         </p>
//       </div>

//       {/* FORM */}
//       <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-6 md:p-8">

//         {/* PERSONAL DETAILS */}
//         <h2 className="text-sm font-semibold text-gray-700 mb-4">
//           Personal Details
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//           <div>
//             <label className="label">First Name</label>
//             <input name="firstName" value={formData.firstName} onChange={handleChange} className="input" />
//           </div>

//           <div>
//             <label className="label">Last Name</label>
//             <input name="lastName" value={formData.lastName} onChange={handleChange} className="input" />
//           </div>

//           <div>
//             <label className="label">Email Address</label>
//             <input name="email" value={formData.email} onChange={handleChange} className="input" />
//           </div>

//           <div>
//             <label className="label">Phone Number</label>
//             <input name="phone" value={formData.phone} onChange={handleChange} className="input" />
//           </div>

//           <div>
//             <label className="label">Company / Farm Name</label>
//             <input name="company" value={formData.company} onChange={handleChange} className="input" />
//           </div>

//           <div>
//             <label className="label">Location</label>
//             <input name="location" value={formData.location} onChange={handleChange} className="input" />
//           </div>

//         </div>

//         {/* ENQUIRY INFO */}
//         <h2 className="text-sm font-semibold text-gray-700 mt-8 mb-4">
//           Enquiry Information
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//           <div>
//             <label className="label">Enquiry Type</label>
//             <select name="enquiryType" value={formData.enquiryType} onChange={handleChange} className="input">
//               <option>Product</option>
//               <option>Bulk Order</option>
//               <option>Dealer</option>
//             </select>
//           </div>

//           <div>
//             <label className="label">Product Interested</label>
//           <select
//   name="product"
//   value={formData.product}
//   onChange={handleChange}
//   className="input"
// >
//   <option value="">Select Category</option>

//   {categories && categories.length > 0 ? (
//     categories.map((cat, index) => (
//       <option key={index} value={cat}>
//         {cat}
//       </option>
//     ))
//   ) : (
//     <option disabled>No Categories</option>
//   )}
// </select>
//           </div>

//         </div>

//         <div className="mt-5">
//           <label className="label">Quantity</label>
//           <input name="quantity" value={formData.quantity} onChange={handleChange} className="input" />
//         </div>

//         {/* MESSAGE */}
//         <h2 className="text-sm font-semibold text-gray-700 mt-8 mb-3">
//           Message
//         </h2>

//         <textarea
//           name="message"
//           value={formData.message}
//           onChange={handleChange}
//           rows="4"
//           className="input"
//           placeholder="Tell us your requirement..."
//         />

//         {/* CONTACT METHOD */}
//         <h2 className="text-sm font-semibold text-gray-700 mt-8 mb-3">
//           Preferred Contact Method
//         </h2>

//         <div className="flex flex-wrap gap-6 text-sm">

//           <label className="radio">
//             <input type="radio" name="contactMethod" value="Phone" onChange={handleChange} />
//             Phone
//           </label>

//           <label className="radio">
//             <input type="radio" name="contactMethod" value="Email" checked={formData.contactMethod === "Email"} onChange={handleChange} />
//             Email
//           </label>

//           <label className="radio">
//             <input type="radio" name="contactMethod" value="WhatsApp" onChange={handleChange} />
//             WhatsApp
//           </label>

//         </div>

//         {/* BUTTONS */}
//         <div className="flex justify-between items-center mt-8">

//           <button type="reset" className="border px-5 py-2 rounded-md text-sm">
//             Reset
//           </button>

//           <button type="submit" className="bg-green-600 text-white px-8 py-3 rounded-full">
//             Submit Enquiry
//           </button>

//         </div>

//       </form>

//       {/* CONTACT INFO */}
//       <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border rounded-xl p-6 text-center">

//         <div>
//           <MapPin className="mx-auto text-green-600 mb-2" size={22} />
//           <p className="text-sm text-gray-600">Theni, Tamil Nadu</p>
//         </div>

//         <div>
//           <Mail className="mx-auto text-green-600 mb-2" size={22} />
//           <p className="text-sm text-gray-600">sunshineagriteech@gmail.com</p>
//         </div>

//         <div>
//           <Phone className="mx-auto text-green-600 mb-2" size={22} />
//           <p className="text-sm text-gray-600">(91) 84899 43519</p>
//         </div>

//       </div>

//     </div>
//   );
// };

// export default EnquiryForm;

import React, { useState } from "react";
import { ArrowLeft, MapPin, Mail, Phone } from "lucide-react";
import { useEnquiry } from "../Context/EnquiryContext";
import { useCategory } from "../Context/CategoryContext";
const EnquiryForm = () => {
  const { category } = useCategory(); // ✅ FIX
  const { addEnquiry } = useEnquiry();

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addEnquiry(formData);

    alert("Enquiry Submitted ✅");

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

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 lg:px-24 py-8">

      <button className="flex items-center gap-2 text-gray-600 mb-6 hover:text-black">
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Enquiry Details</h1>
        <p className="text-gray-500 text-sm">
          Fill the form below and our team will contact you shortly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-6 md:p-8">

        <h2 className="text-sm font-semibold text-gray-700 mb-4">
          Personal Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="label">First Name</label>
            <input name="firstName" value={formData.firstName} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="label">Last Name</label>
            <input name="lastName" value={formData.lastName} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="label">Email Address</label>
            <input name="email" value={formData.email} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="label">Phone Number</label>
            <input name="phone" value={formData.phone} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="label">Company / Farm Name</label>
            <input name="company" value={formData.company} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="label">Location</label>
            <input name="location" value={formData.location} onChange={handleChange} className="input" />
          </div>

        </div>

        <h2 className="text-sm font-semibold text-gray-700 mt-8 mb-4">
          Enquiry Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="label">Enquiry Type</label>
            <select name="enquiryType" value={formData.enquiryType} onChange={handleChange} className="input">
              <option>Product</option>
              <option>Bulk Order</option>
              <option>Dealer</option>
            </select>
          </div>

          <div>
            <label className="label">Product Interested</label>

            {/* ✅ FIXED DROPDOWN */}
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Category</option>

              {category && category.length > 0 ? (
                category
                  .filter((cat) => cat.showOnWebsite) // optional but correct
                  .map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))
              ) : (
                <option disabled>No Categories</option>
              )}
            </select>

          </div>

        </div>

        <div className="mt-5">
          <label className="label">Quantity</label>
          <input name="quantity" value={formData.quantity} onChange={handleChange} className="input" />
        </div>

        <h2 className="text-sm font-semibold text-gray-700 mt-8 mb-3">
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

        <h2 className="text-sm font-semibold text-gray-700 mt-8 mb-3">
          Preferred Contact Method
        </h2>

        <div className="flex flex-wrap gap-6 text-sm">

          <label className="radio">
            <input type="radio" name="contactMethod" value="Phone" onChange={handleChange} />
            Phone
          </label>

          <label className="radio">
            <input type="radio" name="contactMethod" value="Email" checked={formData.contactMethod === "Email"} onChange={handleChange} />
            Email
          </label>

          <label className="radio">
            <input type="radio" name="contactMethod" value="WhatsApp" onChange={handleChange} />
            WhatsApp
          </label>

        </div>

        <div className="flex justify-between items-center mt-8">

         <button
          type="button"
          onClick={handleReset}
          className="border px-5 py-2 rounded-md text-sm"
        >
          Reset
        </button>

          <button type="submit" className="bg-green-600 text-white px-8 py-3 rounded-full">
            Submit Enquiry
          </button>

        </div>

      </form>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border rounded-xl p-6 text-center">

        <div>
          <MapPin className="mx-auto text-green-600 mb-2" size={22} />
          <p className="text-sm text-gray-600">Theni, Tamil Nadu</p>
        </div>

        <div>
          <Mail className="mx-auto text-green-600 mb-2" size={22} />
          <p className="text-sm text-gray-600">sunshineagriteech@gmail.com</p>
        </div>

        <div>
          <Phone className="mx-auto text-green-600 mb-2" size={22} />
          <p className="text-sm text-gray-600">(91) 84899 43519</p>
        </div>

      </div>

    </div>
  );
};

export default EnquiryForm;