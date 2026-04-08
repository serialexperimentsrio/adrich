import Image from "next/image";
import decorativeDivider from "@/public/decorative-divider.png";

type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  align?: "left" | "center";
  titleAs?: "h1" | "h2";
  showDivider?: boolean;
};

export default function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
  titleAs = "h2",
  showDivider = false,
}: SectionIntroProps) {
  const Heading = titleAs;

  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-4xl text-center"
          : "max-w-4xl"
      }
    >
      {eyebrow && <span className="text-kicker hero-stagger hero-stagger-1">{eyebrow}</span>}
      <Heading className="section-title text-ink-900 hero-stagger hero-stagger-2">{title}</Heading>
      {showDivider && (
        <div className="mx-auto mt-3 mb-4 w-fit hero-stagger hero-stagger-3">
          <Image src={decorativeDivider} alt="" />
        </div>
      )}
      <p
        className={
          `mt-4 max-w-2xl ${align === "center" ? "mx-auto" : ""} text-[0.92rem] leading-relaxed text-ink-700 hero-stagger hero-stagger-4`
        }
      >
        {description}
      </p>
    </div>
  );
}
