import { Building2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-5 py-10 text-sm text-[var(--text-muted)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        <div className="flex items-center gap-2">
          <Building2 size={18} color="#C9A455" />
          <span className="font-display text-lg text-[var(--text)]">Estatera</span>
        </div>
        <p>&copy; 2026 Estatera. All rights reserved.</p>
      </div>
    </footer>
  );
}
