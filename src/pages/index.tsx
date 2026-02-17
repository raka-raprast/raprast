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
import { motion, AnimatePresence } from "framer-motion";

const Home: React.FC = () => {
  const isClient = typeof window !== "undefined"; // Check if running on the client side

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isHoveringMiddleName, setIsHoveringMiddleName] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const roles = ["an Engineer", "a Designer", "a Developer"];

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
      <div className="home" style={{ minHeight: "calc(100vh - 80px)", padding: windowSize.width <= 1000 ? "20px 16px 25px 16px" : "90px 90px 25px 90px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
        {!isLoading && (
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
            style={{ position: "relative", zIndex: 1 } as React.CSSProperties}
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
                        Hi, I&apos;m
                      </motion.p>
                      <h1
                        className="name"
                        style={{
                          marginBottom: "10px",
                          fontSize: windowSize.width <= 1000 ? "2.5rem" : "3.5rem",
                          lineHeight: "1.2",
                        } as React.CSSProperties}
                      >
                        Raka <motion.span
                          style={{
                            display: "inline-block",
                            cursor: "pointer",
                          }}
                          onHoverStart={() => setIsHoveringMiddleName(true)}
                          onHoverEnd={() => setIsHoveringMiddleName(false)}
                        >
                          <AnimatePresence mode="wait">
                            {!isHoveringMiddleName ? (
                              <motion.span
                                key="ra"
                                style={{
                                  display: "inline-block",
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                R.A
                              </motion.span>
                            ) : (
                              <motion.span
                                key="full"
                                style={{
                                  display: "inline-block",
                                  whiteSpace: "nowrap",
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                Ramadhani Aulia
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.span> Prasetyo
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
                    An Electrical Engineering graduate passionate about AI, Mobile, and Web Development. I build innovative digital solutions that bridge creativity with technology. Beyond coding, I explore 3D printing and craft electrical tools as a hobby.
                  </motion.p>
                  <motion.div
                    style={{
                      display: "flex",
                      flexDirection: windowSize.width <= 1000 ? "column" : "row",
                      gap: "15px",
                      marginTop: "30px",
                      alignItems: windowSize.width <= 1000 ? "center" : "flex-start",
                    } as React.CSSProperties}
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
