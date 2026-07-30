import { MapPin } from "lucide-react";
import Section from "./Section";
import { recent } from "../data/homeData";

export default function RecentlyAdded() {
  return (
    <Section eyebrow="Just Listed" title="Recently Added" link="View all" alt>
      <div className="est-glass divide-y divide-[var(--border)] px-5">
        {recent.map((r, i) => (
          <div key={i} className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium">{r.title}</p>
              <p className="text-sm text-[var(--text-muted)] flex items-center gap-1 mt-1">
                <MapPin size={12} /> {r.city} &middot; {r.added}
              </p>
            </div>
            <p className="font-display text-lg text-[var(--gold-bright)]">{r.price}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
