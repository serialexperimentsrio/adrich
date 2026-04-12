import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { companyProfile, navLinks, socialLinks } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-swiss section-y-tight">
        <div className="grid-12 gap-y-12 items-start">
          <div className="col-span-12 md:col-span-5 flex flex-col h-full items-start">
            <div className="self-start">
              <Image
                src={logo}
                alt="Adrich"
                className="h-12 w-auto object-contain max-w-[280px]"
              />
            </div>

            <p className="mt-6 max-w-xs text-[0.85rem] leading-7 text-ink-700">{companyProfile.address}</p>

            <div className="mt-4 flex flex-col gap-1">
              <a
                href={`tel:${companyProfile.phone.replace(/[^\\d+]/g, "")}`}
                className="inline-flex text-[0.85rem] font-medium text-ink-900 transition hover:text-brand-red"
              >
                {companyProfile.phone}
              </a>

              <a
                href={`mailto:${companyProfile.email}`}
                className="inline-flex text-[0.85rem] font-medium text-ink-900 transition hover:text-brand-red"
              >
                {companyProfile.email}
              </a>
            </div>

            <div className="mt-12">
              <p className="text-[10px] font-bold uppercase tracking-widest text-ink-400">
                &copy; {new Date().getFullYear()} Adrich Agency. Dhaka, Bangladesh.
              </p>
            </div>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="text-kicker">Navigate</p>
            <ul className="mt-3 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="nav-link text-xs uppercase tracking-[0.09em] text-ink-700 transition hover:text-ink-900"
                    href={link.href}
                  >
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
                    className="nav-link text-xs uppercase tracking-[0.09em] text-ink-700 transition hover:text-ink-900"
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
