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

  const shapes = [
    { type: "circle", size: 80, x: "5%", y: "10%", delay: 0 },
    { type: "circle", size: 60, x: "90%", y: "15%", delay: 1 },
    { type: "circle", size: 100, x: "80%", y: "75%", delay: 2 },
    { type: "circle", size: 50, x: "8%", y: "85%", delay: 1.5 },
    { type: "circle", size: 40, x: "50%", y: "5%", delay: 0.8 },
    { type: "circle", size: 70, x: "95%", y: "50%", delay: 2.2 },
    { type: "circle", size: 55, x: "15%", y: "50%", delay: 1.2 },
    { type: "square", size: 60, x: "92%", y: "45%", delay: 0.5, rotation: 45 },
    { type: "square", size: 45, x: "12%", y: "65%", delay: 2.5, rotation: 30 },
    { type: "square", size: 55, x: "45%", y: "15%", delay: 1.8, rotation: 20 },
    { type: "square", size: 35, x: "75%", y: "90%", delay: 0.3, rotation: 50 },
    { type: "triangle", size: 65, x: "55%", y: "8%", delay: 1.8 },
    { type: "triangle", size: 70, x: "22%", y: "88%", delay: 0.8 },
    { type: "triangle", size: 50, x: "88%", y: "30%", delay: 2.3 },
    { type: "triangle", size: 55, x: "5%", y: "40%", delay: 1.1 },
    { type: "circle", size: 90, x: "70%", y: "60%", delay: 0.7 },
    { type: "square", size: 70, x: "30%", y: "35%", delay: 1.9, rotation: 25 },
    { type: "circle", size: 45, x: "60%", y: "95%", delay: 0.4 },
    { type: "triangle", size: 60, x: "40%", y: "75%", delay: 2.1 },
    { type: "circle", size: 75, x: "2%", y: "60%", delay: 1.6 },
  ];

  const dots = [
    { x: "15%", y: "25%", delay: 0 },
    { x: "25%", y: "15%", delay: 0.5 },
    { x: "35%", y: "35%", delay: 1 },
    { x: "45%", y: "20%", delay: 1.5 },
    { x: "55%", y: "30%", delay: 2 },
    { x: "65%", y: "18%", delay: 0.3 },
    { x: "75%", y: "28%", delay: 0.8 },
    { x: "85%", y: "22%", delay: 1.3 },
    { x: "12%", y: "45%", delay: 1.8 },
    { x: "22%", y: "55%", delay: 0.2 },
    { x: "32%", y: "42%", delay: 0.7 },
    { x: "42%", y: "58%", delay: 1.2 },
    { x: "52%", y: "45%", delay: 1.7 },
    { x: "62%", y: "52%", delay: 0.4 },
    { x: "72%", y: "48%", delay: 0.9 },
    { x: "82%", y: "55%", delay: 1.4 },
    { x: "18%", y: "65%", delay: 2 },
    { x: "28%", y: "75%", delay: 0.6 },
    { x: "38%", y: "68%", delay: 1.1 },
    { x: "48%", y: "78%", delay: 1.6 },
    { x: "58%", y: "72%", delay: 0.1 },
    { x: "68%", y: "80%", delay: 0.5 },
    { x: "78%", y: "70%", delay: 1 },
    { x: "88%", y: "75%", delay: 1.5 },
    { x: "10%", y: "88%", delay: 0.8 },
    { x: "20%", y: "92%", delay: 1.3 },
    { x: "30%", y: "85%", delay: 1.8 },
    { x: "40%", y: "90%", delay: 0.3 },
    { x: "50%", y: "88%", delay: 0.7 },
    { x: "60%", y: "95%", delay: 1.2 },
    { x: "70%", y: "88%", delay: 1.7 },
    { x: "80%", y: "92%", delay: 0.2 },
    { x: "90%", y: "85%", delay: 0.9 },
  ];

  const codeSymbols = [
    { symbol: "{ }", x: "8%", y: "12%", delay: 0 },
    { symbol: "< />", x: "92%", y: "8%", delay: 1.5 },
    { symbol: "01", x: "95%", y: "92%", delay: 0.8 },
    { symbol: "{}", x: "5%", y: "90%", delay: 2.2 },
    { symbol: "[]", x: "88%", y: "45%", delay: 1.1 },
    { symbol: "()", x: "12%", y: "55%", delay: 0.5 },
    { symbol: "=>", x: "75%", y: "15%", delay: 1.8 },
    { symbol: "&&", x: "25%", y: "88%", delay: 0.3 },
    { symbol: "||", x: "85%", y: "75%", delay: 1.4 },
    { symbol: "==", x: "18%", y: "25%", delay: 2 },
  ];

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
        if (window.innerWidth <= 1000) {
          setMousePosition({ x: 0, y: 0 });
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (window.innerWidth > 1000) {
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          const mouseX = e.clientX - centerX;
          const mouseY = e.clientY - centerY;
          setMousePosition({ x: mouseX, y: mouseY });
        }
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [isClient]);

  return (
    <BaseLayout>
      {!isLoading && !isEducationLoading && !isWorkLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            pointerEvents: "none",
            overflow: "hidden",
          } as React.CSSProperties}
        >
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "radial-gradient(circle at 20% 30%, rgba(98, 150, 196, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(233, 92, 159, 0.08) 0%, transparent 50%)",
            } as React.CSSProperties}
            animate={{
              x: mousePosition.x * 0.08,
              y: mousePosition.y * 0.08,
              background: [
                "radial-gradient(circle at 20% 30%, rgba(98, 150, 196, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(233, 92, 159, 0.08) 0%, transparent 50%)",
                "radial-gradient(circle at 70% 20%, rgba(98, 150, 196, 0.08) 0%, transparent 50%), radial-gradient(circle at 30% 80%, rgba(233, 92, 159, 0.08) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 90%, rgba(98, 150, 196, 0.08) 0%, transparent 50%), radial-gradient(circle at 90% 40%, rgba(233, 92, 159, 0.08) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 30%, rgba(98, 150, 196, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(233, 92, 159, 0.08) 0%, transparent 50%)",
              ],
            }}
            transition={{
              x: { type: "spring", stiffness: 150, damping: 30 },
              y: { type: "spring", stiffness: 150, damping: 30 },
              background: { duration: 20, repeat: Infinity, ease: "easeInOut" },
            }}
          />
          {dots.map((dot, index) => (
            <motion.div
              key={`dot-${index}`}
              style={{
                position: "absolute",
                left: dot.x,
                top: dot.y,
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "var(--gradient-start)",
                opacity: 0.3,
              } as React.CSSProperties}
              animate={{
                x: mousePosition.x * 0.15,
                y: mousePosition.y * 0.15,
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                x: { type: "spring", stiffness: 200, damping: 25 },
                y: { type: "spring", stiffness: 200, damping: 25 },
                scale: { duration: 3, delay: dot.delay, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 3, delay: dot.delay, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          ))}
          {codeSymbols.map((code, index) => (
            <motion.div
              key={`code-${index}`}
              style={{
                position: "absolute",
                left: code.x,
                top: code.y,
                fontSize: 14,
                fontFamily: "Ubuntu Mono, monospace",
                color: "var(--gradient-start)",
                opacity: 0.25,
                fontWeight: "bold",
              } as React.CSSProperties}
              animate={{
                x: mousePosition.x * 0.25,
                y: mousePosition.y * 0.25,
                opacity: [0.15, 0.3, 0.15],
                scale: [1, 1.1, 1],
              }}
              transition={{
                x: { type: "spring", stiffness: 250, damping: 20 },
                y: { type: "spring", stiffness: 250, damping: 20 },
                opacity: { duration: 4, delay: code.delay, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 4, delay: code.delay, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              {code.symbol}
            </motion.div>
          ))}
          {shapes.map((shape, index) => (
            <motion.div
              key={index}
              style={{
                position: "absolute",
                left: shape.x,
                top: shape.y,
                width: shape.size,
                height: shape.size,
                border: `2px solid var(--gradient-start)`,
                borderRadius: shape.type === "circle" ? "50%" : shape.type === "triangle" ? "0" : "8px",
                opacity: 0.18,
                clipPath: shape.type === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : undefined,
              } as React.CSSProperties}
              initial={{ scale: 0, rotate: shape.type === "square" ? -45 : 0 }}
              animate={{
                x: mousePosition.x * 0.4,
                y: mousePosition.y * 0.4,
                scale: [0, 1, 0.85, 1],
                rotate: shape.type === "square" ? [-45, 45, -45, 45] : [0, 180, 360],
              }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 15 },
                y: { type: "spring", stiffness: 300, damping: 15 },
                scale: { duration: 6 + Math.random() * 4, delay: shape.delay, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 6 + Math.random() * 4, delay: shape.delay, repeat: Infinity, ease: "easeInOut" },
              }}
            />
          ))}
        </div>
      )}
      <div
        style={{
          minHeight: "calc(100vh - 80px)",
          padding: windowSize.width <= 1000 ? "20px 16px 25px 16px" : "90px 90px 25px 90px",
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
          <div style={{ position: "relative", zIndex: 1 } as React.CSSProperties}>
            <motion.div
              initial={{ opacity: 0, x: windowSize.width <= 1000 ? 10 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: windowSize.width <= 1000 ? "column" : "row",
                    justifyContent: "space-between",
                    alignItems: windowSize.width <= 1000 ? "stretch" : "center",
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
                      justifyContent: "center",
                      gap: "8px",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      fontFamily: "inherit",
                      flexShrink: 0,
                      width: windowSize.width <= 1000 ? "100%" : "auto",
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
