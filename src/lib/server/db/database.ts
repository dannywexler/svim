import { drizzle } from "drizzle-orm/better-sqlite3";
import SQLite from "better-sqlite3";
import * as schema from "$Tables";
const sqlite = new SQLite("./db/sqlite.db");
sqlite.pragma("journal_mode = WAL");

const db = drizzle(sqlite, { schema });

export const DB = {
    db,
};
