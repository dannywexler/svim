import { drizzle } from "drizzle-orm/better-sqlite3";
import SQLite from "better-sqlite3";
import { PluginsTable, type NewPlugin } from "$Tables";
import { ms, timer } from "fluent-ms";
const sqlite = new SQLite("./db/sqlite.db");
sqlite.pragma("journal_mode = WAL");

const db = drizzle(sqlite, { schema: { PluginsTable } });

export const DB = {
    Plugins: {
        all: timer("Finding all plugins", async () => {
            const res = await db.query.PluginsTable.findMany()
            console.log('Found', res.length, "plugins.")
            return res
        }),
        find: {
            byName: timer("Finding plugin by name", async (name: string) => db
                .query.PluginsTable.findFirst({
                    where: (tb, op) => op.eq(tb.name, name),
                })),

            byOwnerAndRepo: timer("Finding plugin by owner and repo", async (owner: string, repo: string) => db
                .query.PluginsTable.findFirst({
                    where: (tb, op) => op.and(op.eq(tb.owner, owner), op.eq(tb.repo, repo)),
                }))
        },
        create: timer("Creating new plugin", async (newPlugin: NewPlugin) => {
            db.insert(PluginsTable).values({ ...newPlugin, addedOn: ms() })
        })
    }
};
