import { useEffect, useRef, useCallback } from "react";

interface Blob {
  el: HTMLDivElement | null;
  factorX: number;
  factorY: number;
}

export function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<Blob[]>([]);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    // Smooth lerp toward target
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.06;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.06;

    blobsRef.current.forEach(({ el, factorX, factorY }) => {
      if (!el) return;
      const tx = currentRef.current.x * factorX;
      const ty = currentRef.current.y * factorY;
      el.style.transform = `translate(${tx}px, ${ty}px)`;
    });

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetRef.current = {
        x: (e.clientX - cx) / cx,   // -1 … 1
        y: (e.clientY - cy) / cy,
      };
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  const setBlob = (i: number, factorX: number, factorY: number) =>
    (el: HTMLDivElement | null) => {
      blobsRef.current[i] = { el, factorX, factorY };
    };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10"
      aria-hidden="true"
    >
      {/* Layer -3: slow deep blobs (farthest back) */}
      <div
        ref={setBlob(0, -18, -14)}
        className="absolute will-change-transform"
        style={{
          width: 720, height: 720,
          top: "-15%", left: "-12%",
          background: "radial-gradient(circle, hsl(255 85% 65% / 0.55) 0%, hsl(270 80% 50% / 0.3) 45%, transparent 70%)",
          filter: "blur(90px)",
          animation: "blob-drift-1 24s ease-in-out infinite",
        }}
      />
      <div
        ref={setBlob(1, 22, 16)}
        className="absolute will-change-transform"
        style={{
          width: 580, height: 580,
          top: "15%", right: "-8%",
          background: "radial-gradient(circle, hsl(220 85% 65% / 0.5) 0%, hsl(200 90% 55% / 0.25) 45%, transparent 70%)",
          filter: "blur(80px)",
          animation: "blob-drift-2 30s ease-in-out infinite",
        }}
      />

      {/* Layer -2: mid-depth blobs */}
      <div
        ref={setBlob(2, -36, 28)}
        className="absolute will-change-transform"
        style={{
          width: 420, height: 420,
          bottom: "8%", left: "20%",
          background: "radial-gradient(circle, hsl(180 85% 55% / 0.45) 0%, hsl(200 80% 60% / 0.2) 45%, transparent 70%)",
          filter: "blur(60px)",
          animation: "blob-drift-3 20s ease-in-out infinite",
        }}
      />
      <div
        ref={setBlob(3, 42, -30)}
        className="absolute will-change-transform"
        style={{
          width: 340, height: 340,
          bottom: "28%", right: "12%",
          background: "radial-gradient(circle, hsl(300 70% 65% / 0.4) 0%, hsl(260 80% 60% / 0.18) 45%, transparent 70%)",
          filter: "blur(55px)",
          animation: "blob-drift-4 26s ease-in-out infinite",
        }}
      />

      {/* Layer -1: closest blobs (faster parallax) */}
      <div
        ref={setBlob(4, -55, 40)}
        className="absolute will-change-transform"
        style={{
          width: 180, height: 180,
          top: "35%", left: "8%",
          background: "radial-gradient(circle, hsl(255 85% 70% / 0.35) 0%, transparent 70%)",
          filter: "blur(35px)",
          animation: "blob-drift-2 15s ease-in-out infinite reverse",
        }}
      />
      <div
        ref={setBlob(5, 60, -45)}
        className="absolute will-change-transform"
        style={{
          width: 200, height: 200,
          top: "60%", right: "6%",
          background: "radial-gradient(circle, hsl(220 85% 70% / 0.3) 0%, transparent 70%)",
          filter: "blur(38px)",
          animation: "blob-drift-1 18s ease-in-out infinite reverse",
        }}
      />

      {/* Subtle vignette to push edges back */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 40%, hsl(var(--background) / 0.55) 100%)",
        }}
      />

      {/* Fine noise grain for physical texture */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
        }}
      />
    </div>
  );
}
