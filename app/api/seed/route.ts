import { leaguesData, locationsData, sportsData } from "@/payload/seed/data";
import config from "@payload-config";
import { NextResponse } from "next/server";
import { getPayload } from "payload";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    if (secret !== process.env.PAYLOAD_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await getPayload({ config });

    // Seed Sports
    const sportMap = new Map<string, string>();
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
        sportMap.set(sport.slug, String(created.id));
        console.log(`✓ Created sport: ${sport.name}`);
      } else {
        sportMap.set(sport.slug, String(existing.docs[0].id));
        console.log(`- Sport exists: ${sport.name}`);
      }
    }

    // Seed Locations
    const locationMap = new Map<string, string>();
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
        locationMap.set(location.name, String(created.id));
        console.log(`✓ Created location: ${location.name}`);
      } else {
        locationMap.set(location.name, String(existing.docs[0].id));
        console.log(`- Location exists: ${location.name}`);
      }
    }

    // Seed Leagues
    for (const league of leaguesData) {
      const existing = await payload.find({
        collection: "leagues",
        where: { leagueName: { equals: league.leagueName } },
      });

      if (existing.totalDocs === 0) {
        const sportId = sportMap.get(league.sportSlug);
        const locationId = locationMap.get(league.locationName);

        if (!sportId || !locationId) {
          console.log(`✗ Missing sport or location for: ${league.leagueName}`);
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
        console.log(`✓ Created league: ${league.leagueName}`);
      } else {
        console.log(`- League exists: ${league.leagueName}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded!",
      counts: {
        sports: sportsData.length,
        locations: locationsData.length,
        leagues: leaguesData.length,
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      {
        error: "Failed to seed",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "POST with ?secret=YOUR_SECRET to seed database",
  });
}
