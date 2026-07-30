import { useState } from "react";
import Section from "./Section";
import PropertyCard from "./PropertyCard";
import { featured } from "../data/homeData";

export default function FeaturedProperties() {
  const [wishlist, setWishlist] = useState({});
  const toggle = (i) => setWishlist((w) => ({ ...w, [i]: !w[i] }));

  return (
    <Section eyebrow="Handpicked" title="Featured Properties" link="View all properties">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((p, i) => (
          <PropertyCard key={i} p={p} saved={!!wishlist[i]} onSave={() => toggle(i)} />
        ))}
      </div>
    </Section>
  );
}
