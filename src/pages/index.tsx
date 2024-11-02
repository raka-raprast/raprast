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

const Home: React.FC = () => {
  const isClient = typeof window !== "undefined"; // Check if running on the client side

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

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
          <div>
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
                <p className="text"
                  style={
                    {
                      marginTop: "10px",
                      marginBottom: "10px",
                      fontWeight: "bolder",
                      textAlign: windowSize.width <= 1000 ? "center" : "start",
                    } as React.CSSProperties
                  }
                >
                  Front-End
                </p>
                <div
                  style={
                    {
                      display: "flex",
                      alignContent: "center",
                      justifyContent:
                        windowSize.width <= 1000 ? "center" : "start",
                      alignItems: "center",
                      flexDirection: "row",
                    } as React.CSSProperties
                  }
                >
                  <Tooltip title="ReactJS">
                    <div className="skillLogo">
                      <Image
                        width={30}
                        height={30}
                        style={{
                          objectFit: "cover"
                        }}
                        src="/reactjs.png"
                        alt="react"
                      />
                    </div>
                  </Tooltip>
                  <Tooltip title="NextJS">
                    <div className="skillLogo">
                      <Image
                        width={30}
                        height={30}
                        style={{
                          objectFit: "cover"
                        }}
                        src="/nextjs.png"
                        alt="nextjs"
                      />
                    </div>
                  </Tooltip>
                  <Tooltip title="Flutter">
                    <div className="skillLogo">
                      <Image
                        width={30}
                        height={30}
                        style={{
                          objectFit: "cover"
                        }}
                        src="/flutter.png"
                        alt="flutter"
                      />
                    </div>
                  </Tooltip>
                  <Tooltip title="Wordpress">
                    <div className="skillLogo">
                      <Image
                        width={30}
                        height={30}
                        style={{
                          objectFit: "cover"
                        }}
                        src="/wordpress.png"
                        alt="wordpress"
                      />
                    </div>
                  </Tooltip>
                </div>
                <p className="text"
                  style={
                    {
                      marginTop: "10px",
                      marginBottom: "10px",
                      fontWeight: "bolder",
                      textAlign: windowSize.width <= 1000 ? "center" : "start",
                    } as React.CSSProperties
                  }
                >
                  Back-End
                </p>
                <div
                  style={
                    {
                      display: "flex",
                      alignContent: "center",
                      justifyContent:
                        windowSize.width <= 1000 ? "center" : "start",
                      alignItems: "center",
                      flexDirection: "row",
                    } as React.CSSProperties
                  }
                >
                  <Tooltip title="FastAPI">
                    <div className="skillLogo">
                      <Image
                        width={30}
                        height={30}
                        style={{
                          objectFit: "fill"
                        }}
                        src="/fastapi.png"
                        alt="fastapi"
                      />
                    </div>
                  </Tooltip>
                  <Tooltip title="NestJS">
                    <div className="skillLogo">
                      <Image
                        width={30}
                        height={30}
                        style={{
                          objectFit: "cover"
                        }}
                        src="/nestjs.png"
                        alt="nestjs"
                      />
                    </div>
                  </Tooltip>
                  <Tooltip title="Gin-Gonic">
                    <div className="skillLogo">
                      <Image
                        width={30}
                        height={30}
                        style={{
                          objectFit: "cover"
                        }}
                        src="/gin-gonic.jpg"
                        alt="gin-gonic"
                      />
                    </div>
                  </Tooltip>
                </div>
                <p className="text"
                  style={
                    {
                      marginTop: "10px",
                      marginBottom: "10px",
                      fontWeight: "bolder",
                      textAlign: windowSize.width <= 1000 ? "center" : "start",
                    } as React.CSSProperties
                  }
                >
                  Artificial Intelligence
                </p>
                <div
                  style={
                    {
                      display: "flex",
                      alignContent: "center",
                      justifyContent:
                        windowSize.width <= 1000 ? "center" : "start",
                      alignItems: "center",
                      flexDirection: "row",
                    } as React.CSSProperties
                  }
                >
                  <Tooltip title="TensorFlow">
                    <div className="skillLogo">
                      <Image
                        width={30}
                        height={30}
                        style={{
                          objectFit: "fill"
                        }}
                        src="/tensorflow.png"
                        alt="tensorflow"
                      />
                    </div>
                  </Tooltip>
                  <Tooltip title="Keras">
                    <div className="skillLogo">
                      <Image
                        width={30}
                        height={30}
                        style={{
                          objectFit: "fill"
                        }}
                        src="/keras.png"
                        alt="keras"
                      />
                    </div>
                  </Tooltip>
                  <Tooltip title="PyTorch">
                    <div className="skillLogo">
                      <Image
                        width={30}
                        height={30}
                        style={{
                          objectFit: "cover"
                        }}
                        src="/pytorch.png"
                        alt="pytorch"
                      />
                    </div>
                  </Tooltip>
                </div>
                <p className="text"
                  style={
                    {
                      marginTop: "10px",
                      marginBottom: "10px",
                      fontWeight: "bolder",
                      textAlign: windowSize.width <= 1000 ? "center" : "start",
                    } as React.CSSProperties
                  }
                >
                  Database
                </p>
                <div
                  style={
                    {
                      display: "flex",
                      alignContent: "center",
                      justifyContent:
                        windowSize.width <= 1000 ? "center" : "start",
                      alignItems: "center",
                      flexDirection: "row",
                    } as React.CSSProperties
                  }
                >
                  <Tooltip title="PostgreSQL">
                    <div className="skillLogo">
                      <Image
                        width={30}
                        height={30}
                        style={{
                          objectFit: "fill"
                        }}
                        src="/postgresql.png"
                        alt="postgresql"
                      />
                    </div>
                  </Tooltip>
                  <Tooltip title="MongoDB">
                    <div className="skillLogo">
                      <Image
                        width={30}
                        height={30}
                        style={{
                          objectFit: "fill"
                        }}
                        src="/mongodb.png"
                        alt="mongodb"
                      />
                    </div>
                  </Tooltip>
                  <Tooltip title="Firebase">
                    <div className="skillLogo">
                      <Image
                        width={30}
                        height={30}
                        style={{
                          objectFit: "cover"
                        }}
                        src="/firebase.png"
                        alt="firebase"
                      />
                    </div>
                  </Tooltip>
                </div>
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
                            marginLeft: "45px",
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
          </div>
        )}
      </div>

      <div className="footer">© 2024 Raka Ramadhani Aulia Prasetyo</div>
    </BaseLayout>
  );
};

export default Home;
