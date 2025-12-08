
// 

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


// ----------------------
// Types
// ----------------------
type Status = "New" | "Engaged" | "Proposal Sent" | "Closed-Won" | "Closed-Lost";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: Status;
  createdAt: string;
}

interface Stat {
  label: string;
  value: number;
  color: string;
}

// ----------------------
// Status helpers
// ----------------------
const getStatusStyles = (status: Status) => {
  const styles: Record<Status, string> = {
    New: "bg-blue-50 text-blue-700 border-blue-200",
    Engaged: "bg-purple-50 text-purple-700 border-purple-200",
    "Proposal Sent": "bg-amber-50 text-amber-700 border-amber-200",
    "Closed-Won": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Closed-Lost": "bg-rose-50 text-rose-700 border-rose-200",
  };
  return styles[status];
};

const getStatusIcon = (status: Status) => {
  const icons: Record<Status, string> = {
    New: "🆕",
    Engaged: "💬",
    "Proposal Sent": "📄",
    "Closed-Won": "✅",
    "Closed-Lost": "❌",
  };
  return icons[status];
};

export default function LeadManagement() {
  const router = useRouter();

  // States
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "New" as Status,
  });

  const [message, setMessage] = useState("");

  // ----------------------------
  // Check auth + Fetch leads
  // ----------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchLeads(token);
  }, [router]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };


  // ----------------------------
  // Fetch Leads from backend
  // ----------------------------
  const fetchLeads = async (token: string) => {
    try {
      // const res = await fetch("http://localhost:5000/api/lead", {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lead`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setMessage("Failed to fetch leads.");
        return;
      }

      const data = await res.json();
      setLeads(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage("Server error while loading leads.");
    }
  };

  // ----------------------------
  // Add new lead (POST)
  // ----------------------------
  const handleAddLead = async () => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    try {
      // const res = await fetch("http://localhost:5000/api/lead", {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to add lead.");
        return;
      }

      // Refresh leads after adding
      fetchLeads(token);

      // Reset form
      setFormData({
        name: "",
        email: "",
        status: "New",
      });

      setMessage("Lead added successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Server error while adding lead.");
    }
  };

  // ----------------------------
  // Loading screen
  // ----------------------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  // ----------------------------
  // Stats
  // ----------------------------
  const stats: Stat[] = [
    { label: "Total Leads", value: leads.length, color: "bg-gradient-to-br from-blue-500 to-blue-600" },
    { label: "New", value: leads.filter((l) => l.status === "New").length, color: "bg-gradient-to-br from-blue-400 to-blue-500" },
    { label: "Engaged", value: leads.filter((l) => l.status === "Engaged").length, color: "bg-gradient-to-br from-purple-400 to-purple-500" },
    { label: "Won", value: leads.filter((l) => l.status === "Closed-Won").length, color: "bg-gradient-to-br from-emerald-400 to-emerald-500" },
  ];

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 p-6">

      {/* Header */}
      
      {/* <header className="bg-white border-b border-slate-200 shadow-sm mb-8 p-6 rounded-xl flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Lead Management
          </h1>
          <p className="text-slate-600 mt-1">Track and manage your sales pipeline</p>
        </div>

       
        <button
          onClick={handleLogout}
          className="cursor-pointer px-5 py-2.5 rounded-xl bg-gradient-to-r from-slate-700 to-slate-900 
               text-white font-semibold shadow-lg hover:shadow-xl hover:opacity-90 
               transition-all duration-200"
        >
          Logout
        </button>
      </header> */}

      <header className="bg-white border-b border-slate-200 shadow-sm mb-8 p-6 rounded-xl flex items-center justify-between">

  {/* Logo + Title */}
  <div className="flex items-center gap-4">
    <Image
      src="/logo.png"           // path from /public
      alt="Logo"
      width={60}
      height={60}
      className="rounded-md"
    />

    <div>
      <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Lead Management
      </h1>
      <p className="text-slate-600 mt-1">Track and manage your sales pipeline</p>
    </div>
  </div>

  {/* Logout Button */}
  <button
    onClick={handleLogout}
    className="cursor-pointer px-5 py-2.5 rounded-xl bg-linear-to-r from-slate-700 to-slate-900 
      text-white font-semibold shadow-lg hover:shadow-xl hover:opacity-90 
      transition-all duration-200"
  >
    Logout
  </button>

</header>



      {message && (
        <div className="mb-4 p-3 bg-amber-100 text-amber-700 rounded-xl border border-amber-200">
          {message}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white shadow-md rounded-xl overflow-hidden border border-slate-200">
            <div className={`${stat.color} p-5`}>
              <p className="text-white/80 text-sm">{stat.label}</p>
              <p className="text-4xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Add Lead Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 h-fit">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Add New Lead</h2>

          <div className="space-y-5">
            <div>
              <label className="font-semibold block mb-1">Full Name *</label>
              <input
                type="text"
                className="w-full border border-slate-300 px-4 py-3 rounded-xl"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Email *</label>
              <input
                type="email"
                className="w-full border border-slate-300 px-4 py-3 rounded-xl"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="font-semibold block mb-1">Status</label>
              <select
                className="w-full border border-slate-300 px-4 py-3 rounded-xl"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Status })}
              >
                <option>New</option>
                <option>Engaged</option>
                <option>Proposal Sent</option>
                <option>Closed-Won</option>
                <option>Closed-Lost</option>
              </select>
            </div>

            <button
              onClick={handleAddLead}
              className="w-full py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-md cursor-pointer"
            >
              Add Lead
            </button>
          </div>
        </div>

        {/* Leads List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-linear-to-r from-slate-50 to-blue-50 p-6 border-b border-slate-200">
            <h2 className="font-bold text-xl text-slate-800">All Leads</h2>
          </div>

          <div className="divide-y divide-slate-200">
            {leads.map((lead) => (
              <div key={lead._id} className="p-6 hover:bg-slate-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-400 to-purple-400 text-white font-bold flex items-center justify-center">
                      {lead.name.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">{lead.name}</h3>
                      <p className="text-slate-500 text-sm">{lead.email}</p>
                    </div>
                  </div>

                  <span className={`px-3 py-1.5 rounded-full border font-semibold text-xs ${getStatusStyles(lead.status)}`}>
                    {getStatusIcon(lead.status)} {lead.status}
                  </span>
                </div>

                <div className="text-slate-400 text-xs mt-2 ml-12">
                  <span className="mr-2">⏱</span>
                  {formatDate(lead.createdAt)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
