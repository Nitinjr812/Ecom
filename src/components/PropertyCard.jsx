import { Heart, MapPin, Bed, Bath, Maximize } from "lucide-react";
import Skyline from "./Skyline";

export default function PropertyCard({ p, saved, onSave }) {
  return (
    <div className="est-glass overflow-hidden">
      <div
        className="h-48 flex flex-col justify-between p-3 relative overflow-hidden"
        style={{ background: "linear-gradient(155deg, #171C2A 0%, #0C0F16 65%)" }}
      >
        <div className="flex justify-between items-start relative z-10">
          <span className="est-tag">{p.tag}</span>
          <button
            onClick={onSave}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "rgba(7,9,13,0.6)" }}
          >
            <Heart size={15} color={saved ? "#F0D28C" : "#F5F1E6"} fill={saved ? "#F0D28C" : "none"} />
          </button>
        </div>
        <Skyline className="absolute bottom-0 left-0 w-full h-24" opacity={0.28} />
        <p className="font-display text-2xl relative z-10 text-[var(--gold-bright)]">{p.price}</p>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm">{p.title}</h3>
        <p className="text-xs text-[var(--text-muted)] flex items-center gap-1 mt-1.5">
          <MapPin size={12} /> {p.city}
        </p>
        <div className="flex items-center gap-4 mt-3 text-xs text-[var(--text-muted)]">
          {p.beds && <span className="flex items-center gap-1"><Bed size={13} /> {p.beds}</span>}
          {p.baths && <span className="flex items-center gap-1"><Bath size={13} /> {p.baths}</span>}
          <span className="flex items-center gap-1"><Maximize size={13} /> {p.area}</span>
        </div>
      </div>
    </div>
  );
}
