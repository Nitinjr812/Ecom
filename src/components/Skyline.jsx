export default function Skyline({ className = "", opacity = 1 }) {
  const buildings = [
    { x: 0, w: 34, h: 70 }, { x: 36, w: 22, h: 110 }, { x: 60, w: 30, h: 55 },
    { x: 92, w: 18, h: 140 }, { x: 112, w: 26, h: 90 }, { x: 140, w: 34, h: 65 },
    { x: 176, w: 20, h: 120 }, { x: 198, w: 28, h: 80 }, { x: 228, w: 16, h: 150 },
    { x: 246, w: 30, h: 60 }, { x: 278, w: 24, h: 100 }, { x: 304, w: 32, h: 75 },
    { x: 338, w: 18, h: 130 }, { x: 358, w: 26, h: 90 }, { x: 386, w: 30, h: 55 },
    { x: 418, w: 20, h: 115 }, { x: 440, w: 28, h: 70 }, { x: 470, w: 16, h: 145 },
    { x: 488, w: 32, h: 60 },
  ];
  const H = 160;
  return (
    <svg
      viewBox="0 0 520 160"
      preserveAspectRatio="none"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {buildings.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={H - b.h}
          width={b.w}
          height={b.h}
          fill="none"
          stroke="#C9A455"
          strokeWidth="1.1"
        />
      ))}
      <line x1="0" y1={H} x2="520" y2={H} stroke="#C9A455" strokeWidth="1.1" />
    </svg>
  );
}
