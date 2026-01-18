import { EducationExperience } from "@/models/experience_model";
import { motion } from "framer-motion";
import { Calendar, GraduationCap, BookOpen } from "lucide-react";

type EducationCardProps = {
  educationExperience: EducationExperience;
  index?: number;
};

export default function EducationCard({
  educationExperience,
  index = 0,
}: EducationCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="card"
      style={
        {
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          position: "relative",
          overflow: "hidden",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid var(--color-border)",
          backgroundColor: "var(--color-bg)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "default",
        } as React.CSSProperties
      }
      whileHover={{
        transform: "translateY(-4px)",
        boxShadow: "0 12px 24px -8px rgba(233, 92, 159, 0.3), 0 6px 12px -6px rgba(233, 92, 159, 0.2)",
        borderColor: "var(--gradient-end)"
      }}
    >
      <div
        style={
          {
            position: "absolute",
            top: 0,
            left: 0,
            width: "4px",
            height: "100%",
            background: "linear-gradient(to bottom, var(--gradient-end), var(--gradient-start))",
            opacity: 0.8,
          } as React.CSSProperties
        }
      />

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <GraduationCap
          style={{
            width: "20px",
            height: "20px",
            color: "var(--gradient-end)",
            flexShrink: 0,
          }}
        />
        <h3
          className="text"
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "var(--color-text-p)",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {educationExperience.school_name}
        </h3>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <BookOpen
          style={{
            width: "18px",
            height: "18px",
            color: "var(--gradient-start)",
            flexShrink: 0,
          }}
        />
        <p
          className="text"
          style={{
            fontSize: "15px",
            color: "var(--color-text-p)",
            margin: 0,
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          {educationExperience.major}
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Calendar
          style={{
            width: "16px",
            height: "16px",
            color: "var(--gradient-end)",
            flexShrink: 0,
            opacity: 0.7,
          }}
        />
        <span
          className="text"
          style={{
            fontSize: "14px",
            color: "var(--color-text-desc)",
            fontWeight: 400,
            display: "inline-block",
          }}
        >
          {educationExperience.start_date} - {educationExperience.end_date}
        </span>
      </div>
    </motion.div>
  );
}
