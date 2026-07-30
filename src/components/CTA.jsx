import { ArrowRight, Phone } from "lucide-react";
import Skyline from "./Skyline";

export default function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-5 py-16">
      <div
        className="rounded-md p-10 md:p-14 relative overflow-hidden text-center est-glass"
        style={{ background: "linear-gradient(135deg, #17120A, #07090D)", borderColor: "var(--gold-deep)" }}
      >
        <Skyline className="absolute bottom-0 left-0 w-full h-24" opacity={0.2} />
        <p className="est-eyebrow mb-3 relative z-10">Get Started</p>
        <h2 className="font-display text-3xl md:text-4xl relative z-10 max-w-xl mx-auto">
          Have a property to sell or rent?
        </h2>
        <p className="text-[var(--text-muted)] mt-3 relative z-10">
          List it in under five minutes and reach serious buyers today.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-7 relative z-10">
          <button className="est-btn-gold px-6 py-3 rounded text-sm flex items-center gap-2 relative overflow-hidden">
            List Your Property <ArrowRight size={16} />
          </button>
          <button className="est-btn-outline px-6 py-3 rounded text-sm flex items-center gap-2">
            <Phone size={15} /> Talk to an Advisor
          </button>
        </div>
      </div>
    </section>
  );
}
