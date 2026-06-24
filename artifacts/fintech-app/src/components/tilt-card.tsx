import { useTilt } from "@/hooks/use-tilt";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  disabled?: boolean;
}

export function TiltCard({ children, className, max = 7, scale = 1.02, disabled = false }: TiltCardProps) {
  const { ref, glareRef, onMouseMove, onMouseLeave, onMouseEnter } = useTilt({ max, scale });

  if (disabled) {
    return <div className={cn("float-card relative overflow-hidden rounded-xl", className)}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={cn("float-card relative overflow-hidden rounded-xl cursor-default", className)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glare reflection layer */}
      <div ref={glareRef} className="tilt-glare" />
      {children}
    </div>
  );
}
