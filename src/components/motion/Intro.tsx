"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Transition } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { lenisStore } from "@/lib/lenis";

/**
 * Each role enters from a side; its curves are drawn (via pathLength) from that
 * same side (left-entering paths start at the left edge, right-entering at the
 * right). The stack counts up with the role index: 1 curve, then 2, then 3,
 * offset vertically as parallel contours.
 */
const roles = [
  {
    label: "Software Engineer",
    from: -80,
    color: "var(--accent)", // ultramarine
    path: "M -60 210 C 320 120 600 300 900 200",
  },
  {
    label: "Electrical Engineer",
    from: 80,
    color: "var(--accent-hot)", // vermilion
    path: "M 1260 210 C 880 120 600 300 300 200",
  },
  {
    label: "Product Engineer",
    from: -80,
    color: "var(--accent-warm)", // butter
    path: "M -60 200 C 340 300 620 110 940 210",
  },
] as const;

/** Vertical gap (viewBox units) between stacked parallel curves. */
const CURVE_GAP = 26;

const liftEase = [0.16, 1, 0.3, 1] as const;
/** Per-segment easing for a role: snappy in, linear hold, smooth ease-in-out out. */
const roleEase: Transition["ease"] = [[0.16, 1, 0.3, 1], "linear", [0.45, 0, 0.55, 1]];

/** How long each role is on screen before the next takes over. */
const ROLE_STEP = 1.8;
/** Delay before the first role appears. */
const ROLE_START = 0.35;
/** When the garage door begins lifting, after the roles have faded. */
const OPEN_AT = ROLE_START + roles.length * ROLE_STEP + 1.4;

/** Shared appear→hold→fade timeline for a role's text and its curves. */
function timing(i: number) {
  const isLast = i === roles.length - 1;
  return {
    delay: ROLE_START + i * ROLE_STEP,
    duration: isLast ? ROLE_STEP + 1 : ROLE_STEP,
    times: isLast ? [0, 0.22, 0.42, 1] : [0, 0.32, 0.46, 1],
    ease: roleEase,
  };
}

/**
 * First-visit intro: a blank ink panel fades in three roles one by one
 * (left, right, left), each with a stack of curves that counts up (1 → 2 → 3)
 * drawn in from the role's side, then lifts away like a garage door to reveal
 * the site. Runs once per session and is a no-op under reduced motion.
 */
export function Intro() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const timerRef = useRef<number | null>(null);

  /** Lift the panel now: mark seen, drop the CSS cover, resume smooth scroll. */
  const dismiss = useCallback(() => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    sessionStorage.setItem("intro-seen", "1");
    // Hand off from the pre-hydration CSS cover to the lifting React panel.
    document.documentElement.classList.remove("intro-pending");
    // Guarantee the revealed page starts at the top.
    lenisStore.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (reduce) return;
    if (sessionStorage.getItem("intro-seen")) return;

    setMounted(true);
    // Fully lock scrolling: native overflow + halt Lenis so wheel/touch input
    // can't accumulate a scroll position behind the cover.
    document.body.style.overflow = "hidden";
    lenisStore.current?.stop();
    lenisStore.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    timerRef.current = window.setTimeout(dismiss, OPEN_AT * 1000);

    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      document.body.style.overflow = "";
    };
  }, [reduce, dismiss]);

  if (reduce || !mounted) return null;

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
        lenisStore.current?.start();
      }}
    >
      {!open && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-bg"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: liftEase }}
        >
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              {roles.map((role, i) => {
                const fromLeft = role.from < 0;
                return (
                  // Reveal is a growing rectangle clip over static, fully-drawn
                  // curves — no stroke-dash re-rasterization (the real flicker
                  // source), no zero-length round-cap dot. Grows from the role's
                  // side: left-entering widens from x=0, right-entering slides its
                  // left edge in from x=1200.
                  <clipPath key={role.label} id={`intro-reveal-${i}`}>
                    <motion.rect
                      y={0}
                      height={400}
                      initial={fromLeft ? { x: 0, width: 0 } : { x: 1200, width: 0 }}
                      animate={{ x: 0, width: 1200 }}
                      transition={{ duration: 1.2, ease: liftEase, delay: timing(i).delay }}
                    />
                  </clipPath>
                );
              })}
            </defs>
            {roles.map((role, i) => {
              const count = i + 1;
              return (
                <motion.g
                  key={role.label}
                  clipPath={`url(#intro-reveal-${i})`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={timing(i)}
                >
                  {Array.from({ length: count }).map((_, j) => {
                    const offset = (j - (count - 1) / 2) * CURVE_GAP;
                    return (
                      <path
                        key={j}
                        d={role.path}
                        transform={`translate(0 ${offset})`}
                        stroke={`rgb(${role.color})`}
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        shapeRendering="geometricPrecision"
                      />
                    );
                  })}
                </motion.g>
              );
            })}
          </svg>

          <div aria-hidden className="relative z-10 h-[1.4em] w-full text-center">
            {roles.map((role, i) => (
              <motion.span
                key={role.label}
                className="absolute inset-x-0 font-display text-3xl font-bold tracking-tight text-fg sm:text-5xl"
                // Ink halo keeps the glyphs legible where a curve crosses them.
                style={{ textShadow: "0 0 12px rgb(11 16 43), 0 0 12px rgb(11 16 43), 0 0 6px rgb(11 16 43)" }}
                initial={{ opacity: 0, x: role.from }}
                animate={{ opacity: [0, 1, 1, 0], x: [role.from, 0, 0, role.from * 0.35] }}
                transition={timing(i)}
              >
                {role.label}
              </motion.span>
            ))}
          </div>

          <motion.button
            type="button"
            onClick={dismiss}
            className="label absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-faint transition-colors hover:text-fg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: liftEase, delay: 1.2 }}
          >
            <span className="text-xs">Skip</span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
