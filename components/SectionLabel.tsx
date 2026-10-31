type SectionLabelProps = {
  index: string;
  label: string;
  className?: string;
  tone?: "ink" | "paper";
};

/** Slate-style section label: "(02) Services" followed by a rule. */
export default function SectionLabel({ index, label, className, tone = "ink" }: SectionLabelProps) {
  const muted = tone === "ink" ? "text-ink-mute" : "text-paper/60";
  const line = tone === "ink" ? "bg-ink/20" : "bg-paper/20";
  return (
    <div className={`caption flex items-center gap-4 ${muted} ${className ?? ""}`}>
      <span>({index})</span>
      <span>{label}</span>
      <span className={`h-px flex-1 ${line}`} aria-hidden="true" />
    </div>
  );
}
