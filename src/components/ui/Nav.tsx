"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/content/site";

const links = [
  { href: "/", label: "Index" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[70]">
        <nav className="container-x flex h-[var(--nav-h)] items-center justify-between mix-blend-difference">
          <Link href="/" className="font-display text-lg font-medium tracking-tight text-white">
            Raprast
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            data-cursor={open ? "close" : "menu"}
            className="label flex items-center gap-3 text-white"
          >
            <span className="hidden sm:inline">{open ? "Close" : "Menu"}</span>
            <span className="relative flex h-3 w-5 flex-col justify-between">
              <span className={`h-px w-full bg-white transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`h-px w-full bg-white transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-full bg-white transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col justify-between bg-bg pt-[var(--nav-h)]"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
          >
            <nav className="container-x flex flex-1 flex-col justify-center gap-1">
              {links.map((l, i) => {
                const activeLink = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
                return (
                  <div key={l.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.06 }}
                    >
                      <Link
                        href={l.href}
                        data-cursor="go"
                        className="group flex items-baseline gap-5 py-1"
                      >
                        <span className="label w-8 text-faint">0{i + 1}</span>
                        <span className={`font-display text-[15vw] font-medium leading-[0.95] tracking-tight transition-colors duration-300 sm:text-[10vw] ${activeLink ? "text-fg" : "text-muted group-hover:text-fg"}`}>
                          {l.label}
                        </span>
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="container-x flex flex-col gap-4 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <a href={`mailto:${profile.email}`} className="link-line text-lg">{profile.email}</a>
              <div className="flex gap-6">
                <a href={profile.socials.github} target="_blank" rel="noreferrer" className="label hover:text-fg">GitHub</a>
                <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="label hover:text-fg">LinkedIn</a>
                <a href={profile.socials.instagram} target="_blank" rel="noreferrer" className="label hover:text-fg">Instagram</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
