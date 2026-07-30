import { Quote, Star } from "lucide-react";
import Section from "./Section";

const testimonials = [
  { name: "Ritika Sharma", role: "Bought a 3 BHK in Jaipur", quote: "The token booking held our flat for a week while the loan came through. No pressure, no stress.", rating: 5 },
  { name: "Ankit Verma", role: "Sold a plot in Pune", quote: "Listed on Monday, had three serious buyers by Friday. The site visit scheduling made it effortless.", rating: 5 },
  { name: "Meera Nair", role: "Rented an apartment in Bengaluru", quote: "Clear pricing, verified owner, and the virtual tour saved me two weekends of site visits.", rating: 4 },
];

export default function Testimonials() {
  return (
    <Section eyebrow="From Our Buyers" title="Testimonials">
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="est-glass p-6">
            <Quote size={20} color="#8A7038" />
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{t.quote}</p>
            <div className="flex items-center gap-1 mt-4">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} size={13} fill={s < t.rating ? "#F0D28C" : "none"} color="#F0D28C" />
              ))}
            </div>
            <p className="font-semibold mt-3 text-sm">{t.name}</p>
            <p className="text-xs text-[var(--text-muted)]">{t.role}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
