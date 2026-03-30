import { useState, useEffect } from "react";

const AdminSettings = () => {
  const [twoFactor, setTwoFactor] = useState(false);
  const [autoLogout, setAutoLogout] = useState(false);
  const [logo, setLogo] = useState(null);

  // Load saved logo
  useEffect(() => {
    const savedLogo = localStorage.getItem("businessLogo");
    if (savedLogo) {
      setLogo(savedLogo);
    }
  }, []);

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogo(reader.result);
      localStorage.setItem("businessLogo", reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">General Settings</h1>

      <div className="bg-white rounded-xl border p-6 space-y-10">

        {/* BUSINESS INFORMATION */}
        <div>
          <h2 className="font-semibold text-lg">Business Information</h2>
          <p className="text-sm text-gray-500 mb-6">
            This information appears across your dashboard and public pages
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="text-sm">Business Name</label>
              <input className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>

            <div>
              <label className="text-sm">Business Logo</label>
              <div className="mt-1 flex items-center gap-4">
                <label className="cursor-pointer">
                  <div className="w-16 h-16 border border-dashed rounded-md flex items-center justify-center text-xs text-gray-400 overflow-hidden">
                    {logo ? (
                      <img
                        src={logo}
                        alt="logo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      "Logo"
                    )}
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>

                <div className="text-sm text-gray-500">
                  Upload logo
                  <p className="text-xs text-gray-400">
                    Recommended: Square image, at least 300x300 PNG or JPG
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm">Contact Email</label>
              <input className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>

            <div>
              <label className="text-sm">Phone Number</label>
              <input className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm">Address</label>
              <input className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
          </div>
        </div>

        {/* DASHBOARD PREFERENCES */}
        <div>
          <h2 className="font-semibold text-lg">Dashboard Preferences</h2>
          <p className="text-sm text-gray-500 mb-6">
            Customize how data appears in your dashboard
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm">Default Dashboard View</label>
              <input className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>

            <div>
              <label className="text-sm">Date Format</label>
              <input className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>

            <div>
              <label className="text-sm">Time Zone</label>
              <input className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>

            <div>
              <label className="text-sm">Language</label>
              <input className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
          </div>
        </div>

        {/* SECURITY */}
        <div>
          <h2 className="font-semibold text-lg">Security</h2>
          <p className="text-sm text-gray-500 mb-6">
            Protect your account from unauthorized access
          </p>

          <div className="space-y-6">

            {/* Change Password */}
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-gray-500">
                  Update Password
                </p>
              </div>

              <button className="px-4 py-2 border rounded-full text-sm">
                Update Password
              </button>
            </div>

            {/* Two Factor */}
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security with OTP
                </p>
              </div>

              <button
                onClick={() => setTwoFactor(!twoFactor)}
                className={`w-10 h-5 rounded-full flex items-center transition ${
                  twoFactor ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                    twoFactor ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Auto Logout */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Auto Logout Timer</p>
                <p className="text-sm text-gray-500">
                  Automatically log out after period of inactivity
                </p>
              </div>

              <div className="flex items-center gap-4">
                <select className="border rounded-lg px-3 py-2 text-sm">
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>2 hours</option>
                </select>

                <button
                  onClick={() => setAutoLogout(!autoLogout)}
                  className={`w-10 h-5 rounded-full flex items-center transition ${
                    autoLogout ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                      autoLogout ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="flex justify-between pt-6">
          <button className="px-6 py-2 border rounded-full text-gray-500">
            Reset to Default
          </button>

          <button className="px-8 py-2 bg-green-600 text-white rounded-full">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;