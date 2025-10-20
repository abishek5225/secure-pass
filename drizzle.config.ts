import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env" }); // ensures it loads from root

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DB_URL!,
    ssl: false,
  },
});
