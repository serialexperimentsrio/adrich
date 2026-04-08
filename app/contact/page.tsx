import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle, PhoneCall } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SectionIntro from "@/components/SectionIntro";
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
          <Reveal>
            <SectionIntro
              title="Let us build your next campaign"
              description="Share your brief and the Adrich team will design a tailored campaign approach based on your goals, audience, and timeline."
              titleAs="h1"
              align="center"
              showDivider
            />
          </Reveal>
        </div>
      </section>

      <section className="section-y">
        <div className="container-swiss">
          <div className="grid-12 gap-y-6">
            <Reveal className="col-span-12 md:col-span-5">
              <article className="border-2 border-slate-300 bg-white p-4 md:p-5">
                  <p className="text-kicker">At a Glance</p>
                  <div className="mt-3 space-y-4 text-sm">
                    <div className="rule-item">
                      <p className="text-kicker">Headquarters</p>
                      <p className="mt-2 font-medium text-ink-900">{companyProfile.headquarters}</p>
                    </div>
                    <div className="rule-item">
                      <p className="text-kicker">Industry</p>
                      <p className="mt-2 font-medium text-ink-900">{companyProfile.industry}</p>
                    </div>
                    <div className="rule-item">
                      <p className="text-kicker">Address</p>
                      <p className="mt-2 text-sm leading-7 text-ink-800">{companyProfile.address}</p>
                    </div>
                  </div>

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
