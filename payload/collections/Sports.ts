import type { CollectionConfig } from "payload";

export const Sports: CollectionConfig = {
  slug: "sports",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "minPlayers", "maxPlayers"],
  },
  access: {
    // Anyone can read sports
    read: () => true,
    // Only admins can create/update/delete
    create: ({ req }) => req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description:
          "URL-friendly identifier (e.g., basketball, indoor-soccer)",
      },
    },
    {
      name: "icon",
      type: "text",
      admin: {
        description:
          "Icon identifier for frontend (e.g., basketball, soccer, volleyball)",
      },
    },
    {
      name: "minPlayers",
      type: "number",
      required: true,
      defaultValue: 5,
      min: 1,
      admin: {
        description: "Minimum players required per team",
      },
    },
    {
      name: "maxPlayers",
      type: "number",
      required: true,
      defaultValue: 15,
      min: 1,
      admin: {
        description: "Maximum players allowed per team",
      },
    },
  ],
};
