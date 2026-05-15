import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/verify-email");
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <div className="text-center">
          <div className="w-28 h-28 bg-[#EEF2FF] rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
            🔒
          </div>

          <h1 className="text-2xl font-bold text-textmain">No worries!</h1>
          <p className="text-gray-500 mt-2">
            Enter your email address and we’ll send you a reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-textmain">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            />
          </div>

          <button className="w-full bg-[#4F46E5] text-white py-3 rounded-xl font-semibold">
            Send reset link
          </button>
        </form>

        <Link
          to="/login"
          className="block text-center text-[#4F46E5] font-semibold text-sm mt-6"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}
