"use client";

import Link from "next/link";
import DhakaClock from "@/components/DhakaClock";
import { companyProfile, navLinks, socialLinks } from "@/data/site";
import { getLenis } from "@/lib/smoothScroll";

export default function Footer() {
  const phoneHref = `tel:${companyProfile.phone.replace(/[^\d+]/g, "")}`;

  const backToTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-paper-2 text-ink">
      <div className="container-x pt-20 pb-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="caption text-ink-mute">Studio</p>
            <address className="mt-4 max-w-[30ch] text-lg not-italic leading-snug">{companyProfile.address}</address>
            <div className="mt-6 flex flex-col gap-1 text-lg">
              <a href={`mailto:${companyProfile.email}`} className="link-u w-fit">
                {companyProfile.email}
              </a>
              <a href={phoneHref} className="link-u w-fit">
                {companyProfile.phone}
              </a>
            </div>
          </div>

          <nav className="md:col-span-3" aria-label="Footer navigation">
            <p className="caption text-ink-mute">Index</p>
            <ul className="mt-4 space-y-1.5 text-lg">
              {[{ label: "Home", href: "/" }, ...navLinks].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-u">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="caption text-ink-mute">Elsewhere</p>
            <ul className="mt-4 space-y-1.5 text-lg">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="link-u">
                    {social.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          className="display mt-20 select-none text-center text-[23.5vw] leading-[0.78] tracking-[-0.02em] lowercase"
          aria-hidden="true"
        >
          adr<span className="text-red">i</span>ch
        </p>

        <div className="caption mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-6 text-ink-mute">
          <span>© {new Date().getFullYear()} Adrich. Think. Create. Influence.</span>
          <DhakaClock />
          <button type="button" onClick={backToTop} className="link-u">
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
