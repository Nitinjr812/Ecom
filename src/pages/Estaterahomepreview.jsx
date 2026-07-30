import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  Search, Heart, MapPin, Bed, Bath, Maximize, Star, ChevronDown,
  Phone, Menu, X, ShieldCheck, Clock, Award, Users, ArrowRight,
  Building2, Quote, Sparkles,
} from "lucide-react";

/* ================= Interactive particle constellation background ================= */
function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height, particles, mouse = { x: -9999, y: -9999 };
    let frameId;

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 36 : 70;
    const LINK_DIST = isMobile ? 100 : 130;
    const MOUSE_RADIUS = 140;

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.x += (dx / dist) * force * 1.2;
          p.y += (dy / dist) * force * 1.2;
        }

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(201,164,85,0.55)";
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(201,164,85,${0.14 * (1 - d / LINK_DIST)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      frameId = requestAnimationFrame(step);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const handleResize = () => { resize(); init(); };

    resize();
    init();
    step();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ================= Interactive 3D wireframe house (tilts toward cursor) ================= */
function InteractiveHouse() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.7, 7.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const goldLine = (geo) => new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: 0xe4c989, transparent: true, opacity: 0.9 })
    );

    // Walls
    const wallGeo = new THREE.BoxGeometry(2.2, 1.5, 1.8);
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x11141c, metalness: 0.3, roughness: 0.6, transparent: true, opacity: 0.6 });
    const walls = new THREE.Mesh(wallGeo, wallMat);
    walls.position.y = -0.2;
    group.add(walls);
    const wallEdges = goldLine(wallGeo);
    wallEdges.position.copy(walls.position);
    group.add(wallEdges);

    // Roof
    const roofGeo = new THREE.ConeGeometry(1.75, 1.1, 4);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x11141c, metalness: 0.4, roughness: 0.5, transparent: true, opacity: 0.6 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.rotation.y = Math.PI / 4;
    roof.position.y = 1.05;
    group.add(roof);
    const roofEdges = goldLine(roofGeo);
    roofEdges.rotation.copy(roof.rotation);
    roofEdges.position.copy(roof.position);
    group.add(roofEdges);

    // Chimney
    const chimneyGeo = new THREE.BoxGeometry(0.16, 0.5, 0.16);
    const chimneyMat = new THREE.MeshStandardMaterial({ color: 0x11141c, metalness: 0.3, roughness: 0.6, transparent: true, opacity: 0.6 });
    const chimney = new THREE.Mesh(chimneyGeo, chimneyMat);
    chimney.position.set(0.65, 1.35, 0.3);
    group.add(chimney);
    const chimneyEdges = goldLine(chimneyGeo);
    chimneyEdges.position.copy(chimney.position);
    group.add(chimneyEdges);

    // Door
    const doorGeo = new THREE.PlaneGeometry(0.42, 0.72);
    const doorMat = new THREE.MeshBasicMaterial({ color: 0xc9a455, transparent: true, opacity: 0.35, side: THREE.DoubleSide });
    const door = new THREE.Mesh(doorGeo, doorMat);
    door.position.set(0, -0.58, 0.91);
    group.add(door);
    group.add(goldLine(doorGeo));
    const doorEdge = goldLine(doorGeo);
    doorEdge.position.copy(door.position);
    group.add(doorEdge);

    // Windows
    const windowGeo = new THREE.PlaneGeometry(0.34, 0.34);
    const windowMat = new THREE.MeshBasicMaterial({ color: 0xe4c989, transparent: true, opacity: 0.28, side: THREE.DoubleSide });
    [[-0.68, -0.1, 0.91], [0.68, -0.1, 0.91]].forEach(([x, y, z]) => {
      const win = new THREE.Mesh(windowGeo, windowMat);
      win.position.set(x, y, z);
      group.add(win);
      const winEdge = goldLine(windowGeo);
      winEdge.position.copy(win.position);
      group.add(winEdge);
    });

    // Ground platform (subtle reflective disc)
    const groundGeo = new THREE.CircleGeometry(2.6, 48);
    const groundMat = new THREE.MeshBasicMaterial({ color: 0xc9a455, transparent: true, opacity: 0.06, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.97;
    group.add(ground);
    const ringGeo = new THREE.RingGeometry(2.55, 2.6, 48);
    const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xe4c989, transparent: true, opacity: 0.4, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.97;
    group.add(ring);

    // Floating accent sparkles
    const sparkleGeo = new THREE.OctahedronGeometry(0.09, 0);
    const sparkleMat = new THREE.MeshStandardMaterial({ color: 0xe4c989, metalness: 0.8, roughness: 0.2, emissive: 0x7a6230, emissiveIntensity: 0.4 });
    const sparkles = [];
    [[2.4, 1.2, 0.5], [-2.3, 0.4, -0.6], [1.8, -0.8, 1.4], [-1.9, 1.5, 1.0]].forEach(([x, y, z]) => {
      const s = new THREE.Mesh(sparkleGeo, sparkleMat);
      s.position.set(x, y, z);
      group.add(s);
      sparkles.push(s);
    });

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.PointLight(0xe4c989, 1.6, 20);
    key.position.set(4, 4, 5);
    scene.add(key);
    const rim = new THREE.PointLight(0x7a6230, 1, 20);
    rim.position.set(-4, -2, -3);
    scene.add(rim);

    let targetRotX = 0, targetRotY = 0;
    const handleMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetRotY = nx * 0.6;
      targetRotX = ny * 0.22;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let frameId;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      group.rotation.y += (targetRotY + t * 0.05 - group.rotation.y) * 0.04;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.04;
      group.position.y = Math.sin(t * 0.7) * 0.08;
      sparkles.forEach((s, i) => {
        s.rotation.x += 0.01;
        s.rotation.y += 0.015;
      });
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}

/* ================= Custom styled dropdown (replaces native <select>) ================= */
function Dropdown({ label, options }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(label);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between bg-white/[0.03] border rounded-lg px-3 py-2.5 text-sm text-left transition-colors ${
          open ? "border-[var(--gold)]" : "border-[var(--border)]"
        }`}
        style={{ color: selected === label ? "var(--text-muted)" : "var(--text)" }}
      >
        <span className="truncate">{selected}</span>
        <ChevronDown size={15} color="#97A0AE" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
      </button>
      {open && (
        <div
          className="absolute left-0 right-0 mt-2 rounded-lg overflow-hidden z-40 max-h-56 overflow-y-auto"
          style={{ background: "#14161D", border: "1px solid var(--border)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { setSelected(opt); setOpen(false); }}
              className="w-full text-left px-3 py-2.5 text-sm transition-colors"
              style={{
                color: selected === opt ? "var(--gold-bright)" : "var(--text)",
                background: selected === opt ? "rgba(201,164,85,0.1)" : "transparent",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(201,164,85,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = selected === opt ? "rgba(201,164,85,0.1)" : "transparent")}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= Data (with demo image keywords) ================= */
const navLinks = ["Buy", "Rent", "Sell", "Commercial", "Projects"];
const cities = [
  { name: "Jaipur", count: 1840 }, { name: "Mumbai", count: 3620 }, { name: "Delhi NCR", count: 4110 },
  { name: "Bengaluru", count: 3290 }, { name: "Pune", count: 2470 }, { name: "Hyderabad", count: 2015 },
];
const img = (keyword, lock) => `https://loremflickr.com/640/480/${keyword}?lock=${lock}`;

const featured = [
  { title: "Amber Heights, 3 BHK Apartment", city: "Jaipur", price: "₹1.42 Cr", beds: 3, baths: 3, area: "1,850 sqft", tag: "Ready to Move", image: img("apartment,building", 1) },
  { title: "Palm Court Villa", city: "Bengaluru", price: "₹4.65 Cr", beds: 5, baths: 5, area: "4,200 sqft", tag: "RERA Approved", image: img("villa,mansion", 2) },
  { title: "Riverstone Residency, 2 BHK", city: "Pune", price: "₹78 L", beds: 2, baths: 2, area: "1,120 sqft", tag: "Under Construction", image: img("residential,apartment", 3) },
  { title: "Skyline Business Tower, Office", city: "Mumbai", price: "₹2.10 Cr", beds: null, baths: 2, area: "2,600 sqft", tag: "Commercial", image: img("skyscraper,office", 4) },
  { title: "Emerald Meadows Plot", city: "Hyderabad", price: "₹55 L", beds: null, baths: null, area: "2,400 sqft", tag: "Plot", image: img("land,field", 5) },
  { title: "Orchid Enclave, 4 BHK Penthouse", city: "Delhi NCR", price: "₹3.20 Cr", beds: 4, baths: 4, area: "3,050 sqft", tag: "Premium", image: img("penthouse,luxury", 6) },
];
const projects = [
  { name: "Sundar Sky Residences", builder: "Sundar Buildcon", city: "Jaipur", possession: "Dec 2027", status: 42, image: img("construction,building", 7) },
  { name: "The Meridian Business Park", builder: "Meridian Group", city: "Pune", possession: "Mar 2028", status: 18, image: img("office,park", 8) },
  { name: "Grand Orchard Villas", builder: "Orchard Developers", city: "Bengaluru", possession: "Jun 2026", status: 76, image: img("villa,garden", 9) },
];
const premium = [
  { title: "Aurelia Estate, Independent Villa", city: "Gurugram", price: "₹8.9 Cr", area: "6,500 sqft", image: img("mansion,luxury", 10) },
  { title: "The Regent Penthouse", city: "Mumbai", price: "₹12.4 Cr", area: "5,100 sqft", image: img("penthouse,interior", 11) },
  { title: "Windermere Farm House", city: "Jaipur", price: "₹6.1 Cr", area: "1.2 Acre", image: img("farmhouse,countryside", 12) },
];
const whyUs = [
  { icon: ShieldCheck, title: "Verified Listings", desc: "Every property is checked for ownership and RERA status before it goes live." },
  { icon: Clock, title: "Fast Token Booking", desc: "Reserve a property in minutes with a secure, time-bound online token." },
  { icon: Award, title: "Trusted Builders", desc: "We work only with builders and agents with a verified track record." },
  { icon: Users, title: "500,000+ Buyers", desc: "Families and investors across India have found their property with us." },
];
const testimonials = [
  { name: "Ritika Sharma", role: "Bought a 3 BHK in Jaipur", quote: "The token booking held our flat for a week while the loan came through. No pressure, no stress.", rating: 5 },
  { name: "Ankit Verma", role: "Sold a plot in Pune", quote: "Listed on Monday, had three serious buyers by Friday. The site visit scheduling made it effortless.", rating: 5 },
  { name: "Meera Nair", role: "Rented an apartment in Bengaluru", quote: "Clear pricing, verified owner, and the virtual tour saved me two weekends of site visits.", rating: 4 },
];
const faqs = [
  { q: "What is a token booking and is it refundable?", a: "A token is a small advance you pay online to reserve a property for a fixed duration. The owner decides the amount and whether it is refundable or non-refundable before you pay." },
  { q: "How long can I hold a property with a token?", a: "Owners can offer 1 day, 3 days, 7 days, or a custom duration. Once the timer runs out, the property automatically returns to the market unless the booking is confirmed." },
  { q: "Are the properties RERA approved?", a: "Every project page shows its RERA registration number and status. We verify this before a listing goes live." },
  { q: "Can I schedule a site visit online?", a: "Yes, every property page has a 'Book Site Visit' option that lets you pick a slot directly with the owner or agent." },
  { q: "What payment methods are supported for token booking?", a: "UPI, credit and debit cards, net banking, and wallets, all processed through a secure payment gateway with instant verification." },
];

/* ================= Reusable bits ================= */
function Section({ eyebrow, title, link, alt, children }) {
  return (
    <section className={alt ? "bg-white/[0.015]" : ""}>
      <div className="max-w-7xl mx-auto px-5 md:px-6 py-14 md:py-24">
        <div className="flex items-end justify-between mb-8 md:mb-12 flex-wrap gap-3">
          <div>
            <p className="est-eyebrow mb-2">{eyebrow}</p>
            <h2 className="est-heading text-2xl sm:text-3xl md:text-5xl">{title}</h2>
          </div>
          {link && (
            <a href="#" className="text-sm font-medium flex items-center gap-1 text-[var(--gold-bright)] group">
              {link} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function PropertyCard({ p, saved, onSave }) {
  return (
    <div className="est-card overflow-hidden group">
      <div className="h-48 relative overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,12,16,0.15) 0%, rgba(11,12,16,0.85) 100%)" }} />
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="flex justify-between items-start">
            <span className="est-tag">{p.tag}</span>
            <button
              onClick={onSave}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              style={{ background: "rgba(11,12,16,0.55)", backdropFilter: "blur(4px)" }}
            >
              <Heart size={16} color={saved ? "#E4C989" : "#F4F1EA"} fill={saved ? "#E4C989" : "none"} />
            </button>
          </div>
          <p className="est-heading text-2xl text-[var(--gold-bright)]">{p.price}</p>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-[15px]">{p.title}</h3>
        <p className="text-sm text-[var(--text-muted)] flex items-center gap-1 mt-1.5"><MapPin size={13} /> {p.city}</p>
        <div className="flex items-center gap-4 mt-3 text-sm text-[var(--text-muted)]">
          {p.beds && <span className="flex items-center gap-1"><Bed size={14} /> {p.beds}</span>}
          {p.baths && <span className="flex items-center gap-1"><Bath size={14} /> {p.baths}</span>}
          <span className="flex items-center gap-1"><Maximize size={14} /> {p.area}</span>
        </div>
      </div>
    </div>
  );
}

/* ================= Page ================= */
export default function EstateraHomeLuxuryV3() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTab, setSearchTab] = useState("Buy");
  const [wishlist, setWishlist] = useState({});
  const [openFaq, setOpenFaq] = useState(0);
  const toggleWishlist = (i) => setWishlist((w) => ({ ...w, [i]: !w[i] }));

  return (
    <div className="est-root min-h-screen relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=Manrope:wght@400;500;600;700;800&display=swap');
        .est-root {
          --bg: #0B0C10;
          --border: rgba(201,164,85,0.14);
          --gold: #C9A455;
          --gold-bright: #E4C989;
          --gold-deep: #7A6230;
          --text: #F4F1EA;
          --text-muted: #97A0AE;
          background:
            radial-gradient(60% 45% at 15% 0%, rgba(201,164,85,0.09) 0%, transparent 60%),
            radial-gradient(50% 40% at 100% 20%, rgba(122,98,48,0.10) 0%, transparent 60%),
            var(--bg);
          color: var(--text);
          font-family: 'Manrope', sans-serif;
          overflow-x: hidden;
        }
        .est-root .est-heading { font-family: 'Fraunces', serif; font-weight: 600; letter-spacing: -0.01em; }
        .est-root .est-eyebrow { color: var(--gold); letter-spacing: 0.16em; text-transform: uppercase; font-size: 0.68rem; font-weight: 700; }
        .est-root .est-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 14px;
          transition: all 0.35s cubic-bezier(0.2,0.8,0.2,1);
        }
        .est-root .est-card:hover { border-color: rgba(201,164,85,0.4); transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(201,164,85,0.15); }
        .est-root .est-btn-primary {
          background: linear-gradient(135deg, var(--gold-bright), var(--gold) 55%, var(--gold-deep));
          background-size: 200% 200%; color: #0B0C10; font-weight: 700; border-radius: 999px;
          transition: background-position 0.5s ease, filter 0.2s ease, transform 0.2s ease;
        }
        .est-root .est-btn-primary:hover { background-position: 100% 100%; filter: brightness(1.08); transform: translateY(-2px); box-shadow: 0 10px 24px rgba(201,164,85,0.25); }
        .est-root .est-btn-outline {
          border: 1px solid var(--gold-deep); color: var(--gold-bright); border-radius: 999px; font-weight: 600;
          transition: all 0.25s ease;
        }
        .est-root .est-btn-outline:hover { border-color: var(--gold); background: rgba(201,164,85,0.08); transform: translateY(-2px); }
        .est-root .est-tag {
          font-size: 0.66rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 999px; background: rgba(201,164,85,0.16);
          color: var(--gold-bright); border: 1px solid var(--gold-deep); backdrop-filter: blur(2px);
        }
        .est-root .est-faq-body { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
        .est-root .est-faq-body.open { max-height: 220px; }
        .est-root .est-city-card { transition: all 0.3s ease; }
        .est-root .est-city-card:hover { transform: translateY(-4px) scale(1.02); }
        @media (max-width: 640px) {
          .est-root .est-heading { line-height: 1.15; }
        }
      `}</style>

      {/* NAV */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-[#0B0C10]/85 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-6 py-4">
          <div className="flex items-center gap-2">
            <Building2 size={22} color="#C9A455" />
            <span className="est-heading text-xl">Estatera</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[var(--text-muted)] font-medium">
            {navLinks.map((n) => <a key={n} href="#" className="hover:text-[var(--gold-bright)] transition">{n}</a>)}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm px-4 py-2 est-btn-outline">Log In</button>
            <button className="text-sm px-5 py-2 est-btn-primary">List Property</button>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-5 pb-4 flex flex-col gap-3 border-t border-[var(--border)]">
            {navLinks.map((n) => <a key={n} href="#" className="text-sm text-[var(--text-muted)] pt-3 font-medium">{n}</a>)}
            <button className="text-sm px-5 py-2 est-btn-primary mt-2">List Property</button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <ParticleField />
        <div className="max-w-7xl mx-auto px-5 md:px-6 pt-14 md:pt-20 pb-14 md:pb-16 relative z-10 grid md:grid-cols-2 gap-8 md:gap-10 items-center">
          <div>
            <p className="est-eyebrow mb-4 flex items-center gap-2"><Sparkles size={13} /> India's Property Marketplace</p>
            <h1 className="est-heading text-4xl sm:text-5xl md:text-6xl leading-[1.08] md:leading-[1.05]">
              Every address in India's skyline, <span className="text-[var(--gold-bright)]">one search away.</span>
            </h1>
            <p className="text-[var(--text-muted)] mt-5 max-w-xl text-base md:text-lg">
              Buy, sell, or rent verified properties across 40+ cities. Reserve the one you want in minutes with a secure online token.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <button className="est-btn-primary px-6 md:px-7 py-3 md:py-3.5 text-sm md:text-[15px] flex items-center gap-2">Explore Properties <ArrowRight size={16} /></button>
              <button className="est-btn-outline px-6 md:px-7 py-3 md:py-3.5 text-sm md:text-[15px]">List Your Property</button>
            </div>
            <div className="flex flex-wrap gap-8 md:gap-10 mt-10 md:mt-12">
              {[["18,400+", "Verified Listings"], ["42", "Cities Covered"], ["5.1L+", "Happy Buyers"]].map(([n, l]) => (
                <div key={l}>
                  <p className="est-heading text-xl md:text-2xl text-[var(--gold-bright)]">{n}</p>
                  <p className="text-xs md:text-sm text-[var(--text-muted)] mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="h-64 sm:h-80 md:h-[420px] relative z-10"><InteractiveHouse /></div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="max-w-6xl mx-auto px-5 md:px-6 -mt-4 md:-mt-6 relative z-20 pb-4">
        <div className="est-card p-4 md:p-7" style={{ boxShadow: "0 24px 48px rgba(0,0,0,0.4)" }}>
          <div className="flex gap-2 mb-5 overflow-x-auto">
            {["Buy", "Rent", "Commercial"].map((t) => (
              <button key={t} onClick={() => setSearchTab(t)} className={`text-sm px-4 py-1.5 rounded-full font-medium transition whitespace-nowrap ${searchTab === t ? "bg-[var(--gold)] text-[#0B0C10] font-bold" : "text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--gold-deep)]"}`}>{t}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            <Dropdown label="City" options={cities.map((c) => c.name)} />
            <Dropdown label="Property Type" options={["Apartment", "Villa", "Plot", "Office Space"]} />
            <Dropdown label="BHK" options={["1 BHK", "2 BHK", "3 BHK", "4+ BHK"]} />
            <Dropdown label="Budget" options={["Under ₹50L", "₹50L – ₹1Cr", "₹1Cr – ₃Cr", "₹3Cr+"]} />
            <button className="est-btn-primary rounded-lg flex items-center justify-center gap-2 py-2.5 text-sm"><Search size={16} /> Search</button>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <Section eyebrow="Handpicked" title="Featured Properties" link="View all properties">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {featured.map((p, i) => <PropertyCard key={i} p={p} saved={!!wishlist[i]} onSave={() => toggleWishlist(i)} />)}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section eyebrow="From Builders" title="Latest Projects" link="View all projects" alt>
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {projects.map((p, i) => (
            <div key={i} className="est-card overflow-hidden group">
              <div className="h-36 relative overflow-hidden">
                <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,12,16,0.1) 0%, rgba(11,12,16,0.85) 100%)" }} />
                <span className="est-tag absolute bottom-3 left-3">Possession {p.possession}</span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">{p.builder} &middot; {p.city}</p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1.5"><span>Construction progress</span><span>{p.status}%</span></div>
                  <div className="h-1.5 rounded-full bg-white/5"><div className="h-1.5 rounded-full" style={{ width: `${p.status}%`, background: "var(--gold)" }} /></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PREMIUM */}
      <Section eyebrow="Estatera Select" title="Premium Properties" link="Explore premium">
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {premium.map((p, i) => (
            <div key={i} className="est-card overflow-hidden group">
              <div className="h-40 relative overflow-hidden">
                <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(11,12,16,0.1) 0%, rgba(11,12,16,0.9) 100%)" }} />
                <Sparkles size={16} color="#E4C989" className="absolute top-3 left-3" />
              </div>
              <div className="p-5">
                <h3 className="est-heading text-lg">{p.title}</h3>
                <p className="text-sm text-[var(--text-muted)] mt-1.5 flex items-center gap-1"><MapPin size={13} /> {p.city}</p>
                <div className="flex justify-between items-end mt-5">
                  <p className="est-heading text-xl text-[var(--gold-bright)]">{p.price}</p>
                  <p className="text-xs text-[var(--text-muted)]">{p.area}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CITIES */}
      <Section eyebrow="Where to Look" title="Popular Cities" alt>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {cities.map((c) => (
            <div key={c.name} className="est-card est-city-card p-4 md:p-5 h-24 md:h-28 flex flex-col justify-end cursor-pointer">
              <p className="font-semibold text-sm md:text-base">{c.name}</p>
              <p className="text-xs text-[var(--text-muted)]">{c.count.toLocaleString("en-IN")} properties</p>
            </div>
          ))}
        </div>
      </Section>

      {/* WHY US */}
      <Section eyebrow="Why Estatera" title="Built on Trust">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyUs.map((w, i) => (
            <div key={i} className="group">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ background: "rgba(201,164,85,0.12)", border: "1px solid var(--gold-deep)" }}>
                <w.icon size={20} color="#E4C989" />
              </div>
              <h3 className="font-semibold mb-1.5">{w.title}</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section eyebrow="From Our Buyers" title="Testimonials" alt>
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="est-card p-6">
              <Quote size={20} color="#7A6230" />
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{t.quote}</p>
              <div className="flex items-center gap-1 mt-4">
                {Array.from({ length: 5 }).map((_, s) => <Star key={s} size={13} fill={s < t.rating ? "#E4C989" : "none"} color="#E4C989" />)}
              </div>
              <p className="font-semibold mt-3 text-sm">{t.name}</p>
              <p className="text-xs text-[var(--text-muted)]">{t.role}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section eyebrow="Good to Know" title="Frequently Asked Questions">
        <div className="max-w-3xl mx-auto flex flex-col">
          {faqs.map((f, i) => (
            <div key={i} className="border-b border-[var(--border)]">
              <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full flex items-center justify-between py-4 text-left">
                <span className="font-medium text-sm md:text-base pr-4">{f.q}</span>
                <ChevronDown size={17} color="#97A0AE" style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
              </button>
              <div className={`est-faq-body ${openFaq === i ? "open" : ""}`}>
                <p className="text-sm text-[var(--text-muted)] pb-4 leading-relaxed">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-5 md:px-6 py-14 md:py-16">
        <div className="est-card p-8 sm:p-12 md:p-16 relative overflow-hidden text-center" style={{ background: "linear-gradient(135deg, rgba(201,164,85,0.10), rgba(255,255,255,0.02))" }}>
          <p className="est-eyebrow mb-3">Get Started</p>
          <h2 className="est-heading text-2xl sm:text-3xl md:text-5xl max-w-2xl mx-auto">Have a property to sell or rent?</h2>
          <p className="text-[var(--text-muted)] mt-4 max-w-lg mx-auto text-sm md:text-base">List it in under five minutes and reach serious buyers today.</p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <button className="est-btn-primary px-6 md:px-7 py-3 md:py-3.5 text-sm md:text-[15px] flex items-center gap-2">List Your Property <ArrowRight size={16} /></button>
            <button className="est-btn-outline px-6 md:px-7 py-3 md:py-3.5 text-sm md:text-[15px] flex items-center gap-2"><Phone size={15} /> Talk to an Advisor</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[var(--border)] px-5 md:px-6 py-10 text-sm text-[var(--text-muted)] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
          <div className="flex items-center gap-2"><Building2 size={18} color="#C9A455" /><span className="est-heading text-lg text-[var(--text)]">Estatera</span></div>
          <p>&copy; 2026 Estatera. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}