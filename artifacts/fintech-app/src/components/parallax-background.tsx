import { useEffect, useRef, useCallback } from "react";

interface Blob {
  el: HTMLDivElement | null;
  factorX: number;
  factorY: number;
}

export function ParallaxBackground() {
  const blobsRef = useRef<Blob[]>([]);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    const dx = targetRef.current.x - currentRef.current.x;
    const dy = targetRef.current.y - currentRef.current.y;

    // Only update DOM if there's meaningful movement
    if (Math.abs(dx) > 0.0005 || Math.abs(dy) > 0.0005) {
      currentRef.current.x += dx * 0.05;
      currentRef.current.y += dy * 0.05;

      for (const { el, factorX, factorY } of blobsRef.current) {
        if (!el) continue;
        const tx = currentRef.current.x * factorX;
        const ty = currentRef.current.y * factorY;
        el.style.transform = `translate3d(${tx}px,${ty}px,0)`;
      }
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onMove = (e: MouseEvent) => {
      if (ticking) return;
      ticking = true;
      // Throttle: only read mouse position on next frame slot
      requestAnimationFrame(() => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        targetRef.current = {
          x: (e.clientX - cx) / cx,
          y: (e.clientY - cy) / cy,
        };
        ticking = false;
      });
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
      className="fixed inset-0 pointer-events-none overflow-hidden -z-10"
      aria-hidden="true"
    >
      {/* Dark-mode blobs */}
      <div
        ref={setBlob(0, -16, -12)}
        className="absolute dark:block hidden"
        style={{
          width: 680, height: 680,
          top: "-15%", left: "-12%",
          background: "radial-gradient(circle, hsl(255 85% 65% / 0.5) 0%, hsl(270 80% 50% / 0.25) 45%, transparent 70%)",
          filter: "blur(70px)",
          willChange: "transform",
        }}
      />
      <div
        ref={setBlob(1, 20, 14)}
        className="absolute dark:block hidden"
        style={{
          width: 540, height: 540,
          top: "15%", right: "-8%",
          background: "radial-gradient(circle, hsl(220 85% 65% / 0.45) 0%, hsl(200 90% 55% / 0.2) 45%, transparent 70%)",
          filter: "blur(65px)",
          willChange: "transform",
        }}
      />
      <div
        ref={setBlob(2, -30, 22)}
        className="absolute dark:block hidden"
        style={{
          width: 380, height: 380,
          bottom: "10%", left: "22%",
          background: "radial-gradient(circle, hsl(180 85% 55% / 0.35) 0%, hsl(200 80% 60% / 0.15) 45%, transparent 70%)",
          filter: "blur(55px)",
          willChange: "transform",
        }}
      />

      {/* Light-mode blobs — softer, more pastel */}
      <div
        ref={setBlob(3, -16, -12)}
        className="absolute dark:hidden block"
        style={{
          width: 680, height: 680,
          top: "-15%", left: "-12%",
          background: "radial-gradient(circle, hsl(255 80% 75% / 0.18) 0%, hsl(270 70% 65% / 0.08) 45%, transparent 70%)",
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />
      <div
        ref={setBlob(4, 20, 14)}
        className="absolute dark:hidden block"
        style={{
          width: 540, height: 540,
          top: "15%", right: "-8%",
          background: "radial-gradient(circle, hsl(220 85% 70% / 0.15) 0%, hsl(200 90% 65% / 0.07) 45%, transparent 70%)",
          filter: "blur(75px)",
          willChange: "transform",
        }}
      />
      <div
        ref={setBlob(5, -30, 22)}
        className="absolute dark:hidden block"
        style={{
          width: 380, height: 380,
          bottom: "10%", left: "22%",
          background: "radial-gradient(circle, hsl(180 75% 60% / 0.12) 0%, hsl(200 70% 65% / 0.05) 45%, transparent 70%)",
          filter: "blur(65px)",
          willChange: "transform",
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 40%, hsl(var(--background) / 0.5) 100%)",
        }}
      />
    </div>
  );
}
