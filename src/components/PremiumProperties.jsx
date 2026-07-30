import { Sparkles, MapPin } from "lucide-react";
import Section from "./Section";
import { premium } from "../data/homeData";

export default function PremiumProperties() {
  return (
    <Section eyebrow="Estatera Select" title="Premium Properties" link="Explore premium">
      <div className="grid md:grid-cols-3 gap-6">
        {premium.map((p, i) => (
          <div
            key={i}
            className="rounded-md p-5 relative est-glass"
            style={{
              background:
                "linear-gradient(155deg, rgba(201,164,85,0.14), rgba(201,164,85,0.02))",
              borderColor: "var(--gold-deep)",
            }}
          >
            <Sparkles size={16} color="#F0D28C" className="mb-3" />
            <h3 className="font-display text-lg">{p.title}</h3>
            <p className="text-sm text-[var(--text-muted)] mt-1 flex items-center gap-1">
              <MapPin size={13} /> {p.city}
            </p>
            <div className="flex justify-between items-end mt-5">
              <p className="font-display text-xl text-[var(--gold-bright)]">{p.price}</p>
              <p className="text-xs text-[var(--text-muted)]">{p.area}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
