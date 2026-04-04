"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import RequestProposalButton from "@/components/RequestProposalButton";
import { companyProfile, navLinks } from "@/data/site";

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

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-200 ${
        scrolled ? "nav-glass border-slate-300/90" : "border-slate-300/60 bg-surface-0/90"
      }`}
    >
      <div className="container-swiss">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="group inline-flex items-baseline gap-2">
            <span className="font-display text-lg font-semibold tracking-tight text-ink-900">
              {companyProfile.name}
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.14em] text-ink-600 lg:inline">
              {companyProfile.tagline}
            </span>
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
            <RequestProposalButton variant="secondary" className="min-h-10" />
          </div>

          <button
            type="button"
            className="rounded-md border border-slate-300 p-2 text-ink-800 transition hover:border-ink-900 hover:bg-white md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-slate-300 bg-surface-1 px-4 py-4 md:hidden">
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
            <RequestProposalButton className="mt-2 w-full justify-center" variant="secondary" />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
