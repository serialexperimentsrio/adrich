"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export default function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.dataset.reveal = "visible";
      return;
    }

    const isInViewport = () => {
      const rect = node.getBoundingClientRect();
      return rect.top <= window.innerHeight && rect.bottom >= 0;
    };

    if (isInViewport()) {
      node.dataset.reveal = "visible";
      return;
    }

    if (!("IntersectionObserver" in window)) {
      node.dataset.reveal = "visible";
      return;
    }

    node.dataset.reveal = "pending";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "visible";
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={`reveal ${className ?? ""}`.trim()}>
      {children}
    </div>
  );
}
