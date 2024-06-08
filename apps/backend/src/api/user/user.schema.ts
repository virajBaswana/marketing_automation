import { boolean, pgTable, serial, text, time, timestamp, varchar } from "drizzle-orm/pg-core";

export const UserTable = pgTable("user", {
  id: serial("id").primaryKey(),
  email: varchar("email" , {length: 256}),
  password: varchar("password", { length: 256 }),
  is_deleted: boolean("is_deleted").default(false),
  created_at: timestamp("created_at" , {withTimezone : true}).defaultNow(),
  updated_at: timestamp("updated_at" , {withTimezone : true}).defaultNow()
});

export type User = typeof UserTable.$inferSelect; // return type when queried
export type NewUser = typeof UserTable.$inferInsert; // insert type
