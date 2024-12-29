import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dbCredentials: { url: "./db/db.sqlite" },
    dialect: "sqlite",
    schema: "./src/lib/server/db/tables.ts",
    strict: true,
    verbose: true,
});
