import { pgTable, uuid, text, varchar, timestamp, pgEnum, jsonb } from "drizzle-orm/pg-core";

export const tierEnum = pgEnum("tier", ["free", "starter", "pro", "enterprise"]);
export const scanStatusEnum = pgEnum("scan_status", ["pending", "scanning", "complete", "failed"]);
export const checklistStatusEnum = pgEnum("checklist_status", ["not_started", "in_progress", "complete"]);
export const frameworkEnum = pgEnum("framework", ["soc2", "eu_ai_act"]);
export const severityEnum = pgEnum("severity", ["critical", "high", "medium", "low"]);
export const policyTypeEnum = pgEnum("policy_type", ["ai_usage", "data_handling", "model_governance"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  passwordHash: text("password_hash").notNull(),
  company: varchar("company", { length: 255 }),
  tier: tierEnum("tier").default("free").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const scans = pgTable("scans", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  repoUrl: text("repo_url").notNull(),
  status: scanStatusEnum("status").default("pending").notNull(),
  findingsJson: jsonb("findings_json"),
  scannedAt: timestamp("scanned_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const checklistItems = pgTable("checklist_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  framework: frameworkEnum("framework").notNull(),
  itemText: text("item_text").notNull(),
  status: checklistStatusEnum("status").default("not_started").notNull(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const risks = pgTable("risks", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  scanId: uuid("scan_id").references(() => scans.id),
  category: varchar("category", { length: 255 }).notNull(),
  severity: severityEnum("severity").notNull(),
  description: text("description").notNull(),
  mitigation: text("mitigation").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const policies = pgTable("policies", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id).notNull(),
  type: policyTypeEnum("type").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  generatedAt: timestamp("generated_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
