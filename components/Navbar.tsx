"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import DhakaClock from "@/components/DhakaClock";
import { useProposalModal } from "@/components/ProposalModalProvider";
import { companyProfile, navLinks, socialLinks } from "@/data/site";
import { lockScroll, unlockScroll } from "@/lib/smoothScroll";
import logo from "@/public/logo.png";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const { openModal } = useProposalModal();
  // The menu is open only on the page where it was opened, so navigating closes it.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuOpen = menuPath === pathname;
  const setMenuOpen = (open: boolean) => setMenuPath(open ? pathname : null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();

  // Hide while scrolling down, reveal when scrolling up.
  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(current > 24);
    setHidden(current > 240 && current > previous);
  });

  useEffect(() => {
    if (!menuOpen) return;
    lockScroll();
    menuRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuPath(null);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      unlockScroll();
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled && !menuOpen
            ? "border-b border-ink/10 bg-paper/80 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
        animate={{ y: hidden && !menuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-x flex h-[4.75rem] items-center justify-between gap-6 lg:h-24">
          <Link
            href="/"
            aria-label="Adrich home"
            className={`relative z-10 shrink-0 transition-opacity duration-300 ${menuOpen ? "pointer-events-none opacity-0" : ""}`}
          >
            <Image src={logo} alt="Adrich" priority className="h-12 w-auto sm:h-14 lg:h-16" />
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link, index) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className="group caption flex items-baseline gap-1.5 !text-[0.85rem] !tracking-[0.08em] text-ink"
                >
                  <span className="text-[0.65rem] text-ink-mute">0{index + 1}</span>
                  <span className={`link-u ${active ? "!bg-[length:100%_1px]" : ""}`}>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <DhakaClock className="caption hidden text-ink-mute xl:inline" />
            <button type="button" className="btn-base btn-primary" onClick={() => openModal()}>
              Start a project
            </button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="caption relative z-10 flex items-center gap-3 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={menuOpen ? "text-paper" : "text-ink"}>{menuOpen ? "Close" : "Menu"}</span>
            <span className="relative block h-3 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 h-px w-full transition-all duration-500 ${
                  menuOpen ? "top-1.5 rotate-45 bg-paper" : "top-0 bg-ink"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full transition-all duration-500 ${
                  menuOpen ? "top-1.5 -rotate-45 bg-paper" : "top-3 bg-ink"
                }`}
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            className="fixed inset-0 z-40 flex flex-col bg-night text-paper lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
          >
            <nav aria-label="Mobile navigation" className="container-x flex flex-1 flex-col justify-center gap-1 pt-20">
              {[{ label: "Home", href: "/" }, ...navLinks].map((link, index) => (
                <div key={link.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 + index * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`display flex items-baseline gap-3 text-[clamp(3rem,15vw,5.5rem)] ${
                        isActive(pathname, link.href) ? "text-amber" : "text-paper"
                      }`}
                    >
                      <span className="caption text-paper/40">0{index}</span>
                      {link.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div
              className="container-x caption flex flex-col gap-3 border-t border-night-line py-6 text-paper/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a href={`mailto:${companyProfile.email}`} className="text-paper">
                {companyProfile.email}
              </a>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
                    {social.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
