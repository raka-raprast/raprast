import React, { useEffect, useState } from "react";
import BaseLayout from "@/components/BaseLayout";
import WorkCard from "@/components/WorkCard";
import WorkExperienceData from "@/data/workExperience.json";
import { EducationExperience, WorkExperience } from "@/models/experience_model";
import EducationCard from "@/components/EducationCard";
import ReactLoading from "react-loading";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "@mui/material";
import { Code, Palette, Terminal, Globe, Database, Server, Download, FileText } from "lucide-react";

interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "DevOps" | "Design" | "Other";
}

const Experience: React.FC = () => {
  const getCategoryIcon = (category: Skill["category"]) => {
    switch (category) {
      case "Frontend":
        return <Globe className="h-6 w-6" />;
      case "Backend":
        return <Server className="h-6 w-6" />;
      case "Database":
        return <Database className="h-6 w-6" />;
      case "DevOps":
        return <Terminal className="h-6 w-6" />;
      case "Design":
        return <Palette className="h-6 w-6" />;
      default:
        return <Code className="h-6 w-6" />;
    }
  };
  const isClient = typeof window !== "undefined";
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const [isWorkLoading, setIsWorkLoading] = useState(true);
  const [isEducationLoading, setIsEducationLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [workExperienceData, setWorkExperienceData] = useState<
    WorkExperience[]
  >([]);
  const [educationExperienceData, setEducationExperienceData] = useState<
    EducationExperience[]
  >([]);

  useEffect(() => {
    import("@/data/workExperience.json").then((data) => {
      setWorkExperienceData(data.workExperience);
      setIsWorkLoading(false);
    });
  }, []);

  useEffect(() => {
    import("@/data/educationExperience.json").then((data) => {
      setEducationExperienceData(data.educationExperience);
      setIsEducationLoading(false);
    });
  }, []);

  useEffect(() => {
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
        {isEducationLoading || isWorkLoading || isLoading ? (
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
                      // background: "linear-gradient(to right, var(--gradient-start), var(--gradient-end))",
                      // WebkitBackgroundClip: "text",
                      // WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      flex: 1,
                    }}
                  >
                    Professional Experience
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
                      boxShadow: "0 8px 20px -6px rgba(98, 150, 196, 0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      window.open("/Raka Ramadhani Aulia Prasetyo_Curriculum Vitae.pdf", "_blank");
                    }}
                  >
                    <Download size={18} />
                    <span>Download CV</span>
                  </motion.button>
                </div>

                <motion.div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "24px",
                    marginBottom: "60px",
                  }}
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
                  {workExperienceData.map((experience, index) => (
                    <WorkCard
                      key={index}
                      workExperience={experience}
                      index={index}
                    />
                  ))}
                </motion.div>

                <h2
                  className="text"
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "var(--color-text-p)",
                    margin: "0 0 40px 0",
                    padding: "0 0 12px 0",
                    borderBottom: "3px solid var(--gradient-start)",
                  }}
                >
                  Educational Experience
                </h2>

                <motion.div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(325px, 1fr))",
                    gap: "24px",
                    marginBottom: "60px",
                  }}
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
                  {educationExperienceData.map((experience, index) => (
                    <EducationCard
                      key={index}
                      educationExperience={experience}
                      index={index}
                    />
                  ))}
                </motion.div>

                <h2
                  className="text"
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "var(--color-text-p)",
                    margin: "0 0 40px 0",
                    padding: "0 0 12px 0",
                    borderBottom: "3px solid var(--gradient-start)",
                  }}
                >
                  Skills
                </h2>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.15,
                      },
                    },
                  }}
                >
                  {skills.map((skillCategory, categoryIndex) => (
                    <motion.div
                      key={skillCategory.category}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.5,
                          },
                        },
                      }}
                      style={{ marginBottom: "32px" }}
                    >
                      <p
                        className="text"
                        style={{
                          fontSize: "20px",
                          fontWeight: 700,
                          color: "var(--color-text-p)",
                          marginBottom: "16px",
                          textAlign:
                            windowSize.width <= 1000 ? "center" : "start",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          justifyContent:
                            windowSize.width <= 1000 ? "center" : "start",
                        }}
                      >
                        {getCategoryIcon(
                          skillCategory.category as Skill["category"]
                        )}
                        {skillCategory.category}
                      </p>
                      <div
                        className="skillLogoContainer"
                        style={{
                          justifyContent:
                            windowSize.width <= 1000 ? "center" : "start",
                        }}
                      >
                        {skillCategory.items.map((item) => (
                          <Tooltip key={item.title} title={item.title}>
                            <motion.div
                              className="skillLogo"
                              style={{
                                margin: "0 12px 12px 0",
                                padding: "12px 20px",
                                borderRadius: "12px",
                                border: "1px solid var(--color-border)",
                                backgroundColor: "var(--color-bg)",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "var(--color-text-p)",
                                fontSize: "14px",
                                fontWeight: 500,
                                cursor: "default",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                height: "auto",
                              }}
                              whileHover={{
                                y: -4,
                                borderColor: "var(--gradient-start)",
                                boxShadow: "0 8px 16px -4px rgba(98, 150, 196, 0.4)",
                                scale: 1.02,
                              }}
                            >
                              <span>{item.title}</span>
                            </motion.div>
                          </Tooltip>
                        ))}
                      </div>
                    </motion.div>
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

const skills = [
  {
    category: "Front-End",
    items: [
      { title: "ReactJS", src: "/reactjs.png", alt: "react" },
      { title: "NextJS", src: "/nextjs.png", alt: "nextjs" },
      { title: "Flutter", src: "/flutter.png", alt: "flutter" },
      { title: "React Native", src: "/react-native.png", alt: "react-native" },
      // { title: "WordPress", src: "/wordpress.png", alt: "wordpress" },
    ],
  },
  {
    category: "Back-End",
    items: [
      { title: "NestJS", src: "/nestjs.png", alt: "nestjs" },
      { title: "FastAPI", src: "/fastapi.png", alt: "fastapi" },
      { title: "Django", src: "/django.png", alt: "django" },
      { title: "Gin-Gonic", src: "/gin-gonic.jpg", alt: "gin-gonic" },
    ],
  },
  {
    category: "Artificial Intelligence",
    items: [
      { title: "TensorFlow", src: "/tensorflow.png", alt: "tensorflow" },
      { title: "Keras", src: "/keras.png", alt: "keras" },
      { title: "PyTorch", src: "/pytorch.png", alt: "pytorch" },
    ],
  },
  {
    category: "Database",
    items: [
      { title: "PostgreSQL", src: "/postgresql.png", alt: "postgresql" },
      { title: "MongoDB", src: "/mongodb.png", alt: "mongodb" },
      // { title: "MySQL", src: "/MySQL.png", alt: "mysql" },
      // { title: "Firebase", src: "/firebase.png", alt: "firebase" },
    ],
  },
  {
    category: "Web3",
    items: [
      { title: "Solidity", src: "/solidity.png", alt: "solidity" },
      // { title: "MySQL", src: "/MySQL.png", alt: "mysql" },
      // { title: "Firebase", src: "/firebase.png", alt: "firebase" },
    ],
  },
  // {
  //   category: "DevOps",
  //   items: [{ title: "Docker", src: "/docker.png", alt: "docker" }],
  // },
];

export default Experience;
