import { useState } from "react";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Password updated successfully");
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-6 ">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-10">
        
        {/* Title */}
        <h1 className="text-3xl font-semibold mb-2">
          Change Password
        </h1>

        <p className="text-gray-500 mb-8">
          Enter your current password and a new password to update your account.
        </p>

        {/* Current Password */}
        <div className="mb-6">
          <label className="block font-medium mb-2">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* New Password */}
        <div className="mb-6">
          <label className="block font-medium mb-2">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-10">
          <label className="block font-medium mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button className="px-8 py-3 rounded-full border text-gray-500 hover:bg-gray-100">
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-10 py-3 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
          >
            Update Password
          </button>
        </div>

      </div>
    </div>
  );
};

export default ChangePassword;