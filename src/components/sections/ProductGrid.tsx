import type { Product } from "@/lib/queries";
import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/Reveal";

export default function ProductGrid({
  products,
  columns = 4,
  priorityCount = 0,
}: {
  products: Product[];
  columns?: 3 | 4;
  priorityCount?: number;
}) {
  const cols =
    columns === 3
      ? "grid-cols-2 md:grid-cols-3"
      : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  return (
    <div className={`grid ${cols} gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-16`}>
      {products.map((p, i) => (
        <Reveal key={p.slug} delay={(i % 4) * 70}>
          <ProductCard product={p} priority={i < priorityCount} />
        </Reveal>
      ))}
    </div>
  );
}
