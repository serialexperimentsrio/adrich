import SectionLabel from "@/components/SectionLabel";
import SplitText from "@/components/SplitText";
import Reveal from "@/components/Reveal";
import type { ReactNode } from "react";

type PageHeaderProps = {
  index: string;
  label: string;
  title: string;
  /** Word in the title to set in italic serif. */
  accent?: string;
  intro?: ReactNode;
  aside?: ReactNode;
};

/** Large editorial page header used by the inner pages. */
export default function PageHeader({ index, label, title, accent, intro, aside }: PageHeaderProps) {
  return (
    <header className="container-x pt-36 pb-16 md:pt-44 md:pb-24">
      <SectionLabel index={index} label={label} />
      <SplitText
        as="h1"
        immediate
        delay={0.15}
        text={title}
        className="display display-lg mt-10 max-w-[18ch]"
        accent={accent}
      />
      {intro || aside ? (
        <div className="mt-12 grid gap-8 md:grid-cols-12">
          {intro ? (
            <Reveal className="md:col-span-6 lg:col-span-5" delay={0.4}>
              <div className="lede">{intro}</div>
            </Reveal>
          ) : null}
          {aside ? (
            <Reveal className="md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9" delay={0.5}>
              {aside}
            </Reveal>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
