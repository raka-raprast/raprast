import { MaskText } from "@/components/motion/MaskText";
import { ElectricField } from "@/components/motion/ElectricField";
import { HeroName } from "@/components/ui/HeroName";
import { Marquee } from "@/components/ui/Marquee";
import { profile } from "@/content/site";

export function Hero() {
  const capabilities = profile.capabilities;
  return (
    <section className="electric-hero relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-[var(--nav-h)]">
      <ElectricField />

      <div className="container-x relative z-10 mt-auto pt-16">
        <MaskText as="p" className="label mb-6">
          Software & Electrical Engineer — {profile.location}
        </MaskText>
        <HeroName />
      </div>

      <div className="container-x relative z-10 flex flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between">
        <MaskText as="p" delay={0.2} className="max-w-md text-lg text-muted">
          {profile.tagline}
        </MaskText>
        <p className="label flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-fg" />
          Available for work
        </p>
      </div>

      <div className="relative z-10 border-y border-line bg-bg/60 py-5 backdrop-blur-sm">
        <Marquee items={capabilities} />
      </div>
    </section>
  );
}
