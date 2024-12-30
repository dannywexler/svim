import {
    text,
    integer,
    sqliteTable,
    customType
} from "drizzle-orm/sqlite-core";
import { type Ms, ms } from "fluent-ms";

const millis = customType<{ data: Ms, driverData: string }>({
    dataType: () => "string",
    toDriver: (val) => val.iso,
    fromDriver: (txt) => ms(new Date(txt).getTime())
})

// const bool = () => integer({ mode: "boolean" }).notNull();
// const id = () => txt().primaryKey();
const string_array = () =>
    text({ mode: "json" }).$type<Array<string>>();

export const PluginsTable = sqliteTable("plugins", {
    addedOn: millis().notNull(),
    branch: text().notNull(),
    build: text(),
    category: text().notNull(),
    cmd: string_array(),
    createdOn: millis().notNull(),
    dependencies: string_array(),
    description: text().notNull(),
    event: string_array(),
    ft: string_array(),
    name: text().notNull(),
    owner: text().notNull(),
    repo: text().notNull(),
    stars: integer().notNull(),
    updatedOn: millis().notNull(),
});

export type NewPlugin = Omit<typeof PluginsTable.$inferInsert, "addedOn">
export type PluginSelect = typeof PluginsTable.$inferInsert
