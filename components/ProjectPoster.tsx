import Image from "next/image";
import Link from "next/link";
import { type PortfolioItem, youtubeUrls } from "@/data/site";

const themes = [
  { bg: "bg-red", text: "text-paper", accent: "text-paper/70", button: "bg-paper text-ink" },
  { bg: "bg-night-2", text: "text-paper", accent: "text-amber", button: "bg-amber text-ink" },
  { bg: "bg-amber", text: "text-ink", accent: "text-ink/60", button: "bg-red text-paper" },
  { bg: "bg-paper-2", text: "text-ink", accent: "text-red", button: "bg-red text-paper" },
] as const;

type ProjectPosterProps = {
  item: PortfolioItem;
  index: number;
  className?: string;
};

/** A film poster for a project: a still from the film framed on a colour card, linking to its case page. */
export default function ProjectPoster({ item, index, className }: ProjectPosterProps) {
  const theme = themes[index % themes.length];
  const number = String(index + 1).padStart(2, "0");
  const still = item.youtubeId ? youtubeUrls(item.youtubeId).thumbnail : null;

  return (
    <Link
      href={`/work/${item.slug}`}
      className={`group @container relative block aspect-[4/5] overflow-hidden ${theme.bg} ${theme.text} ${className ?? ""}`}
      aria-label={`${item.title}, ${item.category} for ${item.client}, ${item.year}`}
    >
      <div className="absolute inset-0 flex flex-col p-[6cqw]">
        <div className="caption flex items-start justify-between !text-[max(0.65rem,2.6cqw)]">
          <span>№ {number}</span>
          <span className={theme.accent}>{item.category}</span>
          <span>{item.year}</span>
        </div>

        {/* Film still */}
        <div className="relative mt-[5cqw] aspect-video overflow-hidden bg-night">
          {still ? (
            <Image
              src={still}
              alt=""
              fill
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 420px"
              className="object-cover grayscale transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:grayscale-0"
            />
          ) : null}
          <span
            className={`absolute bottom-[4cqw] right-[4cqw] flex aspect-square w-[14cqw] min-w-10 items-center justify-center rounded-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 ${theme.button}`}
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="ml-[8%] w-[38%]" fill="currentColor">
              <path d="M6 4l14 8-14 8z" />
            </svg>
          </span>
        </div>

        <div className="mt-auto">
          <p className="serif text-[max(1rem,6cqw)] leading-none opacity-80">{item.client}</p>
          <h3 className="display mt-[2cqw] text-[11.5cqw] leading-[0.9] [overflow-wrap:anywhere]">{item.title}</h3>
        </div>
      </div>
      <span className="crop pointer-events-none absolute inset-[3cqw] opacity-50" aria-hidden="true" />
    </Link>
  );
}
