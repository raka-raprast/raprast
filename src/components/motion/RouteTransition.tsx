"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

type Phase = "idle" | "covering" | "revealing";
type Origin = { x: number; y: number };

const ease = [0.42, 0, 0.58, 1] as const;

/** Covers internal route changes from their activation point, then contracts back to the cursor. */
export function RouteTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [origin, setOrigin] = useState<Origin>({ x: 0, y: 0 });
  const [radius, setRadius] = useState(0);
  const phaseRef = useRef<Phase>("idle");
  const destination = useRef<string | null>(null);
  const navigationStarted = useRef(false);

  useEffect(() => {
    if (reduce) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      const current = new URL(window.location.href);
      if (
        url.origin !== current.origin ||
        (url.pathname === current.pathname && url.search === current.search)
      ) return;
      if (phaseRef.current !== "idle") {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      const origin = {
        x: event.detail ? event.clientX : window.innerWidth / 2,
        y: event.detail ? event.clientY : window.innerHeight / 2,
      };
      destination.current = `${url.pathname}${url.search}${url.hash}`;
      navigationStarted.current = false;
      setOrigin(origin);
      setRadius(Math.hypot(
        Math.max(origin.x, window.innerWidth - origin.x),
        Math.max(origin.y, window.innerHeight - origin.y),
      ) + 1);
      phaseRef.current = "covering";
      setPhase("covering");
      window.dispatchEvent(new CustomEvent<Origin>("route-transition-start", { detail: origin }));
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [reduce]);

  useEffect(() => {
    if (phase !== "covering" || !navigationStarted.current) return;
    phaseRef.current = "revealing";
    setPhase("revealing");
  }, [pathname, phase]);

  if (reduce || phase === "idle") return null;

  const diameter = radius * 2;
  const collapsedScale = diameter ? 10 / diameter : 0;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[110] rounded-full bg-surface will-change-transform"
      style={{
        left: origin.x - radius,
        top: origin.y - radius,
        width: diameter,
        height: diameter,
      }}
      initial={{ scale: collapsedScale }}
      animate={{ scale: phase === "covering" ? 1 : collapsedScale }}
      transition={{ duration: phase === "covering" ? 0.72 : 0.6, ease }}
      onAnimationComplete={() => {
        if (phase === "covering" && destination.current) {
          navigationStarted.current = true;
          router.push(destination.current);
          return;
        }
        if (phase === "revealing") {
          destination.current = null;
          phaseRef.current = "idle";
          setPhase("idle");
        }
      }}
    />
  );
}
