import { Link } from "react-router-dom";

export default function VerifyEmail() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
        <div className="w-28 h-28 bg-[#EEF2FF] rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
          ✉️
        </div>

        <h1 className="text-2xl font-bold text-[#111827]">Check your email</h1>

        <p className="text-gray-500 mt-3">
          We’ve sent a verification link to your email address.
        </p>

        <div className="bg-gray-50 rounded-2xl p-4 mt-8">
          <p className="text-sm text-gray-500">Didn’t receive the email?</p>
          <button className="text-[#4F46E5] font-semibold text-sm mt-1">
            Resend email
          </button>
        </div>

        <Link
          to="/reset-password"
          className="block w-full bg-[#4F46E5] text-white py-3 rounded-xl font-semibold mt-8"
        >
          Continue
        </Link>

        <Link
          to="/login"
          className="block text-[#4F46E5] font-semibold text-sm mt-5"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}
