type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  titleAs?: "h1" | "h2";
};

export default function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
  titleAs = "h2",
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
      <span className="text-kicker">{eyebrow}</span>
      <Heading className="section-title text-ink-900">{title}</Heading>
      <p className="mt-4 max-w-2xl text-[0.92rem] leading-relaxed text-ink-700">
        {description}
      </p>
    </div>
  );
}
