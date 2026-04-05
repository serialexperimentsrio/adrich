import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle, PhoneCall } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { companyProfile, socialLinks } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Adrich for campaign strategy, production planning, and full-service advertising execution.",
};

export default function ContactPage() {
  return (
    <>
      <section className="section-y border-b-2 border-slate-300 bg-white">
        <div className="container-swiss">
          <Reveal className="max-w-3xl">
            <p className="text-kicker">Contact</p>
            <h1 className="hero-title mt-4 text-ink-900">Let us build your next campaign</h1>
            <p className="mt-4 text-base leading-7 text-ink-700">
              Share your brief and the Adrich team will design a tailored campaign approach based on your goals,
              audience, and timeline.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-swiss">
          <div className="grid-12 gap-y-6">
            <Reveal className="col-span-12 md:col-span-5">
              <article className="border-2 border-slate-300 bg-white p-4 md:p-5">
                <p className="text-kicker">Address</p>
                <p className="mt-3 text-sm leading-7 text-ink-800">{companyProfile.address}</p>

                <div className="mt-6 space-y-2 text-sm text-ink-700">
                  <a
                    href={`tel:${companyProfile.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-2 transition hover:text-ink-900 focus-visible:underline"
                  >
                    <PhoneCall size={14} aria-hidden="true" />
                    {companyProfile.phone}
                  </a>
                  <a
                    href={`mailto:${companyProfile.email}`}
                    className="inline-flex transition hover:text-ink-900 focus-visible:underline"
                  >
                    {companyProfile.email}
                  </a>
                </div>

                <a
                  href={`https://wa.me/8801712000000`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-base btn-primary mt-6"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  WhatsApp Us
                </a>

                <div className="mt-6">
                  <p className="text-kicker">Social</p>
                  <ul className="mt-3 flex flex-wrap gap-3">
                    {socialLinks.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-chip"
                        >
                          {social.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>

            <Reveal className="col-span-12 md:col-span-7">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-y-tight border-t-2 border-slate-300 bg-white">
        <div className="container-swiss">
          <Reveal>
            <p className="text-kicker">Location Map</p>
            <div className="mt-5 overflow-hidden rounded-sm border-2 border-slate-300">
              <Image
                src="/map-placeholder.svg"
                alt="Google map placeholder for Adrich office"
                width={1200}
                height={720}
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
