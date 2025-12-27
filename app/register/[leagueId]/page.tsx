"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Loader2,
  MapPin,
  Plus,
  Trophy,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Sport {
  id: string;
  name: string;
}

interface Location {
  id: string;
  name: string;
}

interface League {
  id: string;
  leagueName: string;
  sport: Sport;
  location: Location;
  startDate: string;
  duration: string;
  dayOfWeek: string[];
  timeStart: string;
  timeEnd: string;
  costPerTeam: number;
  skillLevel: string[];
  registrationStatus: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export default function LeagueRegistrationPage() {
  const router = useRouter();
  const params = useParams();
  const leagueId = params.leagueId as string;

  const [user, setUser] = useState<User | null>(null);
  const [league, setLeague] = useState<League | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [teamName, setTeamName] = useState("");
  const [playerEmails, setPlayerEmails] = useState<string[]>(["", "", "", ""]);

  const minPlayers = 5;
  const maxPlayers = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch("/api/users/me", {
          credentials: "include",
        });
        if (!userRes.ok) {
          router.push(`/sign-in?redirect=/register/${leagueId}`);
          return;
        }
        const userData = await userRes.json();
        setUser(userData.user);

        // Pre-fill captain email + 4 empty slots
        setPlayerEmails([userData.user.email, "", "", "", ""]);

        const leagueRes = await fetch(`/api/leagues/${leagueId}?depth=1`);
        if (!leagueRes.ok) {
          router.push("/register");
          return;
        }
        const leagueData = await leagueRes.json();
        setLeague(leagueData);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [leagueId, router]);

  const addEmailField = () => {
    if (playerEmails.length < maxPlayers) {
      setPlayerEmails([...playerEmails, ""]);
    }
  };

  const removeEmailField = (index: number) => {
    if (index === 0) return;
    setPlayerEmails(playerEmails.filter((_, i) => i !== index));
  };

  const updateEmail = (index: number, value: string) => {
    const updated = [...playerEmails];
    updated[index] = value;
    setPlayerEmails(updated);
  };

  const formatSkillLevel = (levels: string[]) => {
    const displayMap: Record<string, string> = {
      recreational: "Recreational",
      intermediate: "Intermediate",
      "intermediate-plus": "Intermediate Plus",
    };
    return levels.map((l) => displayMap[l] || l).join(", ");
  };

  const formatDayOfWeek = (days: string[]) => {
    return days
      .map((d) => d.charAt(0).toUpperCase() + d.slice(1) + "s")
      .join(", ");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validEmails = playerEmails.filter((email) => email.trim() !== "");

    if (validEmails.length < minPlayers) {
      setError(`Minimum ${minPlayers} players required`);
      return;
    }

    if (!teamName.trim()) {
      setError("Team name is required");
      return;
    }

    setSubmitting(true);

    try {
      const userIdString = user?.id ? String(user.id) : "";

      const teamRes = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          league: leagueId,
          captain: userIdString,
          teamName: teamName.trim(),
        }),
      });

      const teamData = await teamRes.json();

      if (!teamRes.ok) {
        throw new Error(
          teamData.errors?.[0]?.message ||
            teamData.error ||
            "Failed to create team"
        );
      }

      const teamIdString = String(teamData.id);

      for (let i = 0; i < validEmails.length; i++) {
        await fetch("/api/team-registrations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            team: teamIdString,
            playerEmail: validEmails[i],
            status: i === 0 ? "accepted" : "invited",
            isCaptain: i === 0,
            invitedBy: userIdString,
          }),
        });
      }

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (err) {
      console.error("Submit error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="pt-[72px] flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-6 h-6 animate-spin text-urban-red" />
        </div>
      </main>
    );
  }

  if (!league) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="pt-[72px] px-5 py-12 text-center">
          <p className="text-gray-500 text-sm">League not found</p>
          <Link
            href="/register"
            className="text-urban-red text-sm mt-4 inline-block hover:underline"
          >
            Browse Leagues
          </Link>
        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="pt-[72px] flex items-center justify-center min-h-[50vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center px-5"
          >
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h2 className="font-display text-urban-dark text-xl tracking-wider mb-1">
              REGISTRATION SUCCESSFUL
            </h2>
            <p className="text-gray-500 text-sm">
              Redirecting to your dashboard...
            </p>
          </motion.div>
        </div>
      </main>
    );
  }

  const validEmailCount = playerEmails.filter((e) => e.trim() !== "").length;
  const progressPercent = Math.min((validEmailCount / minPlayers) * 100, 100);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-[72px]">
        {/* Back Button */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-5 lg:px-8 py-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 text-gray-400 hover:text-urban-dark transition-colors text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Leagues</span>
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-5 lg:px-8 py-6 lg:py-8">
          <div className="lg:grid lg:grid-cols-5 lg:gap-8">
            {/* League Info Card - Sidebar on Desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-2 mb-6 lg:mb-0"
            >
              <div className="bg-white rounded-sm border border-gray-100 overflow-hidden lg:sticky lg:top-[88px]">
                {/* League Header */}
                <div className="bg-urban-dark px-4 py-3">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
                    Registering for
                  </p>
                  <h2 className="text-white text-sm font-medium leading-tight">
                    {league.leagueName}
                  </h2>
                </div>

                {/* League Details */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs">
                    <Trophy className="w-3.5 h-3.5 text-urban-red flex-shrink-0" />
                    <span className="text-gray-600">{league.sport?.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-urban-red flex-shrink-0" />
                    <span className="text-gray-600">
                      {league.location?.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Calendar className="w-3.5 h-3.5 text-urban-red flex-shrink-0" />
                    <span className="text-gray-600">
                      {new Date(league.startDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                      <span className="text-gray-400">
                        {" "}
                        · {league.duration}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="w-3.5 h-3.5 text-urban-red flex-shrink-0" />
                    <span className="text-gray-600">
                      {formatDayOfWeek(league.dayOfWeek || [])}
                      <span className="text-gray-400">
                        {" "}
                        · {league.timeStart} - {league.timeEnd}
                      </span>
                    </span>
                  </div>

                  {/* Skill Levels */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {league.skillLevel?.map((level) => (
                      <span
                        key={level}
                        className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded-sm"
                      >
                        {formatSkillLevel([level])}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-gray-400">Total Cost</span>
                      <span className="text-lg font-semibold text-urban-dark">
                        ${league.costPerTeam?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Registration Form - Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-sm border border-gray-100 p-5 lg:p-6">
                <h1 className="font-display text-urban-dark text-lg tracking-wider mb-5">
                  REGISTER YOUR TEAM
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Team Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Team Name
                    </label>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      required
                      placeholder="Enter team name"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm text-urban-dark placeholder:text-gray-400 focus:outline-none focus:border-urban-red"
                    />
                  </div>

                  {/* Player Roster */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-xs font-medium text-gray-700">
                        Team Roster
                      </label>
                      <span className="text-[10px] text-gray-400">
                        {validEmailCount} of {minPlayers} required
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 0.3 }}
                          className={`h-full ${validEmailCount >= minPlayers ? "bg-green-500" : "bg-urban-red"}`}
                        />
                      </div>
                    </div>

                    {/* Email Grid */}
                    <div className="space-y-2">
                      {playerEmails.map((email, index) => (
                        <div key={index} className="flex gap-2">
                          <div className="relative flex-1">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) =>
                                updateEmail(index, e.target.value)
                              }
                              required={index < minPlayers}
                              placeholder={
                                index === 0
                                  ? "Your email (Captain)"
                                  : "Player email"
                              }
                              disabled={index === 0}
                              className={`w-full px-3 py-2 border rounded-sm text-sm placeholder:text-gray-400 focus:outline-none focus:border-urban-red transition-colors ${
                                index === 0
                                  ? "bg-gray-50 border-gray-200 text-gray-600"
                                  : "border-gray-200 text-urban-dark"
                              } ${email && index !== 0 ? "pr-8" : ""}`}
                            />
                            {index === 0 && (
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-urban-red font-medium uppercase">
                                Captain
                              </span>
                            )}
                            {index !== 0 && email && (
                              <button
                                type="button"
                                onClick={() => removeEmailField(index)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-300 hover:text-red-500 transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Player Button */}
                    {playerEmails.length < maxPlayers && (
                      <button
                        type="button"
                        onClick={addEmailField}
                        className="mt-3 w-full py-2 border border-dashed border-gray-200 text-gray-400 rounded-sm flex items-center justify-center gap-1.5 text-xs hover:border-urban-red hover:text-urban-red transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add another player
                      </button>
                    )}

                    <p className="mt-2 text-[10px] text-gray-400">
                      Players will receive an email invitation to join your
                      team.
                    </p>
                  </div>

                  {/* Error */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-50 border border-red-100 rounded-sm"
                    >
                      <p className="text-red-600 text-xs text-center">
                        {error}
                      </p>
                    </motion.div>
                  )}

                  {/* Submit */}
                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={submitting || validEmailCount < minPlayers}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full py-3 bg-urban-red text-white font-medium text-sm tracking-wider rounded-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-urban-red/90 transition-colors"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Registering...
                        </>
                      ) : (
                        "Register Team"
                      )}
                    </motion.button>

                    <p className="mt-3 text-[10px] text-gray-400 text-center">
                      By registering, you agree to Urban Rec&apos;s terms and
                      conditions.
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
