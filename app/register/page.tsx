"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Loader2, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  sport: Sport;
  location: Location;
  skillLevel: string[];
  startDate: string;
  duration: string;
  dayOfWeek: string[];
  timeStart: string;
  timeEnd: string;
  costPerTeam: number;
  registrationStatus: string;
}

// Sport icons as simple SVG components
const SportIcon = ({
  sport,
  className = "w-4 h-4",
}: {
  sport: string;
  className?: string;
}) => {
  const iconClass = `${className} text-white`;

  switch (sport) {
    case "Basketball":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" />
          <path
            d="M4.93 4.93c4.08 2.38 8.14 2.38 12.14 0M4.93 19.07c4.08-2.38 8.14-2.38 12.14 0"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      );
    case "Dodgeball":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      );
    case "Flag Football":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="6"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path d="M12 6v12" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "Floor Hockey":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M4 20l8-8 8 8M12 12V4"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      );
    case "Indoor Soccer":
    case "Soccer":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M12 2l3 5h-6l3-5M12 22l3-5h-6l3 5"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      );
    case "Indoor Volleyball":
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M12 2c0 5.5-4.5 10-10 10M12 2c0 5.5 4.5 10 10 10M12 22c0-5.5-4.5-10-10-10M12 22c0-5.5 4.5-10 10-10"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      );
  }
};

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-2.5 px-3 bg-urban-dark text-white text-xs font-medium flex items-center justify-between rounded-sm hover:bg-urban-dark/90 transition-colors"
      >
        <span className="truncate">{value || label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={14} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-30 w-full mt-1 bg-white shadow-lg max-h-60 overflow-auto rounded-sm border border-gray-200"
          >
            {options.map((option) => (
              <li key={option}>
                <button
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`w-full py-2.5 px-3 text-left text-xs transition-colors ${
                    value === option
                      ? "bg-urban-red text-white"
                      : "text-urban-dark hover:bg-gray-50"
                  }`}
                >
                  {option}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RegisterPage() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [selectedSport, setSelectedSport] = useState("All Sports");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedDay, setSelectedDay] = useState("All Days");
  const [selectedSkill, setSelectedSkill] = useState("All Skill Levels");

  const days = [
    "All Days",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const skillLevels = [
    "All Skill Levels",
    "Recreational",
    "Intermediate",
    "Intermediate Plus",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaguesRes = await fetch(
          "/api/leagues?depth=1&where[published][equals]=true&limit=100"
        );
        if (leaguesRes.ok) {
          const leaguesData = await leaguesRes.json();
          setLeagues(leaguesData.docs || []);
        }

        const sportsRes = await fetch("/api/sports?limit=100");
        if (sportsRes.ok) {
          const sportsData = await sportsRes.json();
          setSports(sportsData.docs || []);
        }

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

    fetchData();
  }, []);

  const clearFilters = () => {
    setShowOpenOnly(false);
    setSelectedSport("All Sports");
    setSelectedLocation("All Locations");
    setSelectedDay("All Days");
    setSelectedSkill("All Skill Levels");
  };

  const hasActiveFilters =
    showOpenOnly ||
    selectedSport !== "All Sports" ||
    selectedLocation !== "All Locations" ||
    selectedDay !== "All Days" ||
    selectedSkill !== "All Skill Levels";

  const sportOptions = ["All Sports", ...sports.map((s) => s.name)];
  const locationOptions = ["All Locations", ...locations.map((l) => l.name)];

  const filteredLeagues = leagues.filter((league) => {
    if (showOpenOnly && league.registrationStatus === "full") return false;
    if (selectedSport !== "All Sports" && league.sport?.name !== selectedSport)
      return false;
    if (
      selectedLocation !== "All Locations" &&
      league.location?.name !== selectedLocation
    )
      return false;
    if (
      selectedDay !== "All Days" &&
      !league.dayOfWeek?.some(
        (d) => d.toLowerCase() === selectedDay.toLowerCase()
      )
    )
      return false;
    if (selectedSkill !== "All Skill Levels") {
      const skillMap: Record<string, string> = {
        Recreational: "recreational",
        Intermediate: "intermediate",
        "Intermediate Plus": "intermediate-plus",
      };
      if (!league.skillLevel?.includes(skillMap[selectedSkill])) return false;
    }
    return true;
  });

  const groupedLeagues = filteredLeagues.reduce(
    (acc, league) => {
      const sportName = league.sport?.name || "Other";
      if (!acc[sportName]) {
        acc[sportName] = [];
      }
      acc[sportName].push(league);
      return acc;
    },
    {} as Record<string, League[]>
  );

  const formatSkillLevel = (levels: string[]) => {
    const displayMap: Record<string, string> = {
      recreational: "Rec",
      intermediate: "Int",
      "intermediate-plus": "Int+",
    };
    return levels.map((l) => displayMap[l] || l).join(" · ");
  };

  const formatDayOfWeek = (days: string[]) => {
    return days
      .map((d) => d.charAt(0).toUpperCase() + d.slice(1) + "s")
      .join(", ");
  };

  const formatDayOfWeekShort = (days: string[]) => {
    const shortDays: Record<string, string> = {
      monday: "Mon",
      tuesday: "Tue",
      wednesday: "Wed",
      thursday: "Thu",
      friday: "Fri",
      saturday: "Sat",
      sunday: "Sun",
    };
    return days.map((d) => shortDays[d.toLowerCase()] || d).join(", ");
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
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-5 lg:px-8 py-6 lg:py-8 border-b border-gray-100"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <h1 className="font-display text-urban-red text-2xl lg:text-3xl tracking-wider mb-2">
                  REGISTER YOUR TEAM
                </h1>
                <p className="text-gray-500 text-sm max-w-xl">
                  All spots are first-come first-serve. Browse available leagues
                  below and register your team today.
                </p>
              </div>
              <Link
                href="/register"
                className="text-urban-red text-xs font-medium hover:underline whitespace-nowrap"
              >
                Looking to join as an individual? →
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Filter Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="px-5 lg:px-8 py-4 border-b border-gray-100 bg-gray-50/50"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={showOpenOnly}
                  onChange={(e) => setShowOpenOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-urban-red focus:ring-urban-red"
                />
                <span className="text-gray-600 text-xs">Open only</span>
              </label>

              {/* Filter Dropdowns */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 flex-1">
                <FilterDropdown
                  label="Sports"
                  options={sportOptions}
                  value={selectedSport}
                  onChange={setSelectedSport}
                />
                <FilterDropdown
                  label="Locations"
                  options={locationOptions}
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                />
                <FilterDropdown
                  label="Days"
                  options={days}
                  value={selectedDay}
                  onChange={setSelectedDay}
                />
                <FilterDropdown
                  label="Skill Level"
                  options={skillLevels}
                  value={selectedSkill}
                  onChange={setSelectedSkill}
                />
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-gray-500 text-xs font-medium hover:text-urban-red transition-colors flex items-center gap-1 shrink-0"
                >
                  <X size={12} />
                  Clear
                </button>
              )}
            </div>

            {/* Results count */}
            <div className="mt-3 text-xs text-gray-400">
              {filteredLeagues.length}{" "}
              {filteredLeagues.length === 1 ? "league" : "leagues"} found
            </div>
          </div>
        </motion.section>

        {/* League Listings */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto">
            {/* Desktop Table Header - Fixed outside of sport groups */}
            <div className="hidden lg:block sticky top-[72px] z-20 bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 px-8 py-3">
                <div className="col-span-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  League
                </div>
                <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </div>
                <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </div>
                <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </div>
                <div className="col-span-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </div>
                <div className="col-span-2"></div>
              </div>
            </div>

            {Object.entries(groupedLeagues).map(
              ([sport, sportLeagues], groupIndex) => (
                <motion.div
                  key={sport}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + groupIndex * 0.1 }}
                >
                  {/* Sport Header */}
                  <div className="flex items-center gap-2 px-5 lg:px-8 py-3 bg-urban-dark">
                    <SportIcon sport={sport} className="w-4 h-4" />
                    <h3 className="font-display text-white text-sm tracking-wider">
                      {sport.toUpperCase()}
                    </h3>
                    <span className="text-gray-400 text-xs ml-1">
                      ({sportLeagues.length})
                    </span>
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden lg:block divide-y divide-gray-100">
                    {sportLeagues.map((league) => (
                      <div
                        key={league.id}
                        className="grid grid-cols-12 gap-4 px-8 py-4 hover:bg-gray-50/50 transition-colors items-center"
                      >
                        <div className="col-span-3">
                          <p className="text-sm font-medium text-urban-dark leading-tight">
                            {league.leagueName}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {formatSkillLevel(league.skillLevel || [])}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-gray-600">
                            {league.location?.name}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-gray-600">
                            {new Date(league.startDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                          <p className="text-xs text-gray-400">
                            {league.duration} ·{" "}
                            {formatDayOfWeek(league.dayOfWeek || [])}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-gray-600">
                            {league.timeStart} - {league.timeEnd}
                          </p>
                        </div>
                        <div className="col-span-1">
                          <p className="text-sm font-medium text-urban-dark">
                            ${league.costPerTeam?.toLocaleString()}
                          </p>
                        </div>
                        <div className="col-span-2 text-right">
                          {league.registrationStatus === "open" ? (
                            <Link href={`/register/${league.id}`}>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-5 py-2 bg-urban-red text-white text-xs font-medium tracking-wider rounded-sm hover:bg-urban-red/90 transition-colors"
                              >
                                REGISTER
                              </motion.button>
                            </Link>
                          ) : league.registrationStatus === "waitlist" ? (
                            <Link href={`/register/${league.id}`}>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-5 py-2 bg-gray-600 text-white text-xs font-medium tracking-wider rounded-sm hover:bg-gray-500 transition-colors"
                              >
                                WAITLIST
                              </motion.button>
                            </Link>
                          ) : (
                            <span className="px-5 py-2 bg-gray-100 text-gray-400 text-xs font-medium tracking-wider rounded-sm inline-block">
                              FULL
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile Card View */}
                  <div className="lg:hidden divide-y divide-gray-100">
                    {sportLeagues.map((league, index) => (
                      <motion.div
                        key={league.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.3 + index * 0.05,
                        }}
                        className="px-5 py-4"
                      >
                        <div className="flex flex-col gap-3">
                          {/* League Name & Skill */}
                          <div>
                            <h4 className="font-medium text-urban-dark text-sm leading-tight">
                              {league.leagueName}
                            </h4>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {formatSkillLevel(league.skillLevel || [])}
                            </p>
                          </div>

                          {/* Details Grid */}
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                              <p className="text-gray-400 mb-0.5">Location</p>
                              <p className="text-gray-600">
                                {league.location?.name}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400 mb-0.5">Start Date</p>
                              <p className="text-gray-600">
                                {new Date(league.startDate).toLocaleDateString(
                                  "en-US",
                                  { day: "2-digit", month: "short" }
                                )}
                                <span className="text-gray-400">
                                  {" "}
                                  · {league.duration}
                                </span>
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400 mb-0.5">Time</p>
                              <p className="text-gray-600">
                                {league.timeStart} - {league.timeEnd}
                              </p>
                              <p className="text-gray-400">
                                {formatDayOfWeekShort(league.dayOfWeek || [])}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400 mb-0.5">Cost</p>
                              <p className="text-urban-dark font-medium">
                                ${league.costPerTeam?.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          {/* Register Button */}
                          <div className="mt-1">
                            {league.registrationStatus === "open" ? (
                              <Link href={`/register/${league.id}`}>
                                <motion.div
                                  whileHover={{ scale: 1.01 }}
                                  whileTap={{ scale: 0.99 }}
                                  className="w-full py-2.5 bg-urban-red text-white font-medium text-xs tracking-wider rounded-sm text-center"
                                >
                                  REGISTER
                                </motion.div>
                              </Link>
                            ) : league.registrationStatus === "waitlist" ? (
                              <Link href={`/register/${league.id}`}>
                                <motion.div
                                  whileHover={{ scale: 1.01 }}
                                  whileTap={{ scale: 0.99 }}
                                  className="w-full py-2.5 bg-gray-600 text-white font-medium text-xs tracking-wider rounded-sm text-center"
                                >
                                  JOIN WAITLIST
                                </motion.div>
                              </Link>
                            ) : (
                              <div className="w-full py-2.5 bg-gray-100 text-gray-400 font-medium text-xs tracking-wider rounded-sm text-center">
                                FULL
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            )}

            {Object.keys(groupedLeagues).length === 0 && (
              <div className="px-5 py-16 text-center">
                <Search className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">
                  No leagues match your filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-3 text-urban-red text-sm font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
