import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import { Leagues } from "./payload/collections/Leagues";
import { Locations } from "./payload/collections/Locations";
import { Sports } from "./payload/collections/Sports";
import { TeamRegistrations } from "./payload/collections/TeamRegistrations";
import { Teams } from "./payload/collections/Teams";
import { Users } from "./payload/collections/Users";

export default buildConfig({
  collections: [Users, Sports, Locations, Leagues, Teams, TeamRegistrations],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "CHANGE-THIS-SECRET-IN-PRODUCTION",
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "",
  }),
});
