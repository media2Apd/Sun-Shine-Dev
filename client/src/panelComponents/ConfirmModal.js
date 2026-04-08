import React from "react";

const ConfirmModal = ({
  open,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Yes, Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  children, // ✅ NEW
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-sm shadow-lg">

        <h2 className="text-lg font-semibold mb-3 text-center">
          {title}
        </h2>

        <p className="text-sm text-gray-500 text-center mb-4">
          {message}
        </p>

        {/* 🔥 CUSTOM CONTENT (NOTE INPUT) */}
        {children}

        <div className="flex gap-3 mt-4">
          <button
            onClick={onCancel}
            className="w-full border py-2 rounded-md hover:bg-gray-50"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="w-full bg-[#00B207] text-white py-2 rounded-md"
          >
            {confirmText}
          </button>
        </div>

      </div>
    </div>
  );
};
export default ConfirmModal;