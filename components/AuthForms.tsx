"use client";

import React from "react";

interface AuthFormProps {
  authMode: "login" | "signup";
  authEmail: string;
  authPassword: string;
  setAuthEmail: (val: string) => void;
  setAuthPassword: (val: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  toggleMode: () => void;
}

export default function AuthForm({ authMode, authEmail, authPassword, setAuthEmail, setAuthPassword, handleSubmit, toggleMode }: AuthFormProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">{authMode === "login" ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full border px-4 py-3 rounded-xl"
          value={authEmail}
          onChange={(e) => setAuthEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full border px-4 py-3 rounded-xl"
          value={authPassword}
          onChange={(e) => setAuthPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-md"
        >
          {authMode === "login" ? "Login" : "Sign Up"}
        </button>
      </form>
      <p className="text-center mt-4 text-slate-500 text-sm">
        {authMode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
        <button className="text-blue-600 font-semibold" onClick={toggleMode}>
          {authMode === "login" ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}
