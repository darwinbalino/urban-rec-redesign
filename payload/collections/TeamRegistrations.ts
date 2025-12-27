import type { CollectionConfig } from "payload";

export const TeamRegistrations: CollectionConfig = {
  slug: "team-registrations",
  admin: {
    useAsTitle: "playerEmail",
    defaultColumns: ["playerEmail", "team", "status", "isCaptain"],
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
      return true;
    },
    delete: ({ req }) => {
      if (!req.user) return false;
      if (req.user.role === "admin") return true;
      return true;
    },
  },
  fields: [
    {
      name: "team",
      type: "relationship",
      relationTo: "teams",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      admin: {
        description: "Linked user account (if registered)",
      },
    },
    {
      name: "playerEmail",
      type: "email",
      required: true,
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "invited",
      options: [
        { label: "Invited", value: "invited" },
        { label: "Accepted", value: "accepted" },
        { label: "Declined", value: "declined" },
      ],
    },
    {
      name: "isCaptain",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Is this player the team captain?",
      },
    },
    {
      name: "invitedBy",
      type: "relationship",
      relationTo: "users",
      admin: {
        description: "Who invited this player",
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === "create" && data?.team) {
          const payload = req.payload;

          // Extract team ID if it's an object
          const teamId =
            typeof data.team === "object" &&
            data.team !== null &&
            "id" in data.team
              ? String(data.team.id)
              : String(data.team);

          // Check for duplicate email on this team
          const existingRegistrations = await payload.find({
            collection: "team-registrations",
            where: {
              and: [
                { team: { equals: teamId } },
                { playerEmail: { equals: data.playerEmail } },
              ],
            },
            depth: 0,
          });

          if (existingRegistrations.totalDocs > 0) {
            throw new Error("This email is already registered for this team");
          }

          // Count current players
          const currentPlayers = await payload.find({
            collection: "team-registrations",
            where: {
              team: { equals: teamId },
            },
            depth: 0,
          });

          const maxPlayers = 15;

          if (currentPlayers.totalDocs >= maxPlayers) {
            throw new Error(
              `Team has reached maximum capacity of ${maxPlayers} players`
            );
          }

          // Ensure we're storing just the ID strings
          return {
            ...data,
            team: teamId,
            user: data.user
              ? typeof data.user === "object" &&
                data.user !== null &&
                "id" in data.user
                ? String(data.user.id)
                : String(data.user)
              : undefined,
            invitedBy: data.invitedBy
              ? typeof data.invitedBy === "object" &&
                data.invitedBy !== null &&
                "id" in data.invitedBy
                ? String(data.invitedBy.id)
                : String(data.invitedBy)
              : undefined,
          };
        }

        return data;
      },
    ],
    beforeDelete: [
      async ({ id, req }) => {
        const payload = req.payload;

        const registration = await payload.findByID({
          collection: "team-registrations",
          id: id as string,
          depth: 0,
        });

        if (registration?.isCaptain) {
          throw new Error("Cannot remove the team captain");
        }
      },
    ],
  },
};
