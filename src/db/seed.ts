import "dotenv/config";
import { db, pool } from "./index";
import { categories, coupons, products } from "./schema";
import { categorySeed, couponSeed, productSeed } from "../data/catalog";
import { site } from "../lib/site";

async function main() {
  await db.delete(products);
  await db.delete(categories);
  await db.delete(coupons);

  await db.insert(categories).values(categorySeed);
  await db.insert(products).values(
    productSeed.map((p) => ({
      slug: p.slug,
      name: p.name,
      sku: p.sku,
      price: p.price,
      compareAtPrice: p.compareAtPrice ?? null,
      currency: site.currency,
      shortDescription: p.shortDescription,
      description: p.description,
      details: p.details,
      images: p.images,
      colors: p.colors,
      sizes: p.sizes,
      categorySlugs: p.categorySlugs,
      tags: p.tags,
      inventory: p.inventory,
      isFeatured: Boolean(p.isFeatured),
      isNew: Boolean(p.isNew),
      isBestSeller: Boolean(p.isBestSeller),
      position: p.position,
    })),
  );
  await db.insert(coupons).values(couponSeed);

  console.log(`Seeded ${categorySeed.length} categories and ${productSeed.length} products.`);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
