
// "use client";

// import React, { useState } from "react";

// // ----------------------
// // Types
// // ----------------------
// type Status = "New" | "Engaged" | "Proposal Sent" | "Closed-Won" | "Closed-Lost";

// interface Lead {
//   _id: string;
//   name: string;
//   email: string;
//   status: Status;
//   createdAt: string;
// }

// interface Stat {
//   label: string;
//   value: number;
//   color: string;
// }

// // ----------------------
// // Status helpers
// // ----------------------
// const getStatusStyles = (status: Status) => {
//   const styles: Record<Status, string> = {
//     New: "bg-blue-50 text-blue-700 border-blue-200",
//     Engaged: "bg-purple-50 text-purple-700 border-purple-200",
//     "Proposal Sent": "bg-amber-50 text-amber-700 border-amber-200",
//     "Closed-Won": "bg-emerald-50 text-emerald-700 border-emerald-200",
//     "Closed-Lost": "bg-rose-50 text-rose-700 border-rose-200",
//   };
//   return styles[status];
// };

// const getStatusIcon = (status: Status) => {
//   const icons: Record<Status, string> = {
//     New: "🆕",
//     Engaged: "💬",
//     "Proposal Sent": "📄",
//     "Closed-Won": "✅",
//     "Closed-Lost": "❌",
//   };
//   return icons[status];
// };

// // ----------------------
// // Component
// // ----------------------
// export default function LeadManagement() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     status: "New" as Status,
//   });

//   // ----------------------
//   // Sample leads
//   // ----------------------
//   const leads: Lead[] = [
//     { _id: "1", name: "Sarah Johnson", email: "sarah.j@techcorp.com", status: "New", createdAt: new Date().toISOString() },
//     { _id: "2", name: "Michael Chen", email: "mchen@innovate.io", status: "Engaged", createdAt: new Date(Date.now() - 3600000).toISOString() },
//     { _id: "3", name: "Emily Rodriguez", email: "emily.r@startup.com", status: "Proposal Sent", createdAt: new Date(Date.now() - 86400000).toISOString() },
//     { _id: "4", name: "David Kim", email: "dkim@enterprise.com", status: "Closed-Won", createdAt: new Date(Date.now() - 172800000).toISOString() },
//   ];

//   // ----------------------
//   // Stats
//   // ----------------------
//   const stats: Stat[] = [
//     { label: "Total Leads", value: leads.length, color: "bg-gradient-to-br from-blue-500 to-blue-600" },
//     { label: "New", value: leads.filter(l => l.status === "New").length, color: "bg-gradient-to-br from-blue-400 to-blue-500" },
//     { label: "Engaged", value: leads.filter(l => l.status === "Engaged").length, color: "bg-gradient-to-br from-purple-400 to-purple-500" },
//     { label: "Won", value: leads.filter(l => l.status === "Closed-Won").length, color: "bg-gradient-to-br from-emerald-400 to-emerald-500" },
//   ];

//   // ----------------------
//   // Format date
//   // ----------------------
//   const formatDate = (date: string) =>
//     new Date(date).toLocaleString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   // ----------------------
//   // JSX
//   // ----------------------
//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
//       {/* Header */}
//       <header className="bg-white border-b border-slate-200 shadow-sm mb-8 p-6 rounded-xl">
//         <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//           Lead Management
//         </h1>
//         <p className="text-slate-600 mt-1">Track and manage your sales pipeline</p>
//       </header>

//       {/* Stats */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
//         {stats.map((stat, i) => (
//           <div key={i} className="bg-white shadow-md rounded-xl overflow-hidden border border-slate-200">
//             <div className={`${stat.color} p-5`}>
//               <p className="text-white/80 text-sm">{stat.label}</p>
//               <p className="text-4xl font-bold text-white">{stat.value}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Add Lead Form */}
//         <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 h-fit">
//           <div className="flex items-center space-x-3 mb-6">
//             <div className="h-10 w-10 bg-linear-to-br from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
//               +
//             </div>
//             <h2 className="text-xl font-bold text-slate-800">Add New Lead</h2>
//           </div>

//           <div className="space-y-5">
//             <div>
//               <label className="font-semibold block mb-1">Full Name *</label>
//               <input
//                 type="text"
//                 className="w-full border border-slate-300 px-4 py-3 rounded-xl"
//                 placeholder="Enter full name"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               />
//             </div>

//             <div>
//               <label className="font-semibold block mb-1">Email Address *</label>
//               <input
//                 type="email"
//                 className="w-full border border-slate-300 px-4 py-3 rounded-xl"
//                 placeholder="email@company.com"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               />
//             </div>

//             <div>
//               <label className="font-semibold block mb-1">Status</label>
//               <select
//                 className="w-full border border-slate-300 px-4 py-3 rounded-xl"
//                 value={formData.status}
//                 onChange={(e) => setFormData({ ...formData, status: e.target.value as Status })}
//               >
//                 <option>New</option>
//                 <option>Engaged</option>
//                 <option>Proposal Sent</option>
//                 <option>Closed-Won</option>
//                 <option>Closed-Lost</option>
//               </select>
//             </div>

//             <button className="w-full py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-md">
//               Add Lead
//             </button>
//           </div>
//         </div>

//         {/* Leads List */}
//         <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
//           <div className="bg-linear-to-r from-slate-50 to-blue-50 p-6 border-b border-slate-200">
//             <h2 className="font-bold text-xl text-slate-800">All Leads</h2>
//           </div>

//           <div className="divide-y divide-slate-200">
//             {leads.map((lead) => (
//               <div key={lead._id} className="p-6 hover:bg-slate-50">
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-400 to-purple-400 text-white font-bold flex items-center justify-center">
//                       {lead.name.charAt(0)}
//                     </div>

//                     <div>
//                       <h3 className="font-bold text-lg">{lead.name}</h3>
//                       <p className="text-slate-500 text-sm">{lead.email}</p>
//                     </div>
//                   </div>

//                   <span className={`px-3 py-1.5 rounded-full border font-semibold text-xs ${getStatusStyles(lead.status)}`}>
//                     {getStatusIcon(lead.status)} {lead.status}
//                   </span>
//                 </div>

//                 <div className="text-slate-400 text-xs mt-2 ml-12">
//                   <span className="mr-2">⏱</span>
//                   {formatDate(lead.createdAt)}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


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
