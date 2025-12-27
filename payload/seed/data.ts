/**
 * Seed Data for Urban Rec
 *
 * Run this after setting up your database to populate with initial data.
 * Usage: npx ts-node --esm payload/seed/seed.ts
 *
 * Or import and call seedDatabase() from a custom endpoint.
 */

// ============================================================================
// SPORTS DATA
// ============================================================================
export const sportsData = [
  {
    name: "Basketball",
    slug: "basketball",
    icon: "basketball",
    minPlayers: 5,
    maxPlayers: 15,
  },
  {
    name: "Dodgeball",
    slug: "dodgeball",
    icon: "circle",
    minPlayers: 5,
    maxPlayers: 15,
  },
  {
    name: "Flag Football",
    slug: "flag-football",
    icon: "football",
    minPlayers: 5,
    maxPlayers: 15,
  },
  {
    name: "Floor Hockey",
    slug: "floor-hockey",
    icon: "hockey",
    minPlayers: 5,
    maxPlayers: 15,
  },
  {
    name: "Indoor Soccer",
    slug: "indoor-soccer",
    icon: "soccer",
    minPlayers: 5,
    maxPlayers: 15,
  },
  {
    name: "Indoor Volleyball",
    slug: "indoor-volleyball",
    icon: "volleyball",
    minPlayers: 5,
    maxPlayers: 15,
  },
  {
    name: "Soccer",
    slug: "soccer",
    icon: "soccer",
    minPlayers: 5,
    maxPlayers: 15,
  },
];

// ============================================================================
// LOCATIONS DATA
// ============================================================================
export const locationsData = [
  {
    name: "Richmond Olympic Oval",
    address: "6111 River Rd, Richmond, BC",
    region: "richmond",
  },
  {
    name: "Christine Sinclair Community Centre - Gym",
    address: "2020 Willlingdon Ave, Burnaby, BC",
    region: "burnaby",
  },
  {
    name: "Jules Quesnel Elementary School",
    address: "3050 Crown St, Vancouver, BC",
    region: "vancouver",
  },
  {
    name: "Lord Roberts Elementary School",
    address: "1100 Bidwell St, Vancouver, BC",
    region: "vancouver",
  },
  {
    name: "Wolfe School",
    address: "5170 Champlain Cres, Vancouver, BC",
    region: "vancouver",
  },
  {
    name: "Brock Elementary School",
    address: "4860 Main St, Vancouver, BC",
    region: "vancouver",
  },
  {
    name: "Renfrew Community Park",
    address: "2929 E 22nd Ave, Vancouver, BC",
    region: "vancouver",
  },
  {
    name: "Slocan Park",
    address: "2750 E 29th Ave, Vancouver, BC",
    region: "vancouver",
  },
  {
    name: "Renfrew School",
    address: "2250 Charles St, Vancouver, BC",
    region: "vancouver",
  },
  {
    name: "Secord School",
    address: "2601 Napier St, Vancouver, BC",
    region: "vancouver",
  },
  {
    name: "Selkirk Elementary School",
    address: "1750 E 22nd Ave, Vancouver, BC",
    region: "vancouver",
  },
  {
    name: "Italian Cultural Centre",
    address: "3075 Slocan St, Vancouver, BC",
    region: "vancouver",
  },
  {
    name: "Robert F. Osborne Centre (UBC)",
    address: "6108 Thunderbird Blvd, Vancouver, BC",
    region: "ubc",
  },
  {
    name: "Burnaby West Fields",
    address: "7350 Government Rd, Burnaby, BC",
    region: "burnaby",
  },
  {
    name: "Empire Fields",
    address: "655 Hastings Park, Vancouver, BC",
    region: "vancouver",
  },
  {
    name: "Memorial South Turf Field",
    address: "3990 E Pender St, Vancouver, BC",
    region: "vancouver",
  },
  {
    name: "Trillium Fields Complex",
    address: "590 E 42nd Ave, Vancouver, BC",
    region: "vancouver",
  },
  {
    name: "Jericho Park West",
    address: "3451 Point Grey Rd, Vancouver, BC",
    region: "vancouver",
  },
];

// ============================================================================
// LEAGUES DATA
// Note: sport and location will be resolved to IDs during seeding
// ============================================================================
export const leaguesData = [
  {
    leagueName: "Richmond Oval-Tuesday Individual Basketball",
    sportSlug: "basketball",
    skillLevel: ["recreational"],
    locationName: "Richmond Olympic Oval",
    startDate: "2026-01-06",
    duration: "12 weeks",
    dayOfWeek: ["tuesday"],
    timeStart: "7:00 PM",
    timeEnd: "11:00 PM",
    costPerTeam: 195,
    maxTeams: 12,
    registrationStatus: "full",
    published: true,
  },
  {
    leagueName: "Burnaby Sinclair Wednesday Individual Basketball",
    sportSlug: "basketball",
    skillLevel: ["recreational"],
    locationName: "Christine Sinclair Community Centre - Gym",
    startDate: "2026-01-07",
    duration: "12 weeks",
    dayOfWeek: ["wednesday"],
    timeStart: "10:00 PM",
    timeEnd: "11:30 PM",
    costPerTeam: 145,
    maxTeams: 10,
    registrationStatus: "full",
    published: true,
  },
  {
    leagueName: "Richmond Oval Wednesday Basketball",
    sportSlug: "basketball",
    skillLevel: ["recreational", "intermediate"],
    locationName: "Richmond Olympic Oval",
    startDate: "2026-01-07",
    duration: "12 weeks",
    dayOfWeek: ["wednesday"],
    timeStart: "8:00 PM",
    timeEnd: "11:00 PM",
    costPerTeam: 1450,
    maxTeams: 12,
    registrationStatus: "full",
    published: true,
  },
  {
    leagueName: "Richmond Oval Thursday Basketball",
    sportSlug: "basketball",
    skillLevel: ["recreational", "intermediate"],
    locationName: "Richmond Olympic Oval",
    startDate: "2026-01-08",
    duration: "12 weeks",
    dayOfWeek: ["thursday"],
    timeStart: "7:00 PM",
    timeEnd: "11:00 PM",
    costPerTeam: 1450,
    maxTeams: 12,
    registrationStatus: "waitlist",
    published: true,
  },
  {
    leagueName: "Vancouver West Side Monday - DB",
    sportSlug: "dodgeball",
    skillLevel: ["recreational", "intermediate"],
    locationName: "Jules Quesnel Elementary School",
    startDate: "2026-01-05",
    duration: "10 weeks",
    dayOfWeek: ["monday"],
    timeStart: "6:00 PM",
    timeEnd: "10:00 PM",
    costPerTeam: 835,
    maxTeams: 16,
    registrationStatus: "open",
    published: true,
  },
  {
    leagueName: "Vancouver Downtown Tuesday - DB",
    sportSlug: "dodgeball",
    skillLevel: ["recreational", "intermediate"],
    locationName: "Lord Roberts Elementary School",
    startDate: "2026-01-06",
    duration: "12 weeks",
    dayOfWeek: ["tuesday"],
    timeStart: "6:00 PM",
    timeEnd: "10:00 PM",
    costPerTeam: 995,
    maxTeams: 16,
    registrationStatus: "open",
    published: true,
  },
  {
    leagueName: "Vancouver East Side Tuesday - DB",
    sportSlug: "dodgeball",
    skillLevel: ["recreational", "intermediate"],
    locationName: "Wolfe School",
    startDate: "2026-01-06",
    duration: "12 weeks",
    dayOfWeek: ["tuesday"],
    timeStart: "6:00 PM",
    timeEnd: "10:00 PM",
    costPerTeam: 995,
    maxTeams: 16,
    registrationStatus: "open",
    published: true,
  },
  {
    leagueName: "General Brock/Slocan Sunday Flag Football",
    sportSlug: "flag-football",
    skillLevel: ["recreational", "intermediate"],
    locationName: "Renfrew Community Park",
    startDate: "2026-01-04",
    duration: "12 weeks",
    dayOfWeek: ["sunday"],
    timeStart: "12:00 PM",
    timeEnd: "6:00 PM",
    costPerTeam: 1095,
    maxTeams: 12,
    registrationStatus: "open",
    published: true,
  },
  {
    leagueName: "Vancouver East Monday - FH",
    sportSlug: "floor-hockey",
    skillLevel: ["recreational", "intermediate", "intermediate-plus"],
    locationName: "Renfrew School",
    startDate: "2026-01-05",
    duration: "10 weeks",
    dayOfWeek: ["monday"],
    timeStart: "6:00 PM",
    timeEnd: "10:00 PM",
    costPerTeam: 1165,
    maxTeams: 12,
    registrationStatus: "open",
    published: true,
  },
  {
    leagueName: "Richmond Oval Tuesday - FH",
    sportSlug: "floor-hockey",
    skillLevel: ["recreational", "intermediate", "intermediate-plus"],
    locationName: "Richmond Olympic Oval",
    startDate: "2026-01-06",
    duration: "12 weeks",
    dayOfWeek: ["tuesday"],
    timeStart: "7:00 PM",
    timeEnd: "11:00 PM",
    costPerTeam: 1450,
    maxTeams: 12,
    registrationStatus: "open",
    published: true,
  },
  {
    leagueName: "Vancouver East Tuesday - FH",
    sportSlug: "floor-hockey",
    skillLevel: ["recreational", "intermediate", "intermediate-plus"],
    locationName: "Renfrew School",
    startDate: "2026-01-06",
    duration: "12 weeks",
    dayOfWeek: ["tuesday"],
    timeStart: "6:00 PM",
    timeEnd: "10:00 PM",
    costPerTeam: 1395,
    maxTeams: 12,
    registrationStatus: "full",
    published: true,
  },
  {
    leagueName: "Italian Cultural Centre - 3on3 Indoor Turf Soccer",
    sportSlug: "indoor-soccer",
    skillLevel: ["recreational", "intermediate"],
    locationName: "Italian Cultural Centre",
    startDate: "2026-01-04",
    duration: "11 weeks",
    dayOfWeek: ["sunday"],
    timeStart: "6:00 PM",
    timeEnd: "10:00 PM",
    costPerTeam: 1295,
    maxTeams: 16,
    registrationStatus: "open",
    published: true,
  },
  {
    leagueName: "Christine Sinclair Centre Mon/Tues Coed 6s",
    sportSlug: "indoor-volleyball",
    skillLevel: ["recreational", "intermediate"],
    locationName: "Christine Sinclair Community Centre - Gym",
    startDate: "2026-01-05",
    duration: "12 weeks",
    dayOfWeek: ["monday", "tuesday"],
    timeStart: "10:00 PM",
    timeEnd: "11:30 PM",
    costPerTeam: 1295,
    maxTeams: 12,
    registrationStatus: "open",
    published: true,
  },
  {
    leagueName: "Osborne Centre Coed 6s Sunday",
    sportSlug: "indoor-volleyball",
    skillLevel: ["recreational", "intermediate", "intermediate-plus"],
    locationName: "Robert F. Osborne Centre (UBC)",
    startDate: "2026-01-04",
    duration: "12 weeks",
    dayOfWeek: ["sunday"],
    timeStart: "7:00 PM",
    timeEnd: "11:00 PM",
    costPerTeam: 1295,
    maxTeams: 12,
    registrationStatus: "full",
    published: true,
  },
  {
    leagueName: "Empire/Burnaby West Sunday",
    sportSlug: "soccer",
    skillLevel: ["recreational", "intermediate", "intermediate-plus"],
    locationName: "Empire Fields",
    startDate: "2026-01-04",
    duration: "11 weeks",
    dayOfWeek: ["sunday"],
    timeStart: "8:00 PM",
    timeEnd: "11:00 PM",
    costPerTeam: 1550,
    maxTeams: 16,
    registrationStatus: "open",
    published: true,
  },
  {
    leagueName: "Memorial South Sunday",
    sportSlug: "soccer",
    skillLevel: ["recreational", "intermediate", "intermediate-plus"],
    locationName: "Memorial South Turf Field",
    startDate: "2026-01-04",
    duration: "11 weeks",
    dayOfWeek: ["sunday"],
    timeStart: "6:00 PM",
    timeEnd: "10:00 PM",
    costPerTeam: 1550,
    maxTeams: 16,
    registrationStatus: "open",
    published: true,
  },
  {
    leagueName: "Sunday Trillium/Jericho West Soccer",
    sportSlug: "soccer",
    skillLevel: ["recreational", "intermediate", "intermediate-plus"],
    locationName: "Trillium Fields Complex",
    startDate: "2026-01-04",
    duration: "12 weeks",
    dayOfWeek: ["sunday"],
    timeStart: "8:00 PM",
    timeEnd: "11:00 PM",
    costPerTeam: 1650,
    maxTeams: 16,
    registrationStatus: "open",
    published: true,
  },
  {
    leagueName: "Empire Fields Tuesday",
    sportSlug: "soccer",
    skillLevel: ["recreational", "intermediate", "intermediate-plus"],
    locationName: "Empire Fields",
    startDate: "2026-01-06",
    duration: "12 weeks",
    dayOfWeek: ["tuesday"],
    timeStart: "8:00 PM",
    timeEnd: "11:00 PM",
    costPerTeam: 1650,
    maxTeams: 16,
    registrationStatus: "open",
    published: true,
  },
];

// ============================================================================
// SEED FUNCTION
// ============================================================================
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function seedDatabase(payload: any) {
  console.log("🌱 Starting database seed...");

  // Clear existing data (optional - comment out if you want to preserve data)
  // await payload.delete({ collection: 'team-registrations', where: {} })
  // await payload.delete({ collection: 'teams', where: {} })
  // await payload.delete({ collection: 'leagues', where: {} })
  // await payload.delete({ collection: 'locations', where: {} })
  // await payload.delete({ collection: 'sports', where: {} })

  // 1. Seed Sports
  console.log("📊 Seeding sports...");
  const sportMap: Record<string, string> = {};
  for (const sport of sportsData) {
    const existing = await payload.find({
      collection: "sports",
      where: { slug: { equals: sport.slug } },
    });

    if (existing.totalDocs === 0) {
      const created = await payload.create({
        collection: "sports",
        data: sport,
      });
      sportMap[sport.slug] = created.id;
      console.log(`  ✓ Created sport: ${sport.name}`);
    } else {
      sportMap[sport.slug] = existing.docs[0].id;
      console.log(`  - Sport exists: ${sport.name}`);
    }
  }

  // 2. Seed Locations
  console.log("📍 Seeding locations...");
  const locationMap: Record<string, string> = {};
  for (const location of locationsData) {
    const existing = await payload.find({
      collection: "locations",
      where: { name: { equals: location.name } },
    });

    if (existing.totalDocs === 0) {
      const created = await payload.create({
        collection: "locations",
        data: location,
      });
      locationMap[location.name] = created.id;
      console.log(`  ✓ Created location: ${location.name}`);
    } else {
      locationMap[location.name] = existing.docs[0].id;
      console.log(`  - Location exists: ${location.name}`);
    }
  }

  // 3. Seed Leagues
  console.log("🏆 Seeding leagues...");
  for (const league of leaguesData) {
    const existing = await payload.find({
      collection: "leagues",
      where: { leagueName: { equals: league.leagueName } },
    });

    if (existing.totalDocs === 0) {
      const sportId = sportMap[league.sportSlug];
      const locationId = locationMap[league.locationName];

      if (!sportId || !locationId) {
        console.log(`  ✗ Missing sport or location for: ${league.leagueName}`);
        continue;
      }

      await payload.create({
        collection: "leagues",
        data: {
          leagueName: league.leagueName,
          sport: sportId,
          skillLevel: league.skillLevel,
          location: locationId,
          startDate: league.startDate,
          duration: league.duration,
          dayOfWeek: league.dayOfWeek,
          timeStart: league.timeStart,
          timeEnd: league.timeEnd,
          costPerTeam: league.costPerTeam,
          maxTeams: league.maxTeams,
          registrationStatus: league.registrationStatus,
          published: league.published,
        },
      });
      console.log(`  ✓ Created league: ${league.leagueName}`);
    } else {
      console.log(`  - League exists: ${league.leagueName}`);
    }
  }

  console.log("✅ Database seed complete!");
}
