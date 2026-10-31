import Link from "next/link";
import DhakaClock from "@/components/DhakaClock";
import Logo from "@/components/Logo";
import { companyProfile, navLinks, socialLinks } from "@/data/site";

export default function Footer() {
  const phoneHref = `tel:${companyProfile.phone.replace(/[^\d+]/g, "")}`;

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

        <Logo className="mx-auto mt-20 block h-auto w-full max-w-4xl" />

        <div className="caption mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-6 pr-16 text-ink-mute md:pr-24">
          <span>© {new Date().getFullYear()} Adrich. Think. Create. Influence.</span>
          <DhakaClock />
          <span>
            Designed and developed by{" "}
            <a
              href="https://github.com/serialexperimentsrio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-1 underline-offset-4 transition-colors hover:text-red"
            >
              Rio
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
