"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { WorkItem } from "@/content/work";
import { cn } from "@/lib/cn";

interface ExperienceListProps {
  items: WorkItem[];
}

/**
 * Big numbered rows. On hover (fine pointers) a grayscale preview of the item
 * floats next to the cursor and the other rows dim. On touch, each row shows an
 * inline thumbnail instead.
 */
export function ExperienceList({ items }: ExperienceListProps) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 300, damping: 30, mass: 0.5 });
  const py = useSpring(my, { stiffness: 300, damping: 30, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    mx.set(e.clientX + 28);
    my.set(e.clientY - 120);
  };

  return (
    <div onMouseMove={reduce ? undefined : onMove} className="relative">
      <ul className="border-t border-line">
        {items.map((item, i) => {
          const dim = hovered !== null && hovered !== i;
          return (
            <li key={item.slug} className="border-b border-line">
              <Link
                href={`/work/${item.slug}`}
                data-cursor="view"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 transition-opacity duration-500 ease-expo sm:gap-8 sm:py-9",
                  dim && "opacity-35"
                )}
              >
                <span className="label w-10 tabular-nums sm:w-14">{String(i + 1).padStart(2, "0")}</span>

                <span className="min-w-0">
                  <span className="flex flex-wrap items-baseline gap-x-4">
                    <span className="font-display text-3xl font-medium tracking-tight transition-transform duration-500 ease-expo group-hover:translate-x-2 sm:text-6xl">
                      {item.company ?? item.name}
                    </span>
                    <span className="label hidden sm:inline">{item.role ?? "Project"}</span>
                  </span>
                  {/* inline thumb for touch */}
                  <span className="mt-4 block overflow-hidden rounded-lg border border-line sm:hidden">
                    <Image src={item.poster} alt={item.name} width={640} height={360} className="grade h-40 w-full object-cover" />
                  </span>
                </span>

                <span className="flex items-center gap-4">
                  <span className="label hidden text-right md:block">{item.period}</span>
                  <ArrowUpRight className="h-6 w-6 text-muted transition-all duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-fg" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* cursor-following preview (fine pointers only) */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-30 hidden aspect-[16/10] w-[22rem] overflow-hidden rounded-lg border border-line lg:block"
          style={{ x: px, y: py }}
          animate={{ opacity: hovered === null ? 0 : 1, scale: hovered === null ? 0.9 : 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {items.map((item, i) => (
            <Image
              key={item.slug}
              src={item.poster}
              alt=""
              fill
              sizes="352px"
              className={cn("object-cover transition-opacity duration-300", hovered === i ? "opacity-100" : "opacity-0")}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
