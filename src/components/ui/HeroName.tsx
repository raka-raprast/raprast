"use client";

import { type PointerEvent, useRef } from "react";
import { createPortal } from "react-dom";
import { MaskText } from "@/components/motion/MaskText";

/** Keeps the cursor white while exposing a stabilo layer only where it intersects the name glyphs. */
export function HeroName() {
  const overlay = useRef<HTMLHeadingElement>(null);
  const moveOverlay = (event: PointerEvent<HTMLHeadingElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const style = overlay.current?.style;
    if (!style) return;

    style.left = `${bounds.left}px`;
    style.top = `${bounds.top}px`;
    style.width = `${bounds.width}px`;
    style.height = `${bounds.height}px`;
    style.clipPath = `circle(22px at ${event.clientX - bounds.left}px ${event.clientY - bounds.top}px)`;
  };

  const hideOverlay = () => overlay.current?.style.setProperty("clip-path", "circle(0px at 0 0)");

  return (
    <div className="relative w-fit">
      <h1
        data-cursor=""
        className="w-fit text-d1 leading-[0.85]"
        onPointerMove={moveOverlay}
        onPointerLeave={hideOverlay}
      >
        <MaskText delay={0.05}>Raka</MaskText>
        <MaskText delay={0.12}>Prasetyo</MaskText>
      </h1>
      {typeof document !== "undefined" &&
        createPortal(
          <h1
            ref={overlay}
            aria-hidden
            className="pointer-events-none fixed z-[101] text-d1 leading-[0.85] text-[#b6ff36]"
            style={{ clipPath: "circle(0px at 0 0)" }}
          >
            <span className="block">Raka</span>
            <span className="block">Prasetyo</span>
          </h1>,
          document.body,
        )}
    </div>
  );
}
