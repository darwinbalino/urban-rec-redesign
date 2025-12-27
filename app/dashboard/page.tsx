"use client";

import Header from "@/components/Header";
import { motion } from "framer-motion";
import {
  Calendar,
  Check,
  Clock,
  Loader2,
  MapPin,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

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
  skillLevel: string[];
}

interface Team {
  id: string;
  teamName: string;
  league: League;
  captain: User | string;
}

interface TeamRegistration {
  id: string;
  playerEmail: string;
  status: string;
  isCaptain: boolean;
  team: Team | string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [allRegistrations, setAllRegistrations] = useState<TeamRegistration[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current user
        const userRes = await fetch("/api/users/me", {
          credentials: "include",
        });

        if (!userRes.ok) {
          window.location.href = "/sign-in";
          return;
        }

        const userData = await userRes.json();
        setUser(userData.user);

        if (!userData.user) {
          window.location.href = "/sign-in";
          return;
        }

        // Get teams where user is captain
        const teamsRes = await fetch(`/api/teams?depth=2&limit=100`, {
          credentials: "include",
        });

        if (teamsRes.ok) {
          const teamsData = await teamsRes.json();
          // Filter teams where user is captain
          const userTeams = (teamsData.docs || []).filter((team: Team) => {
            const captainId =
              typeof team.captain === "object" ? team.captain.id : team.captain;
            return captainId === userData.user.id;
          });
          setTeams(userTeams);

          // Get ALL registrations for user's teams
          if (userTeams.length > 0) {
            const teamIds = userTeams.map((t: Team) => t.id);
            const regsRes = await fetch(
              `/api/team-registrations?depth=1&limit=100`,
              { credentials: "include" }
            );

            if (regsRes.ok) {
              const regsData = await regsRes.json();
              // Filter registrations that belong to user's teams
              const teamRegs = (regsData.docs || []).filter(
                (reg: TeamRegistration) => {
                  const regTeamId =
                    typeof reg.team === "object" ? reg.team.id : reg.team;
                  return teamIds.includes(regTeamId);
                }
              );
              setAllRegistrations(teamRegs);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      // Force redirect to sign-in page
      window.location.href = "/sign-in";
    } catch (error) {
      console.error("Logout error:", error);
      // Still redirect even if there's an error
      window.location.href = "/sign-in";
    }
  };

  // Helper to format skill levels
  const formatSkillLevel = (levels: string[]) => {
    const displayMap: Record<string, string> = {
      recreational: "Recreational",
      intermediate: "Intermediate",
      "intermediate-plus": "Intermediate Plus",
    };
    return levels.map((l) => displayMap[l] || l).join(", ");
  };

  // Helper to format day of week
  const formatDayOfWeek = (days: string[]) => {
    return days.map((d) => d.charAt(0).toUpperCase() + d.slice(1)).join(", ");
  };

  // Get registrations for a specific team
  const getTeamRegistrations = (teamId: string) => {
    return allRegistrations.filter((reg) => {
      const regTeamId = typeof reg.team === "object" ? reg.team.id : reg.team;
      return regTeamId === teamId;
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="pt-[72px] flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-urban-red" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="pt-[72px]">
        {/* Header Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-5 py-8 border-b border-gray-100"
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="font-display text-urban-dark text-3xl tracking-wider mb-1">
                DASHBOARD
              </h1>
              <p className="text-gray-500 text-sm">
                Welcome back, {user?.name}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-urban-red transition-colors px-4 py-2 border border-gray-200 rounded-sm hover:border-urban-red"
            >
              Sign Out
            </button>
          </div>
        </motion.section>

        {/* Your Leagues Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="px-5 py-6"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-urban-dark text-xl tracking-wider mb-4">
              YOUR LEAGUES
            </h2>

            {teams.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-sm">
                <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">
                  You haven&apos;t joined any leagues yet.
                </p>
                <Link
                  href="/register"
                  className="inline-block px-6 py-3 bg-urban-red text-white font-display tracking-wider rounded-sm hover:bg-urban-red/90 transition-colors"
                >
                  FIND A LEAGUE
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {teams.map((team, index) => {
                  const teamRegistrations = getTeamRegistrations(team.id);

                  return (
                    <motion.div
                      key={team.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border border-gray-100 rounded-sm overflow-hidden"
                    >
                      {/* Team Header */}
                      <div className="bg-urban-dark px-4 py-3">
                        <h3 className="font-display text-white text-lg tracking-wider">
                          {team.teamName}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {team.league?.leagueName}
                        </p>
                      </div>

                      {/* League Details */}
                      <div className="p-4 border-b border-gray-100">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Trophy className="w-4 h-4 text-urban-red" />
                            <span>{team.league?.sport?.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4 text-urban-red" />
                            <span>{team.league?.location?.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4 text-urban-red" />
                            <span>
                              {team.league?.startDate
                                ? new Date(
                                    team.league.startDate
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })
                                : "TBD"}{" "}
                              · {team.league?.duration}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4 text-urban-red" />
                            <span>
                              {formatDayOfWeek(team.league?.dayOfWeek || [])}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {team.league?.skillLevel?.map((level) => (
                            <span
                              key={level}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-sm"
                            >
                              {formatSkillLevel([level])}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Team Roster */}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="w-4 h-4 text-urban-red" />
                          <span className="text-sm font-medium text-urban-dark">
                            Team Roster ({teamRegistrations.length} players)
                          </span>
                        </div>

                        {teamRegistrations.length === 0 ? (
                          <p className="text-gray-400 text-sm">
                            No players registered yet.
                          </p>
                        ) : (
                          <div className="space-y-2">
                            {teamRegistrations.map((reg) => (
                              <div
                                key={reg.id}
                                className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-sm"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-urban-dark flex items-center justify-center text-white text-sm font-medium">
                                    {reg.playerEmail.charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="text-urban-dark text-sm">
                                      {reg.playerEmail}
                                    </p>
                                    {reg.isCaptain && (
                                      <span className="text-xs text-urban-red font-medium">
                                        Captain
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <span
                                  className={`text-xs flex items-center gap-1 ${reg.status === "accepted" ? "text-green-600" : "text-gray-400"}`}
                                >
                                  {reg.status === "accepted" ? (
                                    <>
                                      <Check className="w-3 h-3" /> Accepted
                                    </>
                                  ) : (
                                    <>
                                      <Clock className="w-3 h-3" /> Invited
                                    </>
                                  )}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
