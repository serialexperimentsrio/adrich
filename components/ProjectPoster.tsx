import Link from "next/link";
import type { PortfolioItem } from "@/data/site";

const themes = [
  { bg: "bg-red", text: "text-paper", accent: "text-ink", button: "bg-paper text-ink" },
  { bg: "bg-night-2", text: "text-paper", accent: "text-amber", button: "bg-amber text-ink" },
  { bg: "bg-amber", text: "text-ink", accent: "text-red", button: "bg-ink text-paper" },
  { bg: "bg-paper-2", text: "text-ink", accent: "text-red", button: "bg-red text-paper" },
] as const;

type ProjectPosterProps = {
  item: PortfolioItem;
  index: number;
  className?: string;
};

/** A typographic film poster for a project, linking to its case page. */
export default function ProjectPoster({ item, index, className }: ProjectPosterProps) {
  const theme = themes[index % themes.length];
  const number = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/work/${item.slug}`}
      className={`group @container relative block aspect-[4/5] overflow-hidden ${theme.bg} ${theme.text} ${className ?? ""}`}
      aria-label={`${item.title}, ${item.category} for ${item.client}, ${item.year}`}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-[6cqw] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
        <div className="mono flex items-start justify-between text-[max(0.65rem,2.6cqw)]">
          <span>№ {number}</span>
          <span className={theme.accent}>{item.category}</span>
          <span>{item.year}</span>
        </div>

        <div>
          <p className="serif text-[max(1rem,6.5cqw)] leading-none opacity-80">{item.client}</p>
          <h3 className="display mt-[2cqw] text-[14cqw] leading-[0.84] [overflow-wrap:anywhere]">{item.title}</h3>
        </div>

        <div className="flex items-end justify-between gap-4">
          <p className="mono max-w-[60%] text-[max(0.62rem,2.4cqw)] opacity-70">Adrich — {item.tags.join(" / ")}</p>
          <span
            className={`flex aspect-square w-[18cqw] min-w-12 items-center justify-center rounded-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[-12deg] group-hover:scale-110 ${theme.button}`}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="ml-[8%] w-[38%]" fill="currentColor">
              <path d="M6 4l14 8-14 8z" />
            </svg>
          </span>
        </div>
      </div>
      <span className="crop pointer-events-none absolute inset-[3cqw] opacity-50" aria-hidden="true" />
    </Link>
  );
}
