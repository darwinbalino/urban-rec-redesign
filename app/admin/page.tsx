"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  Trash2,
  Trophy,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Types
interface Sport {
  id: string;
  name: string;
  slug: string;
}

interface Location {
  id: string;
  name: string;
  region: string;
}

interface League {
  id: string;
  leagueName: string;
  sport: Sport | string;
  location: Location | string;
  skillLevel: string[];
  startDate: string;
  duration: string;
  dayOfWeek: string[];
  timeStart: string;
  timeEnd: string;
  costPerTeam: number;
  maxTeams: number;
  registrationStatus: string;
  published: boolean;
}

// Admin credentials
const ADMIN_USERNAME = "user";
const ADMIN_PASSWORD = "password";

// Days of week options
const DAYS_OF_WEEK = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
];

// Skill level options
const SKILL_LEVELS = [
  { label: "Recreational", value: "recreational" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Intermediate Plus", value: "intermediate-plus" },
];

// Registration status options
const REGISTRATION_STATUSES = [
  { label: "Open", value: "open" },
  { label: "Waitlist", value: "waitlist" },
  { label: "Full", value: "full" },
  { label: "Closed", value: "closed" },
];

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Data state
  const [leagues, setLeagues] = useState<League[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingLeague, setEditingLeague] = useState<League | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    leagueName: "",
    sport: "",
    location: "",
    skillLevel: [] as string[],
    startDate: "",
    duration: "",
    dayOfWeek: [] as string[],
    timeStart: "",
    timeEnd: "",
    costPerTeam: 0,
    maxTeams: 12,
    registrationStatus: "open",
    published: true,
  });

  // Check auth on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem("adminAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch leagues
      const leaguesRes = await fetch("/api/leagues?depth=1&limit=100");
      if (leaguesRes.ok) {
        const leaguesData = await leaguesRes.json();
        setLeagues(leaguesData.docs || []);
      }

      // Fetch sports
      const sportsRes = await fetch("/api/sports?limit=100");
      if (sportsRes.ok) {
        const sportsData = await sportsRes.json();
        setSports(sportsData.docs || []);
      }

      // Fetch locations
      const locationsRes = await fetch("/api/locations?limit=100");
      if (locationsRes.ok) {
        const locationsData = await locationsRes.json();
        setLocations(locationsData.docs || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuth", "true");
    } else {
      setAuthError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("adminAuth");
    setUsername("");
    setPassword("");
  };

  const openCreateModal = () => {
    setEditingLeague(null);
    setFormData({
      leagueName: "",
      sport: sports[0]?.id || "",
      location: locations[0]?.id || "",
      skillLevel: ["recreational"],
      startDate: "",
      duration: "12 weeks",
      dayOfWeek: ["monday"],
      timeStart: "6:00 PM",
      timeEnd: "10:00 PM",
      costPerTeam: 1000,
      maxTeams: 12,
      registrationStatus: "open",
      published: true,
    });
    setShowModal(true);
  };

  const openEditModal = (league: League) => {
    setEditingLeague(league);
    setFormData({
      leagueName: league.leagueName,
      sport: typeof league.sport === "object" ? league.sport.id : league.sport,
      location:
        typeof league.location === "object"
          ? league.location.id
          : league.location,
      skillLevel: league.skillLevel || [],
      startDate: league.startDate ? league.startDate.split("T")[0] : "",
      duration: league.duration,
      dayOfWeek: league.dayOfWeek || [],
      timeStart: league.timeStart,
      timeEnd: league.timeEnd,
      costPerTeam: league.costPerTeam,
      maxTeams: league.maxTeams,
      registrationStatus: league.registrationStatus,
      published: league.published,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingLeague
        ? `/api/leagues/${editingLeague.id}`
        : "/api/leagues";

      const method = editingLeague ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowModal(false);
        fetchData();
      } else {
        const error = await res.json();
        alert(error.errors?.[0]?.message || "Failed to save league");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save league");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/leagues/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setDeleteConfirm(null);
        fetchData();
      } else {
        alert("Failed to delete league");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete league");
    }
  };

  const toggleArrayValue = (array: string[], value: string) => {
    if (array.includes(value)) {
      return array.filter((v) => v !== value);
    }
    return [...array, value];
  };

  // Format helpers
  const formatDate = (dateString: string) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDays = (days: string[]) => {
    return days.map((d) => d.charAt(0).toUpperCase() + d.slice(1)).join(", ");
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white rounded-sm shadow-sm p-8">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-urban-dark">
                <Image
                  src="/logo.jpeg"
                  alt="Urban Rec Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-display text-urban-dark text-xl tracking-wider block">
                  URBAN REC
                </span>
                <span className="text-xs text-gray-500">Admin Panel</span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-urban-red"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-urban-red"
                  placeholder="Enter password"
                  required
                />
              </div>

              {authError && (
                <p className="text-red-500 text-sm text-center">{authError}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-urban-red text-white font-display tracking-wider rounded-sm hover:bg-urban-red/90 transition-colors"
              >
                SIGN IN
              </button>
            </form>

            <p className="text-center mt-6">
              <Link
                href="/"
                className="text-sm text-gray-500 hover:text-urban-red"
              >
                ← Back to site
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    );
  }

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-urban-red" />
      </main>
    );
  }

  // Admin dashboard
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-urban-dark">
              <Image
                src="/logo.jpeg"
                alt="Urban Rec Logo"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="font-display text-urban-dark text-xl tracking-wider block">
                URBAN REC
              </span>
              <span className="text-xs text-gray-500">Admin Panel</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-urban-dark transition-colors"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-urban-red transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-urban-dark text-2xl tracking-wider">
              MANAGE LEAGUES
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {leagues.length} leagues total
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-urban-red text-white font-medium rounded-sm hover:bg-urban-red/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add League
          </button>
        </div>

        {/* Leagues Table */}
        <div className="bg-white rounded-sm shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    League
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sport
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Location
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Start Date
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Cost
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leagues.map((league) => (
                  <tr key={league.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium text-urban-dark text-sm">
                          {league.leagueName}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {formatDays(league.dayOfWeek || [])}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600">
                        {typeof league.sport === "object"
                          ? league.sport.name
                          : league.sport}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-sm text-gray-600">
                        {typeof league.location === "object"
                          ? league.location.name
                          : league.location}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-sm text-gray-600">
                        {formatDate(league.startDate)}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-sm text-gray-600">
                        ${league.costPerTeam?.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium ${
                          league.registrationStatus === "open"
                            ? "bg-green-100 text-green-700"
                            : league.registrationStatus === "waitlist"
                              ? "bg-yellow-100 text-yellow-700"
                              : league.registrationStatus === "full"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {league.registrationStatus}
                      </span>
                      {!league.published && (
                        <span className="ml-2 text-xs text-gray-400">
                          (Draft)
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(league)}
                          className="p-2 text-gray-400 hover:text-urban-dark transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(league.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {leagues.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                No leagues yet. Create your first league!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-sm shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-display text-urban-dark text-xl tracking-wider">
                  {editingLeague ? "EDIT LEAGUE" : "CREATE LEAGUE"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSave} className="p-6 space-y-5">
                {/* League Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    League Name *
                  </label>
                  <input
                    type="text"
                    value={formData.leagueName}
                    onChange={(e) =>
                      setFormData({ ...formData, leagueName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-urban-red"
                    placeholder="e.g., Vancouver East Monday Basketball"
                    required
                  />
                </div>

                {/* Sport & Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sport *
                    </label>
                    <select
                      value={formData.sport}
                      onChange={(e) =>
                        setFormData({ ...formData, sport: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-urban-red"
                      required
                    >
                      <option value="">Select sport</option>
                      {sports.map((sport) => (
                        <option key={sport.id} value={sport.id}>
                          {sport.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-urban-red"
                      required
                    >
                      <option value="">Select location</option>
                      {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Days of Week */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Days of Week *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DAYS_OF_WEEK.map((day) => (
                      <button
                        key={day.value}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            dayOfWeek: toggleArrayValue(
                              formData.dayOfWeek,
                              day.value
                            ),
                          })
                        }
                        className={`px-3 py-1.5 text-sm rounded-sm border transition-colors ${
                          formData.dayOfWeek.includes(day.value)
                            ? "bg-urban-red text-white border-urban-red"
                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skill Levels */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skill Levels *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SKILL_LEVELS.map((skill) => (
                      <button
                        key={skill.value}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            skillLevel: toggleArrayValue(
                              formData.skillLevel,
                              skill.value
                            ),
                          })
                        }
                        className={`px-3 py-1.5 text-sm rounded-sm border transition-colors ${
                          formData.skillLevel.includes(skill.value)
                            ? "bg-urban-red text-white border-urban-red"
                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {skill.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date & Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-urban-red"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration *
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-urban-red"
                      placeholder="e.g., 12 weeks"
                      required
                    />
                  </div>
                </div>

                {/* Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time *
                    </label>
                    <input
                      type="text"
                      value={formData.timeStart}
                      onChange={(e) =>
                        setFormData({ ...formData, timeStart: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-urban-red"
                      placeholder="e.g., 6:00 PM"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time *
                    </label>
                    <input
                      type="text"
                      value={formData.timeEnd}
                      onChange={(e) =>
                        setFormData({ ...formData, timeEnd: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-urban-red"
                      placeholder="e.g., 10:00 PM"
                      required
                    />
                  </div>
                </div>

                {/* Cost & Max Teams */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cost per Team ($) *
                    </label>
                    <input
                      type="number"
                      value={formData.costPerTeam}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          costPerTeam: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-urban-red"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Teams *
                    </label>
                    <input
                      type="number"
                      value={formData.maxTeams}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxTeams: parseInt(e.target.value) || 12,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-urban-red"
                      min="1"
                      required
                    />
                  </div>
                </div>

                {/* Status & Published */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Registration Status *
                    </label>
                    <select
                      value={formData.registrationStatus}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          registrationStatus: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-urban-red"
                      required
                    >
                      {REGISTRATION_STATUSES.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Visibility
                    </label>
                    <label className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-sm cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={formData.published}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            published: e.target.checked,
                          })
                        }
                        className="w-4 h-4 text-urban-red border-gray-300 rounded focus:ring-urban-red"
                      />
                      <span className="text-sm text-gray-600">
                        Published (visible to public)
                      </span>
                    </label>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2 bg-urban-red text-white font-medium rounded-sm hover:bg-urban-red/90 transition-colors disabled:opacity-70"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        {editingLeague ? "Update League" : "Create League"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-sm shadow-xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-urban-dark text-lg tracking-wider mb-2">
                DELETE LEAGUE
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Are you sure you want to delete this league? This action cannot
                be undone.
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-sm hover:bg-red-600 transition-colors"
                >
                  Delete League
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
