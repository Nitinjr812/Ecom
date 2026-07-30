import { ArrowRight } from "lucide-react";

export default function Section({ eyebrow, title, link, alt, children }) {
  return (
    <section className={alt ? "bg-white/[0.02]" : ""}>
      <div className="max-w-7xl mx-auto px-5 py-16 md:py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-3">
          <div>
            <p className="est-eyebrow mb-2">{eyebrow}</p>
            <h2 className="font-display text-2xl md:text-4xl">{title}</h2>
          </div>
          {link && (
            <a href="#" className="text-sm flex items-center gap-1 text-[var(--gold-bright)] hover:gap-2 transition-all">
              {link} <ArrowRight size={14} />
            </a>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
