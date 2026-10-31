import Link from "next/link";
import Arc from "@/components/Arc";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-[4.5rem]">
      <Arc className="pointer-events-none absolute -right-[20vw] top-1/2 w-[80vw] max-w-[60rem] -translate-y-1/2" strokeWidth={10} />
      <div className="container-x relative">
        <p className="mono text-ink-mute">Error 404 — Scene missing</p>
        <h1 className="display display-xl mt-6">
          Cut<span className="text-red">!</span>
        </h1>
        <p className="lede mt-6">This page didn&apos;t make the final edit. Let&apos;s get you back to the set.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn-base btn-primary">
            Back to home
          </Link>
          <Link href="/work" className="btn-base btn-secondary">
            See the work
          </Link>
        </div>
      </div>
    </section>
  );
}
