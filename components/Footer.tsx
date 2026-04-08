import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { companyProfile, navLinks, socialLinks } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t-2 border-slate-300 bg-surface-0">
      <div className="container-swiss section-y-tight">
        <div className="grid-12 gap-y-8 items-stretch">
          <div className="col-span-12 md:col-span-5 flex flex-col h-full">
            <div className="self-start">
              <Image
                src={logo}
                alt="Adrich"
                className="h-16 w-auto object-contain max-w-[320px]"
              />
            </div>
            <p className="mt-5 text-sm leading-7 text-ink-700">{companyProfile.address}</p>
            <a
              href={`tel:${companyProfile.phone.replace(/\s+/g, "")}`}
              className="mt-2 inline-flex text-sm text-ink-700 transition hover:text-ink-900 focus-visible:underline"
            >
              {companyProfile.phone}
            </a>
            <a
              href={`mailto:${companyProfile.email}`}
              className="mt-1 inline-flex text-sm text-ink-700 transition hover:text-ink-900 focus-visible:underline"
            >
              {companyProfile.email}
            </a>
            <div className="mt-auto">
              <p className="text-xs text-ink-600">
                Copyright {new Date().getFullYear()} Adrich. All rights reserved.
              </p>
            </div>
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
          </div>
        </div>
      </div>
    </footer>
  );
}
