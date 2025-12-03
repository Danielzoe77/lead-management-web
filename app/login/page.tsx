"use client";

import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  const data = await res.json();

  if (res.ok) {
    // store token
    localStorage.setItem("token", data.token);

    // redirect to dashboard
    window.location.href = "/dashboard";
  } else {
    setMessage(data.error);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEF3F9]">
      <form
        onSubmit={handleSubmit}
        className="w-[420px] p-10 bg-white rounded-3xl shadow-lg text-center"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Login</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Gradient Button */}
        <button
          className="w-full py-3 rounded-xl text-white font-medium bg-linear-to-r from-blue-600 to-purple-600 shadow-md hover:opacity-95 transition"
        >
          Login
        </button>

        {message && (
          <p className="mt-4 text-sm text-gray-600">{message}</p>
        )}

        <p className="mt-6 text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 font-medium">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
