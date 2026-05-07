// src/components/ForgotPasswordModal.jsx
import React from 'react';

const ForgotPasswordModal = ({
  forgetEmail,
  setForgetEmail,
  handleForgetSubmit,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
        <h3 className="text-xl font-semibold mb-4 text-center text-blue-800">Reset Password</h3>
        <form onSubmit={handleForgetSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={forgetEmail}
            onChange={(e) => setForgetEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Send Link
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          aria-label="Close"
          type="button"
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;