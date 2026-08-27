"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

type Phase = "idle" | "covering" | "revealing";
type Origin = { x: number; y: number };

// Minimal shape of the browser Navigation API we rely on (Chromium; not yet in TS lib).
type NavDestination = { key: string };
type NavigateEvent = Event & {
  navigationType: "reload" | "push" | "replace" | "traverse";
  canIntercept: boolean;
  destination: NavDestination;
};
type NavResult = { committed: Promise<void>; finished: Promise<void> };
type NavigationApi = EventTarget & {
  traverseTo: (key: string) => NavResult;
};

const ease = [0.42, 0, 0.58, 1] as const;

// The Navigation API isn't in TS's DOM lib yet; read it off the well-known global
// once, typed to the subset we use. Undefined on Firefox/Safari.
function getNavigation(): NavigationApi | undefined {
  const win = window as unknown as { navigation?: NavigationApi };
  return win.navigation;
}

/**
 * Covers route changes from their activation point, then contracts to reveal the
 * destination — an iris wipe.
 *
 * Forward navigation is controlled at the click: the anchor is intercepted, the
 * circle expands from the cursor, `router.push` swaps the route behind the cover,
 * then it contracts.
 *
 * Back/forward buttons are handled with the browser Navigation API: the traverse
 * is cancelled (`preventDefault`) so we can expand over the *current* page first,
 * then re-issued via `navigation.traverseTo` behind the cover, then revealed — so
 * Back animates exactly like Forward (expand → navigate → shrink) without ever
 * touching `history.state` (which would desync Next's router). Browsers without
 * the Navigation API (Firefox/Safari) simply traverse natively, no animation.
 */
export function RouteTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [origin, setOrigin] = useState<Origin>({ x: 0, y: 0 });
  const [radius, setRadius] = useState(0);
  const phaseRef = useRef<Phase>("idle");
  const destination = useRef<string | null>(null); // forward push target
  const traverseKey = useRef<string | null>(null); // back/forward traverse target
  const navigationStarted = useRef(false);

  const cover = useCallback((o: Origin, radiusOf: (o: Origin) => number) => {
    navigationStarted.current = false;
    setOrigin(o);
    setRadius(radiusOf(o) + 1);
    phaseRef.current = "covering";
    setPhase("covering");
    window.dispatchEvent(new CustomEvent<Origin>("route-transition-start", { detail: o }));
  }, []);

  const reveal = useCallback(() => {
    phaseRef.current = "revealing";
    setPhase("revealing");
  }, []);

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
      destination.current = `${url.pathname}${url.search}${url.hash}`;
      traverseKey.current = null;
      cover(
        {
          x: event.detail ? event.clientX : window.innerWidth / 2,
          y: event.detail ? event.clientY : window.innerHeight / 2,
        },
        (p) => Math.hypot(
          Math.max(p.x, window.innerWidth - p.x),
          Math.max(p.y, window.innerHeight - p.y),
        ),
      );
    };

    document.addEventListener("click", onClick, true);

    const nav = getNavigation();
    let onNavigate: ((event: Event) => void) | undefined;
    if (nav) {
      onNavigate = (event: Event) => {
        const e = event as NavigateEvent;
        if (e.navigationType !== "traverse" || !e.canIntercept) return; // pushes & cross-doc: leave native
        if (phaseRef.current !== "idle") return; // our own traverseTo, or mid-transition
        e.preventDefault(); // cancel the browser traversal; page stays put during the expand
        destination.current = null;
        traverseKey.current = e.destination.key;
        cover({ x: window.innerWidth / 2, y: window.innerHeight / 2 }, (p) => Math.hypot(p.x, p.y));
      };
      nav.addEventListener("navigate", onNavigate);
    }

    return () => {
      document.removeEventListener("click", onClick, true);
      if (nav && onNavigate) nav.removeEventListener("navigate", onNavigate);
    };
  }, [reduce, cover]);

  // Forward reveal: once router.push has swapped the route, contract to reveal it.
  useEffect(() => {
    if (phase === "covering" && navigationStarted.current && destination.current) reveal();
  }, [pathname, phase, reveal]);

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
        if (phase === "covering") {
          navigationStarted.current = true;
          if (destination.current) {
            router.push(destination.current); // forward: swap route behind the cover
          } else if (traverseKey.current) {
            // back/forward: perform the real traversal behind the cover, then reveal
            const nav = getNavigation();
            const key = traverseKey.current;
            if (nav && key) {
              nav.traverseTo(key).committed
                .then(() => requestAnimationFrame(reveal))
                .catch(() => requestAnimationFrame(reveal));
            } else {
              requestAnimationFrame(reveal);
            }
          }
          return;
        }
        if (phase === "revealing") {
          destination.current = null;
          traverseKey.current = null;
          navigationStarted.current = false;
          phaseRef.current = "idle";
          setPhase("idle");
        }
      }}
    />
  );
}
