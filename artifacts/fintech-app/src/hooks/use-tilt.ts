import { useRef, useCallback } from "react";

interface TiltOptions {
  max?: number;       // max tilt degrees (default 8)
  scale?: number;     // scale on hover (default 1.02)
  glare?: boolean;    // show glare (default true)
  speed?: number;     // transition speed ms (default 300)
}

export function useTilt(opts: TiltOptions = {}) {
  const { max = 8, scale = 1.025, speed = 300 } = opts;
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;   // 0–1
      const y = (e.clientY - rect.top) / rect.height;    // 0–1
      const rotX = (0.5 - y) * max * 2;   // positive = top tilts toward viewer
      const rotY = (x - 0.5) * max * 2;

      el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${scale},${scale},${scale})`;

      if (glareRef.current) {
        const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI);
        const intensity = Math.hypot(x - 0.5, y - 0.5) * 0.6;
        glareRef.current.style.opacity = String(intensity);
        glareRef.current.style.background =
          `linear-gradient(${angle}deg, rgba(255,255,255,0.22) 0%, transparent 60%)`;
      }
    });
  }, [max, scale]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(rafRef.current);
    el.style.transition = `transform ${speed}ms cubic-bezier(0.03,0.98,0.52,0.99)`;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
    setTimeout(() => { if (el) el.style.transition = ""; }, speed);
  }, [speed]);

  const onMouseEnter = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transition = "transform 0.1s ease-out";
  }, []);

  return { ref, glareRef, onMouseMove, onMouseLeave, onMouseEnter };
}
