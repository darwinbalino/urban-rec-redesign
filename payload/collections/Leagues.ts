import type { CollectionConfig } from "payload";

export const Leagues: CollectionConfig = {
  slug: "leagues",
  admin: {
    useAsTitle: "leagueName",
    defaultColumns: [
      "leagueName",
      "sport",
      "location",
      "startDate",
      "registrationStatus",
    ],
  },
  access: {
    // Public can read published leagues
    read: ({ req }) => {
      // Admins can see all
      if (req.user?.role === "admin") return true;
      // Public can only see published leagues
      return { published: { equals: true } };
    },
    // Only admins can create/update/delete
    create: ({ req }) => req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },
  fields: [
    {
      name: "leagueName",
      type: "text",
      required: true,
    },
    {
      name: "sport",
      type: "relationship",
      relationTo: "sports",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "skillLevel",
      type: "select",
      hasMany: true,
      required: true,
      options: [
        { label: "Recreational", value: "recreational" },
        { label: "Intermediate", value: "intermediate" },
        { label: "Intermediate Plus", value: "intermediate-plus" },
      ],
    },
    {
      name: "location",
      type: "relationship",
      relationTo: "locations",
      required: true,
    },
    {
      name: "startDate",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "d MMM yyyy",
        },
      },
    },
    {
      name: "duration",
      type: "text",
      required: true,
      admin: {
        placeholder: "e.g., 12 weeks",
      },
    },
    {
      name: "dayOfWeek",
      type: "select",
      hasMany: true,
      required: true,
      options: [
        { label: "Monday", value: "monday" },
        { label: "Tuesday", value: "tuesday" },
        { label: "Wednesday", value: "wednesday" },
        { label: "Thursday", value: "thursday" },
        { label: "Friday", value: "friday" },
        { label: "Saturday", value: "saturday" },
        { label: "Sunday", value: "sunday" },
      ],
    },
    {
      name: "timeStart",
      type: "text",
      required: true,
      admin: {
        placeholder: "e.g., 7:00 PM",
      },
    },
    {
      name: "timeEnd",
      type: "text",
      required: true,
      admin: {
        placeholder: "e.g., 11:00 PM",
      },
    },
    {
      name: "costPerTeam",
      type: "number",
      required: true,
      min: 0,
      admin: {
        description: "Cost in dollars (e.g., 1450 for $1,450)",
      },
    },
    {
      name: "maxTeams",
      type: "number",
      required: true,
      min: 1,
      defaultValue: 12,
      admin: {
        description: "Maximum number of teams allowed",
      },
    },
    {
      name: "registrationStatus",
      type: "select",
      required: true,
      defaultValue: "open",
      options: [
        { label: "Open", value: "open" },
        { label: "Waitlist", value: "waitlist" },
        { label: "Full", value: "full" },
        { label: "Closed", value: "closed" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Only published leagues are visible to the public",
      },
    },
  ],
};
