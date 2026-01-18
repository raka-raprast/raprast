import { ProjectModel } from "@/models/projects_model";
import { motion } from "framer-motion";
import {
  Smartphone,
  Globe,
  Server,
  Cpu,
  Brain,
  ExternalLink,
  Calendar,
} from "lucide-react";

type ProjectCardProps = {
  project: ProjectModel;
  index?: number;
};

export function GetIcon(type: string | null) {
  switch (type) {
    case "Mobile App":
      return <Smartphone className="h-5 w-5" />;
    case "Web App":
      return <Globe className="h-5 w-5" />;
    case "Back End":
      return <Server className="h-5 w-5" />;
    case "Hardware":
      return <Cpu className="h-5 w-5" />;
    case "Machine Learning":
      return <Brain className="h-5 w-5" />;
    default:
      return <ExternalLink className="h-5 w-5" />;
  }
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        style={
          {
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            position: "relative",
            overflow: "hidden",
            padding: "24px",
            borderRadius: "16px",
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-bg)",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: "pointer",
            height: "100%",
          } as React.CSSProperties
        }
        whileHover={{
          transform: "translateY(-6px)",
          boxShadow:
            "0 16px 32px -8px rgba(98, 150, 196, 0.4), 0 8px 16px -6px rgba(98, 150, 196, 0.3)",
          borderColor: "var(--gradient-start)",
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
              background:
                "linear-gradient(to bottom, var(--gradient-start), var(--gradient-end))",
              opacity: 0.8,
            } as React.CSSProperties
          }
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "12px",
          }}
        >
          <h3
            className="text"
            style={
              {
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--color-text-p)",
                margin: 0,
                lineHeight: 1.3,
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              } as React.CSSProperties
            }
          >
            {project.name}
          </h3>

          <motion.div
            style={
              {
                flexShrink: 0,
                color: "var(--gradient-start)",
              } as React.CSSProperties
            }
            whileHover={{ scale: 1.1 }}
          >
            {GetIcon(project.type)}
          </motion.div>
        </div>

        <p
          className="description"
          style={
            {
              fontSize: "14px",
              color: "var(--color-text-desc)",
              lineHeight: 1.6,
              margin: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            } as React.CSSProperties
          }
        >
          {project.description}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "auto",
          }}
        >
          <Calendar
            style={
              {
                width: "16px",
                height: "16px",
                color: "var(--gradient-end)",
                opacity: 0.7,
                flexShrink: 0,
              } as React.CSSProperties
            }
          />
          <span
            className="text"
            style={
              {
                fontSize: "13px",
                color: "var(--color-text-desc)",
                fontWeight: 500,
              } as React.CSSProperties
            }
          >
            {project.date}
          </span>
        </div>
      </motion.div>
    </motion.a>
  );
}
