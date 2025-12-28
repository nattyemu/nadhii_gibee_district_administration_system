// db/schema.js
import {
  mysqlTable,
  int,
  varchar,
  text,
  boolean,
  json,
  datetime,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

// ==================== Administrator Schema ====================
export const administrators = mysqlTable(
  "administrators",
  {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 100 }).notNull(),
    title: varchar("title", { length: 200 }).notNull(),
    image: varchar("image", { length: 500 }).notNull(),
    bio: varchar("bio", { length: 2000 }).notNull(),
    message: varchar("message", { length: 1000 }).notNull(),
    tenure: varchar("tenure", { length: 50 }).notNull(),
    email: varchar("email", { length: 100 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull(),
    office: varchar("office", { length: 200 }).notNull(),
    achievements: json("achievements"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (t) => [uniqueIndex("email_idx").on(t.email)]
);

// ==================== Cabine Schema ====================
export const cabines = mysqlTable(
  "cabines",
  {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 100 }).notNull().unique(),
    title: varchar("title", { length: 200 }).notNull(),
    position: varchar("position", { length: 100 }).notNull(),
    image: varchar("image", { length: 500 }).notNull(),
    phone: varchar("phone", { length: 20 }),
    email: varchar("email", { length: 100 }),
    order: int("order").default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (t) => [
    uniqueIndex("cabine_name_idx").on(t.name),
    index("cabine_order_idx").on(t.order),
  ]
);

// ==================== Kebele Schema ====================
export const kebeles = mysqlTable(
  "kebeles",
  {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 100 }).notNull(),
    type: varchar("type", { length: 50 }).notNull(),
    population: varchar("population", { length: 50 }),
    area: varchar("area", { length: 50 }),
    elevation: varchar("elevation", { length: 50 }),
    image: varchar("image", { length: 500 }),
    description: text("description"),
    features: json("features"),
    contactAdministrator: varchar("contact_administrator", { length: 100 }),
    contactPhone: varchar("contact_phone", { length: 20 }),
    contactEmail: varchar("contact_email", { length: 100 }),
    statusSchools: int("status_schools"),
    statusHealthCenters: int("status_health_centers"),
    statusRoads: varchar("status_roads", { length: 100 }),
    statusDevelopmentIndex: varchar("status_development_index", { length: 20 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (t) => [
    index("kebele_name_idx").on(t.name),
    index("kebele_type_idx").on(t.type),
  ]
);

// ==================== Member Schema ====================
export const members = mysqlTable(
  "members",
  {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 100 }).notNull(),
    position: varchar("position", { length: 100 }).notNull(),
    image: varchar("image", { length: 500 }).notNull(),
    department: varchar("department", { length: 50 }).notNull(),
    email: varchar("email", { length: 100 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull(),
    cabineId: int("cabine_id")
      .notNull()
      .references(() => cabines.id),
    isActive: boolean("is_active").default(true),
    order: int("order").default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (t) => [
    uniqueIndex("member_email_idx").on(t.email),
    index("member_cabine_idx").on(t.cabineId),
    index("member_department_idx").on(t.department),
    index("member_active_idx").on(t.isActive),
    index("member_order_idx").on(t.order),
  ]
);

// ==================== NewsArticle Schema ====================
export const newsArticles = mysqlTable(
  "news_articles",
  {
    id: int("id").primaryKey().autoincrement(),
    title: varchar("title", { length: 200 }).notNull(),
    excerpt: varchar("excerpt", { length: 500 }).notNull(),
    content: text("content"),
    type: varchar("type", { length: 20 }).notNull(),
    category: varchar("category", { length: 50 }).notNull(),
    image: varchar("image", { length: 500 }).notNull(),
    date: datetime("date").notNull(),
    author: varchar("author", { length: 100 }),
    location: varchar("location", { length: 100 }),
    tags: json("tags"),
    featured: boolean("featured").default(false),
    urgent: boolean("urgent").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (t) => [
    index("news_type_date_idx").on(t.type, t.date),
    index("news_category_date_idx").on(t.category, t.date),
    index("news_featured_idx").on(t.featured, t.date),
    index("news_urgent_idx").on(t.urgent, t.date),
    index("news_date_idx").on(t.date),
  ]
);

// ==================== Sector Schema ====================
export const sectors = mysqlTable(
  "sectors",
  {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 100 }).notNull(),
    category: varchar("category", { length: 50 }).notNull(),
    description: text("description"),
    image: varchar("image", { length: 500 }),
    address: varchar("address", { length: 200 }),
    phone: varchar("phone", { length: 20 }),
    email: varchar("email", { length: 100 }),
    hours: varchar("hours", { length: 100 }),
    services: json("services"),
    officials: json("officials"),
    statusEmployees: int("status_employees").default(0),
    statusDepartments: int("status_departments").default(0),
    statusFacilities: int("status_facilities").default(0),
    statusSchools: int("status_schools").default(0),
    statusStudents: varchar("status_students", { length: 50 }).default(""),
    statusPrograms: int("status_programs").default(0),
    statusFarmers: varchar("status_farmers", { length: 50 }).default(""),
    statusProjects: int("status_projects").default(0),
    statusRoads: varchar("status_roads", { length: 100 }).default(""),
    statusBudget: varchar("status_budget", { length: 100 }).default(""),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (t) => [
    index("sector_name_idx").on(t.name),
    index("sector_category_idx").on(t.category),
  ]
);

// ==================== User Schema ====================
export const users = mysqlTable(
  "users",
  {
    id: int("id").primaryKey().autoincrement(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: varchar("role", { length: 20 }).default("user"),
    otp: varchar("otp", { length: 6 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (t) => [uniqueIndex("user_email_idx").on(t.email)]
);

// Export all tables
export const tables = {
  administrators,
  cabines,
  kebeles,
  members,
  newsArticles,
  sectors,
  users,
};
