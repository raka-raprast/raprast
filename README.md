# raprast.asia — personal portfolio

Motion-first personal portfolio for Raka Ramadhani Aulia Prasetyo. Cinematic,
scroll-driven, video-led.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** with a token layer (light/dark via CSS variables + `next-themes`)
- **Motion**: `lenis` (smooth scroll) · `framer-motion` (component motion, page transitions) · `gsap` ScrollTrigger (scroll choreography)
- All motion respects `prefers-reduced-motion`.

## Develop

```bash
npm install
npm run dev      # http://localhost:4000
npm run build
```

## Structure

```
src/
  app/                    # routes (home, work, work/[slug], about, contact)
  components/
    motion/               # Lenis, Reveal, Parallax, MagneticButton, Cursor
    ui/                   # Nav, Footer, Hero, WorkCard, LoopVideo, Marquee, ThemeToggle
  content/                # single source of truth: work.ts, site.ts
  lib/cn.ts               # class merge helper
  styles/globals.css      # design tokens + base
public/
  video/                  # hero + case-study loops (.mp4)
  video/posters/          # poster frames (fallback + reduced-motion)
  work/                   # work-card cover images
```

## Content

Edit `src/content/work.ts` (projects + roles) and `src/content/site.ts`
(profile + education). Each work item drives its card, case study and metadata.

## Video

Background/cover loops are generated with wan.video and saved under
`public/video/`. `LoopVideo` shows the poster first and swaps in the video
when available, falling back to the poster on error or under reduced motion —
so pages render correctly even before renders exist.
