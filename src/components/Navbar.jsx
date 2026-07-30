import { useState } from "react";
import { Building2, Menu, X } from "lucide-react";
import { navLinks } from "../data/homeData";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-[#07090D]/85 border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <Building2 size={22} color="#C9A455" />
          <span className="font-display text-xl tracking-wide">Estatera</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--text-muted)]">
          {navLinks.map((n) => (
            <a key={n} href="#" className="hover:text-[var(--gold-bright)] transition">{n}</a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm px-4 py-2 rounded est-btn-outline">Log In</button>
          <button className="text-sm px-4 py-2 rounded est-btn-gold">List Property</button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-5 pb-4 flex flex-col gap-3 border-t border-[var(--border)]">
          {navLinks.map((n) => (
            <a key={n} href="#" className="text-sm text-[var(--text-muted)] pt-3">{n}</a>
          ))}
          <button className="text-sm px-4 py-2 rounded est-btn-gold mt-2">List Property</button>
        </div>
      )}
    </header>
  );
}
