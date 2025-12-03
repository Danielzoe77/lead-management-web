// "use client";

// import React, { useState } from "react";

// interface AuthFormProps {
//   authMode: "login" | "signup";
//   authEmail: string;
//   authPassword: string;
//   authName?: string;
//   authConfirmPassword?: string;
//   setAuthEmail: (val: string) => void;
//   setAuthPassword: (val: string) => void;
//   setAuthName?: (val: string) => void;
//   setAuthConfirmPassword?: (val: string) => void;
//   handleSubmit: (e: React.FormEvent) => void;
//   toggleMode: () => void;
// }

// export default function AuthForm({
//   authMode,
//   authEmail,
//   authPassword,
//   authName,
//   authConfirmPassword,
//   setAuthEmail,
//   setAuthPassword,
//   setAuthName,
//   setAuthConfirmPassword,
//   handleSubmit,
//   toggleMode,
// }: AuthFormProps) {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
//       <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
//         <h2 className="text-3xl font-bold mb-6 text-center text-slate-800">
//           {authMode === "login" ? "Login" : "Sign Up"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {authMode === "signup" && setAuthName && (
//             <input
//               type="text"
//               placeholder="Full Name"
//               required
//               className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={authName}
//               onChange={(e) => setAuthName(e.target.value)}
//             />
//           )}

//           <input
//             type="email"
//             placeholder="Email"
//             required
//             className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value={authEmail}
//             onChange={(e) => setAuthEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             required
//             className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value={authPassword}
//             onChange={(e) => setAuthPassword(e.target.value)}
//           />

//           {authMode === "signup" && setAuthConfirmPassword && (
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               required
//               className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={authConfirmPassword}
//               onChange={(e) => setAuthConfirmPassword(e.target.value)}
//             />
//           )}

//           <button
//             type="submit"
//             className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:opacity-90 transition"
//           >
//             {authMode === "login" ? "Login" : "Sign Up"}
//           </button>
//         </form>

//         <p className="text-center mt-4 text-slate-500 text-sm">
//           {authMode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
//           <button className="text-blue-600 font-semibold" onClick={toggleMode}>
//             {authMode === "login" ? "Sign Up" : "Login"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       router.replace("/dashboard");
//     } else {
//       router.replace("/login");
//     }
//   }, []);

//   return null; // No UI needed here, redirect happens immediately
// }


"use client";

import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const res = await fetch("http://localhost:5000/api/auth/register", {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      // Redirect to login after successful registration
      window.location.href = "/login";
    } else {
      setMessage(data.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEF3F9]">
      <form
        onSubmit={handleSubmit}
        className="w-[420px] p-10 bg-white rounded-3xl shadow-lg text-center"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Create Account</h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

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

        {/* Submit Button */}
        <button
          className="w-full py-3 rounded-xl text-white font-medium bg-linear-to-r from-blue-600 to-purple-600 shadow-md hover:opacity-95 transition cursor-pointer"
        >
          Sign Up
        </button>

        {/* Error message */}
        {message && (
          <p className="mt-4 text-sm text-gray-600">{message}</p>
        )}

        <p className="mt-6 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-medium">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
