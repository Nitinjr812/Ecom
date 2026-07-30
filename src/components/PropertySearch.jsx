import { useState } from "react";
import { Search } from "lucide-react";
import { cities } from "../data/homeData";

const tabs = ["Buy", "Rent", "Commercial"];

export default function PropertySearch() {
  const [active, setActive] = useState("Buy");

  return (
    <section className="max-w-6xl mx-auto px-5 -mt-16 relative z-20">
      <div className="est-glass p-5 md:p-7">
        <div className="flex gap-2 mb-5">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`text-sm px-4 py-1.5 rounded-full transition ${
                active === t
                  ? "bg-[var(--gold)] text-[#0A0D12] font-bold"
                  : "text-[var(--text-muted)] border border-[var(--border)]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <select className="bg-[var(--surface-alt)] border border-[var(--border)] rounded px-3 py-2.5 text-sm">
            <option>City</option>
            {cities.map((c) => (
              <option key={c.name}>{c.name}</option>
            ))}
          </select>
          <select className="bg-[var(--surface-alt)] border border-[var(--border)] rounded px-3 py-2.5 text-sm">
            <option>Property Type</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Plot</option>
            <option>Office Space</option>
          </select>
          <select className="bg-[var(--surface-alt)] border border-[var(--border)] rounded px-3 py-2.5 text-sm">
            <option>BHK</option>
            <option>1 BHK</option>
            <option>2 BHK</option>
            <option>3 BHK</option>
            <option>4+ BHK</option>
          </select>
          <select className="bg-[var(--surface-alt)] border border-[var(--border)] rounded px-3 py-2.5 text-sm">
            <option>Budget</option>
            <option>Under ₹50L</option>
            <option>₹50L – ₹1Cr</option>
            <option>₹1Cr – ₃Cr</option>
            <option>₹3Cr+</option>
          </select>
          <button className="est-btn-gold rounded flex items-center justify-center gap-2 py-2.5 text-sm">
            <Search size={16} /> Search
          </button>
        </div>
      </div>
    </section>
  );
}
