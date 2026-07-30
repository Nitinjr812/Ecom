import Section from "./Section";
import Skyline from "./Skyline";
import { projects } from "../data/homeData";

export default function LatestProjects() {
  return (
    <Section eyebrow="From Builders" title="Latest Projects" link="View all projects" alt>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <div key={i} className="est-glass overflow-hidden">
            <div
              className="h-36 flex items-end p-4 relative overflow-hidden"
              style={{ background: "linear-gradient(155deg, #171C2A 0%, #0C0F16 65%)" }}
            >
              <Skyline className="absolute bottom-0 left-0 w-full h-20" opacity={0.35} />
              <span className="est-tag relative z-10">Possession {p.possession}</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                {p.builder} &middot; {p.city}
              </p>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1">
                  <span>Construction progress</span>
                  <span>{p.status}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--surface-alt)]">
                  <div
                    className="h-1.5 rounded-full"
                    style={{ width: `${p.status}%`, background: "var(--gold)" }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
