import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { MaskText } from "@/components/motion/MaskText";
import { work, workSorted } from "@/content/work";
import type { CSSProperties } from "react";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = work.find((w) => w.slug === slug);
  if (!item) return {};
  return { title: item.name, description: item.tagline };
}

function luminanceForAccent(accent: string) {
  const [red, green, blue] = accent.split(" ").map(Number);
  const linear = (channel: number) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(red) + 0.7152 * linear(green) + 0.0722 * linear(blue);
}

function actionForAccent(accent: string) {
  const luminance = luminanceForAccent(accent);
  if (luminance < 0.183 || luminance >= 0.205) return accent;
  return accent
    .split(" ")
    .map((channel) => Math.round(Number(channel) + (255 - Number(channel)) * 0.2))
    .join(" ");
}

function textForAccent(accent: string) {
  return luminanceForAccent(accent) >= 0.205 ? "11 16 43" : "248 247 242";
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const item = work.find((w) => w.slug === slug);
  if (!item) notFound();

  const idx = workSorted.findIndex((w) => w.slug === slug);
  const next = workSorted[(idx + 1) % workSorted.length];
  const accentAction = actionForAccent(item.accent);
  const accentText = textForAccent(accentAction);

  return (
    <article
      className="case-study pt-[calc(var(--nav-h)+3rem)]"
      style={{
        "--case-accent": item.accent,
        "--case-action": accentAction,
        "--case-accent-text": accentText,
      } as CSSProperties}
    >
      <div className="container-x">
        <Link href="/work" data-cursor="back" className="label mb-12 inline-flex items-center gap-2 hover:text-fg">
          <ArrowLeft className="h-3.5 w-3.5" /> All work
        </Link>

        <p className="label mb-6">{item.kind === "project" ? "Side project" : item.role}</p>
        <h1 className="text-d2">
          <MaskText>{item.name}</MaskText>
        </h1>
        <Reveal index={1}>
          <p className="mt-6 max-w-2xl text-xl text-muted">{item.tagline}</p>
        </Reveal>

        <Reveal index={2} className="mt-10 flex flex-wrap gap-3">
          {item.link && (
            <a href={item.link} target="_blank" rel="noreferrer" data-cursor="visit" className="case-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform hover:scale-[1.02]">
              Visit {item.kind === "project" ? "site" : item.company} <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {item.repo && (
            <a href={item.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-fg">
              <Github className="h-4 w-4" /> Source
            </a>
          )}
        </Reveal>
      </div>

      <div className="container-x mt-16 grade-hover">
        <Parallax distance={50}>
          <div className="case-cover relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-line">
            <Image src={item.poster} alt={`${item.name} cover`} fill priority sizes="100vw" className="grade object-cover" />
          </div>
        </Parallax>
      </div>

      <div className="container-x mt-20 grid gap-12 pb-8 md:grid-cols-[1fr_2fr] md:gap-20">
        <div className="space-y-8 md:sticky md:top-[calc(var(--nav-h)+2rem)] md:self-start">
          <Meta label={item.kind === "project" ? "Type" : "Role"} value={item.kind === "project" ? item.category : item.role ?? item.category} />
          <Meta label="Timeline" value={item.period} />
          <Meta label="Category" value={item.category} />
          {item.stack.length > 0 && (
            <div>
              <p className="label">Stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.stack.map((s) => (
                  <span key={s} className="rounded-full border border-line px-3 py-1 text-xs text-muted">{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <Reveal>
            <p className="text-xl leading-relaxed text-muted">{item.summary}</p>
          </Reveal>

          {item.outcomes && item.outcomes.length > 0 && (
            <Reveal index={1} className="mt-12">
              <p className="label mb-5">Highlights</p>
              <ul className="divide-y divide-line border-y border-line">
                {item.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-4 py-4">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg" />
                    <span className="text-fg">{o}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </div>

      <Link href={`/work/${next.slug}`} data-cursor="next" className="group mt-16 block border-t border-line">
        <div className="container-x flex items-center justify-between py-16">
          <div>
            <p className="label mb-3">Next</p>
            <p className="font-display text-d3 tracking-tight text-muted transition-colors group-hover:text-fg">
              {next.company ?? next.name}
            </p>
          </div>
          <ArrowUpRight className="h-8 w-8 text-muted transition-all duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-fg" />
        </div>
      </Link>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="label">{label}</p>
      <p className="mt-1.5 text-fg">{value}</p>
    </div>
  );
}
