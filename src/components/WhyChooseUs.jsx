import { ShieldCheck, Clock, Award, Users } from "lucide-react";
import Section from "./Section";

const items = [
  { icon: ShieldCheck, title: "Verified Listings", desc: "Every property is checked for ownership and RERA status before it goes live." },
  { icon: Clock, title: "Fast Token Booking", desc: "Reserve a property in minutes with a secure, time-bound online token." },
  { icon: Award, title: "Trusted Builders", desc: "We work only with builders and agents with a verified track record." },
  { icon: Users, title: "500,000+ Buyers", desc: "Families and investors across India have found their property with us." },
];

export default function WhyChooseUs() {
  return (
    <Section eyebrow="Why Estatera" title="Built on Trust" alt>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((w, i) => (
          <div key={i}>
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
              style={{ background: "rgba(201,164,85,0.12)", border: "1px solid var(--gold-deep)" }}
            >
              <w.icon size={19} color="#F0D28C" />
            </div>
            <h3 className="font-semibold mb-1.5">{w.title}</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">{w.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
