import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import DhakaClock from "@/components/DhakaClock";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { companyProfile, socialLinks } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Adrich in Dhaka about a commercial, film or campaign.",
};

export default function ContactPage() {
  const phoneDigits = companyProfile.phone.replace(/[^\d+]/g, "");
  const waHref = `https://wa.me/${phoneDigits.replace(/^\+/, "")}`;

  return (
    <>
      <PageHeader
        index="C"
        label="Contact"
        title="Tell us what you are making"
        accent="making"
        intro="A few lines about the product, the audience and the timing is plenty."
      />

      <section className="container-x grid gap-16 pb-28 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <dl className="space-y-8">
            <div>
              <dt className="caption text-ink-mute">Email</dt>
              <dd className="mt-2 text-xl">
                <a href={`mailto:${companyProfile.email}`} className="link-u">
                  {companyProfile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="caption text-ink-mute">Phone / WhatsApp</dt>
              <dd className="mt-2 flex flex-col gap-1 text-xl">
                <a href={`tel:${phoneDigits}`} className="link-u w-fit">
                  {companyProfile.phone}
                </a>
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="caption link-u mt-1 w-fit text-ink-soft">
                  Message on WhatsApp ↗
                </a>
              </dd>
            </div>
            <div>
              <dt className="caption text-ink-mute">Studio</dt>
              <dd className="mt-2 max-w-[28ch] text-xl leading-snug">{companyProfile.address}</dd>
            </div>
            <div>
              <dt className="caption text-ink-mute">Local time</dt>
              <dd className="mt-2 text-xl">
                <DhakaClock />
              </dd>
            </div>
            <div>
              <dt className="caption text-ink-mute">Elsewhere</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="chip">
                    {social.label} ↗
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="md:col-span-7 md:col-start-6" delay={0.1}>
          <ContactForm />
        </Reveal>
      </section>

      <section className="border-t border-ink/15 bg-paper-2">
        <div className="container-x py-16">
          <p className="caption mb-6 text-ink-mute">Find us — Banashree, Dhaka</p>
          <div className="crop text-ink">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.7134651465412!2d90.3975753!3d23.864306499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c423e474a863%3A0xa4806777ee09a18a!2sHouse%23%2032%2C%20House%2034%20Road-6%2C%20Dhaka%201230!5e0!3m2!1sen!2sbd!4v1775768367121!5m2!1sen!2sbd"
              title="Adrich office location on Google Maps"
              className="block h-[360px] w-full border-0 grayscale-[0.85] md:h-[520px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
