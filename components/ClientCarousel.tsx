"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type ClientLogo = {
  name: string;
  src: string;
};

type ClientCarouselProps = {
  logos: readonly ClientLogo[];
  autoPlayInterval?: number;
};

export default function ClientCarousel({ logos, autoPlayInterval = 3000 }: ClientCarouselProps) {
  const containerRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || logos.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let index = 0;
    const step = () => {
      // Nothing to scroll when every logo already fits.
      if (el.scrollWidth <= el.clientWidth) return;
      index = (index + 1) % logos.length;
      const child = el.children[index] as HTMLElement | undefined;
      if (child) {
        el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: "smooth" });
      }
    };

    const id = setInterval(step, autoPlayInterval);
    return () => clearInterval(id);
  }, [logos, autoPlayInterval]);

  return (
    <div className="overflow-hidden">
      <ul
        ref={containerRef}
        className="flex items-center gap-6 overflow-x-auto scroll-smooth py-6 no-scrollbar justify-center"
        aria-label="Client logos"
      >
        {logos.map((logo) => (
          <li key={logo.src} className="relative flex-none w-40 h-20">
            <Image src={logo.src} alt={logo.name} fill sizes="160px" className="object-contain" />
          </li>
        ))}
      </ul>
    </div>
  );
}
