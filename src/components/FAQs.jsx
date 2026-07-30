import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Section from "./Section";
import { faqs } from "../data/homeData";

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section eyebrow="Good to Know" title="Frequently Asked Questions" alt>
      <div className="max-w-3xl mx-auto flex flex-col">
        {faqs.map((f, i) => (
          <div key={i} className="border-b border-[var(--border)]">
            <button
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              className="w-full flex items-center justify-between py-4 text-left"
            >
              <span className="font-medium text-sm md:text-base">{f.q}</span>
              <ChevronDown
                size={17}
                color="#9498A3"
                style={{
                  transform: openIndex === i ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s",
                }}
              />
            </button>
            <div className={`est-faq-body ${openIndex === i ? "open" : ""}`}>
              <p className="text-sm text-[var(--text-muted)] pb-4 leading-relaxed">{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
