import type { Metadata } from "next";
import { ExperienceList } from "@/components/ui/ExperienceList";
import { MaskText } from "@/components/motion/MaskText";
import { roles, projects } from "@/content/work";

export const metadata: Metadata = {
  title: "Work",
  description: "Companies Raka has engineered for, and the tools he builds on the side.",
};

export default function WorkPage() {
  return (
    <div className="pt-[calc(var(--nav-h)+3rem)]">
      <section className="container-x">
        <p className="label mb-6">( Selected work )</p>
        <h1 className="text-d2">
          <MaskText>Experience</MaskText>
          <MaskText delay={0.06} className="text-muted">first.</MaskText>
        </h1>
      </section>

      <section className="container-x mt-20">
        <ExperienceList items={roles} />
      </section>

      <section className="container-x py-24 sm:py-32">
        <p className="label mb-10">Independent products</p>
        <ExperienceList items={projects} showPreviews={false} />
      </section>
    </div>
  );
}
