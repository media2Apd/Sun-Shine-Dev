import React, { useEffect, useState, useCallback } from "react";
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";

const SettingsPage = () => {

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    image: ""
  });

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    company: "",
    street: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    zip: ""
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [originalProfile, setOriginalProfile] = useState({});
  const [originalAddress, setOriginalAddress] = useState({});
  const [profileErrors, setProfileErrors] = useState({});
  const [addressErrors, setAddressErrors] = useState({});
  // ✅ useCallback fix (no warning)
  const fetchProfile = useCallback(async () => {
    try {
      const res = await api({
        url: SummaryApi.getProfile.url,
        method: SummaryApi.getProfile.method,
      });

      if (res.data.success) {
        setProfile(res.data.data || {});
        setOriginalProfile(res.data.data || {});
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchAddress = useCallback(async () => {
    try {
      const res = await api({
        url: SummaryApi.viewAddresses.url,
        method: SummaryApi.viewAddresses.method,
      });

      const list = res.data; // 🔥 THIS IS YOUR FIX

      if (Array.isArray(list) && list.length > 0) {

        const data =
          list.find(a => a.isDefault) ||
          list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];


        setAddress(prev => ({
          ...prev,
          ...data
        }));

        setOriginalAddress(prev => ({
          ...prev,
          ...data
        }));
      }

    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
    fetchAddress();
  }, [fetchProfile, fetchAddress]); // ✅ warning gone

  // ================= SAVE =================

const validateProfile = () => {
  let errors = {};

  if (!profile.firstName?.trim()) {
    errors.firstName = "First name is required";
  }

  if (!profile.lastName?.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!profile.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
    errors.email = "Invalid email";
  }

  if (!profile.phone?.trim()) {
    errors.phone = "Phone is required";
  } else if (!/^[6-9]\d{9}$/.test(profile.phone)) {
    errors.phone = "Invalid phone number";
  }

  setProfileErrors(errors);

  return Object.keys(errors).length === 0;
};

  const saveProfile = async () => {
      // 🔥 VALIDATION CHECK
    if (!validateProfile()) return;
    try {
      const formData = new FormData();

      formData.append("firstName", profile.firstName);
      formData.append("lastName", profile.lastName);
      formData.append("email", profile.email);
      formData.append("phone", profile.phone);

      if (profile.image instanceof File) {
        formData.append("image", profile.image); // ✅ file
      }

      const res = await api({
        url: SummaryApi.updateProfile.url,
        method: SummaryApi.updateProfile.method,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Profile updated");
        setIsEditingProfile(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

const validateAddress = () => {
  let errors = {};

  if (!address.firstName?.trim()) {
    errors.firstName = "First name is required";
  }

  if (!address.lastName?.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!address.street?.trim()) {
    errors.street = "Street is required";
  }

  if (!address.country?.trim()) {
    errors.country = "Country is required";
  }

  if (!address.state?.trim()) {
    errors.state = "State is required";
  }

  if (!address.zip?.trim()) {
    errors.zip = "Zip code is required";
  } else if (!/^\d{6}$/.test(address.zip)) {
    errors.zip = "Invalid zip code";
  }

  if (!address.email?.trim()) {
    errors.email = "Email is required";
  }

  if (!address.phone?.trim()) {
    errors.phone = "Phone is required";
  } else if (!/^[6-9]\d{9}$/.test(address.phone)) {
    errors.phone = "Invalid phone number";
  }

  setAddressErrors(errors);

  return Object.keys(errors).length === 0;
};

  const saveAddress = async () => {
      // 🔥 VALIDATION
    if (!validateAddress()) return;
    try {

      const isUpdate = address._id;

      const res = await api({
        url: isUpdate 
          ? SummaryApi.updateAddress.url(address._id) // 🔥 FIX
          : SummaryApi.createAddress.url,
        method: isUpdate ? "put" : "post",
        data: address,
      });

      if (res.data.success) {

        const updated = res.data || address;

        setAddress({ ...updated });
        setOriginalAddress({ ...updated });

        setIsEditingAddress(false);

        toast.success("Address saved");
      }

          } catch (err) {
            console.log(err);
          }
        };

  // ================= HANDLERS =================

  const handleProfileChange = (e) => {
    setProfile(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleAddressChange = (e) => {
  const { name, value } = e.target;

  setAddress(prev => ({
    ...prev,
    [name]: value,
  }));

  // 🔥 remove error while typing
  setAddressErrors(prev => ({
    ...prev,
    [name]: "",
  }));
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(prev => ({
        ...prev,
        image: file   // ✅ file object only
      }));
    }
  };
  const handleCancelProfile = () => {
    setProfile(originalProfile); // 🔥 restore
    setIsEditingProfile(false);
  };

  const handleCancelAddress = () => {
    setAddress(originalAddress); // 🔥 restore
    setIsEditingAddress(false);
  };
  return (
    <div className="min-h-screen px-3 md:px-10 lg:px-24 py-10 space-y-10">

      {/* PROFILE */}
      <div className="bg-white border rounded-xl p-8">
        <h2 className="text-lg font-semibold mb-6">Account Settings</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* LEFT SIDE FORM */}
          <div className="order-2 lg:order-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* FIRST NAME */}
          <div>
            <label className="text-sm text-gray-600">First name</label>
            <input
              name="firstName"
              value={profile.firstName || ""}
              onChange={handleProfileChange}
              disabled={!isEditingProfile}
              className={`w-full border rounded-lg px-4 py-2 mt-1 ${
                profileErrors.firstName
                  ? "border-red-500"
                  : "border-gray-300"
              } ${!isEditingProfile ? "bg-gray-100" : ""}`}
            />
            {profileErrors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {profileErrors.firstName}
              </p>
            )}
          </div>

            {/* LAST NAME */}
            <div>
              <label className="text-sm text-gray-600">Last Name</label>
              <input
                name="lastName"
                value={profile.lastName || ""}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
                className={`w-full border rounded-lg px-4 py-2 mt-1 ${
                  !isEditingProfile ? "bg-gray-100" : ""
                }`}
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                name="email"
                value={profile.email || ""}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
                className={`w-full border rounded-lg px-4 py-2 mt-1 ${
                  profileErrors.email ? "border-red-500" : "border-gray-300"
                } ${!isEditingProfile ? "bg-gray-100" : ""}`}
              />
              {profileErrors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {profileErrors.email}
                </p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <label className="text-sm text-gray-600">Phone Number</label>
              <input
                name="phone"
                value={profile.phone || ""}
                onChange={handleProfileChange}
                disabled={!isEditingProfile}
                className={`w-full border rounded-lg px-4 py-2 mt-1 ${
                  profileErrors.phone ? "border-red-500" : "border-gray-300"
                } ${!isEditingProfile ? "bg-gray-100" : ""}`}
              />
              {profileErrors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {profileErrors.phone}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <div className="md:col-span-2 flex gap-3">

              {isEditingProfile ? (
                <>
                  {/* SAVE */}
                  <button
                    onClick={saveProfile}
                    className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
                  >
                    Save Changes
                  </button>

                  {/* CANCEL */}
                  <button
                    onClick={handleCancelProfile}
                    className="border border-gray-400 text-gray-600 px-6 py-2 rounded-full hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
                >
                  Edit
                </button>
              )}

            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="order-1 lg:order-2 flex flex-col items-center lg:items-end">

            {profile.image ? (
              <img
                  src={
                        profile.image instanceof File
                          ? URL.createObjectURL(profile.image)
                          : profile.image
                      }
                alt="profile"
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-green-500 flex items-center justify-center mb-4">
                <span className="text-white text-3xl font-bold">
                  {profile.firstName?.charAt(0) || "U"}
                </span>
              </div>
            )}

            {/* IMAGE BUTTON */}
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
        </div>
      </div>

      {/* ADDRESS */}
      <div className="bg-white border rounded-xl p-8">
        <h2 className="text-lg font-semibold mb-6">Billing Address</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div>
            <label className="text-sm text-gray-600">First name</label>
              <input
                name="firstName"
                value={address.firstName || ""}
                onChange={handleAddressChange}
                disabled={!isEditingAddress}
                className={`w-full border rounded-lg px-4 py-2 mt-1 ${
                  addressErrors.firstName
                    ? "border-red-500"
                    : "border-gray-300"
                } ${!isEditingAddress && "bg-gray-100"}`}
              />

              {addressErrors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {addressErrors.firstName}
                </p>
              )}
          </div>

          <div>
            <label className="text-sm text-gray-600">Last name</label>
              <input
                name="lastName"
                value={address.lastName || ""}
                onChange={handleAddressChange}
                disabled={!isEditingAddress}
                className={`w-full border rounded-lg px-4 py-2 mt-1 ${
                  addressErrors.lastName ? "border-red-500" : "border-gray-300"
                } ${!isEditingAddress && "bg-gray-100"}`}
              />

              {addressErrors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {addressErrors.lastName}
                </p>
              )}
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Company Name <span className="text-gray-400">(optional)</span>
            </label>
            <input
              name="company"
              value={address.company || ""}
              onChange={handleAddressChange}
              disabled={!isEditingAddress}
              className={`w-full border rounded-lg px-4 py-2 mt-1 ${
                !isEditingAddress && "bg-gray-100"
              }`}
            />
          </div>

          <div className="md:col-span-3">
            <label className="text-sm text-gray-600">Street Address</label>
              <input
                name="street"
                value={address.street || ""}
                onChange={handleAddressChange}
                disabled={!isEditingAddress}
                className={`w-full border rounded-lg px-4 py-2 mt-1 ${
                  addressErrors.street ? "border-red-500" : "border-gray-300"
                } ${!isEditingAddress && "bg-gray-100"}`}
              />

              {addressErrors.street && (
                <p className="text-red-500 text-xs mt-1">
                  {addressErrors.street}
                </p>
              )}
          </div>

          <div>
            <label className="text-sm text-gray-600">Country / Region</label>
            <input
              name="country"
              value={address.country || ""}
              onChange={handleAddressChange}
              disabled={!isEditingAddress}
              className={`w-full border rounded-lg px-4 py-2 mt-1 ${
                !isEditingAddress && "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">States</label>
            <input
              name="state"
              value={address.state || ""}
              onChange={handleAddressChange}
              disabled={!isEditingAddress}
              className={`w-full border rounded-lg px-4 py-2 mt-1 ${
                !isEditingAddress && "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Zip Code</label>
              <input
                name="zip"
                value={address.zip || ""}
                onChange={handleAddressChange}
                disabled={!isEditingAddress}
                className={`w-full border rounded-lg px-4 py-2 mt-1 ${
                  addressErrors.zip ? "border-red-500" : "border-gray-300"
                } ${!isEditingAddress && "bg-gray-100"}`}
              />

              {addressErrors.zip && (
                <p className="text-red-500 text-xs mt-1">
                  {addressErrors.zip}
                </p>
              )}
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
              <input
                name="email"
                value={address.email || ""}
                onChange={handleAddressChange}
                disabled={!isEditingAddress}
                className={`w-full border rounded-lg px-4 py-2 mt-1 ${
                  addressErrors.email ? "border-red-500" : "border-gray-300"
                } ${!isEditingAddress && "bg-gray-100"}`}
              />

              {addressErrors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {addressErrors.email}
                </p>
              )}
          </div>

          <div>
            <label className="text-sm text-gray-600">Phone</label>
              <input
                name="phone"
                value={address.phone || ""}
                onChange={handleAddressChange}
                disabled={!isEditingAddress}
                className={`w-full border rounded-lg px-4 py-2 mt-1 ${
                  addressErrors.phone ? "border-red-500" : "border-gray-300"
                } ${!isEditingAddress && "bg-gray-100"}`}
              />

              {addressErrors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {addressErrors.phone}
                </p>
              )}
          </div>

        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex gap-3">

          {isEditingAddress ? (
            <>
              <button
                onClick={saveAddress}
                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
              >
                Save Changes
              </button>

              <button
                onClick={handleCancelAddress}
                className="border border-gray-400 text-gray-600 px-6 py-2 rounded-full hover:bg-gray-100"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditingAddress(true)}
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
            >
              Edit
            </button>
          )}

        </div>
      </div>

    </div>
  );
};

export default SettingsPage;