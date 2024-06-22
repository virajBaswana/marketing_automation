import { boolean, pgTable, serial, text, time, timestamp, varchar } from "drizzle-orm/pg-core";

export const UserTable = pgTable("user", {
  user_id: serial("user_id").primaryKey(),
  email: varchar("email" , {length: 256}).notNull().unique(),
  password: text("password").notNull(),
  is_deleted: boolean("is_deleted").default(false),
  created_at: timestamp("created_at" , {withTimezone : true}).defaultNow(),
  updated_at: timestamp("updated_at" , {withTimezone : true}).defaultNow()
});

export type User = typeof UserTable.$inferSelect; // return type when queried
export type NewUser = typeof UserTable.$inferInsert; // insert type
