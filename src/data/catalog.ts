import type { ColorOption, ProductDetails, ProductImage } from "@/db/schema";

/** Pexels-hosted placeholder photography — swap for real brand imagery before launch. */
const px = (id: number, w = 1400) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const editorialImages = {
  hero: px(8443629, 2000),
  lookbookWide: px(7871185, 2000),
  lookbookTall: px(10132563, 1600),
  about: px(5120185, 2000),
  atelier: px(4862913, 1600),
  studio: px(7778887, 1800),
  contact: px(16470015, 1600),
  statement: px(7871146, 1800),
  social: [
    px(18516743, 800),
    px(36782412, 800),
    px(9218538, 800),
    px(11594664, 800),
    px(17689236, 800),
    px(12299940, 800),
  ],
};

export type CategorySeed = {
  slug: string;
  name: string;
  description: string;
  heroImage: string;
  position: number;
  group: "collection" | "category" | "department";
};

export const categorySeed: CategorySeed[] = [
  {
    slug: "new-arrivals",
    name: "New Arrivals",
    description:
      "The latest additions to the house wardrobe — released in small, considered drops throughout the season.",
    heroImage: px(8441548, 1800),
    position: 1,
    group: "collection",
  },
  {
    slug: "men",
    name: "Men",
    description:
      "Precise tailoring, relaxed proportion and natural fibres, cut for a modern masculine wardrobe.",
    heroImage: px(30742690, 1800),
    position: 2,
    group: "department",
  },
  {
    slug: "women",
    name: "Women",
    description:
      "Fluid lines and architectural volume — pieces designed to be worn, repeated and remembered.",
    heroImage: px(8441548, 1800),
    position: 3,
    group: "department",
  },
  {
    slug: "shirts",
    name: "Shirts",
    description: "Poplin, silk-cotton and heavyweight oxford, finished with mother-of-pearl buttons.",
    heroImage: px(9594692, 1800),
    position: 4,
    group: "category",
  },
  {
    slug: "t-shirts",
    name: "T-Shirts",
    description: "Dense long-staple jersey, garment-dyed and cut for a clean, structured drape.",
    heroImage: px(9594147, 1800),
    position: 5,
    group: "category",
  },
  {
    slug: "trousers",
    name: "Trousers",
    description: "High-rise, straight and pleated silhouettes in wool, linen and technical cotton.",
    heroImage: px(6626412, 1800),
    position: 6,
    group: "category",
  },
  {
    slug: "outerwear",
    name: "Outerwear",
    description: "Coats and jackets built on canvassed internal structure, made to outlast the season.",
    heroImage: px(7292396, 1800),
    position: 7,
    group: "category",
  },
  {
    slug: "accessories",
    name: "Accessories",
    description: "The finishing detail — leather, cashmere and hardware made in family-run workshops.",
    heroImage: px(9218538, 1800),
    position: 8,
    group: "category",
  },
  {
    slug: "sale",
    name: "Archive Sale",
    description: "Previous-season pieces, offered at a reduced price while limited stock remains.",
    heroImage: px(12299940, 1800),
    position: 9,
    group: "collection",
  },
];

export type ProductSeed = {
  slug: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  shortDescription: string;
  description: string;
  details: ProductDetails;
  images: ProductImage[];
  colors: ColorOption[];
  sizes: string[];
  categorySlugs: string[];
  tags: string[];
  inventory: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  position: number;
};

const BLACK = { name: "Black", hex: "#111111" };
const IVORY = { name: "Ivory", hex: "#F2EEE6" };
const BEIGE = { name: "Warm Beige", hex: "#C8B49B" };
const CHARCOAL = { name: "Charcoal", hex: "#3A3A3A" };
const SAND = { name: "Sand", hex: "#DCCFBC" };
const CAMEL = { name: "Camel", hex: "#A8835A" };

const care =
  "Dry clean by a specialist. Do not tumble dry. Press on low heat under a cloth. Store on a broad hanger.";

export const productSeed: ProductSeed[] = [
  {
    slug: "noir-wool-overcoat",
    name: "Noir Double-Faced Wool Overcoat",
    sku: "MN-OC-001",
    price: 1290,
    shortDescription: "A canvassed overcoat in double-faced Italian wool with a hand-finished edge.",
    description:
      "Cut from double-faced wool woven in Biella, the Noir Overcoat is constructed without lining — each seam is closed and finished by hand. The shoulder is lightly extended, the body falls straight to below the knee, and the collar can be worn open or closed. A piece intended for a decade of winters.",
    details: {
      material: "92% virgin wool, 8% cashmere — woven in Biella, Italy",
      fit: "Relaxed. Falls below the knee. Model is 186cm and wears a size M.",
      care,
      origin: "Made in Portugal",
    },
    images: [
      { url: px(17689236), alt: "Model wearing the Noir double-faced wool overcoat in charcoal" },
      { url: px(36782412), alt: "Side view of the Noir wool overcoat with hand-finished edges" },
      { url: px(15538487), alt: "Full-length view of the Noir overcoat worn open" },
    ],
    colors: [CHARCOAL, BLACK, CAMEL],
    sizes: ["XS", "S", "M", "L", "XL"],
    categorySlugs: ["men", "outerwear", "new-arrivals"],
    tags: ["coat", "wool", "winter", "tailoring"],
    inventory: 14,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    position: 1,
  },
  {
    slug: "atelier-silk-cotton-shirt",
    name: "Atelier Silk-Cotton Shirt",
    sku: "MN-SH-002",
    price: 340,
    shortDescription: "A fluid shirt in silk-cotton poplin with a softly collapsed collar.",
    description:
      "Woven from a silk and long-staple cotton blend, this shirt holds its shape while moving like silk. The collar is unfused and softly collapsed; buttons are cut from mother-of-pearl. Equally resolved under tailoring or alone.",
    details: {
      material: "58% cotton, 42% silk poplin",
      fit: "Regular with a straight hem. True to size.",
      care: "Hand wash cold or dry clean. Iron on low heat while slightly damp.",
      origin: "Made in Italy",
    },
    images: [
      { url: px(9594692), alt: "Atelier silk-cotton shirt on a wooden hanger" },
      { url: px(8558368), alt: "Model wearing the Atelier silk-cotton shirt" },
      { url: px(3027173), alt: "Detail of the collapsed collar on the Atelier shirt" },
    ],
    colors: [IVORY, BLACK, SAND],
    sizes: ["XS", "S", "M", "L", "XL"],
    categorySlugs: ["men", "women", "shirts", "new-arrivals"],
    tags: ["shirt", "silk", "poplin", "essential"],
    inventory: 32,
    isFeatured: true,
    isNew: true,
    position: 2,
  },
  {
    slug: "structured-wool-blazer",
    name: "Structured Wool Blazer",
    sku: "MN-OC-003",
    price: 890,
    compareAtPrice: 1150,
    shortDescription: "A half-canvassed blazer with a quietly sculpted shoulder.",
    description:
      "A half-canvassed jacket in a dry wool twill. The shoulder is built with minimal padding, the lapel is hand-rolled, and the body is shaped through the waist without restricting movement.",
    details: {
      material: "100% virgin wool twill, cupro lining",
      fit: "Tailored. Size up for a relaxed silhouette.",
      care,
      origin: "Made in Portugal",
    },
    images: [
      { url: px(9218538), alt: "Structured wool blazer in beige hanging beside a leather bag" },
      { url: px(25384707), alt: "Model wearing the structured wool blazer" },
      { url: px(30742690), alt: "Street view of the structured wool blazer worn open" },
    ],
    colors: [BEIGE, CHARCOAL, BLACK],
    sizes: ["XS", "S", "M", "L"],
    categorySlugs: ["women", "men", "outerwear", "sale"],
    tags: ["blazer", "tailoring", "wool"],
    inventory: 9,
    isFeatured: true,
    isBestSeller: true,
    position: 3,
  },
  {
    slug: "heavy-jersey-t-shirt",
    name: "Heavy Jersey T-Shirt",
    sku: "MN-TS-004",
    price: 120,
    shortDescription: "Garment-dyed 260gsm jersey with a clean, structured drape.",
    description:
      "Knitted from long-staple cotton at 260gsm, then garment-dyed for depth of colour. The neckline is ribbed and twin-needled so it holds its shape wash after wash.",
    details: {
      material: "100% long-staple cotton, 260gsm",
      fit: "Boxy. Take one size down for a close fit.",
      care: "Machine wash cold with like colours. Dry flat.",
      origin: "Made in Portugal",
    },
    images: [
      { url: px(9594147), alt: "Heavy jersey t-shirt in grey laid on a neutral surface" },
      { url: px(14888315), alt: "Close detail of the heavy jersey cotton surface" },
      { url: px(7301629), alt: "Model wearing the heavy jersey t-shirt" },
    ],
    colors: [BLACK, IVORY, SAND, CHARCOAL],
    sizes: ["XS", "S", "M", "L", "XL"],
    categorySlugs: ["men", "women", "t-shirts", "new-arrivals"],
    tags: ["tee", "cotton", "essential"],
    inventory: 64,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    position: 4,
  },
  {
    slug: "pleated-wool-trouser",
    name: "Pleated Wool Trouser",
    sku: "MN-TR-005",
    price: 390,
    shortDescription: "A single-pleat, high-rise trouser with a fluid break.",
    description:
      "Cut high on the waist with a single forward pleat, this trouser falls cleanly from the hip to a wide, unfinished hem that can be tailored to length. In a tropical-weight wool that travels without creasing.",
    details: {
      material: "100% tropical-weight virgin wool",
      fit: "High rise, straight leg. Hem supplied unfinished.",
      care,
      origin: "Made in Italy",
    },
    images: [
      { url: px(6626412), alt: "Pleated wool trouser in khaki worn with a white jacket" },
      { url: px(40097189), alt: "Full-length studio view of the pleated wool trouser" },
      { url: px(37512797), alt: "Detail of the pleated trouser waistband" },
    ],
    colors: [CHARCOAL, BLACK, BEIGE],
    sizes: ["28", "30", "32", "34", "36"],
    categorySlugs: ["men", "trousers", "new-arrivals"],
    tags: ["trouser", "wool", "tailoring"],
    inventory: 21,
    isFeatured: true,
    isBestSeller: true,
    position: 5,
  },
  {
    slug: "column-slip-dress",
    name: "Column Slip Dress",
    sku: "MN-DR-006",
    price: 520,
    shortDescription: "A bias-cut column in sand-washed silk.",
    description:
      "Cut on the bias from sand-washed silk so the fabric follows rather than clings. Adjustable straps, French seams throughout and a weighted hem that keeps the line true.",
    details: {
      material: "100% sand-washed silk",
      fit: "Close to the body, falls to mid-calf.",
      care: "Dry clean only. Store flat or on a padded hanger.",
      origin: "Made in Italy",
    },
    images: [
      { url: px(29977336), alt: "Model wearing the bias-cut column slip dress in black" },
      { url: px(11594664), alt: "Studio portrait of the column slip dress" },
      { url: px(18516756), alt: "Movement study of the column slip dress" },
    ],
    colors: [BLACK, IVORY, CAMEL],
    sizes: ["XS", "S", "M", "L"],
    categorySlugs: ["women", "new-arrivals"],
    tags: ["dress", "silk", "evening"],
    inventory: 12,
    isFeatured: true,
    isNew: true,
    position: 6,
  },
  {
    slug: "leather-trench-coat",
    name: "Lambskin Trench Coat",
    sku: "MN-OC-007",
    price: 1890,
    shortDescription: "A full-length trench in supple vegetable-tanned lambskin.",
    description:
      "Built from six panels of vegetable-tanned lambskin, with a storm flap, belted waist and a deep back vent. The leather is finished with a matte hand that softens with wear.",
    details: {
      material: "100% vegetable-tanned lambskin, viscose lining",
      fit: "Straight, falls to mid-calf.",
      care: "Specialist leather clean only. Keep away from direct heat.",
      origin: "Made in Spain",
    },
    images: [
      { url: px(28262857), alt: "Model wearing the lambskin trench coat" },
      { url: px(8441407), alt: "Studio image of the lambskin trench coat" },
      { url: px(7779079), alt: "Detail of the lambskin trench coat belt" },
    ],
    colors: [BLACK, CHARCOAL],
    sizes: ["XS", "S", "M", "L", "XL"],
    categorySlugs: ["women", "men", "outerwear"],
    tags: ["leather", "coat", "statement"],
    inventory: 6,
    isBestSeller: true,
    position: 7,
  },
  {
    slug: "oxford-overshirt",
    name: "Heavy Oxford Overshirt",
    sku: "MN-SH-008",
    price: 285,
    shortDescription: "A shirt-jacket in dense Japanese oxford cotton.",
    description:
      "Woven in Japan from a heavyweight oxford yarn, this overshirt sits between a shirt and a jacket. Patch pockets, a boxy body and a single-needle finish throughout.",
    details: {
      material: "100% Japanese oxford cotton, 220gsm",
      fit: "Boxy, designed for layering.",
      care: "Machine wash cold. Line dry. Warm iron.",
      origin: "Made in Portugal",
    },
    images: [
      { url: px(12299940), alt: "Heavy oxford overshirts arranged on wooden hangers" },
      { url: px(3027173), alt: "Model wearing the heavy oxford overshirt" },
      { url: px(8558368), alt: "Low angle view of the oxford overshirt" },
    ],
    colors: [SAND, CHARCOAL, BLACK],
    sizes: ["S", "M", "L", "XL"],
    categorySlugs: ["men", "shirts", "outerwear"],
    tags: ["overshirt", "cotton", "layering"],
    inventory: 27,
    isBestSeller: true,
    position: 8,
  },
  {
    slug: "cashmere-crew-knit",
    name: "Grade-A Cashmere Crew Knit",
    sku: "MN-KN-009",
    price: 460,
    compareAtPrice: 590,
    shortDescription: "Two-ply Mongolian cashmere, fully fashioned.",
    description:
      "Knitted from two-ply grade-A Mongolian cashmere and fully fashioned so each panel is shaped on the machine rather than cut. Ribbed collar, cuffs and hem.",
    details: {
      material: "100% grade-A Mongolian cashmere, two-ply",
      fit: "Regular with a slightly dropped shoulder.",
      care: "Hand wash cold with cashmere shampoo. Dry flat. De-pill as needed.",
      origin: "Made in Scotland",
    },
    images: [
      { url: px(7301629), alt: "Cashmere crew knit detail with hand in pocket" },
      { url: px(4862913), alt: "Close-up of the cashmere knit surface" },
      { url: px(9594147), alt: "Cashmere crew knit folded on a neutral surface" },
    ],
    colors: [BEIGE, BLACK, IVORY, CHARCOAL],
    sizes: ["XS", "S", "M", "L", "XL"],
    categorySlugs: ["men", "women", "sale"],
    tags: ["knitwear", "cashmere", "winter"],
    inventory: 18,
    isFeatured: true,
    position: 9,
  },
  {
    slug: "wide-leg-linen-trouser",
    name: "Wide-Leg Linen Trouser",
    sku: "MN-TR-010",
    price: 290,
    shortDescription: "Washed European linen with an easy, fluid leg.",
    description:
      "Cut from garment-washed European linen for immediate softness. A hidden elastic insert at the back waist keeps the line clean while allowing movement.",
    details: {
      material: "100% garment-washed European linen",
      fit: "High rise, wide leg, full length.",
      care: "Machine wash cold. Line dry. Linen creases — this is intended.",
      origin: "Made in Portugal",
    },
    images: [
      { url: px(7206516), alt: "Model wearing wide-leg linen trousers seated on a stool" },
      { url: px(36210660), alt: "Studio portrait featuring the wide-leg linen trouser" },
      { url: px(10132563, 1200), alt: "Outdoor view of the wide-leg linen trouser" },
    ],
    colors: [IVORY, SAND, BLACK],
    sizes: ["XS", "S", "M", "L", "XL"],
    categorySlugs: ["women", "trousers"],
    tags: ["linen", "trouser", "summer"],
    inventory: 24,
    isNew: true,
    position: 10,
  },
  {
    slug: "tailored-wool-waistcoat",
    name: "Tailored Wool Waistcoat",
    sku: "MN-TL-011",
    price: 310,
    shortDescription: "A sharp waistcoat with an adjustable back strap.",
    description:
      "A five-button waistcoat in the same dry wool twill as our blazers, with a cupro back and adjustable strap. Worn as a layer or alone.",
    details: {
      material: "100% virgin wool twill, cupro back",
      fit: "Close. Adjustable at the back waist.",
      care,
      origin: "Made in Portugal",
    },
    images: [
      { url: px(25384707), alt: "Model wearing the tailored wool waistcoat" },
      { url: px(17615759), alt: "Outdoor portrait featuring the tailored waistcoat" },
      { url: px(9218538), alt: "Tailored waistcoat and blazer displayed together" },
    ],
    colors: [CHARCOAL, BLACK],
    sizes: ["XS", "S", "M", "L"],
    categorySlugs: ["men", "women"],
    tags: ["waistcoat", "tailoring", "wool"],
    inventory: 15,
    isNew: true,
    position: 11,
  },
  {
    slug: "merino-rib-tank",
    name: "Merino Rib Tank",
    sku: "MN-KN-012",
    price: 145,
    shortDescription: "A fine-gauge merino rib with a clean bound neckline.",
    description:
      "Knitted in an 18-gauge merino rib that holds the body without constriction. The neckline and armholes are bound rather than hemmed for a flat, precise edge.",
    details: {
      material: "100% extra-fine merino wool",
      fit: "Close to the body.",
      care: "Hand wash cold. Dry flat.",
      origin: "Made in Italy",
    },
    images: [
      { url: px(18516743), alt: "Model wearing the merino rib tank in black" },
      { url: px(28613736), alt: "Studio view of the merino rib tank" },
      { url: px(11594664), alt: "Detail of the merino rib knit" },
    ],
    colors: [BLACK, IVORY, BEIGE],
    sizes: ["XS", "S", "M", "L"],
    categorySlugs: ["women", "t-shirts"],
    tags: ["knit", "merino", "layering"],
    inventory: 30,
    isBestSeller: true,
    position: 12,
  },
  {
    slug: "belted-gabardine-coat",
    name: "Belted Gabardine Coat",
    sku: "MN-OC-013",
    price: 980,
    shortDescription: "Dense cotton gabardine with a weather-resistant finish.",
    description:
      "A belted coat in tightly woven cotton gabardine with a water-repellent finish applied without fluorocarbons. Deep welt pockets, horn buttons and a storm-ready collar.",
    details: {
      material: "100% cotton gabardine with PFC-free water repellent finish",
      fit: "Relaxed, falls below the knee.",
      care,
      origin: "Made in Portugal",
    },
    images: [
      { url: px(7292396), alt: "Belted gabardine coat displayed on a mannequin" },
      { url: px(16470015), alt: "Rail of gabardine coats in a boutique interior" },
      { url: px(5120185, 1200), alt: "Two models wearing belted gabardine coats outdoors" },
    ],
    colors: [BEIGE, CHARCOAL, BLACK],
    sizes: ["XS", "S", "M", "L", "XL"],
    categorySlugs: ["women", "outerwear", "new-arrivals"],
    tags: ["coat", "trench", "cotton"],
    inventory: 11,
    isNew: true,
    isFeatured: true,
    position: 13,
  },
  {
    slug: "grain-leather-belt",
    name: "Grain Leather Belt",
    sku: "MN-AC-014",
    price: 180,
    shortDescription: "Full-grain Tuscan leather with a solid brass buckle.",
    description:
      "Cut from a single length of full-grain Tuscan leather and edge-painted by hand. The buckle is solid brass, lightly brushed so it dulls gracefully with use.",
    details: {
      material: "Full-grain vegetable-tanned Tuscan leather, solid brass hardware",
      fit: "35mm width. Order one size above your trouser waist.",
      care: "Wipe with a dry cloth. Condition twice a year.",
      origin: "Made in Italy",
    },
    images: [
      { url: px(4862913), alt: "Grain leather belt photographed on folded fabric" },
      { url: px(9218538), alt: "Leather belt and tailoring displayed together" },
    ],
    colors: [BLACK, CAMEL],
    sizes: ["80", "85", "90", "95", "100"],
    categorySlugs: ["accessories", "men", "women"],
    tags: ["belt", "leather", "accessory"],
    inventory: 40,
    position: 14,
  },
  {
    slug: "cashmere-scarf",
    name: "Oversized Cashmere Scarf",
    sku: "MN-AC-015",
    price: 220,
    compareAtPrice: 280,
    shortDescription: "A brushed cashmere scarf with hand-knotted fringe.",
    description:
      "Woven in Scotland from brushed cashmere and finished with a hand-knotted fringe. Generous enough to wear as a wrap.",
    details: {
      material: "100% brushed cashmere, 200 × 70cm",
      fit: "One size.",
      care: "Dry clean. Store folded with cedar.",
      origin: "Made in Scotland",
    },
    images: [
      { url: px(20251644, 1200), alt: "Model in gloves holding a magazine wearing a cashmere scarf" },
      { url: px(4862913), alt: "Close-up of brushed cashmere scarf texture" },
    ],
    colors: [BEIGE, CHARCOAL, IVORY],
    sizes: ["One Size"],
    categorySlugs: ["accessories", "sale", "women", "men"],
    tags: ["scarf", "cashmere", "gift"],
    inventory: 35,
    isBestSeller: true,
    position: 15,
  },
  {
    slug: "poplin-tuxedo-shirt",
    name: "Poplin Tuxedo Shirt",
    sku: "MN-SH-016",
    price: 320,
    shortDescription: "A pleated-bib evening shirt in compact poplin.",
    description:
      "An evening shirt in compact two-ply poplin with a narrow pleated bib, concealed placket and double cuffs for links.",
    details: {
      material: "100% two-ply compact cotton poplin",
      fit: "Regular with a slim sleeve.",
      care: "Machine wash cold. Press on high heat while damp.",
      origin: "Made in Italy",
    },
    images: [
      { url: px(37512797), alt: "Monochrome portrait wearing the poplin tuxedo shirt" },
      { url: px(36782412), alt: "Evening look featuring the poplin tuxedo shirt" },
      { url: px(9594692), alt: "Poplin shirt displayed on a hanger" },
    ],
    colors: [IVORY, BLACK],
    sizes: ["XS", "S", "M", "L", "XL"],
    categorySlugs: ["men", "shirts"],
    tags: ["shirt", "evening", "poplin"],
    inventory: 19,
    position: 16,
  },
  {
    slug: "technical-cotton-chino",
    name: "Technical Cotton Chino",
    sku: "MN-TR-017",
    price: 250,
    compareAtPrice: 310,
    shortDescription: "A clean chino in Italian stretch-compact cotton.",
    description:
      "Cut from compact Italian cotton with a trace of elastane for recovery. Side-seam pockets, no visible branding, finished hem.",
    details: {
      material: "97% compact cotton, 3% elastane",
      fit: "Mid rise, tapered leg.",
      care: "Machine wash cold. Warm iron.",
      origin: "Made in Portugal",
    },
    images: [
      { url: px(40097189), alt: "Model wearing the technical cotton chino in black" },
      { url: px(6626412), alt: "Detail of the technical cotton chino" },
      { url: px(8558368), alt: "Full look featuring the technical cotton chino" },
    ],
    colors: [BLACK, SAND, CHARCOAL],
    sizes: ["28", "30", "32", "34", "36"],
    categorySlugs: ["men", "trousers", "sale"],
    tags: ["chino", "cotton", "everyday"],
    inventory: 28,
    position: 17,
  },
  {
    slug: "hooded-silk-cape",
    name: "Hooded Silk Cape",
    sku: "MN-OC-018",
    price: 740,
    shortDescription: "An architectural cape in weighted silk faille.",
    description:
      "A sculptural cape in weighted silk faille with a deep hood and concealed interior ties. Designed as a final layer over evening pieces.",
    details: {
      material: "100% silk faille",
      fit: "One size, oversized.",
      care: "Dry clean only.",
      origin: "Made in Italy",
    },
    images: [
      { url: px(29977336), alt: "Model wearing the hooded silk cape" },
      { url: px(8441407), alt: "Studio study of the hooded silk cape" },
      { url: px(28613736), alt: "Contemporary styling of the hooded silk cape" },
    ],
    colors: [BLACK, CHARCOAL],
    sizes: ["One Size"],
    categorySlugs: ["women", "outerwear", "new-arrivals"],
    tags: ["cape", "silk", "evening"],
    inventory: 7,
    isNew: true,
    position: 18,
  },
];

export const couponSeed = [
  { code: "MAISON10", percentOff: 10, amountOff: 0, active: true, description: "10% off your first order" },
  { code: "ATELIER50", percentOff: 0, amountOff: 50, active: true, description: "€50 off orders over €400" },
];
