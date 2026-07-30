import { useEffect, useRef } from "react";
import * as THREE from "three";
import Skyline from "./Skyline";

const stats = [
  ["18,400+", "Verified Listings"],
  ["42", "Cities Covered"],
  ["5.1L+", "Happy Buyers"],
];

function GoldGem() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Faceted gem
    const geometry = new THREE.IcosahedronGeometry(1.7, 0);
    const material = new THREE.MeshStandardMaterial({
      color: 0xc9a455,
      metalness: 0.9,
      roughness: 0.22,
      flatShading: true,
    });
    const gem = new THREE.Mesh(geometry, material);
    scene.add(gem);

    // Gold wireframe edges for a faceted diamond look
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0xf0d28c, transparent: true, opacity: 0.6 })
    );
    gem.add(line);

    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambient);

    const key = new THREE.PointLight(0xf0d28c, 1.4, 20);
    key.position.set(4, 3, 5);
    scene.add(key);

    const rim = new THREE.PointLight(0x8a7038, 0.8, 20);
    rim.position.set(-4, -2, -3);
    scene.add(rim);

    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      gem.rotation.y = t * 0.35;
      gem.rotation.x = Math.sin(t * 0.4) * 0.25;
      gem.position.y = Math.sin(t * 0.8) * 0.15;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      edges.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 pt-16 pb-32 relative z-10 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="est-eyebrow mb-4">India&rsquo;s Property Marketplace</p>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05]">
            Every address in India&rsquo;s skyline,{" "}
            <span className="text-[var(--gold-bright)]">one search away.</span>
          </h1>
          <p className="text-[var(--text-muted)] mt-5 max-w-xl text-lg">
            Buy, sell, or rent verified properties across 40+ cities. Reserve the one you want
            in minutes with a secure online token.
          </p>
          <div className="flex flex-wrap gap-8 mt-9">
            {stats.map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-2xl text-[var(--gold-bright)]">{n}</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-72 md:h-96 est-float">
          <GoldGem />
        </div>
      </div>

      <Skyline className="absolute bottom-0 left-0 w-full h-32 md:h-40" opacity={0.5} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07090D] via-transparent to-transparent pointer-events-none" />
    </section>
  );
}
