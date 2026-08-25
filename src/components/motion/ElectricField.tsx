"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Point = { x: number; y: number };

/** Autonomous hero field with a fine-pointer steering offset. */
export function ElectricField() {
  const root = useRef<HTMLDivElement>(null);
  const blue = useRef<HTMLDivElement>(null);
  const red = useRef<HTMLDivElement>(null);
  const lines = useRef<SVGSVGElement>(null);
  const target = useRef<Point>({ x: 0, y: 0 });
  const current = useRef<Point>({ x: 0, y: 0 });
  const trail = useRef<Point>({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const field = root.current;
    const hero = field?.parentElement;
    if (!field || !hero || reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let visible = true;
    const render = (time: number) => {
      const driftX = Math.sin(time * 0.00019) * 0.2 + Math.cos(time * 0.00011) * 0.055;
      const driftY = Math.cos(time * 0.00016) * 0.16 + Math.sin(time * 0.00009) * 0.045;
      const desiredX = target.current.x + driftX;
      const desiredY = target.current.y + driftY;
      const dx = desiredX - current.current.x;
      const dy = desiredY - current.current.y;
      current.current.x += dx * 0.1;
      current.current.y += dy * 0.1;
      trail.current.x += (current.current.x - trail.current.x) * 0.045;
      trail.current.y += (current.current.y - trail.current.y) * 0.045;

      blue.current?.style.setProperty("transform", `translate3d(${current.current.x * 92}px, ${current.current.y * 70}px, 0) scale(${1.025 + Math.min(0.06, Math.abs(dx) * 0.08)})`);
      red.current?.style.setProperty("transform", `translate3d(${trail.current.x * 128}px, ${trail.current.y * 98}px, 0)`);
      lines.current?.style.setProperty("transform", `translate3d(${current.current.x * 30}px, ${current.current.y * 22}px, 0)`);
      frame = visible ? requestAnimationFrame(render) : 0;
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const move = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      target.current = { x: (event.clientX - bounds.left) / bounds.width - 0.5, y: (event.clientY - bounds.top) / bounds.height - 0.5 };
      wake();
    };
    const leave = () => {
      target.current = { x: 0, y: 0 };
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
    });

    observer.observe(hero);
    wake();
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    return () => {
      observer.disconnect();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return (
    <div ref={root} aria-hidden className="electric-field pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div ref={blue} className="electric-field__orb electric-field__orb--blue" />
      <div ref={red} className="electric-field__orb electric-field__orb--red" />
      <svg ref={lines} className="electric-field__lines" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <path d="M-80 625C190 510 240 745 474 564S812 214 1280 312" />
        <path d="M-40 706C240 534 360 681 556 504S816 126 1280 208" />
        <path d="M-120 328C150 278 306 400 498 304S824 40 1250 82" />
      </svg>
    </div>
  );
}
