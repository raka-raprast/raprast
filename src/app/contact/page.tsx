import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { MaskText } from "@/components/motion/MaskText";
import { profile } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name}.`,
};

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "GitHub", value: "@raka-raprast", href: profile.socials.github },
  { label: "LinkedIn", value: "Raka Prasetyo", href: profile.socials.linkedin },
  { label: "Instagram", value: "@raprast", href: profile.socials.instagram },
];

export default function ContactPage() {
  return (
    <div className="container-x flex min-h-[88svh] flex-col justify-center pb-24 pt-[calc(var(--nav-h)+3rem)]">
      <p className="label mb-8">( Contact )</p>
      <h1 className="text-d1 leading-[0.85]">
        <MaskText>Let&apos;s</MaskText>
        <MaskText delay={0.06} className="text-muted">talk.</MaskText>
      </h1>
      <Reveal index={1}>
        <p className="mt-10 max-w-xl text-lg text-muted">
          Open to full-time roles, freelance builds and collaborations. Fastest way to reach me is email — I usually reply within a day.
        </p>
      </Reveal>

      <ul className="mt-16 border-t border-line">
        {channels.map((c, i) => (
          <Reveal as="li" key={c.label} index={i} className="border-b border-line">
            <a href={c.href} target="_blank" rel="noreferrer" data-cursor="open" className="group flex items-center justify-between gap-4 py-6">
              <span className="flex items-baseline gap-6">
                <span className="label w-24">{c.label}</span>
                <span className="font-display text-2xl transition-transform duration-500 ease-expo group-hover:translate-x-2 sm:text-4xl">{c.value}</span>
              </span>
              <ArrowUpRight className="h-6 w-6 text-muted transition-all duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-fg" />
            </a>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
