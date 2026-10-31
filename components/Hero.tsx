"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import Arc from "@/components/Arc";
import { useProposalModal } from "@/components/ProposalModalProvider";
import Timecode from "@/components/Timecode";
import { companyProfile, yearsInBusiness } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

function Line({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.3, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const { openModal } = useProposalModal();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const arcRotate = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[4.75rem] lg:pt-24" id="top">
      {/* Slate row */}
      <motion.div
        className="container-x caption relative z-10 mt-6 flex items-center justify-between text-ink-mute"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        <span>
          Est. {companyProfile.founded} — {companyProfile.headquarters}
        </span>
        <span className="hidden sm:inline">Take {yearsInBusiness}</span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red" aria-hidden="true" />
          <span className="sr-only">Recording</span>
          <Timecode />
        </span>
      </motion.div>

      {/* Headline */}
      <div className="container-x relative flex flex-1 items-center py-10">
        <motion.div
          className="pointer-events-none absolute right-[-12vw] top-1/2 w-[min(78vw,64rem)] -translate-y-1/2 sm:right-[-4vw]"
          style={{ rotate: arcRotate }}
        >
          <Arc className="w-full" strokeWidth={11} delay={0.5} />
        </motion.div>

        <h1 className="display display-xl relative w-full">
          <span className="sr-only">Adrich: Think. Create. Influence.</span>
          <span aria-hidden="true">
            <motion.span className="block" style={{ x: xLeft }}>
              <Line delay={0.15}>Think.</Line>
            </motion.span>
            <motion.span className="block pl-[12vw]" style={{ x: xRight }}>
              <Line delay={0.27}>
                Create<span className="text-red">.</span>
              </Line>
            </motion.span>
            <motion.span className="block" style={{ x: xLeft }}>
              <Line delay={0.39}>
                Influence<span className="text-red">.</span>
              </Line>
            </motion.span>
          </span>
        </h1>
      </div>

      {/* Footer row */}
      <motion.div className="container-x relative z-10 grid gap-8 pb-10 md:grid-cols-12 md:items-end" style={{ opacity: fade }}>
        <motion.p
          className="lede md:col-span-6 lg:col-span-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.9 }}
        >
          An advertising agency in Dhaka. We make{" "}
          <span className="serif text-ink">TV commercials, corporate films</span> and digital campaigns, and have
          done since {companyProfile.founded}.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3 md:col-span-6 md:justify-end lg:col-span-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 1.05 }}
        >
          <Link href="/work" className="btn-base btn-primary">
            See the work
          </Link>
          <button type="button" className="btn-base btn-secondary" onClick={() => openModal()}>
            Start a project
          </button>
        </motion.div>
      </motion.div>

      <div className="container-x caption flex items-center gap-4 pb-6 text-ink-mute" aria-hidden="true">
        <span>Scroll</span>
        <span className="relative h-px w-16 overflow-hidden bg-ink/15">
          <motion.span
            className="absolute inset-y-0 left-0 w-1/2 bg-ink"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>
    </section>
  );
}
