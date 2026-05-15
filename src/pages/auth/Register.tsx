import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth";
import { setToken } from "../../utils/auth";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

export default function Register() {
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const data = await registerUser(
        form.name,
        form.email,
        form.password,
        "Tap2Order Demo Store",
      );

      setToken(data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Email may already exist.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex bg-[#4F46E5] text-white p-10 flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-16">
              <div className="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center">
                ✓
              </div>
              <span className="font-bold text-lg">Tap2Order</span>
            </div>

            <h1 className="text-3xl font-bold leading-tight">
              Start taking orders
              <br />
              in seconds.
            </h1>

            <p className="mt-3 text-white/80">
              Create your account and set up your business dashboard.
            </p>
          </div>

          <div className="w-40 h-40 bg-white/10 rounded-3xl flex items-center justify-center text-6xl mx-auto">
            📦
          </div>
        </div>

        <div className="p-8 md:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-[#111827]">
              Create account
            </h2>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl">
                  {error}
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-[#111827]">
                  Full name
                </label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#111827]">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  placeholder="Enter your email"
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#111827]">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  placeholder="Create a password"
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#4F46E5] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
              >
                Register
              </button>
            </form>

            <p className="text-sm text-center text-gray-500 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-[#4F46E5] font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
