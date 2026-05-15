import { Link } from "react-router-dom";

export default function PasswordUpdated() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
        <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center text-6xl mx-auto mb-8">
          ✅
        </div>

        <h1 className="text-2xl font-bold text-textmain">Password updated!</h1>

        <p className="text-gray-500 mt-3">
          Your password has been updated successfully.
        </p>

        <Link
          to="/login"
          className="block w-full bg-[#4F46E5] text-white py-3 rounded-xl font-semibold mt-8"
        >
          Login to your account
        </Link>
      </div>
    </div>
  );
}
