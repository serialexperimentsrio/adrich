"use client";

import { useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { clientLogos } from "@/data/site";

const STEP_MS = 1600;

/**
 * Client logos laid out like a contact sheet. One logo at a time turns to full
 * colour while the rest stay black and white; hovering a logo highlights it instead.
 */
export default function ClientWall() {
  const ref = useRef<HTMLUListElement | null>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (!inView || hovered !== null) return;
    const id = setInterval(() => setActive((current) => (current + 1) % clientLogos.length), STEP_MS);
    return () => clearInterval(id);
  }, [inView, hovered]);

  const highlighted = hovered ?? active;

  return (
    <ul
      ref={ref}
      className="grid grid-cols-2 gap-px bg-ink/10 sm:grid-cols-3 lg:grid-cols-6"
      aria-label="Clients"
      onMouseLeave={() => setHovered(null)}
    >
      {clientLogos.map((logo, index) => (
        <li key={logo.src} className="bg-paper" onMouseEnter={() => setHovered(index)}>
          <Reveal delay={index * 0.06} y={16}>
            <div className="crop relative m-6 flex aspect-[3/2] items-center justify-center text-ink/40">
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                sizes="200px"
                className={`object-contain p-2 mix-blend-multiply transition-[filter,opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  highlighted === index ? "scale-105 opacity-100 grayscale-0" : "opacity-60 grayscale"
                }`}
              />
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
