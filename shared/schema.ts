import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const links = pgTable("links", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  enabled: boolean("enabled").notNull().default(true),
  order: serial("order"),
});

export const insertLinkSchema = createInsertSchema(links).pick({
  title: true,
  url: true,
  enabled: true,
});

export const chatConfig = pgTable("chat_config", {
  id: serial("id").primaryKey(),
  aiName: text("ai_name").notNull(),
  aiDescription: text("ai_description").notNull(),
  systemPrompt: text("system_prompt").notNull(),
});

export const insertChatConfigSchema = createInsertSchema(chatConfig).pick({
  aiName: true,
  aiDescription: true,
  systemPrompt: true,
});

export type InsertLink = z.infer<typeof insertLinkSchema>;
export type Link = typeof links.$inferSelect;
export type ChatConfig = typeof chatConfig.$inferSelect;
