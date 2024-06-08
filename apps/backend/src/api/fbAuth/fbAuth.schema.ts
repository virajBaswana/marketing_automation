import { boolean, integer, pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";
import { UserTable } from "../user/user.schema";

export const FbAuthTable = pgTable("fb_auth", {
  id: serial("id").primaryKey().notNull(),
  user_id: integer("user_id").references(() => UserTable.id),
  token: text("token").notNull(),
  is_deleted: boolean("is_deleted").default(false),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type AppAuth = typeof FbAuthTable.$inferSelect; // return type when queried
export type NewAppAuth = typeof FbAuthTable.$inferInsert; // insert type
