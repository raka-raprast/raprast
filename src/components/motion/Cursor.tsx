"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type TransitionOrigin = { x: number; y: number };

/**
 * Contextual custom cursor. A small ring that grows over interactive elements
 * and shows a label when the target sets `data-cursor="<label>"`. Fine pointers
 * with motion allowed only; otherwise renders nothing and the native cursor stays.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string>("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 45, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 600, damping: 45, mass: 0.35 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("a, button, [data-cursor]");
      setActive(!!el);
      setLabel(el?.dataset.cursor ?? "");
    };
    window.addEventListener("mousemove", move);
    const reset = (event: Event) => {
      const origin = (event as CustomEvent<TransitionOrigin>).detail;
      if (origin) {
        x.set(origin.x);
        y.set(origin.y);
        sx.jump(origin.x);
        sy.jump(origin.y);
      }
      setActive(false);
      setLabel("");
    };
    window.addEventListener("route-transition-start", reset);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("route-transition-start", reset);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [reduce, sx, sy, x, y]);

  if (!enabled) return null;

  const big = active || !!label;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[300] flex items-center justify-center rounded-full"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-fg text-bg mix-blend-difference"
        animate={{ width: label ? 88 : big ? 44 : 10, height: label ? 88 : big ? 44 : 10 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-mono text-[10px] uppercase tracking-widest"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
