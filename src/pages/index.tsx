import React, { useEffect, useState } from "react";
import BaseLayout from "../components/BaseLayout";
import Image from "next/image";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
  ReactCompareSliderImage,
} from "react-compare-slider";
import ReactLoading from "react-loading";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const isClient = typeof window !== "undefined"; // Check if running on the client side

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const roles = ["an Engineer", "a Designer", "a Developer"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
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
        {isLoading ? (
          <div className="loadingBarWithSideBar">
            <ReactLoading
              type="bars"
              color={"var(--gradient-start)"}
              height={450}
              width={windowSize.width <= 1000 ? 200 : 375}
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: windowSize.width <= 1000 ? 10 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
                {windowSize.width <= 1000 ? (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={
                      {
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      } as React.CSSProperties
                    }
                  >
                  <div>
                    <ReactCompareSlider
                      className="avatarSmallScreen"
                      changePositionOnHover={true}
                      position={100}
                      itemOne={
                        <ReactCompareSliderImage
                          style={{
                            boxShadow:
                              "0px 1px 1px var(--gradient-start-inverse)",
                          }}
                          src="/ai_avatar.png"
                          alt="ai_avatar"
                          width={140}
                          height={180}
                        />
                      }
                      itemTwo={
                        <ReactCompareSliderImage
                          style={{
                            boxShadow:
                              "0px 1px 1px var(--gradient-start-inverse)",
                          }}
                          src="/real_avatar.png"
                          alt="real_avatar"
                          width={140}
                          height={140}
                        />
                      }
                      handle={
                        <ReactCompareSliderHandle
                          buttonStyle={{
                            backdropFilter: undefined,
                            background: "transparent",
                            border: 0,
                            color: "transparent",
                            width: "0px",
                          }}
                          linesStyle={{
                            backdropFilter: undefined,
                            background: "transparent",
                            color: "transparent",
                            width: "0px",
                            border: 0,
                          }}
                        />
                      }
                    />
                    <motion.div
                      style={
                        {
                          display: "flex",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                          marginTop: "15px",
                        } as React.CSSProperties
                      }
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <motion.a
                        href="https://github.com/raka-raprast"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <BsGithub
                          size={30}
                          className="text"
                          style={
                            {
                              marginRight: "15px",
                              marginLeft: "15px",
                            } as React.CSSProperties
                          }
                        />
                      </motion.a>
                      <motion.a
                        href="https://www.instagram.com/raka.raprast/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <BsInstagram
                          size={30}
                          className="text"
                          style={
                            {
                              marginRight: "15px",
                            } as React.CSSProperties
                          }
                        />
                      </motion.a>
                      <motion.a
                        href="https://www.linkedin.com/in/raka-raprast/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <BsLinkedin
                          size={30}
                          className="text"
                          style={{ marginRight: "15px" } as React.CSSProperties}
                        />
                      </motion.a>
                    </motion.div>
                  </div>
                </motion.div>
              ) : null}
              <div
                style={
                  {
                    display: "flex",
                  } as React.CSSProperties
                }
              >
                 <div>
                   <div
                     style={{
                       marginBottom: "25px",
                       marginTop: windowSize.width <= 1000 ? "20px" : "0px",
                     } as React.CSSProperties}
                   >
                     <motion.p
                       className="text"
                       style={{
                         fontSize: "1.25rem",
                         marginBottom: "5px",
                       }}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.5, delay: 0.3 }}
                     >
                       Hi, I'm
                     </motion.p>
                     <h1
                       className="name"
                       style={{
                         marginBottom: "10px",
                         fontSize: windowSize.width <= 1000 ? "2.5rem" : "3.5rem",
                         lineHeight: "1.2",
                       } as React.CSSProperties}
                     >
                       Raka Ramadhani Aulia Prasetyo
                     </h1>
                     <motion.div
                       style={{
                         display: "flex",
                         alignItems: "center",
                         gap: "10px",
                       }}
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ duration: 0.5, delay: 0.5 }}
                     >
                       <span
                         className="text"
                         style={{
                           fontSize: "1.25rem"
                         }}
                       >
                        I am
                       </span>
                       <motion.p
                         key={roles[currentRoleIndex]}
                         className="text"
                         style={{
                           fontSize: "1.5rem",
                           fontWeight: "bold",
                           background:
                             "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                           WebkitBackgroundClip: "text",
                           WebkitTextFillColor: "transparent",
                           backgroundClip: "text",
                           display: "inline-block",
                           minWidth: "120px",
                         }}
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.3 }}
                       >
                         {roles[currentRoleIndex]}
                       </motion.p>
                     </motion.div>
                   </div>
                  <motion.p
                    className="description"
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.6",
                      textAlign: windowSize.width <= 1000 ? "justify" : "start",
                      maxWidth: "600px"
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    Electrical Engineering graduate from Universitas Balikpapan,
                    passionate about AI, Mobile, and Web Development. Specialized in
                    Flutter, React Native, ReactJS, and NextJS, I build
                    innovative digital solutions that bridge creativity with
                    technology. Beyond coding, I explore 3D printing and craft
                    electrical tools as a hobby.
                  </motion.p>
                  <motion.div
                    style={{
                      display: "flex",
                      gap: "15px",
                      marginTop: "30px",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <motion.a
                      href="/experience"
                      style={{
                        padding: "12px 30px",
                        background:
                          "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontWeight: "bold",
                        display: "inline-block",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                        color: "var(--color-text-p)",
                      } as React.CSSProperties}
                      whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View My Work
                    </motion.a>
                    <motion.a
                      href="https://github.com/raka-raprast"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: "12px 30px",
                        border: "2px solid var(--gradient-start)",
                        color: "var(--text-primary)",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontWeight: "bold",
                        display: "inline-block",
                      } as React.CSSProperties}
                      whileHover={{
                        scale: 1.05,
                        background: "var(--gradient-start)",
                        color: "white",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {<motion.div className="text">GitHub Profile</motion.div>}
                    </motion.a>
                  </motion.div>

                </div>

                {windowSize.width <= 1000 ? null : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <ReactCompareSlider
                      className="avatar"
                      style={{ marginLeft: "60px" } as React.CSSProperties}
                      changePositionOnHover={true}
                      position={100}
                      itemOne={
                        <ReactCompareSliderImage
                          src="/ai_avatar.png"
                          alt="Image one"
                          width={140}
                          height={140}
                        />
                      }
                      itemTwo={
                        <ReactCompareSliderImage
                          src="/real_avatar.png"
                          alt="Image two"
                          width={140}
                          height={140}
                        />
                      }
                      handle={
                        <ReactCompareSliderHandle
                          buttonStyle={{
                            backdropFilter: undefined,
                            background: "transparent",
                            border: 0,
                            color: "transparent",
                            width: "0px",
                          }}
                          linesStyle={{
                            backdropFilter: undefined,
                            background: "transparent",
                            color: "transparent",
                            width: "0px",
                            border: 0,
                          }}
                        />
                      }
                    />

                    <motion.div
                      style={
                        {
                          display: "flex",
                          alignContent: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                          marginTop: "20px",
                        } as React.CSSProperties
                      }
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <motion.a
                        href="https://github.com/raka-raprast"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <BsGithub
                          size={30}
                          className="text"
                          style={
                            {
                              marginRight: "15px",
                              marginLeft: "70px",
                            } as React.CSSProperties
                          }
                        />
                      </motion.a>
                      <motion.a
                        href="https://www.instagram.com/raka.raprast/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <BsInstagram
                          size={30}
                          className="text"
                          style={
                            {
                              marginRight: "15px",
                            } as React.CSSProperties
                          }
                        />
                      </motion.a>
                      <motion.a
                        href="https://www.linkedin.com/in/raka-raprast/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <BsLinkedin
                          size={30}
                          className="text"
                          style={
                            {
                              marginRight: "15px",
                            } as React.CSSProperties
                          }
                        />
                      </motion.a>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="footer">© 2026 Raka Ramadhani Aulia Prasetyo</div>
    </BaseLayout>
  );
};

export default Home;
