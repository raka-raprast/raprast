import { ProjectModel } from "@/models/projects_model";
import Image from "next/image";

type ProjectCardProps = {
  project: ProjectModel;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" } as React.CSSProperties}
    >
      <div 
        className="text card"
        // style={
        //   {
        //     display: "flex",
        //     flexDirection: "row",
        //     marginBottom: "30px",
        //     overflow: "hidden",
        //     padding: "15px",
        //     borderRadius: "6px",
        //     border: "1px solid var(--color-border)",
        //     // boxShadow: "0.5px 0.5px 0.5px 0.5px #7fc7d9",
        //      boxShadow: "0px 1px 1px var(--gradient-start)",
        //     marginRight: "15px",
        //   } as React.CSSProperties
        // }
      >
        <div style={{ overflow: "hidden" } as React.CSSProperties}>
          <div
            style={
              {
                fontSize: "14px",
                paddingRight: "15px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              } as React.CSSProperties
            }
          >
            {project.name}
          </div>
          <div
            style={
              {
                fontSize: "10px",
                marginBottom: "5px",
              } as React.CSSProperties
            }
          >
            {project.date}
          </div>
          <div
            style={
              {
                fontSize: "10px",
                // paddingRight: "5px",
                marginBottom: "5px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              } as React.CSSProperties
            }
          >
            {project.description}
          </div>
        </div>
        <div
          style={
            {
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
            } as React.CSSProperties
          }
        >
          {/* <Image
            className="skillLogo"
            width={30}
            height={30}
            src={project.imagePath}
            alt="skills logo"
          /> */}
        </div>
      </div>
    </a>
  );
}
