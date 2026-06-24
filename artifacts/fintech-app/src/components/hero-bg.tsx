import { useEffect, useRef } from "react";

export function HeroBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Nodes
    type Node = { x: number; y: number; vx: number; vy: number; r: number; color: string; phase: number };
    const nodes: Node[] = Array.from({ length: 28 }, () => ({
      x: Math.random() * 1440,
      y: Math.random() * 900,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 2.5 + 1,
      color: ["#7c3aed","#3b82f6","#06b6d4","#a855f7"][Math.floor(Math.random() * 4)],
      phase: Math.random() * Math.PI * 2,
    }));

    // Orbs (static, drawn once into offscreen)
    const offscreen = document.createElement("canvas");
    const drawOrbs = () => {
      offscreen.width = W || 1440;
      offscreen.height = H || 900;
      const oc = offscreen.getContext("2d")!;

      const orbs = [
        { x: 0.22, y: 0.38, r: 0.28, c: "#7c3aed", a: 0.45 },
        { x: 0.76, y: 0.3,  r: 0.22, c: "#3b82f6", a: 0.35 },
        { x: 0.5,  y: 0.78, r: 0.18, c: "#06b6d4", a: 0.28 },
        { x: 0.9,  y: 0.72, r: 0.15, c: "#a855f7", a: 0.22 },
      ];
      for (const o of orbs) {
        const grd = oc.createRadialGradient(
          o.x * offscreen.width, o.y * offscreen.height, 0,
          o.x * offscreen.width, o.y * offscreen.height, o.r * offscreen.width,
        );
        grd.addColorStop(0, o.c + Math.round(o.a * 255).toString(16).padStart(2,"0"));
        grd.addColorStop(1, o.c + "00");
        oc.fillStyle = grd;
        oc.fillRect(0, 0, offscreen.width, offscreen.height);
      }
    };
    drawOrbs();

    // Grid lines — draw once onto a separate offscreen
    const gridCanvas = document.createElement("canvas");
    const drawGrid = () => {
      gridCanvas.width = W || 1440;
      gridCanvas.height = H || 900;
      const gc = gridCanvas.getContext("2d")!;
      gc.strokeStyle = "rgba(124,58,237,0.12)";
      gc.lineWidth = 0.6;
      for (let y = 0; y < gridCanvas.height; y += 110) {
        gc.beginPath(); gc.moveTo(0, y); gc.lineTo(gridCanvas.width, y); gc.stroke();
      }
      for (let x = 0; x < gridCanvas.width; x += 120) {
        gc.beginPath(); gc.moveTo(x, 0); gc.lineTo(x, gridCanvas.height); gc.stroke();
      }
    };
    drawGrid();

    let t = 0;
    const draw = () => {
      if (!ctx || !W || !H) { rafRef.current = requestAnimationFrame(draw); return; }

      // Background
      ctx.fillStyle = "#060412";
      ctx.fillRect(0, 0, W, H);

      // Orbs (cached)
      ctx.drawImage(offscreen, 0, 0, W, H);

      // Grid (cached)
      ctx.drawImage(gridCanvas, 0, 0, W, H);

      t += 0.008;

      // Move & draw nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0) n.x = W;
        if (n.x > W) n.x = 0;
        if (n.y < 0) n.y = H;
        if (n.y > H) n.y = 0;

        const pulse = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 2 + n.phase));
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 14);
        grd.addColorStop(0, n.color + Math.round(pulse * 200).toString(16).padStart(2,"0"));
        grd.addColorStop(1, n.color + "00");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 14, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.fillStyle = `rgba(255,255,255,${pulse * 0.85})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw connecting lines between nearby nodes (max 40px apart)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.18;
            ctx.strokeStyle = `rgba(124,58,237,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Bottom fade
      const fade = ctx.createLinearGradient(0, H * 0.55, 0, H);
      fade.addColorStop(0, "rgba(6,4,18,0)");
      fade.addColorStop(1, "rgba(6,4,18,1)");
      ctx.fillStyle = fade;
      ctx.fillRect(0, H * 0.55, W, H * 0.45);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      style={{ display: "block" }}
    />
  );
}
