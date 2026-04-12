"use client";

import React, { useEffect, useRef } from "react";

type DotState = {
  id: number;
  col: number;
  row: number;
  axis: "h" | "v";
  dir: 1 | -1;
  speed: number; // px per second
};

export default function HeroPattern({ dotCount = 8 }: { dotCount?: number }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<Array<HTMLSpanElement | null>>([]);
  const stateRef = useRef<{
    dots: DotState[];
    cols: number;
    rows: number;
    gridSize: number;
    gridOffset: number;
    running: boolean;
    axisBias: number;
  }>({ dots: [], cols: 0, rows: 0, gridSize: 48, gridOffset: 0, running: false, axisBias: 0.5 });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (prefersReduced?.matches) return; // don't animate when user prefers reduced motion

    const cs = getComputedStyle(wrapper);
    const gridSizeStr = cs.getPropertyValue("--grid-size") || "48px";
    const gridSize = Math.max(8, parseFloat(gridSizeStr));
    const gridLineThicknessStr = cs.getPropertyValue("--grid-line-thickness") || "2px";
    const gridLineThickness = Math.max(1, parseFloat(gridLineThicknessStr));
    const offset = gridLineThickness / 2;
    const axisBiasStr = cs.getPropertyValue("--dot-axis-bias") || "0.5";
    const axisBias = Math.min(1, Math.max(0, parseFloat(axisBiasStr)));

    const rect = wrapper.getBoundingClientRect();
    const cols = Math.max(1, Math.floor((rect.width - offset) / gridSize) + 1);
    const rows = Math.max(1, Math.floor((rect.height - offset) / gridSize) + 1);

    const dots: DotState[] = [];
    for (let i = 0; i < dotCount; i++) {
      const col = Math.floor(Math.random() * cols);
      const row = Math.floor(Math.random() * rows);
      // axisBias: 0 => prefer vertical, 1 => prefer horizontal
      let axis: "h" | "v" = Math.random() < axisBias ? "h" : "v";
      if (axis === "h" && cols < 2 && rows > 1) axis = "v";
      if (axis === "v" && rows < 2 && cols > 1) axis = "h";
      const dir: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
      const speed = 40 + Math.random() * 90; // px/s
      dots.push({ id: i, col, row, axis, dir, speed });
    }

    stateRef.current = { dots, cols, rows, gridSize, gridOffset: offset, running: true, axisBias };
    let mounted = true;
    const timers: number[] = [];

    // initial placement
    // initial placement (offset to the center of the grid line)
    // use transform-based placement for GPU-accelerated compositing
    dots.forEach((d, idx) => {
      const el = dotsRef.current[idx];
      if (!el) return;
      const x = d.col * gridSize + offset;
      const y = d.row * gridSize + offset;
      el.style.transition = "none";
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(calc(-50% + var(--dot-nudge-x)), calc(-50% + var(--dot-nudge-y)))`;
    });

    function scheduleMove(dot: DotState, el: HTMLSpanElement | null) {
      if (!el || !mounted) return;
      const s = stateRef.current;
      const { cols, rows, gridSize, gridOffset } = s;

      let nextCol = dot.col;
      let nextRow = dot.row;

      if (dot.axis === "h") {
        nextCol = dot.col + dot.dir;
        if (nextCol < 0 || nextCol >= cols) {
          // at edge: either flip or switch axis
          if (rows > 1 && Math.random() < 0.4) {
            dot.axis = "v";
            dot.dir = Math.random() < 0.5 ? 1 : -1;
            // when switching axis, stay on the same column and move vertically
            nextCol = dot.col;
            nextRow = dot.row + dot.dir;
            if (nextRow < 0) { nextRow = 0; dot.dir = 1; }
            if (nextRow >= rows) { nextRow = rows - 1; dot.dir = -1; }
          } else {
            dot.dir = (-dot.dir) as 1 | -1;
            nextCol = dot.col + dot.dir;
          }
        }
      } else {
        nextRow = dot.row + dot.dir;
        if (nextRow < 0 || nextRow >= rows) {
          if (cols > 1 && Math.random() < 0.4) {
            dot.axis = "h";
            dot.dir = Math.random() < 0.5 ? 1 : -1;
            // when switching axis, stay on the same row and move horizontally
            nextRow = dot.row;
            nextCol = dot.col + dot.dir;
            if (nextCol < 0) { nextCol = 0; dot.dir = 1; }
            if (nextCol >= cols) { nextCol = cols - 1; dot.dir = -1; }
          } else {
            dot.dir = (-dot.dir) as 1 | -1;
            nextRow = dot.row + dot.dir;
          }
        }
      }

      const targetX = nextCol * gridSize + gridOffset;
      const targetY = nextRow * gridSize + gridOffset;
      const curX = dot.col * gridSize + gridOffset;
      const curY = dot.row * gridSize + gridOffset;
      const dx = Math.abs(targetX - curX);
      const dy = Math.abs(targetY - curY);
      const distance = Math.sqrt(dx*dx + dy*dy);
      const duration = Math.max(0.12, distance / dot.speed);

      // animate transform for smooth GPU-accelerated motion
      el.style.transition = `transform ${duration}s linear`;
      requestAnimationFrame(() => {
        el.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(calc(-50% + var(--dot-nudge-x)), calc(-50% + var(--dot-nudge-y)))`;
      });

      // schedule the next move when the CSS transition finishes.
      // use a transitionend listener (with a once-flag via `ended`) and
      // a timeout fallback in case the event does not fire.
      let ended = false;
      const onTransitionEnd = (ev: TransitionEvent) => {
        if (!mounted) return;
        // only react to transform completions
        if (ev.propertyName !== "transform" && ev.propertyName !== "-webkit-transform") return;
        if (ended) return;
        ended = true;
        try { el.removeEventListener("transitionend", onTransitionEnd as EventListener); } catch {}
        dot.col = nextCol;
        dot.row = nextRow;
        if (Math.random() < 0.12) dot.axis = Math.random() < s.axisBias ? "h" : "v";
        // schedule next move on the next frame to avoid potential re-entrancy
        requestAnimationFrame(() => scheduleMove(dot, el));
      };

      el.addEventListener("transitionend", onTransitionEnd as EventListener, { once: true });

      const toId = window.setTimeout(() => {
        if (ended || !mounted) return;
        ended = true;
        try { el.removeEventListener("transitionend", onTransitionEnd as EventListener); } catch {}
        dot.col = nextCol;
        dot.row = nextRow;
        if (Math.random() < 0.12) dot.axis = Math.random() < s.axisBias ? "h" : "v";
        scheduleMove(dot, el);
      }, duration * 1000 + 80);
      timers.push(toId);

      // clear fallback if unmounted before it fires
      // (note: we don't keep references to timeouts elsewhere; it's fine to leave it)
    }

    dots.forEach((dot, idx) => {
      const el = dotsRef.current[idx];
      const id = window.setTimeout(() => scheduleMove(dot, el), idx * 200);
      timers.push(id);
    });

    // keep grid responsive
    let resizeObs: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObs = new ResizeObserver(() => {
        if (!wrapperRef.current) return;
        const r = wrapperRef.current.getBoundingClientRect();
        const cs2 = getComputedStyle(wrapperRef.current);
        const gridSizeStr2 = cs2.getPropertyValue("--grid-size") || "48px";
        const gridSize2 = Math.max(8, parseFloat(gridSizeStr2));
        const gridLineThicknessStr2 = cs2.getPropertyValue("--grid-line-thickness") || "2px";
        const gridLineThickness2 = Math.max(1, parseFloat(gridLineThicknessStr2));
        const offset2 = gridLineThickness2 / 2;
        const axisBiasStr2 = cs2.getPropertyValue("--dot-axis-bias") || "0.5";
        const axisBias2 = Math.min(1, Math.max(0, parseFloat(axisBiasStr2)));

        const colsNew = Math.max(1, Math.floor((r.width - offset2) / gridSize2) + 1);
        const rowsNew = Math.max(1, Math.floor((r.height - offset2) / gridSize2) + 1);

        const s = stateRef.current;
        s.gridSize = gridSize2;
        s.gridOffset = offset2;
        s.cols = colsNew;
        s.rows = rowsNew;
        s.axisBias = axisBias2;

        // reposition dots to nearest valid grid cell without transition
        s.dots.forEach((d, idx) => {
          d.col = Math.max(0, Math.min(d.col, colsNew - 1));
          d.row = Math.max(0, Math.min(d.row, rowsNew - 1));
          const el = dotsRef.current[idx];
          if (!el) return;
          const x = d.col * gridSize2 + offset2;
          const y = d.row * gridSize2 + offset2;
          el.style.transition = "none";
          el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(calc(-50% + var(--dot-nudge-x)), calc(-50% + var(--dot-nudge-y)))`;
        });
      });
      resizeObs.observe(wrapper);
    }

    return () => {
      mounted = false;
      stateRef.current.running = false;
      try { timers.forEach((t) => clearTimeout(t)); } catch {}
      if (resizeObs) resizeObs.disconnect();
    };

  }, [dotCount]);

  return (
    <div className="hero-pattern__wrapper" aria-hidden="true" ref={wrapperRef}>
      <div className="pattern-grid" />
      <div className="pattern-dots">
        {Array.from({ length: dotCount }).map((_, i) => (
          <span
            key={i}
            className="dot"
            ref={(el) => { dotsRef.current[i] = el; }}
          />
        ))}
      </div>
    </div>
  );
}
