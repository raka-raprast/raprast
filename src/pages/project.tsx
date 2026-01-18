import React, { useEffect, useState } from "react";
import BaseLayout from "@/components/BaseLayout";
import { ProjectModel } from "@/models/projects_model";
import ProjectCard from "@/components/ProjectCard";
import ReactLoading from "react-loading";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const Project: React.FC = () => {
  const isClient = typeof window !== "undefined";
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isProjectLoading, setIsProjectLoading] = useState(true);
  const [projectData, setProjectData] = useState<ProjectModel[]>([]);

  useEffect(() => {
    import("@/data/projects.json").then((data) => {
    // import("@/data/newProject.json").then((data) => {
      setProjectData(data.projects);
      setIsProjectLoading(false);
    });
    if (isClient) {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setIsLoading(false);

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isClient]);
  return (
    <BaseLayout>
      <div
        style={{
          minHeight: "calc(100vh - 80px)",
          padding: "90px 90px 25px 90px",
          position: "relative",
        }}
      >
        {isLoading || isProjectLoading ? (
          <div className="loadingBarWithSideBar">
            <ReactLoading
              type="bars"
              color={"var(--gradient-start)"}
              height={450}
              width={windowSize.width <= 1000 ? 200 : 375}
            />
          </div>
        ) : (
          <div style={{ position: "relative" }}>
            <motion.div
              initial={{ opacity: 0, x: windowSize.width <= 1000 ? 10 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "40px",
                    gap: "20px",
                  }}
                >
                  <h2
                    className="text"
                    style={{
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "var(--color-text-p)",
                      margin: 0,
                      padding: "0 0 12px 0",
                      borderBottom: "3px solid var(--gradient-start)",
                      flex: 1,
                    }}
                  >
                    Projects
                  </h2>

                  <motion.button
                    style={{
                      padding: "12px 24px",
                      border: "2px solid var(--gradient-start)",
                      borderRadius: "12px",
                      backgroundColor: "transparent",
                      color: "var(--color-text-p)",
                      fontSize: "15px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      fontFamily: "inherit",
                      flexShrink: 0,
                    }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "var(--gradient-start)",
                      color: "var(--color-bg)",
                      boxShadow:
                        "0 8px 20px -6px rgba(98, 150, 196, 0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      window.open("https://raprast-labs.space", "_blank");
                    }}
                  >
                    <ExternalLink size={18} />
                    <span>Raprast Labs</span>
                  </motion.button>
                </div>

                <motion.p
                  className="description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={
                    {
                      fontSize: "16px",
                      lineHeight: 1.8,
                      marginBottom: "48px",
                    } as React.CSSProperties
                  }
                >
                  Dive into the narrative of my past projects, where creativity and
                  expertise collided to form a symphony of innovation. From concept
                  to completion, each project tells a story of strategic planning,
                  collaborative teamwork, and overcoming challenges. Explore the
                  milestones achieved, lessons learned, and tangible impact on the
                  world around us. These projects are not just a testament to my
                  skills but a vibrant canvas reflecting my passion for pushing
                  boundaries and crafting solutions that stand the test of time.
                </motion.p>

                <motion.div
                  style={
                    {
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(300px, 1fr))",
                      gap: "24px",
                    } as React.CSSProperties
                  }
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {projectData.map((project, index) => (
                    <ProjectCard
                      key={index}
                      project={project}
                      index={index}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <div className="footer">© 2026 Raka Ramadhani Aulia Prasetyo</div>
    </BaseLayout>
  );
};

export default Project;
