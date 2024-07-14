import React, { useEffect, useState } from "react";
import BaseLayout from "@/components/BaseLayout";
import { ProjectModel } from "@/models/projects_model";
import ProjectCard from "@/components/ProjectCard";
import ReactLoading from "react-loading";

const Project: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectData, setProjectData] = useState<ProjectModel[]>([]);

  useEffect(() => {
    import("@/data/projects.json").then((data) => {
      setProjectData(data.projects);
      setIsLoading(false);
    });
  }, []);
  return (
    <BaseLayout>
      <div className="home">
        {isLoading ? (
          <div className="loadingBar">
            <ReactLoading
              type="bars"
              color="#7fc7d9"
              height={450}
              width={375}
            />
          </div>
        ) : (
          <div>
            <h2
              className="text"
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
              className="description"
              style={
                {
                  textAlign: "justify",
                } as React.CSSProperties
              }
            >
              Dive into the narrative of my past projects, where creativity and
              expertise collided to form a symphony of innovation. From concept
              to completion, each project tells a story of strategic planning,
              collaborative teamwork, and overcoming challenges. Explore the
              milestones achieved, lessons learned, and the tangible impact on
              the world around us. These projects are not just a testament to my
              skills but a vibrant canvas reflecting my passion for pushing
              boundaries and crafting solutions that stand the test of time.
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
        )}
      </div>
      <div className="footer">© 2024 Raka Ramadhani Aulia Prasetyo</div>
    </BaseLayout>
  );
};

export default Project;
