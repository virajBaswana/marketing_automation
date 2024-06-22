import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { UserTable } from "../user/user.schema";
import { string } from "zod";
import { varchar } from "drizzle-orm/pg-core";

export const MetaUserTable = pgTable("meta_user", {
  id: serial("id").primaryKey().notNull(),
  user_id: integer("user_id").references(() => UserTable.user_id, {
    onDelete: "cascade",
  }),
  user_token: text("user_token").notNull(),
  is_deleted: boolean("is_deleted").default(false),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type MetaUserAuth = typeof MetaUserTable.$inferSelect; // return type when queried
export type NewMetaUserAuth = typeof MetaUserTable.$inferInsert; // insert type
export const MetaPageTable = pgTable("meta_page", {
  id: serial("id").primaryKey().notNull(),
  user_id: integer("user_id").references(() => UserTable.user_id, {
    onDelete: "cascade",
  }),
  page_token: text("page_token").notNull(),
  page_id: varchar("page_id", { length: 256 }),
  insta_id: varchar("insta_id", { length: 256 }),
  meta_id: varchar("meta_id", { length: 256 }),
  is_deleted: boolean("is_deleted").default(false),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type MetaPageAuth = typeof MetaPageTable.$inferSelect; // return type when queried
export type NewMetaPageAuth = typeof MetaPageTable.$inferInsert; // insert type
