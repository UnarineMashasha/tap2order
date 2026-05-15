import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/password-updated");
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-[#111827] text-center">
          Reset password
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-[#111827]">
              New password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            />
          </div>

          <div className="space-y-2 text-sm text-gray-500">
            <p className="text-[#22C55E]">✓ At least 8 characters</p>
            <p className="text-[#22C55E]">✓ One uppercase letter</p>
            <p className="text-[#22C55E]">✓ One number</p>
            <p className="text-[#22C55E]">✓ One special character</p>
          </div>

          <div>
            <label className="text-sm font-medium text-[#111827]">
              Confirm password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
            />
          </div>

          <button className="w-full bg-[#4F46E5] text-white py-3 rounded-xl font-semibold">
            Reset password
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
