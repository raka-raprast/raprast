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
import { Tooltip } from "@mui/material";
import { Code, Palette, Terminal, Globe, Database, Server } from "lucide-react"
import { motion } from "framer-motion";

interface Skill {
  name: string
  category: "Frontend" | "Backend" | "Database" | "DevOps" | "Design" | "Other"
}


const Home: React.FC = () => {
  const isClient = typeof window !== "undefined"; // Check if running on the client side

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const getCategoryIcon = (category: Skill["category"]) => {
    switch (category) {
      case "Frontend":
        return <Globe className="h-6 w-6" />
      case "Backend":
        return <Server className="h-6 w-6" />
      case "Database":
        return <Database className="h-6 w-6" />
      case "DevOps":
        return <Terminal className="h-6 w-6" />
      case "Design":
        return <Palette className="h-6 w-6" />
      default:
        return <Code className="h-6 w-6" />
    }
  }


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
          <div className="loadingBar">
            <ReactLoading
              type="bars"
              color="#7fc7d9"
              height={450}
              width={375}
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ><div>
              {windowSize.width <= 1000 ? (
                <div
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
                            boxShadow: "0px 1px 1px var(--gradient-start-inverse)",
                          }}
                          src="/ai_avatar.png"
                          alt="Image one"
                          width={140}
                          height={140}
                        />
                      }
                      itemTwo={
                        <ReactCompareSliderImage
                          style={{
                            boxShadow: "0px 1px 1px var(--gradient-start-inverse)",
                          }}
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
                    <div
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
                    >
                      {
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
                      }
                      {
                        <BsInstagram
                          size={30}
                          className="text"
                          style={
                            {
                              marginRight: "15px",
                            } as React.CSSProperties
                          }
                        />
                      }
                      {
                        <BsLinkedin
                          size={30}
                          className="text"
                          style={{ marginRight: "15px" } as React.CSSProperties}
                        />
                      }
                    </div>
                  </div>
                </div>
              ) : null}
              <div
                style={
                  {
                    display: "flex",
                  } as React.CSSProperties
                }
              >
                <div>
                  <h1
                    className="name"
                    style={
                      {
                        textAlign: windowSize.width <= 1000 ? "center" : "start",
                        marginBottom: "15px",
                      } as React.CSSProperties
                    }
                  >
                    Raka Ramadhani Aulia Prasetyo
                  </h1>
                  <p
                    className="description"
                    style={
                      {
                        fontSize: "medium",
                        textAlign: windowSize.width <= 1000 ? "justify" : "start",
                      } as React.CSSProperties
                    }
                  >
                    Hey there, tech aficionados and digital wanderers! I&apos;m Raka from Balikpapan, East Kalimantan, Indonesia. With an Electrical Engineering degree from Universitas Balikpapan, I’m passionate about AI, Mobile Development, and Web Development. I groove with Flutter and React Native for mobile, and dance through the web with ReactJS and NextJS, with HTML and CSS as my trusty sidekicks. Beyond coding, I dive into 3D printing, crafting electrical tools as a hobby. This website is my journey through circuits, code, and creativity. Buckle up and explore the funky side of tech with me!
                  </p>
                  {skills.map((skillCategory) => (
                    <div key={skillCategory.category}>
                      <p
                        className="text"
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          fontWeight: "bolder",
                          textAlign: windowSize.width <= 1000 ? "center" : "start"
                        }}
                      >
                        {skillCategory.category}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignContent: "center",
                          justifyContent: windowSize.width <= 1000 ? "center" : "start",
                          alignItems: "center",
                          flexDirection: "row"
                        }}
                      >
                        {skillCategory.items.map((item) => (
                          <Tooltip key={item.title} title={item.title}>
                            <div className="skillLogo">
                              <p>
                                {item.title}
                              </p>
                              {/* <Image
                              width={30}
                              height={30}
                              style={{ objectFit: item.alt === "fastapi" || item.alt === "postgresql" || item.alt === "mongodb" ? "fill" : "cover" }}
                              src={item.src}
                              alt={item.alt}
                            /> */}
                            </div>
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {windowSize.width <= 1000 ? null : (
                  <div>
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

                    <div
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
                    >
                      <a
                        href="https://github.com/raka-raprast"
                        target="_blank"
                        rel="noopener noreferrer"
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
                      </a>
                      <a
                        href="https://www.instagram.com/raka.raprast/"
                        target="_blank"
                        rel="noopener noreferrer"
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
                      </a>
                      <a
                        href="https://www.linkedin.com/in/raka-raprast/"
                        target="_blank"
                        rel="noopener noreferrer"
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
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div></motion.div>

        )}
      </div>

      <div className="footer">© 2024 Raka Ramadhani Aulia Prasetyo</div>
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
      { title: "WordPress", src: "/wordpress.png", alt: "wordpress" }
    ]
  },
  {
    category: "Back-End",
    items: [
      { title: "FastAPI", src: "/fastapi.png", alt: "fastapi" },
      { title: "NestJS", src: "/nestjs.png", alt: "nestjs" },
      { title: "Gin-Gonic", src: "/gin-gonic.jpg", alt: "gin-gonic" }
    ]
  },
  {
    category: "Artificial Intelligence",
    items: [
      { title: "TensorFlow", src: "/tensorflow.png", alt: "tensorflow" },
      { title: "Keras", src: "/keras.png", alt: "keras" },
      { title: "PyTorch", src: "/pytorch.png", alt: "pytorch" }
    ]
  },
  {
    category: "Database",
    items: [
      { title: "PostgreSQL", src: "/postgresql.png", alt: "postgresql" },
      { title: "MongoDB", src: "/mongodb.png", alt: "mongodb" },
      { title: "Firebase", src: "/firebase.png", alt: "firebase" }
    ]
  }
];


export default Home;
