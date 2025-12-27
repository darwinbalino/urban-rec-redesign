import type { CollectionConfig } from "payload";

export const Teams: CollectionConfig = {
  slug: "teams",
  admin: {
    useAsTitle: "teamName",
    defaultColumns: ["teamName", "league", "captain", "createdAt"],
  },
  access: {
    create: ({ req }) => !!req.user,
    read: ({ req }) => {
      if (!req.user) return false;
      if (req.user.role === "admin") return true;
      return true;
    },
    update: ({ req }) => {
      if (!req.user) return false;
      if (req.user.role === "admin") return true;
      return { captain: { equals: req.user.id } };
    },
    delete: ({ req }) => req.user?.role === "admin",
  },
  fields: [
    {
      name: "teamName",
      type: "text",
      required: true,
    },
    {
      name: "league",
      type: "relationship",
      relationTo: "leagues",
      required: true,
    },
    {
      name: "captain",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: {
        description: "Team captain (manages roster)",
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === "create" && data?.league) {
          const payload = req.payload;

          // Extract league ID if it's an object
          const leagueId =
            typeof data.league === "object" &&
            data.league !== null &&
            "id" in data.league
              ? String(data.league.id)
              : String(data.league);

          // Get the league with depth 0 to avoid nested objects
          const league = await payload.findByID({
            collection: "leagues",
            id: leagueId,
            depth: 0,
          });

          if (!league) {
            throw new Error("League not found");
          }

          // Check registration status
          if (
            league.registrationStatus === "full" ||
            league.registrationStatus === "closed"
          ) {
            throw new Error("This league is not accepting new registrations");
          }

          // Count existing teams
          const existingTeams = await payload.find({
            collection: "teams",
            where: {
              league: { equals: leagueId },
            },
            depth: 0,
          });

          const maxTeams =
            typeof league.maxTeams === "number" ? league.maxTeams : 12;

          if (existingTeams.totalDocs >= maxTeams) {
            throw new Error("This league has reached maximum team capacity");
          }

          // Ensure we're storing just the ID string
          return {
            ...data,
            league: leagueId,
            captain:
              typeof data.captain === "object" &&
              data.captain !== null &&
              "id" in data.captain
                ? String(data.captain.id)
                : String(data.captain),
          };
        }

        return data;
      },
    ],
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === "create") {
          const payload = req.payload;

          // Extract league ID
          const leagueId =
            typeof doc.league === "object" &&
            doc.league !== null &&
            "id" in doc.league
              ? String(doc.league.id)
              : String(doc.league);

          const league = await payload.findByID({
            collection: "leagues",
            id: leagueId,
            depth: 0,
          });

          if (league) {
            const teamCount = await payload.find({
              collection: "teams",
              where: { league: { equals: leagueId } },
              depth: 0,
            });

            const maxTeams =
              typeof league.maxTeams === "number" ? league.maxTeams : 12;

            if (teamCount.totalDocs >= maxTeams) {
              await payload.update({
                collection: "leagues",
                id: leagueId,
                data: { registrationStatus: "full" },
              });
            }
          }
        }
      },
    ],
  },
};
