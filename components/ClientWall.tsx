import Image from "next/image";
import Reveal from "@/components/Reveal";
import { clientLogos } from "@/data/site";

/** Client logos laid out like a contact sheet, with print crop marks. */
export default function ClientWall() {
  return (
    <ul className="grid grid-cols-2 gap-px bg-ink/10 sm:grid-cols-3 lg:grid-cols-6" aria-label="Clients">
      {clientLogos.map((logo, index) => (
        <li key={logo.src} className="bg-paper">
          <Reveal delay={index * 0.06} y={16}>
            <div className="crop relative m-6 flex aspect-[3/2] items-center justify-center text-ink/40">
              <Image src={logo.src} alt={logo.name} fill sizes="200px" className="logo-ink object-contain p-2" />
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
