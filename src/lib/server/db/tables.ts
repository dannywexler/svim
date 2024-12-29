// import { relations } from "drizzle-orm";
import {
    text,
    // integer,
    sqliteTable,
} from "drizzle-orm/sqlite-core";

// const bool = () => integer({ mode: "boolean" }).notNull();
// const id = () => txt().primaryKey();
const txt = () => text().notNull();
// const string_array = () =>
//     text({ mode: "json" }).notNull().$type<Array<string>>();

export const UsersTable = sqliteTable("users", {
    name: txt(),
});
