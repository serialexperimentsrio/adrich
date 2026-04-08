"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import RequestProposalButton from "@/components/RequestProposalButton";
import logo from "@/public/logo.png";
import { navLinks } from "@/data/site";

function linkIsActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuId = "mobile-navigation";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    const firstFocusable = mobileMenuRef.current?.querySelector<HTMLElement>("a[href], button:not([disabled])");
    firstFocusable?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b-2 transition-all duration-150 ${
        scrolled ? "nav-glass border-slate-300/90" : "border-slate-300/60 bg-surface-0/90"
      }`}
    >
      <div className="container-swiss">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="group inline-flex items-center" aria-label="Adrich home">
            <Image
              src={logo}
              alt="Adrich"
              priority
              className="h-11 w-auto sm:h-12 object-contain max-w-[220px]"
            />
          </Link>

          <nav className="hidden items-center gap-5 md:flex" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = linkIsActive(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${active ? "nav-link-active" : ""}`.trim()}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <RequestProposalButton className="justify-center" />
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="btn-icon inline-flex items-center justify-center p-2 md:!hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls={mobileMenuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div
        id={mobileMenuId}
        ref={mobileMenuRef}
        aria-hidden={!menuOpen}
        className={`border-t-2 border-slate-300 bg-surface-1 px-4 py-4 md:!hidden overflow-hidden transition-[max-height,opacity,transform] duration-150 ease-out ${
          menuOpen
            ? "visible max-h-96 translate-y-0 opacity-100"
            : "invisible pointer-events-none max-h-0 -translate-y-1 opacity-0"
        }`}
      >
        <nav className="container-swiss flex flex-col gap-2" aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const active = linkIsActive(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`border-l-2 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                  active
                    ? "border-ink-900 text-ink-900"
                    : "border-transparent text-ink-700 hover:border-slate-400 hover:text-ink-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <RequestProposalButton className="mt-2 w-full justify-center" />
        </nav>
      </div>
    </header>
  );
}
