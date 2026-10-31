import type { Metadata } from "next";
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
  const phoneDigits = companyProfile.phone.replace(/[^\d+]/g, "");
  const telHref = `tel:${phoneDigits}`;
  const waHref = `https://wa.me/${phoneDigits.replace(/^\+/, "")}`;
  return (
    <>
      <section className="section-y border-b border-slate-200 bg-white">
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
          <div className="grid-12 gap-y-6 items-stretch gap-x-6">
            <Reveal className="col-span-12 md:col-span-5 flex">
              <article className="border border-slate-200 bg-white p-4 md:p-5 rounded-sm flex-1 flex flex-col justify-between">
                <div>
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
                </div>

                <div>
                  <div className="mt-6 flex flex-col items-start gap-2 text-sm text-ink-700">
                      <a href={telHref} className="inline-flex items-center gap-2 underline-link">
                        <PhoneCall size={14} aria-hidden="true" />
                        {companyProfile.phone}
                      </a>
                      <a href={`mailto:${companyProfile.email}`} className="inline-flex items-center gap-2 underline-link">
                        {companyProfile.email}
                      </a>
                    </div>

                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-base btn-primary mt-6 inline-flex items-center gap-2"
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
                            aria-label={social.label}
                          >
                            {social.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal className="col-span-12 md:col-span-7 flex">
              <div className="flex-1">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-y-tight border-t border-slate-200 bg-white">
        <div className="container-swiss">
          <Reveal>
            <p className="text-kicker">Location Map</p>
            <div className="mt-5 overflow-hidden rounded-sm border border-slate-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.7134651465412!2d90.3975753!3d23.864306499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c423e474a863%3A0xa4806777ee09a18a!2sHouse%23%2032%2C%20House%2034%20Road-6%2C%20Dhaka%201230!5e0!3m2!1sen!2sbd!4v1775768367121!5m2!1sen!2sbd"
                title="Adrich office location on Google Maps"
                className="w-full h-[360px] md:h-[480px] lg:h-[640px] border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
