import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="bg-[#4F46E5] text-white p-8 md:p-10 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center">
              ✓
            </div>
            <span className="font-bold text-lg">Tap2Order</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Run your business.
            <br />
            We’ll handle
            <br />
            <span className="text-[#22C55E]">the orders.</span>
          </h1>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-white rounded-xl text-[#4F46E5] flex items-center justify-center">
                📦
              </div>
              <p className="text-sm">Take and manage orders in seconds</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-white rounded-xl text-[#4F46E5] flex items-center justify-center">
                🔄
              </div>
              <p className="text-sm">Track every order in real-time</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-white rounded-xl text-[#4F46E5] flex items-center justify-center">
                💬
              </div>
              <p className="text-sm">Update customers instantly</p>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center">
          <div className="w-28 h-28 bg-[#EEF2FF] rounded-full flex items-center justify-center text-5xl mb-8">
            ✅
          </div>

          <h2 className="text-2xl font-bold text-textmain">
            Welcome to Tap2Order
          </h2>

          <p className="text-gray-500 mt-3 max-w-sm">
            The simple way to manage orders for your business.
          </p>

          <div className="w-full max-w-sm mt-8 space-y-3">
            <Link
              to="/login"
              className="block w-full bg-[#4F46E5] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Login to your account
            </Link>

            <Link
              to="/register"
              className="block w-full border border-gray-300 text-[#4F46E5] py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Create a new account
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-8">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
