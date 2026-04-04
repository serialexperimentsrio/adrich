type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export default function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionIntroProps) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-3xl border-t border-slate-300 pt-4 text-center"
          : "max-w-3xl border-t border-slate-300 pt-4"
      }
    >
      <p className="text-kicker">{eyebrow}</p>
      <h2 className="section-title mt-3 text-ink-900">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-ink-700">{description}</p>
    </div>
  );
}
