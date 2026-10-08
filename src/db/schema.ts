import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export type ColorOption = { name: string; hex: string };
export type ProductImage = { url: string; alt: string };
export type ProductDetails = {
  material: string;
  fit: string;
  care: string;
  origin: string;
};

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  description: text("description").notNull().default(""),
  heroImage: text("hero_image").notNull().default(""),
  position: integer("position").notNull().default(0),
  group: varchar("group", { length: 40 }).notNull().default("category"),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  sku: varchar("sku", { length: 40 }).notNull(),
  price: integer("price").notNull(),
  compareAtPrice: integer("compare_at_price"),
  currency: varchar("currency", { length: 8 }).notNull().default("EUR"),
  shortDescription: text("short_description").notNull().default(""),
  description: text("description").notNull().default(""),
  details: jsonb("details").$type<ProductDetails>().notNull(),
  images: jsonb("images").$type<ProductImage[]>().notNull(),
  videoUrl: text("video_url"),
  colors: jsonb("colors").$type<ColorOption[]>().notNull(),
  sizes: jsonb("sizes").$type<string[]>().notNull(),
  categorySlugs: jsonb("category_slugs").$type<string[]>().notNull(),
  tags: jsonb("tags").$type<string[]>().notNull(),
  inventory: integer("inventory").notNull().default(0),
  isFeatured: boolean("is_featured").notNull().default(false),
  isNew: boolean("is_new").notNull().default(false),
  isBestSeller: boolean("is_best_seller").notNull().default(false),
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const coupons = pgTable("coupons", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 40 }).notNull().unique(),
  percentOff: integer("percent_off").notNull().default(0),
  amountOff: integer("amount_off").notNull().default(0),
  active: boolean("active").notNull().default(true),
  description: text("description").notNull().default(""),
});

export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 180 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull().default(""),
  phone: varchar("phone", { length: 60 }).notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type OrderItem = {
  slug: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
};

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 40 }).notNull().unique(),
  email: varchar("email", { length: 180 }).notNull(),
  name: varchar("name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 60 }).notNull().default(""),
  addressLine: text("address_line").notNull().default(""),
  city: varchar("city", { length: 120 }).notNull().default(""),
  postalCode: varchar("postal_code", { length: 40 }).notNull().default(""),
  country: varchar("country", { length: 120 }).notNull().default(""),
  note: text("note").notNull().default(""),
  shippingMethod: varchar("shipping_method", { length: 60 }).notNull().default("standard"),
  paymentMethod: varchar("payment_method", { length: 60 }).notNull().default("manual"),
  couponCode: varchar("coupon_code", { length: 40 }).notNull().default(""),
  subtotal: integer("subtotal").notNull().default(0),
  discount: integer("discount").notNull().default(0),
  shipping: integer("shipping").notNull().default(0),
  total: integer("total").notNull().default(0),
  currency: varchar("currency", { length: 8 }).notNull().default("EUR"),
  status: varchar("status", { length: 40 }).notNull().default("pending"),
  items: jsonb("items").$type<OrderItem[]>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 180 }).notNull().unique(),
  source: varchar("source", { length: 60 }).notNull().default("footer"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  phone: varchar("phone", { length: 60 }).notNull().default(""),
  subject: varchar("subject", { length: 180 }).notNull().default(""),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
