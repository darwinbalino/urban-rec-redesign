"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// League data scraped from urbanrec.ca
const leagueData = [
  {
    id: "1",
    sport: "Basketball",
    leagueName: "Richmond Oval-Tuesday Individual Basketball",
    skillLevel: ["Recreational"],
    location: "Richmond Olympic Oval",
    startDate: "06 Jan 2026",
    duration: "12 weeks",
    time: "7:00 PM - 11:00 PM",
    dayOfWeek: "Tuesday",
    cost: "$195.00 per Team",
    status: "full" as const,
  },
  {
    id: "2",
    sport: "Basketball",
    leagueName: "Burnaby Sinclair Wednesday Individual Basketball",
    skillLevel: ["Recreational"],
    location: "Christine Sinclair Community Centre - Gym",
    startDate: "07 Jan 2026",
    duration: "12 weeks",
    time: "10:00 PM - 11:30 PM",
    dayOfWeek: "Wednesday",
    cost: "$145.00 per Team",
    status: "full" as const,
  },
  {
    id: "3",
    sport: "Basketball",
    leagueName: "Richmond Oval Wednesday Basketball",
    skillLevel: ["Recreational", "Intermediate"],
    location: "Richmond Olympic Oval",
    startDate: "07 Jan 2026",
    duration: "12 weeks",
    time: "8:00 PM - 11:00 PM",
    dayOfWeek: "Wednesday",
    cost: "$1,450.00 per Team",
    status: "full" as const,
  },
  {
    id: "4",
    sport: "Basketball",
    leagueName: "Richmond Oval Thursday Basketball",
    skillLevel: ["Recreational", "Intermediate"],
    location: "Richmond Olympic Oval",
    startDate: "08 Jan 2026",
    duration: "12 weeks",
    time: "7:00 PM - 11:00 PM",
    dayOfWeek: "Thursday",
    cost: "$1,450.00 per Team",
    status: "waitlist" as const,
  },
  {
    id: "5",
    sport: "Dodgeball",
    leagueName: "Vancouver West Side Monday - DB",
    skillLevel: ["Recreational", "Intermediate"],
    location: "Jules Quesnel Elementary School",
    startDate: "05 Jan 2026",
    duration: "10 weeks",
    time: "6:00 PM - 10:00 PM",
    dayOfWeek: "Monday",
    cost: "$835.00 per Team",
    status: "open" as const,
  },
  {
    id: "6",
    sport: "Dodgeball",
    leagueName: "Vancouver Downtown Tuesday - DB",
    skillLevel: ["Recreational", "Intermediate"],
    location: "Lord Roberts Elementary School",
    startDate: "06 Jan 2026",
    duration: "12 weeks",
    time: "6:00 PM - 10:00 PM",
    dayOfWeek: "Tuesday",
    cost: "$995.00 per Team",
    status: "open" as const,
  },
  {
    id: "7",
    sport: "Dodgeball",
    leagueName: "Vancouver East Side Tuesday - DB",
    skillLevel: ["Recreational", "Intermediate"],
    location: "Wolfe School, Brock Elementary School",
    startDate: "06 Jan 2026",
    duration: "12 weeks",
    time: "6:00 PM - 10:00 PM",
    dayOfWeek: "Tuesday",
    cost: "$995.00 per Team",
    status: "open" as const,
  },
  {
    id: "8",
    sport: "Flag Football",
    leagueName: "General Brock/Slocan Sunday Flag Football",
    skillLevel: ["Recreational", "Intermediate"],
    location: "Renfrew Community Park, Slocan Park",
    startDate: "04 Jan 2026",
    duration: "12 weeks",
    time: "12:00 PM - 6:00 PM",
    dayOfWeek: "Sunday",
    cost: "$1,095.00 per Team",
    status: "open" as const,
  },
  {
    id: "9",
    sport: "Floor Hockey",
    leagueName: "Vancouver East Monday - FH",
    skillLevel: ["Recreational", "Intermediate", "Intermediate Plus"],
    location: "Renfrew School, Secord School",
    startDate: "05 Jan 2026",
    duration: "10 weeks",
    time: "6:00 PM - 10:00 PM",
    dayOfWeek: "Monday",
    cost: "$1,165.00 per Team",
    status: "open" as const,
  },
  {
    id: "10",
    sport: "Floor Hockey",
    leagueName: "Richmond Oval Tuesday - FH",
    skillLevel: ["Recreational", "Intermediate", "Intermediate Plus"],
    location: "Richmond Olympic Oval",
    startDate: "06 Jan 2026",
    duration: "12 weeks",
    time: "7:00 PM - 11:00 PM",
    dayOfWeek: "Tuesday",
    cost: "$1,450.00 per Team",
    status: "open" as const,
  },
  {
    id: "11",
    sport: "Floor Hockey",
    leagueName: "Vancouver East Tuesday - FH",
    skillLevel: ["Recreational", "Intermediate", "Intermediate Plus"],
    location: "Renfrew School, Selkirk Elementary School",
    startDate: "06 Jan 2026",
    duration: "12 weeks",
    time: "6:00 PM - 10:00 PM",
    dayOfWeek: "Tuesday",
    cost: "$1,395.00 per Team",
    status: "full" as const,
  },
  {
    id: "12",
    sport: "Indoor Soccer",
    leagueName: "Italian Cultural Centre - 3on3 Indoor Turf Soccer",
    skillLevel: ["Recreational", "Intermediate"],
    location: "Italian Cultural Centre",
    startDate: "04 Jan 2026",
    duration: "11 weeks",
    time: "6:00 PM - 10:00 PM",
    dayOfWeek: "Sunday",
    cost: "$1,295.00 per Team",
    status: "open" as const,
  },
  {
    id: "13",
    sport: "Indoor Volleyball",
    leagueName: "Christine Sinclair Centre Mon/Tues Coed 6s",
    skillLevel: ["Recreational", "Intermediate"],
    location: "Christine Sinclair Community Centre - Gym",
    startDate: "05 Jan 2026",
    duration: "12 weeks",
    time: "10:00 PM - 11:30 PM",
    dayOfWeek: "Monday, Tuesday",
    cost: "$1,295.00 per Team",
    status: "open" as const,
  },
  {
    id: "14",
    sport: "Indoor Volleyball",
    leagueName: "Osborne Centre Coed 6s Sunday",
    skillLevel: ["Recreational", "Intermediate", "Intermediate Plus"],
    location: "Robert F. Osborne Centre (UBC)",
    startDate: "04 Jan 2026",
    duration: "12 weeks",
    time: "7:00 PM - 11:00 PM",
    dayOfWeek: "Sunday",
    cost: "$1,295.00 per Team",
    status: "full" as const,
  },
  {
    id: "15",
    sport: "Soccer",
    leagueName: "Empire/Burnaby West Sunday",
    skillLevel: ["Recreational", "Intermediate", "Intermediate Plus"],
    location: "Burnaby West Fields, Empire Fields",
    startDate: "04 Jan 2026",
    duration: "11 weeks",
    time: "8:00 PM - 11:00 PM",
    dayOfWeek: "Sunday",
    cost: "$1,550.00 per Team",
    status: "open" as const,
  },
  {
    id: "16",
    sport: "Soccer",
    leagueName: "Memorial South Sunday",
    skillLevel: ["Recreational", "Intermediate", "Intermediate Plus"],
    location: "Memorial South Turf Field",
    startDate: "04 Jan 2026",
    duration: "11 weeks",
    time: "6:00 PM - 10:00 PM",
    dayOfWeek: "Sunday",
    cost: "$1,550.00 per Team",
    status: "open" as const,
  },
  {
    id: "17",
    sport: "Soccer",
    leagueName: "Sunday Trillium/Jericho West Soccer",
    skillLevel: ["Recreational", "Intermediate", "Intermediate Plus"],
    location: "Trillium Fields Complex, Jericho Park West",
    startDate: "04 Jan 2026",
    duration: "12 weeks",
    time: "8:00 PM - 11:00 PM",
    dayOfWeek: "Sunday",
    cost: "$1,650.00 per Team",
    status: "open" as const,
  },
  {
    id: "18",
    sport: "Soccer",
    leagueName: "Empire Fields Tuesday",
    skillLevel: ["Recreational", "Intermediate", "Intermediate Plus"],
    location: "Empire Fields",
    startDate: "06 Jan 2026",
    duration: "12 weeks",
    time: "8:00 PM - 11:00 PM",
    dayOfWeek: "Tuesday",
    cost: "$1,650.00 per Team",
    status: "open" as const,
  },
];

const sports = [
  "All Sports",
  "Basketball",
  "Dodgeball",
  "Flag Football",
  "Floor Hockey",
  "Indoor Soccer",
  "Indoor Volleyball",
  "Soccer",
];
const locations = [
  "All Locations",
  "Richmond Olympic Oval",
  "Christine Sinclair Community Centre",
  "Jules Quesnel Elementary School",
  "Lord Roberts Elementary School",
  "Renfrew School",
  "Italian Cultural Centre",
  "Robert F. Osborne Centre (UBC)",
  "Empire Fields",
  "Memorial South Turf Field",
];
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

// Sport icons as simple SVG components
const SportIcon = ({ sport }: { sport: string }) => {
  const iconClass = "w-5 h-5 text-white";

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
        className="w-full py-3 px-4 bg-urban-red text-white font-medium text-sm flex items-center justify-between rounded-sm"
      >
        <span>{value || label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} />
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
                  className={`w-full py-3 px-4 text-left text-sm transition-colors ${
                    value === option
                      ? "bg-urban-red text-white"
                      : "text-urban-dark hover:bg-gray-100"
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
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [selectedSport, setSelectedSport] = useState("All Sports");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedDay, setSelectedDay] = useState("All Days");
  const [selectedSkill, setSelectedSkill] = useState("All Skill Levels");

  const clearFilters = () => {
    setShowOpenOnly(false);
    setSelectedSport("All Sports");
    setSelectedLocation("All Locations");
    setSelectedDay("All Days");
    setSelectedSkill("All Skill Levels");
  };

  // Filter leagues
  const filteredLeagues = leagueData.filter((league) => {
    if (showOpenOnly && league.status === "full") return false;
    if (selectedSport !== "All Sports" && league.sport !== selectedSport)
      return false;
    if (
      selectedLocation !== "All Locations" &&
      !league.location.includes(selectedLocation.split(" - ")[0])
    )
      return false;
    if (selectedDay !== "All Days" && !league.dayOfWeek.includes(selectedDay))
      return false;
    if (
      selectedSkill !== "All Skill Levels" &&
      !league.skillLevel.includes(selectedSkill)
    )
      return false;
    return true;
  });

  // Group by sport
  const groupedLeagues = filteredLeagues.reduce((acc, league) => {
    if (!acc[league.sport]) {
      acc[league.sport] = [];
    }
    acc[league.sport].push(league);
    return acc;
  }, {} as Record<string, typeof leagueData>);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="pt-[72px]">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-5 py-8 border-b border-gray-100"
        >
          <h1 className="font-display text-urban-red text-4xl tracking-wider mb-3">
            REGISTER TEAM
          </h1>
          <p className="text-urban-dark text-sm leading-relaxed mb-3">
            All spots are first-come first-serve. Only the leagues that have
            availability will be visible.
          </p>
          <Link
            href="/leagues"
            className="text-urban-red text-sm font-medium hover:underline"
          >
            To sign up as an individual, please click here.
          </Link>
        </motion.section>

        {/* Filter Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="px-5 py-6 border-b border-gray-100"
        >
          <h2 className="font-display text-urban-dark text-xl tracking-wider mb-4">
            FILTER YOUR SEARCH
          </h2>

          {/* Checkbox */}
          <label className="flex items-center gap-3 mb-5 cursor-pointer">
            <input
              type="checkbox"
              checked={showOpenOnly}
              onChange={(e) => setShowOpenOnly(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-urban-red focus:ring-urban-red"
            />
            <span className="text-urban-dark text-sm">
              Show open for registration only
            </span>
          </label>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <FilterDropdown
              label="Sports"
              options={sports}
              value={selectedSport}
              onChange={setSelectedSport}
            />
            <FilterDropdown
              label="Locations"
              options={locations}
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
          <button
            onClick={clearFilters}
            className="text-urban-dark text-sm font-medium hover:text-urban-red transition-colors flex items-center gap-1"
          >
            <X size={16} />
            Clear Filters
          </button>
        </motion.section>

        {/* League Listings */}
        <section className="pb-20">
          {Object.entries(groupedLeagues).map(
            ([sport, leagues], groupIndex) => (
              <motion.div
                key={sport}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + groupIndex * 0.1 }}
              >
                {/* Sport Header */}
                <div className="flex items-center gap-3 px-5 py-4 bg-urban-dark">
                  <SportIcon sport={sport} />
                  <h3 className="font-display text-white text-xl tracking-wider">
                    {sport.toUpperCase()}
                  </h3>
                </div>

                {/* League Rows */}
                {leagues.map((league, index) => (
                  <motion.div
                    key={league.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                    className="px-5 py-4 border-b border-gray-100"
                  >
                    <div className="flex flex-col gap-4">
                      {/* League Name & Skill */}
                      <div>
                        <h4 className="font-medium text-urban-dark text-base leading-tight mb-1">
                          {league.leagueName}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {league.skillLevel.join(", ")}
                        </p>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {/* Location */}
                        <div>
                          <p className="text-gray-400 text-xs mb-0.5">
                            Location
                          </p>
                          <p className="text-urban-dark">{league.location}</p>
                        </div>

                        {/* Start Date */}
                        <div>
                          <p className="text-gray-400 text-xs mb-0.5">
                            Start Date
                          </p>
                          <p className="text-urban-dark">{league.startDate}</p>
                          <p className="text-urban-dark text-xs">
                            {league.duration}
                          </p>
                        </div>

                        {/* Time */}
                        <div>
                          <p className="text-gray-400 text-xs mb-0.5">Time</p>
                          <p className="text-urban-dark">{league.time}</p>
                          <p className="text-urban-dark text-xs">
                            {league.dayOfWeek}
                          </p>
                        </div>

                        {/* Cost */}
                        <div>
                          <p className="text-gray-400 text-xs mb-0.5">Cost</p>
                          <p className="text-urban-dark font-semibold">
                            {league.cost}
                          </p>
                        </div>
                      </div>

                      {/* Register Button */}
                      <div className="mt-1">
                        {league.status === "open" ? (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 bg-urban-red text-white font-display text-lg tracking-wider rounded-sm"
                          >
                            REGISTER
                          </motion.button>
                        ) : league.status === "waitlist" ? (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 bg-gray-600 text-white font-display text-lg tracking-wider rounded-sm"
                          >
                            JOIN WAITLIST
                          </motion.button>
                        ) : (
                          <div className="w-full py-3 bg-gray-200 text-gray-500 font-display text-lg tracking-wider rounded-sm text-center">
                            FULL
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )
          )}

          {Object.keys(groupedLeagues).length === 0 && (
            <div className="px-5 py-16 text-center">
              <p className="text-gray-500">No leagues match your filters.</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-urban-red font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </main>
  );
}
