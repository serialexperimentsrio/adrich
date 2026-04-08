"use client";

import React, { useEffect, useRef } from "react";

type ClientCarouselProps = {
  images: string[];
  height?: number;
  autoPlayInterval?: number;
};

export default function ClientCarousel({
  images,
  height = 80,
  autoPlayInterval = 3000,
}: ClientCarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || images.length === 0) return;

    let index = 0;
    const step = () => {
      index = (index + 1) % images.length;
      const child = el.children[index] as HTMLElement | undefined;
      if (child) {
        el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: "smooth" });
      }
    };

    const id = setInterval(step, autoPlayInterval);
    return () => clearInterval(id);
  }, [images, autoPlayInterval]);

  return (
    <div className="overflow-hidden" aria-hidden={false}>
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth py-6 no-scrollbar"
        style={{ alignItems: "center" }}
      >
        {images.map((src, i) => (
          <div key={i} className="flex-none w-40 h-20 flex items-center justify-center">
            <img src={src} alt={`Client logo ${i + 1}`} className="max-h-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}
