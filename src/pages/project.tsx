import React, { useEffect, useState } from "react";
import BaseLayout from "@/components/BaseLayout";
import { Project } from "@/models/projects_model";
import ProjectCard from "@/components/ProjectCard";

const Project: React.FC = () => {
  const [projectData, setProjectData] = useState<Project[]>([]);

  useEffect(() => {
    import("@/data/projects.json").then((data) => {
      setProjectData(data.projects);
    });
  }, []);
  return (
    <BaseLayout>
      <div className="home">
        <h2
          style={
            {
              marginBottom: "20px",
              paddingBottom: "5px",
              borderBottom: "2px solid rgb(208, 208, 208)",
            } as React.CSSProperties
          }
        >
          Projects
        </h2>
        <p
          style={
            { color: "#545454", textAlign: "justify" } as React.CSSProperties
          }
        >
          Dive into the narrative of my past projects, where creativity and
          expertise collided to form a symphony of innovation. From concept to
          completion, each project tells a story of strategic planning,
          collaborative teamwork, and overcoming challenges. Explore the
          milestones achieved, lessons learned, and the tangible impact on the
          world around us. These projects are not just a testament to my skills
          but a vibrant canvas reflecting my passion for pushing boundaries and
          crafting solutions that stand the test of time.
        </p>
        <div
          style={
            {
              paddingTop: "30px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              columnGap: "15px",
            } as React.CSSProperties
          }
        >
          {projectData.map((project, index) => (
            <div key={index}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
      <div className="footer">© 2024 Raka Ramadhani Aulia Prasetyo</div>
    </BaseLayout>
  );
};

export default Project;
