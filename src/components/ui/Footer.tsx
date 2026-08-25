import Link from "next/link";
import { profile } from "@/content/site";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x py-16 sm:py-24">
        <p className="label mb-8">( Contact )</p>
        <a
          href={`mailto:${profile.email}`}
          data-cursor="email"
          className="block font-display text-d3 leading-none tracking-tight transition-colors hover:text-muted"
        >
          {profile.email}
        </a>

        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="label">© {year} {profile.name}</p>
          <div className="flex gap-6">
            <a href={profile.socials.github} target="_blank" rel="noreferrer" className="link-line text-muted hover:text-fg">GitHub</a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="link-line text-muted hover:text-fg">LinkedIn</a>
            <a href={profile.socials.instagram} target="_blank" rel="noreferrer" className="link-line text-muted hover:text-fg">raka.raprast</a>
            <Link href="/contact" className="link-line text-muted hover:text-fg">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
