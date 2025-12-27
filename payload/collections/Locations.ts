import type { CollectionConfig } from "payload";

export const Locations: CollectionConfig = {
  slug: "locations",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "region", "address"],
  },
  access: {
    // Anyone can read locations
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
    },
    {
      name: "address",
      type: "text",
      admin: {
        description: "Full street address",
      },
    },
    {
      name: "region",
      type: "select",
      required: true,
      options: [
        { label: "Vancouver", value: "vancouver" },
        { label: "Burnaby", value: "burnaby" },
        { label: "Richmond", value: "richmond" },
        { label: "UBC", value: "ubc" },
        { label: "Coquitlam", value: "coquitlam" },
        { label: "Surrey", value: "surrey" },
        { label: "Delta", value: "delta" },
        { label: "Langley", value: "langley" },
      ],
      defaultValue: "vancouver",
    },
  ],
};
