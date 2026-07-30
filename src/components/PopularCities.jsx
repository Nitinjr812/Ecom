import Section from "./Section";
import Skyline from "./Skyline";
import { cities } from "../data/homeData";

export default function PopularCities() {
  return (
    <Section eyebrow="Where to Look" title="Popular Cities">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cities.map((c) => (
          <div
            key={c.name}
            className="est-glass p-4 relative overflow-hidden h-28 flex flex-col justify-end"
          >
            <Skyline className="absolute bottom-0 left-0 w-full h-16" opacity={0.3} />
            <p className="font-semibold relative z-10">{c.name}</p>
            <p className="text-xs text-[var(--text-muted)] relative z-10">
              {c.count.toLocaleString("en-IN")} properties
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
