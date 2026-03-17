

// import React, { useState } from "react";

// import { useSettings } from "../Context/SettingsContext";
// import { User } from "lucide-react";

// const SettingsPage = () => {

//   const {
//     profile,
//     setProfile,
//     address,
//     setAddress,
//     saveProfile,
//     saveAddress
//   } = useSettings();

//   const [isEditingProfile, setIsEditingProfile] = useState(true);
//   const [isEditingAddress, setIsEditingAddress] = useState(true);

//   const handleProfileChange = (e) => {
//     setProfile({
//       ...profile,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleAddressChange = (e) => {
//     setAddress({
//       ...address,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleImageChange = (e) => {

//     const file = e.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         setProfile({
//           ...profile,
//           image: reader.result
//         });
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   const handleProfileSave = () => {
//     if (isEditingProfile) {
//       saveProfile();
//       setIsEditingProfile(false);
//     } else {
//       setIsEditingProfile(true);
//     }
//   };

//   const handleAddressSave = () => {
//     if (isEditingAddress) {
//       saveAddress();
//       setIsEditingAddress(false);
//     } else {
//       setIsEditingAddress(true);
//     }
//   };

//   return (

//     <div className="min-h-screen px-3 md:px-10  lg:px-24 py-10 space-y-10">

//       {/* ACCOUNT SETTINGS */}

//       <div className="bg-white border rounded-xl p-8">

//         <h2 className="text-lg font-semibold mb-6">
//           Account Settings
//         </h2>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

//           {/* PROFILE IMAGE */}

//           <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end">

//             {profile.image ? (
//               <img
//                 src={profile.image}
//                 alt="profile"
//                 className="w-32 h-32 rounded-full object-cover mb-4"
//               />
//             ) : (

//               <div className="w-32 h-32 rounded-full bg-green-500 flex items-center justify-center mb-4">

//                 <User size={50} color="white" />

//               </div>

//             )}

//             {isEditingProfile && (

//               <label className="border border-green-600 text-green-600 px-4 py-2 rounded-full cursor-pointer hover:bg-green-600 hover:text-white transition">

//                 Choose Image

//                 <input
//                   type="file"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />

//               </label>

//             )}

//           </div>


//           {/* PROFILE FORM */}

//           <div className="order-2 lg:order-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">

//             <div>
//               <label className="text-md">
//                 First Name
//               </label>

//               <input
//                 name="firstName"
//                 value={profile.firstName}
//                 onChange={handleProfileChange}
//                 disabled={!isEditingProfile}
//                 className={`w-full border rounded-lg px-4 py-2 mt-1 ${
//                   !isEditingProfile && "bg-gray-100"
//                 }`}
//               />
//             </div>

//             <div>
//               <label className="text-md">
//                 Last Name
//               </label>

//               <input
//                 name="lastName"
//                 value={profile.lastName}
//                 onChange={handleProfileChange}
//                 disabled={!isEditingProfile}
//                 className={`w-full border rounded-lg px-4 py-2 mt-1 ${
//                   !isEditingProfile && "bg-gray-100"
//                 }`}
//               />
//             </div>

//             <div>
//               <label className="text-md">
//                 Email
//               </label>

//               <input
//                 name="email"
//                 value={profile.email}
//                 onChange={handleProfileChange}
//                 disabled={!isEditingProfile}
//                 className={`w-full border rounded-lg px-4 py-2 mt-1 ${
//                   !isEditingProfile && "bg-gray-100"
//                 }`}
//               />
//             </div>

//             <div>
//               <label className="text-md">
//                 Phone Number
//               </label>

//               <input
//                 name="phone"
//                 value={profile.phone}
//                 onChange={handleProfileChange}
//                 disabled={!isEditingProfile}
//                 className={`w-full border rounded-lg px-4 py-2 mt-1 ${
//                   !isEditingProfile && "bg-gray-100"
//                 }`}
//               />
//             </div>

//             <div className="md:col-span-2">

//               <button
//                 onClick={handleProfileSave}
//                 className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
//               >
//                 {isEditingProfile ? "Save Changes" : "Edit"}
//               </button>

//             </div>

//           </div>

//         </div>

//       </div>


//       {/* BILLING ADDRESS */}

//       <div className="bg-white border rounded-xl p-8">

//         <h2 className="text-lg font-semibold mb-6">
//           Billing Address
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//           <div>
//             <label className="text-md">
//               First Name
//             </label>

//             <input
//               name="firstName"
//               value={address.firstName}
//               onChange={handleAddressChange}
//               disabled={!isEditingAddress}
//               className={`w-full border rounded-lg px-4 py-2 mt-1 ${
//                 !isEditingAddress && "bg-gray-100"
//               }`}
//             />
//           </div>

//           <div>
//             <label className="text-md">
//               Last Name
//             </label>

//             <input
//               name="lastName"
//               value={address.lastName}
//               onChange={handleAddressChange}
//               disabled={!isEditingAddress}
//               className={`w-full border rounded-lg px-4 py-2 mt-1 ${
//                 !isEditingAddress && "bg-gray-100"
//               }`}
//             />
//           </div>

//           <div>
//             <label className="text-md">
//               Company Name
//             </label>

//             <input
//               name="company"
//               value={address.company}
//               onChange={handleAddressChange}
//               disabled={!isEditingAddress}
//               className={`w-full border rounded-lg px-4 py-2 mt-1 ${
//                 !isEditingAddress && "bg-gray-100"
//               }`}
//             />
//           </div>

//           <div className="md:col-span-3">
//             <label className="text-md">
//               Street Address
//             </label>

//             <input
//               name="street"
//               value={address.street}
//               onChange={handleAddressChange}
//               disabled={!isEditingAddress}
//               className={`w-full border rounded-lg px-4 py-2 mt-1 ${
//                 !isEditingAddress && "bg-gray-100"
//               }`}
//             />
//           </div>

//           <div>
//             <label className="text-md">
//               Country
//             </label>

//             <input
//               name="country"
//               value={address.country}
//               onChange={handleAddressChange}
//               disabled={!isEditingAddress}
//               className={`w-full border rounded-lg px-4 py-2 mt-1 ${
//                 !isEditingAddress && "bg-gray-100"
//               }`}
//             />
//           </div>

//           <div>
//             <label className="text-md">
//               State
//             </label>

//             <input
//               name="state"
//               value={address.state}
//               onChange={handleAddressChange}
//               disabled={!isEditingAddress}
//               className={`w-full border rounded-lg px-4 py-2 mt-1 ${
//                 !isEditingAddress && "bg-gray-100"
//               }`}
//             />
//           </div>

//           <div>
//             <label className="text-md">
//               Zip Code
//             </label>

//             <input
//               name="zip"
//               value={address.zip}
//               onChange={handleAddressChange}
//               disabled={!isEditingAddress}
//               className={`w-full border rounded-lg px-4 py-2 mt-1 ${
//                 !isEditingAddress && "bg-gray-100"
//               }`}
//             />
//           </div>

//         </div>

//         <button
//           onClick={handleAddressSave}
//           className="mt-6 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
//         >
//           {isEditingAddress ? "Save Changes" : "Edit"}
//         </button>

//       </div>

//     </div>
//   );
// };

// export default SettingsPage;

import React, { useState } from "react";
import { useSettings } from "../Context/SettingsContext";
import { User } from "lucide-react";

const SettingsPage = () => {
  const {
    profile,
    setProfile,
    address,
    setAddress,
    saveProfile,
    saveAddress
  } = useSettings();

  const [isEditingProfile, setIsEditingProfile] = useState(true);
  const [isEditingAddress, setIsEditingAddress] = useState(true);

  // ✅ Profile ID already handled in your context if needed
  // const [profileId] = useState(() => {
  //   let id = localStorage.getItem("profileId");
  //   if (!id) {
  //     id = Date.now().toString();
  //     localStorage.setItem("profileId", id);
  //   }
  //   return id;
  // });

  // ✅ Generate unique ID for Billing Address
  // const [addressId] = useState(() => {
  //   let id = localStorage.getItem("addressId");
  //   if (!id) {
  //     id = Date.now().toString();
  //     localStorage.setItem("addressId", id);
  //   }
  //   return id;
  // });

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({
          ...profile,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleProfileSave = () => {
  //   if (isEditingProfile) {
  //     const profileWithId = { ...profile, id: profileId };
  //     setProfile(profileWithId);
  //     localStorage.setItem("profile", JSON.stringify(profileWithId));
  //     saveProfile();
  //     setIsEditingProfile(false);
  //   } else {
  //     setIsEditingProfile(true);
  //   }
  // };

  // const handleAddressSave = () => {
  //   if (isEditingAddress) {
  //     const addressWithId = { ...address, id: addressId };
  //     setAddress(addressWithId);
  //     localStorage.setItem("address", JSON.stringify(addressWithId));
  //     saveAddress();
  //     setIsEditingAddress(false);
  //   } else {
  //     setIsEditingAddress(true);
  //   }
  // };
const handleProfileSave = () => {
  saveProfile(); // profile.id already exists in context
  setIsEditingProfile(false);
};

const handleAddressSave = () => {
  saveAddress(); // address.id already exists in context
  setIsEditingAddress(false);
};
  return (
    <div className="min-h-screen px-3 md:px-10 lg:px-24 py-10 space-y-10">

      {/* ACCOUNT SETTINGS */}
      <div className="bg-white border rounded-xl p-8">
        <h2 className="text-lg font-semibold mb-6">Account Settings</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* PROFILE IMAGE */}
          <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end">
            {profile.image ? (
              <img
                src={profile.image}
                alt="profile"
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-green-500 flex items-center justify-center mb-4">
                <User size={50} color="white" />
              </div>
            )}

            {isEditingProfile && (
              <label className="border border-green-600 text-green-600 px-4 py-2 rounded-full cursor-pointer hover:bg-green-600 hover:text-white transition">
                Choose Image
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* PROFILE FORM */}
          <div className="order-2 lg:order-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-md">First Name</label>
              <input
                name="firstName"
                value={profile.firstName}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
                className={`w-full border rounded-lg px-4 py-2 mt-1 ${!isEditingProfile && "bg-gray-100"}`}
              />
            </div>

            <div>
              <label className="text-md">Last Name</label>
              <input
                name="lastName"
                value={profile.lastName}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
                className={`w-full border rounded-lg px-4 py-2 mt-1 ${!isEditingProfile && "bg-gray-100"}`}
              />
            </div>

            <div>
              <label className="text-md">Email</label>
              <input
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
                className={`w-full border rounded-lg px-4 py-2 mt-1 ${!isEditingProfile && "bg-gray-100"}`}
              />
            </div>

            <div>
              <label className="text-md">Phone Number</label>
              <input
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
                className={`w-full border rounded-lg px-4 py-2 mt-1 ${!isEditingProfile && "bg-gray-100"}`}
              />
            </div>

            <div className="md:col-span-2">
              <button
                onClick={handleProfileSave}
                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
              >
                {isEditingProfile ? "Save Changes" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BILLING ADDRESS */}
      <div className="bg-white border rounded-xl p-8">
        <h2 className="text-lg font-semibold mb-6">Billing Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div>
            <label className="text-md">First Name</label>
            <input
              name="firstName"
              value={address.firstName}
              onChange={handleAddressChange}
              disabled={!isEditingAddress}
              className={`w-full border rounded-lg px-4 py-2 mt-1 ${!isEditingAddress && "bg-gray-100"}`}
            />
          </div>

          <div>
            <label className="text-md">Last Name</label>
            <input
              name="lastName"
              value={address.lastName}
              onChange={handleAddressChange}
              disabled={!isEditingAddress}
              className={`w-full border rounded-lg px-4 py-2 mt-1 ${!isEditingAddress && "bg-gray-100"}`}
            />
          </div>

          <div>
            <label className="text-md">Company Name</label>
            <input
              name="company"
              value={address.company}
              onChange={handleAddressChange}
              disabled={!isEditingAddress}
              className={`w-full border rounded-lg px-4 py-2 mt-1 ${!isEditingAddress && "bg-gray-100"}`}
            />
          </div>

          <div className="md:col-span-3">
            <label className="text-md">Street Address</label>
            <input
              name="street"
              value={address.street}
              onChange={handleAddressChange}
              disabled={!isEditingAddress}
              className={`w-full border rounded-lg px-4 py-2 mt-1 ${!isEditingAddress && "bg-gray-100"}`}
            />
          </div>

          {/* ✅ New fields for Email and Phone */}
          <div>
            <label className="text-md">Email</label>
            <input
              name="email"
              value={address.email || ""}
              onChange={handleAddressChange}
              disabled={!isEditingAddress}
              className={`w-full border rounded-lg px-4 py-2 mt-1 ${!isEditingAddress && "bg-gray-100"}`}
            />
          </div>

          <div>
            <label className="text-md">Phone</label>
            <input
              name="phone"
              value={address.phone || ""}
              onChange={handleAddressChange}
              disabled={!isEditingAddress}
              className={`w-full border rounded-lg px-4 py-2 mt-1 ${!isEditingAddress && "bg-gray-100"}`}
            />
          </div>

          <div>
            <label className="text-md">Country</label>
            <input
              name="country"
              value={address.country}
              onChange={handleAddressChange}
              disabled={!isEditingAddress}
              className={`w-full border rounded-lg px-4 py-2 mt-1 ${!isEditingAddress && "bg-gray-100"}`}
            />
          </div>

          <div>
            <label className="text-md">State</label>
            <input
              name="state"
              value={address.state}
              onChange={handleAddressChange}
              disabled={!isEditingAddress}
              className={`w-full border rounded-lg px-4 py-2 mt-1 ${!isEditingAddress && "bg-gray-100"}`}
            />
          </div>

          <div>
            <label className="text-md">Zip Code</label>
            <input
              name="zip"
              value={address.zip}
              onChange={handleAddressChange}
              disabled={!isEditingAddress}
              className={`w-full border rounded-lg px-4 py-2 mt-1 ${!isEditingAddress && "bg-gray-100"}`}
            />
          </div>

        </div>

        <button
          onClick={handleAddressSave}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
        >
          {isEditingAddress ? "Save Changes" : "Edit"}
        </button>
      </div>

    </div>
  );
};

export default SettingsPage;