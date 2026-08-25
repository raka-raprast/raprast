import { cn } from "@/lib/cn";

interface MarqueeProps {
  items: string[];
  className?: string;
}

/** Infinite horizontal ticker. Duplicated track keeps the loop seamless; paused under reduced motion via the global CSS rule. */
export function Marquee({ items, className }: MarqueeProps) {
  const track = [...items, ...items];
  return (
    <div className={cn("relative flex overflow-hidden", className)} aria-hidden>
      <div className="flex shrink-0 animate-marquee items-center whitespace-nowrap">
        {track.map((item, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-8 font-display text-3xl text-muted sm:text-5xl">
            {item}
            <span className="text-faint">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
