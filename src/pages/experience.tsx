import React, { useEffect, useState } from "react";
import BaseLayout from "@/components/BaseLayout";
import WorkCard from "@/components/WorkCard";
import WorkExperienceData from "@/data/workExperience.json";
import { EducationExperience, WorkExperience } from "@/models/experience_model";
import EducationCard from "@/components/EducationCard";
import ReactLoading from "react-loading";
import { motion } from "framer-motion";

const Experience: React.FC = () => {
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
      <div className="home">
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
          <div>
            <motion.div
              initial={{ opacity: 0, x: windowSize.width <= 1000 ? 10 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
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
                  Professional Experience
                </h2>
                <div
                  style={
                    {
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(300px, 1fr))",
                      columnGap: "45px",
                    } as React.CSSProperties
                  }
                >
                  {workExperienceData.map((experience, index) => (
                    <div key={index}>
                      <WorkCard workExperience={experience} />
                    </div>
                  ))}
                </div>
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
                  Educational Experience
                </h2>
                <div
                  style={
                    {
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(325px, 1fr))",
                      columnGap: "45px",
                    } as React.CSSProperties
                  }
                >
                  {educationExperienceData.map((experience, index) => (
                    <div key={index}>
                      <EducationCard educationExperience={experience} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <div className="footer">© 2026 Raka Ramadhani Aulia Prasetyo</div>
    </BaseLayout>
  );
};

export default Experience;
