"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  alt: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  alt,
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(5, p - 5));
    if (e.key === "ArrowRight") setPosition((p) => Math.min(95, p + 5));
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative aspect-[16/10] w-full overflow-hidden rounded-sm select-none", className)}
    >
      <Image src={afterImage} alt={`${alt} — after`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image src={beforeImage} alt={`${alt} — before`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>

      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-lg"
        style={{ left: `${position}%` }}
      />

      <div
        role="slider"
        tabIndex={0}
        aria-label={alt}
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        className="absolute top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-brand-dark shadow-xl transition-transform hover:scale-110"
        style={{ left: `${position}%` }}
      >
        <GripVertical className="h-5 w-5" />
      </div>

      <span className="absolute bottom-3 left-3 rounded bg-black/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
        Before
      </span>
      <span className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
        After
      </span>
    </div>
  );
}
