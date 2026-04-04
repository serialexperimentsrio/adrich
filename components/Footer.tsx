import Link from "next/link";
import { companyProfile, navLinks, socialLinks } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-slate-300 bg-surface-0">
      <div className="container-swiss section-y-tight">
        <div className="grid-12 gap-y-8">
          <div className="col-span-12 md:col-span-5">
            <p className="font-display text-xl font-semibold text-ink-900">{companyProfile.name}</p>
            <p className="mt-1 max-w-sm text-xs uppercase tracking-[0.12em] text-ink-600">{companyProfile.tagline}</p>
            <p className="mt-5 text-sm leading-7 text-ink-700">{companyProfile.address}</p>
            <p className="mt-2 text-sm text-ink-700">{companyProfile.phone}</p>
            <p className="mt-1 text-sm text-ink-700">{companyProfile.email}</p>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="text-kicker">Navigate</p>
            <ul className="mt-3 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link className="text-xs uppercase tracking-[0.09em] text-ink-700 transition hover:text-ink-900" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-4">
            <p className="text-kicker">Connect</p>
            <ul className="mt-3 space-y-2">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    className="text-xs uppercase tracking-[0.09em] text-ink-700 transition hover:text-ink-900"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-ink-600">
              Copyright {new Date().getFullYear()} Adrich. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
