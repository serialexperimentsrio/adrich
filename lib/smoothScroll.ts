import type Lenis from "lenis";

/** Shared handle to the page's Lenis instance so overlays can pause smooth scrolling. */
let instance: Lenis | null = null;
let locks = 0;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

/** Lock page scrolling (e.g. while a modal or menu is open). Calls are counted. */
export function lockScroll() {
  locks += 1;
  instance?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;
  instance?.start();
  document.documentElement.style.overflow = "";
}
